<script lang="ts">
	import { ConnectionStatus, PrivacyState } from '$lib/api/devices/BaseDevice';
	import { type PopupSettings, popup } from '@skeletonlabs/skeleton';

	export let icon: string;
	export let connectionStatus: ConnectionStatus;
	export let privacyState: PrivacyState;
	export let popupSettings: PopupSettings;

	// State Visuals
	let stateIconColor = '';
	const updateStateVisuals = (privacyState: PrivacyState, connectionStatus: ConnectionStatus) => {
		console.log('updateStateVisuals', privacyState, connectionStatus);
		if (connectionStatus === ConnectionStatus.DISCONNECTED) {
			stateIconColor = '';
		} else {
			switch (privacyState) {
				case PrivacyState.LOCAL:
					stateIconColor = 'text-state-local';
					break;
				case PrivacyState.ONLINE:
					stateIconColor = 'text-state-online';
					break;
				case PrivacyState.ONLINE_SHARED:
					stateIconColor = 'text-state-online-shared';
					break;
				default:
					stateIconColor = '';
					break;
			}
		}
	}
	$: updateStateVisuals(privacyState, connectionStatus);
</script>

<i class="fa-solid {icon} {stateIconColor}" use:popup={popupSettings}></i>
