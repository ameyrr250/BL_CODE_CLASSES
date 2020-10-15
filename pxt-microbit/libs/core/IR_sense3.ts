/**
 * Custom blocks
 */
//% weight=100 color=#33BEBB icon="\u223F"
//% advanced=true
namespace IR_Sense_3{
    

    //% block=" $boardID $clickID"
    //% blockSetVariable="IR_Sense"
    //% weight=110
    export function createIR_Sense(boardID: BoardID, clickID:ClickID): IR_Sense {
        return new IR_Sense(boardID, clickID);
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
    private PINs : bBoard.PinSettings;
    private boardIDGlobal:number
    private clickIDNumGlobal:number

    constructor(boardID: BoardID, clickID:ClickID){
        super(boardID, clickID);
        this.isInitialized  = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        this.deviceAddress = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        this.PINs=new bBoard.PinSettings(boardID, clickID);
        this.boardIDGlobal=boardID;
        this.clickIDNumGlobal=clickID;
    }
    
    initialize(deviceAddr:number)
    {
        //setTMP116Addr(deviceAddr,boardID)
        this.isInitialized[this.boardIDGlobal]  = 1
        this.setAK9754Addr(deviceAddr)
        this.writeAK9754([0x20,0xff, 0xfc,0xa9, 0xf8, 0x80, 0xfa, 0xf0, 0x81, 0x0c, 0x80,0xf2, 0xff]) //Initialize the Config register
    
    }
   

       
        //%blockId=AK9754_write
        //%block="$this Write array $values to AK9754 register$register ?"
        //% blockGap=7
        //% advanced=true
        //% blockNamespace=IR_Sense_3
        //% this.shadow=variables_get
        //% this.defl="IR_Sense"
        writeAK9754(values:number[])
        {
        
        
            let i2cBuffer = pins.createBuffer(values.length)

            for (let i=0;i<values.length;i++)
            {
                i2cBuffer.setNumber(NumberFormat.UInt8LE, i, values[i])
           
            }
    
        
            super.i2cWriteBuffer(this.getAK9754Addr(),i2cBuffer);
         
        }
       

        
            //%blockId=IR_Sense_3_isHumandDetected
            //%block="$this Has a human been detected ?"
            //% blockGap=7
            //% advanced=false
            //% blockNamespace=IR_Sense_3
            //% this.shadow=variables_get
            //% this.defl="IR_Sense"
            isHumanDetected():boolean
            {
                if(this.isInitialized[this.boardIDGlobal] == 0)
                {
                    this.initialize(this.AK9754_DEVICE_ADDRESS)
                    
                }
                if(this.PINs.digitalReadPin(clickIOPin.INT)==0) //If the interrupt pin has gone low (indicating human detected)
                {
                    this.readAK9754(this.IRL); //Datasheet indicates that reading from IRL will clear the interrupt. *Need to confirm if other reads are necessary
                    this.readAK9754(this.IRH);
                    this.readAK9754(this.ST1);
                    this.readAK9754(this.ST2);
                    this.readAK9754(this.ST3);
                    this.readAK9754(this.ST4);

                    return true;

                }
                
                
    
        
                return  false
        
                    
            
            }

        
            //%blockId=AK9754_read
            //%block="$this Read from register$register ?"
            //% blockGap=7
            //% advanced=true
            //% blockNamespace=IR_Sense_3
            //% this.shadow=variables_get
            //% this.defl="IR_Sense"
        readAK9754( register:number):number
        {
            
    
            this.i2cWriteNumber(this.getAK9754Addr(),register,NumberFormat.UInt8LE,true)

    
            return  this.I2CreadNoMem(this.getAK9754Addr(),1).getUint8(0)
    
                
        
        }
        
        
        setAK9754Addr(deviceAddr:number)
        {
            this.deviceAddress[this.boardIDGlobal] = deviceAddr;
        }
        getAK9754Addr():number
        {
            return this.deviceAddress[this.boardIDGlobal];
        }

    }



}



