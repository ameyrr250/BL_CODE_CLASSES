


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

    //% block="create Noise settings"
    //% blockSetVariable="Noise"
    //% weight=110
    export function createNoise(): Noise {
        return new Noise();
    }


    export class Noise extends bBoard.SPIsetting{
    
    
    isInitialized : Array<number>;

    constructor(){
        super();
        this.isInitialized  = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    }
    
    
    initialize(clickBoardNum:clickBoardID)
    {
     
        this.isInitialized[clickBoardNum]  = 1
        PINs.clearPin(clickIOPin.RST,clickBoardNum) // Enable the device
    
    
    
    }
    
    
        //%blockId=Noise_getNoiseLevel
        //%block="$this Get raw noise level on click$clickBoardNum"
        //% blockGap=7
        //% advanced=false
        //% blockNamespace=Noise
        //% this.shadow=variables_get
        //% this.defl="Noise"
        getNoiseLevel(clickBoardNum:clickBoardID):number
        {
            if(this.isInitialized[clickBoardNum] == 0)
            {
                this.initialize(clickBoardNum)
                
            }
            return bBoard.analogRead(clickADCPin.AN,clickBoardNum)
        }

    //%blockId=Noise_isThresholdTriggered
    //%block="$this Has noise threshold been triggered on click$clickBoardNum ?"
    //% blockGap=7
    //% advanced=false
    //% blockNamespace=Noise
    //% this.shadow=variables_get
    //% this.defl="Noise"
    isThresholdTriggered(clickBoardNum:clickBoardID):boolean
    {   
        if(this.isInitialized[clickBoardNum] == 0)
        {
            this.initialize(clickBoardNum)
            
        }
        if(PINs.digitalReadPin(clickIOPin.INT,clickBoardNum) == threshold.triggered)
        {
            return true;
        }
        else
        {
            return false;
        }
     }
           //%blockId=Noise_setThreshold
            //%block="$this Set noise threshold to $threshold on click$clickBoardNum"
            //% blockGap=7
            //% advanced=false
            //% threshold.min=0 threshold.max=100
            //% blockNamespace=Noise
            //% this.shadow=variables_get
            //% this.defl="Noise"
            setThreshold(threshold:number,clickBoardNum:clickBoardID)
            {
                if(this.isInitialized[clickBoardNum] == 0)
                {
                    this.initialize(clickBoardNum)
                    
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
    
                this.write(threshold|config,clickBoardNum);
    
            }
            //%blockId=Noise_write
            //%block="$this Write $value on click$clickBoardNum"
            //% blockGap=7
            //% advanced=true
            //% blockNamespace=Noise
            //% this.shadow=variables_get
            //% this.defl="Noise"
        write(value:number,clickBoardNum:clickBoardID)
        {
            if(this.isInitialized[clickBoardNum] == 0)
            {
                this.initialize(clickBoardNum)
                
            }
            let valueArray:number[] = [value>>8,value&0xFF]; //Split the value to be written into a LSB and MSB
            this.spiCS(clickIOPin.CS,clickBoardNum)//Set the CS pin
            this.SPIWriteArray(valueArray,clickBoardNum)
        }

    }
}