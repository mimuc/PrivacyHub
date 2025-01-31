import { onMount } from 'svelte';

export enum AccessLevel {
	PRIVATE,
	PUBLIC,
}

export function getAccessLevel(hostname: String): AccessLevel {
	console.log('hostname to check:', hostname);
	if (
		hostname === 'localhost:8080'
		|| hostname === 'privacyhub:8080'
		|| hostname === 'privacyhub.local:8080'
	) {
		return AccessLevel.PRIVATE;
	} else {
		return AccessLevel.PUBLIC;
	}
}