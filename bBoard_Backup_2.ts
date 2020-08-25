



// Configuring command messages...


const enum clickBoardID{

    //% block="b.Board"
    zero = 0,
    //% block="Expansion 1"
    one = 1,
    //% block="Expansion 2"
    two,
    //% block="Expansion 3"
    three,
    //% block="Expansion 4"
    four,
    //% block="Expansion 5"
    five,
    //% block="Expansion 6"
    six,
    //% block="Expansion 7"
    seven,
    //% block="Expansion 8"
    eight,
        //% block="Expansion 9"
        nine, 
        //% block="Expansion 10"
        ten,
        //% block="Expansion 11"
        eleven,
        //% block="Expansion 12"
        twelve,
        //% block="Expansion 13"
        thirteen,
        //% block="Expansion 14"
        fourteen,
        //% block="Expansion 15"
        fifteen,
        //% block="Expansion 16"
        sixteen,
        //% block="Expansion 17"
    seventeen,
    //% block="Expansion 18"
    eighteen,
        //% block="Expansion 19"
        nineteen, 
        //% block="Expansion 20"
        Twenty

}


const enum clickBoardSlot{

    //% block="A"
    A = 100,

    //% block="B"
    B=200

}
// function checkifexists(): number{
//     let retval=25;
//     for (var _i = 2; _i < 24; _i++) {
//         if(bBoard.arrayClick.indexOf(_i) !== -1){
//             retval= 25;
//         }
//         else{
//             retval= _i;
//         }
//     }
//     console.log("RetVal "+retval)
//     return retval;
// }

enum clickIOPin {

AN = 0x0001,
RST = 0x0002,
CS = 0x0004,
SCK = 0x0008,
MISO = 0x0010,
MOSI = 0x0020,
SDA = 0x0400,
SCL = 0x0800,
TX = 0x1000,
RX = 0x2000,
INT = 0x4000,
PWM = 0x8000


}
enum IOPullDirection
{
  
    //% block="Pull Up"
    one = 1,
    //% block="Pull Down"
    two = 2,
    //% block="None"
    three = 3

}
enum ODCEnable
{
  
    //% block="Disable Open Drain"
    zero = 0,
    //% block="Enable Open Drain"
    one = 1,
 

}
enum clickADCPin {
AN = 0x0001,
RST = 0x0002,
PWM = 0x8000

}
enum SPIMode {

Mode0 = 0,
Mode1 = 1,
Mode2 = 2,
Mode3 = 3

}


enum clickPWMPin {
AN = 0x0001,
RST = 0x0002,
PWM = 0x8000,
INT = 0x4000
}

enum clickIODirection {

input = 3,
output = 2

}

/**
 * Custom clickBoard
 */
//% weight=100 color=#9E4894 icon=""
//% advanced=true



//-------------------------Click Board Blocks Begin -----------------------------------
//% weight=100 color=#9E4894 icon=""
namespace bBoard {
    export let arrayClick: clickBoardID[]=[]

 //   export let arrayClickList: clickBoardID[]=[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

       //% block="create IO settings"
    //% blockSetVariable="IOSettings"
    //% group="IO"
    //% weight=110
    export function createIOSettings(): IOSettings {
        return new IOSettings();
   }

      //% block="create PWM settings"
    //% blockSetVariable="PWMSettings"
    //% group="PWM"
    //% weight=110
    export function createPWMSettings(): PWMSettings {
        return new PWMSettings();
   }

      //% block="create UART settings"
    //% blockSetVariable="UARTSettings"
    //% group="UART"
    //% weight=110
    export function createUARTSettings(): UARTSettings {
        return new UARTSettings();
   }

    //% block="create I2C settings"
    //% blockSetVariable="I2CSettings"
    //% group="I2C"
    //% weight=110
    export function createI2cSettings(): I2CSettings {
        return new I2CSettings();
   }


    //% block="create SPI settings"
    //% blockSetVariable="SPISettings"
    //% group="SPI"
    //% weight=110
    export function createSPISettings(): SPIsetting {
        return new SPIsetting();
   }

   //% block="create Pin settings"
    //% blockSetVariable="PinSettings"
    //% group="PINs"
    //% weight=110
    export function createPinSettings(): PinSettings {
        return new PinSettings();
   }


    let AnalogValue = 0
    let BBOARD_BASE_ADDRESS = 40;
    let BBOARD_UART_TX_BUFF_SIZE = 128;
    let actionCount = 0
        
    let BBOARD_I2C_ADDRESS = 40

        
    let BBOARD_COMMAND_SW_VERSION = 9

    const enum RX_TX_Settings{

    BBOARD_COMMAND_CLEAR_TX_BUFFER = 1,
    BBOARD_COMMAND_READ_TX_BUFFER_DATA = 2,
    BBOARD_COMMAND_READ_TX_BUFFER_SIZE = 3,
    BBOARD_COMMAND_WRITE_RX_BUFFER_DATA = 4,
    BBOARD_COMMAND_CLEAR_RX_BUFFER = 0,
    BBOARD_COMMAND_EXECUTE_COMMAND = 7

    }

    // 'Clear BBoard tx buffer' command
    let CLEAR_BBOARD_TX_BUFFER = pins.createBuffer(1)
    CLEAR_BBOARD_TX_BUFFER.setNumber(NumberFormat.UInt8LE, 0, RX_TX_Settings.BBOARD_COMMAND_CLEAR_TX_BUFFER)

    // 'Clear BBoard rx buffer' command
    let CLEAR_BBOARD_RX_BUFFER = pins.createBuffer(1)
    CLEAR_BBOARD_RX_BUFFER.setNumber(NumberFormat.UInt8LE, 0, RX_TX_Settings.BBOARD_COMMAND_CLEAR_RX_BUFFER)

    // 'Read BBoard tx buffer size' command
    let READ_TX_BUFFER_SIZE = pins.createBuffer(1)
    READ_TX_BUFFER_SIZE.setNumber(NumberFormat.UInt8LE, 0, RX_TX_Settings.BBOARD_COMMAND_READ_TX_BUFFER_SIZE)

    // 'Execute BBoard command' command
    let EXECUTE_BBOARD_COMMAND = pins.createBuffer(1)
    EXECUTE_BBOARD_COMMAND.setNumber(NumberFormat.UInt8LE, 0, RX_TX_Settings.BBOARD_COMMAND_EXECUTE_COMMAND)

    // 'Read BBoard TX buffer' command
    let READ_BBOARD_TX_BUFFER = pins.createBuffer(1)
    READ_BBOARD_TX_BUFFER.setNumber(NumberFormat.UInt8LE, 0, RX_TX_Settings.BBOARD_COMMAND_READ_TX_BUFFER_DATA)





// Module Ids
let GPIO_module_id = 1
let UART_module_id = 2
let I2C_module_id = 4
let SPI_module_id = 5
let PWM_module_id = 8
let ADC_module_id = 9
let STATUS_module_id = 0x10

// STATUS Ids
let Knock_Knock_id = 1
let FIRMWARE_VERSION_id = 2


// PWM Function Ids
let PWM_VAL_id = 1
let PWM_PR_id = 2
let PWM_channel_id
let PWM_dutyCycle



// ADC Function Ids
let ADC_READ_id = 16


    
    export class IOSettings{
            
        // GPIO Function Ids
        protected DIRSET_id : number
        protected DIRCLR_id : number
        public GPIO_id : number
        public SET_id : number
        public CLR_id : number
        protected TOGGLE_id : number
        protected GPIOPULLENSET_id : number
        protected ODC_id : number

        constructor(){
        this.DIRSET_id = 2
        this.DIRCLR_id = 3
        this.GPIO_id = 4
        this.SET_id = 5
        this.CLR_id = 6
        this.TOGGLE_id = 7
        this.GPIOPULLENSET_id = 0x0B
        this.ODC_id = 0x0D
        }

