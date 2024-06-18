<script lang="ts">
	import { onMount } from 'svelte';
	import { RuntimeVariablesFunctions } from '../functions/lowLevel/RunningVariables';
	import { invalidateAll } from '$app/navigation';

	let theme: string;
	let themeName: string = '';

	function updateThemeName() {
		if (theme == 'idea') {
			themeName = 'Idea';
		} else if (theme == 'daylight') {
			themeName = 'Day light';
		} else if (theme == 'nightsky') {
			themeName = 'Night sky';
		} else if (theme == 'commander46') {
			themeName = 'Commander 46';
		} else {
			themeName = '';
		}
	}

	async function switchTheme() {
		switch (theme) {
			case 'idea':
				theme = 'nightsky';
				break;
			case 'nightsky':
				theme = 'daylight';
				break;
			case 'daylight':
				theme = 'commander46';
				break;
			case 'commander46':
				theme = 'idea';
				break;
			default:
				theme = 'idea';
				break;
		}
		updateThemeName();
		await RuntimeVariablesFunctions.setVariable('theme', theme);
		invalidateAll();
	}

	onMount(async () => {
		let t = await RuntimeVariablesFunctions.getVariable('theme');
		if (t == null) {
			t = 'nightsky';
			await RuntimeVariablesFunctions.setVariable('theme', t);
		}
		theme = t;
		updateThemeName();
	});
</script>

<div class="theme_switcher">
	<span>Theme switcher</span>
	<button title="Switch theme" type="button" on:click={switchTheme}>{themeName}</button>
</div>
