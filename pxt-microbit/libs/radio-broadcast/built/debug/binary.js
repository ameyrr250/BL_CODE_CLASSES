// total=37786 new=79.15% cached=0.00% other=20.85%
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
pxsim.setTitle("radio-broadcast");
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


function _main___P20008(s) {
let r0 = s.r0, step = s.pc;
s.pc = -1;


while (true) {
if (yieldSteps-- < 0 && maybeYield(s, step, r0)) return null;
switch (step) {
  case 0:

    globals._intervals___20311 = (undefined);
    r0 = pxsim.pins.createBuffer(1);
    globals.CLEAR_BBOARD_TX_BUFFER___20557 = (r0);
    r0 = pxsim.BufferMethods.setNumber(globals.CLEAR_BBOARD_TX_BUFFER___20557, 2, 0, 1);
    r0 = pxsim.pins.createBuffer(1);
    globals.CLEAR_BBOARD_RX_BUFFER___20569 = (r0);
    r0 = pxsim.BufferMethods.setNumber(globals.CLEAR_BBOARD_RX_BUFFER___20569, 2, 0, 0);
    r0 = pxsim.pins.createBuffer(1);
    globals.READ_TX_BUFFER_SIZE___20579 = (r0);
    r0 = pxsim.BufferMethods.setNumber(globals.READ_TX_BUFFER_SIZE___20579, 2, 0, 3);
    r0 = pxsim.pins.createBuffer(1);
    globals.EXECUTE_BBOARD_COMMAND___20589 = (r0);
    r0 = pxsim.BufferMethods.setNumber(globals.EXECUTE_BBOARD_COMMAND___20589, 2, 0, 7);
    r0 = pxsim.pins.createBuffer(1);
    globals.READ_BBOARD_TX_BUFFER___20599 = (r0);
    r0 = pxsim.BufferMethods.setNumber(globals.READ_BBOARD_TX_BUFFER___20599, 2, 0, 2);
    r0 = pxsim_pxtcore_mkClassInstance(bBoard_UARTSettings__C20644_VT);
    s.tmp_0 = r0;
    s.tmp_1 = bBoard_UARTSettings_constructor__P20652_mk(s);
    s.tmp_1.arg0 = s.tmp_0;
    s.pc = 1; return s.tmp_1;
  case 1:
    r0 = s.retval;
    globals.UARTs___20678 = (s.tmp_0);
    r0 = pxsim_pxtcore_mkClassInstance(bBoard_UARTSettings__C20644_VT);
    s.tmp_0 = r0;
    s.tmp_1 = bBoard_UARTSettings_constructor__P20652_mk(s);
    s.tmp_1.arg0 = s.tmp_0;
    s.pc = 2; return s.tmp_1;
  case 2:
    r0 = s.retval;
    globals.UARTs___20686 = (s.tmp_0);
    r0 = pxsim_pxtcore_mkClassInstance(WiFiSetResponses_SetResponse__C20680_VT);
    s.tmp_0 = r0;
    s.tmp_1 = WiFiSetResponses_SetResponse_constructor__P20684_mk(s);
    s.tmp_1.arg0 = s.tmp_0;
    s.pc = 3; return s.tmp_1;
  case 3:
    r0 = s.retval;
    globals.SetResponseObj___20689 = (s.tmp_0);
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
    globals.MQTTMessageObject___20701 = (s.tmp_0);
    r0 = pxsim_Array__mk();
    s.tmp_0 = r0;
    r0 = pxsim_Array__push(s.tmp_0, globals.MQTTMessageObject___20701);
    globals.mqttMessageList___20703 = (s.tmp_0);
    r0 = pxsim_Array_.pop(globals.mqttMessageList___20703);
    r0 = pxsim_pxtcore_mkClassInstance(bBoard_PinSettings__C20653_VT);
    s.tmp_0 = r0;
    s.tmp_1 = bBoard_PinSettings_constructor__P20659_mk(s);
    s.tmp_1.arg0 = s.tmp_0;
    s.pc = 4; return s.tmp_1;
  case 4:
    r0 = s.retval;
    globals.PINs___20713 = (s.tmp_0);
    r0 = pxsim_pxtcore_mkClassInstance(bBoard_I2CSettings__C20671_VT);
    s.tmp_0 = r0;
    s.tmp_1 = bBoard_I2CSettings_constructor__P20676_mk(s);
    s.tmp_1.arg0 = s.tmp_0;
    s.pc = 5; return s.tmp_1;
  case 5:
    r0 = s.retval;
    globals.I2Cs___20743 = (s.tmp_0);
    r0 = pxsim_pxtcore_mkClassInstance(bBoard_PinSettings__C20653_VT);
    s.tmp_0 = r0;
    s.tmp_1 = bBoard_PinSettings_constructor__P20659_mk(s);
    s.tmp_1.arg0 = s.tmp_0;
    s.pc = 6; return s.tmp_1;
  case 6:
    r0 = s.retval;
    globals.PINs___20765 = (s.tmp_0);
    r0 = pxsim_pxtcore_mkClassInstance(bBoard_SPIsetting__C20662_VT);
    s.tmp_0 = r0;
    s.tmp_1 = bBoard_SPIsetting_constructor__P20670_mk(s);
    s.tmp_1.arg0 = s.tmp_0;
    s.pc = 7; return s.tmp_1;
  case 7:
    r0 = s.retval;
    globals.SPIs___20768 = (s.tmp_0);
    r0 = pxsim_pxtcore_mkClassInstance(bBoard_I2CSettings__C20671_VT);
    s.tmp_0 = r0;
    s.tmp_1 = bBoard_I2CSettings_constructor__P20676_mk(s);
    s.tmp_1.arg0 = s.tmp_0;
    s.pc = 8; return s.tmp_1;
  case 8:
    r0 = s.retval;
    globals.i2csettingsobj___20812 = (s.tmp_0);
    r0 = pxsim_pxtcore_mkClassInstance(bBoard_PinSettings__C20653_VT);
    s.tmp_0 = r0;
    s.tmp_1 = bBoard_PinSettings_constructor__P20659_mk(s);
    s.tmp_1.arg0 = s.tmp_0;
    s.pc = 9; return s.tmp_1;
  case 9:
    r0 = s.retval;
    globals.PINs___20827 = (s.tmp_0);
    r0 = pxsim_pxtcore_mkClassInstance(bBoard_I2CSettings__C20671_VT);
    s.tmp_0 = r0;
    s.tmp_1 = bBoard_I2CSettings_constructor__P20676_mk(s);
    s.tmp_1.arg0 = s.tmp_0;
    s.pc = 10; return s.tmp_1;
  case 10:
    r0 = s.retval;
    globals.I2Cs___20830 = (s.tmp_0);
    r0 = pxsim_pxtcore_mkClassInstance(bBoard_PinSettings__C20653_VT);
    s.tmp_0 = r0;
    s.tmp_1 = bBoard_PinSettings_constructor__P20659_mk(s);
    s.tmp_1.arg0 = s.tmp_0;
    s.pc = 11; return s.tmp_1;
  case 11:
    r0 = s.retval;
    globals.PINs___20858 = (s.tmp_0);
    r0 = pxsim_pxtcore_mkClassInstance(bBoard_I2CSettings__C20671_VT);
    s.tmp_0 = r0;
    s.tmp_1 = bBoard_I2CSettings_constructor__P20676_mk(s);
    s.tmp_1.arg0 = s.tmp_0;
    s.pc = 12; return s.tmp_1;
  case 12:
    r0 = s.retval;
    globals.I2Cs___20861 = (s.tmp_0);
    r0 = pxsim_pxtcore_mkClassInstance(bBoard_PinSettings__C20653_VT);
    s.tmp_0 = r0;
    s.tmp_1 = bBoard_PinSettings_constructor__P20659_mk(s);
    s.tmp_1.arg0 = s.tmp_0;
    s.pc = 13; return s.tmp_1;
  case 13:
    r0 = s.retval;
    globals.PINs___20880 = (s.tmp_0);
    r0 = pxsim_pxtcore_mkClassInstance(bBoard_PWMSettings__C20638_VT);
    s.tmp_0 = r0;
    s.tmp_1 = bBoard_PWMSettings_constructor__P20643_mk(s);
    s.tmp_1.arg0 = s.tmp_0;
    s.pc = 14; return s.tmp_1;
  case 14:
    r0 = s.retval;
    globals.pwms___20883 = (s.tmp_0);
    r0 = pxsim_pxtcore_mkClassInstance(bBoard_PinSettings__C20653_VT);
    s.tmp_0 = r0;
    s.tmp_1 = bBoard_PinSettings_constructor__P20659_mk(s);
    s.tmp_1.arg0 = s.tmp_0;
    s.pc = 15; return s.tmp_1;
  case 15:
    r0 = s.retval;
    globals.PINs___20909 = (s.tmp_0);
    r0 = pxsim_pxtcore_mkClassInstance(bBoard_PinSettings__C20653_VT);
    s.tmp_0 = r0;
    s.tmp_1 = bBoard_PinSettings_constructor__P20659_mk(s);
    s.tmp_1.arg0 = s.tmp_0;
    s.pc = 16; return s.tmp_1;
  case 16:
    r0 = s.retval;
    globals.PINs___21019 = (s.tmp_0);
    r0 = pxsim_pxtcore_mkClassInstance(bBoard_PWMSettings__C20638_VT);
    s.tmp_0 = r0;
    s.tmp_1 = bBoard_PWMSettings_constructor__P20643_mk(s);
    s.tmp_1.arg0 = s.tmp_0;
    s.pc = 17; return s.tmp_1;
  case 17:
    r0 = s.retval;
    globals.PWMs___21111 = (s.tmp_0);
    r0 = pxsim_pxtcore_mkClassInstance(bBoard_I2CSettings__C20671_VT);
    s.tmp_0 = r0;
    s.tmp_1 = bBoard_I2CSettings_constructor__P20676_mk(s);
    s.tmp_1.arg0 = s.tmp_0;
    s.pc = 18; return s.tmp_1;
  case 18:
    r0 = s.retval;
    globals.I2Cs___21127 = (s.tmp_0);
    r0 = pxsim_pxtcore_mkClassInstance(Heart_Rate_interrupt_stat_register__C21130_VT);
    s.tmp_0 = r0;
    s.tmp_1 = Heart_Rate_interrupt_stat_register_constructor__P21143_mk(s);
    s.tmp_1.arg0 = s.tmp_0;
    s.pc = 19; return s.tmp_1;
  case 19:
    r0 = s.retval;
    globals.interrupt_stat_bits___21145 = (s.tmp_0);
    r0 = pxsim_pxtcore_mkClassInstance(Heart_Rate_interrupt_en_register__C21147_VT);
    s.tmp_0 = r0;
    s.tmp_1 = Heart_Rate_interrupt_en_register_constructor__P21160_mk(s);
    s.tmp_1.arg0 = s.tmp_0;
    s.pc = 20; return s.tmp_1;
  case 20:
    r0 = s.retval;
    globals.interrupt_en_bits___21162 = (s.tmp_0);
    r0 = pxsim_pxtcore_mkClassInstance(Heart_Rate_mode_config_register__C21164_VT);
    s.tmp_0 = r0;
    s.tmp_1 = Heart_Rate_mode_config_register_constructor__P21175_mk(s);
    s.tmp_1.arg0 = s.tmp_0;
    s.tmp_1.arg1 = 0;
    s.pc = 21; return s.tmp_1;
  case 21:
    r0 = s.retval;
    globals.mode_config_bits___21177 = (s.tmp_0);
    r0 = pxsim_pxtcore_mkClassInstance(Heart_Rate_spo2_config_register__C21179_VT);
    s.tmp_0 = r0;
    s.tmp_1 = Heart_Rate_spo2_config_register_constructor__P21188_mk(s);
    s.tmp_1.arg0 = s.tmp_0;
    s.pc = 22; return s.tmp_1;
  case 22:
    r0 = s.retval;
    globals.spo2_config_bits___21190 = (s.tmp_0);
    r0 = pxsim_pxtcore_mkClassInstance(Heart_Rate_led_config_register__C21192_VT);
    s.tmp_0 = r0;
    s.tmp_1 = Heart_Rate_led_config_register_constructor__P21199_mk(s);
    s.tmp_1.arg0 = s.tmp_0;
    s.pc = 23; return s.tmp_1;
  case 23:
    r0 = s.retval;
    globals.led_config_bits___21201 = (s.tmp_0);
    r0 = pxsim_Array__mk();
    s.tmp_0 = r0;
    r0 = pxsim_Array__push(s.tmp_0, 0);
    r0 = pxsim_Array__push(s.tmp_0, 0);
    r0 = pxsim_pxtrt.mkMap();
    s.tmp_1 = r0;
    r0 = pxsim_pxtrt.mapSetByString(s.tmp_1, "v_ctr", s.tmp_0);
    r0 = pxsim_pxtrt.mapSetByString(s.tmp_1, "dcW", 0);
    globals.irFilters___21204 = (s.tmp_1);
    r0 = pxsim_Array__mk();
    globals.rates___21218 = (r0);
    s.tmp_0 = helpers_arrayFill__P20174_mk(s);
    s.tmp_0.arg0 = globals.rates___21218;
    s.tmp_0.arg1 = 0;
    s.tmp_0.arg2 = 0;
    s.tmp_0.arg3 = 6;
    s.pc = 24; return s.tmp_0;
  case 24:
    r0 = s.retval;
    r0 = undefined;
    return leave(s, r0)
  default: oops()
} } }
_main___P20008.info = {"start":0,"length":0,"line":0,"column":0,"endLine":0,"endColumn":0,"fileName":"radio-broadcast.ts","functionName":"<main>","argumentNames":[]}
_main___P20008.continuations = [  ]

