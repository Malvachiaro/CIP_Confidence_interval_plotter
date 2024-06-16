import { SortTD, type SortTD_DirectionType } from "$lib/common/SortDT";


 

export class CipRuntimeVariables {
    sortBy: string = "name"
    sortDirection: SortTD_DirectionType = SortTD.SORT_DIRECTIONS.ASCENDING


    constructor() {
    }

    public static constructFromObject(object: any): CipRuntimeVariables {
        let ret:CipRuntimeVariables = new CipRuntimeVariables();
        ret.sortBy = object.sortBy
        ret.sortDirection = object.sortDirection
        return ret
    }
}