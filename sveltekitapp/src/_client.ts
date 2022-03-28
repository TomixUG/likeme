import { createClient } from '@urql/svelte';

export default createClient({
	url: import.meta.env.VITE_BACKEND
});