function _main___P20008_mk(s) {
    checkStack(s.depth);
    return {
        parent: s, fn: _main___P20008, depth: s.depth + 1,
        pc: 0, retval: undefined, r0: undefined, overwrittenPC: false, lambdaArgs: null,
  tmp_0: undefined,
  tmp_1: undefined,
  tmp_2: undefined,
  tmp_3: undefined,
  tmp_4: undefined,
  tmp_5: undefined,
} }





function helpers_arrayFill__P20174(s) {
let r0 = s.r0, step = s.pc;
s.pc = -1;


while (true) {
if (yieldSteps-- < 0 && maybeYield(s, step, r0)) return null;
switch (step) {
  case 0:

    s.len___21479 = undefined;
    s.relativeStart___21484 = undefined;
    s.k___21491 = undefined;
    s.relativeEnd___21501 = undefined;
    s.final___21509 = undefined;
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
    s.len___21479 = (r0);
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
    s.relativeStart___21484 = (s.tmp_1);
    r0 = (s.relativeStart___21484 < 0);
    s.tmp_0 = r0;
    r0 = pxsim_numops_toBoolDecr(s.tmp_0);
    if (!r0) { step = 3; continue; }
    s.tmp_1 = Math_max__P20204_mk(s);
    r0 = (s.len___21479 + s.relativeStart___21484);
    s.tmp_1.arg0 = r0;
    s.tmp_1.arg1 = 0;
    s.pc = 11; return s.tmp_1;
  case 11:
    r0 = s.retval;
    { step = 4; continue; }
  case 3:
    s.tmp_2 = Math_min__P20205_mk(s);
    s.tmp_2.arg0 = s.relativeStart___21484;
    s.tmp_2.arg1 = s.len___21479;
    s.pc = 12; return s.tmp_2;
  case 12:
    r0 = s.retval;
  case 4:
    // jmp value (already in r0)
    s.tmp_3 = r0;
    s.k___21491 = (s.tmp_3);
    r0 = (s.arg3 === undefined);
    s.tmp_0 = r0;
    r0 = pxsim_numops_toBoolDecr(s.tmp_0);
    if (!r0) { step = 5; continue; }
    r0 = s.len___21479;
    { step = 6; continue; }
  case 5:
    r0 = (s.arg3 >> 0);
  case 6:
    // jmp value (already in r0)
    s.tmp_1 = r0;
    s.relativeEnd___21501 = (s.tmp_1);
    r0 = (s.relativeEnd___21501 < 0);
    s.tmp_0 = r0;
    r0 = pxsim_numops_toBoolDecr(s.tmp_0);
    if (!r0) { step = 7; continue; }
    s.tmp_1 = Math_max__P20204_mk(s);
    r0 = (s.len___21479 + s.relativeEnd___21501);
    s.tmp_1.arg0 = r0;
    s.tmp_1.arg1 = 0;
    s.pc = 13; return s.tmp_1;
  case 13:
    r0 = s.retval;
    { step = 8; continue; }
  case 7:
    s.tmp_2 = Math_min__P20205_mk(s);
    s.tmp_2.arg0 = s.relativeEnd___21501;
    s.tmp_2.arg1 = s.len___21479;
    s.pc = 14; return s.tmp_2;
  case 14:
    r0 = s.retval;
  case 8:
    // jmp value (already in r0)
    s.tmp_3 = r0;
    s.final___21509 = (s.tmp_3);
  case 9:
    r0 = (s.k___21491 < s.final___21509);
    s.tmp_0 = r0;
    r0 = pxsim_numops_toBoolDecr(s.tmp_0);
    if (!r0) { step = 10; continue; }
    r0 = pxsim_Array_.setAt(s.arg0, s.k___21491, s.arg1);
    r0 = (s.k___21491 + 1);
    s.k___21491 = (r0);
    { step = 9; continue; }
  case 10:
    r0 = s.arg0;
    return leave(s, r0)
  default: oops()
} } }
helpers_arrayFill__P20174.info = {"start":2780,"length":856,"line":106,"column":4,"endLine":135,"endColumn":5,"fileName":"pxt_modules/core/pxt-helpers.ts","functionName":"arrayFill","argumentNames":["O","value","start","end"]}

