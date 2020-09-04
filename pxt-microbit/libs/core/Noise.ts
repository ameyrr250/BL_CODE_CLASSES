


/**
 * Custom blocks
 */
//% weight=100 color=#F20D0D icon=""
//% advanced=true
namespace Noise {

    enum threshold{
        triggered = 0x01
    }

    

    /**
     * Sets Noise Click object.
     * @param clickBoardNum the clickBoardNum
     *  @param Noise the Noise Object
    */
    //% block=" $clickBoardNum $clickSlot"
    //% blockSetVariable="Noise"
    //% weight=110
    export function createNoise(clickBoardNum: clickBoardID, clickSlot:clickBoardSlot): Noise {
        return new Noise(clickBoardNum, clickSlot);
    }


    export class Noise extends bBoard.SPIsetting{
    
    
    isInitialized : Array<number>;

    private clickBoardNumGlobal:number
    private clickSlotNumGlobal:number
    private PINs : bBoard.PinSettings;
    
    constructor(clickBoardNum: clickBoardID, clickSlot:clickBoardSlot){
        super(clickBoardNum, clickSlot);
        this.isInitialized  = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        this.clickBoardNumGlobal=clickBoardNum
        this.clickSlotNumGlobal=clickSlot
        this.PINs =  new bBoard.PinSettings(clickBoardNum, clickSlot);
    }
    
    
    initialize()
    {
     
        this.isInitialized[this.clickBoardNumGlobal]  = 1
        this.PINs.clearPin(clickIOPin.RST) // Enable the device
    
    
    
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
                this.initialize()
                
            }
            return bBoard.analogRead(clickADCPin.AN, this.clickBoardNumGlobal, this.clickSlotNumGlobal)
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
            this.initialize()
            
        }
        if(this.PINs.digitalReadPin(clickIOPin.INT) == threshold.triggered)
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
                    this.initialize()
                    
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
                this.initialize()
                
            }
            let valueArray:number[] = [value>>8,value&0xFF]; //Split the value to be written into a LSB and MSB
            this.spiCS(clickIOPin.CS)//Set the CS pin
            this.SPIWriteArray(valueArray)
        }

    }
}