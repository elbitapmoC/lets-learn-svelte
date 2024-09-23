<script lang="ts">
	import '../app.css';
	import { tasksStore, taskStats, addTask } from '$lib/stores';
	import Task from '$lib/Task.svelte';

	let newTaskName = '';

	function handleAddTask(event: Event) {
		event.preventDefault();
		if (newTaskName.trim()) {
			addTask(newTaskName.trim());
			newTaskName = '';
		}
	}
</script>

<main class="dark:bg-gray-800">
	<main class="max-w-2xl mx-auto p-6 bg-gray-100 dark:bg-gray-800 min-h-screen">
		<h1 class="text-3xl font-bold mb-6 text-gray-800 dark:text-white">Task Manager</h1>

		<form on:submit={handleAddTask} class="mb-8">
			<div class="relative">
				<input
					bind:value={newTaskName}
					type="text"
					id="add-task"
					class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
					placeholder="Add a new task"
					required
				/>
				<button
					type="submit"
					class="text-white absolute right-2.5 bottom-2.5 bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800 transition duration-150 ease-in-out"
				>
					Add Task
				</button>
			</div>
		</form>

		<div class="space-y-3">
			{#each $tasksStore as task (task.id)}
				<Task {task} />
			{/each}
		</div>

		<div class="mt-6 p-4 bg-white dark:bg-gray-700 rounded-lg shadow">
			<h2 class="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Task Statistics</h2>
			<p class="text-sm text-gray-600 dark:text-gray-300">Total tasks: {$taskStats.total}</p>
			<p class="text-sm text-gray-600 dark:text-gray-300">
				Completed tasks: {$taskStats.completed}
			</p>
		</div>
	</main>
</main>
