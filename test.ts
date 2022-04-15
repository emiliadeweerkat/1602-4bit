let item = 0
LCD1602A_4bit.LcdInit(0)
LCD1602A_4bit.ShowString("Hello", 0, 0)
basic.forever(() => {
    item += 1
    LCD1602A_4bit.ShowNumber(item, 0, 1)
    basic.pause(1000)
})