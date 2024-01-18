import _ from 'lodash';
import { IncomingEvent } from "../../../types";

export const getValuesByDestination = (possibleDestinations: IncomingEvent['possibleDestinations']) => {
    return possibleDestinations.reduce((acc: Record<string, boolean[]>, currentValue) => {
        for (const key of Object.keys(currentValue)) {
            if (!(key in acc)) {
                acc[key] = [];
            }

            acc[key].push(currentValue[key]);
        }
        return acc;
    }, {});
};

export const getDestinationValidator = (strategy: string, defaultStrategy: string) => {
    strategy = strategy || defaultStrategy;
    if (['ALL', 'ANY'].includes(strategy)) {
        return (values: boolean[]) => values[strategy === 'ALL' ? 'every' : 'some'](Boolean);
    } else {
        try {
            const validator = eval(strategy);
            return validator;
        } catch {
            return;
        }
    }
};
