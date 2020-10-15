
/**
 * Custom blocks
 */
//% weight=100 color=#33BEBB icon="↔"
//% advanced=true
namespace IR_Distance{

    //% block=" $boardID $clickID"
    //% blockSetVariable="IR_Distance"
    //% weight=110
    export function createIR_Distance(boardID: BoardID, clickID:ClickID): IR_Distance1 {
        return new IR_Distance1(boardID, clickID);
    }

    export class IR_Distance1 extends bBoard.PinSettings{


    isInitialized : Array<number>;
    private boardIDGlobal:number
    private clickIDNumGlobal:number
    
    constructor(boardID: BoardID, clickID:ClickID){
        super(boardID, clickID);
        this.boardIDGlobal=boardID;
        this.clickIDNumGlobal=clickID;
        this.isInitialized  = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    }

   
        initialize()
        {
            this.enable() //Enable the module
            this.isInitialized[this.boardIDGlobal]  = 1

        }

        //%blockId=IRDistance_getDistance
        //%block="$this Get distance"
        //% blockGap=7
        //% advanced=false
        //% blockNamespace=IR_Distance
        //% this.shadow=variables_get
        //% this.defl="IR_Distance"
    getDistance():number
    {
        if(this.isInitialized[this.boardIDGlobal] == 0)
        {
            this.initialize()
            
        }
       return 2700-this.analogRead(clickADCPin.AN, this.boardIDGlobal, this.clickIDNumGlobal)
    
    }

        //%blockId=IRDistance_enable
        //%block="$this Enable device"
        //% blockGap=7
        //% advanced=true
        //% blockNamespace=IR_Distance
        //% this.shadow=variables_get
        //% this.defl="IR_Distance"
        enable()
        {
            this.setPin(clickIOPin.RST); //Enable the module
          
        
        }

        //%blockId=IRDistance_disable
        //%block="$this Disable device"
        //% blockGap=7
        //% advanced=true
        //% blockNamespace=IR_Distance
        //% this.shadow=variables_get
        //% this.defl="IR_Distance"
        disable()
        {
            this.clearPin(clickIOPin.RST); //Enable the module
          
        
        }
    }
}