
enum IRSensor {
    //% block="left"
    LEFT = 7,
    //% block="middle"
    MIDDLE = 8,
    //% block="right"
    RIGHT = 9
}

enum IRColour {
    //% block="black"
    BLACK,
    //% block="white"
    WHITE
}
enum Motor {
    //% block="left"
    LEFT = 0,
    //% block="right"
    RIGHT = 1
}

enum MotorDirection {
    //% block="forward"
    FORWARD = 0,
    //% block="reverse"
    REVERSE = 1
}

enum MotorPower {
    //% block="on"
    ON,
    //% block="off"
    OFF
}
enum Comparison {
    //% block="closer"
    CLOSER,
    //% block="further"
    FURTHER
}



//% weight=0 color=#421C52 icon="\uf1b9"
//% advanced=true

namespace k8 {
    export let IR_SENSOR_LEFT = AnalogPin.P0
    export let IR_SENSOR_MIDDLE = AnalogPin.P1
    export let SPEAKER = AnalogPin.P1
    export let IR_SENSOR_RIGHT = AnalogPin.P2
    export let SERVO_2 = AnalogPin.P8
    export let SONAR = DigitalPin.P8
    export let SERVO_1 = AnalogPin.P12
    export let M2_PWR: number = DigitalPin.P13
    export let M2_DIR: number = DigitalPin.P14
    export let M1_PWR: number = DigitalPin.P15
    export let M1_DIR: number = DigitalPin.P16

    //% block=" $clickBoardNum $clickSlot"
    //% blockSetVariable="K8"
    //% weight=110
    export function createK8(clickBoardNum: clickBoardID, clickSlot:clickBoardSlot): K8 {
        return new K8(clickBoardNum, clickSlot);
   }


    export class K8{

        private MAX_PULSE : number
        private motorState: MotorPower
        private clickBoardNumGlobal:number
        private clickSlotNumGlobal:number 

    constructor(clickBoardNum: clickBoardID, clickSlot:clickBoardSlot){
        this.MAX_PULSE = 7800;
        this.clickBoardNumGlobal=clickBoardNum;
        this.clickSlotNumGlobal=clickSlot;
        this.motorState = MotorPower.ON;
    }

    //----line sensor ----
    /**
   * Check if a chosen sensor is reading black or white
   * @param sensor which of the three sensors
   * @param colour whether the sensor looks for black or white
   */
    //% block
    //% blockId=line_check_sensor block="$this $sensor| sensor is $colour|"
    //% weight=60
    //% blockNamespace=k8
    //% this.shadow=variables_get
    //% this.defl="K8"
    checkSensor(sensor: IRSensor, colour: IRColour = IRColour.WHITE): boolean {
        let read: boolean
        switch (sensor) {
            case IRSensor.LEFT:
                read = pins.analogReadPin(k8.IR_SENSOR_LEFT) > 200
                break
            case IRSensor.MIDDLE:
                read = pins.analogReadPin(k8.IR_SENSOR_MIDDLE) > 200
                break
            case IRSensor.RIGHT:
                read = pins.analogReadPin(k8.IR_SENSOR_RIGHT) > 200
                break
        }
        if (colour == IRColour.WHITE) {
            return !read
        }
        return read
    }

    /**
     * Displays current status of all line sensors
     */

    //% groups=" 'Line Sensor, 'Motion', 'Sonar',"

    //%blockId=Line_Sensor
    //%block="$this Display Line Sensor Current Status"
    //%block="$this Display Current Status"
    //%group="Line Sensor"
    //% weight=50
    //% blockNamespace=k8
    //% this.shadow=variables_get
    //% this.defl="K8"

    displaySensors(): void {
        let i: number
        for (i = 0; i < 5; i++)
            led.plot(i, 4)

        if (this.checkSensor(IRSensor.LEFT)) {
            this.plotBar(4)
        } else {
            this.unplotBar(4)
        }

        if (this.checkSensor(IRSensor.MIDDLE)) {
            this.plotBar(2)
        } else {
            this.unplotBar(2)
        }

        if (this.checkSensor(IRSensor.RIGHT)) {
            this.plotBar(0)
        } else {
            this.unplotBar(0)
        }
    }

    plotBar(x: number) {
        led.plot(x, 1)
        led.plot(x, 2)
        led.plot(x, 3)
    }
    unplotBar(x: number) {
        led.unplot(x, 1)
        led.unplot(x, 2)
        led.unplot(x, 3)
    }


 

    /**
    * Returns the distance the robot is from an object (in centimetres)
    * Max range 150cm
    */
    //% block
    //% group="Sonar"
    //% weight=50
    //% blockNamespace=k8
    //% this.shadow=variables_get
    //% this.defl="K8"
    checkSonar(): number {
        let list = [0, 0, 0, 0, 0];

        for (let index = 0; index <= 4; index++) {
            list[index] = this.ping()
        }
        list = list.sort()

        return list[2];
    }

    /**
     * Test that sonar is closer or further than the threshold in cm.
     */
    //% block
    //% group="Sonar"
    //% blockId=sonar_is block="$this sonar is $comparison| than $threshold cm"
    //% weight=60
    //% blockNamespace=k8
    //% this.shadow=variables_get
    //% this.defl="K8"
    isSonar(comparison: Comparison = Comparison.FURTHER, threshold: number): boolean {
        let distance = this.checkSonar()
        if (comparison == Comparison.FURTHER) {
            return threshold < distance || distance == 0
        } else {
            return threshold >= this.checkSonar()
        }
      }

