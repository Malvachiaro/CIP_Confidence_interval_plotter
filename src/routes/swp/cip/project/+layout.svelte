<script lang="ts">

	import { page } from '$app/stores';


	$: url = $page.url.pathname;


	let baseUrl = '/swp/cip/project/';

</script>





<nav class="top_nav">
	<ul>
		<li>
			<a class:active={String(url).startsWith(baseUrl+"settings")} href="{baseUrl}settings">Project</a>
		</li>
		<li><a class:active={String(url).startsWith(baseUrl+'fields')} href="{baseUrl}fields">Fields</a></li>
		<li><a class:active={String(url).startsWith(baseUrl+'data')} href="{baseUrl}data">Data</a></li>
		<!-- <li><a class:active={String(url).startsWith(baseUrl+'doplot')} href="{baseUrl}doplot">Plot</a></li> -->
		<li><a class:active={String(url).startsWith(baseUrl+'doplot2')} href="{baseUrl}doplot2">Plot</a></li>

	</ul>
</nav>


<section>
	<slot/>
</section>

<style>

</style>
