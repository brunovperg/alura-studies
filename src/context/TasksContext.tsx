import { createContext } from 'react';
import { ITask } from '../types/ITask';
import { Dispatch, SetStateAction, useState } from 'react';

interface TasksContextType {
	tasks: ITask[];
	setTasks: Dispatch<SetStateAction<ITask[]>>;
	selectedTask: ITask | undefined;
	setSelectedTask: Dispatch<SetStateAction<ITask | undefined>>;
	time: string;
	setTime: Dispatch<SetStateAction<string>>;
	stopWatchTime: number;
	setStopWatchTime: Dispatch<SetStateAction<number>>;
}

export const TasksContext = createContext<TasksContextType | undefined>(
	undefined
);

TasksContext.displayName = 'TasksContext';

interface TasksProviderProps {
	children: React.ReactNode;
}
2;

export function TasksProvider({ children }: TasksProviderProps) {
	const getInitialTasks = () => {
		const savedTasks = localStorage.getItem('tasks');
		return savedTasks ? JSON.parse(savedTasks) : [];
	};
	const [tasks, setTasks] = useState<ITask[]>(getInitialTasks);
	const [selectedTask, setSelectedTask] = useState<ITask>();
	const [time, setTime] = useState<string>('01:00:00');
	const [stopWatchTime, setStopWatchTime] = useState<number>(0);

	return (
		<TasksContext.Provider
			value={{
				tasks,
				setTasks,
				selectedTask,
				setSelectedTask,
				time,
				setTime,
				stopWatchTime,
				setStopWatchTime,
			}}>
			{children}
		</TasksContext.Provider>
	);
}
