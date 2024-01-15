import style from './List.module.scss';
import Item from './Item';
import useTasks from '../../hooks/useTasks';

export default function List() {
	const { tasks } = useTasks();

	return (
		<aside className={style.listaTarefas}>
			<h2>Estudos do Dia</h2>
			<ul>
				{tasks.map((item) => (
					<Item key={item.id} {...item} />
				))}
			</ul>
		</aside>
	);
}
