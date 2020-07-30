
/**
 * Custom blocks
 */
//% weight=100 color=#33BEBB icon="↦"
//% advanced=true
namespace Proximity_2{
    enum Proximity2_Interrupts {ALS_INT, PROX_INT, NO_INT};
    let i2csettingsobj= new bBoard.I2CSettings();

    /**
     * Sets Proximity2 Click object.
     * @param clickBoardNum the clickBoardNum
     *  @param Proximity2 the Proximity2 Object
    */
    //% block="create Proximity2 settings on clickBoard $clickBoardNum"
    //% blockSetVariable="Proximity2"
    //% weight=110
    export function createProximity2Settings(clickBoardNum: clickBoardID): Proximity2 {
        return new Proximity2(clickBoardNum);
   }

    export class Proximity2{
     readonly INTERRUPT_STATUS : number
     readonly MAIN_CONFIGURATION : number
     readonly RECEIVE_CONFIGURATION : number
     readonly TRANSMIT_CONFIGURATION : number
     readonly ADC_HIGH_ALS : number
     readonly ADC_LOW_ALS : number
     readonly ADC_BYTE_PROX : number
     readonly ALS_UPPER_THRESHOLD_HIGH : number
     readonly ALS_UPPER_THRESHOLD_LOW : number
     readonly ALS_LOWER_THRESHOLD_HIGH : number
     readonly ALS_LOWER_THRESHOLD_LOW : number
     readonly THRESHOLD_PERSIST_TIMER : number
     readonly PROX_THRESHOLD_INDICATOR : number
     readonly PROX_THRESHOLD : number
     readonly DIGITAL_GAIN_TRIM_GREEN : number
     readonly DIGITAL_GAIN_TRIM_INFRARED : number
    
     readonly ADDRESS  : number;
    isInitialized : Array<number>;
    
    private clickBoardNumGlobal:number 
    
    constructor(clickBoardNum: clickBoardID){
    this.INTERRUPT_STATUS= 0x00
    this.MAIN_CONFIGURATION = 0x01
    this.RECEIVE_CONFIGURATION=   0x02
    this.TRANSMIT_CONFIGURATION=  0x03
    this.ADC_HIGH_ALS =   0x04
    this.ADC_LOW_ALS= 0x05
    this.ADC_BYTE_PROX=   0x16
    this.ALS_UPPER_THRESHOLD_HIGH =0x06
    this.ALS_UPPER_THRESHOLD_LOW = 0x07
    this.ALS_LOWER_THRESHOLD_HIGH =   0x08
    this.ALS_LOWER_THRESHOLD_LOW =0x09
    this.THRESHOLD_PERSIST_TIMER= 0x0A
    this.PROX_THRESHOLD_INDICATOR =   0x0B
    this.PROX_THRESHOLD = 0x0C
    this.DIGITAL_GAIN_TRIM_GREEN =0x0F
    this.DIGITAL_GAIN_TRIM_INFRARED = 0x10
    
    this.ADDRESS = 0b1001010;
    this.isInitialized  = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    this.clickBoardNumGlobal=clickBoardNum
    
    }

        //%blockId=Proximity2_ReadProximity
        //%block="Get $this proximity reading"
        //% blockGap=7
        //% weight=90   color=#9E4894 icon=""
        //% advanced=false
        //% blockNamespace=Proximity_2
        //% this.shadow=variables_get
        //% this.defl="ProximitySettings"
        Proximity2_Read_Proximity():number
        {
            if(this.isInitialized[this.clickBoardNumGlobal] == 0)
            {
                this.Proximity2_Initialize(this.clickBoardNumGlobal)
                
            }
            let val = this.Read_Proximity2_Register(this.ADC_BYTE_PROX,this.clickBoardNumGlobal);
            return val;
        }
        
        
        
