// total=4800 new=55.77% cached=0.00% other=44.23%
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


function _main___P14528342(s) {
let r0 = s.r0, step = s.pc;
s.pc = -1;


while (true) {
if (yieldSteps-- < 0 && maybeYield(s, step, r0)) return null;
switch (step) {
  case 0:

    globals._intervals___14528645 = (undefined);
    r0 = pxsim.pins.createBuffer(1);
    globals.CLEAR_BBOARD_TX_BUFFER___14528891 = (r0);
    r0 = pxsim.BufferMethods.setNumber(globals.CLEAR_BBOARD_TX_BUFFER___14528891, 2, 0, 1);
    r0 = pxsim.pins.createBuffer(1);
    globals.CLEAR_BBOARD_RX_BUFFER___14528903 = (r0);
    r0 = pxsim.BufferMethods.setNumber(globals.CLEAR_BBOARD_RX_BUFFER___14528903, 2, 0, 0);
    r0 = pxsim.pins.createBuffer(1);
    globals.READ_TX_BUFFER_SIZE___14528913 = (r0);
    r0 = pxsim.BufferMethods.setNumber(globals.READ_TX_BUFFER_SIZE___14528913, 2, 0, 3);
    r0 = pxsim.pins.createBuffer(1);
    globals.EXECUTE_BBOARD_COMMAND___14528923 = (r0);
    r0 = pxsim.BufferMethods.setNumber(globals.EXECUTE_BBOARD_COMMAND___14528923, 2, 0, 7);
    r0 = pxsim.pins.createBuffer(1);
    globals.READ_BBOARD_TX_BUFFER___14528933 = (r0);
    r0 = pxsim.BufferMethods.setNumber(globals.READ_BBOARD_TX_BUFFER___14528933, 2, 0, 2);
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
    globals.MQTTMessageObject___14529137 = (s.tmp_0);
    r0 = pxsim_Array__mk();
    s.tmp_0 = r0;
    r0 = pxsim_Array__push(s.tmp_0, globals.MQTTMessageObject___14529137);
    globals.mqttMessageList___14529139 = (s.tmp_0);
    r0 = pxsim_Array_.pop(globals.mqttMessageList___14529139);
    r0 = undefined;
    return leave(s, r0)
  default: oops()
} } }
_main___P14528342.info = {"start":0,"length":0,"line":0,"column":0,"endLine":0,"endColumn":0,"fileName":"radio-broadcast.ts","functionName":"<main>","argumentNames":[]}
_main___P14528342.continuations = [  ]

function _main___P14528342_mk(s) {
    checkStack(s.depth);
    return {
        parent: s, fn: _main___P14528342, depth: s.depth + 1,
        pc: 0, retval: undefined, r0: undefined, overwrittenPC: false, lambdaArgs: null,
  tmp_0: undefined,
  tmp_1: undefined,
  tmp_2: undefined,
  tmp_3: undefined,
  tmp_4: undefined,
  tmp_5: undefined,
} }





const breakpoints = setupDebugger(1, [])

return _main___P14528342
})
