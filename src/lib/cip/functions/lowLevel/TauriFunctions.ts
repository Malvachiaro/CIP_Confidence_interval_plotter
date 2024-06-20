import { dexie_db_cip } from '$lib/cip/database/Cip_db_dexie';
import { CipProject } from '$lib/cip/models/CipProject';
import { StringCleaner } from '$lib/common/StringCleaner';
import { save, open, confirm, message } from '@tauri-apps/api/dialog';
import { readTextFile, writeBinaryFile, writeTextFile } from '@tauri-apps/api/fs';
import { dirname, documentDir, join } from '@tauri-apps/api/path';
import { getVersion } from '@tauri-apps/api/app';

export class TauriFunctions {

	static fileExtension:string = 'cipplot';

	static async getAppVersion(): Promise<string> {
		return await getVersion();
	}


	static async bootProjectOnCache(project: CipProject): Promise<void> {
		dexie_db_cip.runningProject.clear();
		let tmp_date = Date.now();
		dexie_db_cip.runningProject.add({
			id: 0,
			name: project.name,
			description: project.description,
			saveDate: tmp_date,
			modifyDate: tmp_date,
			data: JSON.stringify(project)
		});
	}

	static async saveProject(cipProject: CipProject, path: string): Promise<void> {
		await writeTextFile(path, JSON.stringify(cipProject));
	}

	static async loadProject(path: string): Promise<CipProject> {
		return CipProject.constructFromObject(JSON.parse(await readTextFile(path)));
	}

	/**
	 * Retrieves the path for a new project using system dialog windows.
	 * If the user cancels the operation, it returns null.
	 *
	 * @param {string} defaultPath - The default path for the new project.
	 * @return {Promise<string | null>} A Promise that resolves to either a string or null.
	 */
	static async getNewProjectPath(
		defaultPathDirecory: string | null,
		projectName: string
	): Promise<string | null> {
		let path = defaultPathDirecory;
		if (path == null || path == '') {
			path = await documentDir();
		}

		path = await join(path, StringCleaner.clean_a_filename(projectName) + '.'+TauriFunctions.fileExtension);

		const filePath = await save({
			defaultPath: path,
			title: 'Save',
			filters: [
				{
					name: 'Plot Files',
					extensions: [TauriFunctions.fileExtension]
				}
			]
		});

		return filePath;
	}

	static async openProjectPath(pathDir: string): Promise<string | null> {
		const selected = await open({
			defaultPath: pathDir,
			multiple: false,
			filters: [
				{
					name: 'Plot files',
					extensions: [TauriFunctions.fileExtension]
				}
			]
		});
		if (selected !== null && !Array.isArray(selected)) {
			return selected as string;
		} else {
			return null;
		}
	}

	static async confirmDelete(msg?: string): Promise<boolean> {
		let message = 'This action cannot be reverted. Are you sure?';
		if (msg != null) {
			message = msg;
		}
		return await confirm(message, {
			title: 'Delete',
			type: 'warning'
		});
	}

	static async downloadSvg(data: string, filePath: string): Promise<void> {
		await writeTextFile(filePath, data);
	}

	static async downloadJpg(svgString: string, filePath: string): Promise<void> {
		const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
		const url = URL.createObjectURL(svgBlob);
		const img = new Image();
		img.onload = async () => {
			const canvas = document.createElement('canvas');
			canvas.width = img.width;
			canvas.height = img.height;
			const ctx = canvas.getContext('2d');
			if (ctx) {
				ctx.drawImage(img, 0, 0);
				canvas.toBlob(
					async (blob) => {
						if (blob) {
							const arrayBuffer = await blob.arrayBuffer();
							const uint8Array = new Uint8Array(arrayBuffer);
							await writeBinaryFile({
								path: `${filePath}`,
								contents: uint8Array
							});
						}
					},
					'image/jpeg',
					1.0
				);
			}
			URL.revokeObjectURL(url);
		};
		img.src = url;
	}

	static async downloadPng(svgString: string, filePath: string): Promise<void> {
		const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
		const url = URL.createObjectURL(svgBlob);
		const img = new Image();
		img.onload = async () => {
			const canvas = document.createElement('canvas');
			canvas.width = img.width;
			canvas.height = img.height;
			const ctx = canvas.getContext('2d');
			if (ctx) {
				ctx.drawImage(img, 0, 0);
				canvas.toBlob(async (blob) => {
					if (blob) {
						const arrayBuffer = await blob.arrayBuffer();
						const uint8Array = new Uint8Array(arrayBuffer);
						await writeBinaryFile({
							path: `${filePath}`,
							contents: uint8Array
						});
					}
				}, 'image/png');
			}
			URL.revokeObjectURL(url);
		};
		img.src = url;
	}

	static async getUserDocumentDir(): Promise<string> {
		return await documentDir();
	}

	static async getPathDir(path: string): Promise<string> {
		return await dirname(path);
	}

	static async checkPathPermission(path: string): Promise<boolean> {
		try {
			await readTextFile(path);
		} catch (error) {
			return false;
		}
		return true;
	}

	static async getSaveFilePath(
		fileTypeLabel: string,
		extension: string,
		fileName: string,
		defaultPath: string | null
	): Promise<string | null> {
		let path = defaultPath;
		if (path == null || path == '') {
			path = await documentDir();
		}
		path = await join(path, StringCleaner.clean_a_filename(fileName) + '.' + extension);
		const filePath = await save({
			defaultPath: path,
			title: 'Save',
			filters: [
				{
					name: fileTypeLabel,
					extensions: [extension]
				}
			]
		});
		return filePath;
	}


	static async downloadAsTextFile(text: string, filePath: string): Promise<void> {
		await writeTextFile(filePath, text);
	}


	static async alert(msg: string): Promise<void> {
		message(msg);
	}
}
