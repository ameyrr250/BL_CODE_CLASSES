/**
 * Custom blocks
 */
//% weight=100 color=#33BEBB icon=""
//% advanced=true
namespace Heart_Rate{

 
    /**
  Section: Macro Declarations
 */

declare const   DEFAULT_MODE        =    2
declare const  DEFAULT_HIRES_SET   =    1
declare const  DEFAULT_SAMP_RATE    =   0
declare const  DEFAULT_PWIDTH       =   3
declare const  DEFAULT_IR_CURRENT   =   0x7//MAX30100_I0
declare const DEFAULT_RED_CURRENT  =   0x7//MAX30100_I0
declare const SPO2_INTERRUPT_EN    =   1   
declare const  HR_INTERRUPT_EN      =   1
declare const TEMP_INTERRUPT_EN   =    1 
declare const  FIFO_INTERRUPT_EN   =    1



// Registers
declare const  MAX30100_INTERRUPT_STAT_REG   =  0x00// Which interrupts are tripped
declare const  MAX30100_INTERRUPT_EN_REG     =  0x01// Which interrupts are active
declare const  MAX30100_FIFO_WR_PTR_REG      =  0x02 // Where data is being written
declare const  MAX30100_OVF_CTR_REG          =  0x03 // Number of lost samples
declare const  MAX30100_FIFO_RD_PTR_REG     =   0x04// Where to read from
declare const  MAX30100_FIFO_DATA_REG        =  0x05// Ouput data buffer
declare const  MAX30100_MODE_CONFIG_REG     =   0x06// Control register
declare const  MAX30100_SPO2_CONFIG_REG     =   0x07// Oximetry settings
declare const  MAX30100_LED_CONFIG_REG      =   0x09// Pulse width and power of LEDs
declare const  MAX30100_TEMP_INT_REG        =   0x16// Temperature value, whole number
declare const  MAX30100_TEMP_FRAC_REG       =   0x17// Temperature value, fraction
declare const  MAX30100_REV_ID_REG          =   0xFE // Part revision
declare const  MAX30100_PART_ID_REG         =   0xFF // Part ID, normally 0x11



        //Address Definitions
    declare const DEFAULT_I2C_ADDRESS =  0x57  
    

       

        let isInitialized  = 0
        let deviceAddress = 0
        let heartrate_initialized = 0;

        let I2Cs=new bBoard.I2CSettings();

     //%blockId=heartrate_initialize
    //%block="Initialize device on click%boardID"
    //% blockGap=7
    //% advanced=true
        export function initialize(boardID:BoardID)
        {
            isInitialized  = 1
            setMAX30100Addr(DEFAULT_I2C_ADDRESS,boardID)
            HeartRate_initializeClick(boardID);
            HeartRate_example(boardID);
        
        
        }

