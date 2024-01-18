import { Destination } from "../types";

export default class DestinationService {
    static async applyDestination(transportParams: Omit<Destination, 'name'>, payload: Record<string, any>) {
        switch (transportParams.transport) {
            case 'http.get':
                const url = new URL(transportParams.url!);
                for (const param in payload) {
                    url.searchParams.set(param, payload[param]);
                }
                return fetch(url);
            case 'http.post':
                return fetch(transportParams.url!, {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    method: 'POST',
                    body: JSON.stringify(payload)
                });
            case 'http.put':
                return fetch(transportParams.url!, {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    method: 'PUT',
                    body: JSON.stringify(payload)
                });
            case 'console.log':
                console.log(payload);
                break;
            case 'console.warn':
                console.warn(payload);
                break;
        }
    }
};
