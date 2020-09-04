/**
 * Custom blocks
 */
//% weight=100 color=#33BEBB icon=""
//% advanced=true
namespace Temp_Log_2{

    /**
     * Sets Temp_Log Click object.
     * @param clickBoardNum the clickBoardNum
     *  @param Temp_Log the Temp_Log Object
     */
    //% block=" $clickBoardNum $clickSlot"
    //% blockSetVariable="Temp_Log"
    //% weight=110
    export function createTemp_Log(clickBoardNum: clickBoardID, clickSlot:clickBoardSlot): Temp_Log {
        return new Temp_Log(clickBoardNum, clickSlot);
    }


    export class Temp_Log extends bBoard.I2CSettings{

    private readonly TMP116_REG_TEMP	= 0x00;
    private readonly TMP116_REG_CONFIG = 0x01;
    private readonly TMP116_REG_HIGH_LIMIT = 0x02;
    private readonly TMP116_REG_LOW_LIMIT= 0x03;	
    private readonly TMP116_REG_DEVICE_ID = 0x0F;
    private readonly TMP116_DEVICE_ADDRESS = 0x48;
    
    
    private isInitialized : Array<number>;
    private deviceAddress : Array<number>;

    private clickBoardNumGlobal:number
    private clickSlotNumGlobal:number
    
    constructor(clickBoardNum: clickBoardID, clickSlot:clickBoardSlot){
    super(clickBoardNum, clickSlot);
    this.clickBoardNumGlobal=clickBoardNum;
    this.clickSlotNumGlobal=clickSlot;
    this.isInitialized  = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    this.deviceAddress = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    }

    initialize(deviceAddr:number)
    {
        //setTMP116Addr(deviceAddr,clickBoardNum)
        this.isInitialized[this.clickBoardNumGlobal]  = 1
        this.setTMP116Addr(deviceAddr)
        this.writeTMP116(this.TMP116_REG_CONFIG,0x0220) //Initialize the Config register
    
    }
    setTMP116Addr(deviceAddr:number)
    {
        this.deviceAddress[this.clickBoardNumGlobal] = deviceAddr;
    }
    getTMP116Addr():number
    {
        return this.deviceAddress[this.clickBoardNumGlobal];
    }
    readTMP116Reg(register:number):number{
        return this.readTMP116(this.TMP116_REG_CONFIG)
    }
    
    readT():number
    {
        return this.readTemperatureC();
    }
    
    
    writeTMP116(register:number,value:number)
    {
    
    
        let i2cBuffer = pins.createBuffer(3)
    
        i2cBuffer.setNumber(NumberFormat.UInt8LE, 0, register)
        i2cBuffer.setNumber(NumberFormat.UInt8LE, 1, value >> 8) 
        i2cBuffer.setNumber(NumberFormat.UInt8LE, 2, value & 0xFF)
    
        this.i2cWriteBuffer(this.getTMP116Addr(),i2cBuffer);
     
    }
    //Reads two consecutive bytes from a given location
    //Stores the result at the provided outputPointer
    readTMP116( register:number):number
    {
        let i2cBuffer = pins.createBuffer(2);
    
        this.i2cWriteNumber(this.getTMP116Addr(),register,NumberFormat.Int8LE,true)
    
     i2cBuffer = this.I2CreadNoMem(this.getTMP116Addr(),2);
    let sReturn =  Math.roundWithPrecision(i2cBuffer.getNumber(NumberFormat.Int16BE,0),1)
    
    
    // let msb = i2cBuffer.getUint8(0)
    // let lsb = i2cBuffer.getUint8(1)
    
    //return  (msb << 8 | lsb)
    return sReturn
    
    }
    
    //%blockId=Temp_Log_readTemperatureC
    //%block="$this Get temperature in Celcius"
    //% blockGap=7
    //% advanced=false
    //% blockNamespace=Temp_Log_2
    //% this.shadow=variables_get
    //% this.defl="Temp_Log"
    readTemperatureC():number
    {
    
    
        if(this.isInitialized[this.clickBoardNumGlobal] == 0)
        {
            this.initialize(this.TMP116_DEVICE_ADDRESS)
            
        }
        return (this.readTMP116(this.TMP116_REG_TEMP) * 0.0078125)
    }
    //%blockId=Temp_Log_readTemperatureF
    //%block="$this Get temperature in Fahrenheit"
    //% blockGap=7
    //% advanced=false
    //% blockNamespace=Temp_Log_2
    //% this.shadow=variables_get
    //% this.defl="Temp_Log"
    readTemperatureF():number
    {
      
        return ((this.readTemperatureC())* 9.0/5.0 + 32.0)
    }
    
    readHighLimit():number
    {
        return  (this.readTMP116(this.TMP116_REG_HIGH_LIMIT) * 0.0078125)
    }
    
    readLowLimit(): number
    {
    
        return  (this.readTMP116(this.TMP116_REG_LOW_LIMIT) * 0.0078125)
    }
    
    writeHighLimit(limit:number)
    {
        this.writeTMP116(this.TMP116_REG_HIGH_LIMIT,(limit/0.0078125))
        
    }
    
    
    writeLowLimit(limit:number,clickBoardNum:clickBoardID)
    {
        this.writeTMP116(this.TMP116_REG_LOW_LIMIT,(limit/0.0078125))
        
    
    }
    
    readDeviceId(clickBoardNum:clickBoardID):number
    {
      
        return   (this.readTMP116(this.TMP116_REG_DEVICE_ID))
    }
    
    }

}
    
    