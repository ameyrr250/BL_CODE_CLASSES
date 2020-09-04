
/**
 * Custom blocks
 */
//% weight=100 color=#33BEBB icon="↔"
//% advanced=true
namespace IR_Distance{

    //% block=" $clickBoardNum $clickSlot"
    //% blockSetVariable="IR_Distance"
    //% weight=110
    export function createIR_Distance(clickBoardNum: clickBoardID, clickSlot:clickBoardSlot): IR_Distance1 {
        return new IR_Distance1(clickBoardNum, clickSlot);
    }

    export class IR_Distance1 extends bBoard.PinSettings{


    isInitialized : Array<number>;
    private clickBoardNumGlobal:number
    private clickSlotNumGlobal:number
    
    constructor(clickBoardNum: clickBoardID, clickSlot:clickBoardSlot){
        super(clickBoardNum, clickSlot);
        this.clickBoardNumGlobal=clickBoardNum;
        this.clickSlotNumGlobal=clickSlot;
        this.isInitialized  = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    }

   
        initialize()
        {
            this.enable() //Enable the module
            this.isInitialized[this.clickBoardNumGlobal]  = 1

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
        if(this.isInitialized[this.clickBoardNumGlobal] == 0)
        {
            this.initialize()
            
        }
       return 2700-bBoard.analogRead(clickADCPin.AN, this.clickBoardNumGlobal, this.clickSlotNumGlobal)
    
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
            super.setPin(clickIOPin.RST); //Enable the module
          
        
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
            super.clearPin(clickIOPin.RST); //Enable the module
          
        
        }
    }
}