        //%blockId=Proximity2_ReadALS
        //%block="Get $this ambient light reading"
        //% blockGap=7
        //% advanced=false
        //% blockNamespace=Proximity_2
        //% this.shadow=variables_get
        //% this.defl="ProximitySettings"
        Proximity2_Read_Als():number
        {
            if(this.isInitialized[this.clickBoardNumGlobal] == 0)
            {
                this.Proximity2_Initialize(this.clickBoardNumGlobal)
                
            }
            let val = (this.Read_Proximity2_Register(this.ADC_HIGH_ALS,this.clickBoardNumGlobal) << 8) | this.Read_Proximity2_Register(this.ADC_LOW_ALS,this.clickBoardNumGlobal);
            return val;
        }
    
    
    // Read a byte from register 'reg'
    Read_Proximity2_Register( reg:number,clickBoardNum:clickBoardID):number
    {
        let i2cBuffer = pins.createBuffer(2);
    
        i2csettingsobj.i2cWriteNumber(this.ADDRESS,reg,NumberFormat.Int8LE,clickBoardNum,true)
       
        i2cBuffer = i2csettingsobj.I2CreadNoMem(this.ADDRESS,1,clickBoardNum);
       
       
        return i2cBuffer.getUint8(0)
    }
    
    // Write byte 'byte' to register 'reg'
    Write_Proximity2_Register(reg:number,  byte:number,clickBoardNum:clickBoardID) 
    {
        let i2cBuffer = pins.createBuffer(2)
    
        i2cBuffer.setNumber(NumberFormat.UInt8LE, 0, reg)
        i2cBuffer.setNumber(NumberFormat.UInt8LE, 1, byte) 
       
    
        i2csettingsobj.i2cWriteBuffer(this.ADDRESS,i2cBuffer,clickBoardNum);
    
       
    }
    
    Proximity2_Read_Interrupt(clickBoardNum:clickBoardID):number
    {
        let val = this.Read_Proximity2_Register(this.INTERRUPT_STATUS,clickBoardNum);
        if (val & 0b1) 
        {
            return Proximity2_Interrupts.ALS_INT;
        } 
        else if (val & 0b10) 
        {
            return Proximity2_Interrupts.PROX_INT;
        } 
        else 
        {
            return Proximity2_Interrupts.NO_INT;
        }
    }
    
    Proximity2_Set_Threshold(  thresh:number,clickBoardNum:clickBoardID)
    {
        this.Write_Proximity2_Register(this.PROX_THRESHOLD, thresh,clickBoardNum);
    }
    
    // Setup the chip for proximity sensing
    Proximity2_Initialize(clickBoardNum:clickBoardID)
    {
        this.isInitialized[clickBoardNum] = 1;
        this.Write_Proximity2_Register(this.MAIN_CONFIGURATION, 0b110000,clickBoardNum);
        this.Write_Proximity2_Register(this.PROX_THRESHOLD_INDICATOR, 0b01000000,clickBoardNum);
        this.Write_Proximity2_Register(this.PROX_THRESHOLD_INDICATOR, 0b01000000,clickBoardNum);
        this.Write_Proximity2_Register(this.TRANSMIT_CONFIGURATION, 0b00001111,clickBoardNum);
    }
    
    Proximity2_Set_Als_Upper_Threshold(thresh:number,clickBoardNum:clickBoardID)
    {
        this.Write_Proximity2_Register( this.ALS_UPPER_THRESHOLD_HIGH, thresh >> 8,clickBoardNum);;
        this.Write_Proximity2_Register( this.ALS_UPPER_THRESHOLD_LOW, thresh & 0xFF,clickBoardNum);
    }
    
    Proximity2_Set_Als_Lower_Threshold(thresh:number,clickBoardNum:clickBoardID)
    {
        this.Write_Proximity2_Register( this.ALS_LOWER_THRESHOLD_HIGH, thresh >> 8,clickBoardNum);
        this.Write_Proximity2_Register( this.ALS_LOWER_THRESHOLD_LOW, thresh & 0xFF,clickBoardNum);
    }


    
    }
    
    
    
    
    
    }