
// CCS811 Air quality sensor
//
// Written by Larry Bank - 11/4/2017
// Copyright (c) 2017 BitBank Software, Inc.
// bitbank@pobox.com
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.
//



//
// Opens a file system handle to the I2C device
// Starts the 'app' in the CCS811 microcontroller
// into continuous mode to read values every second
// Returns 0 for success, 1 for failure
//












  /**
 * Custom blocks
 */
//% weight=100 color=#33BEBB icon=""
//% advanced=false
namespace AirQuality2{
         //% block="create AirQuality settings"
    //% blockSetVariable="AirQuality"
    //% weight=110
    export function createAirQuality(): AirQuality {
        return new AirQuality();
    }

    let PINs = new bBoard.PinSettings();
    let I2Cs = new bBoard.I2CSettings();

    export enum humidity{
      
        //% block="5"
        five =5,
        //% block="10"
        ten = 10,
        //% block="15"
        fifteen = 15,
        //% block="20"
        twenty = 20,
        //% block="25"
        twentyfive = 25,
        //% block="30"
        thirty = 30,
        //% block="35"
        thirtyfive = 35,
            //% block="40"
            fourty = 40, 
            //% block="45"
            fourtyfive = 45,
            //% block="50"
            fifty = 50,
            //% block="55"
            fiftyfive = 55,
            //% block="60"
            sixety= 60,
            //% block="65"
            sixtyfive = 65,
            //% block="70"
            seventy = 70,
            //% block="75"
            seventyfive = 75,
            //% block="80"
        eighty = 80,
        //% block="85"
        eightyfive = 85,
            //% block="90"
            ninety = 90, 
            //% block="95"
            ninetyfive = 95,
            //% block="100"
            hundred = 100
      
    
    }
    
    
    export enum airQualityValue
    {
        eCO2,
        TVOC
    }

    export class AirQuality{

    readonly STATUS : number                           
    readonly MEAS_MODE : number                       
    readonly ALG_RESULT_DATA : number                  
    readonly RAW_DATA : number                  
    readonly ENV_DATA : number                  
    readonly THRESHOLDS : number                      
    readonly BASELINE : number                        
    readonly HW_ID : number
    readonly HW : number                              
    readonly FW_Boot_Version : number                  
    readonly FW_App_Version : number                  
    readonly Internal_State : number                  
    readonly ERROR_ID : number                        
    readonly APP_ERASE : number                       
    readonly APP_DATA : number                        
    readonly APP_VERIFY : number                      
    readonly APP_START : number                       
    readonly SW_RESET : number
    readonly CCS811_DEVICE_ADDRESS : number                        
    isInitialized : Array<number>;
    deviceAddress : Array<number>;
    constructor(){
        this.STATUS = 0x00
        this.MEAS_MODE = 0x01
        this.ALG_RESULT_DATA =0x02
        this.RAW_DATA =0x03
        this.ENV_DATA =0x05
        this.THRESHOLDS = 0x10
        this.BASELINE = 0x11
        this.HW_ID =0x20
        this.HW = 0x21
        this.FW_Boot_Version =0x23
        this.FW_App_Version = 0x24
        this.Internal_State = 0xA0
        this.ERROR_ID = 0xE0
        this.APP_ERASE = 0xF1
        this.APP_DATA = 0xF2
        this.APP_VERIFY = 0xF3
        this.APP_START = 0xF4
        this.SW_RESET = 0xFF
        this.CCS811_DEVICE_ADDRESS = 0x5A
        this.isInitialized  = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        this.deviceAddress = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    }
    
     
    initialize(deviceAddr:number,clickBoardNum:clickBoardID)
    {
    
        this.isInitialized[clickBoardNum]  = 1
        this.setCCS811Addr(deviceAddr,clickBoardNum);
        this.ccs811Init(clickBoardNum);
        //writeCCS811([0x20,0xff, 0xfc,0xa9, 0xf8, 0x80, 0xfa, 0xf0, 0x81, 0x0c, 0x80,0xf2, 0xff],clickBoardNum) //Initialize the Config register
    
    }

  

