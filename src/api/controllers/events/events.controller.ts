import { NextFunction, Request, Response } from "express";
import _ from "lodash";
import { IncomingEvent } from "../../../types";
import { DESTINATIONS } from "../../../../config";
import { ParamsDictionary } from "express-serve-static-core";
import { getDestinationValidator, getValuesByDestination } from "./utils";
import { DestinationService, Logger } from "../../../services";

const DEFAULT_STRATEGY = process.env.STRATEGY || 'ALL';
const configuredDestinations = DESTINATIONS.map(destination => destination.name);
const destinationParamsByName = _.keyBy(DESTINATIONS, 'name');

export const processEvents = async (req: Request<ParamsDictionary, any, IncomingEvent>, res: Response, next: NextFunction) => {
    const { possibleDestinations = [], payload = {}, strategy: validationStrategy } = req.body;
    const validateDestination = getDestinationValidator(validationStrategy, DEFAULT_STRATEGY);
    if (!validateDestination) {
        Logger.error(`Could not evaluate provided strategy: ${validationStrategy || DEFAULT_STRATEGY}`);
        return next(new Error('Provided strategy is not valid JS code'));
    }
    const valuesByDestinationName = getValuesByDestination(possibleDestinations);
    const destinationNames = Object.keys(valuesByDestinationName);

    const promises = destinationNames.map(destinationName => {
        if (!configuredDestinations.includes(destinationName)) {
            Logger.error(`Destination ${destinationName} does not exist in configuration`);
            return Promise.reject();
        }

        const shouldApplyDestination = validateDestination(valuesByDestinationName[destinationName]);
        if (shouldApplyDestination) {
            return DestinationService.applyDestination(destinationParamsByName[destinationName], payload);
        } else {
            return Promise.reject();
        }
    });

    const results = await Promise.allSettled(promises);
    const response = results.reduce((acc: Record<string, boolean>, currentValue, index) => {
        acc[destinationNames[index]] = currentValue.status === 'fulfilled';
        return acc;
    }, {});

    Logger.info(`Request: ${JSON.stringify(req.body)}, response: ${JSON.stringify(response)}`);

    res.status(200);
    res.json(response);
};
