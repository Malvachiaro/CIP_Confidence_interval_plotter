<script lang="ts">

    import type { SquareProportionMethod } from "$lib/cip/models/CipPlotSettings";

    export let graph_y_px: number;
    export let graph_x_px: number;
    export let graph_height_px: number;
    export let graph_width_px: number;

    export let graphEsSquareSize: number;
    export let graphEsProportionMethod: SquareProportionMethod;
    export let graphOverallsLines: boolean;

    export let graphShowGrid: boolean;
    export let graphShowGridLines: boolean;
    export let graphGridTicks: string;
    export let graphGridScale: string;

    export let nullValue: number;

    export let real_font_size: number;
    $: font_offset = real_font_size * 0.3;

    export let matrix:any


    function calc_es(value: number, scale: string): number {
        if (scale === "Linear") {
            return ((value - matrix.min_value) / (matrix.max_value - matrix.min_value)) * 100;
        } else if (scale === "Logarithmic") {
            return ((Math.log(value) - Math.log(matrix.min_value)) / (Math.log(matrix.max_value) - Math.log(matrix.min_value))) * 100;
        } else {
            return 0;
        }
    }

    function calc_es_square_side(weight: number, method: SquareProportionMethod, maxSquareSide: number): number {
        if (method === "Square area") {
            return Math.sqrt((maxSquareSide * maxSquareSide * weight) / matrix.max_weight);
        } else if (method === "Square side") {
            return (maxSquareSide * weight) / matrix.max_weight;
        } else {
            return maxSquareSide;
        }
    }

    function studyNameTruncate(name: string): string {
        if (name.length > 10) {
            return name.substring(0, 10) + "...";
        } else {
            return name;
        }
    }

    function gridTicksStringToValues(ticks: string): number[] {
        return ticks
            .split(",")
            .filter((element) => {
                element = element.trim();
                return (
                    element !== "" &&
                    !isNaN(Number(element)) &&
                    (graphGridScale === "Linear" || (graphGridScale === "Logarithmic" && Number(element) > 0)) &&
                    Number(element) < matrix.max_value &&
                    Number(element) > matrix.min_value
                );
            })
            .map((x) => Number(x));
    }

    $: graphGridTicksValues = gridTicksStringToValues(graphGridTicks);
</script>


