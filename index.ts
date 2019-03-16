
/// <reference types="color-convert" />
import * as converter from 'color-convert'; 
import GPIORGBLEDStripGammaCorrectedAccessory from "./lib/GPIORGBLEDStripGammaCorrectedAccessory"; 
import {Gpio} from "pigpio"; 

module.exports = function (homebridge) {
  var exportTypes = {
    Accessory: homebridge.hap.Accessory,
    Service: homebridge.hap.Service,
    Characteristic: homebridge.hap.Characteristic,
    uuid: homebridge.hap.uuid,
  };

   GPIORGBLEDStripGammaCorrectedAccessory.init(exportTypes);

  homebridge.registerAccessory("homebridge-gpio-ledstrip-gamma-corrected", "GPIORGBLEDStripGammaCorrected", GPIORGBLEDStripGammaCorrectedAccessory);
};
