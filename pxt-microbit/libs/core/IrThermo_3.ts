  
/*
  This is a library written for the MLX90632 Non-contact thermal sensor
  SparkFun sells these at its website: www.sparkfun.com
  Do you like this library? Help support SparkFun. Buy a board!
  https://www.sparkfun.com/products/14569
  Written by Nathan Seidle @ SparkFun Electronics, December 28th, 2017
  The MLX90632 can remotely measure object temperatures within 1 degree C.
  This library handles the initialization of the MLX90632 and the calculations
  to get the temperatures.
  https://github.com/sparkfun/SparkFun_MLX90632_Arduino_Library
  Development environment specifics:
  Arduino IDE 1.8.3
  This program is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
  GNU General Public License for more details.
  You should have received a copy of the GNU General Public License
  along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

/**
 * Custom blocks
 */
//% weight=100 color=#33BEBB icon=""
//% advanced=true
namespace IrThermo_3 {

    enum status
    {
      SENSOR_SUCCESS,
      SENSOR_ID_ERROR,
      SENSOR_I2C_ERROR,
      SENSOR_INTERNAL_ERROR,
      SENSOR_GENERIC_ERROR,
      SENSOR_TIMEOUT_ERROR
      //...
    } 

     //% block="create IrThermo settings"
    //% blockSetVariable="IrThermo"
    //% weight=110
    export function createIrThermo(): IrThermo {
        return new IrThermo();
    }
    
export class IrThermo extends bBoard.I2CSettings{


//Registers
private readonly EE_VERSION =0x240B

//32 bit constants
private readonly EE_P_R =0x240C
private readonly EE_P_G =0x240E
private readonly EE_P_T =0x2410
private readonly EE_P_O =0x2412
private readonly EE_Aa =0x2414
private readonly EE_Ab =0x2416
private readonly EE_Ba =0x2418
private readonly EE_Bb =0x241A
private readonly EE_Ca =0x241C
private readonly EE_Cb =0x241E
private readonly EE_Da =0x2420
private readonly EE_Db =0x2422
private readonly EE_Ea =0x2424
private readonly EE_Eb =0x2426
private readonly EE_Fa =0x2428
private readonly EE_Fb =0x242A
private readonly EE_Ga =0x242C

//16 bit constants
private readonly EE_Ha =0x2481
private readonly EE_Hb =0x2482
private readonly EE_Gb =0x242E
private readonly EE_Ka =0x242F
private readonly EE_Kb =0x2430

//Control registers
private readonly EE_CONTROL =0x24D4
private readonly EE_I2C_ADDRESS =0x24D5
private readonly REG_I2C_ADDRESS =0x3000
private readonly REG_CONTROL =0x3001
private readonly REG_STATUS =0x3FFF

//User RAM
private readonly RAM_1 =0x4000
private readonly RAM_2 =0x4001
private readonly RAM_3 =0x4002
private readonly RAM_4 =0x4003
private readonly RAM_5 =0x4004
private readonly RAM_6 =0x4005
private readonly RAM_7 =0x4006
private readonly RAM_8 =0x4007
private readonly RAM_9 =0x4008

//Three measurement modes available
private readonly MODE_SLEEP =0b01
private readonly MODE_STEP =0b10
private readonly MODE_CONTINUOUS =0b11

//REG_STATUS bits
private readonly BIT_DEVICE_BUSY =10
private readonly BIT_EEPROM_BUSY =9
private readonly BIT_BROWN_OUT =8
private readonly BIT_CYCLE_POS =2 //6:2 = 5 bits
private readonly BIT_NEW_DATA =0

//REG_CONTROL bits
private readonly BIT_SOC =3
private readonly BIT_MODE =1 //2:1 = 2 bits

private readonly I2C_SPEED_STANDARD  =      100000
private readonly I2C_SPEED_FAST       =     400000

private readonly MAX_WAIT = 750; //Number of ms to wait before giving up. Some sensor actions take 512ms.



/*
  This is a library written for the MLX90632 Non-contact thermal sensor
  SparkFun sells these at its website: www.sparkfun.com
  Do you like this library? Help support SparkFun. Buy a board!
  https://www.sparkfun.com/products/14569
  Written by Nathan Seidle @ SparkFun Electronics, December 28th, 2017
  The MLX90632 can remotely measure object temperatures within 1 degree C.
  This library handles the initialization of the MLX90632 and the calculations
  to get the temperatures.
  https://github.com/sparkfun/SparkFun_MLX90632_Arduino_Library
  Development environment specifics:
  Arduino IDE 1.8.3
  This program is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
  GNU General Public License for more details.
  You should have received a copy of the GNU General Public License
  along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

/*
  TODO:
  check EEPROM write
  check timing - how fast to take reading? Setting the SOC twice may be doubling time
  set emissivity
*/

//Declare global variables for the calibration values
private P_R  : number;
private P_G : number;
private P_T : number;
private P_O : number;
private Ea : number;
private Eb : number;
private Fa : number;
private Fb : number;
private Ga : number;
private Gb : number;
private Ka : number;
private Ha : number;
private Hb : number;

private TOdut : number; //Assume 25C for first iteration
private TO0 : number; //object temp from previous calculation
private TA0 : number; //ambient temp from previous calculation
private sensorTemp :number; //Internal temp of the MLX sensor

//The default I2C address for the MLX90632 on the SparkX breakout is =0x3B. =0x3A is also possible.
private MLX90632_DEFAULT_ADDRESS : number;




private isInitialized : Array<number>;
private returnError : Array<number>;

constructor(){
super();
this.P_R = 0;
this.P_G= 0;
this.P_T= 0;
this.P_O= 0;
this.Ea= 0;
this.Eb= 0;
this.Fa= 0;
this.Fb= 0;
this.Ga= 0;
this.Gb= 0;
this.Ka= 0;
this.Ha= 0;
this.Hb= 0;

this.TOdut = 25.0; //Assume 25C for first iteration
this.TO0 = 25.0; //object temp from previous calculation
this.TA0 = 25.0; //ambient temp from previous calculation
this.sensorTemp; //Internal temp of the MLX sensor
this.MLX90632_DEFAULT_ADDRESS =0x3A
this.isInitialized  = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
this.returnError = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
}

get P_Rval(){
    return this.P_R;
}

get P_Gval(){
    return this.P_G;
}

get P_Tval(){
    return this.P_T;
}

get P_Oval(){
    return this.P_O;
}

get Eaval(){
    return this.Ea;
}

get Ebval(){
    return this.Eb;
}

get Faval(){
    return this.Fa;
}

get Fbval(){
    return this.Fb;
}

get Gaval(){
    return this.Ga;
}

get Gbval(){
    return this.Gb;
}

get Kaval(){
    return this.Ka;
}

get Haval(){
    return this.Ha;
}

get Hbval(){
    return this.Hb;
}


get TOdutval(){
    return this.TOdut;
}

get TO0val(){
    return this.TO0;
}
 
get TA0val(){
    return this.TA0;
}

get sensorTempval(){
    return this.sensorTemp;
}


get MLX90632_DEFAULT_ADDRESSval(){
    return this.MLX90632_DEFAULT_ADDRESS;
}


set P_Rval(value){
    this.P_R = value;
}

set P_Gval(value){
    this.P_G = value;
}

set P_Tval(value){
    this.P_T = value;
}

set P_Oval(value){
    this.P_O = value;
}

set Eaval(value){
    this.Ea = value;
}

set Ebval(value){
    this.Eb = value;
}

set Faval(value){
    this.Fa = value;
}

set Fbval(value){
    this.Fb = value;
}

set Gaval(value){
    this.Ga = value;
}

set Gbval(value){
    this.Gb = value;
}

set Kaval(value){
    this.Ka = value;
}

set Haval(value){
    this.Ha = value;
}

set Hbval(value){
    this.Hb = value;
}


set TOdutval(value){
    this.TOdut = value;
}

set TO0val(value){
    this.TO0 = value;
}

set TA0val(value){
    this.TA0 = value;
}

set sensorTempval(value){
    this.sensorTemp = value;
}


set MLX90632_DEFAULT_ADDRESSval(value){
    this.MLX90632_DEFAULT_ADDRESS = value;
}





//This begins the communication with the device
//Returns a status error if anything went wrong

begin(clickBoardNum:clickBoardID)
{

  let deviceAddress = this.MLX90632_DEFAULT_ADDRESS; //Get the I2C address from user

  //We require caller to begin their I2C port, with the speed of their choice
  //external to the library
  //_i2cPort->begin();
  //We could to a check here to see if user has init the Wire or not. Would
  //need to be for different platforms

  //Check communication with IC

let thisAddress = this.readRegister16(this.EE_I2C_ADDRESS, clickBoardNum);
  
  
  //Wait for eeprom_busy to clear
  let counter = 0;
  while (this.eepromBusy(clickBoardNum))
  {
    control.waitMicros(1);
    counter++;
    if (counter == this.MAX_WAIT)
    {
    
        this.returnError[clickBoardNum]  = status.SENSOR_TIMEOUT_ERROR;
      
    }
  }

  this.setMode(this.MODE_SLEEP,clickBoardNum); //Before reading EEPROM sensor needs to stop taking readings

  //Load all the static calibration factors
  let tempValue16;
  let tempValue32;
  tempValue32 =this.readRegister32(this.EE_P_R, clickBoardNum);
  this.P_R = tempValue32 * Math.pow(2, -8);
  tempValue32 =this.readRegister32(this.EE_P_G, clickBoardNum);
  this.P_G = tempValue32 * Math.pow(2, -20);
  tempValue32 =this.readRegister32(this.EE_P_T, clickBoardNum);
  this.P_T = tempValue32 * Math.pow(2, -44);

  tempValue32 =this.readRegister32(this.EE_P_O, clickBoardNum);
  this.P_O = tempValue32 * Math.pow(2, -8);

  tempValue32 =this.readRegister32(this.EE_Ea, clickBoardNum);
  this.Ea = tempValue32 * Math.pow(2, -16);
  tempValue32 =this.readRegister32(this.EE_Eb, clickBoardNum);
  this.Eb = tempValue32 * Math.pow(2, -8);
  tempValue32 =this.readRegister32(this.EE_Fa, clickBoardNum);
  this.Fa = tempValue32 * Math.pow(2, -46);
  tempValue32 =this.readRegister32(this.EE_Fb, clickBoardNum);
  this.Fb = tempValue32 * Math.pow(2, -36);
  tempValue32 = this.readRegister32(this.EE_Ga, clickBoardNum);
  this.Ga = tempValue32 * Math.pow(2, -36);


  tempValue16 = this.readRegister16(this.EE_Gb, clickBoardNum);
  this.Gb = tempValue16 * Math.pow(2, -10);

  tempValue16 = this.readRegister16(this.EE_Ka, clickBoardNum);
  this.Ka = tempValue16 * Math.pow(2, -10);

  tempValue16 = this.readRegister16(this.EE_Ha, clickBoardNum);
  this.Ha = tempValue16 * Math.pow(2, -14); //Ha!

  tempValue16 = this.readRegister16(this.EE_Hb, clickBoardNum);
  this.Hb = tempValue16 * Math.pow(2, -14);

  //Note, sensor is in sleep mode

  
}

//Read all calibration values and calculate the temperature of the thing we are looking at
//Depending on mode, initiates a measurement
//If in sleep or step mode, clears the new_data bit, sets the SOC bit
     //%blockId=IRThermo_getObjectTemp
    //%block="$this Get surface temperature in Celcius on click$clickBoardNum"
    //% blockGap=7
    //% advanced=false
    //% blockNamespace=IrThermo_3
    //% this.shadow=variables_get
    //% this.defl="IrThermo"
getObjectTemp(clickBoardNum:clickBoardID):number
{
    this.returnError[clickBoardNum]  = status.SENSOR_SUCCESS;
    if(this.isInitialized[clickBoardNum] == 0)
    {
        this.begin(clickBoardNum)
        this.isInitialized[clickBoardNum] = 1; //Device is initialied
    }
  //If the sensor is not in continuous mode then the tell sensor to take reading
  if(this.getMode(clickBoardNum) != this.MODE_CONTINUOUS){
    this.setSOC(clickBoardNum);

  } 

  //Write new_data = 0
  this.clearNewData(clickBoardNum);

  //Check when new_data = 1
  let counter = 0;
  while (this.dataAvailable(clickBoardNum) == false)
  {
    control.waitMicros(1);
    counter++;
    if (counter == this.MAX_WAIT)
    {
basic.showString("E")
    this.returnError[clickBoardNum]  = status.SENSOR_TIMEOUT_ERROR;
      return (0.0); //Error
    }
  }

  this.gatherSensorTemp(clickBoardNum );
  if (this.returnError[clickBoardNum]  != status.SENSOR_SUCCESS)
  {
    
    basic.showString("F")

    return (0.0); //Error
  }

  let lowerRAM = 0;
  let upperRAM = 0;

  //Get RAM_6 and RAM_9
  let sixRAM = this.readRegister16(this.RAM_6,clickBoardNum);
  let nineRAM = this.readRegister16(this.RAM_9, clickBoardNum);

  //Read cycle_pos to get measurement pointer
  let cyclePosition = this.getCyclePosition(clickBoardNum);

  //If cycle_pos = 1
  //Calculate TA and TO based on RAM_4, RAM_5, RAM_6, RAM_9
  if (cyclePosition == 1)
  {
    lowerRAM = this.readRegister16(this.RAM_4, clickBoardNum);
    upperRAM = this.readRegister16(this.RAM_5, clickBoardNum);
  }
  //If cycle_pos = 2
  //Calculate TA and TO based on RAM_7, RAM_8, RAM_6, RAM_9
  else if (cyclePosition == 2)
  {
    lowerRAM = this.readRegister16(this.RAM_7, clickBoardNum);
    upperRAM = this.readRegister16(this.RAM_8, clickBoardNum);
  }
  else
  {
  
    lowerRAM = this.readRegister16(this.RAM_4, clickBoardNum);
    upperRAM = this.readRegister16(this.RAM_5, clickBoardNum);
  }

  //Object temp requires 3 iterations
  for (let i = 0 ; i < 3 ; i++)
  {
    let VRta = nineRAM + this.Gb * (sixRAM / 12.0);

    let AMB = ((sixRAM / 12.0) / VRta )* 524288;

    //let sensorTemp = P_O + ((AMB - P_R) / P_G )+ (P_T * Math.pow((AMB - P_R), 2));

    let S = (lowerRAM + upperRAM) / 2.0;
    let VRto = nineRAM + (this.Ka * (sixRAM / 12.0));
    let Sto = ((S / 12.0) / VRto) * 524288;

    let TAdut = ((AMB - this.Eb) / this.Ea) + 25.0;

    let ambientTempK = TAdut + 273.15;

    let bigFraction = Sto / (1 * this.Fa * this.Ha * (1 +( this.Ga * (this.TOdut - this.TO0)) + (this.Fb * (TAdut - this.TA0))));

    let objectTemp = bigFraction + Math.pow(ambientTempK, 4);
    objectTemp = Math.sqrt(Math.sqrt(Math.abs(objectTemp))); //Take 4th root
    objectTemp = objectTemp - 273.15 - this.Hb;

    this.TO0 = objectTemp;

  }

  return (this.TO0);
}