        //%blockId=set_IO_direction
        //%block="$this Set $clickPin to $direction at $clickBoardNum on slot $clickSlot"
        //% blockGap=7
        //% weight=90   color=#9E4894 icon=""
        //% advanced=false
        //% blockNamespace=bBoard
        //% this.shadow=variables_get
        //% this.defl="IOSettings"
        //% group="IO"
        setIODirection(clickPin: clickIOPin,direction: clickIODirection,clickBoardNum: clickBoardID, clickSlot:clickBoardSlot ){
            createIOSettings();
            clickBoardNum=clickBoardNum+clickSlot;
            let GPIO_CONFIG_OUTPUT_PINS = pins.createBuffer(8)
            GPIO_CONFIG_OUTPUT_PINS.setNumber(NumberFormat.UInt8LE, 0, RX_TX_Settings.BBOARD_COMMAND_WRITE_RX_BUFFER_DATA)
            GPIO_CONFIG_OUTPUT_PINS.setNumber(NumberFormat.UInt8LE, 1, clickBoardNum)
            GPIO_CONFIG_OUTPUT_PINS.setNumber(NumberFormat.UInt8LE, 2, GPIO_module_id)
            if(direction == clickIODirection.output)
            {
                GPIO_CONFIG_OUTPUT_PINS.setNumber(NumberFormat.UInt8LE, 3, this.DIRSET_id)

            }
            else{
                GPIO_CONFIG_OUTPUT_PINS.setNumber(NumberFormat.UInt8LE, 3, this.DIRCLR_id)

            }
            GPIO_CONFIG_OUTPUT_PINS.setNumber(NumberFormat.UInt8LE, 4, clickPin & 0x00FF)
            GPIO_CONFIG_OUTPUT_PINS.setNumber(NumberFormat.UInt8LE, 5, (clickPin & 0xFF00)>>8)
            GPIO_CONFIG_OUTPUT_PINS.setNumber(NumberFormat.UInt8LE, 6, 0x00)
            GPIO_CONFIG_OUTPUT_PINS.setNumber(NumberFormat.UInt8LE, 7, 0x00)
            

            pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, CLEAR_BBOARD_RX_BUFFER, false)
            pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, GPIO_CONFIG_OUTPUT_PINS, false)
            pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, EXECUTE_BBOARD_COMMAND, false)


        }

        //%blockId=Open_Drain_set
        //%block="for $this $ODC_Enable on $clickPin at $clickBoardNum on slot $clickSlot"
        //% blockGap=7
        //% weight=90   color=#9E4894 icon=""
        //% advanced=false
        //% blockNamespace=bBoard
        //% this.shadow=variables_get
        //% this.defl="IOSettings"
        //% group="IO"
        setOpenDrain(ODC_Enable: ODCEnable,clickPin: clickIOPin,clickBoardNum: clickBoardID, clickSlot:clickBoardSlot ){
            clickBoardNum=clickBoardNum+clickSlot;
            let GPIO_CONFIG_OUTPUT_PINS = pins.createBuffer(7)



            GPIO_CONFIG_OUTPUT_PINS.setNumber(NumberFormat.UInt8LE, 0, RX_TX_Settings.BBOARD_COMMAND_WRITE_RX_BUFFER_DATA)
            GPIO_CONFIG_OUTPUT_PINS.setNumber(NumberFormat.UInt8LE, 1, clickBoardNum)
            GPIO_CONFIG_OUTPUT_PINS.setNumber(NumberFormat.UInt8LE, 2, GPIO_module_id)
        
            GPIO_CONFIG_OUTPUT_PINS.setNumber(NumberFormat.UInt8LE, 3, this.ODC_id)

        
            GPIO_CONFIG_OUTPUT_PINS.setNumber(NumberFormat.UInt8LE, 4, clickPin & 0x00FF)
            GPIO_CONFIG_OUTPUT_PINS.setNumber(NumberFormat.UInt8LE, 5, (clickPin & 0xFF00)>>8)
            GPIO_CONFIG_OUTPUT_PINS.setNumber(NumberFormat.UInt8LE, 6, ODC_Enable)
        
            

            pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, CLEAR_BBOARD_RX_BUFFER, false)
            pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, GPIO_CONFIG_OUTPUT_PINS, false)
            pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, EXECUTE_BBOARD_COMMAND, false)


        }

        //%blockId=GPIO_pull_set
        //%block="$this Set $clickPin to $pullDirection at $clickBoardNum on slot $clickSlot"
        //% blockGap=7
        //% weight=90   color=#9E4894 icon=""
        //% advanced=false
        //% blockNamespace=bBoard
        //% this.shadow=variables_get
        //% this.defl="IOSettings"
        //% group="IO"

        setPullDirection(clickPin: clickIOPin,pullDirection: IOPullDirection,clickBoardNum: clickBoardID, clickSlot:clickBoardSlot ){
            clickBoardNum=clickBoardNum+clickSlot;
            let GPIO_CONFIG_OUTPUT_PINS = pins.createBuffer(7)



            GPIO_CONFIG_OUTPUT_PINS.setNumber(NumberFormat.UInt8LE, 0, RX_TX_Settings.BBOARD_COMMAND_WRITE_RX_BUFFER_DATA)
            GPIO_CONFIG_OUTPUT_PINS.setNumber(NumberFormat.UInt8LE, 1, clickBoardNum)
            GPIO_CONFIG_OUTPUT_PINS.setNumber(NumberFormat.UInt8LE, 2, GPIO_module_id)
        
            GPIO_CONFIG_OUTPUT_PINS.setNumber(NumberFormat.UInt8LE, 3, this.GPIOPULLENSET_id)

        
            GPIO_CONFIG_OUTPUT_PINS.setNumber(NumberFormat.UInt8LE, 4, clickPin & 0x00FF)
            GPIO_CONFIG_OUTPUT_PINS.setNumber(NumberFormat.UInt8LE, 5, (clickPin & 0xFF00)>>8)
            GPIO_CONFIG_OUTPUT_PINS.setNumber(NumberFormat.UInt8LE, 6, pullDirection)
        
            

            pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, CLEAR_BBOARD_RX_BUFFER, false)
            pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, GPIO_CONFIG_OUTPUT_PINS, false)
            pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, EXECUTE_BBOARD_COMMAND, false)


        }





    }


   

    
    export class PWMSettings{
        pitchPin : number;
        pitchClick : number;
        pitchSlot : number;

        constructor(){
        this.pitchPin = clickPWMPin.PWM; 
        this.pitchClick = clickBoardID.zero;
        this.pitchSlot = clickBoardSlot.B;
        }

        analogPitch(frequency:number,ms:number)
        {
      
            if (frequency <= 0) {
            
            this.PWMOut(this.pitchPin,0,this.pitchClick, this.pitchSlot);
            } else {
                this.PWMOut(this.pitchPin,70,this.pitchClick, this.pitchSlot);
                this.PWMFrequency(this.pitchPin,frequency*100,this.pitchClick, this.pitchSlot);
            }
    
            if (ms > 0) {
                control.waitMicros(ms*1000)
                
                this.PWMOut(this.pitchPin,0,this.pitchClick, this.pitchSlot);
                // TODO why do we use wait_ms() here? it's a busy wait I think
                basic.pause(5);
            }
        
  
        }

        //%blockId=PWM_scaled
        //%block="Set $this PWM on pin $clickPin to $PWMValue at $clickBoardNum on slot $clickSlot with max = $PWMMax"
        //% blockGap=7
        //% weight=90   color=#9E4894 icon=""
        //% advanced=true
        //% blockNamespace=bBoard
        //% this.shadow=variables_get
        //% this.defl="PWM"
        //% group="PWM"
        PWMScaled( clickPin: clickPWMPin,PWMValue: number,clickBoardNum: clickBoardID, clickSlot:clickBoardSlot,PWMMax:number){
            let dutyCycle = PWMValue/PWMMax;
            this.PWMOut(clickPin,dutyCycle*100,clickBoardNum, clickSlot);
        }

            //%blockId=PWM_out
        //%block="Set $this PWM on pin $clickPin to $PWMValue at $clickBoardNum on slot $clickSlot"
        //% blockGap=7
        //% weight=90   color=#9E4894 icon=""
        //% PWMValue.min=0 PWMValue.max=100 
        //% advanced=false
        //% blockNamespace=bBoard
        //% this.shadow=variables_get
        //% this.defl="PWM"
        //% group="PWM"
        PWMOut( clickPin: clickPWMPin,PWMValue: number,clickBoardNum: clickBoardID, clickSlot:clickBoardSlot){

            let pinNum = 0; 
            let dutyCycle = 0;
            PWMValue = PWMValue/100; 
            dutyCycle = PWMValue * 1000;

            clickBoardNum=clickBoardNum+clickSlot;

            let GPIO_SET_PWM_DUTY = pins.createBuffer(8);
            GPIO_SET_PWM_DUTY.setNumber(NumberFormat.UInt8LE, 0, RX_TX_Settings.BBOARD_COMMAND_WRITE_RX_BUFFER_DATA)
            GPIO_SET_PWM_DUTY.setNumber(NumberFormat.UInt8LE, 1, clickBoardNum)
            GPIO_SET_PWM_DUTY.setNumber(NumberFormat.UInt8LE, 2, PWM_module_id)
            GPIO_SET_PWM_DUTY.setNumber(NumberFormat.UInt8LE, 3, PWM_VAL_id)
            GPIO_SET_PWM_DUTY.setNumber(NumberFormat.UInt8LE, 4, clickPin & 0x00FF)
            GPIO_SET_PWM_DUTY.setNumber(NumberFormat.UInt8LE, 5, (clickPin & 0xFF00)>>8)
            GPIO_SET_PWM_DUTY.setNumber(NumberFormat.UInt8LE, 6, dutyCycle & 0x00FF)
            GPIO_SET_PWM_DUTY.setNumber(NumberFormat.UInt8LE, 7, (dutyCycle & 0xFF00)>>8)


            pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, CLEAR_BBOARD_RX_BUFFER, false)
            pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, GPIO_SET_PWM_DUTY, false)
            pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, EXECUTE_BBOARD_COMMAND, false)
        
    


    
        }

        //%blockId=PWM_frequency
        //%block="Set $this PWM frequency on pin $clickPin to $PWMfreq at $clickBoardNum on slot $clickSlot"
        //% blockGap=7
        //% weight=90   color=#9E4894 icon=""
        //% advanced=false
        //% blockNamespace=bBoard
        //% this.shadow=variables_get
        //% this.defl="PWM"
        //% group="PWM"
        PWMFrequency( clickPin: clickPWMPin,PWMfreq: number,clickBoardNum: clickBoardID, clickSlot:clickBoardSlot){

            let pinNum = 0; 
            clickBoardNum=clickBoardNum+clickSlot;

            let GPIO_SET_PWM_DUTY = pins.createBuffer(8);
            GPIO_SET_PWM_DUTY.setNumber(NumberFormat.UInt8LE, 0, RX_TX_Settings.BBOARD_COMMAND_WRITE_RX_BUFFER_DATA)
            GPIO_SET_PWM_DUTY.setNumber(NumberFormat.UInt8LE, 1, clickBoardNum)
            GPIO_SET_PWM_DUTY.setNumber(NumberFormat.UInt8LE, 2, PWM_module_id)
            GPIO_SET_PWM_DUTY.setNumber(NumberFormat.UInt8LE, 3, PWM_PR_id)
            GPIO_SET_PWM_DUTY.setNumber(NumberFormat.UInt8LE, 4, clickPin & 0x00FF)
            GPIO_SET_PWM_DUTY.setNumber(NumberFormat.UInt8LE, 5, (clickPin & 0xFF00)>>8)
            GPIO_SET_PWM_DUTY.setNumber(NumberFormat.UInt8LE, 6, PWMfreq & 0x00FF)
            GPIO_SET_PWM_DUTY.setNumber(NumberFormat.UInt8LE, 7, (PWMfreq & 0xFF00)>>8)


            pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, CLEAR_BBOARD_RX_BUFFER, false)
            pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, GPIO_SET_PWM_DUTY, false)
            pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, EXECUTE_BBOARD_COMMAND, false)
        
    


    
        }

        


    }

    /// End of PWM settings




        /// End of PWM functions

    ///Start of Class UARTSettings
    export class UARTSettings{
        //UART Function ids
        protected UART_STATUS : number
        protected UART_INTEN  : number
        protected UART_INTENCLR : number
        public UART_BAUD_id  : number
        protected UART_WRITE_TX_DATA : number
        protected UART_READ_RX_DATA : number
        public UART_READ_RX_DATA_BYTES : number
        protected UART_CLEAR_RX_DATA : number

        constructor(){
        this.UART_STATUS = 0
        this.UART_INTEN =  2
        this.UART_INTENCLR = 3
        this.UART_BAUD_id = 4
        this.UART_WRITE_TX_DATA = 5
        this.UART_READ_RX_DATA = 6
        this.UART_READ_RX_DATA_BYTES = 7
        this.UART_CLEAR_RX_DATA = 8

        }

       getUARTDataSize(clickBoardNum: clickBoardID, clickSlot:clickBoardSlot):number{
    
    
        let UARTSizeBuf = pins.createBuffer(4)
    
        let UART_TX_SIZE = 0
        let UART_RX_SIZE = 0
        clickBoardNum=clickBoardNum+clickSlot;

        UARTSizeBuf.setNumber(NumberFormat.UInt8LE, 0, RX_TX_Settings.BBOARD_COMMAND_WRITE_RX_BUFFER_DATA)
        UARTSizeBuf.setNumber(NumberFormat.UInt8LE, 1, clickBoardNum)
        UARTSizeBuf.setNumber(NumberFormat.UInt8LE, 2, UART_module_id)
        UARTSizeBuf.setNumber(NumberFormat.UInt8LE, 3, this.UART_STATUS )

          // Ask the click board to send the number of the bytes in the UART Buffers to the bBoard
          pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, CLEAR_BBOARD_TX_BUFFER, false)
          pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, CLEAR_BBOARD_RX_BUFFER, false)
          pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, UARTSizeBuf, false)
          pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, EXECUTE_BBOARD_COMMAND, false)
     
        // I then read the message sent back and build it into the RX and TX size
        pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, CLEAR_BBOARD_RX_BUFFER, false)
        control.waitMicros(500)
        pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, READ_BBOARD_TX_BUFFER, false)
        let TX_BUFFER_DATAbuf = pins.i2cReadBuffer(BBOARD_I2C_ADDRESS, 4, false)
        UART_RX_SIZE = TX_BUFFER_DATAbuf.getUint8(0) + TX_BUFFER_DATAbuf.getUint8(1) * 256
        UART_TX_SIZE = TX_BUFFER_DATAbuf.getUint8(2) + TX_BUFFER_DATAbuf.getUint8(3) * 256

       
       return UART_RX_SIZE;
    }


    clearUARTRxBuffer(clickBoardNum: clickBoardID, clickSlot:clickBoardSlot){

        clickBoardNum=clickBoardNum+clickSlot;
        let UART_CLEARRx_COMMAND = pins.createBuffer(5)
        UART_CLEARRx_COMMAND.setNumber(NumberFormat.UInt8LE, 0, RX_TX_Settings.BBOARD_COMMAND_WRITE_RX_BUFFER_DATA)
        UART_CLEARRx_COMMAND.setNumber(NumberFormat.UInt8LE, 1, clickBoardNum)
        UART_CLEARRx_COMMAND.setNumber(NumberFormat.UInt8LE, 2, UART_module_id)
        UART_CLEARRx_COMMAND.setNumber(NumberFormat.UInt8LE, 3, this.UART_CLEAR_RX_DATA)


            pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, CLEAR_BBOARD_RX_BUFFER, false)
            pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, UART_CLEARRx_COMMAND, false)
            pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, EXECUTE_BBOARD_COMMAND, false)
    }

    //%blockId=is_UART_Data_Avail
    //%block="Is $this UART data available at $clickBoardNum on slot $clickSlot ?"
    //% blockGap=7
    //% weight=90   color=#9E4894 icon=""
    //% advanced=false
    //% blockNamespace=bBoard
    //% this.shadow=variables_get
    //% this.defl="UARTS"
    //% group="UART"

    isUARTDataAvailable(clickBoardNum: clickBoardID, clickSlot:clickBoardSlot):boolean {

      
        if (this.getUARTDataSize(clickBoardNum, clickSlot)) 
        {
            
           return true;
           
        }
     return false;
    }
    
    /**
    * Set the UART frequency
    * @param frequency the clock frequency, eg: 115200
    */
    //% weight=4 advanced=true
    //% blockId=bBoard_UART_frequency block="Set $this the UART frequency %frequency at $clickBoardNum on slot $clickSlot"
    //% blockNamespace=bBoard
    //% this.shadow=variables_get
    //% this.defl="UARTS"
    //% group="UART"
    UARTFrequency(frequency:number,clickBoardNum:clickBoardID, clickSlot:clickBoardSlot) {
        
        // (Note: BRG = Fp / baudrate)
        //(Note: Fp = 40000000)
        clickBoardNum=clickBoardNum+clickSlot;
        let Fp = 40000000; //Frequency of the dspic Peripheral clock
        let brg = Fp/frequency 
        
        let UART_WRITE1_COMMAND = pins.createBuffer(6)
        UART_WRITE1_COMMAND.setNumber(NumberFormat.UInt8LE, 0, RX_TX_Settings.BBOARD_COMMAND_WRITE_RX_BUFFER_DATA)
        UART_WRITE1_COMMAND.setNumber(NumberFormat.UInt8LE, 1, clickBoardNum)
        UART_WRITE1_COMMAND.setNumber(NumberFormat.UInt8LE, 2, UART_module_id)
        UART_WRITE1_COMMAND.setNumber(NumberFormat.UInt8LE, 3, this.UART_BAUD_id)
        UART_WRITE1_COMMAND.setNumber(NumberFormat.UInt8LE, 4, brg & 0x00FF)
        UART_WRITE1_COMMAND.setNumber(NumberFormat.UInt8LE, 5, (brg & 0xFF00)>>8)
        
       
        pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, CLEAR_BBOARD_RX_BUFFER, false)
        pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, UART_WRITE1_COMMAND, false)
        pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, EXECUTE_BBOARD_COMMAND, false)

    }

        //%blockId=send_UART_Buffer
        //%block="$this Send buffer $Buf at $clickBoardNum on slot $clickSlot"
        //% blockGap=7
        //% weight=90   color=#9E4894 icon=""
        //% advanced=false
        //% blockNamespace=bBoard
        //% this.shadow=variables_get
        //% this.defl="UARTS"
        //% group="UART"

        sendBuffer( Buf?: Buffer,clickBoardNum?: clickBoardID, clickSlot?:clickBoardSlot){

    
            clickBoardNum=clickBoardNum+clickSlot;
            let buffLength = Buf.length+4;
    

            let UARTBuf = pins.createBuffer(buffLength);

            

                    UARTBuf.setNumber(NumberFormat.UInt8LE, 0, RX_TX_Settings.BBOARD_COMMAND_WRITE_RX_BUFFER_DATA)
                    UARTBuf.setNumber(NumberFormat.UInt8LE, 1, clickBoardNum)
                    UARTBuf.setNumber(NumberFormat.UInt8LE, 2, UART_module_id)
                    UARTBuf.setNumber(NumberFormat.UInt8LE, 3, 5)

            

                    for(let i=0; i<buffLength-4;i++){
            
                        UARTBuf.setNumber(NumberFormat.UInt8LE, i+4, Buf.getNumber(NumberFormat.UInt8LE,i));
                    
                
                    }
                
                    pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, CLEAR_BBOARD_RX_BUFFER, false)
                    pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, UARTBuf, false)
                    pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, EXECUTE_BBOARD_COMMAND, false)
                }

    

   

    //%blockId=get_UART_Byte
    //%block="Get $this Byte from UART at $clickBoardNum on slot $clickSlot"
    //% blockGap=7
    //% weight=90   color=#9E4894 icon=""
    //% advanced=false
    //% blockNamespace=bBoard
    //% this.shadow=variables_get
    //% this.defl="UARTS"
    //% group="UART"

    getUARTData(clickBoardNum: clickBoardID, clickSlot:clickBoardSlot):string
    {

        let clickBoardNum1=clickBoardNum+clickSlot;
        let UART_Rx_BuffSize  = this.getUARTDataSize(clickBoardNum, clickSlot);
        let TX_BuffSize = 0
       
       
        let UARTDataBuf = pins.createBuffer(6)

        UARTDataBuf.setNumber(NumberFormat.UInt8LE, 0, RX_TX_Settings.BBOARD_COMMAND_WRITE_RX_BUFFER_DATA)
        UARTDataBuf.setNumber(NumberFormat.UInt8LE, 1, clickBoardNum1)
        UARTDataBuf.setNumber(NumberFormat.UInt8LE, 2, UART_module_id)
        UARTDataBuf.setNumber(NumberFormat.UInt8LE, 3, this.UART_READ_RX_DATA_BYTES )
        UARTDataBuf.setNumber(NumberFormat.UInt8LE, 4, UART_Rx_BuffSize & 0x00FF )
        UARTDataBuf.setNumber(NumberFormat.UInt8LE, 5, (UART_Rx_BuffSize & 0xFF00)>>8 )

         // I ask for the UART RX data to be sent to the bboard...
         pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, CLEAR_BBOARD_TX_BUFFER, false)
         pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, CLEAR_BBOARD_RX_BUFFER, false)
         pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, UARTDataBuf, false)
         pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, EXECUTE_BBOARD_COMMAND, false)
        
        // I check to see how many bytes have arrived on the bboard...
      //  pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, CLEAR_BBOARD_RX_BUFFER, false)
      //  pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, READ_TX_BUFFER_SIZE, false)
      //  let TX_BUFFER_SizeBuf = pins.i2cReadBuffer(BBOARD_I2C_ADDRESS, 2, false)
      //  TX_BuffSize = TX_BUFFER_SizeBuf.getUint8(0) + TX_BUFFER_SizeBuf.getUint8(1) * 256 //

        // I retrieve those bytes from the bboard to the microbit
        pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, CLEAR_BBOARD_RX_BUFFER, false)

        control.waitMicros(500)
        pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, READ_BBOARD_TX_BUFFER, false)
        let TX_BUFFER_DATAbuf = pins.i2cReadBuffer(BBOARD_I2C_ADDRESS, UART_Rx_BuffSize, false)

        return TX_BUFFER_DATAbuf.toString();
     }

        //%blockId=send_UART_String
        //%block="$this Send string $UARTString at $clickBoardNum on slot $clickSlot"
        //% blockGap=7
        //% weight=90   color=#9E4894 icon=""
        //% advanced=false
        //% blockNamespace=bBoard
        //% this.shadow=variables_get
        //% this.defl="UARTS"
        //% group="UART"

        sendString( UARTString: string,clickBoardNum: clickBoardID, clickSlot:clickBoardSlot){
            let remainingBytes = UARTString.length
            clickBoardNum=clickBoardNum+clickSlot;
            while( remainingBytes )
            {
                let messageLength = Math.min(remainingBytes+ 4,128);
                let UARTBuf = pins.createBuffer(messageLength);

                UARTBuf.setNumber(NumberFormat.UInt8LE, 0, RX_TX_Settings.BBOARD_COMMAND_WRITE_RX_BUFFER_DATA)
                UARTBuf.setNumber(NumberFormat.UInt8LE, 1, clickBoardNum)
                UARTBuf.setNumber(NumberFormat.UInt8LE, 2, UART_module_id)
                UARTBuf.setNumber(NumberFormat.UInt8LE, 3,  5)

                for(let i=4; i<messageLength;i++)
                {
                        UARTBuf.setNumber(NumberFormat.UInt8LE, i, UARTString.charCodeAt(UARTString.length - remainingBytes + i - 4));
                }

                // Send a message to the UART TX Line to ask for data
                pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, CLEAR_BBOARD_RX_BUFFER, false)
                pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, UARTBuf, false)
                pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, EXECUTE_BBOARD_COMMAND, false)
                remainingBytes =remainingBytes - messageLength + 4;
            }

        }
   
    

    }
    ///END of Class UARTSettings  

     // End of UART functions


    ///Start of PinSettings
    export class PinSettings extends IOSettings{

        constructor(){
            super();
        }

        //%blockId=digital_Read_Pin
        //%block="$this Digital read pin $clickIOPin at $clickBoardNum on slot $clickSlot"
        //% blockGap=7
        //% weight=90   color=#9E4894 icon=""
        //% advanced=false
        //% blockNamespace=bBoard
        //% this.shadow=variables_get
        //% this.defl="PinSettings"
        //% group="PINs"
        digitalReadPin( clickPin: clickIOPin,clickBoardNum: clickBoardID, clickSlot:clickBoardSlot):number
        {
            clickBoardNum=clickBoardNum+clickSlot;
            let pinStatus = 0;
            let READ_CLICKBOARD_DIGITAL_INPUTS = pins.createBuffer(6)
            let TX_BUFFER_DATAbuf = pins.createBuffer(2);
            READ_CLICKBOARD_DIGITAL_INPUTS.setNumber(NumberFormat.UInt8LE, 0, RX_TX_Settings.BBOARD_COMMAND_WRITE_RX_BUFFER_DATA)
            READ_CLICKBOARD_DIGITAL_INPUTS.setNumber(NumberFormat.UInt8LE, 1, clickBoardNum)
            READ_CLICKBOARD_DIGITAL_INPUTS.setNumber(NumberFormat.UInt8LE, 2, GPIO_module_id)
            READ_CLICKBOARD_DIGITAL_INPUTS.setNumber(NumberFormat.UInt8LE, 3, this.GPIO_id)
            READ_CLICKBOARD_DIGITAL_INPUTS.setNumber(NumberFormat.UInt8LE, 4, clickPin & 0x00FF)
            READ_CLICKBOARD_DIGITAL_INPUTS.setNumber(NumberFormat.UInt8LE, 5, (clickPin & 0xFF00)>>8)
        

            // Send a message to read the digital input values
            // specified
            pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, CLEAR_BBOARD_RX_BUFFER, false)
            pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, CLEAR_BBOARD_TX_BUFFER, false)
            pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, READ_CLICKBOARD_DIGITAL_INPUTS, false)
            pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, EXECUTE_BBOARD_COMMAND, false)
    
            
            // I then actually read the data that has been
            // returned by the clickboard
            pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, CLEAR_BBOARD_RX_BUFFER, false)
            control.waitMicros(500)
            pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, READ_BBOARD_TX_BUFFER, false)

            TX_BUFFER_DATAbuf = pins.i2cReadBuffer(BBOARD_I2C_ADDRESS, 2, false);
            pinStatus = (TX_BUFFER_DATAbuf.getUint8(0) + TX_BUFFER_DATAbuf.getUint8(1) * 256) & clickPin;
    
            return pinStatus == 0 ? 0:1
        
        }
    
        //%blockId=write_pin
        //%block="$this Write $value to pin $clickIOPin at $clickBoardNum on slot $clickSlot"
        //% blockGap=7
        //% weight=90   color=#9E4894 icon=""
        //% advanced=false
        //% blockNamespace=bBoard
        //% this.shadow=variables_get
        //% this.defl="PinSettings"
        //% group="PINs"

        writePin(value: number, clickPin: clickIOPin,clickBoardNum: clickBoardID, clickSlot:clickBoardSlot){
            if(value > 0){
                this.setPin(clickPin,clickBoardNum, clickSlot);
            
            }

            else{
                this.clearPin(clickPin,clickBoardNum, clickSlot);
            }
        
    
        }

    

        //%blockId=set_pin
        //%block="$this Set pin $clickPin at $clickBoardNum on slot $clickSlot"
        //% blockGap=7
        //% weight=90   color=#9E4894 icon=""
        //% advanced=false
        //% blockNamespace=bBoard
        //% this.shadow=variables_get
        //% this.defl="PinSettings"
        //% group="PINs"

        setPin(clickPin: clickIOPin,clickBoardNum: clickBoardID, clickSlot:clickBoardSlot){
        
        clickBoardNum=clickBoardNum+clickSlot;
        // 'Set clickboard output pins values HIGH' command
        let GPIO_SET_OUTPUT_PINS_HIGH = pins.createBuffer(8)
        GPIO_SET_OUTPUT_PINS_HIGH.setNumber(NumberFormat.UInt8LE, 0, RX_TX_Settings.BBOARD_COMMAND_WRITE_RX_BUFFER_DATA)
        GPIO_SET_OUTPUT_PINS_HIGH.setNumber(NumberFormat.UInt8LE, 1, clickBoardNum)
        GPIO_SET_OUTPUT_PINS_HIGH.setNumber(NumberFormat.UInt8LE, 2, GPIO_module_id)
        GPIO_SET_OUTPUT_PINS_HIGH.setNumber(NumberFormat.UInt8LE, 3, this.SET_id)
        GPIO_SET_OUTPUT_PINS_HIGH.setNumber(NumberFormat.UInt8LE, 4, clickPin & 0x00FF)
        GPIO_SET_OUTPUT_PINS_HIGH.setNumber(NumberFormat.UInt8LE, 5, (clickPin & 0xFF00)>>8)
        GPIO_SET_OUTPUT_PINS_HIGH.setNumber(NumberFormat.UInt8LE, 6, 0x00)
        GPIO_SET_OUTPUT_PINS_HIGH.setNumber(NumberFormat.UInt8LE, 7, 0x00)

        //setIODirection(clickPin,clickIODirection.output,clickBoardNum); //Done automatically on bBoard
                
        // Send commands
        pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, CLEAR_BBOARD_RX_BUFFER, false)
        pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, GPIO_SET_OUTPUT_PINS_HIGH, false)
        pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, EXECUTE_BBOARD_COMMAND, false)  
        }

        //%blockId=clear_pin
        //%block="$this Clear pin $clickIOPin at $clickBoardNum on slot $clickSlot"
        //% blockGap=7
        //% weight=90   color=#9E4894 icon=""
        //% advanced=false
        //% blockNamespace=bBoard
        //% this.shadow=variables_get
        //% this.defl="PinSettings"
        //% group="PINs"

        clearPin( clickPin: clickIOPin,clickBoardNum: clickBoardID, clickSlot:clickBoardSlot){
        
        // 'Set clickboard output pins values LOW' command

        clickBoardNum=clickBoardNum+clickSlot;
        let GPIO_SET_OUTPUT_PINS_LOW = pins.createBuffer(8)

        GPIO_SET_OUTPUT_PINS_LOW.setNumber(NumberFormat.UInt8LE, 0, RX_TX_Settings.BBOARD_COMMAND_WRITE_RX_BUFFER_DATA)
        GPIO_SET_OUTPUT_PINS_LOW.setNumber(NumberFormat.UInt8LE, 1, clickBoardNum)
        GPIO_SET_OUTPUT_PINS_LOW.setNumber(NumberFormat.UInt8LE, 2, GPIO_module_id)
        GPIO_SET_OUTPUT_PINS_LOW.setNumber(NumberFormat.UInt8LE, 3, this.CLR_id)
        GPIO_SET_OUTPUT_PINS_LOW.setNumber(NumberFormat.UInt8LE, 4, clickPin & 0x00FF)
        GPIO_SET_OUTPUT_PINS_LOW.setNumber(NumberFormat.UInt8LE, 5, (clickPin & 0xFF00)>>8)
        GPIO_SET_OUTPUT_PINS_LOW.setNumber(NumberFormat.UInt8LE, 6, 0x00)
        GPIO_SET_OUTPUT_PINS_LOW.setNumber(NumberFormat.UInt8LE, 7, 0x00)
            
    // setIODirection(clickPin,clickIODirection.output,clickBoardNum); //Done automatically on bBoard
        // Send commands
        pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, CLEAR_BBOARD_RX_BUFFER, false)
        pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, GPIO_SET_OUTPUT_PINS_LOW, false)
        pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, EXECUTE_BBOARD_COMMAND, false)
    
    
        }

       
    }


    ///END of class PinSettings

     

   /// End of pinsettings functions


    //%blockId=getFirmwareVersion
    //%block="Get firmware version at $clickBoardNum on slot $clickSlot"
    //% blockGap=7
    //% weight=90   color=#9E4894 icon=""
    //% advanced=false
    //% group="_____________"
    

    export function getFirmwareVersion(clickBoardNum: clickBoardID, clickSlot:clickBoardSlot): number{

        let analogValue = 0;
        clickBoardNum=clickBoardNum+clickSlot;

        let GET_VERSION_COMMAND = pins.createBuffer(4)
        GET_VERSION_COMMAND.setNumber(NumberFormat.UInt8LE, 0, RX_TX_Settings.BBOARD_COMMAND_WRITE_RX_BUFFER_DATA)
        GET_VERSION_COMMAND.setNumber(NumberFormat.UInt8LE, 1, clickBoardNum)
        GET_VERSION_COMMAND.setNumber(NumberFormat.UInt8LE, 2, STATUS_module_id)
        GET_VERSION_COMMAND.setNumber(NumberFormat.UInt8LE, 3, FIRMWARE_VERSION_id)


        pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, CLEAR_BBOARD_RX_BUFFER, false)
        pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, CLEAR_BBOARD_TX_BUFFER, false)
        pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, GET_VERSION_COMMAND, false)
        pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, EXECUTE_BBOARD_COMMAND, false)
        control.waitMicros(500)
        pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, READ_BBOARD_TX_BUFFER, false)
        let VERSIONBuffer = pins.i2cReadBuffer(BBOARD_I2C_ADDRESS, 2, false)
        
        let versionInt = VERSIONBuffer.getUint8(1);
        let versionDec = VERSIONBuffer.getUint8(0);
        //basic.showNumber(versionInt)
        //basic.showNumber(versionDec)

        return (versionInt + versionDec/100);

    }



    //%blockId=Analog_Read
    //%block="Analog read pin %clickPin at $clickBoardNum on slot $clickSlot"
    //% blockGap=7
    //% weight=90   color=#9E4894 icon=""
    //% advanced=false
    //% group="_____________"

    export function analogRead(clickPin: clickADCPin, clickBoardNum: clickBoardID, clickSlot:clickBoardSlot): number{

        let analogValue = 0;
        clickBoardNum=clickBoardNum+clickSlot;

        let ADC_READ1_COMMAND = pins.createBuffer(6)
        ADC_READ1_COMMAND.setNumber(NumberFormat.UInt8LE, 0, RX_TX_Settings.BBOARD_COMMAND_WRITE_RX_BUFFER_DATA)
        ADC_READ1_COMMAND.setNumber(NumberFormat.UInt8LE, 1, clickBoardNum)
        ADC_READ1_COMMAND.setNumber(NumberFormat.UInt8LE, 2, ADC_module_id)
        ADC_READ1_COMMAND.setNumber(NumberFormat.UInt8LE, 3, ADC_READ_id)
        ADC_READ1_COMMAND.setNumber(NumberFormat.UInt8LE, 4, clickPin & 0x00FF)
        ADC_READ1_COMMAND.setNumber(NumberFormat.UInt8LE, 5, (clickPin & 0xFF00)>>8)


        pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, CLEAR_BBOARD_RX_BUFFER, false)
        pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, CLEAR_BBOARD_TX_BUFFER, false)
        pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, ADC_READ1_COMMAND, false)
        pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, EXECUTE_BBOARD_COMMAND, false)
        control.waitMicros(500)
        pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, READ_BBOARD_TX_BUFFER, false)
        let TX_BUFFER_DATAbuf = pins.i2cReadBuffer(BBOARD_I2C_ADDRESS, 2, false)
        return (TX_BUFFER_DATAbuf.getUint8(0) + TX_BUFFER_DATAbuf.getUint8(1) * 256)


      
    }


    ///START of SPISettings
    export class SPIsetting{
        // SPI Function Ids
        public SPI_WRITE_id : number
        public SPI_READ_id : number
        public SPI_CONFIG_id : number
        public SPI_WRITEBULK_id : number
        protected SPI_WRITEBULK_CS_id : number
        protected  SPI_READBULK_CS_id : number
        public SPI_BAUD_id : number
        public SPI_CONFIG_CS_id : number

        constructor(){
        this.SPI_WRITE_id = 1
        this.SPI_READ_id = 2
        this.SPI_CONFIG_id = 3
        this.SPI_WRITEBULK_id = 4
        this.SPI_WRITEBULK_CS_id = 5
        this. SPI_READBULK_CS_id = 6
        this.SPI_BAUD_id = 7
        this.SPI_CONFIG_CS_id = 8

        }
 
        
    //%blockId=spi_Write
    //%block="$this Write $value to SPI at $clickBoardNum on slot $clickSlot"
    //% blockGap=7
    //% weight=90   color=#9E4894 icon=""
    //% advanced=true
    //% blockNamespace=bBoard
    //% this.shadow=variables_get
    //% this.defl="SPISettings"
    //% group="SPI"

    SPIWrite(value: number, clickBoardNum: clickBoardID, clickSlot:clickBoardSlot){
       
        clickBoardNum=clickBoardNum+clickSlot;
        let SPI_WRITE1_COMMAND = pins.createBuffer(5)
        SPI_WRITE1_COMMAND.setNumber(NumberFormat.UInt8LE, 0, RX_TX_Settings.BBOARD_COMMAND_WRITE_RX_BUFFER_DATA)
        SPI_WRITE1_COMMAND.setNumber(NumberFormat.UInt8LE, 1, clickBoardNum)
        SPI_WRITE1_COMMAND.setNumber(NumberFormat.UInt8LE, 2, SPI_module_id)
        SPI_WRITE1_COMMAND.setNumber(NumberFormat.UInt8LE, 3, this.SPI_WRITE_id)
        SPI_WRITE1_COMMAND.setNumber(NumberFormat.UInt8LE, 4, value)

       
        pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, CLEAR_BBOARD_RX_BUFFER, false)
        pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, SPI_WRITE1_COMMAND, false)
        pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, EXECUTE_BBOARD_COMMAND, false)

  
    }


    //%blockId=spi_Write_array
    //%block="$this Write array $arrayValues to SPI at $clickBoardNum on slot $clickSlot"
    //% blockGap=7
    //% weight=90   color=#9E4894 icon=""
    //% advanced=false
    //% blockNamespace=bBoard
    //% this.shadow=variables_get
    //% this.defl="SPISettings"
    //% group="SPI"

    SPIWriteArray(arrayValues: number[],clickBoardNum: clickBoardID, clickSlot:clickBoardSlot){
        clickBoardNum=clickBoardNum+clickSlot;
        let arrayLength = arrayValues.length
        let SPI_WRITE1_COMMAND = pins.createBuffer(4+arrayLength)
        SPI_WRITE1_COMMAND.setNumber(NumberFormat.UInt8LE, 0, RX_TX_Settings.BBOARD_COMMAND_WRITE_RX_BUFFER_DATA)
        SPI_WRITE1_COMMAND.setNumber(NumberFormat.UInt8LE, 1, clickBoardNum)
        SPI_WRITE1_COMMAND.setNumber(NumberFormat.UInt8LE, 2, SPI_module_id)
        SPI_WRITE1_COMMAND.setNumber(NumberFormat.UInt8LE, 3, this.SPI_WRITEBULK_id)

        
        for(let i=0;i<arrayLength;i++){

            SPI_WRITE1_COMMAND.setNumber(NumberFormat.UInt8LE, i + 4, arrayValues[i])

        }
     

       
        pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, CLEAR_BBOARD_RX_BUFFER, false)
        pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, SPI_WRITE1_COMMAND, false)
        pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, EXECUTE_BBOARD_COMMAND, false)

  
    }
    /**
    * Set the SPI frequency
    * @param frequency the clock frequency, eg: 1000000
    */
    //% help=pins/spi-frequency weight=4 advanced=true
    //% blockId=bBoard_spi_frequency block="Set $this the SPI frequency $frequency at $clickBoardNum on slot $clickSlot"
    //% blockNamespace=bBoard
    //% this.shadow=variables_get
    //% this.defl="SPISettings"
    //% group="SPI"
    spiFrequency(frequency:number,clickBoardNum:clickBoardID, clickSlot:clickBoardSlot) {
        clickBoardNum=clickBoardNum+clickSlot;
        // (Note: BRG = ( Fp / (2 * BaudRate) ) - 1   )
       // (Note: Fp = 40000000)

        let Fp = 40000000; //Frequency of the dspic Peripheral clock
        let brgl = (Fp/(2*frequency))-1 
        
        let SPI_WRITE1_COMMAND = pins.createBuffer(6)
        SPI_WRITE1_COMMAND.setNumber(NumberFormat.UInt8LE, 0, RX_TX_Settings.BBOARD_COMMAND_WRITE_RX_BUFFER_DATA)
        SPI_WRITE1_COMMAND.setNumber(NumberFormat.UInt8LE, 1, clickBoardNum)
        SPI_WRITE1_COMMAND.setNumber(NumberFormat.UInt8LE, 2, SPI_module_id)
        SPI_WRITE1_COMMAND.setNumber(NumberFormat.UInt8LE, 3, this.SPI_BAUD_id)
        SPI_WRITE1_COMMAND.setNumber(NumberFormat.UInt8LE, 4, brgl & 0x00FF)
        SPI_WRITE1_COMMAND.setNumber(NumberFormat.UInt8LE, 5, (brgl & 0xFF00)>>8)
        
        
    
    
 
        
       
        pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, CLEAR_BBOARD_RX_BUFFER, false)
        pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, SPI_WRITE1_COMMAND, false)
        pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, EXECUTE_BBOARD_COMMAND, false)

    }


    //%blockId=spi_Write_buffer
    //%block="$this Write buffer $bufferValues to SPI at $clickBoardNum on slot $clickSlot"
    //% blockGap=7
    //% weight=90   color=#9E4894 icon=""
    //% advanced=false
    //% blockNamespace=bBoard
    //% this.shadow=variables_get
    //% this.defl="SPISettings"
    //% group="SPI"
    SPIWriteBuffer(bufferValues: Buffer, clickBoardNum: clickBoardID, clickSlot:clickBoardSlot){
        clickBoardNum=clickBoardNum+clickSlot;
        let bufferLength = bufferValues.length
        let SPI_WRITE1_COMMAND = pins.createBuffer(4+bufferLength)
        SPI_WRITE1_COMMAND.setNumber(NumberFormat.UInt8LE, 0, RX_TX_Settings.BBOARD_COMMAND_WRITE_RX_BUFFER_DATA)
        SPI_WRITE1_COMMAND.setNumber(NumberFormat.UInt8LE, 1, clickBoardNum)
        SPI_WRITE1_COMMAND.setNumber(NumberFormat.UInt8LE, 2, SPI_module_id)
        SPI_WRITE1_COMMAND.setNumber(NumberFormat.UInt8LE, 3, this.SPI_WRITEBULK_id)
        
        for(let i=0;i<bufferLength;i++){

            SPI_WRITE1_COMMAND.setNumber(NumberFormat.UInt8LE, i + 4, bufferValues.getNumber(NumberFormat.UInt8LE,i))

        }
     
        pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, CLEAR_BBOARD_RX_BUFFER, false)
        pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, SPI_WRITE1_COMMAND, false)
        pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, EXECUTE_BBOARD_COMMAND, false)

  
    }

    //%blockId=spi_Mode_Select
    //%block="Set $this SPI to $mode at $clickBoardNum on slot $clickSlot"
    //% blockGap=7
    //% weight=90   color=#9E4894 icon=""
    //% advanced=false
    //% blockNamespace=bBoard
    //% this.shadow=variables_get
    //% this.defl="SPISettings"
    //% group="SPI"

    SPIModeSelect(mode: SPIMode, clickBoardNum: clickBoardID, clickSlot:clickBoardSlot){
        let SPI_CKE = 1
        let SPI_CKP = 0
        clickBoardNum=clickBoardNum+clickSlot;

       switch(mode)
       {
        case SPIMode.Mode0:
            SPI_CKE = 1
            SPI_CKP = 0
            break;

        case SPIMode.Mode1:
            SPI_CKE = 0
            SPI_CKP = 0
            break;

        case SPIMode.Mode2:
            SPI_CKE = 1
            SPI_CKP = 1
        break;
        case SPIMode.Mode3:
            SPI_CKE = 0
            SPI_CKP = 1
        break;
       }
      


        let SPI_CONFIG_COMMAND = pins.createBuffer(6)
        SPI_CONFIG_COMMAND.setNumber(NumberFormat.UInt8LE, 0, RX_TX_Settings.BBOARD_COMMAND_WRITE_RX_BUFFER_DATA)
        SPI_CONFIG_COMMAND.setNumber(NumberFormat.UInt8LE, 1, clickBoardNum)
        SPI_CONFIG_COMMAND.setNumber(NumberFormat.UInt8LE, 2, SPI_module_id)
        SPI_CONFIG_COMMAND.setNumber(NumberFormat.UInt8LE, 3, this.SPI_CONFIG_id)
        SPI_CONFIG_COMMAND.setNumber(NumberFormat.UInt8LE, 4, SPI_CKE)
        SPI_CONFIG_COMMAND.setNumber(NumberFormat.UInt8LE, 5, SPI_CKP)
        
        
        pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, CLEAR_BBOARD_RX_BUFFER, false)
        pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, SPI_CONFIG_COMMAND, false)
        pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, EXECUTE_BBOARD_COMMAND, false)
  
    }



    //%blockId=spi_Read
    //%block="$this Read $numBytes SPI bytes at $clickBoardNum on slot $clickSlot"
    //% blockGap=7
    //% weight=90   color=#9E4894 icon=""
    //% advanced=false
    //% blockNamespace=bBoard
    //% this.shadow=variables_get
    //% this.defl="SPISettings"
    //% group="SPI"

    SPIread(numBytes: number, clickBoardNum: clickBoardID, clickSlot:clickBoardSlot):number{
        clickBoardNum=clickBoardNum+clickSlot;
        let READ_BBOARD_TX_BUFFER = pins.createBuffer(1)
        READ_BBOARD_TX_BUFFER.setNumber(NumberFormat.UInt8LE, 0, RX_TX_Settings.BBOARD_COMMAND_READ_TX_BUFFER_DATA)

        let SPI_READ1_COMMAND = pins.createBuffer(5)
        SPI_READ1_COMMAND.setNumber(NumberFormat.UInt8LE, 0, RX_TX_Settings.BBOARD_COMMAND_WRITE_RX_BUFFER_DATA)
        SPI_READ1_COMMAND.setNumber(NumberFormat.UInt8LE, 1, clickBoardNum)
        SPI_READ1_COMMAND.setNumber(NumberFormat.UInt8LE, 2, SPI_module_id)
        SPI_READ1_COMMAND.setNumber(NumberFormat.UInt8LE, 3, this.SPI_READ_id)
        SPI_READ1_COMMAND.setNumber(NumberFormat.UInt8LE, 4, numBytes)


            pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, CLEAR_BBOARD_RX_BUFFER, false)
            pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, CLEAR_BBOARD_TX_BUFFER, false)
            pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, SPI_READ1_COMMAND, false)
            pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, EXECUTE_BBOARD_COMMAND, false)
  
            control.waitMicros(500)
            pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, READ_BBOARD_TX_BUFFER, false)
           let  TX_BUFFER_DATAbuf = pins.i2cReadBuffer(BBOARD_I2C_ADDRESS, numBytes, false)
            return TX_BUFFER_DATAbuf.getUint8(0)
      
        }

        /**
        * Set the SPI Chip Select Pin
        */
        //% weight=4 advanced=true
        //% blockId=bBoard_spi_CS block="Set $this the SPI CS Pin to $clickPin at $clickBoardNum on slot $clickSlot"
        //% blockNamespace=bBoard
        //% this.shadow=variables_get
         //% this.defl="SPISettings"
         //% group="SPI"

        spiCS(clickPin: clickIOPin,clickBoardNum:clickBoardID, clickSlot:clickBoardSlot) {
        
    
        clickBoardNum=clickBoardNum+clickSlot;
        let SPI_WRITE1_COMMAND = pins.createBuffer(6)
        SPI_WRITE1_COMMAND.setNumber(NumberFormat.UInt8LE, 0, RX_TX_Settings.BBOARD_COMMAND_WRITE_RX_BUFFER_DATA)
        SPI_WRITE1_COMMAND.setNumber(NumberFormat.UInt8LE, 1, clickBoardNum)
        SPI_WRITE1_COMMAND.setNumber(NumberFormat.UInt8LE, 2, SPI_module_id)
        SPI_WRITE1_COMMAND.setNumber(NumberFormat.UInt8LE, 3, this.SPI_CONFIG_CS_id)
        SPI_WRITE1_COMMAND.setNumber(NumberFormat.UInt8LE, 4, clickPin & 0x00FF)
        SPI_WRITE1_COMMAND.setNumber(NumberFormat.UInt8LE, 5, (clickPin & 0xFF00)>>8)
        
       
        pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, CLEAR_BBOARD_RX_BUFFER, false)
        pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, SPI_WRITE1_COMMAND, false)
        pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, EXECUTE_BBOARD_COMMAND, false)

        }
    


    }



    ///END  of class SPISettings



      //End of SPIsetting functions


    ///START of I2CSettings
    export class I2CSettings{

        // I2C Function Ids
        public I2C_WRITE_id : number
        public I2C_READ_id : number
        public I2C_WRITE_NO_MEM_id : number
        public I2C_READ_NO_MEM_id : number

        constructor(){
            this.I2C_WRITE_id = 1
            this.I2C_READ_id = 2
            this.I2C_WRITE_NO_MEM_id = 3
            this.I2C_READ_NO_MEM_id = 4

        }




    //%blockId=i2c_ReadNoMem
    //% blockGap=7
    //% weight=90   color=#9E4894 icon=""
    //% advanced=false
    //% blockNamespace=bBoard
    //% this.shadow=variables_get
    //% this.defl="I2CSettings"
    //% group="I2C"
    

    I2CreadNoMem(address:number, numBytes: number, clickBoardNum: clickBoardID, clickSlot:clickBoardSlot):Buffer{
        clickBoardNum=clickBoardNum+clickSlot;
        let READ_BBOARD_TX_BUFFER = pins.createBuffer(1)
        let TX_BUFFER_DATAbuf = pins.createBuffer(numBytes);
        READ_BBOARD_TX_BUFFER.setNumber(NumberFormat.UInt8LE, 0, RX_TX_Settings.BBOARD_COMMAND_READ_TX_BUFFER_DATA)

        let I2C_READ1_COMMAND = pins.createBuffer(6)
        I2C_READ1_COMMAND.setNumber(NumberFormat.UInt8LE, 0, RX_TX_Settings.BBOARD_COMMAND_WRITE_RX_BUFFER_DATA)
        I2C_READ1_COMMAND.setNumber(NumberFormat.UInt8LE, 1, clickBoardNum)
        I2C_READ1_COMMAND.setNumber(NumberFormat.UInt8LE, 2, I2C_module_id)
        I2C_READ1_COMMAND.setNumber(NumberFormat.UInt8LE, 3, this.I2C_READ_NO_MEM_id)
        I2C_READ1_COMMAND.setNumber(NumberFormat.UInt8LE, 4, address)
        I2C_READ1_COMMAND.setNumber(NumberFormat.UInt8LE, 5, numBytes)


            pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, CLEAR_BBOARD_RX_BUFFER, false)
            pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, CLEAR_BBOARD_TX_BUFFER, false)
            pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, I2C_READ1_COMMAND, false)
            pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, EXECUTE_BBOARD_COMMAND, false)

            control.waitMicros(500)
            pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, READ_BBOARD_TX_BUFFER, false)
            TX_BUFFER_DATAbuf = pins.i2cReadBuffer(BBOARD_I2C_ADDRESS, numBytes, false)
            return TX_BUFFER_DATAbuf
    
    }



        //%blockId=i2c_Read
        //% blockGap=7
        //% weight=90   color=#9E4894 icon=""
        //% advanced=false
        //% blockNamespace=bBoard
        //% this.shadow=variables_get
        //% this.defl="I2CSettings"
        //% group="I2C"
        
    

        I2Cread(address:number, memAddress:number,numBytes: number, clickBoardNum: clickBoardID, clickSlot:clickBoardSlot):number{
            clickBoardNum=clickBoardNum+clickSlot;
            let READ_BBOARD_TX_BUFFER = pins.createBuffer(1)
            READ_BBOARD_TX_BUFFER.setNumber(NumberFormat.UInt8LE, 0, RX_TX_Settings.BBOARD_COMMAND_READ_TX_BUFFER_DATA)

            let I2C_READ1_COMMAND = pins.createBuffer(7)
            I2C_READ1_COMMAND.setNumber(NumberFormat.UInt8LE, 0, RX_TX_Settings.BBOARD_COMMAND_WRITE_RX_BUFFER_DATA)
            I2C_READ1_COMMAND.setNumber(NumberFormat.UInt8LE, 1, clickBoardNum)
            I2C_READ1_COMMAND.setNumber(NumberFormat.UInt8LE, 2, I2C_module_id)
            I2C_READ1_COMMAND.setNumber(NumberFormat.UInt8LE, 3, this.I2C_READ_id)
            I2C_READ1_COMMAND.setNumber(NumberFormat.UInt8LE, 4, address)
            I2C_READ1_COMMAND.setNumber(NumberFormat.UInt8LE, 5, memAddress)
            I2C_READ1_COMMAND.setNumber(NumberFormat.UInt8LE, 6, numBytes)


                pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, CLEAR_BBOARD_RX_BUFFER, false)
                pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, CLEAR_BBOARD_TX_BUFFER, false)
                pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, I2C_READ1_COMMAND, false)
                pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, EXECUTE_BBOARD_COMMAND, false)
                control.waitMicros(500)
    
                pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, READ_BBOARD_TX_BUFFER, false)
            let  TX_BUFFER_DATAbuf = pins.i2cReadBuffer(BBOARD_I2C_ADDRESS, numBytes, false)
                return TX_BUFFER_DATAbuf.getUint8(0)
        
        }


    

    


