

//-------------------------Click Board Blocks Begin -----------------------------------
//% weight=100 color=#EF697B icon=""
//% advanced=true

namespace bBoard_Mic {

     /**
     * Sets mic object.
     * @param clickBoardNum the click
     * @param clickSlot the bus
     *  @param mic the neopixel Object
     */
    //% block=" $clickBoardNum $clickSlot"
    //% blockSetVariable="bBoardMic"
    //% weight=110
    export function createMic(clickBoardNum: clickBoardID, clickSlot:clickBoardSlot): bBoardMic {
      return new bBoardMic(clickBoardNum, clickSlot);
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
  
  //private board: clickBoardID;
  //private clickPort: clickBoardSlot;

  private clickBoardNumGlobal:number
  private clickSlotNumGlobal:number
  

   constructor(clickBoardNum: clickBoardID, clickSlot:clickBoardSlot){
    super(clickBoardNum, clickSlot)
    this.clickBoardNumGlobal=clickBoardNum;
    this.clickSlotNumGlobal=clickSlot;
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
      //% this.defl="bBoardMic"
      //% parts="bBoardMic"

      micEnable(enable:bBoard_Mic.micEnable) {
      
      this.sendData(0, moduleIDs.MIC_module_id, functionID.enable,[enable]) //Enable module
          this.sendData(0,moduleIDs.MIC_module_id,functionID.setBaseline,[]) //Get a baseline reading
      }

    
      //% blockId=Mic_baseline
      //% block="$this get microphone baseline"
      //% advanced=false
      //% blockNamespace=bBoard_Mic
      //% this.shadow=variables_get
      //% this.defl="bBoardMic"
      //% parts="bBoardMic"
       micBaseline() {
      
      
           this.sendData(0,moduleIDs.MIC_module_id,functionID.setBaseline,[]) //Get a baseline reading
       }
 
      
    
      //% blockId=Mic_Sound_Level
      //% block="Read $this sound level"
      //% advanced=false
      //% blockNamespace=bBoard_Mic
      //% this.shadow=variables_get
      //% this.defl="bBoardMic"
      //% parts="bBoardMic"
       micSoundLevel(): number {
           let soundLevel: number
      
       
           soundLevel = this.readData16(0, moduleIDs.MIC_module_id, functionID.getRMS,[])
             
            return soundLevel
         }
  
   
      //% blockId=Mic_Threshold_Flag
      //% block="Has $this threshold been reached?"
      //% advanced=false
      //% blockNamespace=bBoard_Mic
      //% this.shadow=variables_get
      //% this.defl="bBoardMic"
      //% parts="bBoardMic"
       micThresholdFlag(): boolean {
        let micThreshold: number
   
    
        micThreshold = this.readData16(0, moduleIDs.MIC_module_id, functionID.getThresholdFlag,[])
          
         return micThreshold == 1? true:false
      }

      //% blockId=Mic_Set_Threshold
      //% block="Set $this threshold level to %threshold"
      //% advanced=false
      //% blockNamespace=bBoard_Mic
      //% this.shadow=variables_get
      //% this.defl="bBoardMic"
      //% parts="bBoardMic"
       setThresholdLevel(threshold:number) {
       
    
        this.sendData(0, moduleIDs.MIC_module_id, functionID.setThreshold,[threshold & 0x00FF, ((threshold & 0xFF00)>>8)])
          
         
      }

      //% blockId=Clear_Threshold_Flag
      //% block="Clear $this threshold flag"
      //% advanced=false
      //% blockNamespace=bBoard_Mic
      //% this.shadow=variables_get
      //% this.defl="bBoardMic"
      //% parts="bBoardMic"
       clearThresholdFlag() {
       
    
        this.sendData(0, moduleIDs.MIC_module_id, functionID.clearThresholdFlag,[])
        
       
    }

    
   
   
   
    
   
     
   }
   }