
/**
 * Custom blocks
 */
//% weight=100 color=#33BEBB icon=""
//% advanced=true
namespace Thermo_6{

    /**
     * Sets Thermo Click object.
     * @param clickBoardNum the clickBoardNum
     *  @param Thermo the Thermo Object
    */
    //% block="create Thermo settings on clickBoard $clickBoardNum"
    //% blockSetVariable="Thermo"
    //% weight=110
    export function createThermo(clickBoardNum: clickBoardID): Thermo {
        return new Thermo(clickBoardNum);
   }

    export class Thermo extends bBoard.I2CSettings{
    //Address Definitions
    private readonly DEFAULT_I2C_ADDRESS =  0x48  
    private readonly TEMP_REG       = 0x00
    private readonly CONFIG_REG     = 0x01
    private readonly THYST_REG       = 0x02
    private readonly TOS_REG     = 0x03


    private isInitialized : Array<number>;
    private deviceAddress : Array<number>;

    private clickBoardNumGlobal:number 
    
    constructor(clickBoardNum: clickBoardID){
    super();
    this.isInitialized  = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    this.deviceAddress = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    this.clickBoardNumGlobal=clickBoardNum
    }
   
    //%blockId=Thermo6_getTempC
    //%block="$this Get the temperature in Celcius"
    //% blockGap=7
    //% advanced=false
    //% blockNamespace=Thermo_6
    //% this.shadow=variables_get
    //% this.defl="Thermo"
       getTempC():number
       {
          
           if(this.isInitialized[this.clickBoardNumGlobal] == 0)
           {
            this.initialize(this.DEFAULT_I2C_ADDRESS)
               
           }
           let temp = this.readMAX31875( this.TEMP_REG)
           return temp/256
       
       
       }
   
    //%blockId=Thermo6_getTempF
    //%block="$this Get the temperature in Fahrenheit"
    //% blockGap=7
    //% advanced=false
    //% blockNamespace=Thermo_6
    //% this.shadow=variables_get
    //% this.defl="Thermo"
       getTempF():number
       {
          
           if(this.isInitialized[this.clickBoardNumGlobal] == 0)
           {
            this.initialize(this.DEFAULT_I2C_ADDRESS)
               
           }
           let tempC = this.getTempC();
           let tempF = tempC * 9.0/5.0 + 32.0;

           return tempF
       
       
       }
   
    //%blockId=Thermo6_initialize
    //%block="$this Initalize with i2c address $deviceAddr"
    //% blockGap=7
    //% advanced=true
    //% blockNamespace=Thermo_6
    //% this.shadow=variables_get
    //% this.defl="Thermo"
   initialize(deviceAddr:number)
   {
      
        this.isInitialized[this.clickBoardNumGlobal]  = 1
       this.setMAX31875Addr(deviceAddr,this.clickBoardNumGlobal)
       this.writeMAX31875(0x0066,this.CONFIG_REG) //Set PEC to off, 12 bit resolution and 8 samples/second
   
   
   }


    //%blockId=MAX31875_write
    //%block="$this Write $value to register$register"
    //% blockGap=7
    //% advanced=true
    //% blockNamespace=Thermo_6
    //% this.shadow=variables_get
    //% this.defl="Thermo"
   writeMAX31875(value:number,register:number)
   {
   
   
       let i2cBuffer = pins.createBuffer(3)
   
       i2cBuffer.setNumber(NumberFormat.UInt8LE, 0, register)
       i2cBuffer.setNumber(NumberFormat.UInt8LE, 1, value>>8 ) 
       i2cBuffer.setNumber(NumberFormat.UInt8LE, 2, value & 0xFF)

   
       this.i2cWriteBuffer(this.getMAX31875Addr(this.clickBoardNumGlobal),i2cBuffer,this.clickBoardNumGlobal);
    
   }
   
    //%blockId=MAX31875_read
    //%block="$this Read from register$register"
    //% blockGap=7
    //% advanced=true
    //% blockNamespace=Thermo_6
    //% this.shadow=variables_get
    //% this.defl="Thermo"
    readMAX31875( register:number):number
   {
       let i2cBuffer = pins.createBuffer(2);

       this.i2cWriteNumber(this.getMAX31875Addr(this.clickBoardNumGlobal),register,NumberFormat.UInt8LE,this.clickBoardNumGlobal,true)

       i2cBuffer = this.I2CreadNoMem(this.getMAX31875Addr(this.clickBoardNumGlobal),2,this.clickBoardNumGlobal);

 
       let sReturn = Math.roundWithPrecision(i2cBuffer.getNumber(NumberFormat.Int16BE,0),1)
       return  sReturn

           
   
   }
   
   
   setMAX31875Addr(deviceAddr:number,clickBoardNum:clickBoardID)
   {
    this.deviceAddress[clickBoardNum] = deviceAddr;
   }
   getMAX31875Addr(clickBoardNum:clickBoardID):number
   {
       return this.deviceAddress[clickBoardNum];
   }


}
}