<script lang="ts">
	import { navigation } from '../navigation';
</script>

<nav>
	<ul >
		{#each navigation.links as link}
			<li class="text-teal-500 bg-teal-300"><a href={link.to}>{link.name}</a></li>
		{/each}
	</ul>
</nav>

<style>
	ul {
		text-decoration: none;
		display: flex;
		gap: 0.25rem;
	}
	li {
		border-radius: 15px;
		padding: 0.5rem 1rem;
		box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
	}
</style>
