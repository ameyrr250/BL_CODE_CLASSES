

//-------------------------Click Board Blocks Begin -----------------------------------
//% weight=100 color=#EF697B icon=""
//% advanced=true

namespace DC_Motor3 {
     //% block="create DC_MOTOR settings on clickBoard $clickBoardNum"
    //% blockSetVariable="DC_MOTOR"
    //% weight=110
    export function createDC_MOTOR(clickBoardNum: clickBoardID): DC_MOTOR {
      return new DC_MOTOR(clickBoardNum);
  }
    let PINs = new bBoard.PinSettings();
    let pwms = new bBoard.PWMSettings();
    

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
    private clickBoardNumGlobal:number 
    isInitialized : Array<number>;
    constructor(clickBoardNum: clickBoardID){
      super();
        this.IN1 = clickIOPin.AN
        this.IN2 = clickIOPin.RST
        this.SLP = clickIOPin.CS
        this.PWM = clickIOPin.PWM
        this.isInitialized  = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        this.clickBoardNumGlobal=clickBoardNum      
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
    
    
    initialize(clickBoardNum:clickBoardID)
    {
        this.motorRotation(MotorDirection.Forward,clickBoardNum)
        this.isInitialized[clickBoardNum]  = 1
    
    }
    
        //------------------------Motor Click---------------------------------
    
    
    
    motorSpeed(Speed: number,clickBoardNum: clickBoardID): void {
            if(this.isInitialized[clickBoardNum] == 0)
            {
                this.initialize(clickBoardNum)
                
            }
    
            if (Speed > 100) {
                Speed = 100;
            }
            if (Speed < 0) {
                Speed = 0;
            }
            pwms.PWMOut(clickPWMPin.PWM,Speed,clickBoardNum);
           
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
            if(this.isInitialized[this.clickBoardNumGlobal] == 0)
            {
                this.initialize(this.clickBoardNumGlobal)
                
            }
    
            this.motorRotation(direction,this.clickBoardNumGlobal);
            this.motorSpeed(speed,this.clickBoardNumGlobal)
          
           
        }
    
    
    
        motorRotation(direction: MotorDirection, clickBoardNum: clickBoardID): void {
            switch (direction) {
    
                
                case MotorDirection.Forward:
                  PINs.writePin(1,this.IN1val,clickBoardNum);
                  PINs.writePin(0,this.IN2val,clickBoardNum);
            
                    break;
    
                case MotorDirection.Reverse:
                
                  PINs.writePin(0,this.IN1val,clickBoardNum);
                  PINs.writePin(1,this.IN2val,clickBoardNum);
                    break;
            }
        }
    
      
    }
    }