# homebridge-remote-ledstrip-plugin

[![npm version](https://badge.fury.io/js/homebridge-remote-ledstrip-plugin.svg)](https://badge.fury.io/js/homebridge-remote-ledstrip-plugin)
![npm](https://img.shields.io/npm/dw/homebridge-remote-ledstrip-plugin)

[Raspberry Pi](https://www.raspberrypi.org) GPIO based LED Strip plugin for [Homebridge](https://github.com/nfarina/homebridge)

Originally inspired by [GiniaE/homebridge-gpio-ledstrip](https://github.com/GiniaE/homebridge-gpio-ledstrip) and [manfredipist/homebridge-gpio-rgb-ledstrip](https://github.com/manfredipist/homebridge-gpio-rgb-ledstrip) and base plugin taken from [suhajda3/homebridge-rgb-ledstrip](https://github.com/suhajda3/homebridge-rgb-ledstrip)

# Installation

1.	[Install Homebridge](https://github.com/homebridge/homebridge/wiki) on your host 
2.	Install this plugin `npm install -g homebridge-remote-ledstrip-plugin` (on the host)
3.	Run `sudo pigpiod` after installing [the pigpio library](https://abyz.me.uk/rpi/pigpio/) and Python (on slave)
4. Optionally install [Homebridge Config UI X](https://github.com/oznu/homebridge-config-ui-x)

# Hardware

Follow [David Ordnung's tutorial](https://dordnung.de/raspberrypi-ledstrip/) on how to connect your LED Strip to the Rapsberry Pi's GPIO pins.

# Configuration

Configuration sample:

 ```
    "accessories": [
      {
        "accessory": "RgbLedStrip",
        "name": "Bedroom LED Strip",
        "rPin": 17,
        "gPin": 22,
        "bPin": 24,
        "led-slave": "192.168.178.38"
      }
    ]
```

Fields:

* "accessory": Must always be "RgbLedStrip" (required)
* "name": Can be anything (required)
* "rPin": GPIO pin that is used to set red value (required)
* "gPin": GPIO pin that is used to set green value (required)
* "bPin": GPIO pin that is used to set blue value (required)
* "led-slave": IP of the client directly controlling the strip (required)

## Contributing

Feel free to open an issue (or even better, send a Pull Request) to contribute. Contributions are always welcomed! 😄