        /*
    (c) 2016 Microchip Technology Inc. and its subsidiaries. You may use this
    software and any derivatives exclusively with Microchip products.

    THIS SOFTWARE IS SUPPLIED BY MICROCHIP "AS IS". NO WARRANTIES, WHETHER
    EXPRESS, IMPLIED OR STATUTORY, APPLY TO THIS SOFTWARE, INCLUDING ANY IMPLIED
    WARRANTIES OF NON-INFRINGEMENT, MERCHANTABILITY, AND FITNESS FOR A
    PARTICULAR PURPOSE, OR ITS INTERACTION WITH MICROCHIP PRODUCTS, COMBINATION
    WITH ANY OTHER PRODUCTS, OR USE IN ANY APPLICATION.

    IN NO EVENT WILL MICROCHIP BE LIABLE FOR ANY INDIRECT, SPECIAL, PUNITIVE,
    INCIDENTAL OR CONSEQUENTIAL LOSS, DAMAGE, COST OR EXPENSE OF ANY KIND
    WHATSOEVER RELATED TO THE SOFTWARE, HOWEVER CAUSED, EVEN IF MICROCHIP HAS
    BEEN ADVISED OF THE POSSIBILITY OR THE DAMAGES ARE FORESEEABLE. TO THE
    FULLEST EXTENT ALLOWED BY LAW, MICROCHIP'S TOTAL LIABILITY ON ALL CLAIMS IN
    ANY WAY RELATED TO THIS SOFTWARE WILL NOT EXCEED THE AMOUNT OF FEES, IF ANY,
    THAT YOU HAVE PAID DIRECTLY TO MICROCHIP FOR THIS SOFTWARE.

    MICROCHIP PROVIDES THIS SOFTWARE CONDITIONALLY UPON YOUR ACCEPTANCE OF THESE
    TERMS.
*/

/**
  Section: Included Files
 */


// MAX30100 Slave Address
declare const  MAX30100_ADDR  = 0x57

// Interrupt Flags
declare const  MAX30100_POWER_RDY   =    0x01
declare const  MAX30100_SPO2_RDY     =   0x10
declare const  MAX30100_HR_RDY      =    0x20
declare const  MAX30100_TEMP_RDY    =    0x40
declare const  MAX30100_FIFO_FULL   =    0x80

// Status
declare const  READY       =    0x01
declare const  N_READY    =     0x00
declare const  ENABLED    =     0x01
declare const  DISABLED     =   0x00
declare const  RESERVED      =  0x00

// Mode Select
declare const  MAX30100_HR_ONLY     =    0x02
declare const  MAX30100_SPO2_EN      =   0x03

// SPO2 Sample Rate (SPS)
declare const  MAX30100_SR50          =  0x00
declare const  MAX30100_SR100         = 0x01
declare const  MAX30100_SR167          = 0x02
declare const  MAX30100_SR200          = 0x03
declare const  MAX30100_SR400          = 0x04
declare const  MAX30100_SR600      =     0x05
declare const  MAX30100_SR800   =        0x06
declare const  MAX30100_SR1000  =        0x07

// LED Pulse Width
declare const  MAX30100_PW200  =         0x00
declare const  MAX30100_PW400   =        0x01
declare const  MAX30100_PW800   =        0x02
declare const  MAX30100_PW1600  =        0x03






class interrupt_stat_register  {
    registerValue:number;

    constructor() {
        this.registerValue = 0;
    }
    get interruptStat() {
        return this.registerValue
      }
    set interruptStat(value) {
        this.registerValue = value
      }

    get pwr_rdy() {
      return (this.registerValue & 0x01)
    }

    set pwr_rdy(value) {
        this.registerValue = (this.registerValue & ~0x01) | (0x01 & value)
        
    }
    
    get spo2_rdy() {
        return (this.registerValue>>4 & 0x01)
      }
  
      set spo2_rdy(value) {
          this.registerValue = (this.registerValue & ~0x10) | (0x10 & (value<<4))
          
      }
      get hr_rdy() {
        return (this.registerValue>>5  & 0x01)
      }
  
      set hr_rdy(value) {
          this.registerValue = (this.registerValue & ~0x20) | (0x20 & (value<<5))
          
      }
      get temp_rdy() {
        return (this.registerValue>>6 & 0x01)
      }
  
      set temp_rdy(value) {
          this.registerValue = (this.registerValue & ~0x40) | (0x40 & (value<<6))
          
      }
      get fifo_afull() {
        return (this.registerValue>>7 & 0x01)
      }
  
      set fifo_afull(value) {
          this.registerValue = (this.registerValue & ~0x80) | (0x80 & (value<<7))
          
      }
      
  }
  let interrupt_stat_bits = new interrupt_stat_register

  class interrupt_en_register  {
    registerValue: number;
    constructor() {
        this.registerValue = 0;
    }
    get interruptEn() {
        return this.registerValue
      }
    set interruptEn(value) {
        this.registerValue = value
      }

    get pwr_rdy() {
      return this.registerValue & 0x01
    }

    set pwr_rdy(value) {
        this.registerValue = (this.registerValue & ~0x01) | (0x01 & value)
        
    }
    
    get en_spo2_rdy() {
        return (this.registerValue>>4 & 0x01)
      }
  
      set en_spo2_rdy(value) {
          this.registerValue = (this.registerValue & ~0x10) | (0x10 & (value<<4))
          
      }
      get en_hr_rdy() {
        return (this.registerValue>>5 & 0x01)
      }
  
      set en_hr_rdy(value) {
          this.registerValue = (this.registerValue & ~0x20) | (0x20 & (value<<5))
          
      }
      get en_temp_rdy() {
        return (this.registerValue>>6 & 0x01)
      }
  
