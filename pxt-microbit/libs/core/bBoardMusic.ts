
//-------------------------Click Board Blocks Begin -----------------------------------
//% weight=100 color=#EF697B icon=""
//% advanced=true

namespace bBoard_Music
{
    /**
     * Sets mic object.
     * @param boardID the click
     * @param clickID the bus
     */
    //% block="$boardID $clickID"
    //% blockSetVariable="speaker"
       //% clickID.defl=ClickID.Zero
    //% weight=110
    export function createSpeaker(boardID: BoardID, clickID:ClickID): bBoardSpeaker {
        return new bBoardSpeaker(boardID, clickID);
    }

enum functionID
 {
 
     // FunctionIds
     enableSpeaker=1,
     setBPM = 2,
     sendSong = 3,
     playSong = 4,
     
 
 }
 export enum speakerEnable
 {
    enabled = 1,
     disabled = 0
   
 
 }
   
   export class bBoardSpeaker extends bBoard.peripheralSettings{
  
  
    private boardIDGlobal:number
    private clickIDGlobal:number
  

   constructor(boardID: BoardID, clickID:ClickID){
    super(boardID, clickID)
    this.boardIDGlobal=boardID;
    this.clickIDGlobal=clickID;
   }
   


 
    
        //% blockId=Speaker_Enable
        //% block="$this $enable"
        //% advanced=false
        //% blockNamespace=bBoard_Music
        //% this.shadow=variables_get
        //% this.defl="speaker"
        //% parts="bBoardMusic"
       speakerEnable(enable:bBoard_Music.speakerEnable) 
       {
      
       this.sendData(0, moduleIDs.MUSIC_module_id, functionID.enableSpeaker,[enable])
          
      }

          
        //% blockId=Start_Song
        //% block="$this start song"
        //% advanced=false
        //% blockNamespace=bBoard_Music
        //% this.shadow=variables_get
        //% this.defl="speaker"
        //% parts="bBoardMusic"
       startSong() {
      
        this.sendData(0, moduleIDs.MUSIC_module_id, functionID.playSong,[])
           
       }

        //% blockId=Music_Set_Tempo
        //% block="$this set BPM to %BPM"
        //% advanced=false
        //% BPM.defl="30"
        //% blockNamespace=bBoard_Music
        //% this.shadow=variables_get
        //% this.defl="speaker"
        //% parts="bBoardMusic"
       setBPM(BPM:number) {
       
    
        this.sendData(0, moduleIDs.MUSIC_module_id, functionID.setBPM,[BPM & 0x00FF, ((BPM & 0xFF00)>>8)])
          
         
      }

        //% blockId=Send_Song
        //% block="$this send $song to play"
        //% advanced=false
        //% blockNamespace=bBoard_Music
        //% this.shadow=variables_get
        //% this.defl="speaker"
        //% parts="bBoardMusic"
       sendSong(song:number[]) 
       {
        song.push(0); //Ensure there is a 0 at the end of the song to stop it
        let buff = pins.createBuffer(song.length*2)

       for (let i=0; i<buff.length; i++)
       {
           buff.setNumber(NumberFormat.UInt8LE,2*i,song[i]& 0x00FF)
           buff.setNumber(NumberFormat.UInt8LE,2*i+1,(song[i]& 0xFF00)>>8)
       }
      
        
        this.sendBuffer(0,moduleIDs.MUSIC_module_id, functionID.sendSong,buff)
          
         
      }

                
    }

    
   
   
   
    
   
     
}
