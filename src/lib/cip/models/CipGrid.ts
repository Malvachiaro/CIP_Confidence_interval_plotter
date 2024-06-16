export class CipGrid {
    private static gridIncrementsBase: number[] = [0.0000001,0.0000002, 0.00000025,0.0000005]


    private static testIncrements(min:number, max:number, maxTicksAmount: number, increments:number[]): number {

        
        for(let i=0; i<increments.length; i++){
            if(((max-min)/increments[i]) < maxTicksAmount){
                return increments[i]
            }
        }
        return CipGrid.testIncrements(min, max, maxTicksAmount, increments.map(el => el * 10));
    }



    //TODO C'è un problema, se metto 3 vengono dei numeri se metto 4 vengono sempre 3 numeri ma diversi
    public static getGridlineTicks(min:number, max:number, maxTicksAmount: number, nullValue:number): number[] {
        let increment = CipGrid.testIncrements(min, max, maxTicksAmount, CipGrid.gridIncrementsBase);
        let ticks = [];
        let ticksIterator = nullValue+increment;
        
        while(ticksIterator < max){
            ticks.push(ticksIterator);
            ticksIterator += increment;
        }
        ticksIterator = nullValue-increment;
        while(ticksIterator > min){
            ticks.push(ticksIterator);
            ticksIterator -= increment;
        }
        return ticks
    }


}