function helpers_arrayFill__P20174_mk(s) {
    checkStack(s.depth);
    return {
        parent: s, fn: helpers_arrayFill__P20174, depth: s.depth + 1,
        pc: 0, retval: undefined, r0: undefined, overwrittenPC: false, lambdaArgs: null,
  tmp_0: undefined,
  tmp_1: undefined,
  tmp_2: undefined,
  tmp_3: undefined,
  len___21479: undefined,
  relativeStart___21484: undefined,
  k___21491: undefined,
  relativeEnd___21501: undefined,
  final___21509: undefined,
  arg0: undefined,
  arg1: undefined,
  arg2: undefined,
  arg3: undefined,
} }





function Math_min__P20205(s) {
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
Math_min__P20205.info = {"start":15790,"length":105,"line":538,"column":4,"endLine":541,"endColumn":5,"fileName":"pxt_modules/core/pxt-helpers.ts","functionName":"min","argumentNames":["a","b"]}

function Math_min__P20205_mk(s) {
    checkStack(s.depth);
    return {
        parent: s, fn: Math_min__P20205, depth: s.depth + 1,
        pc: 0, retval: undefined, r0: undefined, overwrittenPC: false, lambdaArgs: null,
  tmp_0: undefined,
  arg0: undefined,
  arg1: undefined,
} }





function Math_max__P20204(s) {
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
Math_max__P20204.info = {"start":15575,"length":105,"line":529,"column":4,"endLine":532,"endColumn":5,"fileName":"pxt_modules/core/pxt-helpers.ts","functionName":"max","argumentNames":["a","b"]}

function Math_max__P20204_mk(s) {
    checkStack(s.depth);
    return {
        parent: s, fn: Math_max__P20204, depth: s.depth + 1,
        pc: 0, retval: undefined, r0: undefined, overwrittenPC: false, lambdaArgs: null,
  tmp_0: undefined,
  arg0: undefined,
  arg1: undefined,
} }





function Heart_Rate_led_config_register_constructor__P21199(s) {
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
    if (!checkSubtype(r0, Heart_Rate_led_config_register__C21192_VT)) failedCast(r0);
    r0 = (s.arg0).fields["registerValue"] = (0);
    r0 = undefined;
    return leave(s, r0)
  default: oops()
} } }
Heart_Rate_led_config_register_constructor__P21199.info = {"start":9915,"length":55,"line":347,"column":4,"endLine":349,"endColumn":5,"fileName":"pxt_modules/core/heartrate.ts","functionName":"inline","argumentNames":["this"]}

