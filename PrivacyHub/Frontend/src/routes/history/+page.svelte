<script lang="ts">
	import { onMount } from 'svelte';
	import * as d3 from 'd3';
	import DeviceSelection from '$lib/components/DeviceSelection.svelte';
	import { type PopupSettings, popup } from '@skeletonlabs/skeleton';
	import BaseDevice, { PrivacyState } from '$lib/api/devices/BaseDevice';
	import LoadingSpinner from '$lib/components/LoadingSpinner.svelte';
	import DateTimeInput from '$lib/components/util/DateTimeInput.svelte';
	import TopAxis from '$lib/components/deviceHistories/common/TopAxis.svelte';
	import { AccessLevel } from '$lib/util/EnvChecker';
	import Spacer from '$lib/components/deviceHistories/common/Spacer.svelte';
	import AttributeHistory from '$lib/components/deviceHistories/AttributeHistory.svelte';
	import type { HistoryAttributeMapping } from '$lib/components/deviceHistories/HistoryUtils';
	import InfoPopup from '$lib/components/util/InfoPopup.svelte';
	import theme from 'tailwindcss/defaultTheme';

	export let data: PageData;

	let containerBinding: HTMLElement;
	const containerPaddingDesktop = 40;
	const containerPaddingMobile = 16;
	let containerPadding = containerPaddingDesktop;
	let containerWidth = 0;

	let graphMarginLeft = 20;
	let graphMarginRight = 60;

	let graphTicks = 10;

	console.log(theme.screens.md)
	// Change container padding at md: breakpoint



	const handleResize = () => {
		if (window.innerWidth > parseInt(theme.screens.md)) {
			containerPadding = containerPaddingDesktop;
			graphMarginLeft = 20;
			graphMarginRight = 60;
			graphTicks = 10;
		} else {
			containerPadding = containerPaddingMobile;
			graphMarginLeft = 20;
			graphMarginRight = 20;
			graphTicks = 5;
		}
		containerWidth = containerBinding.clientWidth - containerPadding * 2;
	}

	const popupClick: PopupSettings = {
		event: 'click',
		target: 'popupClick',
		placement: 'bottom',
		closeQuery: '.close-popup'
	}

	let isLoading = true;
	let showNoDevicesInfo = false;

	let currentDevice: BaseDevice | undefined = undefined;

	const handleDeviceSelection = (event: CustomEvent<{ device: BaseDevice }>) => {
		isLoading = false;
		currentDevice = event.detail.device;
		showNoDevicesInfo = currentDevice === undefined;
	}

	let historyComponent = null;

	$: historyComponent = currentDevice?.getHistoryComponent()

	let startDate = new Date();
	let endDate = new Date();

	let timestampStart = 0;
	let timestampEnd = 0;

	$: {
		startDate = new Date(timestampStart);
		endDate = new Date(timestampEnd);
	}

	const inputStartDateUpdated = (event: CustomEvent<{ newDate: Date }>) => {
		timestampStart = event.detail.newDate.getTime();
	}

	const inputEndDateUpdated = (event: CustomEvent<{ newDate: Date }>) => {
		timestampEnd = event.detail.newDate.getTime();
	}

	onMount(() => {
		handleResize();
	});

	const privacyStateAttributeMapping: HistoryAttributeMapping[] = [
		{ attributeValue: PrivacyState.LOCAL, text: 'Local', color: '#70b853' },
		{ attributeValue: PrivacyState.ONLINE, text: 'Online', color: '#f2a641' },
		{ attributeValue: PrivacyState.ONLINE_SHARED, text: 'Online-Shared', color: '#e05c49' },
	];


	const popupOnlineInfo: PopupSettings = {
		event: 'hover',
		target: 'popupOnlineInfo',
		placement: 'bottom',
		closeQuery: '.close-popup'
	}


	// Set default time ranges
	const setRangeToday = () => {
		const today = new Date();
		timestampStart = new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime();
		timestampEnd = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59).getTime();
	}

	const setRangeYesterday = () => {
		const yesterday = new Date();
		yesterday.setDate(yesterday.getDate() - 1);
		timestampStart = new Date(yesterday.getFullYear(), yesterday.getMonth(), yesterday.getDate()).getTime();
		timestampEnd = new Date(yesterday.getFullYear(), yesterday.getMonth(), yesterday.getDate(), 23, 59, 59).getTime();
	}

	const setRangeThisWeek = () => {
		const today = new Date();
		const day = today.getDay();
		const diff = today.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
		timestampStart = new Date(today.setDate(diff)).getTime();
		timestampEnd = new Date(today.setDate(diff + 6)).getTime();
	}

	const setRangeLastWeek = () => {
		const today = new Date();
		const day = today.getDay();
		const diff = today.getDate() - day + (day == 0 ? -6 : 1) - 7; // adjust when day is sunday
		timestampStart = new Date(today.setDate(diff)).getTime();
		timestampEnd = new Date(today.setDate(diff + 6)).getTime();
	}

	const setRangeThisMonth = () => {
		const today = new Date();
		timestampStart = new Date(today.getFullYear(), today.getMonth(), 1).getTime();
		timestampEnd = new Date(today.getFullYear(), today.getMonth() + 1, 0, 23, 59, 59).getTime();
	}

	const setRangeLastMonth = () => {
		const today = new Date();
		timestampStart = new Date(today.getFullYear(), today.getMonth() - 1, 1).getTime();
		timestampEnd = new Date(today.getFullYear(), today.getMonth(), 0, 23, 59, 59).getTime();
	}

