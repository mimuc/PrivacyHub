<script lang="ts">
import StateGraphic from '$lib/components/util/StateGraphic.svelte';
</script>

<div class="container h-full mx-auto flex flex-col self-center items-center max-w-screen-xl px-4 xl:px-8">
	<h2 class="h2 mt-4">About</h2>
	<div class="mb-2 xl:mb-0">
		<h3 class="h3 mt-4 mb-2">Dashboard</h3>
		Übersicht über verbundene Geräte, deren Status und deren Privacy State
		Bei Klick auf ein Gerät: Weitere Details sowie Kontrolle der Privacy States + Proxy Einstellungen
		Hinzufügen von weiteren Geräten (nur lokal)
		<h3 class="h3 mt-4 mb-2">History</h3>
		Übersicht über vergangenen Status der Geräte und deren Privacy State
		Das Gerät kann durch das Klicken auf den Gerätenamen ausgewählt werden
		Zeitraum kann angepasst werden durch
		das Klicken auf einen der Standart-Zeitraum-Buttons
		das Bearbeiten des Start- oder Endzeitpunkts
		ziehen oder zoomen im Graphen selbst
	</div>
	<div class="flex flex-col items-center xl:flex-row xl:items-start my-4 xl:space-x-4">
<!--		<div class="bg-red-500 shrink-0 grow-0 h-32" style="width: 500px"></div>-->
		<StateGraphic classString="w-auto sm:w-[380px] shrink-0 grow-0" width={380} />
		<div class="flex-grow-1 mt-4 xl:mt-0">
			<h3 class="h3 mb-2">States</h3>
			<div class="mb-2">In <span class="text-state-local font-bold text-xl">Local mode</span> all devices are only visible from within the home network. While this poses the least security and privacy vulnerabilities, it also offers the most limited feature set.</div>
			<div class="mb-2">The <span class="text-state-online font-bold text-xl">Online mode</span> encompasses the Local mode but additionally grants the user access to the system from anywhere in the world using a dedicated account for encryption. On the Online-Website, the device-history only includes the time where the devices were in Online mode or higher. As data leaves the home network, the threat to privacy and security is increased.</div>
			<p>The <span class="text-state-online-shared font-bold text-xl">Online-Shared mode</span> includes the features from both previous modes, but also gives the user the ability to connect third party devices like e.G. Alexa or Google Home. This mode offers the most features, but also has the highest vulnerabilities to privacy and security threats, as the Privacy-Hub Eco-System no longer has complete control over what happens to your data when it can be accessed by third party devices.</p>
		</div>
	</div>
</div>
