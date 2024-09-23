<script lang="ts">
	let tasks = [
		{ id: 1, name: 'Learn Svelte', done: false },
		{ id: 2, name: 'Practice Tailwind Svelte', done: false }
	];
	let newTask = '';
	const addTask = () => {
		if (newTask) {
			tasks = [...tasks, { id: tasks.length + 1, name: newTask, done: false }];
			newTask = '';
		}
	};

	const toggleTask = (index: number) => {
		tasks[index].done = !tasks[index].done;
	};
</script>

<aside>
	<h1>Task Manager:</h1>
	<input type="text" bind:value={newTask} />
	<button on:click={addTask}>Add Task</button>
	<ul class="p-6">
		{#each tasks as task, i (task.id)}
			<li class={task.done ? 'line-through text-gray-500' : ''}>
				{task.name}
				<button
					on:click={() => {
						toggleTask(i);
					}}>{task.done ? '❌' : '✅'}</button
				>
			</li>
		{/each}
	</ul>
</aside>

<style>
	aside {
		padding: 2rem;
	}
</style>
