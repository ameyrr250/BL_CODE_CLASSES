/**
 * Custom blocks
 */
//% weight=100 color=#33BEBB icon=""
//% advanced=true
namespace Water_Detect {


    /**
     * Sets Water_Detect Click object.
     * @param clickBoardNum the clickBoardNum
     *  @param Water_Detect the Water_Detect Object
     */
    //% block="create Water_Detect settings on clickBoard $clickBoardNum"
    //% blockSetVariable="Water_Detect"
    //% weight=110
    export function createStepper(clickBoardNum: clickBoardID): Water_Detect {
        return new Water_Detect(clickBoardNum);
   }

    export class Water_Detect extends bBoard.PinSettings{

        private clickBoardNumGlobal:number 
    
    constructor(clickBoardNum: clickBoardID){
        super();
        this.clickBoardNumGlobal=clickBoardNum
    }

    //% blockId=Water_Detect_isWater
    //% block="$this Is water detected"
    //% weight=100
    //% blockGap=7
    //% blockNamespace=Water_Detect
    //% this.shadow=variables_get
    //% this.defl="Water_Detect"
    isWater(): number {
           if(this.digitalReadPin(clickIOPin.INT,this.clickBoardNumGlobal) == 1)
           {
               return 1;
           }
           else{
               return 0;
           }
  
    }
  }
}