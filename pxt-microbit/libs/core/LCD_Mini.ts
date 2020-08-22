



enum lineNumber{
  
    //% block="1"
    one = 0,
    //% block="2"
    two,
  

}


enum LCDSettings{
  
  //% block="1"
  one = 1,
  //% block="2"
  two,
  //% block="3"
  three,
  //% block="4"
  four,
  //% block="5"
  five

}


//-------------------------Click Board Blocks Begin -----------------------------------
//% weight=100 color=#D400D4 icon=""
//% advanced=true
namespace LCD_Mini{

    /**
     * Sets LCD object.
     * @param clickBoardNum the clickBoardNum
     *  @param LCDSettings the LCDSettings
     */
    //% block="create lcd settings on clickboard number $clickBoardNum"
    //% blockSetVariable="LCDSettings"
    //% blockId=LCDSettings
    //% weight=110
    export function createLCDSettings(clickBoardNum: clickBoardID): LCDSettings {
        return new LCDSettings(clickBoardNum);
    }

   let PINs = new bBoard.PinSettings();
   let SPIs = new bBoard.SPIsetting();

export class LCDSettings{
        private LOW : number;
        private HIGH : number;
        private LCDInitialize : boolean;
        private CS : number;
        private CS2 : number;
        private RST : number;
        private IODIRB : number;
        private OLATB : number;
        private WRITE_BYTE : number;
        private clickBoardNumGlobal:number;

        constructor(clickBoardNum: clickBoardID){
        if(bBoard.arrayClick.indexOf(clickBoardNum) !== -1){
          console.log("----------------------------------------------------Array "+bBoard.arrayClick[0])
    
        } else{
          bBoard.arrayClick.push(clickBoardNum)
          console.log("----------------------------------------------------Array Not "+bBoard.arrayClick[0])
        }
              
        this.LOW = 0; 
        this.HIGH = 1;
        this.LCDInitialize = false;
        this.CS = clickIOPin.CS;
        this.CS2 = clickIOPin.AN;
        this.RST = clickIOPin.RST;
        this.IODIRB = 0x01;
        this.OLATB = 0x15;
        this.WRITE_BYTE = 0b01000000;
        this.clickBoardNumGlobal = clickBoardNum
        }

        get LOWval() {
            return this.LOW
          }
        set LOWval(value) {
            this.LOW = value
          }

        get HIGHval() {
            return this.HIGH
          }
        set HIGHval(value) {
            this.HIGH = value
          }


        get LCDInitializeval() {
            return this.LCDInitialize
          }
        set LCDInitializeval(value) {
            this.LCDInitialize = value
          }


        get CSval() {
            return this.CS
          }
        set CSval(value) {
            this.CS = value
          }


        get CS2val() {
            return this.CS2
          }
        set CS2val(value) {
            this.CS2 = value
          }


        get RSTval() {
            return this.RST
          }
        set RSTval(value) {
            this.RST = value
          }


       	get IODIRBval() {
            return this.RST
          }
        set IODIRBval(value) {
            this.RST = value
          }


        get OLATBval() {
            return this.OLATB
          }
        set OLATBval(value) {
            this.OLATB = value
          }


        get WRITE_BYTEval() {
            return this.WRITE_BYTE
          }
        set WRITE_BYTEval(value) {
            this.WRITE_BYTE = value
          }

        __delay_us(delayuS: number)
        {
            control.waitMicros(delayuS)

        }

        lcd_sendNibble(nibble: number, RSbit: number, clickBoardNum: clickBoardID){
        let packet = (nibble << 4) | (RSbit << 2);
        this.expander_setOutput(packet, clickBoardNum);
        this.expander_setOutput(packet | (1<<3), clickBoardNum);
        this.__delay_us(1);
        this.expander_setOutput(packet, clickBoardNum);
        this.__delay_us(40);
        }


        lcd_sendByte(byte: number, RSbit:number, clickBoardNum: clickBoardID){
        let nibbleHigh = byte >> 4;
        let nibbleLow = byte & 0xF;
        let packetHigh = (nibbleHigh << 4) | (RSbit << 2);
        let packetLow = (nibbleLow << 4) | (RSbit << 2);
        
        this.expander_setOutput(packetHigh,clickBoardNum);
        this.__delay_us(2);
        this.expander_setOutput(packetHigh | (1<<3),clickBoardNum);
        this.__delay_us(2);
        this.expander_setOutput(packetLow,clickBoardNum)
        this.__delay_us(2);
        this.expander_setOutput(packetLow | (1<<3),clickBoardNum);
        this.__delay_us(40);
        }
    
        lcd_returnHome(clickBoardNum: clickBoardID){
            this.lcd_sendByte(0b10, 0,clickBoardNum);
            basic.pause(2)
           
        }