     //%blockId=IRThermo_getObjectTempF
    //%block="$this Get surface temperature in Fahrenheit on click$clickBoardNum"
    //% blockGap=7
    //% advanced=false
    //% blockNamespace=IrThermo_3
    //% this.shadow=variables_get
    //% this.defl="IrThermo"
getObjectTempF(clickBoardNum:clickBoardID):number
{
    
  let tempC = this.getObjectTemp(clickBoardNum);
  let tempF = tempC * 9.0/5.0 + 32.0;
  return(tempF);
}



getSensorTemp(clickBoardNum:clickBoardID ):number
{
    this.returnError[clickBoardNum]  = status.SENSOR_SUCCESS;

  //If the sensor is not in continuous mode then the tell sensor to take reading
  if(this.getMode(clickBoardNum) != this.MODE_CONTINUOUS) {
    this.setSOC(clickBoardNum);
  }
  //Write new_data = 0
  this.clearNewData(clickBoardNum);

  //Wait for new data
  let counter = 0;
  while (this.dataAvailable(clickBoardNum) == false)
  {
    control.waitMicros(1);
    counter++;
    if (counter == this.MAX_WAIT)
    {
        this.returnError[clickBoardNum]  = status.SENSOR_TIMEOUT_ERROR;
      return (0.0); //Error
    }
  }

  return (this.gatherSensorTemp(clickBoardNum ));
}

//This reads all the temperature calibration factors for the sensor itself
//This is needed so that it can be called from getObjectTemp *and* users can call getSensorTemp 
//without causing a let read
gatherSensorTemp(clickBoardNum:clickBoardID ):number
{
    this.returnError[clickBoardNum]  = status.SENSOR_SUCCESS;

  //Get RAM_6 and RAM_9
  let sixRAM = this.readRegister16(this.RAM_6, clickBoardNum);
  
  let nineRAM=  this.readRegister16(this.RAM_9, clickBoardNum);


  let VRta = nineRAM + (this.Gb * (sixRAM / 12.0));

  let AMB = ((sixRAM / 12.0) / VRta) * Math.pow(2, 19);

  let sensorTemp = this.P_O + ((AMB - this.P_R) / this.P_G) + (this.P_T * Math.pow((AMB - this.P_R), 2));

  

  return(sensorTemp);
}

//Returns true if device is busy doing measurement
//Always true in continuous mode
deviceBusy(clickBoardNum:clickBoardID):boolean
{
  if (this.getStatus(clickBoardNum) & (1 << this.BIT_DEVICE_BUSY)) {return (true);}
  return (false);
}

//Returns true if eeprom is busy
//EEPROM is busy during boot up and during EEPROM write/erase
eepromBusy(clickBoardNum:clickBoardID):boolean
{
  if (this.getStatus(clickBoardNum) & (1 << this.BIT_EEPROM_BUSY)) 
  {return (true);}
  return (false);
}

//Returns the cycle_pos from status register. cycle_pos is 0 to 31
getCyclePosition(clickBoardNum:clickBoardID):number
{
  let status = (this.getStatus(clickBoardNum) >> this.BIT_CYCLE_POS); //Shave off last two bits
  status &= 0x1F; //Get lower 5 bits.
  return (status);
}

//Returns true if new data is available
dataAvailable(clickBoardNum:clickBoardID):boolean
{
  if (this.getStatus(clickBoardNum) & (1 << this.BIT_NEW_DATA)) {return (true);}
  return (false);
}

//Sets the brown_out bit. Datasheet says 'Customer should set bit to 1'. Ok.
setBrownOut(clickBoardNum:clickBoardID)
{
let reg = this.getStatus(clickBoardNum); //Get current bits
  reg |= (1 << this.BIT_BROWN_OUT); //Set the bit
  this.writeRegister16(this.REG_STATUS, reg,clickBoardNum); //Set the mode bits
}

//Clear the new_data bit. This is done after a measurement is complete
clearNewData(clickBoardNum:clickBoardID)
{
  let reg = this.getStatus(clickBoardNum); //Get current bits
  reg &= ~(1 << this.BIT_NEW_DATA); //Clear the bit
  this.writeRegister16(this.REG_STATUS, reg,clickBoardNum); //Set the mode bits
}

getStatus(clickBoardNum:clickBoardID)
{
    this.returnError[clickBoardNum]  = status.SENSOR_SUCCESS; //By default, return success
  let deviceStatus   = this.readRegister16(this.REG_STATUS, clickBoardNum);

  return (deviceStatus);
}


//Changes the mode to sleep
sleepMode(clickBoardNum:clickBoardID)
{
    this.setMode(this.MODE_SLEEP,clickBoardNum);
}

//Changes the mode to step
stepMode(clickBoardNum:clickBoardID)
{
    this.setMode(this.MODE_STEP,clickBoardNum);
}

//Changes the mode to continuous read
continuousMode(clickBoardNum:clickBoardID)
{
    this.setMode(this.MODE_CONTINUOUS,clickBoardNum);
}

//Sets the Start of Conversion (SOC) bit
setSOC(clickBoardNum:clickBoardID)
{
    this.returnError[clickBoardNum]  = status.SENSOR_SUCCESS; //By default, return success
  let reg = this.readRegister16(this.REG_CONTROL, clickBoardNum); //Get current bits

  reg |= (1 << 3); //Set the bit
  this.writeRegister16(this.REG_CONTROL, reg,clickBoardNum); //Set the bit

}

//Sets the sensing mode (3 modes availabe)
setMode(mode:number,clickBoardNum:clickBoardID )
{
    this.returnError[clickBoardNum]  = status.SENSOR_SUCCESS; //By default, return success
    
  let reg = this.readRegister16(this.REG_CONTROL, clickBoardNum)//Get current bits
   
  reg &= ~(0x0003 << 1); //Clear the mode bits
  reg |= (mode << 1); //Set the bits
  this.writeRegister16(this.REG_CONTROL, reg,clickBoardNum); //Set the mode bits
  
}

//Returns the mode of the sensor
getMode(clickBoardNum:clickBoardID )
{
  
    this.returnError[clickBoardNum]  = status.SENSOR_SUCCESS; //By default, return success
let mode = this.readRegister16(this.REG_CONTROL, clickBoardNum); //Get current register settings
  
  mode = (mode >> 1) & 0x0003; //Clear all other bits
  return (mode);
}



//Reads two consecutive bytes from a given location
//Stores the result at the provided outputPointer
readRegister16( addr:number, clickBoardNum:clickBoardID):number
{
    let i2cBuffer = pins.createBuffer(2);
    this.returnError[clickBoardNum]  = status.SENSOR_SUCCESS; //By default, return success
    super.i2cWriteNumber(this.MLX90632_DEFAULT_ADDRESS,addr,NumberFormat.Int16BE,clickBoardNum,true)

 i2cBuffer = super.I2CreadNoMem(this.MLX90632_DEFAULT_ADDRESS,2,clickBoardNum);


 let msb = i2cBuffer.getUint8(0)
 let lsb = i2cBuffer.getUint8(1)

return  (msb << 8 | lsb)

 //return  bBoard.I2CreadNoMem(MLX90632_DEFAULT_ADDRESS,2,clickBoardNum).getNumber(NumberFormat.UInt16BE,0)
}

//Reads two 16-bit registers and combines them into 32 bits
readRegister32(addr:number,  clickBoardNum:clickBoardID):number
{

    this.returnError[clickBoardNum]  = status.SENSOR_SUCCESS; //By default, return success
 
  //For the MLX90632 the first 16-bit chunk is LSB, the 2nd is MSB
  let lower = this.readRegister16(addr,clickBoardNum)
  let upper =this.readRegister16(addr+1,clickBoardNum)


  return (upper << 16 | lower)
}

//Write two bytes to a spot
writeRegister16(addr:number,  val:number,clickBoardNum:clickBoardID)
{
  this.returnError[clickBoardNum]  = status.SENSOR_SUCCESS; //By default, return success
let i2cBuffer = pins.createBuffer(4)

i2cBuffer.setNumber(NumberFormat.UInt8LE, 0, addr >> 8 )
i2cBuffer.setNumber(NumberFormat.UInt8LE, 1, addr & 0xFF)
i2cBuffer.setNumber(NumberFormat.UInt8LE, 2, val >> 8) 
i2cBuffer.setNumber(NumberFormat.UInt8LE, 3, val & 0xFF)

super.i2cWriteBuffer(this.MLX90632_DEFAULT_ADDRESS,i2cBuffer,clickBoardNum);

  

 
}

//Write a value to EEPROM
//Requires unlocking the EEPROM, writing =0x0000, unlocking again, then writing value
//The datasheet doesn't go a good job of explaining how writing to EEPROM works.
//This should work but doesn't. It seems the IC is very sensitive to I2C traffic while
//the sensor is recording the new EEPROM.
writeEEPROM(addr:number,  val:number,clickBoardNum:clickBoardID)
{
  //Put device into halt mode (page 15)
  let originalMode = this.getMode(clickBoardNum);
  this.setMode(this.MODE_SLEEP,clickBoardNum);

  //Wait for complete
  while (this.deviceBusy(clickBoardNum)) control.waitMicros(1);

  //Magic unlock (page 17)
  this.writeRegister16(0x3005, 0x554C,clickBoardNum);

  //Wait for complete
  control.waitMicros(100);

  //Now we can write to one EEPROM word
  //Write =0x0000 to user's location (page 16) to erase
  this.writeRegister16(addr, 0x0000,clickBoardNum);

  //Wait for complete
  control.waitMicros(100);
  //while (eepromBusy()) control.waitMicros(1);
  //while (deviceBusy()) control.waitMicros(1);

  //Magic unlock again
  this.writeRegister16(0x3005, 0x554C,clickBoardNum);

  //Wait for complete
  control.waitMicros(100);

  //Now we can write to one EEPROM word
  this.writeRegister16(addr, val,clickBoardNum);

  //Wait for complete
  control.waitMicros(100);
  //while (eepromBusy()) control.waitMicros(1);
  //while (deviceBusy()) control.waitMicros(1);

  //Return to original mode
  this.setMode(originalMode,clickBoardNum);
}

}
}