<script lang="ts">
	let todos: string[] = [];
	let todoTask: string = '';

	const addTodoTask = () => {
		todos = [todoTask, ...todos];
		todoTask = '';
	};

	const prioritizeTask = (index: number) => {
		const taskToPrioritize = todos[index];
		todos.splice(index, 1);
		todos = [taskToPrioritize, ...todos];
	};

	const deleteTask = (index: number) => {
		todos.splice(index, 1); // remove 1 task at the given index.
		todos = [...todos];
	};
</script>

<form on:submit|preventDefault={addTodoTask}>
	<label for="todoTask">Todos..</label>
	<input type="text" id="todoTask" name="todoTask" bind:value={todoTask} placeholder="Jog 🏃🏾‍♀️" />
	<input type="submit" value="Submit" />
</form>
{#each todos as todo, index}
	<aside>
		<span>{todo}</span>
		<button type="button" on:click={() => prioritizeTask(index)}>Prioritize</button>
		<button type="button" on:click={() => deleteTask(index)}>Delete</button>
	</aside>
{/each}

<style>
	form {
		margin-top: 3rem;
	}
	aside {
		margin-top: 1rem;
	}
</style>
