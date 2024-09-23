<script>
	export let id;
	export let name;
	export let done;
	export let onRemove;
	export let toggleTask;
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
	<button class="text-red-500" on:click={() => onRemove(id)} aria-label="Remove task">
		Remove
	</button>
</li>