function Heart_Rate_led_config_register_constructor__P21199_mk(s) {
    checkStack(s.depth);
    return {
        parent: s, fn: Heart_Rate_led_config_register_constructor__P21199, depth: s.depth + 1,
        pc: 0, retval: undefined, r0: undefined, overwrittenPC: false, lambdaArgs: null,
  arg0: undefined,
} }





function Heart_Rate_spo2_config_register_constructor__P21188(s) {
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
    if (!checkSubtype(r0, Heart_Rate_spo2_config_register__C21179_VT)) failedCast(r0);
    r0 = (s.arg0).fields["registerValue"] = (0);
    r0 = undefined;
    return leave(s, r0)
  default: oops()
} } }
Heart_Rate_spo2_config_register_constructor__P21188.info = {"start":8944,"length":55,"line":304,"column":4,"endLine":306,"endColumn":5,"fileName":"pxt_modules/core/heartrate.ts","functionName":"inline","argumentNames":["this"]}

function Heart_Rate_spo2_config_register_constructor__P21188_mk(s) {
    checkStack(s.depth);
    return {
        parent: s, fn: Heart_Rate_spo2_config_register_constructor__P21188, depth: s.depth + 1,
        pc: 0, retval: undefined, r0: undefined, overwrittenPC: false, lambdaArgs: null,
  arg0: undefined,
} }





