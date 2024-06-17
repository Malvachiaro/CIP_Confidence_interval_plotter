import Dexie, { type EntityTable } from 'dexie';


const DEFAULT_RUNTIME_VARIABLES = new Map<string, string>([
    ["projectDirectory", ""],
    ["projectFilename", ""],
    ["projectFilepath", ""],
	["theme", "nightsky"],
]);



interface RunningProject {
	id: number;
	name: string;
	description: string;
	saveDate: number
	modifyDate: number
	data: string;
}

interface RuntimeVariable {
	name: string;
	value: string;
}

const dexie_db_cip = new Dexie('swp13') as Dexie & {
	runningProject: EntityTable<
    RunningProject,
		'id' 
	>;
	runtimeVariables: EntityTable<
    RuntimeVariable,
		'name' 
	>;
};

// Schema declaration:
dexie_db_cip.version(1).stores({
	runningProject: 'id',
	runtimeVariables: 'name',
});


dexie_db_cip.on('populate', () => {
	DEFAULT_RUNTIME_VARIABLES.forEach((value, key) => {
		dexie_db_cip.runtimeVariables.add({ name: key, value: value });
	});
});


export type { RunningProject};

export { dexie_db_cip };
