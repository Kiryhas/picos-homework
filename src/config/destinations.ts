import { Destination } from 'src/types';

export const DESTINATIONS: Destination[] = [
	{
		name: 'destination1',
		url:'http://example.com/endpoint',
		transport: 'http.post'
	},
	{
		name: 'destination2',
		url:'http://example2.com/endpoint',
		transport: 'http.put'
	},
	{
		name: 'destination3',
		url:'http://example3.com/endpoint',
		transport: 'http.get'
	},
	{
		name: 'destination4',
		url:'http://example4.com/endpoint',
		transport: 'http.get'
	}
];
