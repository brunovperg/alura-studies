import useTasks from '../../../hooks/useTasks';
import style from './Watch.module.scss';

export default function Watch() {
	const { stopWatchTime } = useTasks();
	const minutes = Math.floor(stopWatchTime / 60);
	const seconds = stopWatchTime % 60;
	const [minutesTens, minutesUnits] = String(minutes).padStart(2, '0') ;
	const [secondsTens, secondsUnits] = String(seconds).padStart(2, '0');

	return (
		<>
			<span className={style.relogioNumero}>{minutesTens}</span>
			<span className={style.relogioNumero}>{minutesUnits}</span>
			<span className={style.relogioDivisao}>:</span>
			<span className={style.relogioNumero}>{secondsTens}</span>
			<span className={style.relogioNumero}>{secondsUnits}</span>
		</>
	);
}
