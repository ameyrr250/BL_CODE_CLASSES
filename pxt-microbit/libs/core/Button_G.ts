//% weight=100 color=#F4B820 icon=""
//% advanced=true

namespace Button_G {


    
    export enum Light{
        Off = 0,
        On = 1
    
    }


    let PWMs= new bBoard.PWMSettings();


    /**
     * Sets Button G object.
     * @param clickBoardNum the clickBoardNum
     *  @param Button_G the Button_G Object
     */
    //% block="create Button_G settings on clickBoard $clickBoardNum"
    //% blockSetVariable="Button_G"
    //% weight=110
    export function createButton_G(clickBoardNum: clickBoardID): Button_G {
        return new Button_G(clickBoardNum);
   }


    export class Button_G extends bBoard.PinSettings{
        private clickBoardNumGlobal:number 
    
        constructor(clickBoardNum: clickBoardID){
            super();
            this.clickBoardNumGlobal=clickBoardNum
        }
    
        //% blockId=ButtonG_SetLight
        //% block="$this Turn button light $onOff"
        //% blockNamespace=Button_G
        //% this.shadow=variables_get
        //% this.defl="Button_G"
    setLight(onOff:Light)
 {
    this.writePin(onOff,clickIOPin.PWM,this.clickBoardNumGlobal)
 }

    
        //% blockId=ButtonG_SetLight_PWM
        //% block="$this Set button light to $PWMValue brightness"
        //% PWMValue.min=0 PWMValue.max=100
        //% blockNamespace=Button_G
        //% this.shadow=variables_get
        //% this.defl="Button_G" 
        setLightPWM(PWMValue:number)
        {
            PWMs.PWMOut(clickPWMPin.PWM,PWMValue,this.clickBoardNumGlobal)
        }

    
        //% blockId=ButtonG_getSwitch
        //% block="$this Read button state"
        //% blockNamespace=Button_G
        //% this.shadow=variables_get
        //% this.defl="Button_G"
        getSwitch(clickBoardNum:clickBoardID):number
        {
           return this.digitalReadPin(clickIOPin.INT,this.clickBoardNumGlobal)
        }

    }

}
