import { ITask } from '../../../types/ITask';
import useTasks from '../../../hooks/useTasks';
import style from './Item.module.scss';

export default function Item({ ...item }: ITask) {
	const { selectTask } = useTasks();
	return (
		<li
			className={`${style.item} ${item.selected ? style.itemSelecionado : ''} ${
				item.completed ? style.itemCompletado : ''
			} `}
			onClick={() => !item.completed && selectTask(item)}>
			<h3>{item.task}</h3>
			<span>{item.time}</span>
			{item.completed && (
				<span className={style.concluido} aria-label='Tarefa Completada'></span>
			)}
		</li>
	);
}
