

/**
 * Custom blocks
 */
//% weight=100 color=#EF697B icon=""
//% advanced=true
namespace Stepper_5 {

   export enum Rotation
    {
          
            //% block="Forward"
            Forward = 0,
            //% block="Backwards"
            Backwards = 1
         
    
    }


    //% block=" $clickBoardNum $clickSlot" 
    //% blockSetVariable="Stepper"
    //% weight=110
    export function createStepper(clickBoardNum: clickBoardID, clickSlot:clickBoardSlot): Stepper {
        return new Stepper(clickBoardNum, clickSlot);
   }


    export class Stepper extends bBoard.PinSettings{

        private clickBoardNumGlobal:number
        private clickSlotNumGlobal:number
    
        constructor(clickBoardNum: clickBoardID, clickSlot:clickBoardSlot){
            super(clickBoardNum, clickSlot);
            this.clickBoardNumGlobal=clickBoardNum;
            this.clickSlotNumGlobal=clickSlot;
        }

    //% blockId=step
    //% block="$this Single step motor $direction on click$clickBoardNum"
    //% weight=100
    //% blockGap=7
    //% blockNamespace=Stepper_5
    //% this.shadow=variables_get
    //% this.defl="Stepper"
    step(direction:Stepper_5.Rotation): void {
        this.setPin(clickIOPin.PWM)
        basic.pause(1)
        this.clearPin(clickIOPin.PWM)
    }

    //% blockId=stepNum
    //% block="$this Step motor $numSteps times $direction on click$clickBoardNum"
    //% weight=100
    //% blockGap=7
    //% blockNamespace=Stepper_5
    //% this.shadow=variables_get
    //% this.defl="Stepper"
    stepNumber(numSteps: number, direction:Stepper_5.Rotation): void {
        this.writePin(direction,clickIOPin.RST)
        for(let i=0;i<numSteps;i++)
        {
            this.setPin(clickIOPin.PWM)
            control.waitMicros(500);
            this.clearPin(clickIOPin.PWM)
            control.waitMicros(500);

        }
  
    }
}
}
