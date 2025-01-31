// import os from 'os';

import { PUBLIC_LOCAL_BACKEND_URL } from '$env/static/public';

export const BACKEND_URL = PUBLIC_LOCAL_BACKEND_URL;

// /**
//  * Get local IP addresses of the machine
//  * @private
//  */
// function getLocalIpAddress(): string {
// 	const networkInterfaces = os.networkInterfaces();
//
// 	const addresses: string[] = [];
//
// 	// eslint-disable-next-line @typescript-eslint/no-unused-vars
// 	for (const [_, interfaces] of Object.entries(networkInterfaces)) {
// 		if (interfaces === undefined) {
// 			continue;
// 		}
// 		for (const iface of interfaces) {
// 			if (iface.family === 'IPv4' && !iface.internal) {
// 				addresses.push(iface.address);
// 			}
// 		}
// 	}
//
// 	return addresses[0] ?? PUBLIC_LOCAL_BACKEND_URL;
// }