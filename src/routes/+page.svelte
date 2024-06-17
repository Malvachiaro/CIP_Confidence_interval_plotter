<script>
	import { goto } from '$app/navigation';
	import { invoke } from '@tauri-apps/api/tauri';
	import { onMount } from 'svelte';

	goto('/swp/welcome');



	async function closeSplashscreen() {
		await new Promise(resolve => setTimeout(resolve, 1));
		await invoke('close_splashscreen');
	}


	onMount(async () => {
		closeSplashscreen();
	})
</script>

SWP Loading
<a href="/swp/welcome">Go to welcome</a>
<br />
<a href="./test">Go to test</a>
