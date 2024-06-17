<script lang="ts">
	import { goto } from '$app/navigation';
	import type { PageData } from '../welcome/$types';

	const toCip = '/swp/cip/home';
	
</script>

<div id="info_page">
	<h1>Super Wonder Plot</h1>


	<p>
		Super Wonder Plot is an open-source program for the creation of high-definition forest plots.
		The software is built using web technologies and encapsulated in an application installed on
		personal computers. The application does not require an internet connection and works offline.
		
	</p>

	<h2>News</h2>
	<p>
		Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nisi atque labore optio id. Magnam,
		obcaecati natus sed magni quasi eligendi minima consectetur repudiandae amet, adipisci aliquam
		consequuntur nam error aliquid?
	</p>
	<div class="goback">
		<button class="standard" type="button" on:click={() => goto("./welcome")}>go back</button>
	</div>
	
</div>

<style>
	.goback {
		margin-top: 2rem;
		text-align: center;
	}

</style>
