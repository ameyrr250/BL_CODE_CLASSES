


/**
 * Custom blocks
 */
//% weight=100 color=#F20D0D icon=""
//% advanced=true
namespace Noise {

    enum threshold{
        triggered = 0x01
    }

    let PINs =  new bBoard.PinSettings();

    /**
     * Sets Noise Click object.
     * @param clickBoardNum the clickBoardNum
     *  @param Noise the Noise Object
    */
    //% block="create Noise settings on clickBoard $clickBoardNum"
    //% blockSetVariable="Noise"
    //% weight=110
    export function createNoise(clickBoardNum: clickBoardID): Noise {
        return new Noise(clickBoardNum);
    }


    export class Noise extends bBoard.SPIsetting{
    
    
    isInitialized : Array<number>;

    private clickBoardNumGlobal:number 
    
    constructor(clickBoardNum: clickBoardID){
        super();
        this.isInitialized  = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        this.clickBoardNumGlobal=clickBoardNum 
    }
    
    
    initialize(clickBoardNum:clickBoardID)
    {
     
        this.isInitialized[clickBoardNum]  = 1
        PINs.clearPin(clickIOPin.RST,clickBoardNum) // Enable the device
    
    
    
    }
    
    
        //%blockId=Noise_getNoiseLevel
        //%block="$this Get raw noise level"
        //% blockGap=7
        //% advanced=false
        //% blockNamespace=Noise
        //% this.shadow=variables_get
        //% this.defl="Noise"
        getNoiseLevel():number
        {
            if(this.isInitialized[this.clickBoardNumGlobal] == 0)
            {
                this.initialize(this.clickBoardNumGlobal)
                
            }
            return bBoard.analogRead(clickADCPin.AN,this.clickBoardNumGlobal)
        }

    //%blockId=Noise_isThresholdTriggered
    //%block="$this Has noise threshold been triggered"
    //% blockGap=7
    //% advanced=false
    //% blockNamespace=Noise
    //% this.shadow=variables_get
    //% this.defl="Noise"
    isThresholdTriggered():boolean
    {   
        if(this.isInitialized[this.clickBoardNumGlobal] == 0)
        {
            this.initialize(this.clickBoardNumGlobal)
            
        }
        if(PINs.digitalReadPin(clickIOPin.INT,this.clickBoardNumGlobal) == threshold.triggered)
        {
            return true;
        }
        else
        {
            return false;
        }
     }
           //%blockId=Noise_setThreshold
            //%block="$this Set noise threshold to $threshold"
            //% blockGap=7
            //% advanced=false
            //% threshold.min=0 threshold.max=100
            //% blockNamespace=Noise
            //% this.shadow=variables_get
            //% this.defl="Noise"
            setThreshold(threshold:number)
            {
                if(this.isInitialized[this.clickBoardNumGlobal] == 0)
                {
                    this.initialize(this.clickBoardNumGlobal)
                    
                }
                let config = 0x7000; //DACa, Buffered output, 1x Gain, Shutdown disabled
                if(threshold > 100)
                {
                    threshold = 100
                }
                if(threshold < 0)
                {
                    threshold = 0
                }
                threshold = threshold * 40.96 - 1 //Convert to a 12 bit number
    
                this.write(threshold|config);
    
            }
            //%blockId=Noise_write
            //%block="$this Write $value"
            //% blockGap=7
            //% advanced=true
            //% blockNamespace=Noise
            //% this.shadow=variables_get
            //% this.defl="Noise"
        write(value:number)
        {
            if(this.isInitialized[this.clickBoardNumGlobal] == 0)
            {
                this.initialize(this.clickBoardNumGlobal)
                
            }
            let valueArray:number[] = [value>>8,value&0xFF]; //Split the value to be written into a LSB and MSB
            this.spiCS(clickIOPin.CS,this.clickBoardNumGlobal)//Set the CS pin
            this.SPIWriteArray(valueArray,this.clickBoardNumGlobal)
        }

    }
}