


//% weight=100 color=#EF697B icon=""
//% advanced=true
namespace bBoard_Motor {
 
    enum functionID
     {
     
         // FunctionIds
         enableMotor=1,
         setMotor = 2
     
     }
     export enum motorState
     {
     
         disabled = 0,
         enabled = 1
     
     }
    
     export enum motorDirection
     {
     
         
         forward = 1,
         backward = 2,
         brake = 0
     
     }
    
     export enum motorDriver
     {
     
         left = 1,
         right = 2
     
     }

     /**
     * Sets Motor object.
     * @param boardID the board
     * @param clickID the bus
     *  @param motor the motor Object
     */
    //% block=" $boardID $clickID motor $motor_DriverS"
    //% blockSetVariable="leftMotor"
       //% clickID.defl=ClickID.Zero
    //% weight=110
    export function createMotor(boardID: BoardID,clickID:ClickID, motor_DriverS:motorDriver): BBOARD_MOTOR {
        return new BBOARD_MOTOR(boardID, clickID, motor_DriverS);
   }
       
       export class BBOARD_MOTOR extends bBoard.PWMSettings{
        //Motor Click
        private duty  : number
        private direction  : number 
        private motor_Driver :motorDriver
        private boardIDGlobal:number
        private clickIDGlobal:number
        private PeripheralObject:bBoard.peripheralSettings
    
       constructor(boardID: BoardID,clickID:ClickID, motor_DriverLocal:motorDriver){
        super(boardID, clickID);
        this.duty = 50
        this.direction = motorDirection.forward
        this.boardIDGlobal=boardID;
        this.clickIDGlobal=clickID;
        this.motor_Driver=motor_DriverLocal;
        this.PeripheralObject=new bBoard.peripheralSettings(boardID, clickID);
        this.motorEnable(bBoard_Motor.motorState.enabled);
       }
       
    
    
         get dutyVal() {
           return this.duty
         }
        set dutyVal(value) {
           this.duty = value
         }
    
    
         get directionVal() {
            return this.direction
          }
        set directionVal(value) {
            this.direction = value
          }
       
     
        
    
        
        //% blockId=Motor_enable
        //% block="$this motor %enabled"
        //% advanced=false
        //% blockNamespace=bBoard_Motor
        //% this.shadow=variables_get
        //% this.defl="leftMotor"
        //% parts="bBoardMotor"
    
           motorEnable(enabled: bBoard_Motor.motorState): void {
            let data = [enabled]
           
            this.PeripheralObject.sendData(0xFFFF, moduleIDs.MOTOR_module_id, functionID.enableMotor,data)
                 
                
             }
      
       
            //% blockId=Motor_dutyDirection
            //% block="$this set duty to %duty with direction%direction"
            //% advanced=false
            //% duty.min=0 duty.max=100
            //% blockNamespace=bBoard_Motor
            //% this.shadow=variables_get
            //% this.defl="leftMotor"
            //% parts="bBoardMotor"
           motorDutyDirection(duty: number,direction: bBoard_Motor.motorDirection): void {
       
          let data = [this.motor_Driver,direction,duty]
          this.PeripheralObject.sendData(0, moduleIDs.MOTOR_module_id, functionID.setMotor,data)
               
              
           }
       
       
/*      //% block="Initialize $this |bBoard motor driver %motorDriver on $boardIDValue"
        //% blockSetVariable="motor"
        //% weight=110
        //% this.defl="leftMotor"
        //% parts="bBoardMotor"
        //initMotor(motorDriverID: bBoard_Motor.motorDriver, clickBoardIDval: BoardID,clickIDIDval: clickBoardSlot): BBOARD_MOTOR {
        //    let motor = new BBOARD_MOTOR(clickBoardIDval, clickIDIDval)
        //    motor.clickBoardIDval = boardIDValue
        //    motor.motor_Driver = motorDriverID
        //    this.motorEnable(bBoard_Motor.motorState.enabled) //Enable the motor
         
        //    return motor
        
        //}
 */       
       
         
       }
    
        
       }