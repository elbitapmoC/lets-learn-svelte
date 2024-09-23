<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import { tasksStore } from '$lib/stores'; // Import the store for managing tasks
	import Task from '$lib/Task.svelte'; // Import Task component for rendering individual tasks

	let newTask = '';

	// Load tasks from localStorage when the page loads (onMount is browser-only)
	onMount(() => {
		if (typeof localStorage !== 'undefined') {
			// Ensure localStorage is available
			const storedTasksString = localStorage.getItem('tasks');
			if (storedTasksString) {
				const storedTasks = JSON.parse(storedTasksString);
				tasksStore.set(storedTasks); // Populate the store with tasks from localStorage
			}
		}
	});

	// Save tasks to localStorage whenever tasks change (subscribe to store)
	tasksStore.subscribe((tasks) => {
		if (typeof localStorage !== 'undefined') {
			localStorage.setItem('tasks', JSON.stringify(tasks));
		}
	});

	// Add a new task to the store
	const addTask = () => {
		if (newTask) {
			tasksStore.update((tasks) => [
				...tasks,
				{ id: tasks.length + 1, name: newTask, done: false }
			]);
			newTask = ''; // Clear the input field after adding
		}
	};

	// Toggle task done state
	const toggleTask = (id: number) => {
		tasksStore.update((tasks) =>
			tasks.map((task) => (task.id === id ? { ...task, done: !task.done } : task))
		);
	};

	// Remove a task from the store
	const onRemove = (id: number) => {
		tasksStore.update((tasks) => tasks.filter((task) => task.id !== id));
	};
</script>

<aside>
	<h1 class="text-3xl font-bold text-center mb-6">Task Manager</h1>

	<div class="flex space-x-2 mb-6">
		<input
			type="text"
			class="flex-grow border p-2 rounded"
			bind:value={newTask}
			placeholder="Add new task"
		/>
		<button on:click={addTask} class="bg-blue-500 text-white px-4 py-2 rounded"> Add Task </button>
	</div>

	<!-- Auto-subscribe to tasksStore using $ syntax -->
	{#if $tasksStore.length > 0}
		<ul class="space-y-4">
			{#each $tasksStore as task (task.id)}
				<Task {...task} {onRemove} {toggleTask} />
			{/each}
		</ul>
	{:else}
		<p class="text-center text-gray-500">No tasks available. Add a task to get started!</p>
	{/if}
</aside>

<style>
	aside {
		padding: 2rem;
	}
</style>
