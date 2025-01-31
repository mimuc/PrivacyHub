import * as d3 from 'd3';

export interface HistoryAttributeMapping {
	attributeValue: any;
	text: string;
	color: string;
}

export const getTimestampDifference = (
	delta: number,
	timestampStart: number,
	timestampEnd: number,
	width: number,
	marginLeft: number,
	marginRight: number
): number => {
	const panArea = width - marginLeft - marginRight;
	const timeDifference = timestampEnd - timestampStart;
	const timePerPixel = timeDifference / panArea;
	return delta * timePerPixel;
}

// center the action (handles multitouch)
export const centerEvent = (event, target, width, height) => {
	if (event.sourceEvent) {
		const p = d3.pointers(event, target);
		return [d3.mean(p, d => d[0]), d3.mean(p, d => d[1])];
	}
	return [width / 2, height / 2];
}

export const formatTimestamp = (timestamp: number): string => {
	const date = new Date(timestamp);
	const padZero = (num: number) => num.toString().padStart(2, '0');

	const day = padZero(date.getDate());
	const month = padZero(date.getMonth() + 1); // Months are zero-based in JavaScript
	const year = date.getFullYear();

	const hours = padZero(date.getHours());
	const minutes = padZero(date.getMinutes());
	const seconds = padZero(date.getSeconds());

	return `${day}.${month}.${year}, ${hours}:${minutes}:${seconds}`;
}

export const getFormattedDuration = (start: number, end: number): string => {
	const duration = end - start;
	const seconds = Math.floor(duration / 1000);
	const minutes = Math.floor(seconds / 60);
	const hours = Math.floor(minutes / 60);

	const formattedSeconds = seconds % 60;
	const formattedMinutes = minutes % 60;
	const formattedHours = hours % 24;

	return `${formattedHours}h ${formattedMinutes}m ${formattedSeconds}s`;
}