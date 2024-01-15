import { useCallback, useContext, useEffect, useRef } from 'react';
import { ITask } from '../types/ITask';
import { TasksContext } from '../context/TasksContext';
import { formatTime } from '../common/utils/time';

export default function useTasks() {
	const timeoutId = useRef<number | null>(null);

	const {
		tasks,
		setTasks,
		selectedTask,
		setSelectedTask,
		time,
		setTime,
		stopWatchTime,
		setStopWatchTime,
		value,
		setValue,
	} = useContext(TasksContext)!;

	const selectTask = useCallback(
		(task: ITask) => {
			setSelectedTask(task);
			setTasks((oldTasks) =>
				oldTasks.map((item) => {
					if (item.id === task.id) {
						item.selected = true;
					} else {
						item.selected = false;
					}
					return item;
				})
			);
		},
		[setSelectedTask, setTasks]
	);

	const startStopwatch = useCallback(() => {
		if (selectedTask && stopWatchTime > 0) {
			if (timeoutId.current) {
				clearInterval(timeoutId.current as number);
			}
			(timeoutId.current) = setInterval(() => {
				setStopWatchTime((prevTime) => {
					if (prevTime > 0) {
						return prevTime - 1;
					}
					clearInterval(timeoutId.current! as number);
					return prevTime;
				});
			}, 1000) as unknown as number;
		}
	}, [selectedTask, stopWatchTime, setStopWatchTime]);

	useEffect(() => {
		if (selectedTask && stopWatchTime === 0) {
			setTasks((oldTasks) =>
				oldTasks.map((item) => {
					if (item.id === selectedTask.id) {
						item.completed = true;
					}
					return item;
				})
			);
			setSelectedTask(undefined);
		}
	}, [stopWatchTime]);

	useEffect(() => {
		setStopWatchTime(formatTime(selectedTask?.time));
	}, [selectedTask]);

	useEffect(() => {
		if (timeoutId.current) {
			clearInterval(timeoutId.current);
			timeoutId.current = null;
		}
	}, [selectedTask]);

	// Save tasks to localStorage whenever they change
	useEffect(() => {
		localStorage.setItem('tasks', JSON.stringify(tasks));
	}, [tasks]);

	function removeTask(item: ITask) {
		if (item.id === selectedTask?.id) {
			setSelectedTask(undefined);
			setStopWatchTime(0);
		}
		setStopWatchTime((e) => e);
		setTasks((oldTasks) => oldTasks.filter((task) => task.id !== item.id));
	}

	return {
		tasks,
		setTasks,
		selectedTask,
		setSelectedTask,
		selectTask,
		time,
		setTime,
		stopWatchTime,
		setStopWatchTime,
		startStopwatch,
		removeTask,
		value,
		setValue,
	};
}
