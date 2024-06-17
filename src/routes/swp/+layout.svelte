<script lang="ts">
	import { page } from '$app/stores';
	import ApplicationZoom from '$lib/cip/components/Tools/ApplicationZoom.svelte';
	import Commander46Theme from '$lib/cip/themes/Commander46Theme.svelte';
	import NightskyTheme from '$lib/cip/themes/NightskyTheme.svelte';
	import ThemeSwitcher from '$lib/cip/themes/ThemeSwitcher.svelte';
	import { invoke } from '@tauri-apps/api/tauri';
	import type { PageData } from './$types';
	import IdeaTheme from '$lib/cip/themes/IdeaTheme.svelte';
	import { onMount } from 'svelte';
	import { RuntimeVariablesFunctions } from '$lib/cip/functions/lowLevel/RunningVariables';
	export let data: PageData;

	let fontSize = 16;

	$: currentUrl = $page.url.href;

	async function clearBrowserCache() {
		try {
			await invoke('clear_cache');
		} catch (error) {}
	}

	let app_bar_hide = true;
	onMount(async () => {
		let tmp: string | null = await RuntimeVariablesFunctions.getVariable('app_bar_hide');
		if (tmp == null) {
			app_bar_hide = false;
			RuntimeVariablesFunctions.setVariable('app_bar_hide', 'false');
		} else {
			app_bar_hide = tmp == 'true';
		}
	});

	async function toogle_app_bar() {
		app_bar_hide = !app_bar_hide;
		RuntimeVariablesFunctions.setVariable('app_bar_hide', app_bar_hide.toString());
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
		<button class="app_bar_switch" type="button" on:click={toogle_app_bar}>
			<svg
				width="16"
				height="16"
				viewBox="0 0 24 24"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<rect x="4" y="6" width="16" height="2" fill="black" />
				<rect x="4" y="11" width="16" height="2" fill="black" />
				<rect x="4" y="16" width="16" height="2" fill="black" />
			</svg>
		</button>
		<div class:hide={app_bar_hide} class="app_bar">
			<span>ver. {data.app_info}</span>
			<p>&copy; 2024 <a href="/swp/cip/license">See license</a></p> | 
			<span class="current_url">{currentUrl}</span>
			<button title="Reload" on:click={clearBrowserCache}>&#10227</button>
			<a title="About" class="about" href="/swp/welcome"><span class="stars">***</span>SWP</a>
			<ThemeSwitcher />
			<ApplicationZoom bind:fontSize />
		</div>

		<div class="main_content">
			<slot></slot>
		</div>
	</div>
	<footer class="app_footer">
		
	</footer>
</div>

<style>

	.hide {
		display: none;
	}
	.main_content {
		padding-bottom: 2rem;
	}
	.current_url {
		display:none;
		font-size: 0.6em;
	}
</style>
