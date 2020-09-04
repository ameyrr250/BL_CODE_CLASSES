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
    //% block=" $clickBoardNum $clickSlot"
    //% blockSetVariable="Water_Detect"
    //% weight=110
    export function createStepper(clickBoardNum: clickBoardID, clickSlot:clickBoardSlot): Water_Detect {
        return new Water_Detect(clickBoardNum, clickSlot);
   }

    export class Water_Detect extends bBoard.PinSettings{

    private clickBoardNumGlobal:number
    private clickSlotNumGlobal:number 
    
    constructor(clickBoardNum: clickBoardID, clickSlot:clickBoardSlot){
        super(clickBoardNum, clickSlot);
        this.clickBoardNumGlobal=clickBoardNum
        this.clickSlotNumGlobal=clickSlot
    }

    //% blockId=Water_Detect_isWater
    //% block="$this Is water detected"
    //% weight=100
    //% blockGap=7
    //% blockNamespace=Water_Detect
    //% this.shadow=variables_get
    //% this.defl="Water_Detect"
    isWater(): number {
           if(this.digitalReadPin(clickIOPin.INT) == 1)
           {
               return 1;
           }
           else{
               return 0;
           }
  
    }
  }
}