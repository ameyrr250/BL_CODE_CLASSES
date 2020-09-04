//% weight=100 color=#F4B820 icon=""
//% advanced=true

namespace Keylock {


    
    export enum MotorDirection {
        //% block="Forward"
        Forward,
        //% block="Reverse"
        Reverse
    }

    //% block=" $clickBoardNum $clickSlot"
    //% blockSetVariable="keylock"
    //% weight=110
    export function createkeylock(clickBoardNum: clickBoardID, clickSlot:clickBoardSlot): keylock {
        return new keylock(clickBoardNum, clickSlot);
    }
    
    
    
      export class keylock extends bBoard.PinSettings{
        private clickBoardNumGlobal:number
        private clickSlotNumGlobal:number
    
    
        constructor(clickBoardNum: clickBoardID, clickSlot:clickBoardSlot){
            super(clickBoardNum, clickSlot);
            this.clickBoardNumGlobal=clickBoardNum;
            this.clickSlotNumGlobal=clickSlot;
        }

        
        //% blockId=Keylock_getLockPosition
        //% block="$this Get lock position"
        //% weight=60 color=#0fbc11
        //% blockNamespace=Keylock
        //% this.shadow=variables_get
        //% this.defl="keylock"
        getLockPosition(): number {
            
          
       
            if(this.digitalReadPin(clickIOPin.AN) ==1)
            {
                return 1;
            }

                   
            if( this.digitalReadPin(clickIOPin.PWM) ==1)
            {
                return 2;
            }

            if( this.digitalReadPin(clickIOPin.INT) ==1)
            {
                return 3;
            }

        return 0;

           
        }

      }

    }