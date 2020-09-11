


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
         brake = 0,
         backward = 2
     
     }
    
     export enum motorDriver
     {
     
         left = 1,
         right = 2
     
     }

     /**
     * Sets Motor object.
     * @param clickBoardNum the board
     * @param clickSlot the bus
     *  @param motor the motor Object
     */
    //% block=" $clickBoardNum $clickSlot| Motor Driver $motor_DriverS"
    //% blockSetVariable="motor"
    //% weight=110
    export function createLCDSettings(clickBoardNum: clickBoardID, clickSlot:clickBoardSlot, motor_DriverS:motorDriver): BBOARD_MOTOR {
        return new BBOARD_MOTOR(clickBoardNum, clickSlot, motor_DriverS);
   }
       
       export class BBOARD_MOTOR extends bBoard.PWMSettings{
        //Motor Click
        private duty  : number
        private direction  : number 
        private motor_Driver :motorDriver
        private clickBoardNumGlobal:number
        private clickSlotNumGlobal:number
        private PeripheralObject:bBoard.peripheralSettings
    
       constructor(clickBoardNum: clickBoardID, clickSlot:clickBoardSlot, motor_DriverLocal:motorDriver){
        super(clickBoardNum, clickSlot);
        this.duty = 50
        this.direction = motorDirection.forward
        this.clickBoardNumGlobal=clickBoardNum;
        this.clickSlotNumGlobal=clickSlot;
        this.motor_Driver=motor_DriverLocal;
        this.PeripheralObject=new bBoard.peripheralSettings(clickBoardNum, clickSlot);
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
        //% block="Set $this to %enabled"
        //% advanced=false
        //% blockNamespace=bBoard_Motor
        //% this.shadow=variables_get
        //% this.defl="motor"
        //% parts="bBoardMotor"
    
           motorEnable(enabled: bBoard_Motor.motorState): void {
            let data = [enabled]
           
            this.PeripheralObject.sendData(0xFFFF, moduleIDs.MOTOR_module_id, functionID.enableMotor,data)
                 
                
             }
      
       
            //% blockId=Motor_dutyDirection
            //% block="Set $this duty to %duty with direction%direction"
            //% advanced=false
            //% duty.min=0 duty.max=100
            //% blockNamespace=bBoard_Motor
            //% this.shadow=variables_get
            //% this.defl="motor"
            //% parts="bBoardMotor"
           motorDutyDirection(duty: number,direction: bBoard_Motor.motorDirection): void {
       
          let data = [this.motor_Driver,direction,duty]
          this.PeripheralObject.sendData(0, moduleIDs.MOTOR_module_id, functionID.setMotor,data)
               
              
           }
       
       
/*      //% block="Initialize $this |bBoard motor driver %motorDriver on $boardIDValue"
        //% blockSetVariable="motor"
        //% weight=110
        //% this.defl="motor"
        //% parts="bBoardMotor"
        //initMotor(motorDriverID: bBoard_Motor.motorDriver, clickBoardIDval: clickBoardID, clickSlotIDval: clickBoardSlot): BBOARD_MOTOR {
        //    let motor = new BBOARD_MOTOR(clickBoardIDval, clickSlotIDval)
        //    motor.clickBoardIDval = boardIDValue
        //    motor.motor_Driver = motorDriverID
        //    this.motorEnable(bBoard_Motor.motorState.enabled) //Enable the motor
         
        //    return motor
        
        //}
 */       
       
         
       }
    
        
       }