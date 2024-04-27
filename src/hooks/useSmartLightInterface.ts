import * as React from "react";
export interface SmartLight {
  connect: () => void;
  isConnected: boolean;
  setRainbow: () => void;
  setFill: () => void;
  setChase: () => void;
  runGcode: () => void;
  runCommand: (command: string) => void;
}

// source: http://stackoverflow.com/a/11058858
function str2ab(str: string) {
  var buf = new ArrayBuffer(str.length * 2); // 2 bytes for each char
  var bufView = new Uint16Array(buf);
  for (var i = 0, strLen = str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return buf;
}

export const useSmartLightInterface = (): SmartLight => {
  const [isConnected, setIsConnected] = React.useState(false);
  const [themeCharacteristic, setThemeCharacteristic] =
    React.useState<BluetoothRemoteGATTCharacteristic | null>(null);

  const bluetoothOptions = {
    acceptAllDevices: true,
    optionalServices: ["6e400001-b5a3-f393-e0a9-e50e24dcca9e"],
  };

  const connect = async () => {
    const device = await navigator.bluetooth.requestDevice(bluetoothOptions);
    if (!device) {
      console.error("Failed to connect to device.");
      return;
    }
    const server = await device.gatt?.connect();

    if (!server) {
      console.error("Failed to connect to server");
      return;
    }
    // Philips Hue Light Control Service
    const service = await server.getPrimaryService(
      "6e400001-b5a3-f393-e0a9-e50e24dcca9e"
    );

    if (!service) {
      console.error("Failed to connect to service.");
      return;
    }

    const themeChar = await service.getCharacteristic(
      "6e400002-b5a3-f393-e0a9-e50e24dcca9e" // Philips Hue Light On/Off Toggle
    );

    if (!themeChar) {
      console.error("Failed to get color characteristic.");
      return;
    }
    setThemeCharacteristic(themeChar);

    setIsConnected(true);
  };

  const setRainbow = () => {
    themeCharacteristic?.writeValue(str2ab("Rainbow"));
  };

  const setFill = () => {
    themeCharacteristic?.writeValue(str2ab("Fill"));
  };

  const setChase = () => {
    themeCharacteristic?.writeValue(str2ab("Chase"));
  };

  const runGcode = () => {
    themeCharacteristic?.writeValue(str2ab("runGcode"));
  };

  const runCommand = (command: string) => {
    themeCharacteristic?.writeValue(str2ab(command));
  };

  return {
    connect,
    isConnected,
    setRainbow,
    setFill,
    setChase,
    runGcode,
    runCommand
  };
};
