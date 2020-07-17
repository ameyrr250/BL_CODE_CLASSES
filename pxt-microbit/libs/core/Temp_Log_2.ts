/**
 * Custom blocks
 */
//% weight=100 color=#33BEBB icon=""
//% advanced=true
namespace Temp_Log_2{

    //% block="create Temp_Log settings"
    //% blockSetVariable="Temp_Log"
    //% weight=110
    export function createTemp_Log(): Temp_Log {
        return new Temp_Log();
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

    constructor(){
        super();

    this.isInitialized  = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    this.deviceAddress = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    }

    initialize(deviceAddr:number,clickBoardNum:clickBoardID)
    {
        //setTMP116Addr(deviceAddr,clickBoardNum)
        this.isInitialized[clickBoardNum]  = 1
        this.setTMP116Addr(deviceAddr,clickBoardNum)
        this.writeTMP116(this.TMP116_REG_CONFIG,0x0220,clickBoardNum) //Initialize the Config register
    
    }
    setTMP116Addr(deviceAddr:number,clickBoardNum:clickBoardID)
    {
        this.deviceAddress[clickBoardNum] = deviceAddr;
    }
    getTMP116Addr(clickBoardNum:clickBoardID):number
    {
        return this.deviceAddress[clickBoardNum];
    }
    readTMP116Reg(register:number,clickBoardNum:clickBoardID):number{
        return this.readTMP116(this.TMP116_REG_CONFIG,clickBoardNum)
    }
    
    readT(clickBoardNum:clickBoardID):number
    {
        return this.readTemperatureC(clickBoardNum);
    }
    
    
    writeTMP116(register:number,value:number,clickBoardNum:clickBoardID)
    {
    
    
        let i2cBuffer = pins.createBuffer(3)
    
        i2cBuffer.setNumber(NumberFormat.UInt8LE, 0, register)
        i2cBuffer.setNumber(NumberFormat.UInt8LE, 1, value >> 8) 
        i2cBuffer.setNumber(NumberFormat.UInt8LE, 2, value & 0xFF)
    
        this.i2cWriteBuffer(this.getTMP116Addr(clickBoardNum),i2cBuffer,clickBoardNum);
     
    }
    //Reads two consecutive bytes from a given location
    //Stores the result at the provided outputPointer
    readTMP116( register:number, clickBoardNum:clickBoardID):number
    {
        let i2cBuffer = pins.createBuffer(2);
    
        this.i2cWriteNumber(this.getTMP116Addr(clickBoardNum),register,NumberFormat.Int8LE,clickBoardNum,true)
    
     i2cBuffer = this.I2CreadNoMem(this.getTMP116Addr(clickBoardNum),2,clickBoardNum);
    let sReturn =  Math.roundWithPrecision(i2cBuffer.getNumber(NumberFormat.Int16BE,0),1)
    
    
    // let msb = i2cBuffer.getUint8(0)
    // let lsb = i2cBuffer.getUint8(1)
    
    //return  (msb << 8 | lsb)
    return sReturn
    
    }
    
    //%blockId=Temp_Log_readTemperatureC
    //%block="$this Get temperature in Celcius on click$clickBoardNum"
    //% blockGap=7
    //% advanced=false
    //% blockNamespace=Temp_Log_2
    //% this.shadow=variables_get
    //% this.defl="Temp_Log"
    readTemperatureC(clickBoardNum:clickBoardID):number
    {
    
    
        if(this.isInitialized[clickBoardNum] == 0)
        {
            this.initialize(this.TMP116_DEVICE_ADDRESS,clickBoardNum)
            
        }
        return (this.readTMP116(this.TMP116_REG_TEMP,clickBoardNum) * 0.0078125)
    }
    //%blockId=Temp_Log_readTemperatureF
    //%block="$this Get temperature in Fahrenheit on click$clickBoardNum"
    //% blockGap=7
    //% advanced=false
    //% blockNamespace=Temp_Log_2
    //% this.shadow=variables_get
    //% this.defl="Temp_Log"
    readTemperatureF(clickBoardNum:clickBoardID):number
    {
      
        return ((this.readTemperatureC(clickBoardNum))* 9.0/5.0 + 32.0)
    }
    
    readHighLimit(clickBoardNum:clickBoardID):number
    {
        return  (this.readTMP116(this.TMP116_REG_HIGH_LIMIT,clickBoardNum) * 0.0078125)
    }
    
    readLowLimit(clickBoardNum:clickBoardID): number
    {
    
        return  (this.readTMP116(this.TMP116_REG_LOW_LIMIT,clickBoardNum) * 0.0078125)
    }
    
    writeHighLimit( limit:number,clickBoardNum:clickBoardID)
    {
        this.writeTMP116(this.TMP116_REG_HIGH_LIMIT,(limit/0.0078125),clickBoardNum)
        
    }
    
    
    writeLowLimit(limit:number,clickBoardNum:clickBoardID)
    {
        this.writeTMP116(this.TMP116_REG_LOW_LIMIT,(limit/0.0078125),clickBoardNum)
        
    
    }
    
    readDeviceId(clickBoardNum:clickBoardID):number
    {
      
        return   (this.readTMP116(this.TMP116_REG_DEVICE_ID,clickBoardNum))
    }
    
    }

}
    
    