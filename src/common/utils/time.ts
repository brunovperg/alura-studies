export function formatTime(time: string = '00:00:00') {
	const [hours = '00', minutes = '00', seconds = '00'] = time.split(':');

	const hoursInSeconds = Number(hours) * 60 * 60;
	const minutesInSeconds = Number(minutes) * 60;
	const secondsInSeconds = Number(seconds);

	return hoursInSeconds + minutesInSeconds + secondsInSeconds;
}
