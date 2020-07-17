//% weight=100 color=#F4B820 icon=""
//% advanced=true

namespace Button_G {


    
    export enum Light{
        Off = 0,
        On = 1
    
    }


    let PWMs= new bBoard.PWMSettings();

    //% block="create Button_G settings"
    //% blockSetVariable="Button_G"
    //% weight=110
    export function createButton_G(): Button_G {
        return new Button_G();
   }


    export class Button_G extends bBoard.PinSettings{
    
        constructor(){
            super();
        }
    
        //% blockId=ButtonG_SetLight
        //% block="$this Turn button light $onOff on click$clickBoardNum"
        //% blockNamespace=Button_G
        //% this.shadow=variables_get
        //% this.defl="Button_G"
    setLight(onOff:Light,clickBoardNum:clickBoardID)
 {
    this.writePin(onOff,clickIOPin.PWM,clickBoardNum)
 }

    
        //% blockId=ButtonG_SetLight_PWM
        //% block="$this Set button light to $PWMValue brightness on click$clickBoardNum"
        //% PWMValue.min=0 PWMValue.max=100
        //% blockNamespace=Button_G
        //% this.shadow=variables_get
        //% this.defl="Button_G" 
        setLightPWM(PWMValue:number,clickBoardNum:clickBoardID)
        {
            PWMs.PWMOut(clickPWMPin.PWM,PWMValue,clickBoardNum)
        }

    
        //% blockId=ButtonG_getSwitch
        //% block="$this Read button state on click$clickBoardNum"
        //% blockNamespace=Button_G
        //% this.shadow=variables_get
        //% this.defl="Button_G"
        getSwitch(clickBoardNum:clickBoardID):number
        {
           return this.digitalReadPin(clickIOPin.INT,clickBoardNum)
        }

    }

}