      set en_temp_rdy(value) {
          this.registerValue = (this.registerValue & ~0x40) | (0x40 & (value<<6))
          
      }
      get en_fifo_afull() {
        return (this.registerValue>>7 & 0x01)
      }
  
      set en_fifo_afull(value) {
          this.registerValue = (this.registerValue & ~0x80) | (0x80 & (value<<7))
          
      }
      
  }
  let interrupt_en_bits = new interrupt_en_register
 
  class mode_config_register  {
    registerValue: number;
    constructor(initialValue:number) {
        this.registerValue =initialValue;
    }
    get modeConfig() {
        return this.registerValue
      }
    set modeConfig(value) {
        this.registerValue = value
      }

    get mode() {
      return this.registerValue & 0x07
    }

    set mode(value) {
        this.registerValue = (this.registerValue & ~0x07) | (0x07 & value)
        
    }
    
    get temp_en() {
        return (this.registerValue>>3 & 0x01)
      }
  
      set temp_en(value) {
          this.registerValue = (this.registerValue & ~0x08) | (0x08 & (value<<3))
          
      }
      get reset() {
        return (this.registerValue>>6 & 0x01)
      }
  
      set reset(value) {
          this.registerValue = (this.registerValue & ~0x40) | (0x40 & (value<<6))
          
      }
      get shdn() {
        return (this.registerValue>>7 & 0x01)
      }
  
      set shdn(value) {
          this.registerValue = (this.registerValue & ~0x80) | (0x80 & (value<<7))
          
      }
      
  }

  let mode_config_bits = new mode_config_register(0)
 
 class spo2_config_register  {
    registerValue: number
    constructor() {
        this.registerValue = 0;
    }
    get spo2Config() {
        return this.registerValue
      }
    set spo2Config(value) {
        this.registerValue = value
      }

    get led_pw() {
      return this.registerValue & 0x03
    }

    set led_pw(value) {
        this.registerValue = (this.registerValue & ~0x03) | (0x03 & value)
        
    }
    
    get spo2_sr() {
        return (this.registerValue>>2) & 0x03
      }
  
      set spo2_sr(value) {
          this.registerValue = (this.registerValue & ~0x0C) | (0x0C & (value<<2))
          
      }
 
      get spo2_hires_en() {
        return (this.registerValue>>6) & 0x01 
      }
  
      set spo2_hires_en(value) {
          this.registerValue = (this.registerValue & ~0x40) | (0x40 & (value<<6))
          
      }
 
      
  }
  let spo2_config_bits = new spo2_config_register

  class led_config_register  {
    registerValue: number;
    constructor() {
        this.registerValue = 0;
    }
    get ledConfig() {
        return this.registerValue
      }
    set ledConfig(value) {
        this.registerValue = value
      }

    get ir_pa() {
      return this.registerValue & 0x0F
    }

    set ir_pa(value) {
        this.registerValue = (this.registerValue & ~0x0F) | (0x0F & value)
        
    }
    
    get red_pa() {
        return (this.registerValue>>4) & 0x0F
      }
  
      set red_pa(value) {
          this.registerValue = (this.registerValue & ~0xF0) | (0xF0 & (value<<4))
          
      }
 
    
 
      
  }
  let led_config_bits = new led_config_register

  /**
  Section: Variable Definitions
 */

let irFilters = {
     v_ctr:[0,0],
    dcW: 0.0
};


   declare const BEATDETECTOR_STATE_INIT = 0
   declare const   BEATDETECTOR_STATE_WAITING = 1
   declare const  BEATDETECTOR_STATE_FOLLOWING_SLOPE = 2
   declare const  BEATDETECTOR_STATE_MAYBE_DETECTED =3
   declare const  BEATDETECTOR_STATE_MASKING = 4



let sampRate:number;

let bpmRate = 0;
let  irData:number;




let  ir_data:number;
 let  red_data:number;
let temp_int:number;
let temp_frac:number;
  
