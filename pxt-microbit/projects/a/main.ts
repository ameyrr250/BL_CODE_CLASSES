input.onButtonPressed(Button.A, function () {
    basic.showNumber(Button_G2.getSwitch())
})
input.onButtonPressed(Button.AB, function () {
    AAAA += 1
    if (AAAA % 2 == 0) {
        Button_G2.setLight(Button_G.Light.On)
    } else {
        Button_G2.setLight(Button_G.Light.Off)
    }
})
input.onButtonPressed(Button.B, function () {
    Button_G2.setLightPWM(10)
})
let AAAA = 0
let Button_G2: Button_G.Button_G = null
Button_G2 = Button_G.createButton_G(BoardID.zero, ClickID.A)
Button_G2.setLight(Button_G.Light.On)
AAAA = 0
