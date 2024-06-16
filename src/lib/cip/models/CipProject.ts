import { ProjectSettings } from "./CipProjectSettings";
import { PlotSettings } from "./CipPlotSettings";
import { FieldsSettings } from "./CipFieldsSettings";
import type { CipRow } from "./CipRow";
import { CipBlock } from "./CipBlock";
import { CipRuntimeVariables } from "./CipRuntimeVariables";






export class CipProject {
    name: string;
    description: string;
    idCount = 0;
    blocks: CipBlock[] = [];
    projectSettings: ProjectSettings = new ProjectSettings();
    fieldsSettings: FieldsSettings;
    plotSettings: PlotSettings = new PlotSettings();
    runtimeVariables: CipRuntimeVariables = new CipRuntimeVariables();

    constructor(name: string, description: string) {
        this.name = name;
        this.description = description;
        this.fieldsSettings = new FieldsSettings();
    }

    getNewId() {
        this.idCount++;
        return this.idCount;
    }

    /**
     * Retrieves all rows from all blocks in the project and returns them as an array.
     *
     * @return {CipRow[]} An array containing all rows from all blocks in the project.
     */
    getAllRows(): CipRow[] {
        let rows: CipRow[] = [];
        for (let i = 0; i < this.blocks.length; i++) {
            rows = rows.concat(this.blocks[i].rows);
        }
        return rows
    }






    public static constructFromObject(object: any): CipProject {
        let ret:CipProject = new CipProject(object["name"], object["description"]);
        ret.idCount = object["idCount"];
        ret.plotSettings = PlotSettings.constructFromObject(object["plotSettings"]);
        ret.projectSettings = ProjectSettings.constructFromObject(object["projectSettings"]);
        ret.fieldsSettings = FieldsSettings.constructFromObject(object["fieldsSettings"]);
        ret.runtimeVariables=CipRuntimeVariables.constructFromObject(object["runtimeVariables"]);
        ret.blocks = [];
        for (let i = 0; i < object["blocks"].length; i++) {
            ret.blocks.push(CipBlock.constructFromObject(object["blocks"][i]));
        }
        return ret
    }
}