 let  fifo_buff:number[]=[];
  let  temp_buff:number[]=[];

let normalizedHR = 0; //Heart rate signal normalized between 0 and 100 (great for neopixels)

declare const IR_ACTIVE_THRESHOLD = 10000 //Used as a threshold to detect if a finger is on the sensor or not
  declare const  RATE_SIZE = 6; //Increase this for more averaging. 4 is good.
let rates:number[]= []; //Array of heart rates
rates.fill(0,0,RATE_SIZE) //Fill the array with 0's to prevent a NaN later
let rateSpot = 0;
let lastBeat = 0; //Time at which the last beat occurred

let beatsPerMinute= 0;
let beatAvg = 0;

let IR_AC_Max = 20;
let IR_AC_Min = -20;

let IR_AC_Signal_Current = 0;
let IR_AC_Signal_Previous = 0;
let IR_AC_Signal_min = 0;
let IR_AC_Signal_max = 0;
let IR_Average_Estimated;

let positiveEdge = 0;
let negativeEdge = 0;
let ir_avg_reg = 0;

let cbuf:number[] = [];
let offset = 0;
let FIRCoeffs:number[] = [172, 321, 579, 927, 1360, 1858, 2390, 2916, 3391, 3768, 4012, 4096];

//  Heart Rate Monitor functions takes a sample value and the sample number
//  Returns true if a beat is detected
//  A running average of four samples is recommended for display on the screen.
function checkForHRBeat( sample:number,boardID:BoardID):boolean
{
  let beatDetected = false;

  //  Save current state
  IR_AC_Signal_Previous = IR_AC_Signal_Current;
  
  //This is good to view for debugging
 
  //Serial.print("Signal_Current: ");
  //Serial.println(IR_AC_Signal_Current);

  //  Process next data sample
  IR_Average_Estimated = averageDCEstimator(ir_avg_reg, sample,boardID);
  IR_AC_Signal_Current = lowPassFIRFilter(sample - IR_Average_Estimated,boardID);

  if(sample>IR_ACTIVE_THRESHOLD)
  {
    normalizedHR = (IR_AC_Signal_Current - IR_AC_Min)/(IR_AC_Max-IR_AC_Min) * 100; //Normalize the current signal between 0 and 1 then multiply by 100 for percent
  }
  else
  {
   
        normalizedHR = 0;
    
  }
  //  Detect positive zero crossing (rising edge)
  if ((IR_AC_Signal_Previous < 0) && (IR_AC_Signal_Current >= 0))
  {
  
    IR_AC_Max = IR_AC_Signal_max; //Adjust our AC max and min
    IR_AC_Min = IR_AC_Signal_min;

    positiveEdge = 1;
    negativeEdge = 0;
    IR_AC_Signal_max = 0;


 
    //if ((IR_AC_Max - IR_AC_Min) > 100 && (IR_AC_Max - IR_AC_Min) < 1000)
    if (((IR_AC_Max - IR_AC_Min) > 20 && (IR_AC_Max - IR_AC_Min) < 1000)&&sample>10000)
    {
      //Heart beat!!!
      beatDetected = true;

      
    }
  
  }

  //  Detect negative zero crossing (falling edge)
  if ((IR_AC_Signal_Previous > 0) && (IR_AC_Signal_Current <= 0))
  {
    positiveEdge = 0;
    negativeEdge = 1;
    IR_AC_Signal_min = 0;
  }

  //  Find Maximum value in positive cycle
  if (positiveEdge && (IR_AC_Signal_Current > IR_AC_Signal_Previous))
  {
    IR_AC_Signal_max = IR_AC_Signal_Current;
  }

  //  Find Minimum value in negative cycle
  if (negativeEdge && (IR_AC_Signal_Current < IR_AC_Signal_Previous))
  {
    IR_AC_Signal_min = IR_AC_Signal_Current;
  }
  
  return(beatDetected);
}

//  Average DC Estimator
function averageDCEstimator(p:number,  x:number,boardID:BoardID):number
{
  p += ((( x << 15) - p) >> 4);
  ir_avg_reg = p;
  return (p >> 15);
}

//  Low Pass FIR Filter
function lowPassFIRFilter( din:number,boardID:BoardID):number
{  
  cbuf[offset] = din;

  let z = mul16(FIRCoeffs[11], cbuf[(offset - 11) & 0x1F],boardID);
  
  for (let i = 0 ; i < 11 ; i++)
  {
    z += mul16(FIRCoeffs[i], cbuf[(offset - i) & 0x1F] + cbuf[(offset - 22 + i) & 0x1F],boardID);
  }

  offset++;
  offset %= 32; //Wrap condition

  return(z >> 15);
}

//  Integer multiplier
function mul16( x:number,  y:number,boardID:BoardID):number
{
  return(x * y);
}
/**
  Section: Driver APIs
 */

/* Get Measurements */

function MAX30100_readSensors(boardID:BoardID) 
{
    MAX30100_clearCounters(boardID);

    if (mode_config_bits.mode == MAX30100_HR_ONLY) 
	{
        while (!MAX30100_isHrRdy(boardID))
		{
		}
    } 
	else if (mode_config_bits.mode == MAX30100_SPO2_EN) 
	{
        while (!MAX30100_isSpo2Rdy(boardID))
		{
		}
    }

    MAX30100_readFifoData(boardID);
}

