import { CipBlock } from '$lib/cip/models/CipBlock';
import { PlotSettings } from '$lib/cip/models/CipPlotSettings';
import type { CipProject } from '$lib/cip/models/CipProject';
import { CipRow } from '$lib/cip/models/CipRow';
import { CipTD, type CipFieldNameType } from '$lib/cip/types/CipTD';
import { SortTD, type SortTD_DirectionType } from '$lib/common/SortDT';

export class CipProjectHandler {
	public static sortRows(
		project: CipProject,
		sortBy: CipFieldNameType,
		sortDirection: SortTD_DirectionType
	) {
		let sort: keyof CipRow = sortBy as keyof CipRow;
		if (!(sort in CipTD.FIELDS_NAMES)) {
			throw new Error(`Invalid sort key: ${sort}`);
		}
		if (sort == CipTD.FIELDS_NAMES.ci) {
			sort = CipTD.FIELDS_NAMES.lowerLimit as keyof CipRow;
		}

		project.runtimeVariables.sortBy = sortBy;
		project.runtimeVariables.sortDirection = sortDirection;

		for (let i = 0; i < project.blocks.length; i++) {
			let studies: CipRow[] = project.blocks[i].rows.filter((item) => item.isOverall === false);
			let overall: CipRow[] = project.blocks[i].rows.filter((item) => item.isOverall === true);
			try {
				if (sortDirection == SortTD.SORT_DIRECTIONS.ASCENDING) {
					studies = studies.sort((a, b) => (a[sort]! > b[sort]! ? 1 : -1));
					overall = overall.sort((a, b) => (a[sort]! > b[sort]! ? 1 : -1));
				} else {
					studies = studies.sort((a, b) => (a[sort]! < b[sort]! ? 1 : -1));
					overall = overall.sort((a, b) => (a[sort]! < b[sort]! ? 1 : -1));
				}
			} catch (e) {
				throw new Error(`Sorting error: ${sort}`);
			}

			project.blocks[i].rows = studies.concat(overall);
		}
	}

	public static createNewBlock(project: CipProject, name: string) {
		project.idCount = project.idCount + 1;
		project.blocks.push(new CipBlock(project.idCount, name));
	}

	public static getBlock(project: CipProject, blockId: number) {
		let tmp = project.blocks.find((item) => item.id === blockId);
		if (tmp === undefined) {
			return null;
		}
		return tmp;
	}

	public static deleteBlock(project: CipProject, blockId: number) {
		project.blocks = project.blocks.filter((item) => item.id !== blockId);
	}

	public static updateBlockName(project: CipProject, blockId: number, blockNewName: string) {
		let tmp = project.blocks.find((item) => item.id === blockId);
		if (tmp === undefined) {
			throw Error('No block found');
		}
		tmp.name = blockNewName;
	}

	public static createNewRow(project: CipProject, blockId: number) {
		let tmp = project.blocks.find((item) => item.id === blockId);
		if (tmp === undefined) {
			throw Error('No block found');
		}
		tmp.rows.push(
			new CipRow(
				project.getNewId(),
				'New study',
				false,
				1,
				0.5,
				1.5,
				1,
				0,
				0,
				0.001,
				100,
				50,
				50,
				0,
				0,
				0,
				0,
				0,
				0,
				'',
				'',
				'',
				'',
				''
			)
		);
	}

	public static addRow(project: CipProject, blockId: number, row: CipRow) {
		let tmp = project.blocks.find((item) => item.id === blockId);
		if (tmp === undefined) {
			throw Error('No block found');
		}
		row.id = project.getNewId();
		tmp.rows.push(row);
	}

