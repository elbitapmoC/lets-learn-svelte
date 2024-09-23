<script lang="ts">
	import { removeTask, toggleTask } from './stores';

	export let task: {
		id: number;
		name: string;
		done: boolean;
	};
</script>

<div class="flex items-center p-3 bg-white dark:bg-gray-700 rounded-lg shadow">
	<label class="flex items-center space-x-2 cursor-pointer w-full">
		<input
			type="checkbox"
			class="hidden"
			checked={task.done}
			on:change={() => toggleTask(task.id)}
			aria-label={task.done ? 'Mark as incomplete' : 'Mark as complete'}
		/>
		<span
			class={`ml-3 text-sm font-medium ${task.done ? 'line-through text-gray-500 dark:text-gray-400' : 'text-gray-900 dark:text-white'} task.done ? 'line-through text-gray-500' : ''`}
			>{task.name}</span
		>
	</label>

	<button
		on:click={() => removeTask(task.id)}
		class="ml-auto bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
	>
		Remove
	</button>
</div>