        //% blockNamespace=AirQuality
        //% this.shadow=variables_get
        //% this.defl="AirQuality"
        //%blockId=CCS811DataReady
        //%block="Is $this data ready on click%clickBoardNum ?"
        //% blockNamespace=AirQuality2
        //% blockGap=7
        //% advanced=false
    dataReady(clickBoardNum:clickBoardID):boolean
    {
    let statusReg = this.ccs811Status(clickBoardNum);
    
    if((statusReg & 0x08) == 0x08)
    {
        return true;
    }
        return false;
    
    }
    
    ccs811Init(clickBoardNum:clickBoardID)
    {
        let statusReg = 0;
    
        this.ccs811Reset(clickBoardNum);
        
        this.CCS811AppStart(clickBoardNum)
       statusReg =  this.ccs811Status(clickBoardNum);
        this.writeCCS811([0x10],this.MEAS_MODE,clickBoardNum); // constant power mode (001), no interrupts
        statusReg =  this.ccs811Status(clickBoardNum);
    
    
    } /* ccs811Init() */
    
    CCS811AppStart(clickBoardNum:clickBoardID)
    {
        PINs.clearPin(clickIOPin.CS,clickBoardNum)
        control.waitMicros(50); //according to datasheet, 50uS minimum to wake
        let i2cBuffer = pins.createBuffer(1)
        i2cBuffer.setNumber(NumberFormat.UInt8LE, 0, this.APP_START)      //0xF4 = App start command
        I2Cs.i2cWriteBuffer(this.getCCS811Addr(clickBoardNum),i2cBuffer,clickBoardNum);
        PINs.setPin(clickIOPin.CS,clickBoardNum)
    
    }
    
    //
    // Turn off the sensor and close the I2C handle
    //
    ccs811Shutdown(clickBoardNum:clickBoardID)
    {
        this.writeCCS811([0x00],this.MEAS_MODE,clickBoardNum); // Idle mode
    
    } /* ccs811Shutdown() */
    
    ccs811Status(clickBoardNum:clickBoardID):number
    {
        let returnValue = this.readCCS811(1,this.STATUS,clickBoardNum); // Idle mode
        this.readCCS811(1,this.MEAS_MODE,clickBoardNum)
        this.readCCS811(1,this.ERROR_ID,clickBoardNum)
        return returnValue[0]
    
    } /* ccs811Shutdown() */
    
    
    ccs811Reset(clickBoardNum:clickBoardID)
    {
    
        let resetSequence= [0x11, 0xE5, 0x72, 0x8A];
        
        this.writeCCS811(resetSequence,this.SW_RESET,clickBoardNum); // Idle mode
        control.waitMicros(100); //Wait for reset
    } /* ccs811Shutdown() */
    
