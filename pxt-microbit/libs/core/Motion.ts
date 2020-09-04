
/**
 * Custom blocks
 */
//% weight=100 color=#33BEBB icon="\u27A0"
//% advanced=true
namespace Motion{


    
    
    enum motion{
        detected = 1,
        none = 0,
    }

    export class Motion{

    //On/Off do not seem to enable/disable the device.

//      //%blockId=Motion_On
//     //%block="Turn on detector on click%clickBoardNum ?"
//     //% blockGap=7
//     //% advanced=true
// export function turnOn(clickBoardNum:clickBoardID)
// {
//   bBoard.setPin(clickIOPin.RST,clickBoardNum)

// }

//   //%blockId=Motion_Off
//     //%block="Turn off detector on click%clickBoardNum ?"
//     //% blockGap=7
//     //% advanced=true
//     export function turnOff(clickBoardNum:clickBoardID)
//     {
//       bBoard.clearPin(clickIOPin.RST,clickBoardNum)
    
//     }
    
    
        //%blockId=Motion_isDetected
        //%block="Has motion been detected on click%clickBoardNum ?"
        //% blockGap=7
        //% advanced=false
    isDetected(clickBoardNum: clickBoardID, clickSlot:clickBoardSlot):boolean
    {
        let PINs = new bBoard.PinSettings(clickBoardNum, clickSlot);
        if(PINs.digitalReadPin(clickIOPin.INT) == motion.detected)
        {
            return true
        }
        return false;
    
    }

}
}