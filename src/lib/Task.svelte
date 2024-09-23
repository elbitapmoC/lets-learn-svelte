<script>
	export let done;
	export let name;
	export let id;
	export let onRemove;
	export let toggleTask; // Declare toggleTask as a prop
</script>

<li class="bg-gray-50 p-4 rounded flex justify-between items-center">
	<label class="flex items-center space-x-2 cursor-pointer w-full">
		<input
			type="checkbox"
			class="hidden"
			checked={done}
			on:change={() => toggleTask(id)}
			aria-label={done ? 'Mark as incomplete' : 'Mark as complete'}
		/>
		<span class={done ? 'line-through text-gray-500' : ''}>{name}</span>
	</label>
	<button
		class="text-red-500"
		on:click|stopPropagation={() => onRemove(id)}
		aria-label="Remove task"
	>
		Remove
	</button>
</li>

<style>
	li {
		border: 1px solid #e2e8f0;
	}
</style>
