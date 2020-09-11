// total=50228 new=94.29% cached=0.00% other=5.71%
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
 ""
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


function _main___P14512558(s) {
let r0 = s.r0, step = s.pc;
s.pc = -1;


while (true) {
if (yieldSteps-- < 0 && maybeYield(s, step, r0)) return null;
switch (step) {
  case 0:

    globals._intervals___14512861 = (undefined);
    globals.listeners___14512872 = (undefined);
    r0 = pxsim.pins.createBuffer(1);
    globals.CLEAR_BBOARD_TX_BUFFER___14513107 = (r0);
    r0 = pxsim.BufferMethods.setNumber(globals.CLEAR_BBOARD_TX_BUFFER___14513107, 2, 0, 1);
    r0 = pxsim.pins.createBuffer(1);
    globals.CLEAR_BBOARD_RX_BUFFER___14513119 = (r0);
    r0 = pxsim.BufferMethods.setNumber(globals.CLEAR_BBOARD_RX_BUFFER___14513119, 2, 0, 0);
    r0 = pxsim.pins.createBuffer(1);
    globals.READ_TX_BUFFER_SIZE___14513129 = (r0);
    r0 = pxsim.BufferMethods.setNumber(globals.READ_TX_BUFFER_SIZE___14513129, 2, 0, 3);
    r0 = pxsim.pins.createBuffer(1);
    globals.EXECUTE_BBOARD_COMMAND___14513139 = (r0);
    r0 = pxsim.BufferMethods.setNumber(globals.EXECUTE_BBOARD_COMMAND___14513139, 2, 0, 7);
    r0 = pxsim.pins.createBuffer(1);
    globals.READ_BBOARD_TX_BUFFER___14513149 = (r0);
    r0 = pxsim.BufferMethods.setNumber(globals.READ_BBOARD_TX_BUFFER___14513149, 2, 0, 2);
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
    globals.MQTTMessageObject___14513353 = (s.tmp_0);
    r0 = pxsim_Array__mk();
    s.tmp_0 = r0;
    r0 = pxsim_Array__push(s.tmp_0, globals.MQTTMessageObject___14513353);
    globals.mqttMessageList___14513355 = (s.tmp_0);
    r0 = pxsim_Array_.pop(globals.mqttMessageList___14513355);
    globals.i___14513386 = (1);
    globals.f___14513388 = (0.5);
    r0 = (globals.i___14513386 + globals.f___14513388);
    globals.plus___14513391 = (r0);
    r0 = (globals.i___14513386 - globals.f___14513388);
    globals.minus___14513395 = (r0);
    r0 = pxsim.Math_.random();
    globals.r___14513398 = (r0);
    r0 = pxsim.Math_.randomRange(5, 10);
    globals.ri___14513401 = (r0);
    r0 = pxsim_Array__mk();
    s.tmp_0 = r0;
    r0 = pxsim_Array__push(s.tmp_0, 13330);
    r0 = pxsim_Array__push(s.tmp_0, 30806);
    s.tmp_1 = check__P14513403_mk(s);
    s.tmp_4 = Buffer_pack__P14513045_mk(s);
    s.tmp_4.arg0 = "<2h";
    s.tmp_4.arg1 = s.tmp_0;
    s.pc = 2; return s.tmp_4;
  case 2:
    r0 = s.retval;
    s.tmp_3 = r0;
    r0 = pxsim.BufferMethods.toHex(s.tmp_3);
    s.tmp_2 = r0;
    r0 = (s.tmp_2 == "12345678");
    s.tmp_1.arg0 = r0;
    s.pc = 1; return s.tmp_1;
  case 1:
    r0 = s.retval;
    r0 = pxsim_Array__mk();
    s.tmp_0 = r0;
    r0 = pxsim_Array__push(s.tmp_0, 13330);
    r0 = pxsim_Array__push(s.tmp_0, 30806);
    s.tmp_1 = check__P14513403_mk(s);
    s.tmp_4 = Buffer_pack__P14513045_mk(s);
    s.tmp_4.arg0 = ">hh";
    s.tmp_4.arg1 = s.tmp_0;
    s.pc = 4; return s.tmp_4;
  case 4:
    r0 = s.retval;
    s.tmp_3 = r0;
    r0 = pxsim.BufferMethods.toHex(s.tmp_3);
    s.tmp_2 = r0;
    r0 = (s.tmp_2 == "34127856");
    s.tmp_1.arg0 = r0;
    s.pc = 3; return s.tmp_1;
  case 3:
    r0 = s.retval;
    s.tmp_0 = check__P14513403_mk(s);
    s.tmp_3 = Buffer_fromHex__P14513038_mk(s);
    s.tmp_3.arg0 = "F00d";
    s.pc = 6; return s.tmp_3;
  case 6:
    r0 = s.retval;
    s.tmp_2 = r0;
    r0 = pxsim.BufferMethods.toHex(s.tmp_2);
    s.tmp_1 = r0;
    r0 = (s.tmp_1 == "f00d");
    s.tmp_0.arg0 = r0;
    s.pc = 5; return s.tmp_0;
  case 5:
    r0 = s.retval;
    r0 = undefined;
    return leave(s, r0)
  default: oops()
} } }
_main___P14512558.info = {"start":0,"length":0,"line":0,"column":0,"endLine":0,"endColumn":0,"fileName":"test.ts","functionName":"<main>","argumentNames":[]}
_main___P14512558.continuations = [  ]

