<script lang="ts">
import LoadingSpinner from '$lib/components/LoadingSpinner.svelte';
import ApiClient from '$lib/api/ApiClient';
import { type PopupSettings, popup } from '@skeletonlabs/skeleton';

export let data: PageData;


let rowValue = "";
const updateRow = () => {
	rowValue = rowValue.replace(/[^0-9]/g, '');
	if (rowValue.length > 2) {
		rowValue = rowValue.substring(0, 2);
	}
};

let colValue = "";
const updateCol = () => {
	colValue = colValue.replace(/[^0-9]/g, '');
	if (colValue.length > 2) {
		colValue = colValue.substring(0, 2);
	}
};

let proxyLocationLoading = false;

const handleSendProxyLocation = async () => {
	proxyLocationLoading = true;
	ApiClient.sendProxyLocation(data.accessLevel, 0, Number(rowValue), Number(colValue)).then(() => {
		proxyLocationLoading = false;
	}).catch(() => {
		console.error('Failed to send proxy location');
		proxyLocationLoading = false;
	});
};

const popupProxyLocationInfo: PopupSettings = {
	event: 'hover',
	target: 'popupProxyLocationInfo',
	placement: 'bottom',
	closeQuery: '.close-popup'
}
</script>

<!-- Proxy Location Info Popup -->
<div class="card p-4 variant-filled-surface max-w-80" data-popup="popupProxyLocationInfo">
	<div class="flex flex-col items-center space-y-4">
		<div class="flex flex-col items-center text-sm">
			This option can be used to manually override the position of the Hub Proxy on the Dashboard.
			For each field the number must be between 1 and 16.
		</div>
	</div>
	<div class="arrow variant-filled-surface" />
</div>

<div class="container h-full flex flex-col items-center">
	<h2 class="h2 mt-4">Hub Proxy Settings</h2>
	<div class="flex flex-row space-x-4 items-center mt-4 pt-4 border-t border-neutral-700">
		<div>Proxy Location <i class="fa-solid fa-circle-question text-sm ml-1" use:popup={popupProxyLocationInfo}></i></div>
		<div class="flex flex-row space-x-2">
			<input
				class="input w-14 text-center"
				placeholder="Row"
				bind:value={rowValue}
				on:input={updateRow}
			>
			<input
				class="input w-14 text-center"
				placeholder="Col"
				bind:value={colValue}
				on:input={updateCol}
			>
			<button class="btn variant-filled-primary w-11" on:click={handleSendProxyLocation}>
				{#if proxyLocationLoading}
					<LoadingSpinner classes="h-6" />
				{:else}
					<i class="fa-solid fa-chevron-right"></i>
				{/if}
			</button>
		</div>
	</div>
</div>
