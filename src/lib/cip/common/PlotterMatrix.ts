import { CipProject } from "$lib/cip/models/CipProject"
import { PlotterRow } from "./PlotterRow"


/* PlotterMatrix
    The PlotterMatrix class is responsible for creating a matrix that represents the structure of a plot. It has the following properties:

    project: An instance of the CipProject class, which is used to load and manage the project data.
    HEIGHTS: A static object that defines the heights of different types of rows in the matrix.
    rows: An array of PlotterRow objects, which represent the rows in the matrix.
    pct_per_step: The step height in pct.
    The PlotterMatrix class has the following methods:

    getRows(): Returns the rows array.
    constructor(project_dataload: any): Initializes a new instance of the PlotterMatrix class. It loads the project data, prepares the vertical spaces, and calculates the step height.
    getTotalYSteps(): Calculates the total number of vertical steps needed to display all rows in the matrix.
*/

export class PlotterMatrix {


    project:CipProject;

    min_value:number = 9999999999999
    max_value:number = -9999999999999

    max_weight:number = 0

    rows:PlotterRow[] = []
    

    getMinValue():number{
        return this.min_value
    }
    getMaxValue():number{
        return this.max_value
    }

    public static HEIGHTS ={
        empty: 0.5,
        titles: 1,
        block: 1,
        study: 1,
        grid: 2
    }

    getRows():PlotterRow[] {
        return this.rows
    }    

    // step height in pct
    pct_per_step:number = 0

    /**
     * Initializes a new instance of the PlotterMatrix class.
     *
     * @param {any} project_dataload - The data to load the project from.
     */
    constructor(project_dataload: any){
        this.project =CipProject.constructFromObject(project_dataload)
        
        // Prepare vertical spaces
        this.rows.push( new PlotterRow("titles", "", null) )
        for(let i=0; i<this.project.blocks.length; i++){
            if(this.project.blocks.length>1){
                this.rows.push( new PlotterRow("empty", "", null) )
                this.rows.push(new PlotterRow("block", this.project.blocks[i].name, null))
            }
            for(let k=0; k<this.project.blocks[i].rows.length; k++){
                this.rows.push(new PlotterRow("study", this.project.blocks[i].rows[k].name, this.project.blocks[i].rows[k]))
            }
        }
        this.rows.push( new PlotterRow("grid", "", null) )
        
        this.pct_per_step = 100/this.getTotalYSteps()
        let y_pct:number = 0
        for(let i=0; i<this.rows.length; i++){
            this.rows[i].y_pct = y_pct
            this.rows[i].height_pct = this.pct_per_step * PlotterMatrix.HEIGHTS[this.rows[i].type]
            y_pct += this.rows[i].height_pct
        }
        // Prepare Es calculator
        this.project.getAllRows().forEach(row => {
            if(Number(row.lowerLimit)<this.min_value){
                this.min_value = Number(row.lowerLimit)
            }
            if(Number(row.upperLimit)>this.max_value){
                this.max_value = Number(row.upperLimit)
            }
        })


        // check null value
        if(Number(this.project.projectSettings.nullValue)<this.min_value){
            this.min_value = Number(this.project.projectSettings.nullValue)
        }
        if(Number(this.project.projectSettings.nullValue)>this.max_value){
            this.max_value = Number(this.project.projectSettings.nullValue)
        }


        // Add values margins
        let margin:number = (this.max_value-this.min_value)*0.0

        this.min_value = this.min_value-margin
        this.max_value = this.max_value+margin

        
        // Weights
        this.project.getAllRows().forEach(row => {
                if(!row.isOverall){
                    if(row.weight>this.max_weight){
                        this.max_weight = row.weight
                    }
                }
        })
        

    }



    /**
     * Calculates the total number of vertical steps needed to display all rows in the matrix.
     *
     * @return {number} The total number of vertical steps.
     */
    getTotalYSteps(){
        let ret = 0
        for(let i=0; i<this.rows.length; i++){
            ret += Number(PlotterMatrix.HEIGHTS[this.rows[i].type])
        }
        return ret
    }






}