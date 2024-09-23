// src/lib/stores.ts
import { writable, derived } from 'svelte/store';

// Type for each task
type StoredTaskProp = {
	id: number;
	name: string;
	done: boolean;
};

// Create a writable store for tasks (starts as empty, we will populate it later)
export const tasksStore = writable<StoredTaskProp[]>([]);

// Derived store to calculate task stats (total and completed tasks)
export const taskStats = derived(tasksStore, ($tasksStore) => {
	const total = $tasksStore.length;
	const completed = $tasksStore.filter((task) => task.done).length;
	return { total, completed };
});
