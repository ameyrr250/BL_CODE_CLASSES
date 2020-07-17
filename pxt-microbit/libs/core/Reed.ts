
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

    //% block="create Reed settings"
    //% blockSetVariable="Reed"
    //% weight=110
    export function createReed(): Reed {
        return new Reed();
    }

    export class Reed extends bBoard.PinSettings{

    isInitialized : Array<number>;
    

    constructor(){
        super();
        this.isInitialized  = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    }

initialize(clickBoardNum:clickBoardID)
{

    this.isInitialized[clickBoardNum]  = 1
    this.setPullDirection(clickIOPin.CS, IOPullDirection.two, clickBoardNum)
}
    
    
    
    
    
       //%blockId=Reed_isActivated
        //%block="For $this Has reed been activated on click%clickBoardNum ?"
        //% blockGap=7
        //% advanced=false
        //% blockNamespace=Reed
        //% this.shadow=variables_get
        //% this.defl="Reed"
    isActivated(clickBoardNum:clickBoardID):boolean
    {
        if(this.isInitialized[clickBoardNum] == 0)
        {
            this.initialize(clickBoardNum)
            
        }

       if(this.digitalReadPin(clickIOPin.CS,clickBoardNum) == reed.Activated)
       {
        return true
       }
       return false;
    
    }

    }
}