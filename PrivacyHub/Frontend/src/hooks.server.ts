import { AccessLevel, getAccessLevel } from '$lib/util/EnvChecker';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const hostname = event.request.headers.get('host');
	console.log('hostname:', hostname);
	// if (!hostname) {
	// 	return new Response('No hostname found', { status: 400 });
	// }
	event.locals.accessLevel = hostname ? getAccessLevel(hostname) : AccessLevel.PUBLIC;
	return resolve(event);
}

// export async function handle({ event, resolve }) {
// 	const hostname = event.request.headers.get('host');
// 	console.log('hostname:', hostname);
// 	if (!hostname) {
// 		return new Response('No hostname found', { status: 400 });
// 	}
// 	event.locals.accessLevel = getAccessLevel(hostname);
// 	return resolve(event);
// }