/**
 * Custom blocks
 */
//% weight=100 color=#33BEBB icon=""
//% advanced=true
namespace Water_Detect {

    //% block="create Water_Detect settings"
    //% blockSetVariable="Water_Detect"
    //% weight=110
    export function createStepper(): Water_Detect {
        return new Water_Detect();
   }

    export class Water_Detect extends bBoard.PinSettings{
    //% blockId=Water_Detect_isWater
    //% block="$this Is water detected on click$clickBoardNum ?"
    //% weight=100
    //% blockGap=7
    //% blockNamespace=Water_Detect
    //% this.shadow=variables_get
    //% this.defl="Water_Detect"
    isWater(clickBoardNum: clickBoardID): number {
           if(this.digitalReadPin(clickIOPin.INT,clickBoardNum) == 1)
           {
               return 1;
           }
           else{
               return 0;
           }
  
    }
  }
}