        lcd_setAddr(row:number, character:number, clickBoardNum: clickBoardID){
        this.lcd_sendByte(0x80 | (character + (row*40)), 0,clickBoardNum);
        }

        lcd_writeChar(character:string, clickBoardNum: clickBoardID){
        this.lcd_sendByte(character.charCodeAt(0),1,clickBoardNum);
        }

        lcd_setContrast(contrast:number, clickBoardNum: clickBoardID){
        this.digipot_setWiper(contrast,clickBoardNum);
        }

        lcd_setup( clickBoardNum: clickBoardID){
        const PinSet = new bBoard.PinSettings;
        PINs.writePin(this.HIGH,this.RST, clickBoardNum);
        PINs.writePin(this.HIGH,this.CS2, clickBoardNum);
        PINs.writePin(this.HIGH,this.CS, clickBoardNum);

        this.expander_setup(clickBoardNum);
        this.expander_setOutput(0,clickBoardNum);
        basic.pause(40)
        this.lcd_sendNibble(0b11, 0,clickBoardNum);
        basic.pause(10)

        this.lcd_sendNibble(0b11,  0,clickBoardNum);
        basic.pause(10)

        this.lcd_sendNibble(0b11,  0,clickBoardNum);
        basic.pause(10)

        this.lcd_sendNibble(0x2, 0,clickBoardNum);
        this.lcd_sendByte(0x2C,  0,clickBoardNum);
        this.lcd_sendByte(0b1100,  0,clickBoardNum);
        this.lcd_sendByte(0x06,  0,clickBoardNum);
        this.lcd_sendByte(0x0C,  0,clickBoardNum);
        basic.pause(2)

        this.lcd_returnHome(clickBoardNum);
        this.lcd_clearDisplay(clickBoardNum);
        }


        expander_sendByte(addr:number, byte:number, clickBoardNum: clickBoardID){
        //spi1_master_open(LCD);
        //  LCDMini_nCS_LAT = 0;
        const SPIObj= new bBoard.SPIsetting;
        let cmd=[this.WRITE_BYTE,addr,byte];
        //bBoard.clearPin(CS,clickBoardNum)
        SPIs.SPIWriteArray(cmd,clickBoardNum)
        //bBoard.setPin(CS,clickBoardNum)
        }

        expander_setup( clickBoardNum: clickBoardID){
        this.expander_sendByte(this.IODIRB, 0,clickBoardNum);
        }

        expander_setOutput(output:number, clickBoardNum: clickBoardID){
        this.expander_sendByte(this.OLATB, output,clickBoardNum);
        }

        digipot_setWiper(val:number, clickBoardNum: clickBoardID){
        let cmd = [0,val];
        const SPIObj= new bBoard.SPIsetting;
        // bBoard.clearPin(CS2,clickBoardNum)
        SPIs.spiCS(this.CS2,clickBoardNum)
        SPIs.SPIWriteArray(cmd,clickBoardNum)
        SPIs.spiCS(this.CS,clickBoardNum)
        //bBoard.setPin(CS2,clickBoardNum)
        }


        /**
         * Writes string value.
         * @param LCDstring the string
         * @param lineNum the lineNum
         * @param clickBoardNum the clickBoardNum
         */
        //% block="$this Write 2 a $LCDstring to line $lineNum"
        //% blockId=LCDWriteString
        //% blockNamespace=LCD_Mini
        //% this.shadow=variables_get
        //% this.defl="LCDSettings"
        //% weight=90 blockGap=12 color=#9E4894 icon=""

        lcd_writeString(LCDstring:string, lineNum: lineNumber){ //, clickBoardNum: clickBoardID) {
            //let LCDstring1=['x','x','x','x','x','x','x','x','x','x','x','x','x','x','x','x','x','x']
            if(this.LCDInitialize == false)
            {
                this.lcd_setup(this.clickBoardNumGlobal);
                this.lcd_setContrast(0x30,this.clickBoardNumGlobal)
                this.LCDInitialize = true; //LCD has been initialized
            }
    
            this.lcd_setAddr(lineNum, 0,this.clickBoardNumGlobal);
            let i = 0;
            for (i = 1; i < 16; i++) {
                if (LCDstring[i]) {
                    this.lcd_writeChar(LCDstring[i],this.clickBoardNumGlobal);
                }
            }
            this.lcd_returnHome(this.clickBoardNumGlobal);
            }

        //% blockId=LCD_Clear
        //% block="Clear $this LCD on click $clickBoardNum"
        //% weight=80
        //% blockGap=7
        //% blockNamespace=LCD_Mini
        //% this.shadow=variables_get
        //% this.defl="LCDSettings"
        lcd_clearDisplay( clickBoardNum: clickBoardID){
            this.lcd_sendByte(1, 0,clickBoardNum);
            basic.pause(2)
            }



    }

    //% fixedInstance
    let D0: LCDSettings;
    //% fixedInstance
    let D1: LCDSettings;



    }



