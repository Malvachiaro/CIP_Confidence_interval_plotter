import { CipProject } from '$lib/cip/models/CipProject';
import { basename, dirname } from '@tauri-apps/api/path';
import { dexie_db_cip } from '$lib/cip/database/Cip_db_dexie';
import { RuntimeVariablesFunctions } from '$lib/cip/functions/lowLevel/RunningVariables';
import { TauriFunctions } from '$lib/cip/functions/lowLevel/TauriFunctions';
import type { FieldsSettings } from '$lib/cip/models/CipFieldsSettings';
import { type CipFieldNameType } from '$lib/cip/types/CipTD';
import type { SortTD_DirectionType } from '$lib/common/SortDT';
import { CipProjectHandler } from '$lib/cip/functions/lowLevel/ProjectHandler';
import type { CipBlock } from '$lib/cip/models/CipBlock';
import type { PlotSettings } from '$lib/cip/models/CipPlotSettings';
import { CipPlotHandler } from '$lib/cip/functions/lowLevel/PlotHandler';

export class AppFunctions {


	static async getAppVersion(): Promise<string> {
		return await TauriFunctions.getAppVersion();
	}

	static async createNewProject(projectName: string, projectDescription: string): Promise<void> {
		let path: string | null = await RuntimeVariablesFunctions.getVariable('lastPathDirectory');
		let filePath = await TauriFunctions.getNewProjectPath(path, projectName);

		if (filePath != null) {
			await TauriFunctions.bootProjectOnCache(new CipProject(projectName, projectDescription));
			await AppFunctions.setPathRunningVariables(filePath);
			await RuntimeVariablesFunctions.setVariable('lastPathDirectory', await TauriFunctions.getPathDir(filePath));
		}
		await AppFunctions.saveProjectToDisk();
	}

	static async saveProjectToDisk() {
		let cipProject = await AppFunctions.getRunningProject();
		let filePath = await RuntimeVariablesFunctions.getVariable('projectFilepath');
		if (cipProject != null && filePath != null) {
			await TauriFunctions.saveProject(cipProject, filePath);
		}
		let tmp = Date.now();
		dexie_db_cip.runningProject.update(0, { saveDate: tmp, modifyDate: tmp });
	}

	static async saveProjectAsToDisk() {
		let cipProject = await AppFunctions.getRunningProject();
		let filePath = await RuntimeVariablesFunctions.getVariable('projectFilepath');
		if (cipProject != null && filePath != null) {
			let newPath = await TauriFunctions.getNewProjectPath(
				await RuntimeVariablesFunctions.getVariable('projectDirectory'),
				cipProject.name
			);

			if (newPath == null) {
				return;
			} else {
				await TauriFunctions.saveProject(cipProject, newPath);
				await AppFunctions.setPathRunningVariables(newPath);
				await RuntimeVariablesFunctions.setVariable('lastPathDirectory', await TauriFunctions.getPathDir(newPath));
			}
		}
		let tmp = Date.now();
		dexie_db_cip.runningProject.update(0, { saveDate: tmp, modifyDate: tmp });
	}

	static async openProjectFromDisk(): Promise<boolean> {
		let lastPath:string | null = await RuntimeVariablesFunctions.getVariable('lastPathDirectory');
		if(lastPath==null){
			lastPath = await TauriFunctions.getUserDocumentDir();
		}

		let path = await TauriFunctions.openProjectPath(lastPath);
		if (path != null) {
			await RuntimeVariablesFunctions.setVariable('lastPathDirectory', await TauriFunctions.getPathDir(path));
			let prj: CipProject = await TauriFunctions.loadProject(path);
			await TauriFunctions.bootProjectOnCache(prj);
			await AppFunctions.setPathRunningVariables(path);
			return true
		}else{
			return false
		}
	}

	static async checkFilesystemPermissions(path:string): Promise<boolean> {
		return await TauriFunctions.checkPathPermission(path);
	}


	static async checkRunningProjectPermissions(): Promise<boolean> {
		let path = await RuntimeVariablesFunctions.getVariable('projectFilepath')
		if(path == null){
			return false
		}
		return TauriFunctions.checkPathPermission(path);
	}


