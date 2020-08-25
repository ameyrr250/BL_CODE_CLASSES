
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
    //% block="create Relay settings at $clickBoardNum on slot $clickSlot"
    //% blockSetVariable="Relay"
    //% weight=110
    export function createRelay(clickBoardNum: clickBoardID, clickSlot:clickBoardSlot): Relay {
        return new Relay(clickBoardNum, clickSlot);
    }
    

    export class Relay extends bBoard.PinSettings{

        private clickBoardNumGlobal:number;
        private clickSlotNumGlobal:number;

        constructor(clickBoardNum: clickBoardID, clickSlot:clickBoardSlot){
            super(clickBoardNum, clickSlot)
            this.clickBoardNumGlobal=clickBoardNum
            this.clickSlotNumGlobal = clickSlot
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
                    this.setPin(clickIOPin.PWM);
                break;
    
                case relay.Relay2:
                    this.setPin(clickIOPin.CS);
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
                        this.clearPin(clickIOPin.PWM);
                    break;
        
                    case relay.Relay2:
                        this.clearPin(clickIOPin.CS);
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
                        this.writePin(onOff,clickIOPin.PWM);
                    break;
        
                    case relay.Relay2:
                        this.writePin(onOff,clickIOPin.CS);
                    break;
                }
            
            }

        }
    }