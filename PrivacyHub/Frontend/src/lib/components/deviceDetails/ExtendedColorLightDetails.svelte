<script lang="ts">
	import { type SvelteComponent } from 'svelte';
	import { getModalStore } from '@skeletonlabs/skeleton';
	import type OnOffPluginUnit from '$lib/api/devices/OnOffPluginUnit';
	import ApiClient from '$lib/api/ApiClient';
	import DetailsBase from '$lib/components/deviceDetails/DetailsBase.svelte';
	import { socketStore } from '$lib/store/GeneralStore';
	import type { AccessLevel } from '$lib/util/EnvChecker';
	import VerticalRangeSlider from '$lib/components/util/VerticalRangeSlider.svelte';
	import type ExtendedColorLight from '$lib/api/devices/ExtendedColorLight';
	import ColorPicker from '$lib/components/util/ColorPicker.svelte';
	import ColorWheelIcon from '$lib/components/util/ColorWheelIcon.svelte';

	// Props
	/** Exposes parent props to this component. */
	export let parent: SvelteComponent;

	let showColorWheel = true;

	// Socket events
	$socketStore.on('booleanState', (data) => {
		console.log('booleanState Light', data);
		if (device.nodeId === data.nodeId && device.endpointId === data.endpointId) {
			device.state = data.state;
		}
	});

	$socketStore.on('lightLevel', (data) => {
		console.log('lightLevel', data);
		if (device.nodeId === data.nodeId && device.endpointId === data.endpointId) {
			device.value = data.value;
		}
	});

	$socketStore.on('colorHueSaturation', (data) => {
		console.log('colorHueSaturation', data);
		if (device.nodeId === data.nodeId && device.endpointId === data.endpointId) {
			device.hue = data.hue;
			device.saturation = data.saturation;
		}
	});

	const modalStore = getModalStore();

	const accessLevel: AccessLevel = $modalStore[0].meta.accessLevel;
	if (accessLevel === undefined) throw new Error('AccessLevel is required for this modal.');

	const device: ExtendedColorLight = $modalStore[0].meta.device;
	if (!device) throw new Error('Device is required for this modal.');

	const onOffStateChanged = () => {
		ApiClient.setOnOff(accessLevel, device.nodeId, device.endpointId, !device.state)
			.then(() => {
				// device.state = !device.state;
			})
			.catch((error) => {
				console.error('Error setting device enabled:', error.toString());
			});
	};

	const onLightLevelChanged = (value: number) => {
		ApiClient.setLightLevel(accessLevel, device.nodeId, device.endpointId, value)
			.then(() => {
				device.value = value;
			})
			.catch((error) => {
				console.error('Error setting device enabled:', error.toString());
			});
	};

	const onHueSaturationChanged = (hue: number, saturation: number) => {
		ApiClient.setColorHueSaturation(accessLevel, device.nodeId, device.endpointId, hue, saturation)
			.then(() => {
				device.hue = hue;
				device.saturation = saturation;
			})
			.catch((error) => {
				console.error('Error setting device enabled:', error.toString());
			});
	};

	let currentColor = '#F1B74BFF'

	const selectColorWheel = () => {
		showColorWheel = true;
	};

	const selectLevelControl = () => {
		showColorWheel = false;
	};
</script>

<DetailsBase device={device} accessLevel={accessLevel} icon="fa-lightbulb">
	<div class="flex flex-col justify-center items-center space-y-4">
		{#if showColorWheel}
			<ColorPicker
				size={250}
				currentHue={device.hue / 254}
				currentSaturation={device.saturation / 254}
				bind:color={currentColor}
				onValuesChange={onHueSaturationChanged}
			/>
		{:else}
			<VerticalRangeSlider
				classString=""
				width={80}
				height={250}
				minValue={0}
				maxValue={254}
				currentValue={device.value}
				color={currentColor}
				onValueChange={onLightLevelChanged}
			/>
		{/if}
		<div class="flex flex-row bg-neutral-400 bg-opacity-10 rounded-full items-center">
			<button
				class="btn-icon btn-icon-lg mr-2 {device.state ? 'variant-filled-primary' : 'variant-ghost'}"
				on:click={onOffStateChanged}
			>
				<i class="fa-solid fa-power-off"></i>
			</button>
			<div class="h-10 w-[1px] bg-neutral-500"></div>
			<button
				class="btn-icon btn-icon-lg mx-2 {showColorWheel ? 'variant-filled-tertiary' : 'variant-ghost'}"
				on:click={selectColorWheel}
			>
				<i class="fa-solid fa-palette"></i>
<!--				<ColorWheelIcon size={20} id="2" />-->
			</button>
			<button
				class="btn-icon btn-icon-lg {!showColorWheel ? 'variant-filled-tertiary' : 'variant-ghost'}"
				on:click={selectLevelControl}
			>
				<i class="fa-solid fa-circle-half-stroke"></i>
			</button>
		</div>

	</div>
</DetailsBase>