{#each matrix.rows as row}
    {#if row.type === "study" && row.row !== null}
    
        <line
            style="stroke: black; stroke-width: 1"
            x1={graph_x_px + (calc_es(row.row.lowerLimit, graphGridScale) * graph_width_px) / 100}
            x2={graph_x_px + (calc_es(row.row.upperLimit, graphGridScale) * graph_width_px) / 100}
            y1={graph_y_px + (graph_height_px * ((row.y_pct+ row.height_pct) - row.height_pct / 2)) / 100 - font_offset}
            y2={graph_y_px + (graph_height_px * ((row.y_pct+ row.height_pct) - row.height_pct / 2)) / 100 - font_offset}
        />

        {#if !row.row.isOverall}
            <rect
                style="fill: black;"
                x="{graph_x_px + (calc_es(row.row.effectSize, graphGridScale) * graph_width_px) / 100 - calc_es_square_side(row.row.weight, graphEsProportionMethod, graphEsSquareSize) / 2}px"
                y="{graph_y_px +
                    (graph_height_px * ((row.y_pct+ row.height_pct) - row.height_pct / 2)) / 100 -
                    calc_es_square_side(row.row.weight, graphEsProportionMethod, graphEsSquareSize) / 2 -
                    font_offset}px"
                width="{calc_es_square_side(row.row.weight, graphEsProportionMethod, graphEsSquareSize)}px"
                height="{calc_es_square_side(row.row.weight, graphEsProportionMethod, graphEsSquareSize)}px"
            >
                <title>{studyNameTruncate(row.row.name) + "  " + row.row.effectSize + " [" + row.row.lowerLimit + "," + row.row.upperLimit + "]"}</title>
            </rect>
        {/if}
        {#if row.row.isOverall}
            <rect
                style="fill: white; stroke: black; stroke-width: 2;"
                transform=" rotate(
                    45,
                    {graph_x_px + (calc_es(row.row.effectSize, graphGridScale) * graph_width_px) / 100},
                    {graph_y_px + (graph_height_px * ((row.y_pct+ row.height_pct) - row.height_pct / 2)) / 100 - font_offset}
                    )"
                x="{graph_x_px + (calc_es(row.row.effectSize, graphGridScale) * graph_width_px) / 100 - graphEsSquareSize / 2}px"
                y="{graph_y_px + (graph_height_px * ((row.y_pct+ row.height_pct) - row.height_pct / 2)) / 100 - graphEsSquareSize / 2 - font_offset}px"
                width="{graphEsSquareSize}px"
                height="{graphEsSquareSize}px"
            >
                <title>{studyNameTruncate(row.row.name) + "  " + row.row.effectSize + " [" + row.row.lowerLimit + "," + row.row.upperLimit + "]"}</title>
            </rect>

            {#if graphOverallsLines}
                <line
                    style="stroke: green; stroke-width: 1"
                    stroke-dasharray="5, 5"
                    x1="{graph_x_px + (calc_es(row.row.effectSize, graphGridScale) * graph_width_px) / 100}px"
                    y1="{graph_y_px + ((matrix.rows[0].height_pct + matrix.rows[1].height_pct) / 100) * graph_height_px}px"
                    x2="{graph_x_px + (calc_es(row.row.effectSize, graphGridScale) * graph_width_px) / 100}px"
                    y2="{graph_y_px + graph_height_px}px"
                />
            {/if}
        {/if}
    {/if}

    <!-- GRID-->
    {#if row.type === "grid"}
        {#if graphShowGrid}
            <line
                style="stroke: black; stroke-width: 2"
                x1={graph_x_px}
                y1={graph_y_px + (graph_height_px * ((row.y_pct+ row.height_pct) - row.height_pct * 0.66)) / 100}
                x2={graph_x_px + graph_width_px}
                y2={graph_y_px + (graph_height_px * ((row.y_pct+ row.height_pct) - row.height_pct * 0.66)) / 100}
            />

            {#each graphGridTicksValues as value}
                {#if value !== undefined && value !== null && !isNaN(value)}
                    <line
                        style="stroke: black; stroke-width: {graphShowGridLines ? '1' : '2'}"
                        stroke-dasharray="2, {graphShowGridLines ? '2' : '0'}"
                        x1="{graph_x_px + (calc_es(value, graphGridScale) * graph_width_px) / 100}px"
                        y1="{graph_y_px + (graph_height_px * ((row.y_pct+ row.height_pct) - row.height_pct * 0.6)) / 100}px"
                        x2="{graph_x_px + (calc_es(value, graphGridScale) * graph_width_px) / 100}px"
                        y2="{graphShowGridLines
                            ? graph_y_px + ((matrix.rows[0].height_pct + matrix.rows[1].height_pct) / 100) * graph_height_px
                            : graph_y_px + (graph_height_px * ((row.y_pct+ row.height_pct) - row.height_pct * 0.72)) / 100}px"
                    />

                    <text
                        style="text-align: center;"
                        x="{graph_x_px + (calc_es(value, graphGridScale) * graph_width_px) / 100}px"
                        y="{graph_y_px + (graph_height_px * ((row.y_pct+ row.height_pct) - row.height_pct * 0.2)) / 100 - font_offset}px"
                        text-anchor="middle"
                        font-size={real_font_size}
                        >{value}
                    </text>
                {/if}
            {/each}
        {/if}

        <!-- Null Value -->
        <line
            style="stroke: black; stroke-width: 2"
            x1="{graph_x_px + (calc_es(nullValue, graphGridScale) * graph_width_px) / 100}px"
            y1="{graph_y_px + (graph_height_px * ((row.y_pct+ row.height_pct) - row.height_pct * 0.45)) / 100}px"
            x2="{graph_x_px + (calc_es(nullValue, graphGridScale) * graph_width_px) / 100}px"
            y2="{graph_y_px + ((matrix.rows[0].height_pct + matrix.rows[1].height_pct) / 100) * graph_height_px}px"
        />
        <text
            style="text-align: center;"
            x="{graph_x_px + (calc_es(nullValue, graphGridScale) * graph_width_px) / 100}px"
            y="{graph_y_px + (graph_height_px * ((row.y_pct+ row.height_pct) - row.height_pct * 0.05)) / 100 - font_offset}px"
            text-anchor="middle"
            font-size={real_font_size}
        >
            {nullValue}
        </text>
    {/if}
{/each}

