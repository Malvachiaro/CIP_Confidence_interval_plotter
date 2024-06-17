<script lang="ts">
	
	import PlotHeaderControl from '$lib/cip/components/plotControls/PlotHeaderControl.svelte';
	import PlotHeaderElement from '$lib/cip/components/plotElements/PlotHeaderElement.svelte';
	import PlotFooterControl from '$lib/cip/components/plotControls/PlotFooterControl.svelte';
	import PlotFooterElement from '$lib/cip/components/plotElements/PlotFooterElement.svelte';
	import PlotSizeControl from '$lib/cip/components/plotControls/PlotSizeControl.svelte';
	import PlotFontControl from '$lib/cip/components/plotControls/PlotFontControl.svelte';
	import PlotColumnsPositionControl from '$lib/cip/components/plotControls/PlotColumnsPositionControl.svelte';
	import PlotTableElement from '$lib/cip/components/plotElements/PlotTableElement.svelte';
	import PlotGraphElement from '$lib/cip/components/plotElements/PlotGraphElement.svelte';
	import PlotGraphControl from '$lib/cip/components/plotControls/PlotGraphControl.svelte';
	import PlotAutofitControl from '$lib/cip/components/plotControls/PlotAutofitControl.svelte';
	import { PlotSettings, type SquareProportionMethod } from '$lib/cip/models/CipPlotSettings';
	import { StringCleaner } from '$lib/common/StringCleaner';
	import { AppActions } from '$lib/cip/actions/Actions';
	import { invalidateAll } from '$app/navigation';
	
	import type { PageData } from './$types';
	export let data: PageData;

	// Size
	export let plotWidth_px: number = Number(data.matrix.project.plotSettings.plotWidth_px);
	export let leftAndRightMargins_px: number =
		data.matrix.project.plotSettings.leftAndRightMargins_px;
	$: bodyWidth_px = plotWidth_px - leftAndRightMargins_px * 2;

	export let headerHeight_px: number = data.matrix.project.plotSettings.headerHeight_px;
	export let bodyHeight_px: number = data.matrix.project.plotSettings.bodyHeight_px;
	export let footerHeight_px: number = data.matrix.project.plotSettings.footerHeight_px;
	$: plotHeight_px = headerHeight_px + bodyHeight_px + footerHeight_px;

	// Header
	export let title: string = data.matrix.project.plotSettings.title;
	export let titlePosition: number = data.matrix.project.plotSettings.titlePosition;
	export let titleSize: number = data.matrix.project.plotSettings.titleSize;

	// Footer
	export let footerText: string = data.matrix.project.plotSettings.footerText;
	export let footerTextSize: number = data.matrix.project.plotSettings.footerTextSize;
	export let footerTextIsCentered: boolean = data.matrix.project.plotSettings.footerTextIsCentered;

	// Fonts
	export let fontFamily: string = data.matrix.project.plotSettings.fontFamily;
	export let fontSize: number = data.matrix.project.plotSettings.fontSize;
	let baseWidth = 800;
	$: real_font_size = (fontSize * plotWidth_px) / baseWidth;

	// Table
	export let blocks_titles_position = data.matrix.project.plotSettings.blocks_titles_position;
	export let column_position_name = data.matrix.project.plotSettings.column_position_name;
	export let column_position_effectSize =
		data.matrix.project.plotSettings.column_position_effectSize;
	export let column_position_lowerLimit =
		data.matrix.project.plotSettings.column_position_lowerLimit;
	export let column_position_upperLimit =
		data.matrix.project.plotSettings.column_position_upperLimit;
	export let column_position_weight = data.matrix.project.plotSettings.column_position_weight;
	export let column_position_variance = data.matrix.project.plotSettings.column_position_variance;
	export let column_position_standardError =
		data.matrix.project.plotSettings.column_position_standardError;
	export let column_position_pValue = data.matrix.project.plotSettings.column_position_pValue;
	export let column_position_totalSS = data.matrix.project.plotSettings.column_position_totalSS;
	export let column_position_sampleSizeGroup1 =
		data.matrix.project.plotSettings.column_position_sampleSizeGroup1;
	export let column_position_sampleSizeGroup2 =
		data.matrix.project.plotSettings.column_position_sampleSizeGroup2;
	export let column_position_notAssignedSS =
		data.matrix.project.plotSettings.column_position_notAssignedSS;
	export let column_position_ncf1 = data.matrix.project.plotSettings.column_position_ncf1;
	export let column_position_ncf2 = data.matrix.project.plotSettings.column_position_ncf2;
	export let column_position_ncf3 = data.matrix.project.plotSettings.column_position_ncf3;
	export let column_position_ncf4 = data.matrix.project.plotSettings.column_position_ncf4;
	export let column_position_ncf5 = data.matrix.project.plotSettings.column_position_ncf5;
	export let column_position_scf1 = data.matrix.project.plotSettings.column_position_scf1;
	export let column_position_scf2 = data.matrix.project.plotSettings.column_position_scf2;
	export let column_position_scf3 = data.matrix.project.plotSettings.column_position_scf3;
	export let column_position_scf4 = data.matrix.project.plotSettings.column_position_scf4;
	export let column_position_scf5 = data.matrix.project.plotSettings.column_position_scf5;
	export let column_position_ci = data.matrix.project.plotSettings.column_position_ci;

	// Graph
	export let graphSize: number = data.matrix.project.plotSettings.graphSize;
	export let graphPosition: number = data.matrix.project.plotSettings.graphPosition;
	export let graphEsSquareSize: number = data.matrix.project.plotSettings.graphEsSquareSize;
	export let graphEsProportionMethod: SquareProportionMethod =
		data.matrix.project.plotSettings.graphEsProportionMethod;
	export let graphOverallsLines: boolean = data.matrix.project.plotSettings.graphOverallsLines;
	export let graphShowGrid: boolean = data.matrix.project.plotSettings.graphShowGrid;
	export let graphShowGridLines: boolean = data.matrix.project.plotSettings.graphShowGridLines;
	export let graphGridTicksMaxAmount: number =
		data.matrix.project.plotSettings.graphGridTicksMaxAmount;
	export let graphGridTicks: string = data.matrix.project.plotSettings.graphGridTicks;
	export let graphGridScale: string = data.matrix.project.plotSettings.graphGridScale;

	// Prepare PlotterMatrix
	//let plotterMatrix = new PlotterMatrix(data.matrix.project);

	// Check scale - values integrity
	if (Number(data.matrix.min_value) <= 0) {
		graphGridScale = 'Linear';
	}

	// Settings overlay
	let settings_overlay: boolean = false;

	// SETTINGS TABS
	let active_settings_tab = 'AutoAdjust';
	function changeSettingsTab(tab: string) {
		if (active_settings_tab === tab) {
			//active_settings_tab = "closed";
		} else {
			active_settings_tab = tab;
		}
	}

	function downloadSVG() {
		let svg: HTMLElement | null = document.getElementById('forestplot');
		if (svg == null) {
			throw Error('Image not found');
		}
		const serializer = new XMLSerializer();
		let source: string = serializer.serializeToString(svg);
		AppActions.downloadSvg(source, StringCleaner.clean_a_filename(data.matrix.project.name));
	}

	function downloadPNG() {
		let svg: HTMLElement | null = document.getElementById('forestplot');
		if (svg == null) {
			throw Error('Image not found');
		}
		const serializer = new XMLSerializer();
		let source: string = serializer.serializeToString(svg);
		AppActions.downloadPng(source, StringCleaner.clean_a_filename(data.matrix.project.name));
	}

	function downloadJPG() {
		let svg: HTMLElement | null = document.getElementById('forestplot');
		if (svg == null) {
			throw Error('Image not found');
		}
		const serializer = new XMLSerializer();
		let source: string = serializer.serializeToString(svg);
		AppActions.downloadJpg(source, StringCleaner.clean_a_filename(data.matrix.project.name));
	}

	async function updateSettings() {
		let ps: PlotSettings = new PlotSettings();

		ps.generated = true;
		ps.plotWidth_px = plotWidth_px;
		ps.leftAndRightMargins_px = leftAndRightMargins_px;
		ps.headerHeight_px = headerHeight_px;
		ps.bodyHeight_px = bodyHeight_px;
		ps.footerHeight_px = footerHeight_px;

		ps.title = title;
		ps.titlePosition = titlePosition;
		ps.titleSize = titleSize;

		ps.footerText = footerText;
		ps.footerTextSize = footerTextSize;
		ps.footerTextIsCentered = footerTextIsCentered;

		ps.fontFamily = fontFamily;
		ps.fontSize = fontSize;

		ps.graphSize = graphSize;
		ps.graphPosition = graphPosition;
		ps.graphEsSquareSize = graphEsSquareSize;
		ps.graphEsProportionMethod = graphEsProportionMethod;
		ps.graphOverallsLines = graphOverallsLines;

		ps.graphShowGrid = graphShowGrid;
		ps.graphShowGridLines = graphShowGridLines;
		ps.graphGridTicksMaxAmount = graphGridTicksMaxAmount;
		ps.graphGridTicks = graphGridTicks;
		ps.graphGridScale = graphGridScale;

		ps.blocks_titles_position = blocks_titles_position;

		ps.column_position_name = column_position_name;
		ps.column_position_effectSize = column_position_effectSize;
		ps.column_position_lowerLimit = column_position_lowerLimit;
		ps.column_position_upperLimit = column_position_upperLimit;
		ps.column_position_weight = column_position_weight;
		ps.column_position_variance = column_position_variance;
		ps.column_position_standardError = column_position_standardError;
		ps.column_position_pValue = column_position_pValue;
		ps.column_position_totalSS = column_position_totalSS;
		ps.column_position_sampleSizeGroup1 = column_position_sampleSizeGroup1;
		ps.column_position_sampleSizeGroup2 = column_position_sampleSizeGroup2;
		ps.column_position_notAssignedSS = column_position_notAssignedSS;
		ps.column_position_ncf1 = column_position_ncf1;
		ps.column_position_ncf2 = column_position_ncf2;
		ps.column_position_ncf3 = column_position_ncf3;
		ps.column_position_ncf4 = column_position_ncf4;
		ps.column_position_ncf5 = column_position_ncf5;
		ps.column_position_scf1 = column_position_scf1;
		ps.column_position_scf2 = column_position_scf2;
		ps.column_position_scf3 = column_position_scf3;
		ps.column_position_scf4 = column_position_scf4;
		ps.column_position_scf5 = column_position_scf5;
		ps.column_position_ci = column_position_ci;

		await AppActions.updatePlotSettings(ps);
		settings_overlay = false;
		await invalidateAll();
	}

	async function generatePlot() {
		await AppActions.plotAutofitBootstrap();
		await invalidateAll();
		await reloadData();
	}

	async function reload(event: any) {
		await invalidateAll();
		await reloadData();
		settings_overlay = false;
	}

	async function reloadData() {
		plotWidth_px = Number(data.matrix.project.plotSettings.plotWidth_px);
		leftAndRightMargins_px = data.matrix.project.plotSettings.leftAndRightMargins_px;
		headerHeight_px = data.matrix.project.plotSettings.headerHeight_px;
		bodyHeight_px = data.matrix.project.plotSettings.bodyHeight_px;
		footerHeight_px = data.matrix.project.plotSettings.footerHeight_px;
		title = data.matrix.project.plotSettings.title;
		titlePosition = data.matrix.project.plotSettings.titlePosition;
		titleSize = data.matrix.project.plotSettings.titleSize;
		footerText = data.matrix.project.plotSettings.footerText;
		footerTextSize = data.matrix.project.plotSettings.footerTextSize;
		footerTextIsCentered = data.matrix.project.plotSettings.footerTextIsCentered;
		fontFamily = data.matrix.project.plotSettings.fontFamily;
		fontSize = data.matrix.project.plotSettings.fontSize;
		blocks_titles_position = data.matrix.project.plotSettings.blocks_titles_position;
		column_position_name = data.matrix.project.plotSettings.column_position_name;
		column_position_effectSize = data.matrix.project.plotSettings.column_position_effectSize;
		column_position_lowerLimit = data.matrix.project.plotSettings.column_position_lowerLimit;
		column_position_upperLimit = data.matrix.project.plotSettings.column_position_upperLimit;
		column_position_weight = data.matrix.project.plotSettings.column_position_weight;
		column_position_variance = data.matrix.project.plotSettings.column_position_variance;
		column_position_standardError = data.matrix.project.plotSettings.column_position_standardError;
		column_position_pValue = data.matrix.project.plotSettings.column_position_pValue;
		column_position_totalSS = data.matrix.project.plotSettings.column_position_totalSS;
		column_position_sampleSizeGroup1 =
			data.matrix.project.plotSettings.column_position_sampleSizeGroup1;
		column_position_sampleSizeGroup2 =
			data.matrix.project.plotSettings.column_position_sampleSizeGroup2;
		column_position_notAssignedSS = data.matrix.project.plotSettings.column_position_notAssignedSS;
		column_position_ncf1 = data.matrix.project.plotSettings.column_position_ncf1;
		column_position_ncf2 = data.matrix.project.plotSettings.column_position_ncf2;
		column_position_ncf3 = data.matrix.project.plotSettings.column_position_ncf3;
		column_position_ncf4 = data.matrix.project.plotSettings.column_position_ncf4;
		column_position_ncf5 = data.matrix.project.plotSettings.column_position_ncf5;
		column_position_scf1 = data.matrix.project.plotSettings.column_position_scf1;
		column_position_scf2 = data.matrix.project.plotSettings.column_position_scf2;
		column_position_scf3 = data.matrix.project.plotSettings.column_position_scf3;
		column_position_scf4 = data.matrix.project.plotSettings.column_position_scf4;
		column_position_scf5 = data.matrix.project.plotSettings.column_position_scf5;
		column_position_ci = data.matrix.project.plotSettings.column_position_ci;
		graphSize = data.matrix.project.plotSettings.graphSize;
		graphPosition = data.matrix.project.plotSettings.graphPosition;
		graphEsSquareSize = data.matrix.project.plotSettings.graphEsSquareSize;
		graphEsProportionMethod = data.matrix.project.plotSettings.graphEsProportionMethod;
		graphOverallsLines = data.matrix.project.plotSettings.graphOverallsLines;
		graphShowGrid = data.matrix.project.plotSettings.graphShowGrid;
		graphShowGridLines = data.matrix.project.plotSettings.graphShowGridLines;
		graphGridTicksMaxAmount = data.matrix.project.plotSettings.graphGridTicksMaxAmount;
		graphGridTicks = data.matrix.project.plotSettings.graphGridTicks;
		graphGridScale = data.matrix.project.plotSettings.graphGridScale;
	}

	async function closePanel() {
		await invalidateAll();
		await reloadData();
		settings_overlay = false;
	}
