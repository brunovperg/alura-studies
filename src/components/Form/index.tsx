import React, { useState } from 'react';
import Button from '../Button';
import style from './Form.module.scss';
import { v4 as uuidv4 } from 'uuid';
import { ITask } from '../../types/ITask';
import useTasks from '../../hooks/useTasks';
import {
	LocalizationProvider,
	TimeField,
	TimeValidationError,
} from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

export default function Form() {
	const { setTasks, time, setTime, value, setValue } = useTasks();
	const [error, setError] = React.useState<TimeValidationError | null>(null);
	const [task, setTask] = useState('');

	const errorMessage = React.useMemo(() => {
		switch (error) {
			case 'maxTime': {
				return 'O tempo máximo é 1h30min';
			}

			default: {
				return '';
			}
		}
	}, [error]);

	const addTask = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (error) {
			return;
		}

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
		setError(null);
		setTask('');
		setTime('');
		setValue(null);
	};

	return (
		<LocalizationProvider dateAdapter={AdapterDayjs}>
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
					<TimeField
						onError={(newError) => setError(newError)}
						slotProps={{
							textField: {
								helperText: errorMessage,
							},
						}}
						className={style.TimeField}
						color='primary'
						minTime={dayjs().set('hour', 0).set('minute', 0).set('second', 0)}
						maxTime={dayjs().set('hour', 1).set('minute', 30).set('second', 59)}
						format='HH:mm:ss'
						value={value}
						onChange={(newValue) => {
							setValue(newValue);
							setTime(newValue!.format('HH:mm:ss'));
						}}
						required
					/>
				</div>
				<Button type='submit' text='Adicionar' />
			</form>
		</LocalizationProvider>
	);
}