 function MAX30100_readTemp(boardID:BoardID) 
{
    MAX30100_startTemp(boardID);
    control.waitMicros(29000);

    while (!MAX30100_isTempRdy(boardID))
	{
	}
    temp_buff = MAX30100_readBlock(MAX30100_TEMP_INT_REG, 2,boardID);

    temp_int = temp_buff[0];
    temp_frac = temp_buff[1]*0.0625;
}

export function MAX30100_getIRdata(boardID:BoardID) :number
{
    return ir_data;
}

export function MAX30100_getREDdata(boardID:BoardID)  :number 
{
    return red_data;
}

function MAX30100_getTemp(boardID:BoardID)  :number
{
    return (temp_int + temp_frac);
}

/* Setup the Sensor */

 function MAX30100_setMode( mode:number,boardID:BoardID)  
{
    switch (mode) {
        case MAX30100_HR_ONLY:
            mode_config_bits.mode = MAX30100_HR_ONLY;
            break;
        case MAX30100_SPO2_EN:
            mode_config_bits.mode = MAX30100_SPO2_EN;
            break;
        default: break;
    }
}

 function MAX30100_setHiResEnabled( hiResEnable:number,boardID:BoardID) 
{
    spo2_config_bits.spo2_hires_en = hiResEnable;
}

 function MAX30100_setSampleRate( sampRate:number,boardID:BoardID) 
{
    spo2_config_bits.spo2_sr = sampRate;
}

 function MAX30100_setPulseWidth( pWidth:number,boardID:BoardID) 
{
    spo2_config_bits.led_pw = pWidth;
}

 function MAX30100_setIRLEDCurrent( irCurrent:number,boardID:BoardID) 
{
    led_config_bits.ir_pa = irCurrent;
}

 function MAX30100_setREDLEDCurrent( redCurrent:number,boardID:BoardID) 
{
    led_config_bits.red_pa = redCurrent;
}

/* Interrupts */

 function MAX30100_setSpo2RdyInterrupt( interruptEnabled:number,boardID:BoardID) 
{
    interrupt_en_bits.en_spo2_rdy = interruptEnabled;
}

 function MAX30100_setHrRdyInterrupt( interruptEnabled:number,boardID:BoardID) 
{
    interrupt_en_bits.en_hr_rdy = interruptEnabled;
}

 function MAX30100_setTempRdyInterrupt( interruptEnabled:number,boardID:BoardID) 
{
    interrupt_en_bits.en_temp_rdy = interruptEnabled;
}

