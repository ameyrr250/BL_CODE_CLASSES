input.onButtonPressed(Button.A, function () {
    LCDSettings2.lcd_writeString("100", lineNumber.one)
})
input.onButtonPressed(Button.B, function () {
    LCDSettings2.lcd_writeString("500", lineNumber.one)
})
let LCDSettings2: LCD_Mini.LCDSettings = null
LCDSettings2 = LCD_Mini.createLCDSettings(BoardID.zero, ClickID.A)
LCDSettings2.lcd_writeString("Hello", lineNumber.one)
basic.pause(1000)
