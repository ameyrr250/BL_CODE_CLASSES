//-------------------------Click Board Blocks Begin -----------------------------------
//% weight=100 color=#EF697B icon=""
//% advanced=true

namespace bBoard_Mic {

    /**
    * Sets mic object.
    * @param boardID the click
    * @param clickID the bus
    *  @param mic the neopixel Object
    */
   //% block=" $boardID $clickID"
   //% blockSetVariable="microphone"
   //% clickID.defl=ClickID.Zero
   //% weight=110
   export function createMic(boardID: BoardID, clickID:ClickID): bBoardMic {
     return new bBoardMic(boardID, clickID);
 }
 
enum functionID
{

    // FunctionIds
    getSoundLevel=1,
    setThreshold = 2,
    getThresholdFlag = 3,
    clearThresholdFlag = 4,
    enable = 5,
    getRMS = 6,
    setBaseline = 7

}
export enum micEnable
{

    disabled = 0,
    enabled = 1

}
  
export class bBoardMic extends bBoard.peripheralSettings{
  //Motor Click
 private threshold  : number
 
 //private board: BoardID;
 //private clickPort: ClickID;

 private boardIDGlobal:number
 private clickIDGlobal:number
 

  constructor(boardID: BoardID, clickID:ClickID){
   super(boardID, clickID)
   this.boardIDGlobal=boardID;
   this.clickIDGlobal=clickID;
   this.threshold = 50
    
  }
  


   get threshVal() {
       return this.threshold
     }

   set threshVal(value) {
      this.threshold = value
    }



   
     //% blockId=Mic_Enable
     //% block="$this $enable"
     //% advanced=false
     //% blockNamespace=bBoard_Mic
     //% this.shadow=variables_get
     //% this.defl="microphone"
     //% parts="bBoardMic"

     micEnable(enable:bBoard_Mic.micEnable) {
     
     this.sendData(0, moduleIDs.MIC_module_id, functionID.enable,[enable]) //Enable module
         this.sendData(0,moduleIDs.MIC_module_id,functionID.setBaseline,[]) //Get a baseline reading
     }

   
     //% blockId=Mic_baseline
     //% block="$this update microphone baseline"
     //% advanced=false
     //% blockNamespace=bBoard_Mic
     //% this.shadow=variables_get
     //% this.defl="microphone"
     //% parts="bBoardMic"
      micBaseline() {
     
     
          this.sendData(0,moduleIDs.MIC_module_id,functionID.setBaseline,[]) //Get a baseline reading
      }

     
   
     //% blockId=Mic_Sound_Level
     //% block="$this get sound level"
     //% advanced=false
     //% blockNamespace=bBoard_Mic
     //% this.shadow=variables_get
     //% this.defl="microphone"
     //% parts="bBoardMic"
      micSoundLevel(): number {
          let soundLevel: number
     
      
          soundLevel = this.readData16(0, moduleIDs.MIC_module_id, functionID.getRMS,[])
            
           return soundLevel
        }
 
  
     //% blockId=Mic_Threshold_Flag
     //% block="$this has threshold been reached?"
     //% advanced=false
     //% blockNamespace=bBoard_Mic
     //% this.shadow=variables_get
     //% this.defl="microphone"
     //% parts="bBoardMic"
      micThresholdFlag(): boolean {
       let micThreshold: number
  
   
       micThreshold = this.readData16(0, moduleIDs.MIC_module_id, functionID.getThresholdFlag,[])
         
        return micThreshold == 1? true:false
     }

     //% blockId=Mic_Set_Threshold
     //% block="$this set mic threshold level to %threshold"
     //% advanced=false
     //% blockNamespace=bBoard_Mic
     //% this.shadow=variables_get
     //% this.defl="microphone"
     //% parts="bBoardMic"
      setThresholdLevel(threshold:number) {
      
   
       this.sendData(0, moduleIDs.MIC_module_id, functionID.setThreshold,[threshold & 0x00FF, ((threshold & 0xFF00)>>8)])
         
        
     }

     //% blockId=Clear_Threshold_Flag
     //% block="$this clear threshold flag"
     //% advanced=false
     //% blockNamespace=bBoard_Mic
     //% this.shadow=variables_get
     //% this.defl="microphone"
     //% parts="bBoardMic"
      clearThresholdFlag() {
      
   
       this.sendData(0, moduleIDs.MIC_module_id, functionID.clearThresholdFlag,[])
       
      
   }

   
  
  
  
   
  
    
  }
  }