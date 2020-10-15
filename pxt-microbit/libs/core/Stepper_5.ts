

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


    //% block=" $boardID $clickID" 
    //% blockSetVariable="Stepper"
    //% weight=110
    export function createStepper(boardID:BoardID, clickID:ClickID): Stepper {
        return new Stepper(boardID, clickID);
   }


    export class Stepper extends bBoard.PinSettings{

        private boardIDGlobal:number
        private clickIDNumGlobal:number
    
        constructor(boardID:BoardID, clickID:ClickID){
            super(boardID, clickID);
            this.boardIDGlobal=boardID;
            this.clickIDNumGlobal=clickID;
        }

    //% blockId=step
    //% block="$this Single step motor $direction on click$boardID"
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
    //% block="$this Step motor $numSteps times $direction on click$boardID"
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
