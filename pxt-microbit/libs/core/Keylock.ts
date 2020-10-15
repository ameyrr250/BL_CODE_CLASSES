//% weight=100 color=#F4B820 icon=""
//% advanced=true

namespace Keylock {


    
    export enum MotorDirection {
        //% block="Forward"
        Forward,
        //% block="Reverse"
        Reverse
    }

    //% block=" $boardID $clickID"
    //% blockSetVariable="keylock"
    //% weight=110
    export function createkeylock(boardID: BoardID, clickID:ClickID): keylock {
        return new keylock(boardID, clickID);
    }
    
    
    
      export class keylock extends bBoard.PinSettings{
        private boardIDGlobal:number
        private clickIDNumGlobal:number
    
    
        constructor(boardID: BoardID, clickID:ClickID){
            super(boardID, clickID);
            this.boardIDGlobal=boardID;
            this.clickIDNumGlobal=clickID;
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