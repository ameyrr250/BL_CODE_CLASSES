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

    /**
     * Sets Touchpad Click object.
     * @param boardID the boardID
     *  @param Touchpad the Touchpad Object
    */
    //% block=" $boardID $clickID"
    //% blockSetVariable="Touchpad"
    //% weight=110
    export function createTouchpad(boardID: BoardID, clickID:ClickID): Touchpad {
        return new Touchpad(boardID, clickID);
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

    private boardIDGlobalT:number
    private clickIDNumGlobal:number
    
    constructor(boardID: BoardID, clickID:ClickID){
    super(boardID, clickID);

    this.isInitialized  = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    this.deviceAddress = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    this.boardIDGlobalT=boardID*3+clickID
    this.clickIDNumGlobal=clickID;
    }
    
        //%blockId=Touchpad_initialize
        //%block="$this Initalize touchpad with i2c address $deviceAddr"
        //% blockGap=7
        //% advanced=true
        //% blockNamespace=Touchpad
        //% this.shadow=variables_get
        //% this.defl="Touchpad"
    initialize(deviceAddr:number)
    {
        //setTMP116Addr(deviceAddr,boardID)
        this.isInitialized[this.boardIDGlobalT]  = 1
        this.setMTCH6102Addr(deviceAddr)
        this.writeMTCH6102(0b0011,this.MODE) //Set the mode to full 
    
    
    }
    
        //%blockId=Touchpad_getX
        //%block="$this Get X position"
        //% blockGap=7
        //% advanced=false
        //% blockNamespace=Touchpad
        //% this.shadow=variables_get
        //% this.defl="Touchpad"
    getX():number
    {
        if(this.isInitialized[this.boardIDGlobalT] == 0)
        {
            this.initialize(this.DEFAULT_I2C_ADDRESS)
            
        }
        return this.readMTCH6102( this.TOUCH_XREG);
    }
    
        //%blockId=Touchpad_getY
        //%block="$this Get Y position"
        //% blockGap=7
        //% advanced=false
        //% blockNamespace=Touchpad
        //% this.shadow=variables_get
        //% this.defl="Touchpad"
    getY():number
    {
        if(this.isInitialized[this.boardIDGlobalT] == 0)
        {
            this.initialize(this.DEFAULT_I2C_ADDRESS)
            
        }
        return this.readMTCH6102(this.TOUCH_YREG);
    }
    
        //%blockId=Touchpad_isTouched
        //%block="$this Has touch occured"
        //% blockGap=7
        //% advanced=false
        //% blockNamespace=Touchpad
        //% this.shadow=variables_get
        //% this.defl="Touchpad"
        isTouched():boolean
        {
            if(this.isInitialized[this.boardIDGlobalT] == 0)
            {
                this.initialize(this.DEFAULT_I2C_ADDRESS)
                
            }
        
            
            return this.readMTCH6102(this.TOUCH_STATE)&this.touch_mask? true:false;
        }
    
        //%blockId=Touchpad_isGesture
        //%block="$this Has gesture occured"
        //% blockGap=7
        //% advanced=false
        //% blockNamespace=Touchpad
        //% this.shadow=variables_get
        //% this.defl="Touchpad"
        isGesture():boolean
        {
            if(this.isInitialized[this.boardIDGlobalT] == 0)
            {
                this.initialize(this.DEFAULT_I2C_ADDRESS)
                
            }
        
           let  gestureState = this.readMTCH6102(this.TOUCH_STATE)
    
           if(((gestureState&this.gesture_mask)>>1) == 1)
           {
               return true
            }
           return false;
        }
    
        //%blockId=Touchpad_getGestureName
        //%block="$this Convert gesture ID $gestureID to a friendly name"
        //% blockGap=7
        //% advanced=false
        //% blockNamespace=Touchpad
        //% this.shadow=variables_get
        //% this.defl="Touchpad"
        getGestureName(gestureID:number):string
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
        //%block="$this Get touch status"
        //% blockGap=7
        //% advanced=true
        //% blockNamespace=Touchpad
        //% this.shadow=variables_get
        //% this.defl="Touchpad"
        getTouchState():number
        {
        return this.readMTCH6102(this.TOUCH_STATE);
        }
    
        //%blockId=Touchpad_getGesture
        //%block="$this Get gesture"
        //% blockGap=7
        //% advanced=false
        //% blockNamespace=Touchpad
        //% this.shadow=variables_get
        //% this.defl="Touchpad"
        getGesture():number
        {
            if(this.isInitialized[this.boardIDGlobalT] == 0)
            {
                this.initialize(this.DEFAULT_I2C_ADDRESS)
                
            }
        
            
            return this.readMTCH6102(this.GESTURESTATE);
        }
    
        //%blockId=Touchpad_write
        //%block="$this Write $value to register$register"
        //% blockGap=7
        //% advanced=true
        //% blockNamespace=Touchpad
        //% this.shadow=variables_get
        //% this.defl="Touchpad"
    writeMTCH6102(value:number,register:number)
    {
    
    
        let i2cBuffer = pins.createBuffer(2)
    
        i2cBuffer.setNumber(NumberFormat.UInt8LE, 0, register)
        i2cBuffer.setNumber(NumberFormat.UInt8LE, 1, value ) 
        
    
        this.i2cWriteBuffer(this.getMTCH6102Addr(),i2cBuffer);
     
    }
    
        //%blockId=Touchpad_read
        //%block="$this Read from register$register"
        //% blockGap=7
        //% advanced=true
        //% blockNamespace=Touchpad
        //% this.shadow=variables_get
        //% this.defl="Touchpad"
    readMTCH6102( register:number):number
    {
        let i2cBuffer = pins.createBuffer(1);
    
        this.i2cWriteNumber(this.getMTCH6102Addr(),register,NumberFormat.Int8LE,true)
    
    return this.I2CreadNoMem(this.getMTCH6102Addr(),1).getUint8(0);
    
    
    
    }
    
    
    setMTCH6102Addr(deviceAddr:number)
    {
        this.deviceAddress[this.boardIDGlobalT] = deviceAddr;
    }
    getMTCH6102Addr():number
    {
        return this.deviceAddress[this.boardIDGlobalT];
    }
    
    }
}
