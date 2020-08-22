basic.pause(1000)
let Test = Test_Module.createTestSettings(clickBoardID.one, clickBoardID.two, clickBoardID.three)
basic.forever(function () {
    Test.TestForce()
})
