export interface IncomingEvent {
    payload: Record<string, any>;
    possibleDestinations: Record<string, boolean>[];
    strategy: string;
}

export type StrategyTransport = 'http.get' | 'http.post' | 'http.put' | 'console.warn' | 'console.log';

export interface Destination {
    name: string;
    transport: StrategyTransport;
    url?: string;
}
