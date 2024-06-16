import type { CipRow } from "$lib/cip/models/CipRow"

export type PlotterRowType = "titles"| "block" | "study" | "grid" | "empty"

export class PlotterRow{
    type: PlotterRowType
    name: string = ""
    row:CipRow | null
    y_pct: number = 0
    height_pct: number = 0

    getY1_pct(): number{
        return this.y_pct
    }
    getY2_pct(): number{
        return this.y_pct + this.height_pct
    }
    getHeight_pct(): number{
        return this.height_pct
    }

    constructor(type: PlotterRowType, name: string, row:CipRow | null) {
        this.row = row
        this.type = type
        this.name = name
    }


}