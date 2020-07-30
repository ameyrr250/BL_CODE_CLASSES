// total=82024 new=88.91% cached=0.00% other=11.09%
(function (ectx) {
'use strict';
const runtime = ectx.runtime;
const oops = ectx.oops;
const doNothing = ectx.doNothing;
const pxsim = ectx.pxsim;
const globals = ectx.globals;
const maybeYield = ectx.maybeYield;
const setupDebugger = ectx.setupDebugger;
const isBreakFrame = ectx.isBreakFrame;
const breakpoint = ectx.breakpoint;
const trace = ectx.trace;
const checkStack = ectx.checkStack;
const leave = ectx.leave;
const checkResumeConsumed = ectx.checkResumeConsumed;
const setupResume = ectx.setupResume;
const setupLambda = ectx.setupLambda;
const checkSubtype = ectx.checkSubtype;
const failedCast = ectx.failedCast;
const buildResume = ectx.buildResume;
const mkVTable = ectx.mkVTable;
const bind = ectx.bind;
const leaveAccessor = ectx.leaveAccessor;
const __this = runtime;
const pxtrt = pxsim.pxtrt;
let yieldSteps = 1;
ectx.setupYield(function() { yieldSteps = 100; })
pxsim.setTitle("core");
pxsim.setConfigData({}, {});
pxtrt.mapKeyNames = [
 "",
 "CLR_id",
 "DIRCLR_id",
 "DIRSET_id",
 "GPIOPULLENSET_id",
 "GPIO_id",
 "I2C_READ_NO_MEM_id",
 "I2C_READ_id",
 "I2C_WRITE_NO_MEM_id",
 "I2C_WRITE_id",
 "MQTTMessage",
 "MQTTMessageRetrieveState",
 "ODC_id",
 "SET_id",
 "SPI_BAUD_id",
 "SPI_CONFIG_CS_id",
 "SPI_CONFIG_id",
 "SPI_READBULK_CS_id",
 "SPI_READ_id",
 "SPI_WRITEBULK_CS_id",
 "SPI_WRITEBULK_id",
 "SPI_WRITE_id",
 "TOGGLE_id",
 "UART_BAUD_id",
 "UART_CLEAR_RX_DATA",
 "UART_INTEN",
 "UART_INTENCLR",
 "UART_READ_RX_DATA",
 "UART_READ_RX_DATA_BYTES",
 "UART_STATUS",
 "UART_WRITE_TX_DATA",
 "defaultWiFiTimeoutmS",
 "pitchClick",
 "pitchPin",
 "receivedData",
 "registerValue",
 "response"
];
__this.setupPerfCounters([]);
const pxsim_Array__getAt = pxsim.Array_.getAt;
const pxsim_Array__length = pxsim.Array_.length;
const pxsim_Array__mk = pxsim.Array_.mk;
const pxsim_Array__push = pxsim.Array_.push;
const pxsim_Boolean__bang = pxsim.Boolean_.bang;
const pxsim_String__concat = pxsim.String_.concat;
const pxsim_String__stringConv = pxsim.String_.stringConv;
const pxsim_numops_toBool = pxsim.numops.toBool;
const pxsim_numops_toBoolDecr = pxsim.numops.toBoolDecr;
const pxsim_pxtcore_mkAction = pxsim.pxtcore.mkAction;
const pxsim_pxtcore_mkClassInstance = pxsim.pxtcore.mkClassInstance;
const pxsim_pxtrt_ldlocRef = pxsim.pxtrt.ldlocRef;
const pxsim_pxtrt_mapGetByString = pxsim.pxtrt.mapGetByString;
const pxsim_pxtrt_stclo = pxsim.pxtrt.stclo;
const pxsim_pxtrt_stlocRef = pxsim.pxtrt.stlocRef;
const pxsim_Boolean_ = pxsim.Boolean_;
const pxsim_pxtcore = pxsim.pxtcore;
const pxsim_String_ = pxsim.String_;
const pxsim_ImageMethods = pxsim.ImageMethods;
const pxsim_Array_ = pxsim.Array_;
const pxsim_pxtrt = pxsim.pxtrt;
const pxsim_numops = pxsim.numops;


function _main___P638511(s) {
let r0 = s.r0, step = s.pc;
s.pc = -1;


while (true) {
if (yieldSteps-- < 0 && maybeYield(s, step, r0)) return null;
switch (step) {
  case 0:

    globals._intervals___638814 = (undefined);
    globals.listeners___638825 = (undefined);
    r0 = pxsim.pins.createBuffer(1);
    globals.CLEAR_BBOARD_TX_BUFFER___639060 = (r0);
    r0 = pxsim.BufferMethods.setNumber(globals.CLEAR_BBOARD_TX_BUFFER___639060, 2, 0, 1);
    r0 = pxsim.pins.createBuffer(1);
    globals.CLEAR_BBOARD_RX_BUFFER___639072 = (r0);
    r0 = pxsim.BufferMethods.setNumber(globals.CLEAR_BBOARD_RX_BUFFER___639072, 2, 0, 0);
    r0 = pxsim.pins.createBuffer(1);
    globals.READ_TX_BUFFER_SIZE___639082 = (r0);
    r0 = pxsim.BufferMethods.setNumber(globals.READ_TX_BUFFER_SIZE___639082, 2, 0, 3);
    r0 = pxsim.pins.createBuffer(1);
    globals.EXECUTE_BBOARD_COMMAND___639092 = (r0);
    r0 = pxsim.BufferMethods.setNumber(globals.EXECUTE_BBOARD_COMMAND___639092, 2, 0, 7);
    r0 = pxsim.pins.createBuffer(1);
    globals.READ_BBOARD_TX_BUFFER___639102 = (r0);
    r0 = pxsim.BufferMethods.setNumber(globals.READ_BBOARD_TX_BUFFER___639102, 2, 0, 2);
    r0 = pxsim_pxtcore_mkClassInstance(bBoard_UARTSettings__C639147_VT);
    s.tmp_0 = r0;
    s.tmp_1 = bBoard_UARTSettings_constructor__P639155_mk(s);
    s.tmp_1.arg0 = s.tmp_0;
    s.pc = 1; return s.tmp_1;
  case 1:
    r0 = s.retval;
    globals.UARTs___639181 = (s.tmp_0);
    r0 = pxsim_pxtcore_mkClassInstance(bBoard_UARTSettings__C639147_VT);
    s.tmp_0 = r0;
    s.tmp_1 = bBoard_UARTSettings_constructor__P639155_mk(s);
    s.tmp_1.arg0 = s.tmp_0;
    s.pc = 2; return s.tmp_1;
  case 2:
    r0 = s.retval;
    globals.UARTs___639189 = (s.tmp_0);
    r0 = pxsim_pxtcore_mkClassInstance(WiFiSetResponses_SetResponse__C639183_VT);
    s.tmp_0 = r0;
    s.tmp_1 = WiFiSetResponses_SetResponse_constructor__P639187_mk(s);
    s.tmp_1.arg0 = s.tmp_0;
    s.pc = 3; return s.tmp_1;
  case 3:
    r0 = s.retval;
    globals.SetResponseObj___639192 = (s.tmp_0);
    r0 = pxsim_pxtrt.mkMap();
    s.tmp_0 = r0;
    r0 = pxsim_String_.mkEmpty();
    s.tmp_1 = r0;
    r0 = pxsim_pxtrt.mapSetByString(s.tmp_0, "topic", s.tmp_1);
    r0 = pxsim_String_.mkEmpty();
    s.tmp_2 = r0;
    r0 = pxsim_pxtrt.mapSetByString(s.tmp_0, "key", s.tmp_2);
    r0 = pxsim_String_.mkEmpty();
    s.tmp_3 = r0;
    r0 = pxsim_pxtrt.mapSetByString(s.tmp_0, "cmd", s.tmp_3);
    r0 = pxsim_String_.mkEmpty();
    s.tmp_4 = r0;
    r0 = pxsim_pxtrt.mapSetByString(s.tmp_0, "varName", s.tmp_4);
    r0 = pxsim_String_.mkEmpty();
    s.tmp_5 = r0;
    r0 = pxsim_pxtrt.mapSetByString(s.tmp_0, "value", s.tmp_5);
    globals.MQTTMessageObject___639204 = (s.tmp_0);
    r0 = pxsim_Array__mk();
    s.tmp_0 = r0;
    r0 = pxsim_Array__push(s.tmp_0, globals.MQTTMessageObject___639204);
    globals.mqttMessageList___639206 = (s.tmp_0);
    r0 = pxsim_Array_.pop(globals.mqttMessageList___639206);
    r0 = pxsim_pxtcore_mkClassInstance(bBoard_PinSettings__C639156_VT);
    s.tmp_0 = r0;
    s.tmp_1 = bBoard_PinSettings_constructor__P639162_mk(s);
    s.tmp_1.arg0 = s.tmp_0;
    s.pc = 4; return s.tmp_1;
  case 4:
    r0 = s.retval;
    globals.PINs___639216 = (s.tmp_0);
    r0 = pxsim_pxtcore_mkClassInstance(bBoard_I2CSettings__C639174_VT);
    s.tmp_0 = r0;
    s.tmp_1 = bBoard_I2CSettings_constructor__P639179_mk(s);
    s.tmp_1.arg0 = s.tmp_0;
    s.pc = 5; return s.tmp_1;
  case 5:
    r0 = s.retval;
    globals.I2Cs___639246 = (s.tmp_0);
    r0 = pxsim_pxtcore_mkClassInstance(bBoard_PinSettings__C639156_VT);
    s.tmp_0 = r0;
    s.tmp_1 = bBoard_PinSettings_constructor__P639162_mk(s);
    s.tmp_1.arg0 = s.tmp_0;
    s.pc = 6; return s.tmp_1;
  case 6:
    r0 = s.retval;
    globals.PINs___639268 = (s.tmp_0);
    r0 = pxsim_pxtcore_mkClassInstance(bBoard_SPIsetting__C639165_VT);
    s.tmp_0 = r0;
    s.tmp_1 = bBoard_SPIsetting_constructor__P639173_mk(s);
    s.tmp_1.arg0 = s.tmp_0;
    s.pc = 7; return s.tmp_1;
  case 7:
    r0 = s.retval;
    globals.SPIs___639271 = (s.tmp_0);
    r0 = pxsim_pxtcore_mkClassInstance(bBoard_I2CSettings__C639174_VT);
    s.tmp_0 = r0;
    s.tmp_1 = bBoard_I2CSettings_constructor__P639179_mk(s);
    s.tmp_1.arg0 = s.tmp_0;
    s.pc = 8; return s.tmp_1;
  case 8:
    r0 = s.retval;
    globals.i2csettingsobj___639315 = (s.tmp_0);
    r0 = pxsim_pxtcore_mkClassInstance(bBoard_PinSettings__C639156_VT);
    s.tmp_0 = r0;
    s.tmp_1 = bBoard_PinSettings_constructor__P639162_mk(s);
    s.tmp_1.arg0 = s.tmp_0;
    s.pc = 9; return s.tmp_1;
  case 9:
    r0 = s.retval;
    globals.PINs___639330 = (s.tmp_0);
    r0 = pxsim_pxtcore_mkClassInstance(bBoard_I2CSettings__C639174_VT);
    s.tmp_0 = r0;
    s.tmp_1 = bBoard_I2CSettings_constructor__P639179_mk(s);
    s.tmp_1.arg0 = s.tmp_0;
    s.pc = 10; return s.tmp_1;
  case 10:
    r0 = s.retval;
    globals.I2Cs___639333 = (s.tmp_0);
    r0 = pxsim_pxtcore_mkClassInstance(bBoard_PinSettings__C639156_VT);
    s.tmp_0 = r0;
    s.tmp_1 = bBoard_PinSettings_constructor__P639162_mk(s);
    s.tmp_1.arg0 = s.tmp_0;
    s.pc = 11; return s.tmp_1;
  case 11:
    r0 = s.retval;
    globals.PINs___639361 = (s.tmp_0);
    r0 = pxsim_pxtcore_mkClassInstance(bBoard_I2CSettings__C639174_VT);
    s.tmp_0 = r0;
    s.tmp_1 = bBoard_I2CSettings_constructor__P639179_mk(s);
    s.tmp_1.arg0 = s.tmp_0;
    s.pc = 12; return s.tmp_1;
  case 12:
    r0 = s.retval;
    globals.I2Cs___639364 = (s.tmp_0);
    r0 = pxsim_pxtcore_mkClassInstance(bBoard_PinSettings__C639156_VT);
    s.tmp_0 = r0;
    s.tmp_1 = bBoard_PinSettings_constructor__P639162_mk(s);
    s.tmp_1.arg0 = s.tmp_0;
    s.pc = 13; return s.tmp_1;
  case 13:
    r0 = s.retval;
    globals.PINs___639383 = (s.tmp_0);
    r0 = pxsim_pxtcore_mkClassInstance(bBoard_PWMSettings__C639141_VT);
    s.tmp_0 = r0;
    s.tmp_1 = bBoard_PWMSettings_constructor__P639146_mk(s);
    s.tmp_1.arg0 = s.tmp_0;
    s.pc = 14; return s.tmp_1;
  case 14:
    r0 = s.retval;
    globals.pwms___639386 = (s.tmp_0);
    r0 = pxsim_pxtcore_mkClassInstance(bBoard_PinSettings__C639156_VT);
    s.tmp_0 = r0;
    s.tmp_1 = bBoard_PinSettings_constructor__P639162_mk(s);
    s.tmp_1.arg0 = s.tmp_0;
    s.pc = 15; return s.tmp_1;
  case 15:
    r0 = s.retval;
    globals.PINs___639412 = (s.tmp_0);
    r0 = pxsim_pxtcore_mkClassInstance(bBoard_PinSettings__C639156_VT);
    s.tmp_0 = r0;
    s.tmp_1 = bBoard_PinSettings_constructor__P639162_mk(s);
    s.tmp_1.arg0 = s.tmp_0;
    s.pc = 16; return s.tmp_1;
  case 16:
    r0 = s.retval;
    globals.PINs___639522 = (s.tmp_0);
    r0 = pxsim_pxtcore_mkClassInstance(bBoard_PWMSettings__C639141_VT);
    s.tmp_0 = r0;
    s.tmp_1 = bBoard_PWMSettings_constructor__P639146_mk(s);
    s.tmp_1.arg0 = s.tmp_0;
    s.pc = 17; return s.tmp_1;
  case 17:
    r0 = s.retval;
    globals.PWMs___639612 = (s.tmp_0);
    r0 = pxsim_pxtcore_mkClassInstance(bBoard_I2CSettings__C639174_VT);
    s.tmp_0 = r0;
    s.tmp_1 = bBoard_I2CSettings_constructor__P639179_mk(s);
    s.tmp_1.arg0 = s.tmp_0;
    s.pc = 18; return s.tmp_1;
  case 18:
    r0 = s.retval;
    globals.I2Cs___639628 = (s.tmp_0);
    r0 = pxsim_pxtcore_mkClassInstance(Heart_Rate_interrupt_stat_register__C639631_VT);
    s.tmp_0 = r0;
    s.tmp_1 = Heart_Rate_interrupt_stat_register_constructor__P639644_mk(s);
    s.tmp_1.arg0 = s.tmp_0;
    s.pc = 19; return s.tmp_1;
  case 19:
    r0 = s.retval;
    globals.interrupt_stat_bits___639646 = (s.tmp_0);
    r0 = pxsim_pxtcore_mkClassInstance(Heart_Rate_interrupt_en_register__C639648_VT);
    s.tmp_0 = r0;
    s.tmp_1 = Heart_Rate_interrupt_en_register_constructor__P639661_mk(s);
    s.tmp_1.arg0 = s.tmp_0;
    s.pc = 20; return s.tmp_1;
  case 20:
    r0 = s.retval;
    globals.interrupt_en_bits___639663 = (s.tmp_0);
    r0 = pxsim_pxtcore_mkClassInstance(Heart_Rate_mode_config_register__C639665_VT);
    s.tmp_0 = r0;
    s.tmp_1 = Heart_Rate_mode_config_register_constructor__P639676_mk(s);
    s.tmp_1.arg0 = s.tmp_0;
    s.tmp_1.arg1 = 0;
    s.pc = 21; return s.tmp_1;
  case 21:
    r0 = s.retval;
    globals.mode_config_bits___639678 = (s.tmp_0);
    r0 = pxsim_pxtcore_mkClassInstance(Heart_Rate_spo2_config_register__C639680_VT);
    s.tmp_0 = r0;
    s.tmp_1 = Heart_Rate_spo2_config_register_constructor__P639689_mk(s);
    s.tmp_1.arg0 = s.tmp_0;
    s.pc = 22; return s.tmp_1;
  case 22:
    r0 = s.retval;
    globals.spo2_config_bits___639691 = (s.tmp_0);
    r0 = pxsim_pxtcore_mkClassInstance(Heart_Rate_led_config_register__C639693_VT);
    s.tmp_0 = r0;
    s.tmp_1 = Heart_Rate_led_config_register_constructor__P639700_mk(s);
    s.tmp_1.arg0 = s.tmp_0;
    s.pc = 23; return s.tmp_1;
  case 23:
    r0 = s.retval;
    globals.led_config_bits___639702 = (s.tmp_0);
    r0 = pxsim_Array__mk();
    s.tmp_0 = r0;
    r0 = pxsim_Array__push(s.tmp_0, 0);
    r0 = pxsim_Array__push(s.tmp_0, 0);
    r0 = pxsim_pxtrt.mkMap();
    s.tmp_1 = r0;
    r0 = pxsim_pxtrt.mapSetByString(s.tmp_1, "v_ctr", s.tmp_0);
    r0 = pxsim_pxtrt.mapSetByString(s.tmp_1, "dcW", 0);
    globals.irFilters___639705 = (s.tmp_1);
    r0 = pxsim_Array__mk();
    globals.rates___639719 = (r0);
    s.tmp_0 = helpers_arrayFill__P638677_mk(s);
    s.tmp_0.arg0 = globals.rates___639719;
    s.tmp_0.arg1 = 0;
    s.tmp_0.arg2 = 0;
    s.tmp_0.arg3 = 6;
    s.pc = 24; return s.tmp_0;
  case 24:
    r0 = s.retval;
    globals.i___639876 = (1);
    globals.f___639878 = (0.5);
    r0 = (globals.i___639876 + globals.f___639878);
    globals.plus___639881 = (r0);
    r0 = (globals.i___639876 - globals.f___639878);
    globals.minus___639885 = (r0);
    r0 = pxsim.Math_.random();
    globals.r___639888 = (r0);
    r0 = pxsim.Math_.randomRange(5, 10);
    globals.ri___639891 = (r0);
    r0 = pxsim_Array__mk();
    s.tmp_0 = r0;
    r0 = pxsim_Array__push(s.tmp_0, 13330);
    r0 = pxsim_Array__push(s.tmp_0, 30806);
    s.tmp_1 = check__P639893_mk(s);
    s.tmp_4 = Buffer_pack__P638998_mk(s);
    s.tmp_4.arg0 = "<2h";
    s.tmp_4.arg1 = s.tmp_0;
    s.pc = 26; return s.tmp_4;
  case 26:
    r0 = s.retval;
    s.tmp_3 = r0;
    r0 = pxsim.BufferMethods.toHex(s.tmp_3);
    s.tmp_2 = r0;
    r0 = (s.tmp_2 == "12345678");
    s.tmp_1.arg0 = r0;
    s.pc = 25; return s.tmp_1;
  case 25:
    r0 = s.retval;
    r0 = pxsim_Array__mk();
    s.tmp_0 = r0;
    r0 = pxsim_Array__push(s.tmp_0, 13330);
    r0 = pxsim_Array__push(s.tmp_0, 30806);
    s.tmp_1 = check__P639893_mk(s);
    s.tmp_4 = Buffer_pack__P638998_mk(s);
    s.tmp_4.arg0 = ">hh";
    s.tmp_4.arg1 = s.tmp_0;
    s.pc = 28; return s.tmp_4;
  case 28:
    r0 = s.retval;
    s.tmp_3 = r0;
    r0 = pxsim.BufferMethods.toHex(s.tmp_3);
    s.tmp_2 = r0;
    r0 = (s.tmp_2 == "34127856");
    s.tmp_1.arg0 = r0;
    s.pc = 27; return s.tmp_1;
  case 27:
    r0 = s.retval;
    s.tmp_0 = check__P639893_mk(s);
    s.tmp_3 = Buffer_fromHex__P638991_mk(s);
    s.tmp_3.arg0 = "F00d";
    s.pc = 30; return s.tmp_3;
  case 30:
    r0 = s.retval;
    s.tmp_2 = r0;
    r0 = pxsim.BufferMethods.toHex(s.tmp_2);
    s.tmp_1 = r0;
    r0 = (s.tmp_1 == "f00d");
    s.tmp_0.arg0 = r0;
    s.pc = 29; return s.tmp_0;
  case 29:
    r0 = s.retval;
    r0 = undefined;
    return leave(s, r0)
  default: oops()
} } }
_main___P638511.info = {"start":0,"length":0,"line":0,"column":0,"endLine":0,"endColumn":0,"fileName":"test.ts","functionName":"<main>","argumentNames":[]}
_main___P638511.continuations = [  ]

function _main___P638511_mk(s) {
    checkStack(s.depth);
    return {
        parent: s, fn: _main___P638511, depth: s.depth + 1,
        pc: 0, retval: undefined, r0: undefined, overwrittenPC: false, lambdaArgs: null,
  tmp_0: undefined,
  tmp_1: undefined,
  tmp_2: undefined,
  tmp_3: undefined,
  tmp_4: undefined,
  tmp_5: undefined,
} }





function Buffer_fromHex__P638991(s) {
let r0 = s.r0, step = s.pc;
s.pc = -1;


while (true) {
if (yieldSteps-- < 0 && maybeYield(s, step, r0)) return null;
switch (step) {
  case 0:

    s.hexStr___639913 = undefined;
    s.res___639915 = undefined;
    s.i___639926 = undefined;
    s.p0___639932 = undefined;
    s.p1___639943 = undefined;
    if (s.lambdaArgs) {
      s.arg0 = (s.lambdaArgs[0]);
      s.lambdaArgs = null;
    }
    s.hexStr___639913 = ("0123456789abcdef");
    r0 = pxsim_String_.length(s.arg0);
    s.tmp_1 = r0;
    r0 = (s.tmp_1 >> 1);
    s.tmp_0 = r0;
    r0 = pxsim.control.createBuffer(s.tmp_0);
    s.res___639915 = (r0);
    s.tmp_0 = helpers_stringToLowerCase__P638698_mk(s);
    s.tmp_0.arg0 = s.arg0;
    s.pc = 7; return s.tmp_0;
  case 7:
    r0 = s.retval;
    s.arg0 = (r0);
    s.i___639926 = (0);
  case 1:
    s.tmp_1 = r0 = s.i___639926;
    r0 = pxsim_String_.length(s.arg0);
    s.tmp_2 = r0;
    r0 = (s.tmp_1 < s.tmp_2);
    s.tmp_0 = r0;
    r0 = pxsim_numops_toBoolDecr(s.tmp_0);
    if (!r0) { step = 6; continue; }
    s.tmp_3 = r0 = s.hexStr___639913;
    r0 = pxsim_String_.charAt(s.arg0, s.i___639926);
    s.tmp_4 = r0;
    r0 = pxsim_String_.indexOf(s.tmp_3, s.tmp_4, undefined);
    s.p0___639932 = (r0);
    s.tmp_0 = r0 = s.hexStr___639913;
    s.tmp_2 = r0 = s.arg0;
    r0 = (s.i___639926 + 1);
    s.tmp_3 = r0;
    r0 = pxsim_String_.charAt(s.tmp_2, s.tmp_3);
    s.tmp_1 = r0;
    r0 = pxsim_String_.indexOf(s.tmp_0, s.tmp_1, undefined);
    s.p1___639943 = (r0);
    r0 = (s.p0___639932 < 0);
    s.tmp_0 = r0;
    r0 = pxsim_numops_toBool(s.tmp_0);
    if (!r0) { step = 2; continue; }
    r0 = s.tmp_0;
    { step = 3; continue; }
  case 2:
    r0 = (s.p1___639943 < 0);
  case 3:
    // jmp value (already in r0)
    s.tmp_1 = r0;
    r0 = pxsim_numops_toBoolDecr(s.tmp_1);
    if (!r0) { step = 4; continue; }
    r0 = pxsim_pxtcore.throwValue("Invalid hex");
  case 4:
  case 5:
    s.tmp_2 = r0 = s.res___639915;
    r0 = (s.i___639926 >> 1);
    s.tmp_3 = r0;
    r0 = (s.p0___639932 << 4);
    s.tmp_5 = r0;
    r0 = (s.tmp_5 | s.p1___639943);
    s.tmp_4 = r0;
    r0 = pxsim.BufferMethods.setByte(s.tmp_2, s.tmp_3, s.tmp_4);
    r0 = (s.i___639926 + 2);
    s.i___639926 = (r0);
    { step = 1; continue; }
  case 6:
    r0 = s.res___639915;
    return leave(s, r0)
  default: oops()
} } }
Buffer_fromHex__P638991.info = {"start":6683,"length":469,"line":240,"column":4,"endLine":252,"endColumn":5,"fileName":"buffer.ts","functionName":"fromHex","argumentNames":["hex"]}

function Buffer_fromHex__P638991_mk(s) {
    checkStack(s.depth);
    return {
        parent: s, fn: Buffer_fromHex__P638991, depth: s.depth + 1,
        pc: 0, retval: undefined, r0: undefined, overwrittenPC: false, lambdaArgs: null,
  tmp_0: undefined,
  tmp_1: undefined,
  tmp_2: undefined,
  tmp_3: undefined,
  tmp_4: undefined,
  tmp_5: undefined,
  hexStr___639913: undefined,
  res___639915: undefined,
  i___639926: undefined,
  p0___639932: undefined,
  p1___639943: undefined,
  arg0: undefined,
} }





function helpers_stringToLowerCase__P638698(s) {
let r0 = s.r0, step = s.pc;
s.pc = -1;


while (true) {
if (yieldSteps-- < 0 && maybeYield(s, step, r0)) return null;
switch (step) {
  case 0:

    s.r___639974 = undefined;
    s.prev___639975 = undefined;
    s.i___639976 = undefined;
    s.c___639982 = undefined;
    if (s.lambdaArgs) {
      s.arg0 = (s.lambdaArgs[0]);
      s.lambdaArgs = null;
    }
    r0 = pxsim_String_.mkEmpty();
    s.r___639974 = (r0);
    s.prev___639975 = (0);
    s.i___639976 = (0);
  case 1:
    s.tmp_1 = r0 = s.i___639976;
    r0 = pxsim_String_.length(s.arg0);
    s.tmp_2 = r0;
    r0 = (s.tmp_1 < s.tmp_2);
    s.tmp_0 = r0;
    r0 = pxsim_numops_toBoolDecr(s.tmp_0);
    if (!r0) { step = 6; continue; }
    r0 = pxsim_String_.charCodeAt(s.arg0, s.i___639976);
    s.c___639982 = (r0);
    r0 = (65 <= s.c___639982);
    s.tmp_0 = r0;
    r0 = pxsim_numops_toBool(s.tmp_0);
    if (r0) { step = 2; continue; }
    r0 = s.tmp_0;
    { step = 3; continue; }
  case 2:
    r0 = (s.c___639982 <= 90);
  case 3:
    // jmp value (already in r0)
    s.tmp_1 = r0;
    r0 = pxsim_numops_toBoolDecr(s.tmp_1);
    if (!r0) { step = 4; continue; }
    if ((s.r___639974) && (s.r___639974).vtable) {
    setupResume(s, 7);
    pxsim_String__stringConv(s.r___639974);
    checkResumeConsumed();
    return;
    } else { s.retval = (s.r___639974) + ""; }
  case 7:
    r0 = s.retval;
    s.tmp_2 = r0;
    s.tmp_7 = helpers_stringSlice__P638697_mk(s);
    s.tmp_7.arg0 = s.arg0;
    s.tmp_7.arg1 = s.prev___639975;
    s.tmp_7.arg2 = s.i___639976;
    s.pc = 8; return s.tmp_7;
  case 8:
    r0 = s.retval;
    s.tmp_6 = r0;
    if ((s.tmp_6) && (s.tmp_6).vtable) {
    setupResume(s, 9);
    pxsim_String__stringConv(s.tmp_6);
    checkResumeConsumed();
    return;
    } else { s.retval = (s.tmp_6) + ""; }
  case 9:
    r0 = s.retval;
    s.tmp_5 = r0;
    r0 = (s.c___639982 + 32);
    s.tmp_10 = r0;
    r0 = pxsim_String_.fromCharCode(s.tmp_10);
    s.tmp_9 = r0;
    if ((s.tmp_9) && (s.tmp_9).vtable) {
    setupResume(s, 10);
    pxsim_String__stringConv(s.tmp_9);
    checkResumeConsumed();
    return;
    } else { s.retval = (s.tmp_9) + ""; }
  case 10:
    r0 = s.retval;
    s.tmp_8 = r0;
    r0 = pxsim_String__concat(s.tmp_5, s.tmp_8);
    s.tmp_4 = r0;
    if ((s.tmp_4) && (s.tmp_4).vtable) {
    setupResume(s, 11);
    pxsim_String__stringConv(s.tmp_4);
    checkResumeConsumed();
    return;
    } else { s.retval = (s.tmp_4) + ""; }
  case 11:
    r0 = s.retval;
    s.tmp_3 = r0;
    r0 = pxsim_String__concat(s.tmp_2, s.tmp_3);
    s.r___639974 = (r0);
    r0 = (s.i___639976 + 1);
    s.prev___639975 = (r0);
  case 4:
  case 5:
    r0 = (s.i___639976 + 1);
    s.i___639976 = (r0);
    { step = 1; continue; }
  case 6:
    if ((s.r___639974) && (s.r___639974).vtable) {
    setupResume(s, 12);
    pxsim_String__stringConv(s.r___639974);
    checkResumeConsumed();
    return;
    } else { s.retval = (s.r___639974) + ""; }
  case 12:
    r0 = s.retval;
    s.tmp_0 = r0;
    s.tmp_3 = helpers_stringSlice__P638697_mk(s);
    s.tmp_3.arg0 = s.arg0;
    s.tmp_3.arg1 = s.prev___639975;
    s.tmp_3.arg2 = undefined;
    s.pc = 13; return s.tmp_3;
  case 13:
    r0 = s.retval;
    s.tmp_2 = r0;
    if ((s.tmp_2) && (s.tmp_2).vtable) {
    setupResume(s, 14);
    pxsim_String__stringConv(s.tmp_2);
    checkResumeConsumed();
    return;
    } else { s.retval = (s.tmp_2) + ""; }
  case 14:
    r0 = s.retval;
    s.tmp_1 = r0;
    r0 = pxsim_String__concat(s.tmp_0, s.tmp_1);
    s.r___639974 = (r0);
    r0 = s.r___639974;
    return leave(s, r0)
  default: oops()
} } }
helpers_stringToLowerCase__P638698.info = {"start":11538,"length":386,"line":393,"column":4,"endLine":405,"endColumn":5,"fileName":"pxt-helpers.ts","functionName":"stringToLowerCase","argumentNames":["s"]}

function helpers_stringToLowerCase__P638698_mk(s) {
    checkStack(s.depth);
    return {
        parent: s, fn: helpers_stringToLowerCase__P638698, depth: s.depth + 1,
        pc: 0, retval: undefined, r0: undefined, overwrittenPC: false, lambdaArgs: null,
  tmp_0: undefined,
  tmp_1: undefined,
  tmp_2: undefined,
  tmp_3: undefined,
  tmp_4: undefined,
  tmp_5: undefined,
  tmp_6: undefined,
  tmp_7: undefined,
  tmp_8: undefined,
  tmp_9: undefined,
  tmp_10: undefined,
  r___639974: undefined,
  prev___639975: undefined,
  i___639976: undefined,
  c___639982: undefined,
  arg0: undefined,
} }





function helpers_stringSlice__P638697(s) {
let r0 = s.r0, step = s.pc;
s.pc = -1;


while (true) {
if (yieldSteps-- < 0 && maybeYield(s, step, r0)) return null;
switch (step) {
  case 0:

    s.len___640033 = undefined;
    if (s.lambdaArgs) {
      s.arg0 = (s.lambdaArgs[0]);
      s.arg1 = (s.lambdaArgs[1]);
      s.arg2 = (s.lambdaArgs[2]);
      s.lambdaArgs = null;
    }
    r0 = pxsim_String_.length(s.arg0);
    s.len___640033 = (r0);
    r0 = (s.arg1 < 0);
    s.tmp_0 = r0;
    r0 = pxsim_numops_toBoolDecr(s.tmp_0);
    if (!r0) { step = 1; continue; }
    s.tmp_1 = Math_max__P638707_mk(s);
    r0 = (s.len___640033 + s.arg1);
    s.tmp_1.arg0 = r0;
    s.tmp_1.arg1 = 0;
    s.pc = 7; return s.tmp_1;
  case 7:
    r0 = s.retval;
    s.arg1 = (r0);
  case 1:
  case 2:
    r0 = (s.arg2 == null);
    s.tmp_0 = r0;
    r0 = pxsim_numops_toBoolDecr(s.tmp_0);
    if (!r0) { step = 3; continue; }
    s.arg2 = (s.len___640033);
  case 3:
  case 4:
    r0 = (s.arg2 < 0);
    s.tmp_0 = r0;
    r0 = pxsim_numops_toBoolDecr(s.tmp_0);
    if (!r0) { step = 5; continue; }
    r0 = (s.len___640033 + s.arg2);
    s.arg2 = (r0);
  case 5:
  case 6:
    s.tmp_0 = r0 = s.arg0;
    s.tmp_1 = r0 = s.arg1;
    r0 = (s.arg2 - s.arg1);
    s.tmp_2 = r0;
    r0 = pxsim_String_.substr(s.tmp_0, s.tmp_1, s.tmp_2);
    return leave(s, r0)
  default: oops()
} } }
helpers_stringSlice__P638697.info = {"start":11047,"length":365,"line":373,"column":4,"endLine":389,"endColumn":5,"fileName":"pxt-helpers.ts","functionName":"stringSlice","argumentNames":["s","start","end"]}

function helpers_stringSlice__P638697_mk(s) {
    checkStack(s.depth);
    return {
        parent: s, fn: helpers_stringSlice__P638697, depth: s.depth + 1,
        pc: 0, retval: undefined, r0: undefined, overwrittenPC: false, lambdaArgs: null,
  tmp_0: undefined,
  tmp_1: undefined,
  tmp_2: undefined,
  len___640033: undefined,
  arg0: undefined,
  arg1: undefined,
  arg2: undefined,
} }





function Math_max__P638707(s) {
let r0 = s.r0, step = s.pc;
s.pc = -1;


while (true) {
if (yieldSteps-- < 0 && maybeYield(s, step, r0)) return null;
switch (step) {
  case 0:

    if (s.lambdaArgs) {
      s.arg0 = (s.lambdaArgs[0]);
      s.arg1 = (s.lambdaArgs[1]);
      s.lambdaArgs = null;
    }
    r0 = (s.arg0 >= s.arg1);
    s.tmp_0 = r0;
    r0 = pxsim_numops_toBoolDecr(s.tmp_0);
    if (!r0) { step = 1; continue; }
    r0 = s.arg0;
    { step = 3; continue; }
  case 1:
  case 2:
    r0 = s.arg1;
  case 3:
    return leave(s, r0)
  default: oops()
} } }
Math_max__P638707.info = {"start":15575,"length":105,"line":529,"column":4,"endLine":532,"endColumn":5,"fileName":"pxt-helpers.ts","functionName":"max","argumentNames":["a","b"]}

function Math_max__P638707_mk(s) {
    checkStack(s.depth);
    return {
        parent: s, fn: Math_max__P638707, depth: s.depth + 1,
        pc: 0, retval: undefined, r0: undefined, overwrittenPC: false, lambdaArgs: null,
  tmp_0: undefined,
  arg0: undefined,
  arg1: undefined,
} }





function Buffer_pack__P638998(s) {
let r0 = s.r0, step = s.pc;
s.pc = -1;


while (true) {
if (yieldSteps-- < 0 && maybeYield(s, step, r0)) return null;
switch (step) {
  case 0:

    s.buf___640071 = undefined;
    if (s.lambdaArgs) {
      s.arg0 = (s.lambdaArgs[0]);
      s.arg1 = (s.lambdaArgs[1]);
      s.lambdaArgs = null;
    }
    s.tmp_1 = Buffer_packedSize__P638997_mk(s);
    s.tmp_1.arg0 = s.arg0;
    s.pc = 1; return s.tmp_1;
  case 1:
    r0 = s.retval;
    s.tmp_0 = r0;
    r0 = pxsim.control.createBuffer(s.tmp_0);
    s.buf___640071 = (r0);
    s.tmp_0 = Buffer___packUnpackCore__P639001_mk(s);
    s.tmp_0.arg0 = s.arg0;
    s.tmp_0.arg1 = s.arg1;
    s.tmp_0.arg2 = s.buf___640071;
    s.tmp_0.arg3 = true;
    s.tmp_0.arg4 = 0;
    s.pc = 2; return s.tmp_0;
  case 2:
    r0 = s.retval;
    r0 = s.buf___640071;
    return leave(s, r0)
  default: oops()
} } }
Buffer_pack__P638998.info = {"start":9148,"length":181,"line":328,"column":4,"endLine":332,"endColumn":5,"fileName":"buffer.ts","functionName":"pack","argumentNames":["format","nums"]}

function Buffer_pack__P638998_mk(s) {
    checkStack(s.depth);
    return {
        parent: s, fn: Buffer_pack__P638998, depth: s.depth + 1,
        pc: 0, retval: undefined, r0: undefined, overwrittenPC: false, lambdaArgs: null,
  tmp_0: undefined,
  tmp_1: undefined,
  buf___640071: undefined,
  arg0: undefined,
  arg1: undefined,
} }





function Buffer___packUnpackCore__P639001(s) {
let r0 = s.r0, step = s.pc;
s.pc = -1;


while (true) {
if (yieldSteps-- < 0 && maybeYield(s, step, r0)) return null;
switch (step) {
  case 0:

    s.isBig___640086 = undefined;
    s.idx___640087 = undefined;
    s.i___640088 = undefined;
    s.i0___640101 = undefined;
    s.reps___640109 = undefined;
    s.fmt___640123 = undefined;
    if (s.lambdaArgs) {
      s.arg0 = (s.lambdaArgs[0]);
      s.arg1 = (s.lambdaArgs[1]);
      s.arg2 = (s.lambdaArgs[2]);
      s.arg3 = (s.lambdaArgs[3]);
      s.arg4 = (s.lambdaArgs[4]);
      s.lambdaArgs = null;
    }
    s.isBig___640086 = (false);
    s.idx___640087 = (0);
    s.i___640088 = (0);
  case 1:
    s.tmp_1 = r0 = s.i___640088;
    r0 = pxsim_String_.length(s.arg0);
    s.tmp_2 = r0;
    r0 = (s.tmp_1 < s.tmp_2);
    s.tmp_0 = r0;
    r0 = pxsim_numops_toBoolDecr(s.tmp_0);
    if (!r0) { step = 22; continue; }
    r0 = pxsim_String_.charAt(s.arg0, s.i___640088);
    s.tmp_3 = r0;
    r0 = pxsim_pxtcore.switch_eq(" ", s.tmp_3);
    if (r0) { step = 2; continue; }
    r0 = pxsim_pxtcore.switch_eq("<", s.tmp_3);
    if (r0) { step = 3; continue; }
    r0 = pxsim_pxtcore.switch_eq("=", s.tmp_3);
    if (r0) { step = 4; continue; }
    r0 = pxsim_pxtcore.switch_eq(">", s.tmp_3);
    if (r0) { step = 5; continue; }
    r0 = pxsim_pxtcore.switch_eq("!", s.tmp_3);
    if (r0) { step = 6; continue; }
    r0 = pxsim_pxtcore.switch_eq("x", s.tmp_3);
    if (r0) { step = 7; continue; }
    r0 = s.tmp_3;
    { step = 8; continue; }
  case 2:
  case 3:
  case 4:
    s.isBig___640086 = (false);
    { step = 21; continue; }
  case 5:
  case 6:
    s.isBig___640086 = (true);
    { step = 21; continue; }
  case 7:
    r0 = (s.arg4 + 1);
    s.arg4 = (r0);
    { step = 21; continue; }
  case 8:
    s.i0___640101 = (s.i___640088);
  case 9:
    s.tmp_1 = Buffer_isDigit__P639000_mk(s);
    r0 = pxsim_String_.charAt(s.arg0, s.i___640088);
    s.tmp_1.arg0 = r0;
    s.pc = 23; return s.tmp_1;
  case 23:
    r0 = s.retval;
    s.tmp_0 = r0;
    r0 = pxsim_numops_toBoolDecr(s.tmp_0);
    if (!r0) { step = 10; continue; }
    r0 = (s.i___640088 + 1);
    s.i___640088 = (r0);
    { step = 9; continue; }
  case 10:
    s.reps___640109 = (1);
    r0 = (s.i0___640101 != s.i___640088);
    s.tmp_0 = r0;
    r0 = pxsim_numops_toBoolDecr(s.tmp_0);
    if (!r0) { step = 11; continue; }
    s.tmp_1 = parseInt__P638676_mk(s);
    s.tmp_2 = helpers_stringSlice__P638697_mk(s);
    s.tmp_2.arg0 = s.arg0;
    s.tmp_2.arg1 = s.i0___640101;
    s.tmp_2.arg2 = s.i___640088;
    s.pc = 25; return s.tmp_2;
  case 25:
    r0 = s.retval;
    s.tmp_1.arg0 = r0;
    s.tmp_1.arg1 = undefined;
    s.pc = 24; return s.tmp_1;
  case 24:
    r0 = s.retval;
    s.reps___640109 = (r0);
  case 11:
  case 12:
  case 13:
    s.tmp_0 = r0 = s.reps___640109;
    r0 = (s.tmp_0 - 1);
    s.reps___640109 = (r0);
    r0 = pxsim_numops_toBoolDecr(s.tmp_0);
    if (!r0) { step = 20; continue; }
    s.tmp_1 = Buffer_getFormat__P638999_mk(s);
    r0 = pxsim_String_.charAt(s.arg0, s.i___640088);
    s.tmp_1.arg0 = r0;
    s.tmp_1.arg1 = s.isBig___640086;
    s.pc = 26; return s.tmp_1;
  case 26:
    r0 = s.retval;
    s.fmt___640123 = (r0);
    r0 = (s.fmt___640123 === null);
    s.tmp_0 = r0;
    r0 = pxsim_numops_toBoolDecr(s.tmp_0);
    if (!r0) { step = 14; continue; }
    s.tmp_1 = control_fail__P638810_mk(s);
    r0 = pxsim_String_.charAt(s.arg0, s.i___640088);
    s.tmp_3 = r0;
    if ((s.tmp_3) && (s.tmp_3).vtable) {
    setupResume(s, 28);
    pxsim_String__stringConv(s.tmp_3);
    checkResumeConsumed();
    return;
    } else { s.retval = (s.tmp_3) + ""; }
  case 28:
    r0 = s.retval;
    s.tmp_2 = r0;
    r0 = pxsim_String__concat("Unsupported format character: ", s.tmp_2);
    s.tmp_1.arg0 = r0;
    s.pc = 27; return s.tmp_1;
  case 27:
    r0 = s.retval;
    { step = 19; continue; }
  case 14:
    r0 = pxsim_numops_toBoolDecr(s.arg2);
    if (!r0) { step = 17; continue; }
    r0 = pxsim_numops_toBoolDecr(s.arg3);
    if (!r0) { step = 15; continue; }
    s.tmp_0 = r0 = s.idx___640087;
    r0 = (s.tmp_0 + 1);
    s.idx___640087 = (r0);
    s.tmp_1 = r0 = s.arg2;
    s.tmp_2 = r0 = s.fmt___640123;
    s.tmp_3 = r0 = s.arg4;
    r0 = pxsim_Array__getAt(s.arg1, s.tmp_0);
    s.tmp_4 = r0;
    r0 = pxsim.BufferMethods.setNumber(s.tmp_1, s.tmp_2, s.tmp_3, s.tmp_4);
    { step = 16; continue; }
  case 15:
    s.tmp_0 = r0 = s.arg1;
    r0 = pxsim.BufferMethods.getNumber(s.arg2, s.fmt___640123, s.arg4);
    s.tmp_1 = r0;
    r0 = pxsim_Array__push(s.tmp_0, s.tmp_1);
  case 16:
  case 17:
  case 18:
    s.tmp_0 = r0 = s.arg4;
    s.tmp_2 = Buffer_sizeOfNumberFormat__P639002_mk(s);
    s.tmp_2.arg0 = s.fmt___640123;
    s.pc = 29; return s.tmp_2;
  case 29:
    r0 = s.retval;
    s.tmp_1 = r0;
    r0 = (s.tmp_0 + s.tmp_1);
    s.arg4 = (r0);
  case 19:
    { step = 13; continue; }
  case 20:
  case 21:
    r0 = (s.i___640088 + 1);
    s.i___640088 = (r0);
    { step = 1; continue; }
  case 22:
    r0 = s.arg4;
    return leave(s, r0)
  default: oops()
} } }
Buffer___packUnpackCore__P639001.info = {"start":10393,"length":1537,"line":364,"column":4,"endLine":406,"endColumn":5,"fileName":"buffer.ts","functionName":"__packUnpackCore","argumentNames":["format","nums","buf","isPack","off"]}

function Buffer___packUnpackCore__P639001_mk(s) {
    checkStack(s.depth);
    return {
        parent: s, fn: Buffer___packUnpackCore__P639001, depth: s.depth + 1,
        pc: 0, retval: undefined, r0: undefined, overwrittenPC: false, lambdaArgs: null,
  tmp_0: undefined,
  tmp_1: undefined,
  tmp_2: undefined,
  tmp_3: undefined,
  tmp_4: undefined,
  isBig___640086: undefined,
  idx___640087: undefined,
  i___640088: undefined,
  i0___640101: undefined,
  reps___640109: undefined,
  fmt___640123: undefined,
  arg0: undefined,
  arg1: undefined,
  arg2: undefined,
  arg3: undefined,
  arg4: undefined,
} }





function Buffer_sizeOfNumberFormat__P639002(s) {
let r0 = s.r0, step = s.pc;
s.pc = -1;


while (true) {
if (yieldSteps-- < 0 && maybeYield(s, step, r0)) return null;
switch (step) {
  case 0:

    if (s.lambdaArgs) {
      s.arg0 = (s.lambdaArgs[0]);
      s.lambdaArgs = null;
    }
    s.tmp_0 = r0 = s.arg0;
    r0 = pxsim_pxtcore.switch_eq(1, s.tmp_0);
    if (r0) { step = 1; continue; }
    r0 = pxsim_pxtcore.switch_eq(2, s.tmp_0);
    if (r0) { step = 2; continue; }
    r0 = pxsim_pxtcore.switch_eq(6, s.tmp_0);
    if (r0) { step = 3; continue; }
    r0 = pxsim_pxtcore.switch_eq(7, s.tmp_0);
    if (r0) { step = 4; continue; }
    r0 = pxsim_pxtcore.switch_eq(3, s.tmp_0);
    if (r0) { step = 5; continue; }
    r0 = pxsim_pxtcore.switch_eq(4, s.tmp_0);
    if (r0) { step = 6; continue; }
    r0 = pxsim_pxtcore.switch_eq(8, s.tmp_0);
    if (r0) { step = 7; continue; }
    r0 = pxsim_pxtcore.switch_eq(9, s.tmp_0);
    if (r0) { step = 8; continue; }
    r0 = pxsim_pxtcore.switch_eq(5, s.tmp_0);
    if (r0) { step = 9; continue; }
    r0 = pxsim_pxtcore.switch_eq(10, s.tmp_0);
    if (r0) { step = 10; continue; }
    r0 = pxsim_pxtcore.switch_eq(12, s.tmp_0);
    if (r0) { step = 11; continue; }
    r0 = pxsim_pxtcore.switch_eq(11, s.tmp_0);
    if (r0) { step = 12; continue; }
    r0 = pxsim_pxtcore.switch_eq(15, s.tmp_0);
    if (r0) { step = 13; continue; }
    r0 = pxsim_pxtcore.switch_eq(13, s.tmp_0);
    if (r0) { step = 14; continue; }
    r0 = pxsim_pxtcore.switch_eq(16, s.tmp_0);
    if (r0) { step = 15; continue; }
    r0 = pxsim_pxtcore.switch_eq(14, s.tmp_0);
    if (r0) { step = 16; continue; }
    r0 = s.tmp_0;
    { step = 17; continue; }
  case 1:
  case 2:
  case 3:
  case 4:
    r0 = 1;
    { step = 18; continue; }
  case 5:
  case 6:
  case 7:
  case 8:
    r0 = 2;
    { step = 18; continue; }
  case 9:
  case 10:
  case 11:
  case 12:
  case 13:
  case 14:
    r0 = 4;
    { step = 18; continue; }
  case 15:
  case 16:
    r0 = 8;
    { step = 18; continue; }
  case 17:
    r0 = 0;
  case 18:
    return leave(s, r0)
  default: oops()
} } }
Buffer_sizeOfNumberFormat__P639002.info = {"start":12009,"length":856,"line":411,"column":4,"endLine":435,"endColumn":5,"fileName":"buffer.ts","functionName":"sizeOfNumberFormat","argumentNames":["format"]}

function Buffer_sizeOfNumberFormat__P639002_mk(s) {
    checkStack(s.depth);
    return {
        parent: s, fn: Buffer_sizeOfNumberFormat__P639002, depth: s.depth + 1,
        pc: 0, retval: undefined, r0: undefined, overwrittenPC: false, lambdaArgs: null,
  tmp_0: undefined,
  arg0: undefined,
} }





function control_fail__P638810(s) {
let r0 = s.r0, step = s.pc;
s.pc = -1;


while (true) {
if (yieldSteps-- < 0 && maybeYield(s, step, r0)) return null;
switch (step) {
  case 0:

    if (s.lambdaArgs) {
      s.arg0 = (s.lambdaArgs[0]);
      s.lambdaArgs = null;
    }
    s.tmp_0 = console_log__P638826_mk(s);
    s.tmp_0.arg0 = "Fatal failure: ";
    s.pc = 1; return s.tmp_0;
  case 1:
    r0 = s.retval;
    s.tmp_0 = console_log__P638826_mk(s);
    s.tmp_0.arg0 = s.arg0;
    s.pc = 2; return s.tmp_0;
  case 2:
    r0 = s.retval;
    r0 = pxsim_pxtrt.panic(108);
    r0 = undefined;
    return leave(s, r0)
  default: oops()
} } }
control_fail__P638810.info = {"start":1320,"length":132,"line":50,"column":4,"endLine":54,"endColumn":5,"fileName":"control.ts","functionName":"fail","argumentNames":["message"]}

function control_fail__P638810_mk(s) {
    checkStack(s.depth);
    return {
        parent: s, fn: control_fail__P638810, depth: s.depth + 1,
        pc: 0, retval: undefined, r0: undefined, overwrittenPC: false, lambdaArgs: null,
  tmp_0: undefined,
  arg0: undefined,
} }





function console_log__P638826(s) {
let r0 = s.r0, step = s.pc;
s.pc = -1;


while (true) {
if (yieldSteps-- < 0 && maybeYield(s, step, r0)) return null;
switch (step) {
  case 0:

    s.i___640221 = undefined;
    if (s.lambdaArgs) {
      s.arg0 = (s.lambdaArgs[0]);
      s.lambdaArgs = null;
    }
    if ((s.arg0) && (s.arg0).vtable) {
    setupResume(s, 5);
    pxsim_String__stringConv(s.arg0);
    checkResumeConsumed();
    return;
    } else { s.retval = (s.arg0) + ""; }
  case 5:
    r0 = s.retval;
    s.tmp_0 = r0;
    r0 = pxsim_String__concat(s.tmp_0, "\r\n");
    s.arg0 = (r0);
    r0 = pxsim.control.__log(s.arg0);
    r0 = pxsim_numops_toBoolDecr(globals.listeners___638825);
    if (!r0) { step = 3; continue; }
    s.i___640221 = (0);
  case 1:
    s.tmp_1 = r0 = s.i___640221;
    r0 = pxsim_Array__length(globals.listeners___638825);
    s.tmp_2 = r0;
    r0 = (s.tmp_1 < s.tmp_2);
    s.tmp_0 = r0;
    r0 = pxsim_numops_toBoolDecr(s.tmp_0);
    if (!r0) { step = 2; continue; }
    s.tmp_3 = lambda_2_mk(s);
    r0 = pxsim_Array__getAt(globals.listeners___638825, s.i___640221);
    s.tmp_3.argL = r0;
    s.tmp_3.arg0 = s.arg0;
    setupLambda(s.tmp_3, s.tmp_3.argL);
    s.pc = 6; return s.tmp_3;
  case 6:
    r0 = s.retval;
    r0 = (s.i___640221 + 1);
    s.i___640221 = (r0);
    { step = 1; continue; }
  case 2:
  case 3:
  case 4:
    r0 = undefined;
    return leave(s, r0)
  default: oops()
} } }
console_log__P638826.info = {"start":479,"length":285,"line":20,"column":4,"endLine":28,"endColumn":5,"fileName":"console.ts","functionName":"log","argumentNames":["text"]}

function console_log__P638826_mk(s) {
    checkStack(s.depth);
    return {
        parent: s, fn: console_log__P638826, depth: s.depth + 1,
        pc: 0, retval: undefined, r0: undefined, overwrittenPC: false, lambdaArgs: null,
  tmp_0: undefined,
  tmp_1: undefined,
  tmp_2: undefined,
  tmp_3: undefined,
  i___640221: undefined,
  arg0: undefined,
} }





function Buffer_getFormat__P638999(s) {
let r0 = s.r0, step = s.pc;
s.pc = -1;


while (true) {
if (yieldSteps-- < 0 && maybeYield(s, step, r0)) return null;
switch (step) {
  case 0:

    if (s.lambdaArgs) {
      s.arg0 = (s.lambdaArgs[0]);
      s.arg1 = (s.lambdaArgs[1]);
      s.lambdaArgs = null;
    }
    s.tmp_0 = r0 = s.arg0;
    r0 = pxsim_pxtcore.switch_eq("B", s.tmp_0);
    if (r0) { step = 1; continue; }
    r0 = pxsim_pxtcore.switch_eq("b", s.tmp_0);
    if (r0) { step = 2; continue; }
    r0 = pxsim_pxtcore.switch_eq("H", s.tmp_0);
    if (r0) { step = 3; continue; }
    r0 = pxsim_pxtcore.switch_eq("h", s.tmp_0);
    if (r0) { step = 6; continue; }
    r0 = pxsim_pxtcore.switch_eq("I", s.tmp_0);
    if (r0) { step = 9; continue; }
    r0 = pxsim_pxtcore.switch_eq("L", s.tmp_0);
    if (r0) { step = 10; continue; }
    r0 = pxsim_pxtcore.switch_eq("i", s.tmp_0);
    if (r0) { step = 13; continue; }
    r0 = pxsim_pxtcore.switch_eq("l", s.tmp_0);
    if (r0) { step = 14; continue; }
    r0 = pxsim_pxtcore.switch_eq("f", s.tmp_0);
    if (r0) { step = 17; continue; }
    r0 = pxsim_pxtcore.switch_eq("d", s.tmp_0);
    if (r0) { step = 20; continue; }
    r0 = s.tmp_0;
    { step = 23; continue; }
  case 1:
    r0 = 2;
    { step = 24; continue; }
  case 2:
    r0 = 1;
    { step = 24; continue; }
  case 3:
    r0 = pxsim_numops_toBoolDecr(s.arg1);
    if (!r0) { step = 4; continue; }
    r0 = 9;
    { step = 5; continue; }
  case 4:
    r0 = 4;
  case 5:
    // jmp value (already in r0)
    s.tmp_1 = r0;
    r0 = s.tmp_1;
    { step = 24; continue; }
  case 6:
    r0 = pxsim_numops_toBoolDecr(s.arg1);
    if (!r0) { step = 7; continue; }
    r0 = 8;
    { step = 8; continue; }
  case 7:
    r0 = 3;
  case 8:
    // jmp value (already in r0)
    s.tmp_2 = r0;
    r0 = s.tmp_2;
    { step = 24; continue; }
  case 9:
  case 10:
    r0 = pxsim_numops_toBoolDecr(s.arg1);
    if (!r0) { step = 11; continue; }
    r0 = 12;
    { step = 12; continue; }
  case 11:
    r0 = 11;
  case 12:
    // jmp value (already in r0)
    s.tmp_3 = r0;
    r0 = s.tmp_3;
    { step = 24; continue; }
  case 13:
  case 14:
    r0 = pxsim_numops_toBoolDecr(s.arg1);
    if (!r0) { step = 15; continue; }
    r0 = 10;
    { step = 16; continue; }
  case 15:
    r0 = 5;
  case 16:
    // jmp value (already in r0)
    s.tmp_4 = r0;
    r0 = s.tmp_4;
    { step = 24; continue; }
  case 17:
    r0 = pxsim_numops_toBoolDecr(s.arg1);
    if (!r0) { step = 18; continue; }
    r0 = 15;
    { step = 19; continue; }
  case 18:
    r0 = 13;
  case 19:
    // jmp value (already in r0)
    s.tmp_5 = r0;
    r0 = s.tmp_5;
    { step = 24; continue; }
  case 20:
    r0 = pxsim_numops_toBoolDecr(s.arg1);
    if (!r0) { step = 21; continue; }
    r0 = 16;
    { step = 22; continue; }
  case 21:
    r0 = 14;
  case 22:
    // jmp value (already in r0)
    s.tmp_6 = r0;
    r0 = s.tmp_6;
    { step = 24; continue; }
  case 23:
    r0 = null;
    { step = 24; continue; }
    r0 = undefined;
  case 24:
    return leave(s, r0)
  default: oops()
} } }
Buffer_getFormat__P638999.info = {"start":9335,"length":928,"line":334,"column":4,"endLine":357,"endColumn":5,"fileName":"buffer.ts","functionName":"getFormat","argumentNames":["pychar","isBig"]}

function Buffer_getFormat__P638999_mk(s) {
    checkStack(s.depth);
    return {
        parent: s, fn: Buffer_getFormat__P638999, depth: s.depth + 1,
        pc: 0, retval: undefined, r0: undefined, overwrittenPC: false, lambdaArgs: null,
  tmp_0: undefined,
  tmp_1: undefined,
  tmp_2: undefined,
  tmp_3: undefined,
  tmp_4: undefined,
  tmp_5: undefined,
  tmp_6: undefined,
  arg0: undefined,
  arg1: undefined,
} }





function parseInt__P638676(s) {
let r0 = s.r0, step = s.pc;
s.pc = -1;


while (true) {
if (yieldSteps-- < 0 && maybeYield(s, step, r0)) return null;
switch (step) {
  case 0:

    s.start___640275 = undefined;
    s.sign___640305 = undefined;
    s.output___640350 = undefined;
    s.hasDigit___640351 = undefined;
    s.i___640352 = undefined;
    s.code___640359 = undefined;
    s.val___640366 = undefined;
    if (s.lambdaArgs) {
      s.arg0 = (s.lambdaArgs[0]);
      s.arg1 = (s.lambdaArgs[1]);
      s.lambdaArgs = null;
    }
    r0 = pxsim_numops_toBoolDecr(s.arg0);
    s.tmp_1 = r0;
    r0 = pxsim_Boolean__bang(s.tmp_1);
    s.tmp_0 = r0;
    r0 = pxsim_numops_toBool(s.tmp_0);
    if (!r0) { step = 1; continue; }
    r0 = s.tmp_0;
    { step = 6; continue; }
  case 1:
    r0 = (s.arg1 != null);
    s.tmp_2 = r0;
    r0 = pxsim_numops_toBool(s.tmp_2);
    if (r0) { step = 2; continue; }
    r0 = s.tmp_2;
    { step = 5; continue; }
  case 2:
    r0 = (s.arg1 < 2);
    s.tmp_3 = r0;
    r0 = pxsim_numops_toBool(s.tmp_3);
    if (!r0) { step = 3; continue; }
    r0 = s.tmp_3;
    { step = 4; continue; }
  case 3:
    r0 = (s.arg1 > 36);
  case 4:
    // jmp value (already in r0)
    s.tmp_4 = r0;
    r0 = s.tmp_4;
  case 5:
    // jmp value (already in r0)
    s.tmp_5 = r0;
    r0 = s.tmp_5;
  case 6:
    // jmp value (already in r0)
    s.tmp_6 = r0;
    r0 = pxsim_numops_toBoolDecr(s.tmp_6);
    if (!r0) { step = 7; continue; }
    r0 = NaN;
    { step = 46; continue; }
  case 7:
  case 8:
    s.start___640275 = (0);
  case 9:
    s.tmp_1 = r0 = s.start___640275;
    r0 = pxsim_String_.length(s.arg0);
    s.tmp_2 = r0;
    r0 = (s.tmp_1 < s.tmp_2);
    s.tmp_0 = r0;
    r0 = pxsim_numops_toBool(s.tmp_0);
    if (r0) { step = 10; continue; }
    r0 = s.tmp_0;
    { step = 11; continue; }
  case 10:
    s.tmp_3 = helpers_isWhitespace__P638702_mk(s);
    r0 = pxsim_String_.charCodeAt(s.arg0, s.start___640275);
    s.tmp_3.arg0 = r0;
    s.pc = 47; return s.tmp_3;
  case 47:
    r0 = s.retval;
  case 11:
    // jmp value (already in r0)
    s.tmp_4 = r0;
    r0 = pxsim_numops_toBoolDecr(s.tmp_4);
    if (!r0) { step = 12; continue; }
    r0 = (s.start___640275 + 1);
    s.start___640275 = (r0);
    { step = 9; continue; }
  case 12:
    s.tmp_1 = r0 = s.start___640275;
    r0 = pxsim_String_.length(s.arg0);
    s.tmp_2 = r0;
    r0 = (s.tmp_1 === s.tmp_2);
    s.tmp_0 = r0;
    r0 = pxsim_numops_toBoolDecr(s.tmp_0);
    if (!r0) { step = 13; continue; }
    r0 = NaN;
    { step = 46; continue; }
  case 13:
  case 14:
    s.sign___640305 = (1);
    r0 = pxsim_String_.charAt(s.arg0, s.start___640275);
    s.tmp_0 = r0;
    r0 = pxsim_pxtcore.switch_eq("-", s.tmp_0);
    if (r0) { step = 15; continue; }
    r0 = pxsim_pxtcore.switch_eq("+", s.tmp_0);
    if (r0) { step = 16; continue; }
    r0 = s.tmp_0;
    { step = 17; continue; }
  case 15:
    s.sign___640305 = (-1);
  case 16:
    r0 = (s.start___640275 + 1);
    s.start___640275 = (r0);
  case 17:
    r0 = pxsim_numops_toBoolDecr(s.arg1);
    s.tmp_1 = r0;
    r0 = pxsim_Boolean__bang(s.tmp_1);
    s.tmp_0 = r0;
    r0 = pxsim_numops_toBool(s.tmp_0);
    if (!r0) { step = 18; continue; }
    r0 = s.tmp_0;
    { step = 19; continue; }
  case 18:
    r0 = (s.arg1 == 16);
  case 19:
    // jmp value (already in r0)
    s.tmp_2 = r0;
    r0 = pxsim_numops_toBool(s.tmp_2);
    if (r0) { step = 20; continue; }
    r0 = s.tmp_2;
    { step = 21; continue; }
  case 20:
    r0 = pxsim_String_.charAt(s.arg0, s.start___640275);
    s.tmp_3 = r0;
    r0 = ("0" === s.tmp_3);
  case 21:
    // jmp value (already in r0)
    s.tmp_4 = r0;
    r0 = pxsim_numops_toBool(s.tmp_4);
    if (r0) { step = 22; continue; }
    r0 = s.tmp_4;
    { step = 25; continue; }
  case 22:
    s.tmp_7 = r0 = s.arg0;
    r0 = (s.start___640275 + 1);
    s.tmp_8 = r0;
    r0 = pxsim_String_.charAt(s.tmp_7, s.tmp_8);
    s.tmp_6 = r0;
    r0 = ("x" === s.tmp_6);
    s.tmp_5 = r0;
    r0 = pxsim_numops_toBool(s.tmp_5);
    if (!r0) { step = 23; continue; }
    r0 = s.tmp_5;
    { step = 24; continue; }
  case 23:
    s.tmp_10 = r0 = s.arg0;
    r0 = (s.start___640275 + 1);
    s.tmp_11 = r0;
    r0 = pxsim_String_.charAt(s.tmp_10, s.tmp_11);
    s.tmp_9 = r0;
    r0 = ("X" === s.tmp_9);
  case 24:
    // jmp value (already in r0)
    s.tmp_12 = r0;
    r0 = s.tmp_12;
  case 25:
    // jmp value (already in r0)
    s.tmp_13 = r0;
    r0 = pxsim_numops_toBoolDecr(s.tmp_13);
    if (!r0) { step = 26; continue; }
    s.arg1 = (16);
    r0 = (s.start___640275 + 2);
    s.start___640275 = (r0);
    { step = 29; continue; }
  case 26:
    r0 = pxsim_numops_toBoolDecr(s.arg1);
    s.tmp_1 = r0;
    r0 = pxsim_Boolean__bang(s.tmp_1);
    s.tmp_0 = r0;
    r0 = pxsim_numops_toBoolDecr(s.tmp_0);
    if (!r0) { step = 27; continue; }
    s.arg1 = (10);
  case 27:
  case 28:
  case 29:
    s.output___640350 = (0);
    s.hasDigit___640351 = (false);
    s.i___640352 = (s.start___640275);
  case 30:
    s.tmp_1 = r0 = s.i___640352;
    r0 = pxsim_String_.length(s.arg0);
    s.tmp_2 = r0;
    r0 = (s.tmp_1 < s.tmp_2);
    s.tmp_0 = r0;
    r0 = pxsim_numops_toBoolDecr(s.tmp_0);
    if (!r0) { step = 45; continue; }
    r0 = pxsim_String_.charCodeAt(s.arg0, s.i___640352);
    s.tmp_3 = r0;
    r0 = (s.tmp_3 | 32);
    s.code___640359 = (r0);
    s.val___640366 = (undefined);
    r0 = (s.code___640359 >= 48);
    s.tmp_0 = r0;
    r0 = pxsim_numops_toBool(s.tmp_0);
    if (r0) { step = 31; continue; }
    r0 = s.tmp_0;
    { step = 32; continue; }
  case 31:
    r0 = (s.code___640359 < 58);
  case 32:
    // jmp value (already in r0)
    s.tmp_1 = r0;
    r0 = pxsim_numops_toBoolDecr(s.tmp_1);
    if (!r0) { step = 33; continue; }
    r0 = (s.code___640359 - 48);
    s.val___640366 = (r0);
    { step = 38; continue; }
  case 33:
    r0 = (s.code___640359 >= 97);
    s.tmp_0 = r0;
    r0 = pxsim_numops_toBool(s.tmp_0);
    if (r0) { step = 34; continue; }
    r0 = s.tmp_0;
    { step = 35; continue; }
  case 34:
    r0 = (s.code___640359 < 123);
  case 35:
    // jmp value (already in r0)
    s.tmp_1 = r0;
    r0 = pxsim_numops_toBoolDecr(s.tmp_1);
    if (!r0) { step = 36; continue; }
    r0 = (10 + s.code___640359);
    s.tmp_2 = r0;
    r0 = (s.tmp_2 - 97);
    s.val___640366 = (r0);
  case 36:
  case 37:
  case 38:
    r0 = (s.val___640366 == undefined);
    s.tmp_0 = r0;
    r0 = pxsim_numops_toBool(s.tmp_0);
    if (!r0) { step = 39; continue; }
    r0 = s.tmp_0;
    { step = 40; continue; }
  case 39:
    r0 = (s.val___640366 >= s.arg1);
  case 40:
    // jmp value (already in r0)
    s.tmp_1 = r0;
    r0 = pxsim_numops_toBoolDecr(s.tmp_1);
    if (!r0) { step = 43; continue; }
    r0 = pxsim_numops_toBoolDecr(s.hasDigit___640351);
    s.tmp_3 = r0;
    r0 = pxsim_Boolean__bang(s.tmp_3);
    s.tmp_2 = r0;
    r0 = pxsim_numops_toBoolDecr(s.tmp_2);
    if (!r0) { step = 41; continue; }
    r0 = NaN;
    { step = 46; continue; }
  case 41:
  case 42:
    { step = 45; continue; }
  case 43:
  case 44:
    s.hasDigit___640351 = (true);
    r0 = (s.output___640350 * s.arg1);
    s.tmp_0 = r0;
    r0 = (s.tmp_0 + s.val___640366);
    s.output___640350 = (r0);
    r0 = (s.i___640352 + 1);
    s.i___640352 = (r0);
    { step = 30; continue; }
  case 45:
    r0 = (s.sign___640305 * s.output___640350);
  case 46:
    return leave(s, r0)
  default: oops()
} } }
parseInt__P638676.info = {"start":1064,"length":1690,"line":44,"column":0,"endLine":103,"endColumn":1,"fileName":"pxt-helpers.ts","functionName":"parseInt","argumentNames":["text","radix"]}

function parseInt__P638676_mk(s) {
    checkStack(s.depth);
    return {
        parent: s, fn: parseInt__P638676, depth: s.depth + 1,
        pc: 0, retval: undefined, r0: undefined, overwrittenPC: false, lambdaArgs: null,
  tmp_0: undefined,
  tmp_1: undefined,
  tmp_2: undefined,
  tmp_3: undefined,
  tmp_4: undefined,
  tmp_5: undefined,
  tmp_6: undefined,
  tmp_7: undefined,
  tmp_8: undefined,
  tmp_9: undefined,
  tmp_10: undefined,
  tmp_11: undefined,
  tmp_12: undefined,
  tmp_13: undefined,
  start___640275: undefined,
  sign___640305: undefined,
  output___640350: undefined,
  hasDigit___640351: undefined,
  i___640352: undefined,
  code___640359: undefined,
  val___640366: undefined,
  arg0: undefined,
  arg1: undefined,
} }





function helpers_isWhitespace__P638702(s) {
let r0 = s.r0, step = s.pc;
s.pc = -1;


while (true) {
if (yieldSteps-- < 0 && maybeYield(s, step, r0)) return null;
switch (step) {
  case 0:

    if (s.lambdaArgs) {
      s.arg0 = (s.lambdaArgs[0]);
      s.lambdaArgs = null;
    }
    s.tmp_0 = r0 = s.arg0;
    r0 = pxsim_pxtcore.switch_eq(9, s.tmp_0);
    if (r0) { step = 1; continue; }
    r0 = pxsim_pxtcore.switch_eq(11, s.tmp_0);
    if (r0) { step = 2; continue; }
    r0 = pxsim_pxtcore.switch_eq(12, s.tmp_0);
    if (r0) { step = 3; continue; }
    r0 = pxsim_pxtcore.switch_eq(32, s.tmp_0);
    if (r0) { step = 4; continue; }
    r0 = pxsim_pxtcore.switch_eq(160, s.tmp_0);
    if (r0) { step = 5; continue; }
    r0 = pxsim_pxtcore.switch_eq(65279, s.tmp_0);
    if (r0) { step = 6; continue; }
    r0 = pxsim_pxtcore.switch_eq(10, s.tmp_0);
    if (r0) { step = 7; continue; }
    r0 = pxsim_pxtcore.switch_eq(13, s.tmp_0);
    if (r0) { step = 8; continue; }
    r0 = pxsim_pxtcore.switch_eq(8232, s.tmp_0);
    if (r0) { step = 9; continue; }
    r0 = pxsim_pxtcore.switch_eq(8233, s.tmp_0);
    if (r0) { step = 10; continue; }
    r0 = s.tmp_0;
    { step = 11; continue; }
  case 1:
  case 2:
  case 3:
  case 4:
  case 5:
  case 6:
  case 7:
  case 8:
  case 9:
  case 10:
    r0 = true;
    { step = 12; continue; }
  case 11:
    r0 = false;
    { step = 12; continue; }
    r0 = undefined;
  case 12:
    return leave(s, r0)
  default: oops()
} } }
helpers_isWhitespace__P638702.info = {"start":13875,"length":674,"line":476,"column":4,"endLine":493,"endColumn":5,"fileName":"pxt-helpers.ts","functionName":"isWhitespace","argumentNames":["c"]}

function helpers_isWhitespace__P638702_mk(s) {
    checkStack(s.depth);
    return {
        parent: s, fn: helpers_isWhitespace__P638702, depth: s.depth + 1,
        pc: 0, retval: undefined, r0: undefined, overwrittenPC: false, lambdaArgs: null,
  tmp_0: undefined,
  arg0: undefined,
} }





function Buffer_isDigit__P639000(s) {
let r0 = s.r0, step = s.pc;
s.pc = -1;


while (true) {
if (yieldSteps-- < 0 && maybeYield(s, step, r0)) return null;
switch (step) {
  case 0:

    s.code___640423 = undefined;
    if (s.lambdaArgs) {
      s.arg0 = (s.lambdaArgs[0]);
      s.lambdaArgs = null;
    }
    r0 = pxsim_String_.charCodeAt(s.arg0, 0);
    s.code___640423 = (r0);
    r0 = (48 <= s.code___640423);
    s.tmp_0 = r0;
    r0 = pxsim_numops_toBool(s.tmp_0);
    if (r0) { step = 1; continue; }
    r0 = s.tmp_0;
    { step = 2; continue; }
  case 1:
    r0 = (s.code___640423 <= 57);
  case 2:
    // jmp value (already in r0)
    s.tmp_1 = r0;
    r0 = s.tmp_1;
    return leave(s, r0)
  default: oops()
} } }
Buffer_isDigit__P639000.info = {"start":10269,"length":118,"line":359,"column":4,"endLine":362,"endColumn":5,"fileName":"buffer.ts","functionName":"isDigit","argumentNames":["ch"]}

function Buffer_isDigit__P639000_mk(s) {
    checkStack(s.depth);
    return {
        parent: s, fn: Buffer_isDigit__P639000, depth: s.depth + 1,
        pc: 0, retval: undefined, r0: undefined, overwrittenPC: false, lambdaArgs: null,
  tmp_0: undefined,
  tmp_1: undefined,
  code___640423: undefined,
  arg0: undefined,
} }





function Buffer_packedSize__P638997(s) {
let r0 = s.r0, step = s.pc;
s.pc = -1;


while (true) {
if (yieldSteps-- < 0 && maybeYield(s, step, r0)) return null;
switch (step) {
  case 0:

    if (s.lambdaArgs) {
      s.arg0 = (s.lambdaArgs[0]);
      s.lambdaArgs = null;
    }
    s.tmp_0 = Buffer___packUnpackCore__P639001_mk(s);
    s.tmp_0.arg0 = s.arg0;
    s.tmp_0.arg1 = null;
    s.tmp_0.arg2 = null;
    s.tmp_0.arg3 = true;
    s.tmp_0.arg4 = 0;
    s.pc = 1; return s.tmp_0;
  case 1:
    r0 = s.retval;
    return leave(s, r0)
  default: oops()
} } }
Buffer_packedSize__P638997.info = {"start":9034,"length":108,"line":324,"column":4,"endLine":326,"endColumn":5,"fileName":"buffer.ts","functionName":"packedSize","argumentNames":["format"]}

function Buffer_packedSize__P638997_mk(s) {
    checkStack(s.depth);
    return {
        parent: s, fn: Buffer_packedSize__P638997, depth: s.depth + 1,
        pc: 0, retval: undefined, r0: undefined, overwrittenPC: false, lambdaArgs: null,
  tmp_0: undefined,
  arg0: undefined,
} }





function check__P639893(s) {
let r0 = s.r0, step = s.pc;
s.pc = -1;


while (true) {
if (yieldSteps-- < 0 && maybeYield(s, step, r0)) return null;
switch (step) {
  case 0:

    if (s.lambdaArgs) {
      s.arg0 = (s.lambdaArgs[0]);
      s.lambdaArgs = null;
    }
    s.tmp_0 = control_assert__P638809_mk(s);
    s.tmp_0.arg0 = s.arg0;
    s.tmp_0.arg1 = 108;
    s.pc = 1; return s.tmp_0;
  case 1:
    r0 = s.retval;
    r0 = undefined;
    return leave(s, r0)
  default: oops()
} } }
check__P639893.info = {"start":115,"length":58,"line":9,"column":0,"endLine":9,"endColumn":58,"fileName":"test.ts","functionName":"check","argumentNames":["cond"]}

function check__P639893_mk(s) {
    checkStack(s.depth);
    return {
        parent: s, fn: check__P639893, depth: s.depth + 1,
        pc: 0, retval: undefined, r0: undefined, overwrittenPC: false, lambdaArgs: null,
  tmp_0: undefined,
  arg0: undefined,
} }





function control_assert__P638809(s) {
let r0 = s.r0, step = s.pc;
s.pc = -1;


while (true) {
if (yieldSteps-- < 0 && maybeYield(s, step, r0)) return null;
switch (step) {
  case 0:

    if (s.lambdaArgs) {
      s.arg0 = (s.lambdaArgs[0]);
      s.arg1 = (s.lambdaArgs[1]);
      s.lambdaArgs = null;
    }
    r0 = pxsim_numops_toBoolDecr(s.arg0);
    s.tmp_1 = r0;
    r0 = pxsim_Boolean__bang(s.tmp_1);
    s.tmp_0 = r0;
    r0 = pxsim_numops_toBoolDecr(s.tmp_0);
    if (!r0) { step = 3; continue; }
    s.tmp_2 = console_log__P638826_mk(s);
    s.tmp_2.arg0 = "ASSERTION FAILED";
    s.pc = 5; return s.tmp_2;
  case 5:
    r0 = s.retval;
    r0 = (s.arg1 != null);
    s.tmp_0 = r0;
    r0 = pxsim_numops_toBoolDecr(s.tmp_0);
    if (!r0) { step = 1; continue; }
    s.tmp_1 = console_log__P638826_mk(s);
    s.tmp_1.arg0 = s.arg1;
    s.pc = 6; return s.tmp_1;
  case 6:
    r0 = s.retval;
  case 1:
  case 2:
    r0 = pxsim_pxtrt.panic(98);
  case 3:
  case 4:
    r0 = undefined;
    return leave(s, r0)
  default: oops()
} } }
control_assert__P638809.info = {"start":1070,"length":244,"line":40,"column":4,"endLine":48,"endColumn":5,"fileName":"control.ts","functionName":"assert","argumentNames":["condition","msg"]}

function control_assert__P638809_mk(s) {
    checkStack(s.depth);
    return {
        parent: s, fn: control_assert__P638809, depth: s.depth + 1,
        pc: 0, retval: undefined, r0: undefined, overwrittenPC: false, lambdaArgs: null,
  tmp_0: undefined,
  tmp_1: undefined,
  tmp_2: undefined,
  arg0: undefined,
  arg1: undefined,
} }





function helpers_arrayFill__P638677(s) {
let r0 = s.r0, step = s.pc;
s.pc = -1;


while (true) {
if (yieldSteps-- < 0 && maybeYield(s, step, r0)) return null;
switch (step) {
  case 0:

    s.len___640459 = undefined;
    s.relativeStart___640463 = undefined;
    s.k___640470 = undefined;
    s.relativeEnd___640480 = undefined;
    s.final___640488 = undefined;
    if (s.lambdaArgs) {
      s.arg0 = (s.lambdaArgs[0]);
      s.arg1 = (s.lambdaArgs[1]);
      s.arg2 = (s.lambdaArgs[2]);
      s.arg3 = (s.lambdaArgs[3]);
      s.lambdaArgs = null;
    }
    r0 = pxsim_Array__length(s.arg0);
    s.tmp_0 = r0;
    r0 = (s.tmp_0 >>> 0);
    s.len___640459 = (r0);
    r0 = (s.arg2 === undefined);
    s.tmp_0 = r0;
    r0 = pxsim_numops_toBoolDecr(s.tmp_0);
    if (!r0) { step = 1; continue; }
    r0 = 0;
    { step = 2; continue; }
  case 1:
    r0 = (s.arg2 >> 0);
  case 2:
    // jmp value (already in r0)
    s.tmp_1 = r0;
    s.relativeStart___640463 = (s.tmp_1);
    r0 = (s.relativeStart___640463 < 0);
    s.tmp_0 = r0;
    r0 = pxsim_numops_toBoolDecr(s.tmp_0);
    if (!r0) { step = 3; continue; }
    s.tmp_1 = Math_max__P638707_mk(s);
    r0 = (s.len___640459 + s.relativeStart___640463);
    s.tmp_1.arg0 = r0;
    s.tmp_1.arg1 = 0;
    s.pc = 11; return s.tmp_1;
  case 11:
    r0 = s.retval;
    { step = 4; continue; }
  case 3:
    s.tmp_2 = Math_min__P638708_mk(s);
    s.tmp_2.arg0 = s.relativeStart___640463;
    s.tmp_2.arg1 = s.len___640459;
    s.pc = 12; return s.tmp_2;
  case 12:
    r0 = s.retval;
  case 4:
    // jmp value (already in r0)
    s.tmp_3 = r0;
    s.k___640470 = (s.tmp_3);
    r0 = (s.arg3 === undefined);
    s.tmp_0 = r0;
    r0 = pxsim_numops_toBoolDecr(s.tmp_0);
    if (!r0) { step = 5; continue; }
    r0 = s.len___640459;
    { step = 6; continue; }
  case 5:
    r0 = (s.arg3 >> 0);
  case 6:
    // jmp value (already in r0)
    s.tmp_1 = r0;
    s.relativeEnd___640480 = (s.tmp_1);
    r0 = (s.relativeEnd___640480 < 0);
    s.tmp_0 = r0;
    r0 = pxsim_numops_toBoolDecr(s.tmp_0);
    if (!r0) { step = 7; continue; }
    s.tmp_1 = Math_max__P638707_mk(s);
    r0 = (s.len___640459 + s.relativeEnd___640480);
    s.tmp_1.arg0 = r0;
    s.tmp_1.arg1 = 0;
    s.pc = 13; return s.tmp_1;
  case 13:
    r0 = s.retval;
    { step = 8; continue; }
  case 7:
    s.tmp_2 = Math_min__P638708_mk(s);
    s.tmp_2.arg0 = s.relativeEnd___640480;
    s.tmp_2.arg1 = s.len___640459;
    s.pc = 14; return s.tmp_2;
  case 14:
    r0 = s.retval;
  case 8:
    // jmp value (already in r0)
    s.tmp_3 = r0;
    s.final___640488 = (s.tmp_3);
  case 9:
    r0 = (s.k___640470 < s.final___640488);
    s.tmp_0 = r0;
    r0 = pxsim_numops_toBoolDecr(s.tmp_0);
    if (!r0) { step = 10; continue; }
    r0 = pxsim_Array_.setAt(s.arg0, s.k___640470, s.arg1);
    r0 = (s.k___640470 + 1);
    s.k___640470 = (r0);
    { step = 9; continue; }
  case 10:
    r0 = s.arg0;
    return leave(s, r0)
  default: oops()
} } }
helpers_arrayFill__P638677.info = {"start":2780,"length":856,"line":106,"column":4,"endLine":135,"endColumn":5,"fileName":"pxt-helpers.ts","functionName":"arrayFill","argumentNames":["O","value","start","end"]}

function helpers_arrayFill__P638677_mk(s) {
    checkStack(s.depth);
    return {
        parent: s, fn: helpers_arrayFill__P638677, depth: s.depth + 1,
        pc: 0, retval: undefined, r0: undefined, overwrittenPC: false, lambdaArgs: null,
  tmp_0: undefined,
  tmp_1: undefined,
  tmp_2: undefined,
  tmp_3: undefined,
  len___640459: undefined,
  relativeStart___640463: undefined,
  k___640470: undefined,
  relativeEnd___640480: undefined,
  final___640488: undefined,
  arg0: undefined,
  arg1: undefined,
  arg2: undefined,
  arg3: undefined,
} }





function Math_min__P638708(s) {
let r0 = s.r0, step = s.pc;
s.pc = -1;


while (true) {
if (yieldSteps-- < 0 && maybeYield(s, step, r0)) return null;
switch (step) {
  case 0:

    if (s.lambdaArgs) {
      s.arg0 = (s.lambdaArgs[0]);
      s.arg1 = (s.lambdaArgs[1]);
      s.lambdaArgs = null;
    }
    r0 = (s.arg0 <= s.arg1);
    s.tmp_0 = r0;
    r0 = pxsim_numops_toBoolDecr(s.tmp_0);
    if (!r0) { step = 1; continue; }
    r0 = s.arg0;
    { step = 3; continue; }
  case 1:
  case 2:
    r0 = s.arg1;
  case 3:
    return leave(s, r0)
  default: oops()
} } }
Math_min__P638708.info = {"start":15790,"length":105,"line":538,"column":4,"endLine":541,"endColumn":5,"fileName":"pxt-helpers.ts","functionName":"min","argumentNames":["a","b"]}

function Math_min__P638708_mk(s) {
    checkStack(s.depth);
    return {
        parent: s, fn: Math_min__P638708, depth: s.depth + 1,
        pc: 0, retval: undefined, r0: undefined, overwrittenPC: false, lambdaArgs: null,
  tmp_0: undefined,
  arg0: undefined,
  arg1: undefined,
} }





function Heart_Rate_led_config_register_constructor__P639700(s) {
let r0 = s.r0, step = s.pc;
s.pc = -1;


while (true) {
if (yieldSteps-- < 0 && maybeYield(s, step, r0)) return null;
switch (step) {
  case 0:

    if (s.lambdaArgs) {
      s.arg0 = (s.lambdaArgs[0]);
      s.lambdaArgs = null;
    }
    r0 = s.arg0;
    if (!checkSubtype(r0, Heart_Rate_led_config_register__C639693_VT)) failedCast(r0);
    r0 = (s.arg0).fields["registerValue"] = (0);
    r0 = undefined;
    return leave(s, r0)
  default: oops()
} } }
Heart_Rate_led_config_register_constructor__P639700.info = {"start":9915,"length":55,"line":347,"column":4,"endLine":349,"endColumn":5,"fileName":"heartrate.ts","functionName":"inline","argumentNames":["this"]}

function Heart_Rate_led_config_register_constructor__P639700_mk(s) {
    checkStack(s.depth);
    return {
        parent: s, fn: Heart_Rate_led_config_register_constructor__P639700, depth: s.depth + 1,
        pc: 0, retval: undefined, r0: undefined, overwrittenPC: false, lambdaArgs: null,
  arg0: undefined,
} }





function Heart_Rate_spo2_config_register_constructor__P639689(s) {
let r0 = s.r0, step = s.pc;
s.pc = -1;


while (true) {
if (yieldSteps-- < 0 && maybeYield(s, step, r0)) return null;
switch (step) {
  case 0:

    if (s.lambdaArgs) {
      s.arg0 = (s.lambdaArgs[0]);
      s.lambdaArgs = null;
    }
    r0 = s.arg0;
    if (!checkSubtype(r0, Heart_Rate_spo2_config_register__C639680_VT)) failedCast(r0);
    r0 = (s.arg0).fields["registerValue"] = (0);
    r0 = undefined;
    return leave(s, r0)
  default: oops()
} } }
Heart_Rate_spo2_config_register_constructor__P639689.info = {"start":8944,"length":55,"line":304,"column":4,"endLine":306,"endColumn":5,"fileName":"heartrate.ts","functionName":"inline","argumentNames":["this"]}

function Heart_Rate_spo2_config_register_constructor__P639689_mk(s) {
    checkStack(s.depth);
    return {
        parent: s, fn: Heart_Rate_spo2_config_register_constructor__P639689, depth: s.depth + 1,
        pc: 0, retval: undefined, r0: undefined, overwrittenPC: false, lambdaArgs: null,
  arg0: undefined,
} }





function Heart_Rate_mode_config_register_constructor__P639676(s) {
let r0 = s.r0, step = s.pc;
s.pc = -1;


while (true) {
if (yieldSteps-- < 0 && maybeYield(s, step, r0)) return null;
switch (step) {
  case 0:

    if (s.lambdaArgs) {
      s.arg0 = (s.lambdaArgs[0]);
      s.arg1 = (s.lambdaArgs[1]);
      s.lambdaArgs = null;
    }
    r0 = s.arg0;
    if (!checkSubtype(r0, Heart_Rate_mode_config_register__C639665_VT)) failedCast(r0);
    r0 = (s.arg0).fields["registerValue"] = (s.arg1);
    r0 = undefined;
    return leave(s, r0)
  default: oops()
} } }
Heart_Rate_mode_config_register_constructor__P639676.info = {"start":7757,"length":84,"line":254,"column":4,"endLine":256,"endColumn":5,"fileName":"heartrate.ts","functionName":"inline","argumentNames":["this","initialValue"]}

function Heart_Rate_mode_config_register_constructor__P639676_mk(s) {
    checkStack(s.depth);
    return {
        parent: s, fn: Heart_Rate_mode_config_register_constructor__P639676, depth: s.depth + 1,
        pc: 0, retval: undefined, r0: undefined, overwrittenPC: false, lambdaArgs: null,
  arg0: undefined,
  arg1: undefined,
} }





function Heart_Rate_interrupt_en_register_constructor__P639661(s) {
let r0 = s.r0, step = s.pc;
s.pc = -1;


while (true) {
if (yieldSteps-- < 0 && maybeYield(s, step, r0)) return null;
switch (step) {
  case 0:

    if (s.lambdaArgs) {
      s.arg0 = (s.lambdaArgs[0]);
      s.lambdaArgs = null;
    }
    r0 = s.arg0;
    if (!checkSubtype(r0, Heart_Rate_interrupt_en_register__C639648_VT)) failedCast(r0);
    r0 = (s.arg0).fields["registerValue"] = (0);
    r0 = undefined;
    return leave(s, r0)
  default: oops()
} } }
Heart_Rate_interrupt_en_register_constructor__P639661.info = {"start":6335,"length":55,"line":197,"column":4,"endLine":199,"endColumn":5,"fileName":"heartrate.ts","functionName":"inline","argumentNames":["this"]}

function Heart_Rate_interrupt_en_register_constructor__P639661_mk(s) {
    checkStack(s.depth);
    return {
        parent: s, fn: Heart_Rate_interrupt_en_register_constructor__P639661, depth: s.depth + 1,
        pc: 0, retval: undefined, r0: undefined, overwrittenPC: false, lambdaArgs: null,
  arg0: undefined,
} }





function Heart_Rate_interrupt_stat_register_constructor__P639644(s) {
let r0 = s.r0, step = s.pc;
s.pc = -1;


while (true) {
if (yieldSteps-- < 0 && maybeYield(s, step, r0)) return null;
switch (step) {
  case 0:

    if (s.lambdaArgs) {
      s.arg0 = (s.lambdaArgs[0]);
      s.lambdaArgs = null;
    }
    r0 = s.arg0;
    if (!checkSubtype(r0, Heart_Rate_interrupt_stat_register__C639631_VT)) failedCast(r0);
    r0 = (s.arg0).fields["registerValue"] = (0);
    r0 = undefined;
    return leave(s, r0)
  default: oops()
} } }
Heart_Rate_interrupt_stat_register_constructor__P639644.info = {"start":4926,"length":55,"line":140,"column":4,"endLine":142,"endColumn":5,"fileName":"heartrate.ts","functionName":"inline","argumentNames":["this"]}

function Heart_Rate_interrupt_stat_register_constructor__P639644_mk(s) {
    checkStack(s.depth);
    return {
        parent: s, fn: Heart_Rate_interrupt_stat_register_constructor__P639644, depth: s.depth + 1,
        pc: 0, retval: undefined, r0: undefined, overwrittenPC: false, lambdaArgs: null,
  arg0: undefined,
} }





function bBoard_PWMSettings_constructor__P639146(s) {
let r0 = s.r0, step = s.pc;
s.pc = -1;


while (true) {
if (yieldSteps-- < 0 && maybeYield(s, step, r0)) return null;
switch (step) {
  case 0:

    if (s.lambdaArgs) {
      s.arg0 = (s.lambdaArgs[0]);
      s.lambdaArgs = null;
    }
    r0 = s.arg0;
    if (!checkSubtype(r0, bBoard_PWMSettings__C639141_VT)) failedCast(r0);
    r0 = (s.arg0).fields["pitchPin"] = (32768);
    r0 = (s.arg0).fields["pitchClick"] = (1);
    r0 = undefined;
    return leave(s, r0)
  default: oops()
} } }
bBoard_PWMSettings_constructor__P639146.info = {"start":11287,"length":113,"line":424,"column":8,"endLine":427,"endColumn":9,"fileName":"bBoard.ts","functionName":"inline","argumentNames":["this"]}

function bBoard_PWMSettings_constructor__P639146_mk(s) {
    checkStack(s.depth);
    return {
        parent: s, fn: bBoard_PWMSettings_constructor__P639146, depth: s.depth + 1,
        pc: 0, retval: undefined, r0: undefined, overwrittenPC: false, lambdaArgs: null,
  arg0: undefined,
} }





function bBoard_SPIsetting_constructor__P639173(s) {
let r0 = s.r0, step = s.pc;
s.pc = -1;


while (true) {
if (yieldSteps-- < 0 && maybeYield(s, step, r0)) return null;
switch (step) {
  case 0:

    if (s.lambdaArgs) {
      s.arg0 = (s.lambdaArgs[0]);
      s.lambdaArgs = null;
    }
    r0 = s.arg0;
    if (!checkSubtype(r0, bBoard_SPIsetting__C639165_VT)) failedCast(r0);
    r0 = (s.arg0).fields["SPI_WRITE_id"] = (1);
    r0 = (s.arg0).fields["SPI_READ_id"] = (2);
    r0 = (s.arg0).fields["SPI_CONFIG_id"] = (3);
    r0 = (s.arg0).fields["SPI_WRITEBULK_id"] = (4);
    r0 = (s.arg0).fields["SPI_WRITEBULK_CS_id"] = (5);
    r0 = (s.arg0).fields["SPI_READBULK_CS_id"] = (6);
    r0 = (s.arg0).fields["SPI_BAUD_id"] = (7);
    r0 = (s.arg0).fields["SPI_CONFIG_CS_id"] = (8);
    r0 = undefined;
    return leave(s, r0)
  default: oops()
} } }
bBoard_SPIsetting_constructor__P639173.info = {"start":36478,"length":296,"line":1054,"column":8,"endLine":1064,"endColumn":9,"fileName":"bBoard.ts","functionName":"inline","argumentNames":["this"]}

function bBoard_SPIsetting_constructor__P639173_mk(s) {
    checkStack(s.depth);
    return {
        parent: s, fn: bBoard_SPIsetting_constructor__P639173, depth: s.depth + 1,
        pc: 0, retval: undefined, r0: undefined, overwrittenPC: false, lambdaArgs: null,
  arg0: undefined,
} }





function bBoard_I2CSettings_constructor__P639179(s) {
let r0 = s.r0, step = s.pc;
s.pc = -1;


while (true) {
if (yieldSteps-- < 0 && maybeYield(s, step, r0)) return null;
switch (step) {
  case 0:

    if (s.lambdaArgs) {
      s.arg0 = (s.lambdaArgs[0]);
      s.lambdaArgs = null;
    }
    r0 = s.arg0;
    if (!checkSubtype(r0, bBoard_I2CSettings__C639174_VT)) failedCast(r0);
    r0 = (s.arg0).fields["I2C_WRITE_id"] = (1);
    r0 = (s.arg0).fields["I2C_READ_id"] = (2);
    r0 = (s.arg0).fields["I2C_WRITE_NO_MEM_id"] = (3);
    r0 = (s.arg0).fields["I2C_READ_NO_MEM_id"] = (4);
    r0 = undefined;
    return leave(s, r0)
  default: oops()
} } }
bBoard_I2CSettings_constructor__P639179.info = {"start":47096,"length":199,"line":1342,"column":12,"endLine":1348,"endColumn":13,"fileName":"bBoard.ts","functionName":"inline","argumentNames":["this"]}

function bBoard_I2CSettings_constructor__P639179_mk(s) {
    checkStack(s.depth);
    return {
        parent: s, fn: bBoard_I2CSettings_constructor__P639179, depth: s.depth + 1,
        pc: 0, retval: undefined, r0: undefined, overwrittenPC: false, lambdaArgs: null,
  arg0: undefined,
} }





function bBoard_PinSettings_constructor__P639162(s) {
let r0 = s.r0, step = s.pc;
s.pc = -1;


while (true) {
if (yieldSteps-- < 0 && maybeYield(s, step, r0)) return null;
switch (step) {
  case 0:

    if (s.lambdaArgs) {
      s.arg0 = (s.lambdaArgs[0]);
      s.lambdaArgs = null;
    }
    r0 = s.arg0;
    if (!checkSubtype(r0, bBoard_PinSettings__C639156_VT)) failedCast(r0);
    s.tmp_0 = bBoard_IOSettings_constructor__P639140_mk(s);
    s.tmp_0.arg0 = s.arg0;
    s.pc = 1; return s.tmp_0;
  case 1:
    r0 = s.retval;
    r0 = undefined;
    return leave(s, r0)
  default: oops()
} } }
bBoard_PinSettings_constructor__P639162.info = {"start":26588,"length":47,"line":818,"column":8,"endLine":820,"endColumn":9,"fileName":"bBoard.ts","functionName":"inline","argumentNames":["this"]}

function bBoard_PinSettings_constructor__P639162_mk(s) {
    checkStack(s.depth);
    return {
        parent: s, fn: bBoard_PinSettings_constructor__P639162, depth: s.depth + 1,
        pc: 0, retval: undefined, r0: undefined, overwrittenPC: false, lambdaArgs: null,
  tmp_0: undefined,
  arg0: undefined,
} }





function bBoard_IOSettings_constructor__P639140(s) {
let r0 = s.r0, step = s.pc;
s.pc = -1;


while (true) {
if (yieldSteps-- < 0 && maybeYield(s, step, r0)) return null;
switch (step) {
  case 0:

    if (s.lambdaArgs) {
      s.arg0 = (s.lambdaArgs[0]);
      s.lambdaArgs = null;
    }
    r0 = s.arg0;
    if (!checkSubtype(r0, bBoard_IOSettings__C639136_VT)) failedCast(r0);
    r0 = (s.arg0).fields["DIRSET_id"] = (2);
    r0 = (s.arg0).fields["DIRCLR_id"] = (3);
    r0 = (s.arg0).fields["GPIO_id"] = (4);
    r0 = (s.arg0).fields["SET_id"] = (5);
    r0 = (s.arg0).fields["CLR_id"] = (6);
    r0 = (s.arg0).fields["TOGGLE_id"] = (7);
    r0 = (s.arg0).fields["GPIOPULLENSET_id"] = (11);
    r0 = (s.arg0).fields["ODC_id"] = (13);
    r0 = undefined;
    return leave(s, r0)
  default: oops()
} } }
bBoard_IOSettings_constructor__P639140.info = {"start":6115,"length":251,"line":292,"column":8,"endLine":301,"endColumn":9,"fileName":"bBoard.ts","functionName":"inline","argumentNames":["this"]}

function bBoard_IOSettings_constructor__P639140_mk(s) {
    checkStack(s.depth);
    return {
        parent: s, fn: bBoard_IOSettings_constructor__P639140, depth: s.depth + 1,
        pc: 0, retval: undefined, r0: undefined, overwrittenPC: false, lambdaArgs: null,
  arg0: undefined,
} }





function WiFiSetResponses_SetResponse_constructor__P639187(s) {
let r0 = s.r0, step = s.pc;
s.pc = -1;


while (true) {
if (yieldSteps-- < 0 && maybeYield(s, step, r0)) return null;
switch (step) {
  case 0:

    if (s.lambdaArgs) {
      s.arg0 = (s.lambdaArgs[0]);
      s.lambdaArgs = null;
    }
    r0 = s.arg0;
    if (!checkSubtype(r0, WiFiSetResponses_SetResponse__C639183_VT)) failedCast(r0);
    r0 = (s.arg0).fields["defaultWiFiTimeoutmS"] = (10000);
    r0 = (s.arg0).fields["response"] = (2);
    s.tmp_0 = r0 = s.arg0;
    r0 = pxsim_String_.mkEmpty();
    s.tmp_1 = r0;
    r0 = (s.tmp_0).fields["receivedData"] = (s.tmp_1);
    r0 = (s.arg0).fields["MQTTMessageRetrieveState"] = (0);
    s.tmp_0 = r0 = s.arg0;
    r0 = pxsim_String_.mkEmpty();
    s.tmp_1 = r0;
    r0 = (s.tmp_0).fields["MQTTMessage"] = (s.tmp_1);
    r0 = undefined;
    return leave(s, r0)
  default: oops()
} } }
WiFiSetResponses_SetResponse_constructor__P639187.info = {"start":291,"length":396,"line":11,"column":4,"endLine":17,"endColumn":5,"fileName":"WiFi_BLE.ts","functionName":"inline","argumentNames":["this"]}

function WiFiSetResponses_SetResponse_constructor__P639187_mk(s) {
    checkStack(s.depth);
    return {
        parent: s, fn: WiFiSetResponses_SetResponse_constructor__P639187, depth: s.depth + 1,
        pc: 0, retval: undefined, r0: undefined, overwrittenPC: false, lambdaArgs: null,
  tmp_0: undefined,
  tmp_1: undefined,
  arg0: undefined,
} }





function bBoard_UARTSettings_constructor__P639155(s) {
let r0 = s.r0, step = s.pc;
s.pc = -1;


while (true) {
if (yieldSteps-- < 0 && maybeYield(s, step, r0)) return null;
switch (step) {
  case 0:

    if (s.lambdaArgs) {
      s.arg0 = (s.lambdaArgs[0]);
      s.lambdaArgs = null;
    }
    r0 = s.arg0;
    if (!checkSubtype(r0, bBoard_UARTSettings__C639147_VT)) failedCast(r0);
    r0 = (s.arg0).fields["UART_STATUS"] = (0);
    r0 = (s.arg0).fields["UART_INTEN"] = (2);
    r0 = (s.arg0).fields["UART_INTENCLR"] = (3);
    r0 = (s.arg0).fields["UART_BAUD_id"] = (4);
    r0 = (s.arg0).fields["UART_WRITE_TX_DATA"] = (5);
    r0 = (s.arg0).fields["UART_READ_RX_DATA"] = (6);
    r0 = (s.arg0).fields["UART_READ_RX_DATA_BYTES"] = (7);
    r0 = (s.arg0).fields["UART_CLEAR_RX_DATA"] = (8);
    r0 = undefined;
    return leave(s, r0)
  default: oops()
} } }
bBoard_UARTSettings_constructor__P639155.info = {"start":16445,"length":302,"line":563,"column":8,"endLine":573,"endColumn":9,"fileName":"bBoard.ts","functionName":"inline","argumentNames":["this"]}

function bBoard_UARTSettings_constructor__P639155_mk(s) {
    checkStack(s.depth);
    return {
        parent: s, fn: bBoard_UARTSettings_constructor__P639155, depth: s.depth + 1,
        pc: 0, retval: undefined, r0: undefined, overwrittenPC: false, lambdaArgs: null,
  arg0: undefined,
} }




function lambda_2_mk(s) {
    checkStack(s.depth);
    return {
        parent: s, fn: null, depth: s.depth + 1,
        pc: 0, retval: undefined, r0: undefined, overwrittenPC: false, lambdaArgs: null,
  tmp_0: undefined,
  tmp_1: undefined,
  tmp_2: undefined,
  tmp_3: undefined,
  tmp_4: undefined,
  arg0: undefined,
  arg1: undefined,
} }

const bBoard_UARTSettings__C639147_VT = mkVTable({
  name: "UARTSettings",
  numFields: 8,
  classNo: 16,
  lastSubtypeNo: 16,
  maxBgInstances: null,
  methods: {
  },
  iface: {
    "UART_STATUS": null,
    "set/UART_STATUS": null,
    "UART_INTEN": null,
    "set/UART_INTEN": null,
    "UART_INTENCLR": null,
    "set/UART_INTENCLR": null,
    "UART_BAUD_id": null,
    "set/UART_BAUD_id": null,
    "UART_WRITE_TX_DATA": null,
    "set/UART_WRITE_TX_DATA": null,
    "UART_READ_RX_DATA": null,
    "set/UART_READ_RX_DATA": null,
    "UART_READ_RX_DATA_BYTES": null,
    "set/UART_READ_RX_DATA_BYTES": null,
    "UART_CLEAR_RX_DATA": null,
    "set/UART_CLEAR_RX_DATA": null,
  },
});
const WiFiSetResponses_SetResponse__C639183_VT = mkVTable({
  name: "SetResponse",
  numFields: 5,
  classNo: 17,
  lastSubtypeNo: 17,
  maxBgInstances: null,
  methods: {
  },
  iface: {
    "defaultWiFiTimeoutmS": null,
    "set/defaultWiFiTimeoutmS": null,
    "response": null,
    "set/response": null,
    "receivedData": null,
    "set/receivedData": null,
    "MQTTMessageRetrieveState": null,
    "set/MQTTMessageRetrieveState": null,
    "MQTTMessage": null,
    "set/MQTTMessage": null,
  },
});
const bBoard_IOSettings__C639136_VT = mkVTable({
  name: "IOSettings",
  numFields: 8,
  classNo: 18,
  lastSubtypeNo: 19,
  maxBgInstances: null,
  methods: {
  },
  iface: {
    "DIRSET_id": null,
    "set/DIRSET_id": null,
    "DIRCLR_id": null,
    "set/DIRCLR_id": null,
    "GPIO_id": null,
    "set/GPIO_id": null,
    "SET_id": null,
    "set/SET_id": null,
    "CLR_id": null,
    "set/CLR_id": null,
    "TOGGLE_id": null,
    "set/TOGGLE_id": null,
    "GPIOPULLENSET_id": null,
    "set/GPIOPULLENSET_id": null,
    "ODC_id": null,
    "set/ODC_id": null,
  },
});
const bBoard_PinSettings__C639156_VT = mkVTable({
  name: "PinSettings",
  numFields: 8,
  classNo: 19,
  lastSubtypeNo: 19,
  maxBgInstances: null,
  methods: {
  },
  iface: {
    "DIRSET_id": null,
    "set/DIRSET_id": null,
    "DIRCLR_id": null,
    "set/DIRCLR_id": null,
    "GPIO_id": null,
    "set/GPIO_id": null,
    "SET_id": null,
    "set/SET_id": null,
    "CLR_id": null,
    "set/CLR_id": null,
    "TOGGLE_id": null,
    "set/TOGGLE_id": null,
    "GPIOPULLENSET_id": null,
    "set/GPIOPULLENSET_id": null,
    "ODC_id": null,
    "set/ODC_id": null,
  },
});
const bBoard_I2CSettings__C639174_VT = mkVTable({
  name: "I2CSettings",
  numFields: 4,
  classNo: 20,
  lastSubtypeNo: 20,
  maxBgInstances: null,
  methods: {
  },
  iface: {
    "I2C_WRITE_id": null,
    "set/I2C_WRITE_id": null,
    "I2C_READ_id": null,
    "set/I2C_READ_id": null,
    "I2C_WRITE_NO_MEM_id": null,
    "set/I2C_WRITE_NO_MEM_id": null,
    "I2C_READ_NO_MEM_id": null,
    "set/I2C_READ_NO_MEM_id": null,
  },
});
const bBoard_SPIsetting__C639165_VT = mkVTable({
  name: "SPIsetting",
  numFields: 8,
  classNo: 21,
  lastSubtypeNo: 21,
  maxBgInstances: null,
  methods: {
  },
  iface: {
    "SPI_WRITE_id": null,
    "set/SPI_WRITE_id": null,
    "SPI_READ_id": null,
    "set/SPI_READ_id": null,
    "SPI_CONFIG_id": null,
    "set/SPI_CONFIG_id": null,
    "SPI_WRITEBULK_id": null,
    "set/SPI_WRITEBULK_id": null,
    "SPI_WRITEBULK_CS_id": null,
    "set/SPI_WRITEBULK_CS_id": null,
    "SPI_READBULK_CS_id": null,
    "set/SPI_READBULK_CS_id": null,
    "SPI_BAUD_id": null,
    "set/SPI_BAUD_id": null,
    "SPI_CONFIG_CS_id": null,
    "set/SPI_CONFIG_CS_id": null,
  },
});
const bBoard_PWMSettings__C639141_VT = mkVTable({
  name: "PWMSettings",
  numFields: 2,
  classNo: 22,
  lastSubtypeNo: 22,
  maxBgInstances: null,
  methods: {
  },
  iface: {
    "pitchPin": null,
    "set/pitchPin": null,
    "pitchClick": null,
    "set/pitchClick": null,
  },
});
const Heart_Rate_interrupt_stat_register__C639631_VT = mkVTable({
  name: "interrupt_stat_register",
  numFields: 1,
  classNo: 23,
  lastSubtypeNo: 23,
  maxBgInstances: null,
  methods: {
  },
  iface: {
    "registerValue": null,
    "set/registerValue": null,
  },
});
const Heart_Rate_interrupt_en_register__C639648_VT = mkVTable({
  name: "interrupt_en_register",
  numFields: 1,
  classNo: 24,
  lastSubtypeNo: 24,
  maxBgInstances: null,
  methods: {
  },
  iface: {
    "registerValue": null,
    "set/registerValue": null,
  },
});
const Heart_Rate_mode_config_register__C639665_VT = mkVTable({
  name: "mode_config_register",
  numFields: 1,
  classNo: 25,
  lastSubtypeNo: 25,
  maxBgInstances: null,
  methods: {
  },
  iface: {
    "registerValue": null,
    "set/registerValue": null,
  },
});
const Heart_Rate_spo2_config_register__C639680_VT = mkVTable({
  name: "spo2_config_register",
  numFields: 1,
  classNo: 26,
  lastSubtypeNo: 26,
  maxBgInstances: null,
  methods: {
  },
  iface: {
    "registerValue": null,
    "set/registerValue": null,
  },
});
const Heart_Rate_led_config_register__C639693_VT = mkVTable({
  name: "led_config_register",
  numFields: 1,
  classNo: 27,
  lastSubtypeNo: 27,
  maxBgInstances: null,
  methods: {
  },
  iface: {
    "registerValue": null,
    "set/registerValue": null,
  },
});

const breakpoints = setupDebugger(1, ["_intervals___638814","CLEAR_BBOARD_TX_BUFFER___639060","CLEAR_BBOARD_RX_BUFFER___639072","READ_TX_BUFFER_SIZE___639082","EXECUTE_BBOARD_COMMAND___639092","READ_BBOARD_TX_BUFFER___639102","UARTs___639181","UARTs___639189","SetResponseObj___639192","MQTTMessageObject___639204","mqttMessageList___639206","PINs___639216","I2Cs___639246","PINs___639268","SPIs___639271","i2csettingsobj___639315","PINs___639330","I2Cs___639333","PINs___639361","I2Cs___639364","PINs___639383","pwms___639386","PINs___639412","PINs___639522","PWMs___639612","I2Cs___639628","interrupt_stat_bits___639646","interrupt_en_bits___639663","mode_config_bits___639678","spo2_config_bits___639691","led_config_bits___639702","irFilters___639705","rates___639719","plus___639881","i___639876","f___639878","minus___639885","r___639888","ri___639891","listeners___638825"])

return _main___P638511
})
