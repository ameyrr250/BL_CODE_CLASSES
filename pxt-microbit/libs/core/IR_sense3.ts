/**
 * Custom blocks
 */
//% weight=100 color=#33BEBB icon="\u223F"
//% advanced=true
namespace IR_Sense_3{
    let PINs=new bBoard.PinSettings();

    //% block="create IR_Sense settings"
    //% blockSetVariable="IR_Sense"
    //% weight=110
    export function createIR_Sense(): IR_Sense {
        return new IR_Sense();
    }

    export class IR_Sense extends bBoard.I2CSettings{

    private readonly ST1 = 0x04
    private readonly ST2 = 0x09
    private readonly ST3 = 0x0A
    private readonly ST4 = 0x1F
    private readonly IRL = 0x05
    private readonly IRH = 0x06
    private readonly AK9754_DEVICE_ADDRESS = 0x60
    
    

    isInitialized : Array<number>;
    deviceAddress : Array<number>;

    constructor(){
        super();
        createIR_Sense();
        this.isInitialized  = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        this.deviceAddress = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    }
    
    initialize(deviceAddr:number,clickBoardNum:clickBoardID)
    {
        //setTMP116Addr(deviceAddr,clickBoardNum)
        this.isInitialized[clickBoardNum]  = 1
        this.setAK9754Addr(deviceAddr,clickBoardNum)
        this.writeAK9754([0x20,0xff, 0xfc,0xa9, 0xf8, 0x80, 0xfa, 0xf0, 0x81, 0x0c, 0x80,0xf2, 0xff],clickBoardNum) //Initialize the Config register
    
    }
   

       
        //%blockId=AK9754_write
        //%block="$this Write array $values to AK9754 register$register on click$clickBoardNum ?"
        //% blockGap=7
        //% advanced=true
        //% blockNamespace=IR_Sense_3
        //% this.shadow=variables_get
        //% this.defl="IR_Sense"
        writeAK9754(values:number[],clickBoardNum:clickBoardID)
        {
        
        
            let i2cBuffer = pins.createBuffer(values.length)

            for (let i=0;i<values.length;i++)
            {
                i2cBuffer.setNumber(NumberFormat.UInt8LE, i, values[i])
           
            }
    
        
            super.i2cWriteBuffer(this.getAK9754Addr(clickBoardNum),i2cBuffer,clickBoardNum);
         
        }
       

        
            //%blockId=IR_Sense_3_isHumandDetected
            //%block="$this Has a human been detected on click$clickBoardNum ?"
            //% blockGap=7
            //% advanced=false
            //% blockNamespace=IR_Sense_3
            //% this.shadow=variables_get
            //% this.defl="IR_Sense"
            isHumanDetected( clickBoardNum:clickBoardID):boolean
            {
                if(this.isInitialized[clickBoardNum] == 0)
                {
                    this.initialize(this.AK9754_DEVICE_ADDRESS,clickBoardNum)
                    
                }
                if(PINs.digitalReadPin(clickIOPin.INT,clickBoardNum)==0) //If the interrupt pin has gone low (indicating human detected)
                {
                    this.readAK9754(this.IRL,clickBoardNum); //Datasheet indicates that reading from IRL will clear the interrupt. *Need to confirm if other reads are necessary
                    this.readAK9754(this.IRH,clickBoardNum);
                    this.readAK9754(this.ST1,clickBoardNum);
                    this.readAK9754(this.ST2,clickBoardNum);
                    this.readAK9754(this.ST3,clickBoardNum);
                    this.readAK9754(this.ST4,clickBoardNum);

                    return true;

                }
                
                
    
        
                return  false
        
                    
            
            }

        
            //%blockId=AK9754_read
            //%block="$this Read from register$register on click$clickBoardNum ?"
            //% blockGap=7
            //% advanced=true
            //% blockNamespace=IR_Sense_3
            //% this.shadow=variables_get
            //% this.defl="IR_Sense"
        readAK9754( register:number, clickBoardNum:clickBoardID):number
        {
            
    
            this.i2cWriteNumber(this.getAK9754Addr(clickBoardNum),register,NumberFormat.UInt8LE,clickBoardNum,true)

    
            return  this.I2CreadNoMem(this.getAK9754Addr(clickBoardNum),1,clickBoardNum).getUint8(0)
    
                
        
        }
        
        
        setAK9754Addr(deviceAddr:number,clickBoardNum:clickBoardID)
        {
            this.deviceAddress[clickBoardNum] = deviceAddr;
        }
        getAK9754Addr(clickBoardNum:clickBoardID):number
        {
            return this.deviceAddress[clickBoardNum];
        }

    }



}



