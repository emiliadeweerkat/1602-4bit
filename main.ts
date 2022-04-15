// https://www.sparkfun.com/datasheets/LCD/HD44780.pdf
// https://www.hobbyelectronica.nl/product/lcd1602-display-microbit/
// https://github.com/makecode-extensions/i2cLCD1602

//% weight=20 color=#0fbc11 icon="▀"
namespace LCD1602A_4bit {
    let RS = DigitalPin.P8
    let EN = DigitalPin.P2
    let D4 = DigitalPin.P16
    let D5 = DigitalPin.P15
    let D6 = DigitalPin.P14
    let D7 = DigitalPin.P13

    // write to the data bus
    function cmd8 (d: number) {
        cmd4(d >> 4)
        cmd4(d)
    }

    function cmd4 (d: number) {
        pins.digitalWritePin(EN, 1)
        pins.digitalWritePin(D7, (d & (1 << 3)) ? 1:0)
        pins.digitalWritePin(D6, (d & (1 << 2)) ? 1:0)
        pins.digitalWritePin(D5, (d & (1 << 1)) ? 1:0)
        pins.digitalWritePin(D4, (d & (1 << 0)) ? 1:0)
        control.waitMicros(1)
        pins.digitalWritePin(EN, 0)
        control.waitMicros(1)
    }

    /**
     * initialise LCD, set cursor on/off, blink on/off
     * @param cursor is a bool to enable the cursor
     * @param blink is a bool to enable blinking above the cursor
     */
    //% blockId="LCD1602A_4BIT_INIT" block="Start LCD met cursor (aan=1, uit=0) en knipper (aan=1, uit=0)"
    //% weight=100 blockGap=8
    export function init(cursor: number, blink: number) {
        pins.digitalWritePin(RS, 0)
        control.waitMicros(100000)
        cmd4(0b0011)
        // cmd(0, 0, 1, 1)
        control.waitMicros(4100)

        cmd4(0b0011)
        // cmd(0, 0, 1, 1)
        control.waitMicros(100)

        cmd4(0b0011)
        // cmd(0, 0, 1, 1)
        control.waitMicros(100)

        cmd4(0b0010) // 4bit
        // cmd(0, 0, 1, 0) // 4bit
        control.waitMicros(100)

        cmd8(0b00101000)
        // cmd(0, 0, 1, 0)
        // cmd(1, 0, 0, 0) // 2line, 5x8
        control.waitMicros(53)

        cmd8(0b00001000)
        // cmd(0, 0, 0, 0)
        // cmd(1, 0, 0, 0)
        control.waitMicros(53)

        cmd8(0b00000001)
        // cmd(0, 0, 0, 0)
        // cmd(0, 0, 0, 1)
        control.waitMicros(3000)

        cmd8(0b00000110)
        // cmd(0, 0, 0, 0)
        // cmd(0, 1, 1, 0)
        control.waitMicros(53)

        cmd8(0b00001100 + blink + (cursor << 1))
        // cmd(0, 0, 0, 0)
        // cmd(1, 1, cursor, blink) // 1, display on, cursor on, blink on
        control.waitMicros(53)
    }

    function dat(d: number) {
        pins.digitalWritePin(RS, 1)
        cmd8(d)
        pins.digitalWritePin(RS, 0)
        control.waitMicros(53)
    }

    /**
     * show a number in LCD at given position
     * @param n is number will be show, eg: 10, 100, 200
     * @param x is LCD column position, eg: 0
     * @param y is LCD row position, eg: 0
     */
    //% blockId="I2C_LCD1620_SHOW_NUMBER" block="show number %n|at x %x|y %y"
    //% weight=90 blockGap=8
    //% x.min=0 x.max=15
    //% y.min=0 y.max=1
    export function ShowNumber(n: number, x: number, y: number): void {
        let s = n.toString()
        ShowString(s, x, y)
    }

    /**
     * show a string in LCD at given position
     * @param s is string will be show, eg: "Hello"
     * @param x is LCD column position, [0 - 15], eg: 0
     * @param y is LCD row position, [0 - 1], eg: 0
     */
    //% blockId="I2C_LCD1620_SHOW_STRING" block="show string %s|at x %x|y %y"
    //% weight=90 blockGap=8
    //% x.min=0 x.max=15
    //% y.min=0 y.max=1
    export function ShowString(s: string, x: number, y: number): void {
        let a: number

        if (y > 0)
            a = 0xC0
        else
            a = 0x80
        a += x
        cmd8(a)

        for (let i = 0; i < s.length; i++) {
            dat(s.charCodeAt(i))
        }
    }

    /**
     * turn on LCD
     */
    //% blockId="I2C_LCD1620_ON" block="turn on LCD"
    //% weight=81 blockGap=8
    export function on(): void {
        cmd8(0x0C)
    }

    /**
     * turn off LCD
     */
    //% blockId="I2C_LCD1620_OFF" block="turn off LCD"
    //% weight=80 blockGap=8
    export function off(): void {
        cmd8(0x08)
    }

    /**
     * clear all display content
     */
    //% blockId="I2C_LCD1620_CLEAR" block="clear LCD"
    //% weight=85 blockGap=8
    export function clear(): void {
        cmd8(0x01)
    }

    /**
     * shift left
     */
    //% blockId="I2C_LCD1620_SHL" block="Shift Left"
    //% weight=61 blockGap=8
    export function shl(): void {
        cmd8(0x18)
    }

    /**
     * shift right
     */
    //% blockId="I2C_LCD1620_SHR" block="Shift Right"
    //% weight=60 blockGap=8
    export function shr(): void {
        cmd8(0x1C)
    }
}
