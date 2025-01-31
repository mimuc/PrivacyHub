<script lang="ts">
	import * as d3 from 'd3';
	import { centerEvent, getTimestampDifference } from '$lib/components/deviceHistories/HistoryUtils';

	export let width = 640;
	export let height = 100;
	export let marginTop = 60;
	export let marginBottom = 30;
	export let marginRight = 45;
	export let marginLeft = 45;
	export let ticks: number = 10;

	// Bindings
	let viewBoxBinding: HTMLElement;
	let xAxisBinding: SVGElement;
	let xAxisGridBinding: SVGElement;

	// The start and end of the graph's x-axis
	export let timestampStart: number = 0;
	export let timestampEnd: number = 0;

	const arrowWidth = 20;
	const arrowMarginTop = 6;
	const arrowMarginBottom = 9;


	// // Event for panning the xAxis
	// const dragEvent = (event, d) => {
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
	$: x = d3.scaleTime([timestampStart, timestampEnd], [marginLeft, width - marginRight]);
	$: d3.select(xAxisBinding).call(d3.axisTop(x).ticks(ticks));
	$: d3.select(xAxisGridBinding).call(d3.axisBottom(x).tickSize(height - marginTop).tickFormat('').ticks(ticks)) && d3.select(xAxisGridBinding).selectAll('path').remove() && d3.select(xAxisGridBinding).selectAll('line').attr('stroke', '#ffffff33');

	// $: d3.select(viewBoxBinding).call(d3.drag().on('drag', dragEvent));
	$: d3.select(viewBoxBinding).call(d3.zoom().on('zoom', zoomEvent));

</script>

<svg bind:this={viewBoxBinding} style="margin-top: -7px" width={width} height={height}>
	<polygon points="{marginLeft - arrowWidth / 2},{arrowMarginTop} {marginLeft + arrowWidth / 2},{arrowMarginTop} {marginLeft},{marginTop - arrowMarginBottom}" fill="#272b38" />
<!--	<path d="M{marginLeft - arrowWidth / 2},{arrowMarginTop} L{marginLeft},{marginTop - arrowMarginBottom} L{marginLeft + arrowWidth / 2},{arrowMarginTop}" stroke="#ffffff" stroke-width="1" fill="None" />-->
	<polygon points="{width - marginRight - arrowWidth / 2},{arrowMarginTop} {width - marginRight + arrowWidth / 2},{arrowMarginTop} {width - marginRight},{marginTop - arrowMarginBottom}" fill="#272b38" />
<!--	<path d="M{width - marginRight - arrowWidth / 2},{arrowMarginTop} L{width - marginRight},{marginTop - arrowMarginBottom} L{width - marginRight + arrowWidth / 2},{arrowMarginTop}" stroke="#ffffff" stroke-width="1" fill="None" />-->
	<g bind:this={xAxisBinding} class="text-base" transform="translate(0,{marginTop})" />
	<g bind:this={xAxisGridBinding} transform="translate(0,{marginTop})" />
	<!--	<g bind:this={xAxisBinding} transform="translate(0,{height - marginBottom})" />-->
</svg>