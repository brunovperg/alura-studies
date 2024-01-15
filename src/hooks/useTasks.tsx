import { useCallback, useContext, useEffect, useRef } from 'react';
import { ITask } from '../types/ITask';
import { TasksContext } from '../context/TasksContext';
import { formatTime } from '../common/utils/time';

export default function useTasks() {
	const timeoutId = useRef<NodeJS.Timeout | null>(null);

	const {
		tasks,
		setTasks,
		selectedTask,
		setSelectedTask,
		time,
		setTime,
		stopWatchTime,
		setStopWatchTime,
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
				clearInterval(timeoutId.current);
			}
			timeoutId.current = setInterval(() => {
				setStopWatchTime((prevTime) => {
					if (prevTime > 0) {
						return prevTime - 1;
					} else {
						clearInterval(timeoutId.current!);
						return prevTime;
					}
				});
			}, 1000);
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
	};
}
