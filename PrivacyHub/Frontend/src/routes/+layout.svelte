<script lang="ts">
	import '../app.postcss';
	import {
		AppShell,
		AppBar,
		initializeStores,
		getDrawerStore,
		Drawer,
		Modal,
		type ModalComponent,
		modeCurrent,
		getModeUserPrefers,
		setModeCurrent
	} from '@skeletonlabs/skeleton';

	// Highlight JS
	import hljs from 'highlight.js/lib/core';
	import 'highlight.js/styles/github-dark.css';
	import { storeHighlightJs } from '@skeletonlabs/skeleton';
	import xml from 'highlight.js/lib/languages/xml'; // for HTML
	import css from 'highlight.js/lib/languages/css';
	import javascript from 'highlight.js/lib/languages/javascript';
	import typescript from 'highlight.js/lib/languages/typescript';

	import '$lib/styles/app.css';


	hljs.registerLanguage('xml', xml); // for HTML
	hljs.registerLanguage('css', css);
	hljs.registerLanguage('javascript', javascript);
	hljs.registerLanguage('typescript', typescript);
	storeHighlightJs.set(hljs);

	// export let accessLevel: AccessLevel;
	export let data: LayoutData;

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });


	connectSocket(data.accessLevel);

	initializeStores();
	const drawerStore = getDrawerStore();

	const drawerOpen = () => {
		drawerStore.open({});
	};

	// Setting up custom modals
	import LoadingModal from '$lib/modals/LoadingModal.svelte';
	import { connectSocket } from '$lib/sockets/SocketClient';
	import ConnectionStatus from '$lib/components/ConnectionStatus.svelte';
	import OnOffPluginUnitDetails from '$lib/components/deviceDetails/OnOffPluginUnitDetails.svelte';
	import ContactSensorDetails from '$lib/components/deviceDetails/ContactSensorDetails.svelte';
	import ExtendedColorLightDetails from '$lib/components/deviceDetails/ExtendedColorLightDetails.svelte';
	import type { LayoutData } from '../../.svelte-kit/types/src/routes/$types';
	import Navigation from '$lib/navigation/Navigation.svelte';
	import { onMount } from 'svelte';
	import AddDeviceModal from '$lib/components/util/AddDeviceModal.svelte';

	const modalRegistry: Record<string, ModalComponent> = {
		loading: { ref: LoadingModal },
		addDeviceModal: { ref: AddDeviceModal },
		onOffPluginUnitDetails: { ref: OnOffPluginUnitDetails },
		contactSensorDetails: {ref: ContactSensorDetails },
		extendedColorLightDetails: { ref: ExtendedColorLightDetails },
	};

	// Set the current mode
	let currentMode = getModeUserPrefers();
	modeCurrent.subscribe((value) => {
		currentMode = value;
	});
	onMount(() => {
		setModeCurrent(false);
	});
</script>

<Drawer>
	<Navigation accessLevel={data.accessLevel} />
</Drawer>

<Modal components={modalRegistry} />
<!-- App Shell -->
<AppShell slotSidebarLeft="bg-surface-500/5 w-0 lg:w-64">
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<AppBar>
			<svelte:fragment slot="lead">
				<div class="flex items-center">
					<button class="lg:hidden btn btn-sm mr-4" on:click={drawerOpen}>
						<span>
							<svg viewBox="0 0 100 80" class="fill-token w-4 h-4">
								<rect width="100" height="20" />
								<rect y="30" width="100" height="20" />
								<rect y="60" width="100" height="20" />
							</svg>
						</span>
					</button>
					{#if currentMode}
						<img
							src="/images/logo_dark.svg"
							alt="PrivacyHub Logo"
							class="w-24 lg:w-36 lg:px-4 cursor-pointer"
							on:click={() => {
								// navigate to home
								window.location.href = '/';
							}}
						/>
					{:else}
						<img
							src="/images/logo_light.svg"
							alt="PrivacyHub Logo"
							class="w-24 lg:w-36 lg:px-4 cursor-pointer"
							on:click={() => {
								// navigate to home
								window.location.href = '/';
							}}
						/>
					{/if}
					<!--					<strong class="text-xl uppercase">PrivacyHub</strong>-->
				</div>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<ConnectionStatus />
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<svelte:fragment slot="sidebarLeft">
		<div class="flex flex-col">
			<Navigation accessLevel={data.accessLevel} />
		</div>
	</svelte:fragment>
	<!-- Page Route Content -->
	<slot />
	<!--{#if data.accessLevel === AccessLevel.PUBLIC}-->
	<!--	PUBLIC-->
	<!--{:else if data.accessLevel === AccessLevel.PRIVATE}-->
	<!--	PRIVATE-->
	<!--{:else}-->
	<!--	UNKNOWN-->
	<!--{/if}-->
</AppShell>
