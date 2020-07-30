
/**
 * Custom blocks
 */
//% weight=100 color=#66791B  icon=""
//% advanced=true
namespace Relay {

    export enum relay
    {
        Relay1 = 1,
        Relay2 = 2
    }

    export enum onOff
    {
        On = 1,
        Off = 0
    }

    /**
     * Sets Relay Click object.
     * @param clickBoardNum the clickBoardNum
     *  @param Relay the Relay Object
     */
    //% block="create Relay settings on clickBoard $clickBoardNum"
    //% blockSetVariable="Relay"
    //% weight=110
    export function createkeylock(clickBoardNum: clickBoardID): Relay {
        return new Relay(clickBoardNum);
    }
    

    export class Relay extends bBoard.PinSettings{

        private clickBoardNumGlobal:number 
    
        constructor(clickBoardNum: clickBoardID){
            super()
            this.clickBoardNumGlobal=clickBoardNum
        }
        
        
           //%blockId=Relay_relayOn
            //%block="$this Turn on relay $relayNum"
            //% blockGap=7
            //% advanced=false
            //% blockNamespace=Relay
            //% this.shadow=variables_get
            //% this.defl="Relay"
        relayOn(relayNum:relay)
        {
            switch(relayNum)
            {
                case relay.Relay1:
                    this.setPin(clickIOPin.PWM,this.clickBoardNumGlobal);
                break;
    
                case relay.Relay2:
                    this.setPin(clickIOPin.CS,this.clickBoardNumGlobal);
                break;
            }
        
        }
    
            //%blockId=Relay_relayOff
            //%block="$this Turn off relay $relayNum"
            //% blockGap=7
            //% advanced=false
            //% blockNamespace=Relay
            //% this.shadow=variables_get
            //% this.defl="Relay"
            relayOff(relayNum:relay)
            {
                switch(relayNum)
                {
                    case relay.Relay1:
                        this.clearPin(clickIOPin.PWM,this.clickBoardNumGlobal);
                    break;
        
                    case relay.Relay2:
                        this.clearPin(clickIOPin.CS,this.clickBoardNumGlobal);
                    break;
                }
            
            }
    
    
            //%blockId=Relay_relayOnOff
            //%block="$this Turn $onOff relay $relayNum"
            //% blockGap=7
            //% advanced=false
            //% blockNamespace=Relay
            //% this.shadow=variables_get
            //% this.defl="Relay"
            relayOnOff(onOff: onOff,relayNum:relay)
            {
                switch(relayNum)
                {
                    case relay.Relay1:
                        this.writePin(onOff,clickIOPin.PWM,this.clickBoardNumGlobal);
                    break;
        
                    case relay.Relay2:
                        this.writePin(onOff,clickIOPin.CS,this.clickBoardNumGlobal);
                    break;
                }
            
            }

        }
    }