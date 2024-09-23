<script lang="ts">
	import '../app.css';
	import { tasksStore, taskStats } from '$lib/stores';
	import Task from '$lib/Task.svelte';
	let newTask = '';

	// Use the store directly, no need to manually set tasks
	const addTask = () => {
		if (newTask) {
			tasksStore.update((tasks) => [
				...tasks,
				{ id: tasks.length + 1, name: newTask, done: false }
			]);
			newTask = '';
		}
	};

	const toggleTask = (id: number) => {
		tasksStore.update((tasks) =>
			tasks.map((task) => (task.id === id ? { ...task, done: !task.done } : task))
		);
	};

	const onRemove = (id: number) => {
		tasksStore.update((tasks) => tasks.filter((task) => task.id !== id));
	};
</script>

<aside>
	<h1>Task Manager:</h1>
	<div class="flex space-x-2 mb-6">
		<input
			type="text"
			class="flex-grow border p-2 rounded"
			bind:value={newTask}
			placeholder="Add new task"
		/>
		<button on:click={addTask} class="bg-blue-500 text-white px-4 py-2 rounded">Add Task</button>
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