function _main___P14512558_mk(s) {
    checkStack(s.depth);
    return {
        parent: s, fn: _main___P14512558, depth: s.depth + 1,
        pc: 0, retval: undefined, r0: undefined, overwrittenPC: false, lambdaArgs: null,
  tmp_0: undefined,
  tmp_1: undefined,
  tmp_2: undefined,
  tmp_3: undefined,
  tmp_4: undefined,
  tmp_5: undefined,
} }





function Buffer_fromHex__P14513038(s) {
let r0 = s.r0, step = s.pc;
s.pc = -1;


while (true) {
if (yieldSteps-- < 0 && maybeYield(s, step, r0)) return null;
switch (step) {
  case 0:

    s.hexStr___14513423 = undefined;
    s.res___14513425 = undefined;
    s.i___14513436 = undefined;
    s.p0___14513442 = undefined;
    s.p1___14513453 = undefined;
    if (s.lambdaArgs) {
      s.arg0 = (s.lambdaArgs[0]);
      s.lambdaArgs = null;
    }
    s.hexStr___14513423 = ("0123456789abcdef");
    r0 = pxsim_String_.length(s.arg0);
    s.tmp_1 = r0;
    r0 = (s.tmp_1 >> 1);
    s.tmp_0 = r0;
    r0 = pxsim.control.createBuffer(s.tmp_0);
    s.res___14513425 = (r0);
    s.tmp_0 = helpers_stringToLowerCase__P14512745_mk(s);
    s.tmp_0.arg0 = s.arg0;
    s.pc = 7; return s.tmp_0;
  case 7:
    r0 = s.retval;
    s.arg0 = (r0);
    s.i___14513436 = (0);
  case 1:
    s.tmp_1 = r0 = s.i___14513436;
    r0 = pxsim_String_.length(s.arg0);
    s.tmp_2 = r0;
    r0 = (s.tmp_1 < s.tmp_2);
    s.tmp_0 = r0;
    r0 = pxsim_numops_toBoolDecr(s.tmp_0);
    if (!r0) { step = 6; continue; }
    s.tmp_3 = r0 = s.hexStr___14513423;
    r0 = pxsim_String_.charAt(s.arg0, s.i___14513436);
    s.tmp_4 = r0;
    r0 = pxsim_String_.indexOf(s.tmp_3, s.tmp_4, undefined);
    s.p0___14513442 = (r0);
    s.tmp_0 = r0 = s.hexStr___14513423;
    s.tmp_2 = r0 = s.arg0;
    r0 = (s.i___14513436 + 1);
    s.tmp_3 = r0;
    r0 = pxsim_String_.charAt(s.tmp_2, s.tmp_3);
    s.tmp_1 = r0;
    r0 = pxsim_String_.indexOf(s.tmp_0, s.tmp_1, undefined);
    s.p1___14513453 = (r0);
    r0 = (s.p0___14513442 < 0);
    s.tmp_0 = r0;
    r0 = pxsim_numops_toBool(s.tmp_0);
    if (!r0) { step = 2; continue; }
    r0 = s.tmp_0;
    { step = 3; continue; }
  case 2:
    r0 = (s.p1___14513453 < 0);
  case 3:
    // jmp value (already in r0)
    s.tmp_1 = r0;
    r0 = pxsim_numops_toBoolDecr(s.tmp_1);
    if (!r0) { step = 4; continue; }
    r0 = pxsim_pxtcore.throwValue("Invalid hex");
  case 4:
  case 5:
    s.tmp_2 = r0 = s.res___14513425;
    r0 = (s.i___14513436 >> 1);
    s.tmp_3 = r0;
    r0 = (s.p0___14513442 << 4);
    s.tmp_5 = r0;
    r0 = (s.tmp_5 | s.p1___14513453);
    s.tmp_4 = r0;
    r0 = pxsim.BufferMethods.setByte(s.tmp_2, s.tmp_3, s.tmp_4);
    r0 = (s.i___14513436 + 2);
    s.i___14513436 = (r0);
    { step = 1; continue; }
  case 6:
    r0 = s.res___14513425;
    return leave(s, r0)
  default: oops()
} } }
Buffer_fromHex__P14513038.info = {"start":6683,"length":469,"line":240,"column":4,"endLine":252,"endColumn":5,"fileName":"buffer.ts","functionName":"fromHex","argumentNames":["hex"]}

function Buffer_fromHex__P14513038_mk(s) {
    checkStack(s.depth);
    return {
        parent: s, fn: Buffer_fromHex__P14513038, depth: s.depth + 1,
        pc: 0, retval: undefined, r0: undefined, overwrittenPC: false, lambdaArgs: null,
  tmp_0: undefined,
  tmp_1: undefined,
  tmp_2: undefined,
  tmp_3: undefined,
  tmp_4: undefined,
  tmp_5: undefined,
  hexStr___14513423: undefined,
  res___14513425: undefined,
  i___14513436: undefined,
  p0___14513442: undefined,
  p1___14513453: undefined,
  arg0: undefined,
} }





