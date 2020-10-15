//% weight=100 color=#F4B820 icon=""
//% advanced=true

namespace Button_G {


    
    export enum Light{
        Off = 0,
        On = 1
    
    }


    


    /**
     * Sets Button G object.
     * @param boardID the boardID
     *  @param Button_G the Button_G Object
     */
    //% block=" $boardID $clickID"
    //% blockSetVariable="Button_G"
    //% weight=110
    export function createButton_G(boardID: BoardID, clickID:ClickID): Button_G {
        return new Button_G(boardID, clickID);
   }


    export class Button_G extends bBoard.PinSettings{
        private boardIDGlobal:number
        private clickIDNumGlobal:number
        private PWMs : bBoard.PWMSettings;
    
        constructor(boardID: BoardID, clickID:ClickID){
            super(boardID, clickID);
            this.boardIDGlobal=boardID;
            this.clickIDNumGlobal=clickID;
            this.PWMs= new bBoard.PWMSettings(boardID, clickID);
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
            this.PWMs.setDuty(clickPWMPin.PWM,PWMValue)
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