	static async setPathRunningVariables(path: string): Promise<void> {
		await RuntimeVariablesFunctions.setVariable('projectFilepath', path);
		await RuntimeVariablesFunctions.setVariable('projectFilename', await basename(path));
		await RuntimeVariablesFunctions.setVariable('projectDirectory', await dirname(path));
	}
	
	
	static async isSaved(): Promise<boolean> {
		let prjOnCache = await dexie_db_cip.runningProject.get(0);
		if (prjOnCache == null) {
			return false;
		} else {
			if (prjOnCache.modifyDate == prjOnCache.saveDate) {
				return true;
			} else {
				return false;
			}
		}
	}






	static async getRunningProject(): Promise<CipProject | null> {
		let prjOnCache = await dexie_db_cip.runningProject.get(0);
		if (prjOnCache == null) {
			return null;
		} else {
			return CipProject.constructFromObject(JSON.parse(prjOnCache.data));
		}
	}
	static async getRunningProjectInfo(): Promise<any | null> {
		let prjOnCache = await dexie_db_cip.runningProject.get(0);
		if (prjOnCache == null) {
			return null;
		} else {
			return {
				name: prjOnCache.name,
				description: prjOnCache.description
			};
		}
	}




	static async updateRunningProject(cipProject: CipProject): Promise<void> {
		await dexie_db_cip.runningProject.update(0, {
			name: cipProject.name,
			description: cipProject.description,
			modifyDate: Date.now(),
			data: JSON.stringify(cipProject)
		});
	}


	static async clearCache(): Promise<void> {
		return dexie_db_cip.runningProject.clear();
	}




	static async updateProjectSettings(
		name: string,
		description: string,
		nullValue: number
	): Promise<void> {
		let prj: CipProject | null = await this.getRunningProject();
		if (prj != null) {
			prj.name = name;
			prj.description = description;
			prj.projectSettings.nullValue = nullValue;
			await AppFunctions.updateRunningProject(prj);
		}
	}


	static async updateProjectFieldsSettings(fieldsSettings: FieldsSettings): Promise<void> {
		let prj: CipProject | null = await AppFunctions.getRunningProject()
		if(prj != null){
			prj.fieldsSettings = fieldsSettings
			AppFunctions.updateRunningProject(prj)
		}

	}	

	static async sortRows(sortBy: CipFieldNameType, sortDirection: SortTD_DirectionType): Promise<void> {
		let prj: CipProject | null = await AppFunctions.getRunningProject();
		if (prj == null) {
			return;
		}
		CipProjectHandler.sortRows(prj, sortBy, sortDirection);
		await AppFunctions.updateRunningProject(prj);

	}

	static async createNewBlock(name: string): Promise<void> {
		let prj: CipProject | null = await AppFunctions.getRunningProject();
		if (prj == null) {
			return;
		}
		CipProjectHandler.createNewBlock(prj, name);
		await AppFunctions.updateRunningProject(prj);
	}

	static async getBlock(id: number): Promise<CipBlock | null> {
		let prj: CipProject | null = await AppFunctions.getRunningProject();
		if (prj == null) {
			return null;
		}
		return CipProjectHandler.getBlock(prj, id);
	}

	static async deleteBlock(id: number): Promise<boolean> {
		let confirm:boolean = await TauriFunctions.confirmDelete()
		if(!confirm){
			return false
		}

		let prj: CipProject | null = await AppFunctions.getRunningProject();
		if (prj == null) {
			return false;
		}
		CipProjectHandler.deleteBlock(prj, id);
		await AppFunctions.updateRunningProject(prj);
		return true
	}
	
	static async updateBlockName(blockId: number, newBlockName: string): Promise<void> {
		let prj: CipProject | null = await AppFunctions.getRunningProject();
		if (prj == null) {
			return;
		}
		CipProjectHandler.updateBlockName(prj, blockId, newBlockName);
		await AppFunctions.updateRunningProject(prj);
	}

	static async createNewRow(blockId: number): Promise<void> {
		let prj: CipProject | null = await AppFunctions.getRunningProject();
		if (prj == null) {
			return;
		}
		CipProjectHandler.createNewRow(prj, blockId);
		await AppFunctions.updateRunningProject(prj);
	}

	static async deleteRow(rowId: number): Promise<boolean> {
		let confirm:boolean = await TauriFunctions.confirmDelete()
		if(!confirm){
			return false
		}

		let prj: CipProject | null = await AppFunctions.getRunningProject();
		if (prj == null) {
			return false;
		}
		CipProjectHandler.deleteRow(prj, rowId);
		await AppFunctions.updateRunningProject(prj);
		return true
	}


