<script lang="ts">
	import * as d3 from 'd3';
	import BaseDevice, { ConnectionStatus } from '$lib/api/devices/BaseDevice';
	import OnOffPluginUnit from '$lib/api/devices/OnOffPluginUnit';
	import LoadingSpinner from '$lib/components/LoadingSpinner.svelte';
	import {
		centerEvent, formatTimestamp, getFormattedDuration,
		getTimestampDifference,
		type HistoryAttributeMapping
	} from '$lib/components/deviceHistories/HistoryUtils';
	import type ContactSensor from '$lib/api/devices/ContactSensor';
	import { type PopupSettings, popup } from '@skeletonlabs/skeleton';
	import type { AccessLevel } from '$lib/util/EnvChecker';

	export let device: BaseDevice;
	export let accessLevel: AccessLevel;

	export let width = 640;
	export let height = 150;
	export let marginTop = 20;
	export let marginBottom = 20;
	export let marginRight = 20;
	export let marginLeft = 45;

	export let ticks: number = 10;

	export let title: string;
	export let attributeName: string;
	export let attributeMapping: HistoryAttributeMapping[];

	// export let trueString = 'ON';
	// export let trueColor = '#3c8eae';
	// export let falseString = 'OFF';
	// export let falseColor = '#3d3e46';

	let isLoading = true;

	// Bindings
	let viewBoxBinding: HTMLElement;
	let xAxisGridBinding: SVGElement;
	let yAxisBinding: SVGElement;

	// The start and end of the graph's x-axis
	export let timestampStart: number = 0;
	export let timestampEnd: number = 0;

	// let booleanAttributeName: string = '';
	// $: booleanAttributeName = device instanceof OnOffPluginUnit ? 'onOffState' : 'booleanState';


	// Get the history data of the device
	let data: {
		connectionStatus: ConnectionStatus;
		attributeVal: any;
		timestampStart: number;
		timestampEnd: number;
	}[] = [];

	let popupDetailList: PopupSettings[] = [];

	$: device && loadData();

	const loadData = () => {
		device.getHistory().then(history => {
			isLoading = true;

			const dataTemp: {
				connectionStatus: ConnectionStatus;
				attributeVal: any;
				timestamp: number;
			}[] = [];
			data = [];

			// Remove duplicate entries
			history.forEach((entry, index) => {
				const dataObject = {
					connectionStatus: entry.connectionStatus,
					attributeVal: entry[attributeName],
					timestamp: entry.timestamp
				};

				// Remove duplicate entries
				if (
					dataTemp.length > 0
					&& dataTemp[dataTemp.length - 1].attributeVal === dataObject.attributeVal
					&& dataTemp[dataTemp.length - 1].connectionStatus === dataObject.connectionStatus
				) {
					return;
				}

				dataTemp.push(dataObject);
			});

			popupDetailList = [];

			// Calculate the start and end of the data
			dataTemp.forEach((entry, index) => {
				const timestampEnd = dataTemp[index + 1]?.timestamp ?? Date.now();
				const dataObject = {
					connectionStatus: entry.connectionStatus,
					attributeVal: entry.attributeVal,
					timestampStart: entry.timestamp,
					timestampEnd: timestampEnd
				};

				popupDetailList.push({
					event: 'hover',
					target: `popupDetails-${device.nodeId}-${device.endpointId}-${title}-${index}`,
					placement: 'top',
				});

				data.push(dataObject);
			});
			data = data;

			// Calculate the start and end of the data
			const start = d3.min(data.map(entry => entry.timestampStart));
			const end = d3.max(data.map(entry => entry.timestampEnd));
			timestampStart = start ?? 0;
			timestampEnd = end ?? 0;

			isLoading = false;
		}).catch((error) => {
			isLoading = false;
			console.error(error);
		});
	}

	// // Event for panning the xAxis
	// const dragEvent = (event, d) => {
	// 	console.log("DRAG");
	// 	const panDistance = getTimestampDifference(
	// 		event.dx,
	// 		timestampStart,
	// 		timestampEnd,
	// 		width,
	// 		marginLeft,
	// 		marginRight
	// 	)
	// 	timestampStart -= panDistance;
	// 	timestampEnd -= panDistance;
	// };

	let lastTransform = d3.zoomIdentity;

	// Event for zooming the xAxis
	const zoomEvent = (event, d) => {
		const transform = event.transform;
		const kFactor = transform.k / lastTransform.k;

		// Check if zoom event
		if (kFactor === 1) {
			// Pan
			const dx = transform.x - lastTransform.x;
			const panDistance = getTimestampDifference(
				dx,
				timestampStart,
				timestampEnd,
				width,
				marginLeft,
				marginRight
			)
			timestampStart -= panDistance;
			timestampEnd -= panDistance;
		} else {
			// Zoom
			const localCenter = centerEvent(event, viewBoxBinding, width, height);
			const localX = localCenter[0] - marginLeft;
			const graphWidth = width - marginLeft - marginRight;
			const zoomDelta = (kFactor - 1) * -700;

			const timestampDifference = timestampEnd - timestampStart;

			// Calculate the new timestamp difference
			const targetTimestampDifference = timestampDifference + zoomDelta * timestampDifference / 1000;

			const differenceToCurrent = targetTimestampDifference - timestampDifference;

			// "Zoom" around the mouse position
			const distanceStart = localX / graphWidth * differenceToCurrent;
			const distanceEnd = (graphWidth - localX) / graphWidth * differenceToCurrent;

			// Update the timestamps
			timestampStart = timestampStart - distanceStart;
			timestampEnd = timestampEnd + distanceEnd;
		}

		lastTransform = transform;
	};

	// The D3 Magic
	// $: x = d3.scaleTime(d3.extent(data.map(entry => entry.timestamp)), [marginLeft, width - marginRight]).nice();
	$: x = d3.scaleTime([timestampStart, timestampEnd], [marginLeft, width - marginRight]);
	$: y = d3.scaleLinear([0, 1], [height - marginBottom, marginTop]);
	// $: d3.select(gx).call(d3.axisBottom(x).tickFormat(d3.timeFormat('%H:%M')));
	$: d3.select(xAxisGridBinding).call(d3.axisBottom(x).tickSize(-height).tickFormat('').ticks(ticks)) && d3.select(xAxisGridBinding).selectAll('path').remove() && d3.select(xAxisGridBinding).selectAll('line').attr('stroke', '#ffffff33');
	// $: d3.select(yAxisBinding).call(d3.axisLeft(y).tickValues([0, 1]).tickFormat(d => d ? 'ON' : 'OFF')) && d3.select(yAxisBinding).selectAll('path').remove() && d3.select(yAxisBinding).selectAll('line').remove();

	// $: d3.select(viewBoxBinding).call(d3.drag().on('drag', dragEvent));
	$: d3.select(viewBoxBinding).call(d3.zoom().on('zoom', zoomEvent));

