<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';

	// Task type definition
	type Task = {
		id: number;
		name: string;
		done: boolean;
	};

	// Svelte writable store for tasks
	let tasks = writable<Task[]>([]);
	let newTask = '';

	// Fetch tasks from localStorage on component mount (only on client-side)
	onMount(() => {
		if (typeof localStorage !== 'undefined') {
			const storedTasks = localStorage.getItem('tasks');
			if (storedTasks) {
				tasks.set(JSON.parse(storedTasks));
			}
		}
	});

	// Subscribe to the tasks store and save to localStorage when tasks change
	tasks.subscribe((value) => {
		if (typeof localStorage !== 'undefined') {
			localStorage.setItem('tasks', JSON.stringify(value));
		}
	});

	// Add a new task
	const addNewTask = () => {
		if (newTask.trim()) {
			tasks.update((currentTasks) => [
				...currentTasks,
				{ id: Date.now(), name: newTask, done: false }
			]);
			newTask = ''; // Clear the input field
		}
	};

	// Toggle task completion
	const toggleTask = (id: number) => {
		tasks.update((currentTasks) =>
			currentTasks.map((task) => (task.id === id ? { ...task, done: !task.done } : task))
		);
	};

	// Remove a task
	const removeTask = (id: number) => {
		tasks.update((currentTasks) => currentTasks.filter((task) => task.id !== id));
	};
</script>

<!-- Task Input Form -->
<form on:submit|preventDefault={addNewTask} class="flex space-x-4 mb-6">
	<input
		type="text"
		bind:value={newTask}
		class="flex-grow border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
		placeholder="Enter a task"
	/>
	<button
		type="submit"
		class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
	>
		Add Task
	</button>
</form>

<!-- Task List -->
<ul class="space-y-4">
	{#each $tasks as task (task.id)}
		<li class="bg-gray-100 p-4 rounded flex justify-between items-center">
			<label class="flex items-center space-x-2 cursor-pointer">
				<input type="checkbox" checked={task.done} on:change={() => toggleTask(task.id)} />
				<span class={task.done ? 'line-through text-gray-500' : ''}>
					{task.name}
				</span>
			</label>
			<button class="text-red-500" on:click={() => removeTask(task.id)} aria-label="Remove task">
				Remove
			</button>
		</li>
	{/each}
</ul>

<style>
	/* You can add custom styles here, but Tailwind is used for most styling */
</style>