function Heart_Rate_mode_config_register_constructor__P21175(s) {
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
    if (!checkSubtype(r0, Heart_Rate_mode_config_register__C21164_VT)) failedCast(r0);
    r0 = (s.arg0).fields["registerValue"] = (s.arg1);
    r0 = undefined;
    return leave(s, r0)
  default: oops()
} } }
Heart_Rate_mode_config_register_constructor__P21175.info = {"start":7757,"length":84,"line":254,"column":4,"endLine":256,"endColumn":5,"fileName":"pxt_modules/core/heartrate.ts","functionName":"inline","argumentNames":["this","initialValue"]}

function Heart_Rate_mode_config_register_constructor__P21175_mk(s) {
    checkStack(s.depth);
    return {
        parent: s, fn: Heart_Rate_mode_config_register_constructor__P21175, depth: s.depth + 1,
        pc: 0, retval: undefined, r0: undefined, overwrittenPC: false, lambdaArgs: null,
  arg0: undefined,
  arg1: undefined,
} }





function Heart_Rate_interrupt_en_register_constructor__P21160(s) {
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
    if (!checkSubtype(r0, Heart_Rate_interrupt_en_register__C21147_VT)) failedCast(r0);
    r0 = (s.arg0).fields["registerValue"] = (0);
    r0 = undefined;
    return leave(s, r0)
  default: oops()
} } }
Heart_Rate_interrupt_en_register_constructor__P21160.info = {"start":6335,"length":55,"line":197,"column":4,"endLine":199,"endColumn":5,"fileName":"pxt_modules/core/heartrate.ts","functionName":"inline","argumentNames":["this"]}

