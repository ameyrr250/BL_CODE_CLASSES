
/**
 * Custom blocks
 */
//% weight=100 color=#33BEBB icon=""
//% advanced=true
namespace Reed{

    enum reed{
        Activated = 1,
        Not_Activated = 0,
    }

    /**
     * Sets Reed Click object.
     * @param clickBoardNum the clickBoardNum
     *  @param Reed the Reed Object
     */
    //% block="create Reed settings on clickBoard $clickBoardNum"
    //% blockSetVariable="Reed"
    //% weight=110
    export function createReed(clickBoardNum: clickBoardID): Reed {
        return new Reed(clickBoardNum);
    }

    export class Reed extends bBoard.PinSettings{

    isInitialized : Array<number>;
    
    private clickBoardNumGlobal:number 
    
    constructor(clickBoardNum: clickBoardID){
        super();
        this.isInitialized  = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        this.clickBoardNumGlobal=clickBoardNum
    }

initialize(clickBoardNum:clickBoardID)
{

    this.isInitialized[clickBoardNum]  = 1
    this.setPullDirection(clickIOPin.CS, IOPullDirection.two, clickBoardNum)
}
    
    
    
    
    
        //%blockId=Reed_isActivated
        //%block="For $this Has reed been activated"
        //% blockGap=7
        //% advanced=false
        //% blockNamespace=Reed
        //% this.shadow=variables_get
        //% this.defl="Reed"
    isActivated():boolean
    {
        if(this.isInitialized[this.clickBoardNumGlobal] == 0)
        {
            this.initialize(this.clickBoardNumGlobal)
            
        }

       if(this.digitalReadPin(clickIOPin.CS,this.clickBoardNumGlobal) == reed.Activated)
       {
        return true
       }
       return false;
    
    }

    }
}