/**
 * Write one number to a 7-bit I2C address.
 */
//% blockId=i2c_write_number
//% block="i2c $this write number|at address $address|with value $value|of format $format at $clickBoardNum on slot $clickSlot|repeated $repeated" weight=6
//% blockGap=7
//% weight=90   color=#9E4894 icon=""
//% advanced=false
//% blockNamespace=bBoard
//% this.shadow=variables_get
//% this.defl="I2CSettings"
//% group="I2C"

i2cWriteNumber(address:number, value: number, format:NumberFormat, clickBoardNum: clickBoardID, clickSlot:clickBoardSlot, repeated: boolean){
    clickBoardNum=clickBoardNum+clickSlot;
    let I2C_WRITE = pins.createBuffer(6 + pins.sizeOf(format))
    let tempBuf = pins.createBuffer(pins.sizeOf(format))
    let disableStop = repeated == true? 1:0;
    tempBuf.setNumber(format,0,value)


    I2C_WRITE.setNumber(NumberFormat.UInt8LE, 0, RX_TX_Settings.BBOARD_COMMAND_WRITE_RX_BUFFER_DATA)
    I2C_WRITE.setNumber(NumberFormat.UInt8LE, 1, clickBoardNum)
    I2C_WRITE.setNumber(NumberFormat.UInt8LE, 2, I2C_module_id)
    I2C_WRITE.setNumber(NumberFormat.UInt8LE, 3, this.I2C_WRITE_id)
    I2C_WRITE.setNumber(NumberFormat.UInt8LE, 4, address)
    I2C_WRITE.setNumber(NumberFormat.UInt8LE, 5, disableStop)

    for(let i=0; i<tempBuf.length; i++)
    {
        I2C_WRITE.setNumber(NumberFormat.UInt8LE, i+6, tempBuf.getNumber(NumberFormat.UInt8LE,i))
    }

    pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, CLEAR_BBOARD_RX_BUFFER, false)
    pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, I2C_WRITE, false)
    pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, EXECUTE_BBOARD_COMMAND, false)

}


         /**
 * Write a buffer to a 7-bit I2C address.
 */