	public static updateRow(
		project: CipProject,
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
	) {
		let row = CipProjectHandler.getRow(project, rowId);
		if (row === null) {
			throw Error('No row found');
		}
		row.name = name;
		row.isOverall = isOverall;
		row.effectSize = effectSize;
		row.lowerLimit = lowerLimit;
		row.upperLimit = upperLimit;
		row.weight = weight;
		row.variance = variance;
		row.standardError = standardError;
		row.pValue = pValue;
		row.totalSS = totalSS;
		row.sampleSizeGroup1 = sampleSizeGroup1;
		row.sampleSizeGroup2 = sampleSizeGroup2;
		row.notAssignedSS = notAssignedSS;
		row.ncf1 = ncf1;
		row.ncf2 = ncf2;
		row.ncf3 = ncf3;
		row.ncf4 = ncf4;
		row.ncf5 = ncf5;
		row.scf1 = scf1;
		row.scf2 = scf2;
		row.scf3 = scf3;
		row.scf4 = scf4;
		row.scf5 = scf5;
	}

	public static deleteRow(project: CipProject, rowId: number): boolean {
		for(let i = 0; i < project.blocks.length; i++) {
			let tmp = project.blocks[i].rows.find((item) => item.id === rowId);
			if(tmp !== undefined) {
				project.blocks[i].rows = project.blocks[i].rows.filter((item) => item.id !== rowId);
				return true;
			}
		}
		return false;

	}

	public static getRow(project: CipProject,  rowId: number): CipRow | null {
		for(let i = 0; i < project.blocks.length; i++) {
			let tmp = project.blocks[i].rows.find((item) => item.id === rowId);
			if(tmp !== undefined) {
				return tmp;
			}
		}
		return null;
	}
		


	public static moveRowToBlock(
		project: CipProject,
		srcBlockId: number,
		rowId: number,
		destinationBlockId: number
	) {
		let row: CipRow | null = CipProjectHandler.getRow(project, rowId);
		let srcBlock = project.blocks.find((item) => item.id === srcBlockId);

		for (let i = 0; i < project.blocks.length; i++) {
			if (project.blocks[i].id === destinationBlockId) {
				project.blocks[i].rows.push(row!);
			}
			if (project.blocks[i].id === srcBlockId) {
				project.blocks[i].rows = project.blocks[i].rows.filter((item) => item.id !== rowId);
			}
		}
	}

	public static moveRowUpOrDown(
		project: CipProject,
		blockId: number,
		rowId: number,
		index_gap: number
	) {
		let row: CipRow | null = CipProjectHandler.getRow(project, rowId);
		let block: CipBlock | null = CipProjectHandler.getBlock(project, blockId);
		if (row === null || block === null) {
			throw Error('No row or block found');
		}

		const currentIndex = block.rows.findIndex((row) => row.id === rowId);
		const itemToMove: CipRow[] = block.rows.splice(currentIndex, 1);
		block.rows.splice(currentIndex + index_gap, 0, itemToMove[0]);
	}

	public static moveBlockUpOrDown(project: CipProject, blockId: number, index_gap: number) {
		const currentIndex = project.blocks.findIndex((block) => block.id === blockId);
		const itemToMove: CipBlock[] = project.blocks.splice(currentIndex, 1);
		project.blocks.splice(currentIndex + index_gap, 0, itemToMove[0]);
	}

	public static importRowsFromJson(project: CipProject, blockId: number, json_rows: string) {

		let block: CipBlock | null = CipProjectHandler.getBlock(project, blockId);

		if (block === null) {
			throw Error('No block found');
		}

		let importedData = JSON.parse(String(json_rows));

		let rows: CipRow[] = [];
		for (let i = 0; i < importedData.length; i++) {
			try {
				rows.push(CipRow.constructFromObject(importedData[i]));
			} catch (e) {
				throw Error('Import error: ' + e);
			}
		}
		for (let i = 0; i < rows.length; i++) {
			CipProjectHandler.addRow(project, blockId, rows[i]);
		}
	}

	public static updatePlotSettings(project: CipProject, plotSettings: PlotSettings) {
		project.plotSettings = plotSettings
	}
}
