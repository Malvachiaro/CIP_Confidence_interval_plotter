import type { CipProject } from "$lib/cip/models/CipProject";
import type { PageLoad } from "./$types";



export const load = (async () => {

    console.log("fields load")
    let f = await import ('$lib/cip/functions/AppFunctions')

    let prj:CipProject | null = await f.AppFunctions.getRunningProject()

    if(prj == null){
        return {
        }
    }

    return {
        fieldsSettings: JSON.parse(JSON.stringify(prj.fieldsSettings)),
    };
}) satisfies PageLoad;

