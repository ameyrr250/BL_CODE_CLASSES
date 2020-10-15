
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
     * @param boardID the boardID
     *  @param Reed the Reed Object
     */
    //% block=" $boardID $clickID"
    //% blockSetVariable="Reed"
    //% weight=110
    export function createReed(boardID: BoardID, clickID:ClickID): Reed {
        return new Reed(boardID, clickID);
    }

    export class Reed extends bBoard.PinSettings{

    isInitialized : Array<number>;
    
    private boardIDGlobal:number
    private clickIDNumGlobal:number 
    
    constructor(boardID: BoardID, clickID:ClickID){
        super(boardID, clickID);
        this.isInitialized  = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        this.boardIDGlobal=boardID;
        this.clickIDNumGlobal=clickID;
    }

initialize()
{

    this.isInitialized[this.boardIDGlobal]  = 1
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
        if(this.isInitialized[this.boardIDGlobal] == 0)
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