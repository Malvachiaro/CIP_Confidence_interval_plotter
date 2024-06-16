<script lang="ts">
	import { page } from '$app/stores';
	import ApplicationZoom from '$lib/cip/components/Tools/ApplicationZoom.svelte';
	import Commander46Theme from '$lib/cip/themes/Commander46Theme.svelte';
	import NightskyTheme from '$lib/cip/themes/NightskyTheme.svelte';
	import ThemeSwitcher from '$lib/cip/themes/ThemeSwitcher.svelte';
	import { invoke } from '@tauri-apps/api/tauri';
	import type { PageData } from './$types';
	import IdeaTheme from '$lib/cip/themes/IdeaTheme.svelte';
	export let data: PageData;

	let fontSize = 16;

	$: currentUrl = $page.url.href;

	async function clearBrowserCache() {
		try {
			await invoke('clear_cache');
		} catch (error) {}
	}
</script>

{#if data.theme == 'idea'}
	<IdeaTheme />
{:else if data.theme == 'commander46'}
	<Commander46Theme />
{:else}
	<NightskyTheme />
{/if}
<div class="font_apply" style="font-size: {fontSize}px;">
	<div class="app">
		<div class="app_bar">
			<span>ver. {data.app_info}</span>
			<span class="current_url">{currentUrl}</span>
			<button title="Reload" on:click={clearBrowserCache}>&#10227</button>
			<a title="About" class="about" href="/swp/welcome"><span class="stars">***</span>SWP</a>
			<a href="/swp/cip/home">Home</a>
			<ThemeSwitcher />
			<ApplicationZoom bind:fontSize />
		</div>

		<div class="main_content">
			<slot></slot>
		</div>
	</div>
	<footer class="app_footer">
		<p>&copy; 2024 Super wonder Plot. <a href="/swp/cip/license">See license</a></p>
	</footer>
</div>

<style>
	.main_content {
		padding-bottom: 2rem;
	}
</style>
