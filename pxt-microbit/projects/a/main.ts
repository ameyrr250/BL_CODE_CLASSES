let Force = Force_Click.createForceSettings(clickBoardID.zero, clickBoardSlot.B)
let LCDSettings2 = LCD_Mini.createLCDSettings(clickBoardID.zero, clickBoardSlot.A)
LCDSettings2.lcd_clearDisplay()
basic.forever(function () {
    LCDSettings2.lcd_writeString(Force.forceclickstring(), lineNumber.one)
})
