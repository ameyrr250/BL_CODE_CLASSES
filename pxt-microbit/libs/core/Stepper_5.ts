

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


    //% block="create Stepper settings"
    //% blockSetVariable="Stepper"
    //% weight=110
    export function createStepper(): Stepper {
        return new Stepper();
   }


    export class Stepper extends bBoard.PinSettings{

    //% blockId=step
    //% block="$this Single step motor $direction on click$clickBoardNum"
    //% weight=100
    //% blockGap=7
    //% blockNamespace=Stepper_5
    //% this.shadow=variables_get
    //% this.defl="Stepper"
    step(direction:Stepper_5.Rotation,clickBoardNum: clickBoardID): void {
        this.setPin(clickIOPin.PWM,clickBoardNum)
        basic.pause(1)
        this.clearPin(clickIOPin.PWM,clickBoardNum)
    }

    //% blockId=stepNum
    //% block="$this Step motor $numSteps times $direction on click$clickBoardNum"
    //% weight=100
    //% blockGap=7
    //% blockNamespace=Stepper_5
    //% this.shadow=variables_get
    //% this.defl="Stepper"
    stepNumber(numSteps: number, direction:Stepper_5.Rotation,clickBoardNum: clickBoardID): void {
        this.writePin(direction,clickIOPin.RST,clickBoardNum)
        for(let i=0;i<numSteps;i++)
        {
            this.setPin(clickIOPin.PWM,clickBoardNum)
            control.waitMicros(500);
            this.clearPin(clickIOPin.PWM,clickBoardNum)
            control.waitMicros(500);

        }
  
    }
}
}