</script>

<style>
    .chart :global(div) {
        font: 10px sans-serif;
        background-color: steelblue;
        text-align: right;
        padding: 3px;
        margin: 1px;
        color: white;
    }
</style>

<svelte:window on:resize={handleResize} />

<!-- Online Info Popup -->
<InfoPopup dataPopup="popupOnlineInfo" icon="fa-shield-halved">
	In the online frontend you can only see the history of devices that are currently in the online access state.<br>In addition to that, the history data is limited to the time periods when the device was in the online access state.
</InfoPopup>

<div
	bind:this={containerBinding}
	class="box-border h-full w-full flex justify-center {showNoDevicesInfo ? 'items-center' : ''}"
	style="padding-left: {containerPadding}px; padding-right: {containerPadding}px;"
>
	{#if showNoDevicesInfo}
		<div class="space-y-10 text-center flex flex-col items-center">
			<p class="text-lg">No devices paired yet{data.accessLevel !== AccessLevel.PRIVATE ? " or no device in online access state" : ""}.</p>
		</div>
	{:else}
		<!--{#if data.accessLevel === AccessLevel.PRIVATE}-->
		<DeviceSelection accessLevel={data.accessLevel} on:select={handleDeviceSelection} />
		<div class="text-center flex flex-col items-center pt-4">
			<h2 class="h1 mb-8 flex flex-col items-center sm:flex-row">
				<div>
					{#if data.accessLevel === AccessLevel.PUBLIC}
						Online
					{/if}
					Device
				</div>
				<div class="hidden sm:block">
					&nbsp;
				</div>
				<div class="flex flex-row">
					History
					{#if data.accessLevel === AccessLevel.PUBLIC}
						<i class="fa-solid fa-circle-question text-sm ml-2 h-5" use:popup={popupOnlineInfo}></i>
					{/if}
				</div>

			</h2>
			<!-- Default buttons mobile -->
			<div class="mb-4 flex flex-col items-center space-y-2 md:hidden">
				<div class="flex flex-row space-x-2">
					<button class="btn variant-filled-primary w-32" on:click={setRangeToday}>
						Today
					</button>
					<button class="btn variant-filled-primary w-32" on:click={setRangeYesterday}>
						Yesterday
					</button>
				</div>
				<div class="flex flex-row space-x-2">
					<button class="btn variant-filled-primary w-32" on:click={setRangeThisWeek}>
						This week
					</button>
					<button class="btn variant-filled-primary w-32" on:click={setRangeLastWeek}>
						Last week
					</button>
				</div>
				<div class="flex flex-row space-x-2">
					<button class="btn variant-filled-primary w-32" on:click={setRangeThisMonth}>
						This month
					</button>
					<button class="btn variant-filled-primary w-32" on:click={setRangeLastMonth}>
						Last month
					</button>
				</div>
			</div>
			<!-- Default buttons desktop -->
			<div class="mb-4 hidden md:flex flex-row space-x-2">
				<button class="btn variant-filled-primary" on:click={setRangeToday}>
					Today
				</button>
				<button class="btn variant-filled-primary" on:click={setRangeYesterday}>
					Yesterday
				</button>
				<button class="btn variant-filled-primary" on:click={setRangeThisWeek}>
					This week
				</button>
				<button class="btn variant-filled-primary" on:click={setRangeLastWeek}>
					Last week
				</button>
				<button class="btn variant-filled-primary" on:click={setRangeThisMonth}>
					This month
				</button>
				<button class="btn variant-filled-primary" on:click={setRangeLastMonth}>
					Last month
				</button>
			</div>
			<!-- Device and time selection mobile -->
			<div class="flex flex-col w-full justify-between md:hidden">
				<div class="mb-4">
					<h2 class="h3 mb-2">Selected device:</h2>
					<button class="btn variant-ghost-tertiary h-10 mx-8" use:popup={popupClick}>
						{#if currentDevice}
							{currentDevice.formattedVendorAndProduct}
						{:else}
							<LoadingSpinner classes="h-6 w-6" />
						{/if}
					</button>
				</div>
				<div class="flex flex-row justify-between">
					<div>
						<h2 class="h3 mb-2">From:</h2>
						<DateTimeInput date={startDate} on:dateUpdate={inputStartDateUpdated} />
					</div>

					<div>
						<h2 class="h3 mb-2">Until:</h2>
						<DateTimeInput date={endDate} on:dateUpdate={inputEndDateUpdated} />
					</div>
				</div>
			</div>
			<!-- Device and time selection desktop -->
			<div class="hidden md:flex flex-row w-full justify-between">
				<div>
					<h2 class="h3 mb-2">From:</h2>
					<DateTimeInput date={startDate} on:dateUpdate={inputStartDateUpdated} />
				</div>
				<div>
					<h2 class="h3 mb-2">Selected device:</h2>
					<button class="btn variant-ghost-tertiary h-10 mx-8" use:popup={popupClick}>
						{#if currentDevice}
							{currentDevice.formattedVendorAndProduct}
						{:else}
							<LoadingSpinner classes="h-6 w-6" />
						{/if}
					</button>
				</div>
				<div>
					<h2 class="h3 mb-2">Until:</h2>
					<DateTimeInput date={endDate} on:dateUpdate={inputEndDateUpdated} />
				</div>
			</div>
			<TopAxis
				width={containerWidth}
				marginLeft={graphMarginLeft}
				marginRight={graphMarginRight}
				ticks={graphTicks}
				bind:timestampStart={timestampStart}
				bind:timestampEnd={timestampEnd}
			/>
			<svelte:component
				this={historyComponent}
				device={currentDevice}
				accessLevel={data.accessLevel}
				width={containerWidth}
				marginLeft={graphMarginLeft}
				marginRight={graphMarginRight}
				ticks={graphTicks}
				title={currentDevice?.getHistoryComponentTitle()}
				attributeName={currentDevice?.getHistoryComponentAttributeName()}
				attributeMapping={currentDevice?.getHistoryComponentMappings()}
				bind:timestampStart={timestampStart}
				bind:timestampEnd={timestampEnd}
			/>
			<Spacer
				width={containerWidth}
				height={20}
				marginLeft={graphMarginLeft}
				marginRight={graphMarginRight}
				ticks={graphTicks}
				bind:timestampStart={timestampStart}
				bind:timestampEnd={timestampEnd}
			/>
			<AttributeHistory
				device={currentDevice}
				accessLevel={data.accessLevel}
				width={containerWidth}
				marginLeft={graphMarginLeft}
				marginRight={graphMarginRight}
				ticks={graphTicks}
				title="Privacy State"
				attributeName="privacyState"
				attributeMapping={privacyStateAttributeMapping}
				bind:timestampStart={timestampStart}
				bind:timestampEnd={timestampEnd}
			/>
			<div class="text-neutral-500 my-4">
				Zoom or drag the graph to change the time range.
			</div>
		</div>
		<!--{:else}-->
		<!--	Device history is only available in the local application-->
		<!--{/if}-->
	{/if}
</div>