    //
    // Set the calibration values of temperature and humidity
    // to provide more accurate air quality readings
    // Temperature in Celcius and Humidity as percent (50 = 50%)
    //
        
    
        //%blockId=CCS811Calibration
    //%block="Calibrate $this sensor to temperature $fTemp F and humidity $fHumid \\% on click$clickBoardNum"
    //% blockGap=7
    //% advanced=false
    //% blockNamespace=AirQuality2
    //% this.shadow=variables_get
    //% this.defl="AirQuality"
    ccs811SetCalibration(fTemp:number, fHumid:humidity, clickBoardNum:clickBoardID)
    {
    let i:number = 0;
    let ucTemp = [];
    
    if(this.isInitialized[clickBoardNum] == 0)
    {
        this.initialize(this.CCS811_DEVICE_ADDRESS,clickBoardNum)
        
    }
    
            i = (fHumid * 512); // convert to 512th fractions
            ucTemp[0] = (0xFF00)&&(i >> 8); // high byte
            ucTemp[1] = (0x00FF)&&i; // low byte
    
            i = ((fTemp  - 25.0) * 512.0); // offset of -25C
            ucTemp[2] = (0xFF00)&&(i >> 8); // high byte
            ucTemp[3] = (0x00FF)&&i; // low byte
            this.writeCCS811(ucTemp,this.ENV_DATA,clickBoardNum); // constant power mode (001), no interrupts
    
    } /* ccs811SetCalibration() */
    
    
    
        
    //%blockId=CCS811AirQuality
    //%block="Read $this $valueToRetrieve value on click$clickBoardNum"
    //% blockGap=7
    //% advanced=false
    //% blockNamespace=AirQuality2
    //% this.shadow=variables_get
    //% this.defl="AirQuality"
    ccs811AirQuality(valueToRetrieve:airQualityValue,clickBoardNum:clickBoardID):number
    {
        let ucTemp = [];
        let i:number;
        let rc:number;
        let eCO2value:number;
        let TVOCvalue:number;
    
        if(this.isInitialized[clickBoardNum] == 0)
        {
            this.initialize(this.CCS811_DEVICE_ADDRESS,clickBoardNum)
            
        }
        ucTemp = this.readCCS811(6,this.ALG_RESULT_DATA,clickBoardNum) 
    
    
            if (ucTemp[4] & 1) // error, read the error value
            {
                //error_ID = ucTemp[5] 
    
            }
            else //if ((ucTemp[4] & 0x99) == 0x98) // firmware valid and data ready
            {	
                eCO2value = (ucTemp[0] << 8) | ucTemp[1];
                TVOCvalue = (ucTemp[2] << 8) | ucTemp[3];
           //     serial.writeString("C02=")
            //    serial.writeNumber(eCO2value)
             //   serial.writeString("\r\n")
    
               // serial.writeString("TVOC=")
               // serial.writeNumber(TVOCvalue)
                //serial.writeString("\r\n")
              //  if (eCO2value > 2000 || TVOCvalue > 1200) // invalid values
            //	{
              //      return 0;
               // }	
    
                switch (valueToRetrieve)
                {
                    case airQualityValue.eCO2:
                        return eCO2value;
                        break;
                    
                    case airQualityValue.TVOC:
                        return TVOCvalue;
                        break;
    
                    default:
                        return 0;
                }
                
            }
            
        return 0;
    } /* ccs811ReadValues() */
    
    
    
    
    
       
            //%blockId=CCS811_write
            //%block="Write $this array $values to CCS811 register$register on click$clickBoardNum ?"
            //% blockGap=7
            //% advanced=true
            //% blockNamespace=AirQuality2
            //% this.shadow=variables_get
            //% this.defl="AirQuality"
            writeCCS811(values:number[],register:number,clickBoardNum:clickBoardID)
            {
            
                PINs.clearPin(clickIOPin.CS,clickBoardNum)
                control.waitMicros(50); //according to datasheet, 50uS minimum to wake
                let i2cBuffer = pins.createBuffer(values.length+1)
                i2cBuffer.setNumber(NumberFormat.UInt8LE, 0, register) 
    
                for (let i=0;i<values.length;i++)
                {
                    i2cBuffer.setNumber(NumberFormat.UInt8LE, i+1, values[i])
                
                }
        
            
                I2Cs.i2cWriteBuffer(this.getCCS811Addr(clickBoardNum),i2cBuffer,clickBoardNum);
                PINs.setPin(clickIOPin.CS,clickBoardNum)
             
            }
           
    
        
    
     
        
                 //%blockId=CCS811_read
                //%block="$this Read $numBytes bytes from register$register on click$clickBoardNum"
                //% blockGap=7
                //% advanced=true
                //% blockNamespace=AirQuality2
                //% this.shadow=variables_get
                //% this.defl="AirQuality"
                readCCS811 (numBytes:number, register:number,  clickBoardNum:clickBoardID):number[]
                {
                   
                    PINs.clearPin(clickIOPin.CS,clickBoardNum)
                    control.waitMicros(50); //according to datasheet, 50uS minimum to wake
                    I2Cs.i2cWriteNumber(this.getCCS811Addr(clickBoardNum),register,NumberFormat.UInt8LE,clickBoardNum,true)
                   let i2cBuffer = I2Cs.I2CreadNoMem(this.getCCS811Addr(clickBoardNum) ,numBytes,clickBoardNum);
        
                    let dataArray:number[] = []; //Create an array to hold our read values
                    for(let i=0; i<numBytes;i++)
                    {
                        dataArray[i] = i2cBuffer.getUint8(i); //Extract byte i from the buffer and store it in position i of our array
                    }
                   
                    PINs.setPin(clickIOPin.CS,clickBoardNum)
                    return  dataArray
            
                        
                
                }
        
        setCCS811Addr(deviceAddr:number,clickBoardNum:clickBoardID)
        {
            this.deviceAddress[clickBoardNum] = deviceAddr;
        }
        getCCS811Addr(clickBoardNum:clickBoardID):number
        {
            return this.deviceAddress[clickBoardNum];
        }
    
    
    }
    
    
}