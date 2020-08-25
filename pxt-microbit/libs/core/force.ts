//**
 //* Provides access to basic micro:bit functionality.
 //*/
//% color=#1E90FF weight=116 icon="\uf00a"
//% advanced=true

namespace Force_Click{


    /**
     * Sets Force Click object.
     * @param clickBoardNum the clickBoardNum
     *  @param Force the Force Object
     */
    //% block="create force settings at $clickBoardNum on slot $clickSlot"
    //% blockSetVariable="Force"
    export function createForceSettings(clickBoardNum: clickBoardID, clickSlot:clickBoardSlot): Force {
        return new Force(clickBoardNum, clickSlot);
   }
 
    export class Force{
       A : number;
       sumA : number;
       Force_voltage : number;
       Force_val : number;
       rangefactor : number;
       Vadc_3 : number;       
       private clickBoardNumGlobal:number;
       private clickSlotNumGlobal:number; 
    
       constructor(clickBoardNum: clickBoardID, clickSlot:clickBoardSlot){
       this.A=0;
       this.sumA=0;
       this.Force_voltage=0;
       this.Force_val=0;
       this.rangefactor=20/3.3
       this.Vadc_3=3.3/4096;
       this.clickBoardNumGlobal=clickBoardNum;
       this.clickSlotNumGlobal = clickSlot; 
       }

        /**
         * Measures force and returns string value.
         */
        //% help=Force_Click/Force/forceclickstring
        //% block="Get string value at $this of force"
        //% blockId=forceS
        //% blockNamespace=Force_Click
        //% this.shadow=variables_get
        //% this.defl="Force"
        //% weight=90 blockGap=12 color=#9E4894 icon=""

        forceclickstring() : string{
            let valueForce= this.forceclick();
            let stringForce= valueForce.toString();
            return stringForce;
           }

        
        /**
         * Measures force and returns value.
         */
        //% help=Force_Click/Force/forceclickstring
        //% block="Get value at $this of force"
        //% blockId=force
        //% blockNamespace=Force_Click
        //% this.shadow=variables_get
        //% this.defl="Force"
        //% weight=90 blockGap=12 color=#9E4894 icon=""

        forceclick() : number{
        for (let i=1;i<=20;i++)
        {
            this.A=(bBoard.analogRead(clickADCPin.AN,this.clickBoardNumGlobal, this.clickSlotNumGlobal))
            this.sumA+=this.A;
        }
        this.sumA=this.sumA/20;
        this.Force_voltage=this.sumA*this.Vadc_3; //Voltage for the force click board
        this.Force_val=this.Force_voltage*this.rangefactor;
        return this.Force_val
        }

     
   }
 
 }