	static async moveRowToBlock(srcBlockId:number, rowId: number, destinationBlockId: number): Promise<void> {
		let prj: CipProject | null = await AppFunctions.getRunningProject();
		if (prj == null) {
			return;
		}
		CipProjectHandler.moveRowToBlock(prj, srcBlockId, rowId, destinationBlockId);
		await AppFunctions.updateRunningProject(prj);
	}

	static async moveRowUpOrDown(blockId: number, rowId: number, index_gap:number) {
		let prj: CipProject | null = await AppFunctions.getRunningProject();
		if (prj == null) {
			return;
		}
		CipProjectHandler.moveRowUpOrDown(prj, blockId, rowId, index_gap);
		await AppFunctions.updateRunningProject(prj);
	}

	static async moveBlockUpOrDown(blockId: number, index_gap:number) {
		let prj: CipProject | null = await AppFunctions.getRunningProject();
		if (prj == null) {
			return;
		}
		CipProjectHandler.moveBlockUpOrDown(prj, blockId, index_gap);
		await AppFunctions.updateRunningProject(prj);
	}

	static async importRowsFromJson(blockId:number, json_rows: string) {
		let prj: CipProject | null = await AppFunctions.getRunningProject();
		if (prj == null) {
			return;
		}
		CipProjectHandler.importRowsFromJson(prj, blockId, json_rows);
		await AppFunctions.updateRunningProject(prj);
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

		let prj: CipProject | null = await AppFunctions.getRunningProject();
		if (prj == null) {
			return;
		}
		CipProjectHandler.updateRow(
			prj, 
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
		await AppFunctions.updateRunningProject(prj);
	}


	static async updatePlotSettings(plotSettings: PlotSettings) {
		let prj: CipProject | null = await AppFunctions.getRunningProject();
		if (prj == null) {
			return;
		}
		CipProjectHandler.updatePlotSettings(prj, plotSettings);
		await AppFunctions.updateRunningProject(prj);
	}


	static async plotAutofit() {
		let prj: CipProject | null = await AppFunctions.getRunningProject();
		if (prj == null) {
			return;
		}
		CipPlotHandler.plotAutofit(prj);
		await AppFunctions.updateRunningProject(prj);
	}

	static async plotAutofitBootstrap() {
		let prj: CipProject | null = await AppFunctions.getRunningProject();
		if (prj == null) {
			return;
		}
		CipPlotHandler.plotAutofitBootstrap(prj);
		await AppFunctions.updateRunningProject(prj);
	}


	static async downloadPlotImage(svg:string, fileName:string, extension:string) {
		let path = await RuntimeVariablesFunctions.getVariable('downloadDirPath')
		if(path == null){
			path = await TauriFunctions.getUserDocumentDir();
		}
		let fileTypeLabel = ""
		if(extension == "jpg"){
			fileTypeLabel = "image/JPEG"
		}else if(extension == "png"){
			fileTypeLabel = "image/PNG"
		} else if(extension == "svg"){
			fileTypeLabel = "image/SVG"
		}else{
			throw Error("Extension not supported")
		}

		let real_path = await TauriFunctions.getSaveFilePath(fileTypeLabel, extension, fileName, path)

		if(real_path == null){
			return
		}else{
			let pathDir = await TauriFunctions.getPathDir(real_path)
			await RuntimeVariablesFunctions.setVariable('downloadDirPath', pathDir)
		}

		if(extension == "svg"){
			await TauriFunctions.downloadSvg(svg, real_path)
		}else if(extension == "jpg"){
			await TauriFunctions.downloadJpg(svg, real_path)
		}else if(extension == "png"){
			await TauriFunctions.downloadPng(svg, real_path)
		}
	}

	

	static async alert(msg: string) {
		await TauriFunctions.alert(msg);
	}

	static async downloadAsTextFile(content: string, fileTypeLabel: string, fileName: string, extension:string) {
		let path = await RuntimeVariablesFunctions.getVariable('downloadDirPath')
		if(path == null){
			path = await TauriFunctions.getUserDocumentDir();
		}
		let real_path = await TauriFunctions.getSaveFilePath(fileTypeLabel, extension, fileName, path)

		if(real_path == null){
			return
		}else{
			let pathDir = await TauriFunctions.getPathDir(real_path)
			await RuntimeVariablesFunctions.setVariable('downloadDirPath', pathDir)
		}		
		await TauriFunctions.downloadAsTextFile(content, real_path);
	}

}
