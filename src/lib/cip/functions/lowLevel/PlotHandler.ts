import { PlotterMatrix } from "$lib/cip/common/PlotterMatrix"
import { CipGrid } from "$lib/cip/models/CipGrid"
import type { CipProject } from "$lib/cip/models/CipProject"

export class CipPlotHandler {


    static plotAutofitBootstrap(project:CipProject) {
        let plotterMatrix:PlotterMatrix = new PlotterMatrix(project)
        project.plotSettings.title = project.name
        CipPlotHandler.graphAutoFitSizes(project)
        CipPlotHandler.graphAutoFitTableAndPlot(project, plotterMatrix)
        CipPlotHandler.graphAutoGraphSquareAndGrid(project, plotterMatrix)
        project.plotSettings.generated = true        

    }

    static plotAutofit(project:CipProject) {
        let plotterMatrix:PlotterMatrix = new PlotterMatrix(project)
        CipPlotHandler.graphAutoFitTableAndPlot(project, plotterMatrix)
    }


    static graphAutoFitSizes(project:CipProject) {
        project.plotSettings.blocks_titles_position = 0
        project.plotSettings.headerHeight_px = 100
        
        project.plotSettings.titleSize = 30
        project.plotSettings.titlePosition = 40

        project.plotSettings.footerHeight_px = 70
        project.plotSettings.footerTextSize = 16
    }


        
    static graphAutoFitTableAndPlot(project:CipProject, plotterMatrix:PlotterMatrix) {

        let columns = 0
        for(let i=0; i<project.fieldsSettings.getAllSettings().length; i++){
            if(project.fieldsSettings.getAllSettings()[i].used && project.fieldsSettings.getAllSettings()[i].visible){
                columns++
            }
        }

        switch (columns) {
            case 0:
                project.plotSettings.graphSize = 100
                break;
            case 1:
                project.plotSettings.graphSize = 80
                break;
            case 2:
                project.plotSettings.graphSize = 50
                break;
            case 3:
                project.plotSettings.graphSize = 40
                break;
            case 4:
                project.plotSettings.graphSize = 30
                break;
            default:
                project.plotSettings.graphSize = 25
                break
        }
        project.plotSettings.graphPosition = 100 - project.plotSettings.graphSize
        if(project.fieldsSettings.name.visible && project.fieldsSettings.name.used){
            columns= columns+0.5
        }
        if(project.fieldsSettings.ci.visible && project.fieldsSettings.ci.used){
            columns= columns+0.5
        }

        let percent_for_column =(100-project.plotSettings.graphSize)/columns

        let col_pos=0

        if(project.fieldsSettings.name.visible && project.fieldsSettings.name.used){
            project.plotSettings.column_position_name = Math.round(col_pos)
            col_pos+=percent_for_column*1.5
        }
        if(project.fieldsSettings.effectSize.visible && project.fieldsSettings.effectSize.used){
            project.plotSettings.column_position_effectSize = Math.round(col_pos)
            col_pos+=percent_for_column
        }
        if(project.fieldsSettings.lowerLimit.visible && project.fieldsSettings.lowerLimit.used){
            project.plotSettings.column_position_lowerLimit = Math.round(col_pos)
            col_pos+=percent_for_column
        }
        if(project.fieldsSettings.upperLimit.visible && project.fieldsSettings.upperLimit.used){
            project.plotSettings.column_position_upperLimit = Math.round(col_pos)
            col_pos+=percent_for_column
        }
        if(project.fieldsSettings.ci.visible && project.fieldsSettings.ci.used){
            project.plotSettings.column_position_ci = Math.round(col_pos)
            col_pos+=percent_for_column*1.5
        }
        if(project.fieldsSettings.weight.visible && project.fieldsSettings.weight.used){
            project.plotSettings.column_position_weight = Math.round(col_pos)
            col_pos+=percent_for_column
        }
        if(project.fieldsSettings.variance.visible && project.fieldsSettings.variance.used){
            project.plotSettings.column_position_variance = Math.round(col_pos)
            col_pos+=percent_for_column
        }
        if(project.fieldsSettings.standardError.visible && project.fieldsSettings.standardError.used){
            project.plotSettings.column_position_standardError = Math.round(col_pos)
            col_pos+=percent_for_column
        }
        if(project.fieldsSettings.pValue.visible && project.fieldsSettings.pValue.used){
            project.plotSettings.column_position_pValue = Math.round(col_pos)
            col_pos+=percent_for_column
        }
        if(project.fieldsSettings.totalSS.visible && project.fieldsSettings.totalSS.used){
            project.plotSettings.column_position_totalSS = Math.round(col_pos)
            col_pos+=percent_for_column
        }
        if(project.fieldsSettings.sampleSizeGroup1.visible && project.fieldsSettings.sampleSizeGroup1.used){
            project.plotSettings.column_position_sampleSizeGroup1 = Math.round(col_pos)
            col_pos+=percent_for_column
        }
        if(project.fieldsSettings.sampleSizeGroup2.visible && project.fieldsSettings.sampleSizeGroup2.used){
            project.plotSettings.column_position_sampleSizeGroup2 = Math.round(col_pos)
            col_pos+=percent_for_column
        }
        if(project.fieldsSettings.notAssignedSS.visible && project.fieldsSettings.notAssignedSS.used){
            project.plotSettings.column_position_notAssignedSS = Math.round(col_pos)
            col_pos+=percent_for_column
        }
        if(project.fieldsSettings.ncf1.visible && project.fieldsSettings.ncf1.used){
            project.plotSettings.column_position_ncf1 = Math.round(col_pos)
            col_pos+=percent_for_column
        }
        if(project.fieldsSettings.ncf2.visible && project.fieldsSettings.ncf2.used){
            project.plotSettings.column_position_ncf2 = Math.round(col_pos)
            col_pos+=percent_for_column
        }
        if(project.fieldsSettings.ncf3.visible && project.fieldsSettings.ncf3.used){
            project.plotSettings.column_position_ncf3 = Math.round(col_pos)
            col_pos+=percent_for_column
        }
        if(project.fieldsSettings.ncf4.visible && project.fieldsSettings.ncf4.used){
            project.plotSettings.column_position_ncf4 = Math.round(col_pos)
            col_pos+=percent_for_column
        }
        if(project.fieldsSettings.ncf5.visible && project.fieldsSettings.ncf5.used){
            project.plotSettings.column_position_ncf5 = Math.round(col_pos)
            col_pos+=percent_for_column
        }
        if(project.fieldsSettings.scf1.visible && project.fieldsSettings.scf1.used){
            project.plotSettings.column_position_scf1 = Math.round(col_pos)
            col_pos+=percent_for_column
        }
        if(project.fieldsSettings.scf2.visible && project.fieldsSettings.scf2.used){
            project.plotSettings.column_position_scf2 = Math.round(col_pos)
            col_pos+=percent_for_column
        }
        if(project.fieldsSettings.scf3.visible && project.fieldsSettings.scf3.used){
            project.plotSettings.column_position_scf3 = Math.round(col_pos)
            col_pos+=percent_for_column
        }
        if(project.fieldsSettings.scf4.visible && project.fieldsSettings.scf4.used){
            project.plotSettings.column_position_scf4 = Math.round(col_pos)
            col_pos+=percent_for_column
        }
        if(project.fieldsSettings.scf5.visible && project.fieldsSettings.scf5.used){
            project.plotSettings.column_position_scf5 = Math.round(col_pos)
            col_pos+=percent_for_column
        }
        project.plotSettings.bodyHeight_px = plotterMatrix.rows.length * (project.plotSettings.fontSize * project.plotSettings.plotWidth_px) / 800 * 2
    }
    
    
    
    static graphAutoGraphSquareAndGrid(project:CipProject, plotterMatrix:PlotterMatrix) {
        project.plotSettings.graphEsSquareSize = (project.plotSettings.fontSize * project.plotSettings.plotWidth_px) / 800

        project.plotSettings.graphGridTicks=CipGrid.getGridlineTicks(plotterMatrix.getMinValue(), plotterMatrix.getMaxValue(), project.plotSettings.graphGridTicksMaxAmount, project.projectSettings.nullValue).join(",")
    }


}
