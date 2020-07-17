


  /**
 * Custom blocks
 */
//% weight=100 color=#33BEBB icon=""
//% advanced=true
namespace UV3{

    //% block="create UV3 settings"
    //% blockSetVariable="UV3"
    //% weight=110
    export function createUV3(): UV3 {
        return new UV3();
   }


    export class UV3 extends bBoard.I2CSettings{
    private readonly VEML6070_ADDR_ARA =(0x18 >> 1)
    private readonly  VEML6070_ADDR_CMD =(0x70 >> 1)
    private readonly  VEML6070_ADDR_DATA_LSB =(0x71 >> 1)
    private readonly  VEML6070_ADDR_DATA_MSB =(0x73 >> 1)
    // VEML6070 command register bits
    private readonly  VEML6070_CMD_SD =0x01
    private readonly  VEML6070_CMD_IT_0_5T = 0x00
    private readonly  VEML6070_CMD_IT_1T = 0x04
    private readonly  VEML6070_CMD_IT_2T= 0x08
    private readonly  VEML6070_CMD_IT_4T =0x0C
    private readonly  VEML6070_CMD_DEFAULT= 0x02
    private controlReg : number;
    
      
    
    private isInitialized : Array<number>;
    private deviceAddress : Array<number>;

    constructor(){
        super();
    this.controlReg=0;
    this.isInitialized  = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    this.deviceAddress = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    }
    
    
    initialize(clickBoardNum:clickBoardID)
    {
    
        this.isInitialized[clickBoardNum]  = 1
       
        this.controlReg = this.VEML6070_CMD_DEFAULT; //Int disabled, 1/2T (~ 60ms) and shutdown disabled. 

        this.writeVEML6070(this.controlReg,clickBoardNum)
 
        
    
    }


    
    
       
            //%blockId=VEML6070_write
            //%block="$this Write $value to VEML6070 control register on click$clickBoardNum"
            //% blockGap=7
            //% advanced=true
            //% blockNamespace=UV3
            //% this.shadow=variables_get
            //% this.defl="UV3"
            writeVEML6070(value:number,clickBoardNum:clickBoardID)
            {
                this.i2cWriteNumber(this.VEML6070_ADDR_CMD,value,NumberFormat.UInt8LE,clickBoardNum,false)   
             
            }
           

            //%blockId=VEML6070_UVSteps
            //%block="$this Get UV value on click$clickBoardNum"
            //% blockGap=7
            //% advanced=false
            //% blockNamespace=UV3
            //% this.shadow=variables_get
            //% this.defl="UV3"
            UVSteps(clickBoardNum:clickBoardID)
            {
                
           
                if(this.isInitialized[clickBoardNum] == 0)
                {
                    this.initialize(clickBoardNum);
                }
                let MSB = this.readVEML6070(this.VEML6070_ADDR_DATA_MSB,clickBoardNum);
                let LSB = this.readVEML6070(this.VEML6070_ADDR_DATA_LSB,clickBoardNum);

                return ((MSB << 8) | LSB) 
             
             
            }

            //%blockId=VEML6070_enable
            //%block="$this Turn off device click$clickBoardNum"
            //% blockGap=7
            //% advanced=true
            //% blockNamespace=UV3
            //% this.shadow=variables_get
            //% this.defl="UV3"
            enableShutdown(clickBoardNum:clickBoardID)
            {
            
                
                this.controlReg = this.controlReg & 0xFE; 
                this.writeVEML6070(this.controlReg,clickBoardNum);
             
             
            }
    

            //%blockId=VEML6070_disable
            //%block="$this Turn on device click$clickBoardNum"
            //% blockGap=7
            //% advanced=true
            //% blockNamespace=UV3
            //% this.shadow=variables_get
            //% this.defl="UV3"
            disableShutdown(clickBoardNum:clickBoardID)
            {
            
                
                this.controlReg = this.controlReg | 0x01; 
                this.writeVEML6070(this.controlReg,clickBoardNum);
             
             
            }
        
    
     
        
                 //%blockId=VEML6070_read
                //%block="$this Read from slave address$slaveAddress on click$clickBoardNum"
                //% blockGap=7
                //% advanced=true
                //% blockNamespace=UV3
                //% this.shadow=variables_get
                //% this.defl="UV3"
                readVEML6070 (slaveAddress:number,  clickBoardNum:clickBoardID):number
                {
                   

                   
                   let i2cBuffer = this.I2CreadNoMem(slaveAddress ,1,clickBoardNum);

                   let data:number; //A number variable to hold our value to return
                 
                    data= i2cBuffer.getUint8(0); //Extract the data from the buffer and store it in our variable
                
                    return  data
            
                        
                
                }
                
        
        setVEML6070Addr(deviceAddr:number,clickBoardNum:clickBoardID)
        {
            this.deviceAddress[clickBoardNum] = deviceAddr;
        }
        getVEML6070Addr(clickBoardNum:clickBoardID):number
        {
            return this.deviceAddress[clickBoardNum];
        }
    
    }
}
    
    