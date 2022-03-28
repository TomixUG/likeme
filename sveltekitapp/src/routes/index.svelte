<script context="module" lang="ts">
	export const prerender = true;
</script>

<script lang="ts">
	import { setClient } from '@urql/svelte';
	import client from '../_client';
    setClient(client);
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