    /**
    * Display the current sonar reading to leds.
    */
    //% block
    //% group="Sonar"
    //% weight=40
    //% blockNamespace=k8
    //% this.shadow=variables_get
    //% this.defl="K8"
    displaySonar(): void {
        led.plotBarGraph(this.checkSonar(), 80)
    }

    // d / 39 is the ratio that most resembled actual centimeters
    // The datasheet says use d / 58 but that was off by a factor of 2/3
        ping(): number {
        // send pulse
        pins.setPull(k8.SONAR, PinPullMode.PullNone);
        pins.digitalWritePin(k8.SONAR, 0);
        control.waitMicros(2);
        pins.digitalWritePin(k8.SONAR, 1);
        control.waitMicros(10);
        pins.digitalWritePin(k8.SONAR, 0);

        // read pulse
        const d = pins.pulseIn(k8.SONAR, PulseValue.High, this.MAX_PULSE);
        return Math.min(150, d / 39)
    }




    /**
    *Drives the robot straight at a specified speed
    */
    //% block
    //% group="Motion"
    //% blockId=motion_drive_straight block="$this drive straight |speed: $speed"
    //% speed.min=-100 speed.max=100
    //% weight=70
    //% blockNamespace=k8
    //% this.shadow=variables_get
    //% this.defl="K8"
    driveStraight(speed: number): void {
    this.motorControl(Motor.LEFT, speed)
    this.motorControl(Motor.RIGHT, speed)
    }

    /**
    *Turns the robot to the left at a specified speed
    */
    //% block
    //% group="Motion"
    //% blockId=motion_turn_left block="$this turn left |speed: $speed"
    //% speed.min=0 speed.max=100
    //% weight=60
    //% blockNamespace=k8
    //% this.shadow=variables_get
    //% this.defl="K8"
    turnLeft(speed: number): void {
    this.motorControl(Motor.LEFT, 0)
    this.motorControl(Motor.RIGHT, speed)
    }

    /**
    *Turns the robot to the right at a specified speed
    */
    //% block
    //% group="Motion"
    //% blockId=motion_turn_right block="$this turn right |speed: $speed"
    //% speed.min=0 speed.max=100
    //% weight=50
    //% blockNamespace=k8
    //% this.shadow=variables_get
    //% this.defl="K8"
    turnRight(speed: number): void {
    this.motorControl(Motor.LEFT, speed)
    this.motorControl(Motor.RIGHT, 0)
    }

    /**
    *Stop the motors
    */
    //% block
    //% group="Motion"
    //% blockId=motion_stop block="$this stop motors"
    //% weight=45
    //% blockNamespace=k8
    //% this.shadow=variables_get
    //% this.defl="K8"
    stop(): void {
    this.motorControl(Motor.LEFT, 0)
    this.motorControl(Motor.RIGHT, 0)
    }

    /**
    * Control both wheels in one function.
    * Speeds range from -100 to 100.
    * Negative speeds go backwards, positive go forwards.
    */
    //% block
    //% group="Motion"
    //% blockId=motion_drive block="$this drive |left: $leftWheelSpeed|right: $rightWheelSpeed"
    //% leftWheelSpeed.min=-100 leftWheelSpeed.max=100
    //% rightWheelSpeed.min=-100 rightWheelSpeed.max=100
    //% weight=40
    //% advanced=false
    //% blockNamespace=k8
    //% this.shadow=variables_get
    //% this.defl="K8"
    drive(leftWheelSpeed: number, rightWheelSpeed: number): void {
    this.motorControl(Motor.LEFT, leftWheelSpeed)
    this.motorControl(Motor.RIGHT, rightWheelSpeed)
    }

/**
* Control the speed and direction of a single wheel
*/
//% block
//% group="Motion"
//% blockId=motion_single block="$this drive |wheel: $wheel|speed: $speed"
//% speed.min=0 speed.max=100
//% weight=30
//% advanced=false
//% blockNamespace=k8
//% this.shadow=variables_get
//% this.defl="K8"
driveWheel(wheel: Motor, speed: number): void {
    this.motorControl(wheel, speed)
}

/**
* Turn the motors on/off - default on
*/
//% block
//% group="Motion"
//% blockId=motion_power block="$this turn motors |power: $power"
//% weight=20
//% advanced=false
//% blockNamespace=k8
    //% this.shadow=variables_get
    //% this.defl="K8"
setPowers(power: MotorPower): void {
    if (power == MotorPower.OFF) {
        this.stop()
    }
    this.motorState = power
}

/**
 * Advanced control of an individual motor. PWM is set to constant value.
 */
motorControl(whichMotor: Motor, speed: number): void {
    let motorSpeed: number
    let direction: MotorDirection

    if (this.motorState == MotorPower.OFF) {
        return
    }

    direction = speed < 0 ? MotorDirection.REVERSE : MotorDirection.FORWARD
    speed = Math.abs(speed)

    motorSpeed = this.remapSpeed(speed)

    if (whichMotor == Motor.LEFT) {
        pins.digitalWritePin(k8.M1_DIR, direction)
        pins.analogSetPeriod(k8.M1_PWR, 512)
        pins.analogWritePin(k8.M1_PWR, motorSpeed)
    } else {
        pins.digitalWritePin(k8.M2_DIR, direction)
        pins.analogSetPeriod(k8.M2_PWR, 512)
        pins.analogWritePin(k8.M2_PWR, motorSpeed)
    }
}

// Rescale values from 0 - 100 to 0 - 1023
remapSpeed(s: number): number {
    let returnSpeed: number
    if (s <= 0) {
        returnSpeed = 0
    } else if (s >= 100) {
        returnSpeed = 1023
    } else {
    returnSpeed = (23200 + (s * 791)) / 100
    }
    return returnSpeed;
}

    }
}