 function MAX30100_setFifoAfullInterrupt( interruptEnabled:number,boardID:BoardID) 
{
    interrupt_en_bits.en_fifo_afull = interruptEnabled;
}

function MAX30100_isPowerRdy(boardID:BoardID):number
{
    interrupt_stat_bits.interruptStat = MAX30100_readByte(MAX30100_INTERRUPT_STAT_REG,boardID);
    return interrupt_stat_bits.pwr_rdy;
}

function MAX30100_isSpo2Rdy(boardID:BoardID):number
{
    interrupt_stat_bits.interruptStat = MAX30100_readByte(MAX30100_INTERRUPT_STAT_REG,boardID);
    return interrupt_stat_bits.spo2_rdy;
}

function MAX30100_isHrRdy(boardID:BoardID):number 
{
    interrupt_stat_bits.interruptStat = MAX30100_readByte(MAX30100_INTERRUPT_STAT_REG,boardID);
    return interrupt_stat_bits.hr_rdy;
}

function MAX30100_isTempRdy(boardID:BoardID):number 
{
    interrupt_stat_bits.temp_rdy = MAX30100_readByte(MAX30100_INTERRUPT_STAT_REG,boardID);
    return interrupt_stat_bits.temp_rdy;
}

function MAX30100_isFifoAfull(boardID:BoardID):number
{
    interrupt_stat_bits.interruptStat = MAX30100_readByte(MAX30100_INTERRUPT_STAT_REG,boardID);
    return interrupt_stat_bits.fifo_afull;
}

/* Initialize MAX30100 */

function  MAX30100_initializeSensor(boardID:BoardID) 
{
     let I2CM_dataBuffer:number[] = [];

    MAX30100_reset(boardID);

    // Initialize Settings
    interrupt_stat_bits.interruptStat = 0x00;
    mode_config_bits.shdn = DISABLED;
    mode_config_bits.reset = DISABLED;

    // Interrupts
    I2CM_dataBuffer[0] = MAX30100_INTERRUPT_STAT_REG;
    I2CM_dataBuffer[1] = interrupt_stat_bits.interruptStat;
    I2CM_dataBuffer[2] = interrupt_en_bits.interruptEn;
    MAX30100_writeBlock(I2CM_dataBuffer, 3,boardID);

    // Configurations
    I2CM_dataBuffer[0] = MAX30100_MODE_CONFIG_REG;
    I2CM_dataBuffer[1] = mode_config_bits.modeConfig;
    I2CM_dataBuffer[2] = spo2_config_bits.spo2Config;
    I2CM_dataBuffer[3] = RESERVED;
    I2CM_dataBuffer[4] = led_config_bits.ledConfig;
    MAX30100_writeBlock(I2CM_dataBuffer, 5,boardID);
}

/* Update Sensor Set-up */

 function MAX30100_updateSensorConfig(boardID:BoardID) 
{
     let I2CM_dataBuffer:number[]=[];

    I2CM_dataBuffer[0] = MAX30100_MODE_CONFIG_REG;
    I2CM_dataBuffer[1] = mode_config_bits.modeConfig;
    I2CM_dataBuffer[2] = spo2_config_bits.spo2Config;
    MAX30100_writeBlock(I2CM_dataBuffer, 3,boardID);
}

 function MAX30100_updateLEDCurrent(boardID:BoardID) 
{
    MAX30100_writeByte(MAX30100_LED_CONFIG_REG, led_config_bits.ledConfig,boardID);
}

 function MAX30100_updateEnabledInterrupts(boardID:BoardID) 
{
    MAX30100_writeByte(MAX30100_INTERRUPT_EN_REG, interrupt_en_bits.interruptEn,boardID);
}

/* FIFO Operations */




 function MAX30100_clearCounters(boardID:BoardID)
{
     let I2CM_dataBuffer:number[] = [];

    let fifo_wr_ptr = 0x00;
    let ovf_ctr = 0x00;
    let fifo_rd_ptr = 0x00;

    I2CM_dataBuffer[0] = MAX30100_FIFO_WR_PTR_REG;
    I2CM_dataBuffer[1] = fifo_wr_ptr;
    I2CM_dataBuffer[2] = ovf_ctr;
    I2CM_dataBuffer[3] = fifo_rd_ptr;

    MAX30100_writeBlock(I2CM_dataBuffer, 4,boardID);
}

 function MAX30100_readFifoData(boardID:BoardID) 
{
    fifo_buff = MAX30100_readBlock(MAX30100_FIFO_DATA_REG, 4,boardID);

    ir_data = (fifo_buff[0] << 8) | fifo_buff[1];
    red_data = (fifo_buff[2] << 8) | fifo_buff[3];
    ir_data = Shift_Bits(ir_data);
   
    red_data = Shift_Bits(red_data);
}

/* Misc. Operations */

 function MAX30100_reset(boardID:BoardID)
{
    mode_config_bits.reset = ENABLED;
    MAX30100_writeByte(MAX30100_MODE_CONFIG_REG, mode_config_bits.modeConfig,boardID);
}

function MAX30100_wakeup(boardID:BoardID) 
{
    mode_config_bits.shdn = DISABLED;
    MAX30100_writeByte(MAX30100_MODE_CONFIG_REG, mode_config_bits.modeConfig,boardID);
}

function MAX30100_shutdown(boardID:BoardID) 
{
    mode_config_bits.shdn = ENABLED;
    MAX30100_writeByte(MAX30100_MODE_CONFIG_REG, mode_config_bits.modeConfig,boardID);
}

