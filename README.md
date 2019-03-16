# homebridge-gpio-ledstrip-gamma-corrected
[RPi](https://www.raspberrypi.org) GPIO based LED Strip plugin for [Homebridge](https://github.com/nfarina/homebridge)

Forked from [GiniaE/homebridge-gpio-ledstrip](https://github.com/GiniaE/homebridge-gpio-ledstrip) and added gamma correction as a configurable parameter, to make color representation more accurate.

# Installation

1. Install homebridge using: `npm install -g homebridge`
2. Install this plugin using: `npm install -g homebridge-gpio-ledstrip-gamma-corrected`
3. Update your configuration file. See sample config.json snippet below. 

# Configuration

## Configuration sample

 ```
    "accessories": [
      {
        "accessory": "GPIORGBLEDStripGammaCorrected",
        "name": "Kitchen Cabinet Strip",
        "redPin": 22,
        "greenPin": 27,
        "bluePin": 17,
        "gamma": 2.8
      }
    ]
```

## Fields

* `"accessory"`: Must always be "GPIORGBLEDStripGammaCorrected" (required)
* `"name"`: Can be anything (required)
* `"redPin"`: GPIO pin that is used to set red value (required)
* `"greenPin"`: GPIO pin that is used to set green value (required)
* `"bluePin"`: GPIO pin that is used to set blue value (required)
* `"gamma"`: Gamma correction factor to apply. (optional, defaults to `2.8`)

# Gamma correction

The PWM driven RGB LED strip will adjust its brightness linearly in relation to the PWM duty cycle. For example, if you output 100% duty cycle PWM to the red pin and 50% to the green pin, you'd expect to see orange but you'll instead see yellow. The reason for that, is that while the LEDs are linear; the human eye perception is non-linear and follows an exponential curve:

<center><img src="https://cdn-learn.adafruit.com/assets/assets/000/019/252/medium800/components_uncorrected.png?1409276300" width="50%" height="50%"/></center>

So the trick here is to apply an inverse of this curve and that's called "gamma correction":

<center><img src="https://cdn-learn.adafruit.com/assets/assets/000/019/254/medium800/components_corrected.png?1409276575" width="50%" height="50%"/></center>

Image credit and more info at [Adafruit](https://learn.adafruit.com/led-tricks-gamma-correction/the-issue).

## Implementation

After conversion from HSV to RGB colorspace, the following snippet is applied to each individual RGB color value:

> `out = Math.floor(Math.pow(in / 255, gamma) * 255 + 0.5)`

This will convert a color value `in` in the `0..255` range to another color value `out` also in the `0..255` range that follows an exponential curve.

I found `2.8` to be a good `gamma` factor for my specific RGB strip. For reference CRT monitors are usually corrected to `2.2` and Mac LCD displays are often corrected to `1.8`. Feel free to experiment with different values to find the most accurate color representation.