</script>

{#each data as entry, index}
	<div class="card p-2 variant-filled-surface w-40" data-popup="popupDetails-{device.nodeId}-{device.endpointId}-{title}-{index}">
		<div class="flex flex-col">
			<div
				class="font-bold text-xl"
				style="color: {attributeMapping.find(mapping => mapping.attributeValue === entry.attributeVal)?.color}"
			>
				{attributeMapping.find(mapping => mapping.attributeValue === entry.attributeVal)?.text}
			</div>
			<div class="flex flex-row justify-between pt-2">
				<div>from</div>
				<div class="text-right">{formatTimestamp(entry.timestampStart)}</div>
			</div>
			<div class="flex flex-row justify-between pt-1 border-t border-t-neutral-400">
				<div>until</div>
				<div class="text-right">{formatTimestamp(entry.timestampEnd)}</div>
			</div>
			<div class="flex flex-row justify-between pt-1 border-t border-t-neutral-400">
				<div>duration</div>
				<div class="text-right">{getFormattedDuration(entry.timestampStart, entry.timestampEnd)}</div>
			</div>
		</div>
<!--		<div class="arrow variant-filled-surface" />-->
	</div>
{/each}

{#if isLoading}
	<LoadingSpinner />
{:else}
	<div>
		<svg bind:this={viewBoxBinding} width={width} height={height}>
			<g>
				<rect width={width} height={height} rx="10" ry="10" fill="#ffffff11" />
			</g>
			<g bind:this={xAxisGridBinding} transform="translate(0,{height})" />
			<g bind:this={yAxisBinding} class="text-lg" transform="translate({marginLeft},0)" />
			<g fill="none">
				{#each data as entry, index}
					{#if entry.connectionStatus === ConnectionStatus.CONNECTED}
<!--						<clipPath id="clip">-->
<!--							<rect x={marginLeft} y={0} width={width - marginLeft - marginRight} height={height} />-->
<!--						</clipPath>-->
						<rect
							x={x(entry.timestampStart)}
							y={marginTop}
							width={x(entry.timestampEnd) - x(entry.timestampStart)}
							height={height - marginBottom - marginTop}
							fill={attributeMapping.find(mapping => mapping.attributeValue === entry.attributeVal)?.color}
							use:popup={popupDetailList[index]}
						/>
<!--						<use href="#chart-rect-{index}" clip-path="url(#clip)" stroke="#3c8eae" stroke-width="4" />-->
					{/if}
				{/each}
			</g>
			<g>
				<text
					x={width - 30}
					y={height / 2}
					text-anchor="middle"
					alignment-baseline="middle"
					fill="#ffffff"
					paint-order="stroke"
					stroke="#25262e"
					stroke-width="5px"
					transform="rotate(90, {width - 30}, {height / 2})"
				>{title}</text>
			</g>
<!--			<g fill="none">-->
<!--				<clipPath id="clip">-->
<!--					<rect x={marginLeft} y={0} width={width - marginLeft - marginRight} height={height} />-->
<!--				</clipPath>-->
<!--				<path id="chart-path" d={d3.line()(data.map(entry => [x(entry.timestamp), y(entry.booleanState ? 1 : 0)]))}></path>-->
<!--				<use href="#chart-path" clip-path="url(#clip)" stroke="#3c8eae" stroke-width="4" />-->
<!--			</g>-->
		</svg>
	</div>
{/if}