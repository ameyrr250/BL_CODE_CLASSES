

//-------------------------Click Board Blocks Begin -----------------------------------
//% weight=100 color=#EF697B icon=""
//% advanced=true

namespace DC_Motor3 {
    //% block=" $boardID $clickID"
    //% blockSetVariable="DC_MOTOR"
    //% weight=110
    export function createDC_MOTOR(boardID: BoardID, clickID:ClickID): DC_MOTOR {
      return new DC_MOTOR(boardID, clickID);
  }
    
    

    export enum MotorDirection {
      //% block="Forward"
      Forward,
      //% block="Reverse"
      Reverse
    }
    
    export class DC_MOTOR extends bBoard.PWMSettings{
    //Motor Click
    private IN1  : number
    private IN2  : number
    private  SLP : number
    private  PWM : number
    private boardIDGlobal:number 
    private pwms : bBoard.PWMSettings;
    private PINs : bBoard.PinSettings;
    private clickIDNumGlobal:number
    
    isInitialized : Array<number>;
    constructor(boardID: BoardID, clickID:ClickID){
        super(boardID, clickID);
        this.IN1 = clickIOPin.AN
        this.IN2 = clickIOPin.RST
        this.SLP = clickIOPin.CS
        this.PWM = clickIOPin.PWM
        this.isInitialized  = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        this.boardIDGlobal=boardID
        this.clickIDNumGlobal=clickID
        this.PINs = new bBoard.PinSettings(boardID, clickID);
        this.pwms = new bBoard.PWMSettings(boardID, clickID);      
    }
    
    get IN1val() {
        return this.IN1
      }
    set IN1val(value) {
        this.IN1 = value
      }

    get IN2val() {
        return this.IN2
      }
    set IN2val(value) {
        this.IN2 = value
      }


      get SLPval() {
        return this.SLP
      }
    set SLPval(value) {
        this.SLP = value
      }

      get PWMval() {
        return this.PWM
      }
    set PWMval(value) {
        this.PWM = value
      }
    
    
    initialize()
    {
        this.motorRotation(MotorDirection.Forward)
        this.isInitialized[this.boardIDGlobal]  = 1
    
    }
    
        //------------------------Motor Click---------------------------------
    
    
    
    motorSpeed(Speed: number): void {
            if(this.isInitialized[this.boardIDGlobal] == 0)
            {
                this.initialize()
                
            }
    
            if (Speed > 100) {
                Speed = 100;
            }
            if (Speed < 0) {
                Speed = 0;
            }
            this.pwms.setDuty(clickPWMPin.PWM,Speed);
           
        }
    
        //% blockId=Motor_speedDirection
        //% block="Set $this speed to %speed with direction%direction"
        //% Speed.min=0 Speed.max=100
        //% advanced=false
        //% speed.min=0 speed.max=100
        //% blockNamespace=DC_Motor3
        //% this.shadow=variables_get
        //% this.defl="DC_MOTOR"
    
        motorSpeedDirection(speed: number,direction: MotorDirection): void {
            if(this.isInitialized[this.boardIDGlobal] == 0)
            {
                this.initialize()
                
            }
    
            this.motorRotation(direction);
            this.motorSpeed(speed)
          
           
        }
    
    
    
        motorRotation(direction: MotorDirection): void {
            switch (direction) {
    
                
                case MotorDirection.Forward:
                  this.PINs.writePin(1,this.IN1val);
                  this.PINs.writePin(0,this.IN2val);
                  break;
    
                case MotorDirection.Reverse:
                
                  this.PINs.writePin(0,this.IN1val);
                  this.PINs.writePin(1,this.IN2val);
                  break;
            }
        }
    
      
    }
    }