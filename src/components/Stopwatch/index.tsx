import useTasks from '../../hooks/useTasks';
import Button from '../Button';
import style from './Stopwatch.module.scss';
import Watch from './Watch';

export default function Stopwatch() {
	const { startStopwatch } = useTasks();

	return (
		<div className={style.cronometro}>
			<p className={style.titulo}>Escolha um card e inicie o cronômetro</p>
			<div className={style.relogioWrapper}>
				<Watch />
			</div>
			<Button text='Começar' onClick={() => startStopwatch()} />{' '}
		</div>
	);
}
