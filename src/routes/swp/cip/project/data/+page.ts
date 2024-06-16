
import type { PageLoad } from "./$types";
import type { CipProject } from "$lib/cip/models/CipProject";

export const load: PageLoad = async () => {
    let f = await import ('$lib/cip/functions/AppFunctions')
    let prj:CipProject | null = await f.AppFunctions.getRunningProject()
    if(prj == null){
        return {
        }
    }
    return {
        blocks: JSON.parse(JSON.stringify(prj.blocks)),
        fieldsSettings: JSON.parse(JSON.stringify(prj.fieldsSettings)),
        runtimeVariables: JSON.parse(JSON.stringify(prj.runtimeVariables)),
    };
};
