
/**
 * Custom blocks
 */
//% weight=100 color=#33BEBB icon="↔"
//% advanced=true
namespace IR_Distance{

     //% block="create IR_Distance settings"
    //% blockSetVariable="IR_Distance"
    //% weight=110
    export function createIR_Distance(): IR_Distance1 {
        return new IR_Distance1();
    }

    export class IR_Distance1 extends bBoard.PinSettings{


    isInitialized : Array<number>;
    
    constructor(){
        super();
        this.isInitialized  = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    }

   
        initialize(clickBoardNum:clickBoardID)
        {
            this.enable(clickBoardNum) //Enable the module
            this.isInitialized[clickBoardNum]  = 1

        }

       //%blockId=IRDistance_getDistance
        //%block="$this Get distance on click$clickBoardNum"
        //% blockGap=7
        //% advanced=false
        //% blockNamespace=IR_Distance
        //% this.shadow=variables_get
        //% this.defl="IR_Distance"
    getDistance(clickBoardNum:clickBoardID):number
    {
        if(this.isInitialized[clickBoardNum] == 0)
        {
            this.initialize(clickBoardNum)
            
        }
       return 2700-bBoard.analogRead(clickADCPin.AN,clickBoardNum)
    
    }

         //%blockId=IRDistance_enable
        //%block="$this Enable device on click$clickBoardNum"
        //% blockGap=7
        //% advanced=true
        //% blockNamespace=IR_Distance
        //% this.shadow=variables_get
        //% this.defl="IR_Distance"
        enable(clickBoardNum:clickBoardID)
        {
            super.setPin(clickIOPin.RST,clickBoardNum); //Enable the module
          
        
        }

        //%blockId=IRDistance_disable
        //%block="$this Disable device on click$clickBoardNum"
        //% blockGap=7
        //% advanced=true
        //% blockNamespace=IR_Distance
        //% this.shadow=variables_get
        //% this.defl="IR_Distance"
        disable(clickBoardNum:clickBoardID)
        {
            super.clearPin(clickIOPin.RST,clickBoardNum); //Enable the module
          
        
        }
    }
}