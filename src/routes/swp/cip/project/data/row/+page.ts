import { CipProjectHandler } from "$lib/cip/functions/lowLevel/ProjectHandler";
import type { CipProject } from "$lib/cip/models/CipProject";
import type { CipRow } from "$lib/cip/models/CipRow";
import type { PageLoad } from "./$types";






export const load: PageLoad = async ({ url }) => {
    
    let rowId:number = Number(url.searchParams.get('rowId'));

    let f = await import ('$lib/cip/functions/AppFunctions')
    let prj:CipProject | null = await f.AppFunctions.getRunningProject()

    if(prj == null){
        throw Error("No project found")
    }
    let row:CipRow | null = CipProjectHandler.getRow(prj,Number(rowId))

    if(row===null){
        throw Error("No row found")
    }

    return {
        row: row,
        fieldsSettings: JSON.parse(JSON.stringify(prj.fieldsSettings)),
    };
};
