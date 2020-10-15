
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

     /**
     * Sets Thermo Click object.
     * @param boardID the boardID
     * @param clickID the ClickID
     * @param Thermo the Motion Object
    */
    //% block=" $boardID $clickID"
    //% blockSetVariable="Motion"
    //% weight=110
    export function createThermo(boardID: BoardID, clickID:ClickID): Motion {
        return new Motion(boardID, clickID);
   }


    export class Motion{

        private boardIDGlobal : BoardID
        private clickIDGlobal : ClickID
        constructor(boardID: BoardID, clickID:ClickID){
            this.boardIDGlobal=boardID;
            this.clickIDGlobal=clickID;
        }
    
    
        //%blockId=Motion_isDetected
        //%block="$this Has motion been detected?"
        //% blockGap=7
        //% advanced=false
        //% blockNamespace=Motion
        //% this.shadow=variables_get
        //% this.defl="Motion"
    isDetected():boolean
    {
        let PINs = new bBoard.PinSettings(this.boardIDGlobal, this.clickIDGlobal);
        if(PINs.digitalReadPin(clickIOPin.INT) == motion.detected)
        {
            return true
        }
        return false;
    
    }

}
}