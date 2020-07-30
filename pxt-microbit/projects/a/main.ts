let LCDSettings22: LCD_Mini.LCDSettings = null
let LCDSettings2 = LCD_Mini.createLCDSettings(clickBoardID.one)
LCDSettings2.lcd_writeString(" Hello", lineNumber.one)
LCDSettings2.lcd_clearDisplay(clickBoardID.one)
basic.forever(function () {
    LCDSettings22 = LCD_Mini.createLCDSettings(clickBoardID.two)
    LCDSettings2.lcd_writeString(" Hi", lineNumber.one)
})