function Heart_Rate_interrupt_en_register_constructor__P21160_mk(s) {
    checkStack(s.depth);
    return {
        parent: s, fn: Heart_Rate_interrupt_en_register_constructor__P21160, depth: s.depth + 1,
        pc: 0, retval: undefined, r0: undefined, overwrittenPC: false, lambdaArgs: null,
  arg0: undefined,
} }





function Heart_Rate_interrupt_stat_register_constructor__P21143(s) {
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
    if (!checkSubtype(r0, Heart_Rate_interrupt_stat_register__C21130_VT)) failedCast(r0);
    r0 = (s.arg0).fields["registerValue"] = (0);
    r0 = undefined;
    return leave(s, r0)
  default: oops()
} } }
Heart_Rate_interrupt_stat_register_constructor__P21143.info = {"start":4926,"length":55,"line":140,"column":4,"endLine":142,"endColumn":5,"fileName":"pxt_modules/core/heartrate.ts","functionName":"inline","argumentNames":["this"]}

function Heart_Rate_interrupt_stat_register_constructor__P21143_mk(s) {
    checkStack(s.depth);
    return {
        parent: s, fn: Heart_Rate_interrupt_stat_register_constructor__P21143, depth: s.depth + 1,
        pc: 0, retval: undefined, r0: undefined, overwrittenPC: false, lambdaArgs: null,
  arg0: undefined,
} }





