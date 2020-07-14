//% weight=100 color=#F4B820 icon=""
//% advanced=true

namespace Keylock {


    
    export enum MotorDirection {
        //% block="Forward"
        Forward,
        //% block="Reverse"
        Reverse
    }

    //% block="create keylock settings"
    //% blockSetVariable="keylock"
    //% weight=110
    export function createkeylock(): keylock {
        return new keylock();
    }
    
    
    
      export class keylock extends bBoard.PinSettings{
    
    
        constructor(){
            super();
        }

        
        //% blockId=Keylock_getLockPosition
        //% block="$this Get lock position on click$clickBoardNum"
        //% weight=60 color=#0fbc11
        //% blockNamespace=Keylock
        //% this.shadow=variables_get
        //% this.defl="keylock"
        getLockPosition(clickBoardNum: clickBoardID): number {
            
          
       
            if(this.digitalReadPin(clickIOPin.AN,clickBoardNum) ==1)
            {
                return 1;
            }

                   
            if( this.digitalReadPin(clickIOPin.PWM,clickBoardNum) ==1)
            {
                return 2;
            }

            if( this.digitalReadPin(clickIOPin.INT,clickBoardNum) ==1)
            {
                return 3;
            }

        return 0;

           
        }

      }

    }