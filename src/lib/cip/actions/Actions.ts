import { AppFunctions } from "$lib/cip/functions/AppFunctions";
import type { FieldsSettings } from "$lib/cip/models/CipFieldsSettings";
import type { SortTD_DirectionType } from "$lib/common/SortDT";
import type { CipFieldNameType } from "$lib/cip/types/CipTD";
import type { CipBlock } from "$lib/cip/models/CipBlock";
import type { PlotSettings } from "$lib/cip/models/CipPlotSettings";



export class AppActions{

    static async createNewProject(prjectName: string, projectDescription: string): Promise<void> {
        await AppFunctions.createNewProject(prjectName, projectDescription);
    }



    static async isSaved(): Promise<boolean> {
        return await AppFunctions.isSaved();
    }

    static async saveProjectToDisk(): Promise<void> {
        await AppFunctions.saveProjectToDisk();
    }

    static async saveProjectAsToDisk(): Promise<void> {
        await AppFunctions.saveProjectAsToDisk();
    }

    static async openProjectFromDisk(): Promise<boolean> {
        return await AppFunctions.openProjectFromDisk();
    }



    static async updateProjectSettings(prjectName: string, projectDescription: string, nullValue:number): Promise<void> {
        await AppFunctions.updateProjectSettings(prjectName, projectDescription, nullValue);
        await AppFunctions.saveProjectToDisk();
    }

    static async updateProjectFieldsSettings(fieldsSettings: FieldsSettings): Promise<void> {
        await AppFunctions.updateProjectFieldsSettings(fieldsSettings);
        await AppFunctions.saveProjectToDisk();
    }

    static async sortRows(sortBy: CipFieldNameType, sortDirection: SortTD_DirectionType): Promise<void> {
        await AppFunctions.sortRows(sortBy, sortDirection);
        await AppFunctions.saveProjectToDisk();
    }

    static async createNewBlock(name: string): Promise<void> {
        await AppFunctions.createNewBlock(name);
        await AppFunctions.saveProjectToDisk();
    }

    static async getBlock(id: number): Promise<CipBlock | null> {
        let block = await AppFunctions.getBlock(id);
        return block
    }

    static async deleteBlock(id: number): Promise<void> {
        let deleted:boolean = await AppFunctions.deleteBlock(id);
        if(deleted){
            await AppFunctions.saveProjectToDisk();
        }
    }

    static async updateBlockName(blockId: number, newBlockName: string): Promise<void> {
        await AppFunctions.updateBlockName(blockId, newBlockName);
        await AppFunctions.saveProjectToDisk();
    }

    static async createNewRow(blockId: number): Promise<void> {
        await AppFunctions.createNewRow(blockId);
        await AppFunctions.saveProjectToDisk();
    }

    static async deleteRow(rowId: number): Promise<void> {
        await AppFunctions.deleteRow(rowId);
        await AppFunctions.saveProjectToDisk();
    }

    static async moveRowToBlock(srcBlockId:number, rowId: number, destinationBlockId: number): Promise<void> {
        await AppFunctions.moveRowToBlock(srcBlockId, rowId, destinationBlockId);
        await AppFunctions.saveProjectToDisk();
    }

    static async moveRowUp(blockId: number, rowId: number) {
        await AppFunctions.moveRowUpOrDown(blockId, rowId, -1);
        await AppFunctions.saveProjectToDisk();
    }
    static async moveRowDown(blockId: number, rowId: number) {
        await AppFunctions.moveRowUpOrDown(blockId, rowId, 1);
        await AppFunctions.saveProjectToDisk();
    }

    static async moveBlockUp(blockId: number) {
        await AppFunctions.moveBlockUpOrDown(blockId, -1);
        await AppFunctions.saveProjectToDisk();
    }
    static async moveBlockDown(blockId: number) {
        await AppFunctions.moveBlockUpOrDown(blockId, 1);
        await AppFunctions.saveProjectToDisk();
    }


    static async imporRowsFromJson(blockId: number, json: string): Promise<void> {
        await AppFunctions.importRowsFromJson(blockId, json);
        await AppFunctions.saveProjectToDisk();
    }

    static async updateRow(
		rowId: number,
		name: string,
		isOverall: boolean,
		effectSize: number,
		lowerLimit: number,
		upperLimit: number,
		weight: number,
		variance: number | null,
		standardError: number | null,
		pValue: number | null,
		totalSS: number | null,
		sampleSizeGroup1: number | null,
		sampleSizeGroup2: number | null,
		notAssignedSS: number | null,
		ncf1: number | null,
		ncf2: number | null,
		ncf3: number | null,
		ncf4: number | null,
		ncf5: number | null,
		scf1: string | null,
		scf2: string | null,
		scf3: string | null,
		scf4: string | null,
		scf5: string | null
    ){

        await AppFunctions.updateRow(
            rowId,
            name,
            isOverall,
            effectSize,
            lowerLimit,
            upperLimit,
            weight,
            variance,
            standardError,
            pValue,
            totalSS,
            sampleSizeGroup1,
            sampleSizeGroup2,
            notAssignedSS,
            ncf1,
            ncf2,
            ncf3,
            ncf4,
            ncf5,
            scf1,
            scf2,
            scf3,
            scf4,
            scf5
        );
        await AppFunctions.saveProjectToDisk();
    }

    static async updatePlotSettings(plotSettings: PlotSettings) {
        await AppFunctions.updatePlotSettings(plotSettings);
        await AppFunctions.saveProjectToDisk();
    }

    static async plotAutofit() {
        await AppFunctions.plotAutofit();
        await AppFunctions.saveProjectToDisk();
    }

    static async plotAutofitBootstrap() {
        await AppFunctions.plotAutofitBootstrap();
        await AppFunctions.saveProjectToDisk();
    }


    static async downloadSvg(svg: string, fileName: string) {
        await AppFunctions.downloadPlotImage(svg, fileName, "svg");
    }

    static async downloadPng(svg: string, fileName: string) {
        await AppFunctions.downloadPlotImage(svg, fileName, "png");
    }

    static async downloadJpg(svg: string, fileName: string) {
        await AppFunctions.downloadPlotImage(svg, fileName, "jpg");
    }



    static async clearCache(): Promise<void> {
        await AppFunctions.clearCache();
    }

}