function helpers_stringToLowerCase__P14512745(s) {
let r0 = s.r0, step = s.pc;
s.pc = -1;


while (true) {
if (yieldSteps-- < 0 && maybeYield(s, step, r0)) return null;
switch (step) {
  case 0:

    s.r___14513484 = undefined;
    s.prev___14513485 = undefined;
    s.i___14513486 = undefined;
    s.c___14513492 = undefined;
    if (s.lambdaArgs) {
      s.arg0 = (s.lambdaArgs[0]);
      s.lambdaArgs = null;
    }
    r0 = pxsim_String_.mkEmpty();
    s.r___14513484 = (r0);
    s.prev___14513485 = (0);
    s.i___14513486 = (0);
  case 1:
    s.tmp_1 = r0 = s.i___14513486;
    r0 = pxsim_String_.length(s.arg0);
    s.tmp_2 = r0;
    r0 = (s.tmp_1 < s.tmp_2);
    s.tmp_0 = r0;
    r0 = pxsim_numops_toBoolDecr(s.tmp_0);
    if (!r0) { step = 6; continue; }
    r0 = pxsim_String_.charCodeAt(s.arg0, s.i___14513486);
    s.c___14513492 = (r0);
    r0 = (65 <= s.c___14513492);
    s.tmp_0 = r0;
    r0 = pxsim_numops_toBool(s.tmp_0);
    if (r0) { step = 2; continue; }
    r0 = s.tmp_0;
    { step = 3; continue; }
  case 2:
    r0 = (s.c___14513492 <= 90);
  case 3:
    // jmp value (already in r0)
    s.tmp_1 = r0;
    r0 = pxsim_numops_toBoolDecr(s.tmp_1);
    if (!r0) { step = 4; continue; }
    if ((s.r___14513484) && (s.r___14513484).vtable) {
    setupResume(s, 7);
    pxsim_String__stringConv(s.r___14513484);
    checkResumeConsumed();
    return;
    } else { s.retval = (s.r___14513484) + ""; }
  case 7:
    r0 = s.retval;
    s.tmp_2 = r0;
    s.tmp_7 = helpers_stringSlice__P14512744_mk(s);
    s.tmp_7.arg0 = s.arg0;
    s.tmp_7.arg1 = s.prev___14513485;
    s.tmp_7.arg2 = s.i___14513486;
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
    r0 = (s.c___14513492 + 32);
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
    s.r___14513484 = (r0);
    r0 = (s.i___14513486 + 1);
    s.prev___14513485 = (r0);
  case 4:
  case 5:
    r0 = (s.i___14513486 + 1);
    s.i___14513486 = (r0);
    { step = 1; continue; }
  case 6:
    if ((s.r___14513484) && (s.r___14513484).vtable) {
    setupResume(s, 12);
    pxsim_String__stringConv(s.r___14513484);
    checkResumeConsumed();
    return;
    } else { s.retval = (s.r___14513484) + ""; }
  case 12:
    r0 = s.retval;
    s.tmp_0 = r0;
    s.tmp_3 = helpers_stringSlice__P14512744_mk(s);
    s.tmp_3.arg0 = s.arg0;
    s.tmp_3.arg1 = s.prev___14513485;
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
    s.r___14513484 = (r0);
    r0 = s.r___14513484;
    return leave(s, r0)
  default: oops()
} } }
helpers_stringToLowerCase__P14512745.info = {"start":11538,"length":386,"line":393,"column":4,"endLine":405,"endColumn":5,"fileName":"pxt-helpers.ts","functionName":"stringToLowerCase","argumentNames":["s"]}

function helpers_stringToLowerCase__P14512745_mk(s) {
    checkStack(s.depth);
    return {
        parent: s, fn: helpers_stringToLowerCase__P14512745, depth: s.depth + 1,
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
  r___14513484: undefined,
  prev___14513485: undefined,
  i___14513486: undefined,
  c___14513492: undefined,
  arg0: undefined,
} }