 function MAX30100_getRevID(boardID:BoardID):number 
{
    return MAX30100_readByte(MAX30100_REV_ID_REG,boardID);
}

 function MAX30100_getPartID(boardID:BoardID):number  
{
    return MAX30100_readByte(MAX30100_PART_ID_REG,boardID);
}


function  MAX30100_startTemp(boardID:BoardID) 
{
    mode_config_bits.temp_en = ENABLED;
    MAX30100_writeByte(MAX30100_MODE_CONFIG_REG, mode_config_bits.modeConfig,boardID);
}

function  Shift_Bits( read_res:number) 
{
    let shift_res:number;
    switch (spo2_config_bits.led_pw) {
        case MAX30100_PW200: shift_res = read_res >> 3;
            break;
        case MAX30100_PW400: shift_res = read_res >> 2;
            break;
        case MAX30100_PW800: shift_res = read_res >> 1;
            break;
        default: shift_res = read_res;
            break;
    }
    return shift_res;
}

function  MAX30100_writeByte(register:number,dataByte:number,boardID:BoardID)
{
    let data:number[] = [dataByte]
    writeMAX30100(data, register, boardID);
}

function  MAX30100_writeBlock( write_buff:number[],  length:number,boardID:BoardID) 
{
  

    let i2cBuffer = pins.createBuffer(length) //Create a buffer to send over I2C
   

        for (let i=0;i<length;i++)
        {
            i2cBuffer.setNumber(NumberFormat.UInt8LE, i, write_buff[i]) //The remaining item(s) in the buffer is(are) the value(s) to send
        
        }


        I2Cs.i2cWriteBuffer(getMAX30100Addr(boardID),i2cBuffer,boardID); //Send the I2C buffer


}

function  MAX30100_readByte( reg_addr:number, boardID:BoardID):number
{
    return readMAX30100(1,reg_addr,boardID)[0];
}

function readMAX30100( numBytes:number, register:number,  boardID:BoardID):number[]
        {
           
            
            I2Cs.i2cWriteNumber(getMAX30100Addr(boardID),register,NumberFormat.UInt8LE,boardID,true)
           let i2cBuffer = I2Cs.I2CreadNoMem(getMAX30100Addr(boardID) ,numBytes,boardID);

            let dataArray:number[] = []; //Create an array to hold our read values
            for(let i=0; i<numBytes;i++)
            {
                dataArray[i] = i2cBuffer.getUint8(i); //Extract byte i from the buffer and store it in position i of our array
            }
           
            
            return  dataArray
    
                
        
        }





    //%blockId=MAX30100_write
        //%block="Write array %values to MAX30100 register%register on click%boardID ?"
        //% blockGap=7
        //% advanced=true
        export function writeMAX30100(values:number[],register:number,boardID:BoardID)
        {
        
        
            let i2cBuffer = pins.createBuffer(values.length+1) //Create a buffer to send over I2C
            i2cBuffer.setNumber(NumberFormat.UInt8LE, 0, register) //The first item in the buffer is the register address

        for (let i=0;i<values.length;i++)
        {
            i2cBuffer.setNumber(NumberFormat.UInt8LE, i+1, values[i]) //The remaining item(s) in the buffer is(are) the value(s) to send
           
        }
    
        
        I2Cs.i2cWriteBuffer(getMAX30100Addr(boardID),i2cBuffer,boardID); //Send the I2C buffer
         
        }
       


        
        
      export function MAX30100_readBlock( reg_addr:number,numBytes:number, boardID:BoardID):number[] 
        {
           
            
            I2Cs.i2cWriteNumber(getMAX30100Addr(boardID),reg_addr,NumberFormat.UInt8LE,boardID,true)
           let i2cBuffer = I2Cs.I2CreadNoMem(getMAX30100Addr(boardID) ,numBytes,boardID);

            let dataArray:number[] = []; //Create an array to hold our read values
            for(let i=0; i<numBytes;i++)
            {
                dataArray[i] = i2cBuffer.getUint8(i); //Extract byte i from the buffer and store it in position i of our array
            }
           
            
            return  dataArray
    
                
        
        }
        
        
        function setMAX30100Addr(deviceAddr:number,boardID:BoardID)
        {
            deviceAddress = deviceAddr;
        }
        function getMAX30100Addr(boardID:BoardID):number
        {
            return deviceAddress;
        }


