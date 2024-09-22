<script>
	// imports
	import Heading from './components/Heading.svelte';
	import Counter from './components/Counter.svelte';
	import ToDo from './components/ToDo.svelte';

	let name = '🍽️ Ahkal';
	let substring = 'We hope you <strong>love</strong> your time here with us.';
	let src = 'https://i.giphy.com/uVgqFuSbAQ15tV1NsK.webp';
	let alt = 'NEVER GIVE UP!';
</script>

<header>
	<aside>
		<Heading />
		<!-- @html - does NOT sanitize. -->
		<p>{@html substring}</p>
		<Counter />
	</aside>
	<img {src} alt="{name} fights and fights, preaching {alt}" />
</header>

<ToDo />

<style>
	header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		background-color: rgb(249, 237, 216);
		padding: 1rem;
		gap: 1rem;
	}
	p {
		font-style: italic;
	}
</style>
