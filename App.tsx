import Form from './src/components/Form';
import List from './src/components/List';
import style from './App.module.scss';
import Stopwatch from './src/components/Stopwatch';
import { TasksProvider } from './src/context/TasksContext';

function App() {
	return (
		<div className={style.AppStyle}>
			<TasksProvider>
				<Form />
				<Stopwatch />
				<List />
			</TasksProvider>
		</div>
	);
}

export default App;
