import { useState } from 'react';
import Button from '../Button';
import style from './Form.module.scss';
import { v4 as uuidv4 } from 'uuid';
import { ITask } from '../../types/ITask';
import useTasks from '../../hooks/useTasks';

export default function Form() {
	const { setTasks, time, setTime } = useTasks();

	const [task, setTask] = useState('');

	const addTask = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setTasks((oldTasks: ITask[]) => [
			...oldTasks,
			{
				id: uuidv4(),
				task: task,
				time: time,
				selected: false,
				completed: false,
			},
		]);
		setTask('');
		setTime('');
	};

	return (
		<form className={style.novaTarefa} onSubmit={addTask}>
			<div className={style.inputContainer}>
				<label htmlFor='tarefa'>Adicione um novo estudo</label>
				<input
					value={task}
					onChange={(e) => setTask(e.target.value)}
					type='text'
					name='task'
					id='task'
					placeholder='O que você quer estudar?'
					required
				/>
			</div>
			<div className={style.inputContainer}>
				<label htmlFor='time'>Tempo</label>
				<input
					value={time}
					onChange={(e) => setTime(e.target.value)}
					type='time'
					step='1'
					name='time'
					id='time'
					min='00:00:00'
					max='23:30:00'
					required
				/>
			</div>
			<Button type='submit' text='Adicionar' />
		</form>
	);
}
