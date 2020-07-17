
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

    //% block="create Relay settings"
    //% blockSetVariable="Relay"
    //% weight=110
    export function createkeylock(): Relay {
        return new Relay();
    }
    

    export class Relay extends bBoard.PinSettings{
        
        
           //%blockId=Relay_relayOn
            //%block="$this Turn on relay $relayNum on click$clickBoardNum"
            //% blockGap=7
            //% advanced=false
            //% blockNamespace=Relay
            //% this.shadow=variables_get
            //% this.defl="Relay"
        relayOn(relayNum:relay,clickBoardNum:clickBoardID)
        {
            switch(relayNum)
            {
                case relay.Relay1:
                    this.setPin(clickIOPin.PWM,clickBoardNum);
                break;
    
                case relay.Relay2:
                    this.setPin(clickIOPin.CS,clickBoardNum);
                break;
            }
        
        }
    
            //%blockId=Relay_relayOff
            //%block="$this Turn off relay $relayNum on click$clickBoardNum"
            //% blockGap=7
            //% advanced=false
            //% blockNamespace=Relay
            //% this.shadow=variables_get
            //% this.defl="Relay"
            relayOff(relayNum:relay,clickBoardNum:clickBoardID)
            {
                switch(relayNum)
                {
                    case relay.Relay1:
                        this.clearPin(clickIOPin.PWM,clickBoardNum);
                    break;
        
                    case relay.Relay2:
                        this.clearPin(clickIOPin.CS,clickBoardNum);
                    break;
                }
            
            }
    
    
            //%blockId=Relay_relayOnOff
            //%block="$this Turn $onOff relay $relayNum on click$clickBoardNum"
            //% blockGap=7
            //% advanced=false
            //% blockNamespace=Relay
            //% this.shadow=variables_get
            //% this.defl="Relay"
            relayOnOff(onOff: onOff,relayNum:relay,clickBoardNum:clickBoardID)
            {
                switch(relayNum)
                {
                    case relay.Relay1:
                        this.writePin(onOff,clickIOPin.PWM,clickBoardNum);
                    break;
        
                    case relay.Relay2:
                        this.writePin(onOff,clickIOPin.CS,clickBoardNum);
                    break;
                }
            
            }

        }
    }