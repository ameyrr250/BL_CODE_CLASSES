let LCDSettings2 = LCD_Mini.createLCDSettings(clickBoardID.one, clickBoardSlot.A)
LCDSettings2.lcd_clearDisplay()
basic.forever(function () {
    LCDSettings2.lcd_writeString(" HELLO", lineNumber.one)
})
