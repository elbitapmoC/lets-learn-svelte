<script>
	let count = 0;
	// $: - Reactive declaration
	// This is like a watcher.. it looks at our data, whenever something changes, it updates ANY value that depends on that data.
	// Keep in mind, reactive declarations are ran AFTER other script code and before component markup is rendered.

	const increment = () => {
		count += 1;
	};

	// statements can be grouped by this block {}
	$: if (count > 10) {
		console.log(
			`You're getting quite strong there young buck! You CHOSE to get back up, ${count} time(s)`
		);
	}

	$: strength = count * 0.25;
</script>

<p class="fall">You fell down! Time to get back up!</p>

<aside>
	<button on:click={increment}>Click to get back up!</button>
	<p>Strength Level: +{strength}</p>
</aside>

<style>
	aside {
		display: flex;
		padding: 0.25rem;
		justify-content: center;
		align-items: center;
		gap: 1rem;
		outline: 1px solid black;
	}
	.fall {
		margin-top: 3rem;
	}
</style>