function helpers_stringSlice__P14512744(s) {
let r0 = s.r0, step = s.pc;
s.pc = -1;


while (true) {
if (yieldSteps-- < 0 && maybeYield(s, step, r0)) return null;
switch (step) {
  case 0:

    s.len___14513543 = undefined;
    if (s.lambdaArgs) {
      s.arg0 = (s.lambdaArgs[0]);
      s.arg1 = (s.lambdaArgs[1]);
      s.arg2 = (s.lambdaArgs[2]);
      s.lambdaArgs = null;
    }
    r0 = pxsim_String_.length(s.arg0);
    s.len___14513543 = (r0);
    r0 = (s.arg1 < 0);
    s.tmp_0 = r0;
    r0 = pxsim_numops_toBoolDecr(s.tmp_0);
    if (!r0) { step = 1; continue; }
    s.tmp_1 = Math_max__P14512754_mk(s);
    r0 = (s.len___14513543 + s.arg1);
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
    s.arg2 = (s.len___14513543);
  case 3:
  case 4:
    r0 = (s.arg2 < 0);
    s.tmp_0 = r0;
    r0 = pxsim_numops_toBoolDecr(s.tmp_0);
    if (!r0) { step = 5; continue; }
    r0 = (s.len___14513543 + s.arg2);
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
helpers_stringSlice__P14512744.info = {"start":11047,"length":365,"line":373,"column":4,"endLine":389,"endColumn":5,"fileName":"pxt-helpers.ts","functionName":"stringSlice","argumentNames":["s","start","end"]}

function helpers_stringSlice__P14512744_mk(s) {
    checkStack(s.depth);
    return {
        parent: s, fn: helpers_stringSlice__P14512744, depth: s.depth + 1,
        pc: 0, retval: undefined, r0: undefined, overwrittenPC: false, lambdaArgs: null,
  tmp_0: undefined,
  tmp_1: undefined,
  tmp_2: undefined,
  len___14513543: undefined,
  arg0: undefined,
  arg1: undefined,
  arg2: undefined,
} }





function Math_max__P14512754(s) {
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
Math_max__P14512754.info = {"start":15575,"length":105,"line":529,"column":4,"endLine":532,"endColumn":5,"fileName":"pxt-helpers.ts","functionName":"max","argumentNames":["a","b"]}

function Math_max__P14512754_mk(s) {
    checkStack(s.depth);
    return {
        parent: s, fn: Math_max__P14512754, depth: s.depth + 1,
        pc: 0, retval: undefined, r0: undefined, overwrittenPC: false, lambdaArgs: null,
  tmp_0: undefined,
  arg0: undefined,
  arg1: undefined,
} }





function Buffer_pack__P14513045(s) {
let r0 = s.r0, step = s.pc;
s.pc = -1;


while (true) {
if (yieldSteps-- < 0 && maybeYield(s, step, r0)) return null;
switch (step) {
  case 0:

    s.buf___14513581 = undefined;
    if (s.lambdaArgs) {
      s.arg0 = (s.lambdaArgs[0]);
      s.arg1 = (s.lambdaArgs[1]);
      s.lambdaArgs = null;
    }
    s.tmp_1 = Buffer_packedSize__P14513044_mk(s);
    s.tmp_1.arg0 = s.arg0;
    s.pc = 1; return s.tmp_1;
  case 1:
    r0 = s.retval;
    s.tmp_0 = r0;
    r0 = pxsim.control.createBuffer(s.tmp_0);
    s.buf___14513581 = (r0);
    s.tmp_0 = Buffer___packUnpackCore__P14513048_mk(s);
    s.tmp_0.arg0 = s.arg0;
    s.tmp_0.arg1 = s.arg1;
    s.tmp_0.arg2 = s.buf___14513581;
    s.tmp_0.arg3 = true;
    s.tmp_0.arg4 = 0;
    s.pc = 2; return s.tmp_0;
  case 2:
    r0 = s.retval;
    r0 = s.buf___14513581;
    return leave(s, r0)
  default: oops()
} } }
Buffer_pack__P14513045.info = {"start":9148,"length":181,"line":328,"column":4,"endLine":332,"endColumn":5,"fileName":"buffer.ts","functionName":"pack","argumentNames":["format","nums"]}

function Buffer_pack__P14513045_mk(s) {
    checkStack(s.depth);
    return {
        parent: s, fn: Buffer_pack__P14513045, depth: s.depth + 1,
        pc: 0, retval: undefined, r0: undefined, overwrittenPC: false, lambdaArgs: null,
  tmp_0: undefined,
  tmp_1: undefined,
  buf___14513581: undefined,
  arg0: undefined,
  arg1: undefined,
} }





function Buffer___packUnpackCore__P14513048(s) {
let r0 = s.r0, step = s.pc;
s.pc = -1;


while (true) {
if (yieldSteps-- < 0 && maybeYield(s, step, r0)) return null;
switch (step) {
  case 0:

    s.isBig___14513596 = undefined;
    s.idx___14513597 = undefined;
    s.i___14513598 = undefined;
    s.i0___14513611 = undefined;
    s.reps___14513619 = undefined;
    s.fmt___14513633 = undefined;
    if (s.lambdaArgs) {
      s.arg0 = (s.lambdaArgs[0]);
      s.arg1 = (s.lambdaArgs[1]);
      s.arg2 = (s.lambdaArgs[2]);
      s.arg3 = (s.lambdaArgs[3]);
      s.arg4 = (s.lambdaArgs[4]);
      s.lambdaArgs = null;
    }
    s.isBig___14513596 = (false);
    s.idx___14513597 = (0);
    s.i___14513598 = (0);
  case 1:
    s.tmp_1 = r0 = s.i___14513598;
    r0 = pxsim_String_.length(s.arg0);
    s.tmp_2 = r0;
    r0 = (s.tmp_1 < s.tmp_2);
    s.tmp_0 = r0;
    r0 = pxsim_numops_toBoolDecr(s.tmp_0);
    if (!r0) { step = 22; continue; }
    r0 = pxsim_String_.charAt(s.arg0, s.i___14513598);
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
    s.isBig___14513596 = (false);
    { step = 21; continue; }
  case 5:
  case 6:
    s.isBig___14513596 = (true);
    { step = 21; continue; }
  case 7:
    r0 = (s.arg4 + 1);
    s.arg4 = (r0);
    { step = 21; continue; }
  case 8:
    s.i0___14513611 = (s.i___14513598);
  case 9:
    s.tmp_1 = Buffer_isDigit__P14513047_mk(s);
    r0 = pxsim_String_.charAt(s.arg0, s.i___14513598);
    s.tmp_1.arg0 = r0;
    s.pc = 23; return s.tmp_1;
  case 23:
    r0 = s.retval;
    s.tmp_0 = r0;
    r0 = pxsim_numops_toBoolDecr(s.tmp_0);
    if (!r0) { step = 10; continue; }
    r0 = (s.i___14513598 + 1);
    s.i___14513598 = (r0);
    { step = 9; continue; }
  case 10:
    s.reps___14513619 = (1);
    r0 = (s.i0___14513611 != s.i___14513598);
    s.tmp_0 = r0;
    r0 = pxsim_numops_toBoolDecr(s.tmp_0);
    if (!r0) { step = 11; continue; }
    s.tmp_1 = parseInt__P14512723_mk(s);
    s.tmp_2 = helpers_stringSlice__P14512744_mk(s);
    s.tmp_2.arg0 = s.arg0;
    s.tmp_2.arg1 = s.i0___14513611;
    s.tmp_2.arg2 = s.i___14513598;
    s.pc = 25; return s.tmp_2;
  case 25:
    r0 = s.retval;
    s.tmp_1.arg0 = r0;
    s.tmp_1.arg1 = undefined;
    s.pc = 24; return s.tmp_1;
  case 24:
    r0 = s.retval;
    s.reps___14513619 = (r0);
  case 11:
  case 12:
  case 13:
    s.tmp_0 = r0 = s.reps___14513619;
    r0 = (s.tmp_0 - 1);
    s.reps___14513619 = (r0);
    r0 = pxsim_numops_toBoolDecr(s.tmp_0);
    if (!r0) { step = 20; continue; }
    s.tmp_1 = Buffer_getFormat__P14513046_mk(s);
    r0 = pxsim_String_.charAt(s.arg0, s.i___14513598);
    s.tmp_1.arg0 = r0;
    s.tmp_1.arg1 = s.isBig___14513596;
    s.pc = 26; return s.tmp_1;
  case 26:
    r0 = s.retval;
    s.fmt___14513633 = (r0);
    r0 = (s.fmt___14513633 === null);
    s.tmp_0 = r0;
    r0 = pxsim_numops_toBoolDecr(s.tmp_0);
    if (!r0) { step = 14; continue; }
    s.tmp_1 = control_fail__P14512857_mk(s);
    r0 = pxsim_String_.charAt(s.arg0, s.i___14513598);
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
    s.tmp_0 = r0 = s.idx___14513597;
    r0 = (s.tmp_0 + 1);
    s.idx___14513597 = (r0);
    s.tmp_1 = r0 = s.arg2;
    s.tmp_2 = r0 = s.fmt___14513633;
    s.tmp_3 = r0 = s.arg4;
    r0 = pxsim_Array__getAt(s.arg1, s.tmp_0);
    s.tmp_4 = r0;
    r0 = pxsim.BufferMethods.setNumber(s.tmp_1, s.tmp_2, s.tmp_3, s.tmp_4);
    { step = 16; continue; }
  case 15:
    s.tmp_0 = r0 = s.arg1;
    r0 = pxsim.BufferMethods.getNumber(s.arg2, s.fmt___14513633, s.arg4);
    s.tmp_1 = r0;
    r0 = pxsim_Array__push(s.tmp_0, s.tmp_1);
  case 16:
  case 17:
  case 18:
    s.tmp_0 = r0 = s.arg4;
    s.tmp_2 = Buffer_sizeOfNumberFormat__P14513049_mk(s);
    s.tmp_2.arg0 = s.fmt___14513633;
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
    r0 = (s.i___14513598 + 1);
    s.i___14513598 = (r0);
    { step = 1; continue; }
  case 22:
    r0 = s.arg4;
    return leave(s, r0)
  default: oops()
} } }
Buffer___packUnpackCore__P14513048.info = {"start":10393,"length":1537,"line":364,"column":4,"endLine":406,"endColumn":5,"fileName":"buffer.ts","functionName":"__packUnpackCore","argumentNames":["format","nums","buf","isPack","off"]}

function Buffer___packUnpackCore__P14513048_mk(s) {
    checkStack(s.depth);
    return {
        parent: s, fn: Buffer___packUnpackCore__P14513048, depth: s.depth + 1,
        pc: 0, retval: undefined, r0: undefined, overwrittenPC: false, lambdaArgs: null,
  tmp_0: undefined,
  tmp_1: undefined,
  tmp_2: undefined,
  tmp_3: undefined,
  tmp_4: undefined,
  isBig___14513596: undefined,
  idx___14513597: undefined,
  i___14513598: undefined,
  i0___14513611: undefined,
  reps___14513619: undefined,
  fmt___14513633: undefined,
  arg0: undefined,
  arg1: undefined,
  arg2: undefined,
  arg3: undefined,
  arg4: undefined,
} }





function Buffer_sizeOfNumberFormat__P14513049(s) {
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
Buffer_sizeOfNumberFormat__P14513049.info = {"start":12009,"length":856,"line":411,"column":4,"endLine":435,"endColumn":5,"fileName":"buffer.ts","functionName":"sizeOfNumberFormat","argumentNames":["format"]}

function Buffer_sizeOfNumberFormat__P14513049_mk(s) {
    checkStack(s.depth);
    return {
        parent: s, fn: Buffer_sizeOfNumberFormat__P14513049, depth: s.depth + 1,
        pc: 0, retval: undefined, r0: undefined, overwrittenPC: false, lambdaArgs: null,
  tmp_0: undefined,
  arg0: undefined,
} }





function control_fail__P14512857(s) {
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
    s.tmp_0 = console_log__P14512873_mk(s);
    s.tmp_0.arg0 = "Fatal failure: ";
    s.pc = 1; return s.tmp_0;
  case 1:
    r0 = s.retval;
    s.tmp_0 = console_log__P14512873_mk(s);
    s.tmp_0.arg0 = s.arg0;
    s.pc = 2; return s.tmp_0;
  case 2:
    r0 = s.retval;
    r0 = pxsim_pxtrt.panic(108);
    r0 = undefined;
    return leave(s, r0)
  default: oops()
} } }
control_fail__P14512857.info = {"start":1320,"length":132,"line":50,"column":4,"endLine":54,"endColumn":5,"fileName":"control.ts","functionName":"fail","argumentNames":["message"]}

function control_fail__P14512857_mk(s) {
    checkStack(s.depth);
    return {
        parent: s, fn: control_fail__P14512857, depth: s.depth + 1,
        pc: 0, retval: undefined, r0: undefined, overwrittenPC: false, lambdaArgs: null,
  tmp_0: undefined,
  arg0: undefined,
} }





function console_log__P14512873(s) {
let r0 = s.r0, step = s.pc;
s.pc = -1;


while (true) {
if (yieldSteps-- < 0 && maybeYield(s, step, r0)) return null;
switch (step) {
  case 0:

    s.i___14513731 = undefined;
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
    r0 = pxsim_numops_toBoolDecr(globals.listeners___14512872);
    if (!r0) { step = 3; continue; }
    s.i___14513731 = (0);
  case 1:
    s.tmp_1 = r0 = s.i___14513731;
    r0 = pxsim_Array__length(globals.listeners___14512872);
    s.tmp_2 = r0;
    r0 = (s.tmp_1 < s.tmp_2);
    s.tmp_0 = r0;
    r0 = pxsim_numops_toBoolDecr(s.tmp_0);
    if (!r0) { step = 2; continue; }
    s.tmp_3 = lambda_2_mk(s);
    r0 = pxsim_Array__getAt(globals.listeners___14512872, s.i___14513731);
    s.tmp_3.argL = r0;
    s.tmp_3.arg0 = s.arg0;
    setupLambda(s.tmp_3, s.tmp_3.argL);
    s.pc = 6; return s.tmp_3;
  case 6:
    r0 = s.retval;
    r0 = (s.i___14513731 + 1);
    s.i___14513731 = (r0);
    { step = 1; continue; }
  case 2:
  case 3:
  case 4:
    r0 = undefined;
    return leave(s, r0)
  default: oops()
} } }
console_log__P14512873.info = {"start":479,"length":285,"line":20,"column":4,"endLine":28,"endColumn":5,"fileName":"console.ts","functionName":"log","argumentNames":["text"]}

function console_log__P14512873_mk(s) {
    checkStack(s.depth);
    return {
        parent: s, fn: console_log__P14512873, depth: s.depth + 1,
        pc: 0, retval: undefined, r0: undefined, overwrittenPC: false, lambdaArgs: null,
  tmp_0: undefined,
  tmp_1: undefined,
  tmp_2: undefined,
  tmp_3: undefined,
  i___14513731: undefined,
  arg0: undefined,
} }





function Buffer_getFormat__P14513046(s) {
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
Buffer_getFormat__P14513046.info = {"start":9335,"length":928,"line":334,"column":4,"endLine":357,"endColumn":5,"fileName":"buffer.ts","functionName":"getFormat","argumentNames":["pychar","isBig"]}

function Buffer_getFormat__P14513046_mk(s) {
    checkStack(s.depth);
    return {
        parent: s, fn: Buffer_getFormat__P14513046, depth: s.depth + 1,
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





function parseInt__P14512723(s) {
let r0 = s.r0, step = s.pc;
s.pc = -1;


while (true) {
if (yieldSteps-- < 0 && maybeYield(s, step, r0)) return null;
switch (step) {
  case 0:

    s.start___14513785 = undefined;
    s.sign___14513815 = undefined;
    s.output___14513860 = undefined;
    s.hasDigit___14513861 = undefined;
    s.i___14513862 = undefined;
    s.code___14513869 = undefined;
    s.val___14513876 = undefined;
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
    s.start___14513785 = (0);
  case 9:
    s.tmp_1 = r0 = s.start___14513785;
    r0 = pxsim_String_.length(s.arg0);
    s.tmp_2 = r0;
    r0 = (s.tmp_1 < s.tmp_2);
    s.tmp_0 = r0;
    r0 = pxsim_numops_toBool(s.tmp_0);
    if (r0) { step = 10; continue; }
    r0 = s.tmp_0;
    { step = 11; continue; }
  case 10:
    s.tmp_3 = helpers_isWhitespace__P14512749_mk(s);
    r0 = pxsim_String_.charCodeAt(s.arg0, s.start___14513785);
    s.tmp_3.arg0 = r0;
    s.pc = 47; return s.tmp_3;
  case 47:
    r0 = s.retval;
  case 11:
    // jmp value (already in r0)
    s.tmp_4 = r0;
    r0 = pxsim_numops_toBoolDecr(s.tmp_4);
    if (!r0) { step = 12; continue; }
    r0 = (s.start___14513785 + 1);
    s.start___14513785 = (r0);
    { step = 9; continue; }
  case 12:
    s.tmp_1 = r0 = s.start___14513785;
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
    s.sign___14513815 = (1);
    r0 = pxsim_String_.charAt(s.arg0, s.start___14513785);
    s.tmp_0 = r0;
    r0 = pxsim_pxtcore.switch_eq("-", s.tmp_0);
    if (r0) { step = 15; continue; }
    r0 = pxsim_pxtcore.switch_eq("+", s.tmp_0);
    if (r0) { step = 16; continue; }
    r0 = s.tmp_0;
    { step = 17; continue; }
  case 15:
    s.sign___14513815 = (-1);
  case 16:
    r0 = (s.start___14513785 + 1);
    s.start___14513785 = (r0);
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
    r0 = pxsim_String_.charAt(s.arg0, s.start___14513785);
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
    r0 = (s.start___14513785 + 1);
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
    r0 = (s.start___14513785 + 1);
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
    r0 = (s.start___14513785 + 2);
    s.start___14513785 = (r0);
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
    s.output___14513860 = (0);
    s.hasDigit___14513861 = (false);
    s.i___14513862 = (s.start___14513785);
  case 30:
    s.tmp_1 = r0 = s.i___14513862;
    r0 = pxsim_String_.length(s.arg0);
    s.tmp_2 = r0;
    r0 = (s.tmp_1 < s.tmp_2);
    s.tmp_0 = r0;
    r0 = pxsim_numops_toBoolDecr(s.tmp_0);
    if (!r0) { step = 45; continue; }
    r0 = pxsim_String_.charCodeAt(s.arg0, s.i___14513862);
    s.tmp_3 = r0;
    r0 = (s.tmp_3 | 32);
    s.code___14513869 = (r0);
    s.val___14513876 = (undefined);
    r0 = (s.code___14513869 >= 48);
    s.tmp_0 = r0;
    r0 = pxsim_numops_toBool(s.tmp_0);
    if (r0) { step = 31; continue; }
    r0 = s.tmp_0;
    { step = 32; continue; }
  case 31:
    r0 = (s.code___14513869 < 58);
  case 32:
    // jmp value (already in r0)
    s.tmp_1 = r0;
    r0 = pxsim_numops_toBoolDecr(s.tmp_1);
    if (!r0) { step = 33; continue; }
    r0 = (s.code___14513869 - 48);
    s.val___14513876 = (r0);
    { step = 38; continue; }
  case 33:
    r0 = (s.code___14513869 >= 97);
    s.tmp_0 = r0;
    r0 = pxsim_numops_toBool(s.tmp_0);
    if (r0) { step = 34; continue; }
    r0 = s.tmp_0;
    { step = 35; continue; }
  case 34:
    r0 = (s.code___14513869 < 123);
  case 35:
    // jmp value (already in r0)
    s.tmp_1 = r0;
    r0 = pxsim_numops_toBoolDecr(s.tmp_1);
    if (!r0) { step = 36; continue; }
    r0 = (10 + s.code___14513869);
    s.tmp_2 = r0;
    r0 = (s.tmp_2 - 97);
    s.val___14513876 = (r0);
  case 36:
  case 37:
  case 38:
    r0 = (s.val___14513876 == undefined);
    s.tmp_0 = r0;
    r0 = pxsim_numops_toBool(s.tmp_0);
    if (!r0) { step = 39; continue; }
    r0 = s.tmp_0;
    { step = 40; continue; }
  case 39:
    r0 = (s.val___14513876 >= s.arg1);
  case 40:
    // jmp value (already in r0)
    s.tmp_1 = r0;
    r0 = pxsim_numops_toBoolDecr(s.tmp_1);
    if (!r0) { step = 43; continue; }
    r0 = pxsim_numops_toBoolDecr(s.hasDigit___14513861);
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
    s.hasDigit___14513861 = (true);
    r0 = (s.output___14513860 * s.arg1);
    s.tmp_0 = r0;
    r0 = (s.tmp_0 + s.val___14513876);
    s.output___14513860 = (r0);
    r0 = (s.i___14513862 + 1);
    s.i___14513862 = (r0);
    { step = 30; continue; }
  case 45:
    r0 = (s.sign___14513815 * s.output___14513860);
  case 46:
    return leave(s, r0)
  default: oops()
} } }
parseInt__P14512723.info = {"start":1064,"length":1690,"line":44,"column":0,"endLine":103,"endColumn":1,"fileName":"pxt-helpers.ts","functionName":"parseInt","argumentNames":["text","radix"]}

function parseInt__P14512723_mk(s) {
    checkStack(s.depth);
    return {
        parent: s, fn: parseInt__P14512723, depth: s.depth + 1,
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
  start___14513785: undefined,
  sign___14513815: undefined,
  output___14513860: undefined,
  hasDigit___14513861: undefined,
  i___14513862: undefined,
  code___14513869: undefined,
  val___14513876: undefined,
  arg0: undefined,
  arg1: undefined,
} }





function helpers_isWhitespace__P14512749(s) {
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
helpers_isWhitespace__P14512749.info = {"start":13875,"length":674,"line":476,"column":4,"endLine":493,"endColumn":5,"fileName":"pxt-helpers.ts","functionName":"isWhitespace","argumentNames":["c"]}

function helpers_isWhitespace__P14512749_mk(s) {
    checkStack(s.depth);
    return {
        parent: s, fn: helpers_isWhitespace__P14512749, depth: s.depth + 1,
        pc: 0, retval: undefined, r0: undefined, overwrittenPC: false, lambdaArgs: null,
  tmp_0: undefined,
  arg0: undefined,
} }





function Buffer_isDigit__P14513047(s) {
let r0 = s.r0, step = s.pc;
s.pc = -1;


while (true) {
if (yieldSteps-- < 0 && maybeYield(s, step, r0)) return null;
switch (step) {
  case 0:

    s.code___14513933 = undefined;
    if (s.lambdaArgs) {
      s.arg0 = (s.lambdaArgs[0]);
      s.lambdaArgs = null;
    }
    r0 = pxsim_String_.charCodeAt(s.arg0, 0);
    s.code___14513933 = (r0);
    r0 = (48 <= s.code___14513933);
    s.tmp_0 = r0;
    r0 = pxsim_numops_toBool(s.tmp_0);
    if (r0) { step = 1; continue; }
    r0 = s.tmp_0;
    { step = 2; continue; }
  case 1:
    r0 = (s.code___14513933 <= 57);
  case 2:
    // jmp value (already in r0)
    s.tmp_1 = r0;
    r0 = s.tmp_1;
    return leave(s, r0)
  default: oops()
} } }
Buffer_isDigit__P14513047.info = {"start":10269,"length":118,"line":359,"column":4,"endLine":362,"endColumn":5,"fileName":"buffer.ts","functionName":"isDigit","argumentNames":["ch"]}

function Buffer_isDigit__P14513047_mk(s) {
    checkStack(s.depth);
    return {
        parent: s, fn: Buffer_isDigit__P14513047, depth: s.depth + 1,
        pc: 0, retval: undefined, r0: undefined, overwrittenPC: false, lambdaArgs: null,
  tmp_0: undefined,
  tmp_1: undefined,
  code___14513933: undefined,
  arg0: undefined,
} }





function Buffer_packedSize__P14513044(s) {
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
    s.tmp_0 = Buffer___packUnpackCore__P14513048_mk(s);
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
Buffer_packedSize__P14513044.info = {"start":9034,"length":108,"line":324,"column":4,"endLine":326,"endColumn":5,"fileName":"buffer.ts","functionName":"packedSize","argumentNames":["format"]}

function Buffer_packedSize__P14513044_mk(s) {
    checkStack(s.depth);
    return {
        parent: s, fn: Buffer_packedSize__P14513044, depth: s.depth + 1,
        pc: 0, retval: undefined, r0: undefined, overwrittenPC: false, lambdaArgs: null,
  tmp_0: undefined,
  arg0: undefined,
} }





function check__P14513403(s) {
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
    s.tmp_0 = control_assert__P14512856_mk(s);
    s.tmp_0.arg0 = s.arg0;
    s.tmp_0.arg1 = 108;
    s.pc = 1; return s.tmp_0;
  case 1:
    r0 = s.retval;
    r0 = undefined;
    return leave(s, r0)
  default: oops()
} } }
check__P14513403.info = {"start":115,"length":58,"line":9,"column":0,"endLine":9,"endColumn":58,"fileName":"test.ts","functionName":"check","argumentNames":["cond"]}

function check__P14513403_mk(s) {
    checkStack(s.depth);
    return {
        parent: s, fn: check__P14513403, depth: s.depth + 1,
        pc: 0, retval: undefined, r0: undefined, overwrittenPC: false, lambdaArgs: null,
  tmp_0: undefined,
  arg0: undefined,
} }





function control_assert__P14512856(s) {
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
    s.tmp_2 = console_log__P14512873_mk(s);
    s.tmp_2.arg0 = "ASSERTION FAILED";
    s.pc = 5; return s.tmp_2;
  case 5:
    r0 = s.retval;
    r0 = (s.arg1 != null);
    s.tmp_0 = r0;
    r0 = pxsim_numops_toBoolDecr(s.tmp_0);
    if (!r0) { step = 1; continue; }
    s.tmp_1 = console_log__P14512873_mk(s);
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
control_assert__P14512856.info = {"start":1070,"length":244,"line":40,"column":4,"endLine":48,"endColumn":5,"fileName":"control.ts","functionName":"assert","argumentNames":["condition","msg"]}

function control_assert__P14512856_mk(s) {
    checkStack(s.depth);
    return {
        parent: s, fn: control_assert__P14512856, depth: s.depth + 1,
        pc: 0, retval: undefined, r0: undefined, overwrittenPC: false, lambdaArgs: null,
  tmp_0: undefined,
  tmp_1: undefined,
  tmp_2: undefined,
  arg0: undefined,
  arg1: undefined,
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


const breakpoints = setupDebugger(1, ["_intervals___14512861","CLEAR_BBOARD_TX_BUFFER___14513107","CLEAR_BBOARD_RX_BUFFER___14513119","READ_TX_BUFFER_SIZE___14513129","EXECUTE_BBOARD_COMMAND___14513139","READ_BBOARD_TX_BUFFER___14513149","MQTTMessageObject___14513353","mqttMessageList___14513355","plus___14513391","i___14513386","f___14513388","minus___14513395","r___14513398","ri___14513401","listeners___14512872"])

return _main___P14512558
})
