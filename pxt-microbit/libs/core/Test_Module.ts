//**
 //* Testing of click modules.
 //*/
//% color=#1E90FF weight=116 icon="\uf00a"
//% advanced=true


namespace Test_Module{


    /**
     * Sets Test object.
     * @param clickBoardNumForce the clickBoardNum
     *  @param Test the Test Object
     */
    //% block="create Test object on clickBoardNumLCD $clickBoardNumLCD , clickBoardNumForce $clickBoardNumForce, clickBoardNumRelay $clickBoardNumRelay"
    //% blockSetVariable="Test"
    export function createTestSettings(clickBoardNumLCD:clickBoardID = clickBoardID.one, clickBoardNumForce: clickBoardID = clickBoardID.two, clickBoardNumRelay: clickBoardID = clickBoardID.three): Test {
        return new Test(clickBoardNumLCD, clickBoardNumForce, clickBoardNumRelay);
   }

   // Set clickboard objects
   //let ForceTest = new Force_Click.Force(clickBoardNum);

   export class Test{
   	TestOkForce : boolean
   	TestOkRelay : boolean
    private clickBoardNumGlobalForce:number
    private clickBoardNumGlobalLCD:number
    TestCheckForce="Testing";
   	constructor(clickBoardNumLCD:clickBoardID, clickBoardNumForce: clickBoardID = clickBoardID.two, clickBoardNumRelay: clickBoardID = clickBoardID.three){
       this.TestOkForce=false;
       this.TestOkRelay=false;
       this.clickBoardNumGlobalForce=clickBoardNumForce;
       this.clickBoardNumGlobalLCD=clickBoardNumLCD;
       }

        /**
         * Tests force and displays string value on LCD.
         */
        //% help=Force_Click/Force/forceclickstring
        //% block="Display a string value at $this of force"
        //% blockId=forceTest
        //% blockNamespace=Test_Module
        //% this.shadow=variables_get
        //% this.defl="Test"
        //% weight=90 blockGap=12 color=#9E4894 icon=""

        TestForce(){
            
            let ForceString="Test..."
            let LCDTest = new LCD_Mini.LCDSettings(this.clickBoardNumGlobalLCD, this.clickSlotNumLCD);
           // LCDTest.lcd_writeString(ForceString, 1);
            Force_Click.createForceSettings(this.clickBoardNumGlobalForce);
            LCD_Mini.createLCDSettings(this.clickBoardNumGlobalLCD);
            let ForceTest = new Force_Click.Force(this.clickBoardNumGlobalForce);
            
            let ForceNum= ForceTest.forceclick();
            ForceString= ForceNum.toString();
            ForceString = "   "+ForceString;
            LCDTest.lcd_writeString(ForceString, 1);
            //this.TestOkForce=TestOk;
            if (input.buttonIsPressed(Button.A)){

                this.TestOkForce=true;
                this.TestCheckForce="Ok";
                basic.showString(this.TestCheckForce)
            }
            else if(input.buttonIsPressed(Button.B)){
                this.TestOkForce=false;
                this.TestCheckForce="Not Ok";
                basic.showString(this.TestCheckForce)
            }
            //return this.TestCheckForce;
            
           }

    }

}