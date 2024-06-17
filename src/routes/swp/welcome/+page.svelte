<script lang="ts">
	import { AppFunctions } from '$lib/cip/functions/AppFunctions';
	import { onMount } from 'svelte';
	import type { PageData } from '../welcome/$types';
	import type { CipProject } from '$lib/cip/models/CipProject';

	export let data: PageData;
	const toCip = '/swp/starting';
	const toData = '/swp/cip/project/data';

	let startRoute = toCip
	
	onMount(async () => {
		let tmp:CipProject | null = await AppFunctions.getRunningProject()
		if (tmp!=null){
			startRoute = toData
		}else{
			startRoute = toCip
		}
	})

</script>

<div id="page_welcomepage">
	<header class="homepage_header">
		<p>Super Wonder Plot - ver. {data.app_info}</p>
		<p>Graphical tool for creating forest plots</p>
	</header>

	<!-- Themes -->
	{#if data.theme == 'commander46'}
		<p style="text-transform: uppercase;">Ready.</p>
		<p>LIST 30</p>
		<p>10 REM FOREST PLOT MAKER</p>
		<p>20 GOTO <a href="{toCip}">Start Super Wonder Plot</a></p>
		<p>30 END</p>
		<p><br />LOAD<br />PRESS PLAY ON TAPE<br /><br />LOADING...<br />READY.<br />RUN</p>
	{/if}
	<!-- /Themes -->

	<a class="more_than_significant" href="./info">
		<h1 class="more_than_significant"><span class="stars">***</span> More than significant</h1>
	</a>



	<a class="start" href="{startRoute}"><h2>Start</h2></a>


</div>

<style>
	.start {
		text-align: center;
	}
	.stars{
		color:fuchsia;
	}
</style>