function bBoard_PWMSettings_constructor__P20643(s) {
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
    if (!checkSubtype(r0, bBoard_PWMSettings__C20638_VT)) failedCast(r0);
    r0 = (s.arg0).fields["pitchPin"] = (32768);
    r0 = (s.arg0).fields["pitchClick"] = (1);
    r0 = undefined;
    return leave(s, r0)
  default: oops()
} } }
bBoard_PWMSettings_constructor__P20643.info = {"start":11710,"length":113,"line":439,"column":8,"endLine":442,"endColumn":9,"fileName":"pxt_modules/core/bBoard.ts","functionName":"inline","argumentNames":["this"]}

function bBoard_PWMSettings_constructor__P20643_mk(s) {
    checkStack(s.depth);
    return {
        parent: s, fn: bBoard_PWMSettings_constructor__P20643, depth: s.depth + 1,
        pc: 0, retval: undefined, r0: undefined, overwrittenPC: false, lambdaArgs: null,
  arg0: undefined,
} }





function bBoard_SPIsetting_constructor__P20670(s) {
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
    if (!checkSubtype(r0, bBoard_SPIsetting__C20662_VT)) failedCast(r0);
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
bBoard_SPIsetting_constructor__P20670.info = {"start":36911,"length":296,"line":1070,"column":8,"endLine":1080,"endColumn":9,"fileName":"pxt_modules/core/bBoard.ts","functionName":"inline","argumentNames":["this"]}

function bBoard_SPIsetting_constructor__P20670_mk(s) {
    checkStack(s.depth);
    return {
        parent: s, fn: bBoard_SPIsetting_constructor__P20670, depth: s.depth + 1,
        pc: 0, retval: undefined, r0: undefined, overwrittenPC: false, lambdaArgs: null,
  arg0: undefined,
} }





function bBoard_I2CSettings_constructor__P20676(s) {
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
    if (!checkSubtype(r0, bBoard_I2CSettings__C20671_VT)) failedCast(r0);
    r0 = (s.arg0).fields["I2C_WRITE_id"] = (1);
    r0 = (s.arg0).fields["I2C_READ_id"] = (2);
    r0 = (s.arg0).fields["I2C_WRITE_NO_MEM_id"] = (3);
    r0 = (s.arg0).fields["I2C_READ_NO_MEM_id"] = (4);
    r0 = undefined;
    return leave(s, r0)
  default: oops()
} } }
bBoard_I2CSettings_constructor__P20676.info = {"start":47529,"length":199,"line":1358,"column":12,"endLine":1364,"endColumn":13,"fileName":"pxt_modules/core/bBoard.ts","functionName":"inline","argumentNames":["this"]}

function bBoard_I2CSettings_constructor__P20676_mk(s) {
    checkStack(s.depth);
    return {
        parent: s, fn: bBoard_I2CSettings_constructor__P20676, depth: s.depth + 1,
        pc: 0, retval: undefined, r0: undefined, overwrittenPC: false, lambdaArgs: null,
  arg0: undefined,
} }





function bBoard_PinSettings_constructor__P20659(s) {
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
    if (!checkSubtype(r0, bBoard_PinSettings__C20653_VT)) failedCast(r0);
    s.tmp_0 = bBoard_IOSettings_constructor__P20637_mk(s);
    s.tmp_0.arg0 = s.arg0;
    s.pc = 1; return s.tmp_0;
  case 1:
    r0 = s.retval;
    r0 = undefined;
    return leave(s, r0)
  default: oops()
} } }
bBoard_PinSettings_constructor__P20659.info = {"start":27021,"length":47,"line":834,"column":8,"endLine":836,"endColumn":9,"fileName":"pxt_modules/core/bBoard.ts","functionName":"inline","argumentNames":["this"]}

