// https://www.sparkfun.com/datasheets/LCD/HD44780.pdf
// https://www.hobbyelectronica.nl/product/lcd1602-display-microbit/
let RS = DigitalPin.P8
let EN = DigitalPin.P2
let D4 = DigitalPin.P16
let D5 = DigitalPin.P15
let D6 = DigitalPin.P14
let D7 = DigitalPin.P13

function setData (d7: number, d6: number, d5: number, d4: number) {
    pins.digitalWritePin(EN, 1)
    pins.digitalWritePin(D7, d7)
    pins.digitalWritePin(D6, d6)
    pins.digitalWritePin(D5, d5)
    pins.digitalWritePin(D4, d4)
    control.waitMicros(1)
    pins.digitalWritePin(EN, 0)
}

function init() {
    pins.digitalWritePin(RS, 0)
    control.waitMicros(100000)
    setData(0, 0, 1, 1)
    control.waitMicros(4100)

    setData(0, 0, 1, 1)
    control.waitMicros(100)

    setData(0, 0, 1, 1)
    control.waitMicros(100)

    setData(0, 0, 1, 0) // 4bit
    control.waitMicros(100)

    setData(0, 0, 1, 0)
    setData(1, 0, 0, 0) // 2line, 5x8
    control.waitMicros(53)

    setData(0, 0, 0, 0)
    setData(1, 0, 0, 0)
    control.waitMicros(53)

    setData(0, 0, 0, 0)
    setData(0, 0, 0, 1)
    control.waitMicros(3000)

    setData(0, 0, 0, 0)
    setData(0, 1, 1, 0)
    control.waitMicros(53)

    led.plot(0, 0)

    setData(0, 0, 0, 0)
    setData(1, 1, 1, 0) // 1, disp, cursor, blink
    control.waitMicros(53)
    led.plot(1, 0)
}

function writeChar(d7: number, d6: number, d5: number, d4: number, d3: number, d2: number, d1: number, d0: number) {
    pins.digitalWritePin(RS, 1)
    setData(d7, d6, d5, d4)
    setData(d3, d2, d1, d0)
    pins.digitalWritePin(RS, 0)
    control.waitMicros(53)
}

init()
// advance cursor
setData(0, 0, 0, 0)
setData(0, 1, 1, 0)
control.waitMicros(53)

// Hello, world!
writeChar(0, 1, 0, 0, 1, 0, 0, 0)
writeChar(0, 1, 1, 0, 0, 1, 0, 1)
writeChar(0, 1, 1, 0, 1, 1, 0, 0)
writeChar(0, 1, 1, 0, 1, 1, 0, 0)
writeChar(0, 1, 1, 0, 1, 1, 1, 1)
writeChar(0, 0, 1, 0, 1, 1, 0, 0)
writeChar(0, 0, 1, 0, 0, 0, 0, 0)
writeChar(0, 1, 1, 1, 0, 1, 1, 1)
writeChar(0, 1, 1, 0, 1, 1, 1, 1)
writeChar(0, 1, 1, 1, 0, 0, 1, 0)
writeChar(0, 1, 1, 0, 1, 1, 0, 0)
writeChar(0, 1, 1, 0, 0, 1, 0, 0)
writeChar(0, 0, 1, 0, 0, 0, 0, 1)

pins.digitalWritePin(EN, 1)
led.plot(2, 0)
basic.forever(function () {
	
})
