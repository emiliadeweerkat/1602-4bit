# Micro-bit extension for the 1602A display, drive by an HD44780, using 4 bits
This extension was mostly copied from https://github.com/makecode-extensions/i2cLCD1602,
but uses direct drive, instead of I2C.

The shield used [this](https://www.elecrow.com/wiki/index.php?title=LCD1602_for_microbit_shield) one by elecrow.
The wiki has no information on how to use the screen, just a hex file (which doesn't work for Micro-bit v2).

It has the following pins connected:

| Display | Microbit |
|---------|----------|
| RS      | P8       |
| EN      | P2       |
| R/W     | GND      |
| D4      | P16      |
| D5      | P15      |
| D6      | P14      |
| D7      | P13      |

