export type SquareProportionMethod = "Square area" | "Square side"

export class PlotSettings{

    // if the graph is generated once
    generated:boolean = false

    
	plotWidth_px:number=1024;
    leftAndRightMargins_px: number = 30

    headerHeight_px:number=250;
    footerHeight_px:number=250;
    bodyHeight_px:number=600;



    // Header
	title:string = "My plot";
	titlePosition:number = 50;
	titleSize:number = 30;

    // Footer
    footerText: string = "Forest plot created with CIP"
    footerTextSize: number = 10
    footerTextIsCentered: boolean = false

    //Fonts
    fontFamily = "'Courier New', monospace"
    fontSize = 11


    graphSize = 33
    graphPosition = 50
	graphEsSquareSize = 16
    graphEsProportionMethod:SquareProportionMethod= "Square area"
    graphOverallsLines = false


    graphShowGrid=true
    graphShowGridLines = false
    graphGridTicks = ""
    graphGridTicksMaxAmount = 5
    graphGridScale = "Linear"

    //topMargin =15
    // bottomMargin = 4
    // horizontalMargin = 5

	blocks_titles_position = 0


	column_position_name = 0
    column_position_effectSize = 0
    column_position_lowerLimit = 0
    column_position_upperLimit = 0
    column_position_weight = 0
    column_position_variance = 0
    column_position_standardError = 0
    column_position_pValue = 0
    column_position_totalSS = 0
    column_position_sampleSizeGroup1 = 0
    column_position_sampleSizeGroup2 = 0
    column_position_notAssignedSS = 0
    column_position_ncf1 = 0
    column_position_ncf2 = 0
    column_position_ncf3 = 0
    column_position_ncf4 = 0
    column_position_ncf5 = 0
    column_position_scf1 = 0
    column_position_scf2 = 0
    column_position_scf3 = 0
    column_position_scf4 = 0
    column_position_scf5 = 0
    column_position_ci = 0


    public static constructFromObject(object: any): PlotSettings {
        let ret:PlotSettings = new PlotSettings()

        ret.generated = object.generated

        ret.plotWidth_px = object.plotWidth_px
        ret.leftAndRightMargins_px = object.leftAndRightMargins_px
        ret.bodyHeight_px = object.bodyHeight_px
        ret.headerHeight_px = object.headerHeight_px
        ret.footerHeight_px = object.footerHeight_px
        
        ret.title = object.title
        ret.titlePosition = object.titlePosition
        ret.titleSize = object.titleSize

        
        ret.footerText = object.footerText
        ret.footerTextSize = object.footerTextSize

        

        ret.fontFamily = object.fontFamily
        ret.fontSize = object.fontSize

        ret.graphSize = object.graphSize
        ret.graphPosition = object.graphPosition
        ret.graphEsSquareSize = object.graphEsSquareSize
        ret.graphEsProportionMethod = object.graphEsProportionMethod
        ret.graphOverallsLines = object.graphOverallsLines
        ret.graphShowGrid = object.graphShowGrid
        ret.graphShowGridLines = object.graphShowGridLines
        ret.graphGridTicks = object.graphGridTicks
        ret.graphGridTicksMaxAmount = object.graphGridTicksMaxAmount
        ret.graphGridScale = object.graphGridScale

        //ret.topMargin = object.topMargin
        // ret.bottomMargin = object.bottomMargin
        // ret.horizontalMargin = object.horizontalMargin

        ret.blocks_titles_position = object.blocks_titles_position

        ret.column_position_name = object.column_position_name
        ret.column_position_effectSize = object.column_position_effectSize
        ret.column_position_lowerLimit = object.column_position_lowerLimit
        ret.column_position_upperLimit = object.column_position_upperLimit
        ret.column_position_weight = object.column_position_weight
        ret.column_position_variance = object.column_position_variance
        ret.column_position_standardError = object.column_position_standardError
        ret.column_position_pValue = object.column_position_pValue
        ret.column_position_totalSS = object.column_position_totalSS
        ret.column_position_sampleSizeGroup1 = object.column_position_sampleSizeGroup1
        ret.column_position_sampleSizeGroup2 = object.column_position_sampleSizeGroup2
        ret.column_position_notAssignedSS = object.column_position_notAssignedSS
        ret.column_position_ncf1 = object.column_position_ncf1
        ret.column_position_ncf2 = object.column_position_ncf2
        ret.column_position_ncf3 = object.column_position_ncf3
        ret.column_position_ncf4 = object.column_position_ncf4
        ret.column_position_ncf5 = object.column_position_ncf5
        ret.column_position_scf1 = object.column_position_scf1
        ret.column_position_scf2 = object.column_position_scf2
        ret.column_position_scf3 = object.column_position_scf3
        ret.column_position_scf4 = object.column_position_scf4
        ret.column_position_scf5 = object.column_position_scf5
        ret.column_position_ci = object.column_position_ci



        return ret
    }

}