// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
import type { AccessLevel } from '$lib/util/EnvChecker';

declare namespace App {
	interface Locals {
		accessLevel: AccessLevel;
	}
	// interface PageData {}
	// interface Error {}
	// interface Platform {}
}