        //Application code


        /**
  Section: Example Code
 */

function HeartRate_example(boardID:BoardID) 
{
  
    bpmRate = 0;
    let delta = 0;
    //sampRate = getSampRate(boardID);

  


    control.inBackground(function () {
        while(1){
            basic.pause(sampRate)
          
            //checkSample(boardID);
            HeartRate_readSensors(boardID);
            irData = HeartRate_getIRdata(boardID);
            if (checkForHRBeat(irData,boardID) == true)
            {
              //We sensed a beat!
              let delta = input.runningTime() - lastBeat;
              lastBeat = input.runningTime();
          
              beatsPerMinute = 60 / (delta / 1000.0);
          
              if (beatsPerMinute < 255 && beatsPerMinute > 20)
              {
                rates[rateSpot++] = beatsPerMinute; //Store this reading in the array
                rateSpot %= RATE_SIZE; //Wrap variable
          
                //Take average of readings
                bpmRate = 0;
                for (let x = 0 ; x < RATE_SIZE ; x++){
                    bpmRate += rates[x];
                }
                bpmRate /= RATE_SIZE;
              }
            }

        }
       
    

        
    })


}




     //%blockId=Heart_Rate_getBPMRate
    //%block="Get beats per minute on click%boardID"
    //% blockGap=7
    //% advanced=false
    export function BPMRate(boardID:BoardID):number 
    {
        if(isInitialized== 0)
        {
            initialize(boardID)
            
        }

        if(HeartRate_getIRdata(boardID)<IR_ACTIVE_THRESHOLD || bpmRate <0)
        {
            bpmRate = 0
        }
        return Math.round(bpmRate);
    }
    /**
     * The current value of IR reflection normalized between 0 and 100 (Great for neopixels)
     * @param boardID the location of the click board being used
     */
    //%blockId=Heart_Rate_getHRSignal
    //%block="Get raw HR signal on click%boardID"
    //% blockGap=7
    //% advanced=false
    export function pulse(boardID:BoardID):number 
    {
        if(isInitialized== 0)
        {
            initialize(boardID)
            
        }
        return Math.round(normalizedHR);
    }


    

function HeartRate_readSensors(boardID:BoardID) 
{
    if (!heartrate_initialized) {
        HeartRate_initializeClick(boardID );
    }
    MAX30100_readSensors(boardID);
}

function HeartRate_getIRdata(boardID:BoardID) 
{
    return MAX30100_getIRdata(boardID);
}

function HeartRate_getREDdata(boardID:BoardID) 
{
    return MAX30100_getREDdata(boardID);
}

function HeartRate_getTemperature(boardID:BoardID) 
{
    if (!heartrate_initialized) 
	{
        HeartRate_initializeClick(boardID);
    }

    MAX30100_readTemp(boardID);
    return MAX30100_getTemp(boardID);
}

function HeartRate_initializeClick(boardID:BoardID) 
{
    MAX30100_setSpo2RdyInterrupt(SPO2_INTERRUPT_EN,boardID);
    MAX30100_setHrRdyInterrupt(HR_INTERRUPT_EN,boardID);
    MAX30100_setTempRdyInterrupt(TEMP_INTERRUPT_EN,boardID);
    MAX30100_setFifoAfullInterrupt(FIFO_INTERRUPT_EN,boardID);

    MAX30100_setMode(DEFAULT_MODE,boardID);
    MAX30100_setHiResEnabled(DEFAULT_HIRES_SET,boardID);
    MAX30100_setSampleRate(DEFAULT_SAMP_RATE,boardID);
    MAX30100_setPulseWidth(DEFAULT_PWIDTH,boardID);
    MAX30100_setIRLEDCurrent(DEFAULT_IR_CURRENT,boardID);
    MAX30100_setREDLEDCurrent(DEFAULT_RED_CURRENT,boardID);

    MAX30100_initializeSensor(boardID);

    heartrate_initialized = 1;
}

        
    }