function bBoard_PinSettings_constructor__P20659_mk(s) {
    checkStack(s.depth);
    return {
        parent: s, fn: bBoard_PinSettings_constructor__P20659, depth: s.depth + 1,
        pc: 0, retval: undefined, r0: undefined, overwrittenPC: false, lambdaArgs: null,
  tmp_0: undefined,
  arg0: undefined,
} }





function bBoard_IOSettings_constructor__P20637(s) {
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
    if (!checkSubtype(r0, bBoard_IOSettings__C20633_VT)) failedCast(r0);
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
bBoard_IOSettings_constructor__P20637.info = {"start":6538,"length":251,"line":307,"column":8,"endLine":316,"endColumn":9,"fileName":"pxt_modules/core/bBoard.ts","functionName":"inline","argumentNames":["this"]}

function bBoard_IOSettings_constructor__P20637_mk(s) {
    checkStack(s.depth);
    return {
        parent: s, fn: bBoard_IOSettings_constructor__P20637, depth: s.depth + 1,
        pc: 0, retval: undefined, r0: undefined, overwrittenPC: false, lambdaArgs: null,
  arg0: undefined,
} }





function WiFiSetResponses_SetResponse_constructor__P20684(s) {
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
    if (!checkSubtype(r0, WiFiSetResponses_SetResponse__C20680_VT)) failedCast(r0);
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
WiFiSetResponses_SetResponse_constructor__P20684.info = {"start":291,"length":396,"line":11,"column":4,"endLine":17,"endColumn":5,"fileName":"pxt_modules/core/WiFi_BLE.ts","functionName":"inline","argumentNames":["this"]}

function WiFiSetResponses_SetResponse_constructor__P20684_mk(s) {
    checkStack(s.depth);
    return {
        parent: s, fn: WiFiSetResponses_SetResponse_constructor__P20684, depth: s.depth + 1,
        pc: 0, retval: undefined, r0: undefined, overwrittenPC: false, lambdaArgs: null,
  tmp_0: undefined,
  tmp_1: undefined,
  arg0: undefined,
} }





function bBoard_UARTSettings_constructor__P20652(s) {
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
    if (!checkSubtype(r0, bBoard_UARTSettings__C20644_VT)) failedCast(r0);
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
bBoard_UARTSettings_constructor__P20652.info = {"start":16868,"length":302,"line":578,"column":8,"endLine":588,"endColumn":9,"fileName":"pxt_modules/core/bBoard.ts","functionName":"inline","argumentNames":["this"]}

function bBoard_UARTSettings_constructor__P20652_mk(s) {
    checkStack(s.depth);
    return {
        parent: s, fn: bBoard_UARTSettings_constructor__P20652, depth: s.depth + 1,
        pc: 0, retval: undefined, r0: undefined, overwrittenPC: false, lambdaArgs: null,
  arg0: undefined,
} }




const bBoard_UARTSettings__C20644_VT = mkVTable({
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
const WiFiSetResponses_SetResponse__C20680_VT = mkVTable({
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
const bBoard_IOSettings__C20633_VT = mkVTable({
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
const bBoard_PinSettings__C20653_VT = mkVTable({
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
const bBoard_I2CSettings__C20671_VT = mkVTable({
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
const bBoard_SPIsetting__C20662_VT = mkVTable({
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
const bBoard_PWMSettings__C20638_VT = mkVTable({
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
const Heart_Rate_interrupt_stat_register__C21130_VT = mkVTable({
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
const Heart_Rate_interrupt_en_register__C21147_VT = mkVTable({
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
const Heart_Rate_mode_config_register__C21164_VT = mkVTable({
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
const Heart_Rate_spo2_config_register__C21179_VT = mkVTable({
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
const Heart_Rate_led_config_register__C21192_VT = mkVTable({
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

const breakpoints = setupDebugger(1, [])

return _main___P20008
})
