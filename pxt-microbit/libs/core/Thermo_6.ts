
/**
 * Custom blocks
 */
//% weight=100 color=#33BEBB icon=""
//% advanced=true
namespace Thermo_6{

    //% block="create Thermo settings"
    //% blockSetVariable="Thermo"
    //% weight=110
    export function createThermo(): Thermo {
        return new Thermo();
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

    constructor(){
        super();

    this.isInitialized  = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    this.deviceAddress = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    }
   
      //%blockId=Thermo6_getTempC
       //%block="$this Get the temperature in Celcius on click$clickBoardNum"
       //% blockGap=7
       //% advanced=false
       //% blockNamespace=Thermo_6
        //% this.shadow=variables_get
        //% this.defl="Thermo"
       getTempC(clickBoardNum:clickBoardID):number
       {
          
           if(this.isInitialized[clickBoardNum] == 0)
           {
            this.initialize(this.DEFAULT_I2C_ADDRESS,clickBoardNum)
               
           }
           let temp = this.readMAX31875( this.TEMP_REG, clickBoardNum)
           return temp/256
       
       
       }
   
        //%blockId=Thermo6_getTempF
       //%block="$this Get the temperature in Fahrenheit on click$clickBoardNum"
       //% blockGap=7
       //% advanced=false
       //% blockNamespace=Thermo_6
        //% this.shadow=variables_get
        //% this.defl="Thermo"
       getTempF(clickBoardNum:clickBoardID):number
       {
          
           if(this.isInitialized[clickBoardNum] == 0)
           {
            this.initialize(this.DEFAULT_I2C_ADDRESS,clickBoardNum)
               
           }
           let tempC = this.getTempC(clickBoardNum);
           let tempF = tempC * 9.0/5.0 + 32.0;

           return tempF
       
       
       }
   
        //%blockId=Thermo6_initialize
       //%block="$this Initalize with i2c address $deviceAddr on click$clickBoardNum"
       //% blockGap=7
       //% advanced=true
       //% blockNamespace=Thermo_6
        //% this.shadow=variables_get
        //% this.defl="Thermo"
   initialize(deviceAddr:number,clickBoardNum:clickBoardID)
   {
      
        this.isInitialized[clickBoardNum]  = 1
       this.setMAX31875Addr(deviceAddr,clickBoardNum)
       this.writeMAX31875(0x0066,this.CONFIG_REG,clickBoardNum) //Set PEC to off, 12 bit resolution and 8 samples/second
   
   
   }


    //%blockId=MAX31875_write
   //%block="$this Write $value to register$register on click$clickBoardNum"
   //% blockGap=7
   //% advanced=true
   //% blockNamespace=Thermo_6
    //% this.shadow=variables_get
    //% this.defl="Thermo"
   writeMAX31875(value:number,register:number,clickBoardNum:clickBoardID)
   {
   
   
       let i2cBuffer = pins.createBuffer(3)
   
       i2cBuffer.setNumber(NumberFormat.UInt8LE, 0, register)
       i2cBuffer.setNumber(NumberFormat.UInt8LE, 1, value>>8 ) 
       i2cBuffer.setNumber(NumberFormat.UInt8LE, 2, value & 0xFF)

   
       this.i2cWriteBuffer(this.getMAX31875Addr(clickBoardNum),i2cBuffer,clickBoardNum);
    
   }
   
        //%blockId=MAX31875_read
       //%block="$this Read from register$register on click$clickBoardNum"
       //% blockGap=7
       //% advanced=true
       //% blockNamespace=Thermo_6
        //% this.shadow=variables_get
        //% this.defl="Thermo"
    readMAX31875( register:number, clickBoardNum:clickBoardID):number
   {
       let i2cBuffer = pins.createBuffer(2);

       this.i2cWriteNumber(this.getMAX31875Addr(clickBoardNum),register,NumberFormat.UInt8LE,clickBoardNum,true)

       i2cBuffer = this.I2CreadNoMem(this.getMAX31875Addr(clickBoardNum),2,clickBoardNum);

 
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