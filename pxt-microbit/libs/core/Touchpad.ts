/*
    (c) 2016 Microchip Technology Inc. and its subsidiaries. You may use this
    software and any derivatives exclusively with Microchip products.

    THIS SOFTWARE IS SUPPLIED BY MICROCHIP "AS IS". NO WARRANTIES, WHETHER
    EXPRESS, IMPLIED OR STATUTORY, APPLY TO THIS SOFTWARE, INCLUDING ANY IMPLIED
    WARRANTIES OF NON-INFRINGEMENT, MERCHANTABILITY, AND FITNESS FOR A
    PARTICULAR PURPOSE, OR ITS INTERACTION WITH MICROCHIP PRODUCTS, COMBINATION
    WITH ANY OTHER PRODUCTS, OR USE IN ANY APPLICATION.

    IN NO EVENT WILL MICROCHIP BE LIABLE FOR ANY INDIRECT, SPECIAL, PUNITIVE,
    INCIDENTAL OR CONSEQUENTIAL LOSS, DAMAGE, COST OR EXPENSE OF ANY KIND
    WHATSOEVER RELATED TO THE SOFTWARE, HOWEVER CAUSED, EVEN IF MICROCHIP HAS
    BEEN ADVISED OF THE POSSIBILITY OR THE DAMAGES ARE FORESEEABLE. TO THE
    FULLEST EXTENT ALLOWED BY LAW, MICROCHIP'S TOTAL LIABILITY ON ALL CLAIMS IN
    ANY WAY RELATED TO THIS SOFTWARE WILL NOT EXCEED THE AMOUNT OF FEES, IF ANY,
    THAT YOU HAVE PAID DIRECTLY TO MICROCHIP FOR THIS SOFTWARE.

    MICROCHIP PROVIDES THIS SOFTWARE CONDITIONALLY UPON YOUR ACCEPTANCE OF THESE
    TERMS.
*/

/**
 * Custom blocks
 */
//% weight=100 color=#F4B820 icon=""
//% advanced=true
namespace Touchpad{

    enum gestures{
        No_Gesture = 0x00,
        Single_Click = 0x10,
        Click_Hold = 0x11,
        Double_Click = 0x20,
        Down_Swipe = 0x31,
        Down_Swipe_Hold = 0x32,
        Right_Swipe = 0x41,
        Right_Swipe_Hold = 0x42,
        Up_Swipe = 0x51,
        Up_Swipe_Hold = 0x52,
        Left_Swipe = 0x61,
        Left_Swipe_Hold = 0x62
    }

    //% block="create Touchpad settings"
    //% blockSetVariable="Touchpad"
    //% weight=110
    export function createTouchpad(): Touchpad {
        return new Touchpad();
   }

    export class Touchpad extends bBoard.I2CSettings{
    //Address Definitions
    private readonly DEFAULT_I2C_ADDRESS     =      0x25  
    private readonly FWMAJOR        =     0x00
    private readonly FWMINOR        =     0x01
    private readonly APPIDH         =     0x02
    private readonly APPIDL          =    0x03
    private readonly CMD            =     0x04
    private readonly MODE          =      0x05
    private readonly MODECON       =      0x06
    private readonly TOUCH_STATE   =      0x10
    private readonly TOUCH_XREG    =      0x11
    private readonly TOUCH_YREG    =      0x12
    private readonly GESTURESTATE = 0x14
    
    
    //Masks
    private readonly touch_mask = 0x01
    private readonly gesture_mask = 0x02
    

    private isInitialized : Array<number>;
    private deviceAddress : Array<number>;

    constructor(){
        super();

    this.isInitialized  = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    this.deviceAddress = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    }
    
       //%blockId=Touchpad_initialize
        //%block="$this Initalize touchpad with i2c address $deviceAddr on click$clickBoardNum"
        //% blockGap=7
        //% advanced=true
        //% blockNamespace=Touchpad
        //% this.shadow=variables_get
        //% this.defl="Touchpad"
    initialize(deviceAddr:number,clickBoardNum:clickBoardID)
    {
        //setTMP116Addr(deviceAddr,clickBoardNum)
        this.isInitialized[clickBoardNum]  = 1
        this.setMTCH6102Addr(deviceAddr,clickBoardNum)
        this.writeMTCH6102(0b0011,this.MODE,clickBoardNum) //Set the mode to full 
    
    
    }
    
        //%blockId=Touchpad_getX
        //%block="$this Get X position on click$clickBoardNum"
        //% blockGap=7
        //% advanced=false
        //% blockNamespace=Touchpad
        //% this.shadow=variables_get
        //% this.defl="Touchpad"
    getX(clickBoardNum:clickBoardID):number
    {
        if(this.isInitialized[clickBoardNum] == 0)
        {
            this.initialize(this.DEFAULT_I2C_ADDRESS,clickBoardNum)
            
        }
        return this.readMTCH6102( this.TOUCH_XREG,clickBoardNum);
    }
    
        //%blockId=Touchpad_getY
        //%block="$this Get Y position on click$clickBoardNum"
        //% blockGap=7
        //% advanced=false
        //% blockNamespace=Touchpad
        //% this.shadow=variables_get
        //% this.defl="Touchpad"
    getY(clickBoardNum:clickBoardID):number
    {
        if(this.isInitialized[clickBoardNum] == 0)
        {
            this.initialize(this.DEFAULT_I2C_ADDRESS,clickBoardNum)
            
        }
        return this.readMTCH6102(this.TOUCH_YREG,clickBoardNum);
    }
    
