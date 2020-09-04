//% weight=100 color=#F4B820 icon=""
//% advanced=true

namespace Button_G {


    
    export enum Light{
        Off = 0,
        On = 1
    
    }


    


    /**
     * Sets Button G object.
     * @param clickBoardNum the clickBoardNum
     *  @param Button_G the Button_G Object
     */
    //% block=" $clickBoardNum $clickSlot"
    //% blockSetVariable="Button_G"
    //% weight=110
    export function createButton_G(clickBoardNum: clickBoardID, clickSlot:clickBoardSlot): Button_G {
        return new Button_G(clickBoardNum, clickSlot);
   }


    export class Button_G extends bBoard.PinSettings{
        private clickBoardNumGlobal:number
        private clickSlotNumGlobal:number
        private PWMs : bBoard.PWMSettings;
    
        constructor(clickBoardNum: clickBoardID, clickSlot:clickBoardSlot){
            super(clickBoardNum, clickSlot);
            this.clickBoardNumGlobal=clickBoardNum;
            this.clickSlotNumGlobal=clickSlot;
            this.PWMs= new bBoard.PWMSettings(clickBoardNum, clickSlot);
        }
    
        //% blockId=ButtonG_SetLight
        //% block="$this Turn button light $onOff"
        //% blockNamespace=Button_G
        //% this.shadow=variables_get
        //% this.defl="Button_G"
    setLight(onOff:Light)
 {
    this.writePin(onOff,clickIOPin.PWM)
 }

    
        //% blockId=ButtonG_SetLight_PWM
        //% block="$this Set button light to $PWMValue brightness"
        //% PWMValue.min=0 PWMValue.max=100
        //% blockNamespace=Button_G
        //% this.shadow=variables_get
        //% this.defl="Button_G" 
        setLightPWM(PWMValue:number)
        {
            this.PWMs.PWMOut(clickPWMPin.PWM,PWMValue)
        }

    
        //% blockId=ButtonG_getSwitch
        //% block="$this Read button state"
        //% blockNamespace=Button_G
        //% this.shadow=variables_get
        //% this.defl="Button_G"
        getSwitch():number
        {
           return this.digitalReadPin(clickIOPin.INT)
        }

    }

}
