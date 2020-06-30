let LCDSettings = LCD_Mini.createLCDSettings()
LCDSettings.lcd_clearDisplay(clickBoardID.two)
LCDSettings.lcd_writeString(" Hello", lineNumber.one, clickBoardID.two)
basic.forever(function () {
    basic.pause(500)
})