</script>

<div id="page_plot">
	<h1>Plot</h1>

	{#if !data.matrix.project.plotSettings.generated}
		<div class="generate_first_time">
			<h2>Generate your first plot</h2>
			<p>
				The plot hasn't been generated yet. I'll set it up for you to make things easier. You can
				modify it later using the provided functions.
			</p>
			<p>Remember, you can use the auto-adjust feature at any time.</p>
			<button class="standard" type="button" on:click={generatePlot}>Generate</button>
		</div>
	{:else}
		<div class="graph_controller overlay" style="display: {settings_overlay ? 'flex' : 'none'}">
			<div class="tab">
				<div class="close_button_header">
					<button type="button" on:click={closePanel}>Cancel</button>
				</div>
				<nav>
					<h2>Settings</h2>
					<button
						class="nav-item {active_settings_tab === 'AutoAdjust' ? 'isActive' : ''}"
						on:click={() => changeSettingsTab('AutoAdjust')}>Auto-adjust</button
					>
					<hr />
					<button
						class="nav-item {active_settings_tab === 'Size' ? 'isActive' : ''}"
						on:click={() => changeSettingsTab('Size')}>Size</button
					>
					<button
						class="nav-item {active_settings_tab === 'Header' ? 'isActive' : ''}"
						on:click={() => changeSettingsTab('Header')}>Header</button
					>
					<button
						class="nav-item {active_settings_tab === 'Footer' ? 'isActive' : ''}"
						on:click={() => changeSettingsTab('Footer')}>Footer</button
					>
					<button
						class="nav-item {active_settings_tab === 'Font' ? 'isActive' : ''}"
						on:click={() => changeSettingsTab('Font')}>Font</button
					>
					<button
						class="nav-item {active_settings_tab === 'Columns' ? 'isActive' : ''}"
						on:click={() => changeSettingsTab('Columns')}>Columns</button
					>
					<button
						class="nav-item {active_settings_tab === 'Graph' ? 'isActive' : ''}"
						on:click={() => changeSettingsTab('Graph')}>Graph</button
					>
					<button class="standard update-button" type="button" on:click={() => updateSettings()}
						>Update</button
					>
				</nav>
				<div class="controls_container">
					<PlotSizeControl
						bind:plotWidth_px
						bind:bodyHeight_px
						bind:headerHeight_px
						bind:footerHeight_px
						bind:leftAndRightMargins_px
						isActive={active_settings_tab === 'Size'}
					/>
					<PlotHeaderControl
						bind:headerHeight_px
						bind:title
						bind:titlePosition
						bind:titleSize
						isActive={active_settings_tab === 'Header'}
					/>
					<PlotFooterControl
						bind:footerTextIsCentered
						bind:footerHeight_px
						bind:footerText
						bind:footerTextSize
						isActive={active_settings_tab === 'Footer'}
					/>
					<PlotFontControl
						bind:fontFamily
						bind:fontSize
						isActive={active_settings_tab === 'Font'}
					/>
					<PlotColumnsPositionControl
						bind:fieldsSettings={data.matrix.project.fieldsSettings}
						bind:blocks_titles_position
						bind:column_position_name
						bind:column_position_effectSize
						bind:column_position_lowerLimit
						bind:column_position_upperLimit
						bind:column_position_weight
						bind:column_position_variance
						bind:column_position_standardError
						bind:column_position_pValue
						bind:column_position_totalSS
						bind:column_position_sampleSizeGroup1
						bind:column_position_sampleSizeGroup2
						bind:column_position_notAssignedSS
						bind:column_position_ncf1
						bind:column_position_ncf2
						bind:column_position_ncf3
						bind:column_position_ncf4
						bind:column_position_ncf5
						bind:column_position_scf1
						bind:column_position_scf2
						bind:column_position_scf3
						bind:column_position_scf4
						bind:column_position_scf5
						bind:column_position_ci
						isActive={active_settings_tab === 'Columns'}
					/>
					<PlotGraphControl
						bind:graphPosition
						bind:graphSize
						bind:graphEsSquareSize
						bind:graphEsProportionMethod
						bind:graphOverallsLines
						bind:graphShowGrid
						bind:graphShowGridLines
						bind:graphGridTicks
						bind:graphGridTicksMaxAmount
						bind:graphGridScale
						minValue={Number(data.matrix.min_value)}
						maxValue={Number(data.matrix.max_value)}
						nullValue={Number(data.matrix.project.projectSettings.nullValue)}
						isActive={active_settings_tab === 'Graph'}
					/>
					<PlotAutofitControl
						on:plotReload={reload}
						isActive={active_settings_tab === 'AutoAdjust'}
					/>
				</div>
			</div>
		</div>

		<nav class="settings_bar">
			<button class="settings_button" on:click={() => (settings_overlay = true)}>Settings</button>
		</nav>

		<div class="plot_wrapper">
			<div style="width:{plotWidth_px}px; height:{plotHeight_px}px">
				<svg
					id="forestplot"
					style="background-color: white; font-family: {fontFamily};"
					width="{plotWidth_px}px"
					height="{plotHeight_px}px"
					preserveAspectRatio="xMinYMin"
					xmlns="http://www.w3.org/2000/svg"
				>
					<rect width="100%" height="100%" fill="white" />

					<!-- HEADER -->
					<PlotHeaderElement
						bind:headerHeight_px
						bind:title
						bind:titlePosition
						bind:titleSize
						isActive={active_settings_tab === 'Header' || active_settings_tab === 'Size'}
					/>

					<!-- FOOTER -->
					<PlotFooterElement
						{footerTextIsCentered}
						leftMargin_px={leftAndRightMargins_px}
						bind:plotHeight_px
						bind:footerHeight_px
						bind:footerText
						bind:footerTextSize
						isActive={active_settings_tab === 'Footer' || active_settings_tab === 'Size'}
					/>

					<!-- MARGINS 
            <PlotLeftAndRightMarginsElement bind:plotWidth_px bind:leftAndRightMargins_px bind:headerHeight_px bind:bodyHeight_px isActive={active_settings_tab === "Size"} />
            -->

					<!-- TABLE -->
					<PlotTableElement
						y_px={headerHeight_px}
						x_px={leftAndRightMargins_px}
						{bodyWidth_px}
						{bodyHeight_px}
						{blocks_titles_position}
						{column_position_name}
						{column_position_effectSize}
						{column_position_lowerLimit}
						{column_position_upperLimit}
						{column_position_weight}
						{column_position_variance}
						{column_position_standardError}
						{column_position_pValue}
						{column_position_totalSS}
						{column_position_sampleSizeGroup1}
						{column_position_sampleSizeGroup2}
						{column_position_notAssignedSS}
						{column_position_ncf1}
						{column_position_ncf2}
						{column_position_ncf3}
						{column_position_ncf4}
						{column_position_ncf5}
						{column_position_scf1}
						{column_position_scf2}
						{column_position_scf3}
						{column_position_scf4}
						{column_position_scf5}
						{column_position_ci}
						{real_font_size}
						fieldsSettings={data.matrix.project.fieldsSettings}
						rows={data.matrix.rows}
					/>

					<!-- GRAPH -->
					<PlotGraphElement
						graph_y_px={headerHeight_px}
						graph_x_px={leftAndRightMargins_px + (graphPosition / 100) * bodyWidth_px}
						graph_height_px={bodyHeight_px}
						graph_width_px={(bodyWidth_px * graphSize) / 100}
						{graphEsSquareSize}
						{graphEsProportionMethod}
						{graphOverallsLines}
						{graphShowGrid}
						{graphShowGridLines}
						{graphGridTicks}
						{graphGridScale}
						{real_font_size}
						matrix={data.matrix}
						nullValue={Number(data.matrix.project.projectSettings.nullValue)}
					/>
				</svg>
			</div>
		</div>

		<br />
		<h2>Download</h2>
		<button class="standard" on:click={() => downloadJPG()} type="button">Download as JPG</button>
		<button class="standard" on:click={() => downloadPNG()} type="button">Download as PNG</button>
		<button class="standard" on:click={() => downloadSVG()} type="button">Download as SVG</button>

	{/if}
</div>

