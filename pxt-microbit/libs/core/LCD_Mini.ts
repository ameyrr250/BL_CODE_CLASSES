



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
    //% block=" $clickBoardNum $clickSlot"
    //% blockSetVariable="LCDSettings"
    //% blockId=LCDSettings
    //% weight=110
    export function createLCDSettings(clickBoardNum:clickBoardID, clickSlot:clickBoardSlot): LCDSettings {
        return new LCDSettings(clickBoardNum, clickSlot);
    }

   

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
        private clickSlotNumGlobal:number;
        private PINs:bBoard.PinSettings;
        private SPIs:bBoard.SPIsetting;

        constructor(clickBoardNum:clickBoardID, clickSlot:clickBoardSlot){
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
        this.clickSlotNumGlobal = clickSlot
        this.PINs = new bBoard.PinSettings(clickBoardNum, clickSlot);
        this.SPIs = new bBoard.SPIsetting(clickBoardNum, clickSlot);
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

        lcd_sendNibble(nibble: number, RSbit: number){
        let packet = (nibble << 4) | (RSbit << 2);
        this.expander_setOutput(packet);
        this.expander_setOutput(packet | (1<<3));
        this.__delay_us(1);
        this.expander_setOutput(packet);
        this.__delay_us(40);
        }


        lcd_sendByte(byte: number, RSbit:number){
        let nibbleHigh = byte >> 4;
        let nibbleLow = byte & 0xF;
        let packetHigh = (nibbleHigh << 4) | (RSbit << 2);
        let packetLow = (nibbleLow << 4) | (RSbit << 2);
        
        this.expander_setOutput(packetHigh);
        this.__delay_us(2);
        this.expander_setOutput(packetHigh | (1<<3));
        this.__delay_us(2);
        this.expander_setOutput(packetLow)
        this.__delay_us(2);
        this.expander_setOutput(packetLow | (1<<3));
        this.__delay_us(40);
        }
    
        lcd_returnHome(){
            this.lcd_sendByte(0b10, 0);
            basic.pause(2)
           
        }


        lcd_setAddr(row:number, character:number){
        this.lcd_sendByte(0x80 | (character + (row*40)), 0);
        }

        lcd_writeChar(character:string){
        this.lcd_sendByte(character.charCodeAt(0),1);
        }

        lcd_setContrast(contrast:number){
        this.digipot_setWiper(contrast);
        }

        lcd_setup(){
        this.PINs.writePin(this.HIGH,this.RST);
        this.PINs.writePin(this.HIGH,this.CS2);
        this.PINs.writePin(this.HIGH,this.CS);

        this.expander_setup();
        this.expander_setOutput(0);
        basic.pause(40)
        this.lcd_sendNibble(0b11, 0);
        basic.pause(10)

        this.lcd_sendNibble(0b11,  0);
        basic.pause(10)

        this.lcd_sendNibble(0b11,  0);
        basic.pause(10)

        this.lcd_sendNibble(0x2, 0);
        this.lcd_sendByte(0x2C,  0);
        this.lcd_sendByte(0b1100,  0);
        this.lcd_sendByte(0x06,  0);
        this.lcd_sendByte(0x0C,  0);
        basic.pause(2)

        this.lcd_returnHome();
        this.lcd_clearDisplay();
        }


        expander_sendByte(addr:number, byte:number){
        //spi1_master_open(LCD);
        //  LCDMini_nCS_LAT = 0;
        let cmd=[this.WRITE_BYTE,addr,byte];
        //bBoard.clearPin(CS,clickBoardNum)
        this.SPIs.SPIWriteArray(cmd)
        //bBoard.setPin(CS,clickBoardNum)
        }

        expander_setup( ){
        this.expander_sendByte(this.IODIRB, 0);
        }

        expander_setOutput(output:number){
        this.expander_sendByte(this.OLATB, output);
        }

        digipot_setWiper(val:number){
        let cmd = [0,val];
        // bBoard.clearPin(CS2,clickBoardNum)
        this.SPIs.spiCS(this.CS2)
        this.SPIs.SPIWriteArray(cmd)
        this.SPIs.spiCS(this.CS)
        //bBoard.setPin(CS2,clickBoardNum)
        }


        /**
         * Writes string value.
         * @param LCDstring the string
         * @param lineNum the lineNum
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
                this.lcd_setup();
                this.lcd_setContrast(0x30)
                this.LCDInitialize = true; //LCD has been initialized
            }
    
            this.lcd_setAddr(lineNum, 0);
            let i = 0;
            for (i = 1; i < 16; i++) {
                if (LCDstring[i]) {
                    this.lcd_writeChar(LCDstring[i]);
                }
            }
            this.lcd_returnHome();
            }

        //% blockId=LCD_Clear
        //% block="Clear $this LCD"
        //% weight=80
        //% blockGap=7
        //% blockNamespace=LCD_Mini
        //% this.shadow=variables_get
        //% this.defl="LCDSettings"
        lcd_clearDisplay(){
            this.lcd_sendByte(1, 0);
            basic.pause(2)
            }



    }



    }