        //%blockId=Touchpad_isTouched
        //%block="$this Has touch occured on click$clickBoardNum ?"
        //% blockGap=7
        //% advanced=false
        //% blockNamespace=Touchpad
        //% this.shadow=variables_get
        //% this.defl="Touchpad"
    isTouched(clickBoardNum:clickBoardID):boolean
        {
            if(this.isInitialized[clickBoardNum] == 0)
            {
                this.initialize(this.DEFAULT_I2C_ADDRESS,clickBoardNum)
                
            }
        
            
            return this.readMTCH6102(this.TOUCH_STATE,clickBoardNum)&this.touch_mask? true:false;
        }
    
        //%blockId=Touchpad_isGesture
        //%block="$this Has gesture occured on click$clickBoardNum ?"
        //% blockGap=7
        //% advanced=false
        //% blockNamespace=Touchpad
        //% this.shadow=variables_get
        //% this.defl="Touchpad"
        isGesture(clickBoardNum:clickBoardID):boolean
        {
            if(this.isInitialized[clickBoardNum] == 0)
            {
                this.initialize(this.DEFAULT_I2C_ADDRESS,clickBoardNum)
                
            }
        
           let  gestureState = this.readMTCH6102(this.TOUCH_STATE,clickBoardNum)
    
           if(((gestureState&this.gesture_mask)>>1) == 1)
           {
               return true
            }
           return false;
        }
    
        //%blockId=Touchpad_getGestureName
        //%block="$this Convert gesture ID $gestureID to a friendly name on click$clickBoardNum"
        //% blockGap=7
        //% advanced=false
        //% blockNamespace=Touchpad
        //% this.shadow=variables_get
        //% this.defl="Touchpad"
        getGestureName(gestureID:number,clickBoardNum:clickBoardID):string
        {
    switch (gestureID)
    {
      
    
        case  gestures.Single_Click:
        return "Single Click"
        break;
    
        case  gestures.Click_Hold :
        return "Click & Hold"
        break;
    
        case  gestures.Double_Click:
        return "Double Click"
        break;
        
        case  gestures.Down_Swipe :
        return "Down"
        break;
        
        case  gestures.Down_Swipe_Hold:
        return "Down Hold"
        break;
    
        case  gestures.Right_Swipe :
        return "Right"
        break;
    
        case  gestures.Right_Swipe_Hold :
        return "Right Hold"
        break;
    
        case  gestures.Up_Swipe :
        return "Up"
        break;
    
        case  gestures.Up_Swipe_Hold: 
        return "Up Hold"
        break;
    
        case  gestures.Left_Swipe:
        return "Left"
        break;
    
        case  gestures.Left_Swipe_Hold: 
        return "Left Hold"
        break;
    }
    return "None"
        }
    
        //%blockId=Touchpad_getTouchState
        //%block="$this Get touch status on click$clickBoardNum"
        //% blockGap=7
        //% advanced=true
        //% blockNamespace=Touchpad
        //% this.shadow=variables_get
        //% this.defl="Touchpad"
    getTouchState(clickBoardNum:clickBoardID):number
    {
     
        
        return this.readMTCH6102(this.TOUCH_STATE,clickBoardNum);
    }
    
        //%blockId=Touchpad_getGesture
        //%block="$this Get gesture on click$clickBoardNum"
        //% blockGap=7
        //% advanced=false
        //% blockNamespace=Touchpad
        //% this.shadow=variables_get
        //% this.defl="Touchpad"
        getGesture(clickBoardNum:clickBoardID):number
        {
            if(this.isInitialized[clickBoardNum] == 0)
            {
                this.initialize(this.DEFAULT_I2C_ADDRESS,clickBoardNum)
                
            }
        
            
            return this.readMTCH6102(this.GESTURESTATE,clickBoardNum);
        }
    
        //%blockId=Touchpad_write
        //%block="$this Write $value to register$register on click$clickBoardNum"
        //% blockGap=7
        //% advanced=true
        //% blockNamespace=Touchpad
        //% this.shadow=variables_get
        //% this.defl="Touchpad"
    writeMTCH6102(value:number,register:number,clickBoardNum:clickBoardID)
    {
    
    
        let i2cBuffer = pins.createBuffer(2)
    
        i2cBuffer.setNumber(NumberFormat.UInt8LE, 0, register)
        i2cBuffer.setNumber(NumberFormat.UInt8LE, 1, value ) 
        
    
        this.i2cWriteBuffer(this.getMTCH6102Addr(clickBoardNum),i2cBuffer,clickBoardNum);
     
    }
    
        //%blockId=Touchpad_read
        //%block="$this Read from register$register on click$clickBoardNum"
        //% blockGap=7
        //% advanced=true
        //% blockNamespace=Touchpad
        //% this.shadow=variables_get
        //% this.defl="Touchpad"
    readMTCH6102( register:number, clickBoardNum:clickBoardID):number
    {
        let i2cBuffer = pins.createBuffer(1);
    
        this.i2cWriteNumber(this.getMTCH6102Addr(clickBoardNum),register,NumberFormat.Int8LE,clickBoardNum,true)
    
    return this.I2CreadNoMem(this.getMTCH6102Addr(clickBoardNum),1,clickBoardNum).getUint8(0);
    
    
    
    }
    
    
    setMTCH6102Addr(deviceAddr:number,clickBoardNum:clickBoardID)
    {
        this.deviceAddress[clickBoardNum] = deviceAddr;
    }
    getMTCH6102Addr(clickBoardNum:clickBoardID):number
    {
        return this.deviceAddress[clickBoardNum];
    }
    
    }
}
