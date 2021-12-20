"use strict";

var Service, Characteristic;

const child_process = require('child_process');
const converter = require('color-convert');
const path = require('path');
const fs = require('fs');

module.exports = function(homebridge) {
	Service = homebridge.hap.Service;
	Characteristic = homebridge.hap.Characteristic;

	homebridge.registerAccessory('homebridge-rgb-ledstrip', 'RgbLedStrip', RgbLedStripAccessory);
}

function RgbLedStripAccessory(log, config) {
  this.log      = log;
  this.name     = config['name'];

  this.helper = null;
  this.helperPath = path.join(__dirname, 'pwmhelper.py');

  this.rPin     = config['rPin'];
  this.gPin     = config['gPin'];
  this.bPin     = config['bPin'];

  this.enabled = true ;

  try {
    if (!this.rPin)
      throw new Error("rPin not set!")
    if (!this.gPin)
      throw new Error("gPin not set!")
    if (!this.bPin)
      throw new Error("bPin not set!")
  } catch (err) {
    this.log("An error has been thrown! " + err);
    this.log("homebridge-rgb-ledstrip won't work until you fix this problem");
    this.enabled = false;
  }

}

RgbLedStripAccessory.prototype = {

  getServices : function(){

    if(this.enabled){
      let informationService = new Service.AccessoryInformation();

      informationService
      .setCharacteristic(Characteristic.Manufacturer, 'misi')
      .setCharacteristic(Characteristic.Model, 'RGB-LedStrip')
      .setCharacteristic(Characteristic.SerialNumber, '06-06-00');

      let rgbLedStripService = new Service.Lightbulb(this.name);

      rgbLedStripService
          .getCharacteristic(Characteristic.On)
          .on('change',this.toggleState.bind(this));

      rgbLedStripService
          .addCharacteristic(new Characteristic.Brightness())
          .on('change',this.toggleState.bind(this));

      rgbLedStripService
          .addCharacteristic(new Characteristic.Hue())
          .on('change',this.toggleState.bind(this));

      rgbLedStripService
          .addCharacteristic(new Characteristic.Saturation())
          .on('change',this.toggleState.bind(this));

      this.informationService = informationService;
      this.rgbLedStripService = rgbLedStripService;

      this.log("RgbLedStrip has been successfully initialized!");

      return [informationService, rgbLedStripService];
    }else{
      this.log("RgbLedStrip has not been initialized, please check your logs.");
      return [];
    }

  },

  isOn : function() {
      return this.rgbLedStripService.getCharacteristic(Characteristic.On).value;
  },

  getBrightness : function(){
    return this.rgbLedStripService.getCharacteristic(Characteristic.Brightness).value;
  },

  getHue : function(){
    return this.rgbLedStripService.getCharacteristic(Characteristic.Hue).value;
  },

  getSaturation : function(){
    return this.rgbLedStripService.getCharacteristic(Characteristic.Saturation).value;
  },

  toggleState : function()
  {
    if(this.enabled){
      if(!this.isOn())
      {
          this.updateRGB(0,0,0);
          return;
      }

      var brightness = this.getBrightness();
      if(brightness!=0){
          var rgb = converter.hsv.rgb([this.getHue(), this.getSaturation(), brightness]);
          this.updateRGB(rgb[0], rgb[1], rgb[2]);
      }else{
          this.updateRGB(0,0,0);
      }
    }
  },

  updateRGB : function(red, green, blue)
  {
      if (this.helper) {
          this.helper.kill();
          // TODO: more cleanup needed?
      }

      this.helper = child_process.spawn('python', ['-u', this.helperPath, this.rPin, this.gPin, this.bPin, red, green, blue]);

      this.helper.stderr.on('data', (err) => {
          this.log("Couldn't set RGB values: $err");
          throw new Error(`pwmhelper error: ${err}`);
      });
  
      this.log("Setting RGB values to: Red: "+red + " Green: "+green+ " Blue: "+blue);
  }
}
