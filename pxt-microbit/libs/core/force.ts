//**
 //* Provides access to basic micro:bit functionality.
 //*/
//% color=#1E90FF weight=116 icon="\uf00a"
//% advanced=true

namespace Force_Click{


    //% block="create force settings"
    //% blockSetVariable="Force"
    export function createForceSettings(): Force {
        return new Force();
   }
 
    export class Force{
       A : number;
       sumA : number;
       Force_voltage : number;
       Force_val : number;
       rangefactor : number;
       Vadc_3 : number;       
 
       constructor(){
       this.A=0;
       this.sumA=0;
       this.Force_voltage=0;
       this.Force_val=0;
       this.rangefactor=20/3.3
       this.Vadc_3=3.3/4096; 
       }

        /**
         * Measures force and returns string value.
         * @param clickBoardNum the clickboard number at which connected
         */
        //% help=Force_Click/Force/forceclickstring
        //% block="Get string value at $this of force on click$clickBoardNum"
        //% blockId=forceS
        //% blockNamespace=Force_Click
        //% this.shadow=variables_get
        //% this.defl="Force"
        //% weight=90 blockGap=12 color=#9E4894 icon=""

        forceclickstring(clickBoardNum: clickBoardID) : string{
            let valueForce= this.forceclick(clickBoardNum);
            let stringForce= valueForce.toString();
            return stringForce;
           }

        
        /**
         * Measures force and returns value.
         * @param clickBoardNum the clickboard number at which connected
         */
        //% help=Force_Click/Force/forceclickstring
        //% block="Get value at $this of force on click$clickBoardNum"
        //% blockId=force
        //% blockNamespace=Force_Click
        //% this.shadow=variables_get
        //% this.defl="Force"
        //% weight=90 blockGap=12 color=#9E4894 icon=""

        forceclick(clickBoardNum: clickBoardID) : number{
        for (let i=1;i<=20;i++)
        {
            this.A=(bBoard.analogRead(clickADCPin.AN,clickBoardNum))
            this.sumA+=this.A;
        }
        this.sumA=this.sumA/20;
        this.Force_voltage=this.sumA*this.Vadc_3; //Voltage for the force click board
        this.Force_val=this.Force_voltage*this.rangefactor;
        return this.Force_val
        }

     
   }
 
 }