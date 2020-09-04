
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
    //% block=" $clickBoardNum $clickSlot"
    //% blockSetVariable="Reed"
    //% weight=110
    export function createReed(clickBoardNum: clickBoardID, clickSlot:clickBoardSlot): Reed {
        return new Reed(clickBoardNum, clickSlot);
    }

    export class Reed extends bBoard.PinSettings{

    isInitialized : Array<number>;
    
    private clickBoardNumGlobal:number
    private clickSlotNumGlobal:number 
    
    constructor(clickBoardNum: clickBoardID, clickSlot:clickBoardSlot){
        super(clickBoardNum, clickSlot);
        this.isInitialized  = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        this.clickBoardNumGlobal=clickBoardNum;
        this.clickSlotNumGlobal=clickSlot;
    }

initialize()
{

    this.isInitialized[this.clickBoardNumGlobal]  = 1
    this.setPullDirection(clickIOPin.CS, IOPullDirection.two)
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
            this.initialize()
            
        }

       if(this.digitalReadPin(clickIOPin.CS) == reed.Activated)
       {
        return true
       }
       return false;
    
    }

    }
}