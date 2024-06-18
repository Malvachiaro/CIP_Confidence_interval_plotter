<script lang="ts">
	import { onMount } from 'svelte';

	let dataDev: any = [];
	let dataProd: any = [];

	onMount(async () => {
		const response = await fetch('/licenses/third-party-licenses.json');
		const jsonData = await response.json();
		dataDev = Array.isArray(jsonData) ? jsonData : [];

		const responseProd = await fetch('/licenses/production-licenses.json');
		const jsonDataProd = await responseProd.json();
		dataProd = Array.isArray(jsonDataProd) ? jsonDataProd : [];

	});

	
</script>

<h1>Super Wonder Plot License</h1>

<h2>MIT License</h2>

<p>Copyright (c) [2024-] [Giacomo Scarpellini &lt;giacomo.scarpellini@gmail.com&gt;]</p>

<p> is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:</p>

<p>The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.</p>

<p>THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.</p>
<br/><br/><br/>
<hr/>
<br/><br/><br/>
<h2>Third party lib - production</h2>
<p>These libraries are included in the software. Follow the link to read the license details and for more information.</p>
<table>
	<thead>
		<tr>
			<th>Name</th>
			<th>Version</th>
			<th>Type</th>
			<th>Link</th>
			<th>Author</th>
		</tr>
	</thead>
	<tbody>
		{#each dataProd as item}
			<tr>
				<td>{item.name}</td>
				<td>{item.installedVersion}</td>
				<td>{item.licenseType}</td>
				<td>{item.link}</td>
				<td>{item.author}</td>
			</tr>
		{/each}
	</tbody>
</table>

<h2>Third party lib - development</h2>

<p>
	Even though these software packages are not used directly in production, they are still part of
	the development process.  Follow the link to read the license details and for more information.
</p>
<table>
	<thead>
		<tr>
			<th>Name</th>
			<th>Version</th>
			<th>Type</th>
			<th>Link</th>
			<th>Author</th>
		</tr>
	</thead>
	<tbody>
		{#each dataDev as item}
			<tr>
				<td>{item.name}</td>
				<td>{item.installedVersion}</td>
				<td>{item.licenseType}</td>
				<td>{item.link}</td>
				<td>{item.author}</td>
			</tr>
		{/each}
	</tbody>
</table>

<h2>Fonts</h2>
<h3>Source Code Pro</h3>
<p>Author: Paul D. Hunt</p>
<p>License: SIL OPEN FONT LICENSE Version 1.1</p>
<p>https://github.com/adobe-fonts/source-code-pro/blob/release/LICENSE.md</p>

<h3>Architects Daughter</h3>
<p>Author: Kimberly Geswein</p>
<p>License: Open Font License</p>


<h3>Press Start 2P</h3>
<p>Author: CodeMan38</p>
<p>License: Open Font License</p>




<button class="standard" type="button" on:click={() => window.history.back()}>Back</button>
