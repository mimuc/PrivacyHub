import { join } from 'path';
import type { Config } from 'tailwindcss';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import { skeleton } from '@skeletonlabs/tw-plugin';
import { Private } from './src/Private';

/** @type {import('tailwindcss').Config} */
export default {
	darkMode: 'class',
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		join(require.resolve('@skeletonlabs/skeleton'), '../**/*.{html,js,svelte,ts}')
	],
	theme: {
		extend: {
			colors: {
				'connected-light': '#7eaf57',
				'connected-dark': '#61913c',
				'disconnected-light': '#b14b4b',
				'disconnected-dark': '#7f2d2d',
				'state-local': '#70b853',
				'state-online': '#f2a641',
				'state-online-shared': '#e05c49',
			},
			flexGrow: {

			}
		}
	},
	plugins: [
		forms,
		typography,
		skeleton({
			themes: {
				preset: [
					{
						name: 'skeleton',
						enhancements: true
					},
					{
						name: 'crimson',
						enhancements: true
					}
				],
				custom: [Private]
			}
		}),
	]
} satisfies Config;
