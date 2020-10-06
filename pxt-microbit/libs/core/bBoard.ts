



// Configuring command messages...


const enum BoardID{

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


const enum ClickID{


//% block="Click A"
A = 1,
 

//% block="Click B"
B=2,

   //% block="No Click"
   Zero= 0

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
  
    //% block="Disable"
    zero = 0,
    //% block="Enable"
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

enum moduleIDs
{

    // Module Ids
GPIO_module_id = 1,
 UART_module_id = 2,
 I2C_module_id = 4,
 SPI_module_id = 5,
 MOTOR_module_id = 6,
 MIC_module_id = 7,
 PWM_module_id = 8,
 ADC_module_id = 9,
 MUSIC_module_id = 10,
 EEPROM_module_id = 0xD,
 NEOPIXEL_module_id = 0xE,
 STATUS_module_id = 0x10
}

/**
 * Custom clickBoard
 */
//% weight=100 color=#9E4894 icon=""
//% advanced=true



//-------------------------Click Board Blocks Begin -----------------------------------
//% weight=100 color=#9E4894 icon=""
namespace bBoard {
    export let arrayClick: BoardID[]=[]

 //   export let arrayClickList: BoardID[]=[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

    //% block=" $boardID $clickID"
    //% inlineInputMode=inline
    //% blockSetVariable="IOSettings"
    //% group="IO"
    //% weight=110
    export function createIOSettings(boardID:BoardID, clickID:ClickID): IOSettings {
        return new IOSettings(boardID, clickID);
   }

    //% block=" $boardID $clickID"
    //% blockSetVariable="PWMSettings"
    //% group="PWM"
    //% weight=110
    export function createPWMSettings(boardID:BoardID, clickID:ClickID): PWMSettings {
        return new PWMSettings(boardID, clickID);
   }

    //% block=" $boardID $clickID"
    //% blockSetVariable="UARTSettings"
    //% group="UART"
    //% weight=110
    export function createUARTSettings(boardID:BoardID, clickID:ClickID): UARTSettings {
        return new UARTSettings(boardID, clickID);
   }

    //% block=" $boardID $clickID"
    //% blockSetVariable="I2CSettings"
    //% group="I2C"
    //% weight=110
    export function createI2cSettings(boardID:BoardID, clickID:ClickID): I2CSettings {
        return new I2CSettings(boardID, clickID);
   }


    //% block=" $boardID $clickID"
    //% blockSetVariable="SPISettings"
    //% group="SPI"
    //% weight=110
    export function createSPISettings(boardID:BoardID, clickID:ClickID): SPIsetting {
        return new SPIsetting(boardID, clickID);
   }

    //% block=" $boardID $clickID"
    //% blockSetVariable="PinSettings"
    //% group="PINs"
    //% weight=110
    export function createPinSettings(boardID:BoardID, clickID:ClickID): PinSettings {
        return new PinSettings(boardID, clickID);
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

//Neopixel Function IDs

let NEOPIXEL_ADD     =          0x01
let NEOPIXEL_REMOVE    =        0x02
let NEOPIXEL_SHOW   =           0x03
let NEOPIXEL_HIDE    =          0x04
let NEOPIXEL_CLEAR      =       0x05
let NEOPIXEL_STRIP_WRITE_SINGLE_DATA =0x06
let NEOPIXEL_STRIP_WRITE_BUFFER_DATA =0x07
let NEOPIXEL_STRIP_READ_SINGLE_DATA  =0x08
let NEOPIXEL_STRIP_READ_BUFFER_DATA  =0x09

// ADC Function Ids
let ADC_READ_id = 16


export class peripheralSettings
{
    private clickBoardNumGlobalPeripheral:number
    private clickSlotNumGlobalPeripheral:number
    private clickAddress : number

    constructor(boardID: BoardID, clickID:ClickID){
        this.clickBoardNumGlobalPeripheral=boardID;
        this.clickSlotNumGlobalPeripheral=clickID;
        this.clickAddress = this.clickBoardNumGlobalPeripheral*3 + this.clickSlotNumGlobalPeripheral 
    }

    sendCommand(clickPin: clickIOPin,moduleID:number,functionID:number)
    {
 
        //Derive the address of the click port (0= on board 1=A 2=B on b.Board)(3 = on board, 4=A, 5=B on Expansion 1 etc)
       
        let dataBuff = pins.createBuffer(6);


        dataBuff.setNumber(NumberFormat.UInt8LE, 0, RX_TX_Settings.BBOARD_COMMAND_WRITE_RX_BUFFER_DATA)
        dataBuff.setNumber(NumberFormat.UInt8LE, 1, this.clickAddress)
        dataBuff.setNumber(NumberFormat.UInt8LE, 2, moduleID)
        dataBuff.setNumber(NumberFormat.UInt8LE, 3, functionID)
        dataBuff.setNumber(NumberFormat.UInt8LE, 4, clickPin & 0x00FF)
        dataBuff.setNumber(NumberFormat.UInt8LE, 5, (clickPin & 0xFF00)>>8)


        
        pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, CLEAR_BBOARD_RX_BUFFER, false)
        pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, dataBuff, false)
        pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, EXECUTE_BBOARD_COMMAND, false)
    }


    sendData(clickPin: clickIOPin,moduleID:number,functionID:number, data: number[] )
    {
 
        //Derive the address of the click port (0= on board 1=A 2=B on b.Board)(3 = on board, 4=A, 5=B on Expansion 1 etc)
       
 
        let dataBuff = pins.createBuffer(6+data.length);
        let dataBuffLength = dataBuff.length

        dataBuff.setNumber(NumberFormat.UInt8LE, 0, RX_TX_Settings.BBOARD_COMMAND_WRITE_RX_BUFFER_DATA)
        dataBuff.setNumber(NumberFormat.UInt8LE, 1, this.clickAddress)
        dataBuff.setNumber(NumberFormat.UInt8LE, 2, moduleID)
        dataBuff.setNumber(NumberFormat.UInt8LE, 3, functionID)
        dataBuff.setNumber(NumberFormat.UInt8LE, 4, clickPin & 0x00FF)
        dataBuff.setNumber(NumberFormat.UInt8LE, 5, (clickPin & 0xFF00)>>8)

        for(let i=0; i<dataBuffLength-6;i++)
        {
   
            dataBuff.setNumber(NumberFormat.UInt8LE, i+6, data[i]);
            
        
        }
        
            pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, CLEAR_BBOARD_RX_BUFFER, false)
            pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, dataBuff, false)
            pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, EXECUTE_BBOARD_COMMAND, false)
    }
    readData16(clickPin: clickIOPin,moduleID:number,functionID:number, data: number[] ):number
    {
 
        //Derive the address of the click port (0= on board 1=A 2=B on b.Board)(3 = on board, 4=A, 5=B on Expansion 1 etc)
        let dataBuff = pins.createBuffer(6+data.length);
        let dataBuffLength = dataBuff.length



  
        dataBuff.setNumber(NumberFormat.UInt8LE, 0, RX_TX_Settings.BBOARD_COMMAND_WRITE_RX_BUFFER_DATA)
        dataBuff.setNumber(NumberFormat.UInt8LE, 1, this.clickAddress)
        dataBuff.setNumber(NumberFormat.UInt8LE, 2, moduleID)
        dataBuff.setNumber(NumberFormat.UInt8LE, 3, functionID)
        dataBuff.setNumber(NumberFormat.UInt8LE, 4, clickPin & 0x00FF)
        dataBuff.setNumber(NumberFormat.UInt8LE, 5, (clickPin & 0xFF00)>>8)

        for(let i=0; i<dataBuffLength-6;i++)
        {
   
            dataBuff.setNumber(NumberFormat.UInt8LE, i+6, data[i]);
            
        
        }

        pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, CLEAR_BBOARD_RX_BUFFER, false)
        pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, CLEAR_BBOARD_TX_BUFFER, false)
        pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, dataBuff, false)
        pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, EXECUTE_BBOARD_COMMAND, false)
        control.waitMicros(500)
        pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, READ_BBOARD_TX_BUFFER, false)
        let TX_BUFFER_DATAbuf = pins.i2cReadBuffer(BBOARD_I2C_ADDRESS, 2, false)
        return (TX_BUFFER_DATAbuf.getUint8(0) + TX_BUFFER_DATAbuf.getUint8(1) * 256)


      
    }

    sendBuffer(clickPin: clickIOPin,moduleID:number,functionID:number, buff: Buffer )
    {
 
        //Derive the address of the click port (0= on board 1=A 2=B on b.Board)(3 = on board, 4=A, 5=B on Expansion 1 etc)
        let dataBuffLength = buff.length

        let dataBuff = pins.createBuffer(6+dataBuffLength);


        dataBuff.setNumber(NumberFormat.UInt8LE, 0, RX_TX_Settings.BBOARD_COMMAND_WRITE_RX_BUFFER_DATA)
        dataBuff.setNumber(NumberFormat.UInt8LE, 1, this.clickAddress)
        dataBuff.setNumber(NumberFormat.UInt8LE, 2, moduleID)
        dataBuff.setNumber(NumberFormat.UInt8LE, 3, functionID)
        dataBuff.setNumber(NumberFormat.UInt8LE, 4, clickPin & 0x00FF)
        dataBuff.setNumber(NumberFormat.UInt8LE, 5, (clickPin & 0xFF00)>>8)

           

   
             dataBuff.write(6,buff)
           
        
            pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, CLEAR_BBOARD_RX_BUFFER, false)
            pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, dataBuff, false)
            pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, EXECUTE_BBOARD_COMMAND, false)
    }
  


    

}
    
    export class IOSettings{
            
        // GPIO Function Ids
        protected DIRSET_id : number
        protected DIRCLR_id : number
        public GPIO_id : number
        public SET_id : number
        // ADC Function Ids
public ADC_READ_id: number

        public CLR_id : number
        protected TOGGLE_id : number
        protected GPIOPULLENSET_id : number
        protected ODC_id : number
        private clickBoardNumGlobalIO : number

        constructor(boardID: BoardID, clickID: ClickID){
        this.DIRSET_id = 2
        this.DIRCLR_id = 3
        this.GPIO_id = 4
        this.SET_id = 5
        this.CLR_id = 6
        this.TOGGLE_id = 7
        this.GPIOPULLENSET_id = 0x0B
        this.ODC_id = 0x0D
        this.ADC_READ_id = 16
        this.clickBoardNumGlobalIO=boardID*3 + clickID;
        }


        //%blockId=set_IO_direction
        //%block="$this set pin $clickPin to $direction"
        //% blockGap=7
        //% weight=90   color=#9E4894 icon=""
        //% advanced=false
        //% blockNamespace=bBoard
        //% this.shadow=variables_get
        //% this.defl="IOSettings"
        //% group="IO"
        setIODirection(clickPin: clickIOPin,direction: clickIODirection){
            
            
            let GPIO_CONFIG_OUTPUT_PINS = pins.createBuffer(8)
            GPIO_CONFIG_OUTPUT_PINS.setNumber(NumberFormat.UInt8LE, 0, RX_TX_Settings.BBOARD_COMMAND_WRITE_RX_BUFFER_DATA)
            GPIO_CONFIG_OUTPUT_PINS.setNumber(NumberFormat.UInt8LE, 1, this.clickBoardNumGlobalIO)
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
        //%block="$this $ODC_Enable open drain on $clickPin"
        //% blockGap=7
        //% weight=90   color=#9E4894 icon=""
        //% advanced=false
        //% blockNamespace=bBoard
        //% this.shadow=variables_get
        //% this.defl="IOSettings"
        //% group="IO"
        setOpenDrain(ODC_Enable: ODCEnable,clickPin: clickIOPin){
            let GPIO_CONFIG_OUTPUT_PINS = pins.createBuffer(7)



            GPIO_CONFIG_OUTPUT_PINS.setNumber(NumberFormat.UInt8LE, 0, RX_TX_Settings.BBOARD_COMMAND_WRITE_RX_BUFFER_DATA)
            GPIO_CONFIG_OUTPUT_PINS.setNumber(NumberFormat.UInt8LE, 1, this.clickBoardNumGlobalIO)
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
        //%block="$this set pin $clickPin to $pullDirection"
        //% blockGap=7
        //% weight=90   color=#9E4894 icon=""
        //% advanced=false
        //% blockNamespace=bBoard
        //% this.shadow=variables_get
        //% this.defl="IOSettings"
        //% group="IO"

        setPullDirection(clickPin: clickIOPin,pullDirection: IOPullDirection ){
            let GPIO_CONFIG_OUTPUT_PINS = pins.createBuffer(7)



            GPIO_CONFIG_OUTPUT_PINS.setNumber(NumberFormat.UInt8LE, 0, RX_TX_Settings.BBOARD_COMMAND_WRITE_RX_BUFFER_DATA)
            GPIO_CONFIG_OUTPUT_PINS.setNumber(NumberFormat.UInt8LE, 1, this.clickBoardNumGlobalIO)
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
        private clickBoardNumGlobalPWM:number;

        constructor(boardID: BoardID, clickID: ClickID){
        this.pitchPin = clickPWMPin.PWM; 
        this.pitchClick = BoardID.one;
        this.clickBoardNumGlobalPWM=boardID*3+clickID;
        }

        analogPitch(frequency:number,ms:number)
        {
      
            if (frequency <= 0) {
            
            this.setDuty(this.pitchPin,0);
            } else {
                this.setDuty(this.pitchPin,70);
                this.PWMFrequency(this.pitchPin,frequency*100);
            }
    
            if (ms > 0) {
                control.waitMicros(ms*1000)
                
                this.setDuty(this.pitchPin,0);
                // TODO why do we use wait_ms() here? it's a busy wait I think
                basic.pause(5);
            }
        
  
        }

    

        //%blockId=set_Duty
        //%block="$this set duty cycle on pin $clickPin to $duty"
        //% blockGap=7
        //% weight=90   color=#9E4894 icon=""
        //% duty.min=0 duty.max=100 
        //% advanced=false
        //% blockNamespace=bBoard
        //% this.shadow=variables_get
        //% this.defl="PWMSettings"
        //% group="PWM"
        setDuty( clickPin: clickPWMPin,duty: number){

            let pinNum = 0; 
            let dutyCycle = 0;
            duty = duty/100; 
            dutyCycle = duty * 1000; //the BLiX chip expects a value of 0-1000


            let GPIO_SET_PWM_DUTY = pins.createBuffer(8);
            GPIO_SET_PWM_DUTY.setNumber(NumberFormat.UInt8LE, 0, RX_TX_Settings.BBOARD_COMMAND_WRITE_RX_BUFFER_DATA)
            GPIO_SET_PWM_DUTY.setNumber(NumberFormat.UInt8LE, 1, this.clickBoardNumGlobalPWM)
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
        //%block="$this set PWM frequency on pin $clickPin to $PWMfreq"
        //% blockGap=7
        //% weight=90   color=#9E4894 icon=""
        //% advanced=false
        //% blockNamespace=bBoard
        //% this.shadow=variables_get
        //% this.defl="PWMSettings"
        //% group="PWM"
        PWMFrequency( clickPin: clickPWMPin,PWMfreq: number){

            let pinNum = 0; 


            let GPIO_SET_PWM_DUTY = pins.createBuffer(8);
            GPIO_SET_PWM_DUTY.setNumber(NumberFormat.UInt8LE, 0, RX_TX_Settings.BBOARD_COMMAND_WRITE_RX_BUFFER_DATA)
            GPIO_SET_PWM_DUTY.setNumber(NumberFormat.UInt8LE, 1, this.pitchClick)
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
        private clickBoardNumGlobalUART:number

        constructor(boardID:BoardID, clickID:ClickID){
        this.UART_STATUS = 0
        this.UART_INTEN =  2
        this.UART_INTENCLR = 3
        this.UART_BAUD_id = 4
        this.UART_WRITE_TX_DATA = 5
        this.UART_READ_RX_DATA = 6
        this.UART_READ_RX_DATA_BYTES = 7
        this.UART_CLEAR_RX_DATA = 8
        this.clickBoardNumGlobalUART=boardID*3+clickID;

        }

       getUARTDataSize():number{
    
    
        let UARTSizeBuf = pins.createBuffer(4)
    
        let UART_TX_SIZE = 0
        let UART_RX_SIZE = 0

        UARTSizeBuf.setNumber(NumberFormat.UInt8LE, 0, RX_TX_Settings.BBOARD_COMMAND_WRITE_RX_BUFFER_DATA)
        UARTSizeBuf.setNumber(NumberFormat.UInt8LE, 1, this.clickBoardNumGlobalUART)
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


    clearUARTRxBuffer(){


        let UART_CLEARRx_COMMAND = pins.createBuffer(5)
        UART_CLEARRx_COMMAND.setNumber(NumberFormat.UInt8LE, 0, RX_TX_Settings.BBOARD_COMMAND_WRITE_RX_BUFFER_DATA)
        UART_CLEARRx_COMMAND.setNumber(NumberFormat.UInt8LE, 1, this.clickBoardNumGlobalUART)
        UART_CLEARRx_COMMAND.setNumber(NumberFormat.UInt8LE, 2, UART_module_id)
        UART_CLEARRx_COMMAND.setNumber(NumberFormat.UInt8LE, 3, this.UART_CLEAR_RX_DATA)


            pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, CLEAR_BBOARD_RX_BUFFER, false)
            pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, UART_CLEARRx_COMMAND, false)
            pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, EXECUTE_BBOARD_COMMAND, false)
    }

    //%blockId=is_UART_Data_Avail
    //%block="$this is UART data available?"
    //% blockGap=7
    //% weight=90   color=#9E4894 icon=""
    //% advanced=false
    //% blockNamespace=bBoard
    //% this.shadow=variables_get
    //% this.defl="UARTSettings"
    //% group="UART"

    isUARTDataAvailable():boolean {

      
      
        if (this.getUARTDataSize()) 
        {
            
           return true;
           
        }
     return false;
    }
    
    /**
    * Set the UART baud rate
    * @param baud the baud rate, eg: 115200
    */
    //% weight=4 advanced=true
    //% blockId=bBoard_UART_frequency block="$this set UART baud to $baud"
    //% blockNamespace=bBoard
    //% this.shadow=variables_get
    //% baud.delf=115200
    //% this.defl="UARTSettings"
    //% group="UART"
    UARTFrequency(baud:number) {
        
        // (Note: BRG = Fp / baudrate)
        //(Note: Fp = 40000000)

        let Fp = 40000000; //Frequency of the dspic Peripheral clock
        let brg = Fp/baud 
        
        let UART_WRITE1_COMMAND = pins.createBuffer(6)
        UART_WRITE1_COMMAND.setNumber(NumberFormat.UInt8LE, 0, RX_TX_Settings.BBOARD_COMMAND_WRITE_RX_BUFFER_DATA)
        UART_WRITE1_COMMAND.setNumber(NumberFormat.UInt8LE, 1, this.clickBoardNumGlobalUART)
        UART_WRITE1_COMMAND.setNumber(NumberFormat.UInt8LE, 2, UART_module_id)
        UART_WRITE1_COMMAND.setNumber(NumberFormat.UInt8LE, 3, this.UART_BAUD_id)
        UART_WRITE1_COMMAND.setNumber(NumberFormat.UInt8LE, 4, brg & 0x00FF)
        UART_WRITE1_COMMAND.setNumber(NumberFormat.UInt8LE, 5, (brg & 0xFF00)>>8)
        
       
        pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, CLEAR_BBOARD_RX_BUFFER, false)
        pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, UART_WRITE1_COMMAND, false)
        pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, EXECUTE_BBOARD_COMMAND, false)

    }

        //%blockId=send_UART_Buffer
        //%block="$this send buffer $Buf"
        //% blockGap=7
        //% weight=90   color=#9E4894 icon=""
        //% advanced=false
        //% blockNamespace=bBoard
        //% this.shadow=variables_get
        //% this.defl="UARTSettings"
        //% group="UART"

        sendBuffer( Buf: Buffer){

    

            let buffLength = Buf.length+4;
    

            let UARTBuf = pins.createBuffer(buffLength);

            

                    UARTBuf.setNumber(NumberFormat.UInt8LE, 0, RX_TX_Settings.BBOARD_COMMAND_WRITE_RX_BUFFER_DATA)
                    UARTBuf.setNumber(NumberFormat.UInt8LE, 1, this.clickBoardNumGlobalUART)
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
    //%block="$this read string"
    //% blockGap=7
    //% weight=90   color=#9E4894 icon=""
    //% advanced=false
    //% blockNamespace=bBoard
    //% this.shadow=variables_get
    //% this.defl="UARTSettings"
    //% group="UART"

    getUARTData():string
    {


        let UART_Rx_BuffSize  = this.getUARTDataSize();
        let TX_BuffSize = 0
       
       
        let UARTDataBuf = pins.createBuffer(6)

        UARTDataBuf.setNumber(NumberFormat.UInt8LE, 0, RX_TX_Settings.BBOARD_COMMAND_WRITE_RX_BUFFER_DATA)
        UARTDataBuf.setNumber(NumberFormat.UInt8LE, 1, this.clickBoardNumGlobalUART)
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
        //%block="$this send string $UARTString"
        //% blockGap=7
        //% weight=90   color=#9E4894 icon=""
        //% advanced=false
        //% blockNamespace=bBoard
        //% this.shadow=variables_get
        //% this.defl="UARTSettings"
        //% group="UART"

        sendString( UARTString: string){
            let remainingBytes = UARTString.length
            
            while( remainingBytes )
            {
                let messageLength = Math.min(remainingBytes+ 4,128);
                let UARTBuf = pins.createBuffer(messageLength);

                UARTBuf.setNumber(NumberFormat.UInt8LE, 0, RX_TX_Settings.BBOARD_COMMAND_WRITE_RX_BUFFER_DATA)
                UARTBuf.setNumber(NumberFormat.UInt8LE, 1, this.clickBoardNumGlobalUART)
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
        private clickBoardNumGlobalPin: number;
        constructor(boardID:BoardID,clickID:ClickID){
            super(boardID,clickID);
            this.clickBoardNumGlobalPin=boardID*3+clickID;
        }

        //%blockId=digital_Read_Pin
        //%block="$this digital read pin $clickPin"
        //% blockGap=7
        //% weight=90   color=#9E4894 icon=""
        //% advanced=false
        //% blockNamespace=bBoard
        //% this.shadow=variables_get
        //% this.defl="PinSettings"
        //% group="PINs"
        digitalReadPin( clickPin: clickIOPin):number
        {
            let pinStatus = 0;
            let READ_CLICKBOARD_DIGITAL_INPUTS = pins.createBuffer(6)
            let TX_BUFFER_DATAbuf = pins.createBuffer(2);
            READ_CLICKBOARD_DIGITAL_INPUTS.setNumber(NumberFormat.UInt8LE, 0, RX_TX_Settings.BBOARD_COMMAND_WRITE_RX_BUFFER_DATA)
            READ_CLICKBOARD_DIGITAL_INPUTS.setNumber(NumberFormat.UInt8LE, 1, this.clickBoardNumGlobalPin)
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
        //%block="$this write pin $clickPin to $value"
        //% blockGap=7
        //% weight=90   color=#9E4894 icon=""
        //% advanced=false
        //% blockNamespace=bBoard
        //% this.shadow=variables_get
        //% this.defl="PinSettings"
        //% group="PINs"

        writePin(value: number, clickPin: clickIOPin){
        
            if(value > 0){
                this.setPin(clickPin);
            
            }

            else{
                this.clearPin(clickPin);
            }
        
    
        }

    

        

        setPin(clickPin: clickIOPin){

        // 'Set clickboard output pins values HIGH' command
        let GPIO_SET_OUTPUT_PINS_HIGH = pins.createBuffer(8)
        GPIO_SET_OUTPUT_PINS_HIGH.setNumber(NumberFormat.UInt8LE, 0, RX_TX_Settings.BBOARD_COMMAND_WRITE_RX_BUFFER_DATA)
        GPIO_SET_OUTPUT_PINS_HIGH.setNumber(NumberFormat.UInt8LE, 1, this.clickBoardNumGlobalPin)
        GPIO_SET_OUTPUT_PINS_HIGH.setNumber(NumberFormat.UInt8LE, 2, GPIO_module_id)
        GPIO_SET_OUTPUT_PINS_HIGH.setNumber(NumberFormat.UInt8LE, 3, this.SET_id)
        GPIO_SET_OUTPUT_PINS_HIGH.setNumber(NumberFormat.UInt8LE, 4, clickPin & 0x00FF)
        GPIO_SET_OUTPUT_PINS_HIGH.setNumber(NumberFormat.UInt8LE, 5, (clickPin & 0xFF00)>>8)
        GPIO_SET_OUTPUT_PINS_HIGH.setNumber(NumberFormat.UInt8LE, 6, 0x00)
        GPIO_SET_OUTPUT_PINS_HIGH.setNumber(NumberFormat.UInt8LE, 7, 0x00)

        //setIODirection(clickPin,clickIODirection.output,boardID); //Done automatically on bBoard
                
        // Send commands
        pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, CLEAR_BBOARD_RX_BUFFER, false)
        pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, GPIO_SET_OUTPUT_PINS_HIGH, false)
        pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, EXECUTE_BBOARD_COMMAND, false)  
        }

     

        clearPin( clickPin: clickIOPin){
        
        // 'Set clickboard output pins values LOW' command


        let GPIO_SET_OUTPUT_PINS_LOW = pins.createBuffer(8)

        GPIO_SET_OUTPUT_PINS_LOW.setNumber(NumberFormat.UInt8LE, 0, RX_TX_Settings.BBOARD_COMMAND_WRITE_RX_BUFFER_DATA)
        GPIO_SET_OUTPUT_PINS_LOW.setNumber(NumberFormat.UInt8LE, 1, this.clickBoardNumGlobalPin)
        GPIO_SET_OUTPUT_PINS_LOW.setNumber(NumberFormat.UInt8LE, 2, GPIO_module_id)
        GPIO_SET_OUTPUT_PINS_LOW.setNumber(NumberFormat.UInt8LE, 3, this.CLR_id)
        GPIO_SET_OUTPUT_PINS_LOW.setNumber(NumberFormat.UInt8LE, 4, clickPin & 0x00FF)
        GPIO_SET_OUTPUT_PINS_LOW.setNumber(NumberFormat.UInt8LE, 5, (clickPin & 0xFF00)>>8)
        GPIO_SET_OUTPUT_PINS_LOW.setNumber(NumberFormat.UInt8LE, 6, 0x00)
        GPIO_SET_OUTPUT_PINS_LOW.setNumber(NumberFormat.UInt8LE, 7, 0x00)
            
    // setIODirection(clickPin,clickIODirection.output,boardID); //Done automatically on bBoard
        // Send commands
        pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, CLEAR_BBOARD_RX_BUFFER, false)
        pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, GPIO_SET_OUTPUT_PINS_LOW, false)
        pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, EXECUTE_BBOARD_COMMAND, false)
    
    
        }

            //%blockId=Analog_Read
    //%block="$this analog read pin %clickPin"
    //% blockGap=7
    //% weight=90   color=#9E4894 icon=""
    //% advanced=false
        //% blockNamespace=bBoard
        //% this.shadow=variables_get
        //% this.defl="PinSettings"
        //% group="PINs"

    analogRead(clickPin: clickADCPin, boardID: BoardID, clickSlotNum : ClickID): number{


        let ADC_READ1_COMMAND = pins.createBuffer(6)
        ADC_READ1_COMMAND.setNumber(NumberFormat.UInt8LE, 0, RX_TX_Settings.BBOARD_COMMAND_WRITE_RX_BUFFER_DATA)
        ADC_READ1_COMMAND.setNumber(NumberFormat.UInt8LE, 1, this.clickBoardNumGlobalPin)
        ADC_READ1_COMMAND.setNumber(NumberFormat.UInt8LE, 2, ADC_module_id)
        ADC_READ1_COMMAND.setNumber(NumberFormat.UInt8LE, 3, this.ADC_READ_id)
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


       
    }


    ///END of class PinSettings

     

   /// End of pinsettings functions


    //%blockId=getFirmwareVersion
    //%block="Get firmware version of $boardID at slot $clickSlotNum"
    //% blockGap=7
    //% weight=90   color=#9E4894 icon=""
    //% advanced=false
    //% group="_____________"
    

    export function getFirmwareVersion(boardID: BoardID, clickSlotNum : ClickID): number{
        let clickNumSlot=boardID*3+clickSlotNum
        let analogValue = 0;


        let GET_VERSION_COMMAND = pins.createBuffer(4)
        GET_VERSION_COMMAND.setNumber(NumberFormat.UInt8LE, 0, RX_TX_Settings.BBOARD_COMMAND_WRITE_RX_BUFFER_DATA)
        GET_VERSION_COMMAND.setNumber(NumberFormat.UInt8LE, 1, clickNumSlot)
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
        private clickBoardGlobalNumSPI : number

        constructor(boardID:BoardID,clickID:ClickID){
        this.SPI_WRITE_id = 1
        this.SPI_READ_id = 2
        this.SPI_CONFIG_id = 3
        this.SPI_WRITEBULK_id = 4
        this.SPI_WRITEBULK_CS_id = 5
        this. SPI_READBULK_CS_id = 6
        this.SPI_BAUD_id = 7
        this.SPI_CONFIG_CS_id = 8
        this.clickBoardGlobalNumSPI=boardID*3+clickID;

        }
 
        
    //%blockId=spi_Write
    //%block="$this spi write $value"
    //% blockGap=7
    //% weight=90   color=#9E4894 icon=""
    //% advanced=false
    //% blockNamespace=bBoard
    //% this.shadow=variables_get
    //% this.defl="SPISettings"
    //% group="SPI"

    SPIWrite(value: number){
       

        let SPI_WRITE1_COMMAND = pins.createBuffer(5)
        SPI_WRITE1_COMMAND.setNumber(NumberFormat.UInt8LE, 0, RX_TX_Settings.BBOARD_COMMAND_WRITE_RX_BUFFER_DATA)
        SPI_WRITE1_COMMAND.setNumber(NumberFormat.UInt8LE, 1, this.clickBoardGlobalNumSPI)
        SPI_WRITE1_COMMAND.setNumber(NumberFormat.UInt8LE, 2, SPI_module_id)
        SPI_WRITE1_COMMAND.setNumber(NumberFormat.UInt8LE, 3, this.SPI_WRITE_id)
        SPI_WRITE1_COMMAND.setNumber(NumberFormat.UInt8LE, 4, value)

       
        pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, CLEAR_BBOARD_RX_BUFFER, false)
        pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, SPI_WRITE1_COMMAND, false)
        pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, EXECUTE_BBOARD_COMMAND, false)

  
    }


    //%blockId=spi_Write_array
    //%block="$this spi write array $arrayValues"
    //% blockGap=7
    //% weight=90   color=#9E4894 icon=""
    //% advanced=false
    //% blockNamespace=bBoard
    //% this.shadow=variables_get
    //% this.defl="SPISettings"
    //% group="SPI"

    SPIWriteArray(arrayValues: number[]){
       
        let arrayLength = arrayValues.length
        let SPI_WRITE1_COMMAND = pins.createBuffer(4+arrayLength)
        SPI_WRITE1_COMMAND.setNumber(NumberFormat.UInt8LE, 0, RX_TX_Settings.BBOARD_COMMAND_WRITE_RX_BUFFER_DATA)
        SPI_WRITE1_COMMAND.setNumber(NumberFormat.UInt8LE, 1, this.clickBoardGlobalNumSPI)
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
    //% blockId=bBoard_spi_frequency block="$this spi set frequency $frequency"
    //% blockNamespace=bBoard
    //% this.shadow=variables_get
    //% this.defl="SPISettings"
    //% group="SPI"
    spiFrequency(frequency:number) {
        
        // (Note: BRG = ( Fp / (2 * BaudRate) ) - 1   )
       // (Note: Fp = 40000000)

        let Fp = 40000000; //Frequency of the dspic Peripheral clock
        let brgl = (Fp/(2*frequency))-1 
        
        let SPI_WRITE1_COMMAND = pins.createBuffer(6)
        SPI_WRITE1_COMMAND.setNumber(NumberFormat.UInt8LE, 0, RX_TX_Settings.BBOARD_COMMAND_WRITE_RX_BUFFER_DATA)
        SPI_WRITE1_COMMAND.setNumber(NumberFormat.UInt8LE, 1, this.clickBoardGlobalNumSPI)
        SPI_WRITE1_COMMAND.setNumber(NumberFormat.UInt8LE, 2, SPI_module_id)
        SPI_WRITE1_COMMAND.setNumber(NumberFormat.UInt8LE, 3, this.SPI_BAUD_id)
        SPI_WRITE1_COMMAND.setNumber(NumberFormat.UInt8LE, 4, brgl & 0x00FF)
        SPI_WRITE1_COMMAND.setNumber(NumberFormat.UInt8LE, 5, (brgl & 0xFF00)>>8)
        
        
    
    
 
        
       
        pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, CLEAR_BBOARD_RX_BUFFER, false)
        pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, SPI_WRITE1_COMMAND, false)
        pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, EXECUTE_BBOARD_COMMAND, false)

    }


    //%blockId=spi_Write_buffer
    //%block="$this spi write buffer $bufferValues"
    //% blockGap=7
    //% weight=90   color=#9E4894 icon=""
    //% advanced=false
    //% blockNamespace=bBoard
    //% this.shadow=variables_get
    //% this.defl="SPISettings"
    //% group="SPI"
    SPIWriteBuffer(bufferValues: Buffer){
       
        let bufferLength = bufferValues.length
        let SPI_WRITE1_COMMAND = pins.createBuffer(4+bufferLength)
        SPI_WRITE1_COMMAND.setNumber(NumberFormat.UInt8LE, 0, RX_TX_Settings.BBOARD_COMMAND_WRITE_RX_BUFFER_DATA)
        SPI_WRITE1_COMMAND.setNumber(NumberFormat.UInt8LE, 1, this.clickBoardGlobalNumSPI)
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
    //%block="$this spi set mode to $mode"
    //% blockGap=7
    //% weight=90   color=#9E4894 icon=""
    //% advanced=false
    //% blockNamespace=bBoard
    //% this.shadow=variables_get
    //% this.defl="SPISettings"
    //% group="SPI"

    SPIModeSelect(mode: SPIMode){
        let SPI_CKE = 1
        let SPI_CKP = 0


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
        SPI_CONFIG_COMMAND.setNumber(NumberFormat.UInt8LE, 1, this.clickBoardGlobalNumSPI)
        SPI_CONFIG_COMMAND.setNumber(NumberFormat.UInt8LE, 2, SPI_module_id)
        SPI_CONFIG_COMMAND.setNumber(NumberFormat.UInt8LE, 3, this.SPI_CONFIG_id)
        SPI_CONFIG_COMMAND.setNumber(NumberFormat.UInt8LE, 4, SPI_CKE)
        SPI_CONFIG_COMMAND.setNumber(NumberFormat.UInt8LE, 5, SPI_CKP)
        
        
        pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, CLEAR_BBOARD_RX_BUFFER, false)
        pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, SPI_CONFIG_COMMAND, false)
        pins.i2cWriteBuffer(BBOARD_I2C_ADDRESS, EXECUTE_BBOARD_COMMAND, false)
  
    }



    //%blockId=spi_Read
    //%block="$this spi read $numBytes bytes"
    //% blockGap=7
    //% weight=90   color=#9E4894 icon=""
    //% advanced=false
    //% blockNamespace=bBoard
    //% this.shadow=variables_get
    //% this.defl="SPISettings"
    //% group="SPI"

    SPIread(numBytes: number):number{
   
        let READ_BBOARD_TX_BUFFER = pins.createBuffer(1)
        READ_BBOARD_TX_BUFFER.setNumber(NumberFormat.UInt8LE, 0, RX_TX_Settings.BBOARD_COMMAND_READ_TX_BUFFER_DATA)

        let SPI_READ1_COMMAND = pins.createBuffer(5)
        SPI_READ1_COMMAND.setNumber(NumberFormat.UInt8LE, 0, RX_TX_Settings.BBOARD_COMMAND_WRITE_RX_BUFFER_DATA)
        SPI_READ1_COMMAND.setNumber(NumberFormat.UInt8LE, 1, this.clickBoardGlobalNumSPI)
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
        //% blockId=bBoard_spi_CS block="$this spi assign CS Pin to pin $clickPin"
        //% blockNamespace=bBoard
        //% this.shadow=variables_get
         //% this.defl="SPISettings"
         //% group="SPI"

        spiCS(clickPin: clickIOPin) {
        
    
        
        let SPI_WRITE1_COMMAND = pins.createBuffer(6)
        SPI_WRITE1_COMMAND.setNumber(NumberFormat.UInt8LE, 0, RX_TX_Settings.BBOARD_COMMAND_WRITE_RX_BUFFER_DATA)
        SPI_WRITE1_COMMAND.setNumber(NumberFormat.UInt8LE, 1, this.clickBoardGlobalNumSPI)
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
            private clickBoardGlobalNumI2C : number

            constructor(boardID:BoardID, clickID:ClickID ){
                this.I2C_WRITE_id = 1
                this.I2C_READ_id = 2
                this.I2C_WRITE_NO_MEM_id = 3
                this.I2C_READ_NO_MEM_id = 4
                this.clickBoardGlobalNumI2C=boardID*3+clickID;

            }

 


        //%blockId=i2c_ReadNoMem
        //% blockGap=7
        //% weight=90   color=#9E4894 icon=""
        //% advanced=false
        //% blockNamespace=bBoard
        //% block="$this i2c read $numBytes bytes at i2c address $address" weight=6

        //% this.shadow=variables_get
        //% this.defl="I2CSettings"
        //% group="I2C"
        

        I2CreadNoMem(address:number, numBytes: number):Buffer{
    
            let READ_BBOARD_TX_BUFFER = pins.createBuffer(1)
            let TX_BUFFER_DATAbuf = pins.createBuffer(numBytes);
            READ_BBOARD_TX_BUFFER.setNumber(NumberFormat.UInt8LE, 0, RX_TX_Settings.BBOARD_COMMAND_READ_TX_BUFFER_DATA)

            let I2C_READ1_COMMAND = pins.createBuffer(6)
            I2C_READ1_COMMAND.setNumber(NumberFormat.UInt8LE, 0, RX_TX_Settings.BBOARD_COMMAND_WRITE_RX_BUFFER_DATA)
            I2C_READ1_COMMAND.setNumber(NumberFormat.UInt8LE, 1, this.clickBoardGlobalNumI2C)
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
             //% block="$this i2c read $numBytes bytes |at memory address $memAddress |at i2c address $address" weight=6
            //% advanced=false
            //% blockNamespace=bBoard
            //% this.shadow=variables_get
            //% this.defl="I2CSettings"
            //% group="I2C"
            
        

            I2Cread(address:number, memAddress:number,numBytes: number):number{
        
                let READ_BBOARD_TX_BUFFER = pins.createBuffer(1)
                READ_BBOARD_TX_BUFFER.setNumber(NumberFormat.UInt8LE, 0, RX_TX_Settings.BBOARD_COMMAND_READ_TX_BUFFER_DATA)

                let I2C_READ1_COMMAND = pins.createBuffer(7)
                I2C_READ1_COMMAND.setNumber(NumberFormat.UInt8LE, 0, RX_TX_Settings.BBOARD_COMMAND_WRITE_RX_BUFFER_DATA)
                I2C_READ1_COMMAND.setNumber(NumberFormat.UInt8LE, 1, this.clickBoardGlobalNumI2C)
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
    //% block="i2c $this write number $value|to i2c address $address|of format $format | repeated $repeated" weight=6
    //% blockGap=7
    //% weight=90   color=#9E4894 icon=""
    //% advanced=false
    //% blockNamespace=bBoard
    //% this.shadow=variables_get
    //% this.defl="I2CSettings"
    //% group="I2C"

    i2cWriteNumber(address:number, value: number, format:NumberFormat, repeated: boolean){
      
        let I2C_WRITE = pins.createBuffer(6 +  pins.sizeOf(format))
        let tempBuf = pins.createBuffer(pins.sizeOf(format))
        let disableStop = repeated == true? 1:0;
        tempBuf.setNumber(format,0,value)
  

        I2C_WRITE.setNumber(NumberFormat.UInt8LE, 0, RX_TX_Settings.BBOARD_COMMAND_WRITE_RX_BUFFER_DATA)
        I2C_WRITE.setNumber(NumberFormat.UInt8LE, 1, this.clickBoardGlobalNumI2C)
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

    i2cWriteBuffer(address:number, buf: Buffer){
      
        let I2C_WRITE = pins.createBuffer(6 + buf.length)
        let disableStop = 0; //We want a stop bit sent at the end.
        I2C_WRITE.setNumber(NumberFormat.UInt8LE, 0, RX_TX_Settings.BBOARD_COMMAND_WRITE_RX_BUFFER_DATA)
        I2C_WRITE.setNumber(NumberFormat.UInt8LE, 1, this.clickBoardGlobalNumI2C)
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



