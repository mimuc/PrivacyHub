<script lang="ts">
	import { getModalStore, SlideToggle } from '@skeletonlabs/skeleton';

	const modalStore = getModalStore();

	const pairDeviceCallback = $modalStore[0].meta.pairDeviceCallback;

	let pairingCode = '';
	let networkSliderChecked = false;

	const validateInput = () => {
		// Only allow numbers
		pairingCode = pairingCode.replace(/\D/g, '');
	};

	const onPairDevice = () => {
		console.log('Pairing device');
		modalStore.close();
		pairDeviceCallback(pairingCode, networkSliderChecked);
	};

	const onCancel = () => {
		console.log('Cancel pairing');
		modalStore.close();
	};
</script>

<div class="my-modal text-center card p-4 w-modal shadow-xl flex flex-col">
	<div class="h2 mb-4">
		Pair new device
	</div>
	<div class="flex flex-col mb-8">
		<div class="h4 text-left mb-4">
			Pairing code
		</div>
		<div class="text-left mb-4">
			Provide the pairing code for the device you want to add, make sure it is powered on and in pairing mode. The code can be found on the device or in the device's manual, usually below the QR code.
		</div>
		<input
			class="input"
			type="text"
			bind:value={pairingCode}
			placeholder="Enter pairing code"
			minlength="11"
			maxlength="11"
			on:input={validateInput}
		/>
	</div>
	<div class="flex flex-col mb-8">
		<div class="h4 text-left mb-2">
			Device type
		</div>
		<div class="text-left mb-4">
			Select the type of device you are adding to the network. This informatin can usually be found in the device's manual or on the packaging. Look for the Wi-Fi or Thread logo or keywords like "Thread" or "Wi-Fi".
		</div>
		<div
			class="flex flex-row justify-center space-x-2 items-center"
		>
			<div class="flex flex-row items-center" class:opacity-40={networkSliderChecked}>
				<img src="/images/logo_wifi.svg" alt="WiFi" width="60"/>
<!--				Device-->
			</div>
			<SlideToggle
				name="networkTypeSlider"
				bind:checked={networkSliderChecked}
				background="bg-surface-500"
				active="bg-surface-500"
				class="slide-toggle"
			/>
			<div class="flex flex-row items-center" class:opacity-40={!networkSliderChecked}>
				<img class="ml-2" src="/images/logo_thread.svg" alt="WiFi" width="80"/>
<!--				<span class="mt-[4px]">Device</span>-->
			</div>
		</div>
	</div>
	<div class="flex flex-row justify-end space-x-2">
		<button class="btn variant-ghost" on:click={onCancel}>
			Cancel
		</button>
		<button class="btn variant-filled-primary" on:click={onPairDevice}>
			Start pairing
		</button>
	</div>
</div>