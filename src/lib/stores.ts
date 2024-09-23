import { writable, derived } from 'svelte/store';

type TaskProp = {
	id: number;
	name: string;
	done: boolean;
};

const safeJSONParse = (str: string | null): TaskProp[] => {
	if (!str) return [];
	try {
		return JSON.parse(str);
	} catch (e) {
		console.error('Error parsing tasks from localStorage:', e);
		return [];
	}
};

const storedTasks =
	typeof localStorage !== 'undefined' ? safeJSONParse(localStorage.getItem('tasks')) : [];

export const tasksStore = writable<TaskProp[]>(storedTasks);

if (typeof localStorage !== 'undefined') {
	tasksStore.subscribe(($tasksStore) => {
		localStorage.setItem('tasks', JSON.stringify($tasksStore));
	});
}

export const taskStats = derived(tasksStore, ($tasksStore) => {
	const total = $tasksStore.length;
	const completed = $tasksStore.filter((task) => task.done).length;
	return { total, completed };
});

export const addTask = (name: string) => {
	tasksStore.update((tasks) => [...tasks, { id: Date.now(), name, done: false }]);
};

export const removeTask = (id: number) => {
	tasksStore.update((tasks) => tasks.filter((task) => task.id !== id));
};

export const toggleTask = (id: number) => {
	tasksStore.update((tasks) =>
		tasks.map((task) => (task.id === id ? { ...task, done: !task.done } : task))
	);
};