//% help=pins/i2c-write-number blockGap=8
//% blockNamespace=bBoard

i2cWriteBuffer(address:number, buf: Buffer, clickBoardNum: clickBoardID, clickSlot:clickBoardSlot){
    clickBoardNum=clickBoardNum+clickSlot;
    let I2C_WRITE = pins.createBuffer(6 + buf.length)
    let disableStop = 0; //We want a stop bit sent at the end.
    I2C_WRITE.setNumber(NumberFormat.UInt8LE, 0, RX_TX_Settings.BBOARD_COMMAND_WRITE_RX_BUFFER_DATA)
    I2C_WRITE.setNumber(NumberFormat.UInt8LE, 1, clickBoardNum)
    I2C_WRITE.setNumber(NumberFormat.UInt8LE, 2, I2C_module_id)
    I2C_WRITE.setNumber(NumberFormat.UInt8LE, 3, this.I2C_WRITE_id)
    I2C_WRITE.setNumber(NumberFormat.UInt8LE, 4, address)
    I2C_WRITE.setNumber(NumberFormat.UInt8LE, 5, disableStop)

    for(let i=0; i<buf.length; i++)
    {
        I2C_WRITE.setNumber(NumberFormat.UInt8LE, 6+i, buf.getNumber(NumberFormat.UInt8LE,i))
    }


    pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, CLEAR_BBOARD_RX_BUFFER, false)
    pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, I2C_WRITE, false)
    pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, EXECUTE_BBOARD_COMMAND, false)
    basic.pause(2);

}




  
   
}

///END of I2CSettings
    
    


  ///  End of I2C settings functions




}