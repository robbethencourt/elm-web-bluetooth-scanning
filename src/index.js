import './main.css'
import { Main } from './Main.elm'

const app = Main.embed(document.getElementById('root'))

// Elm Subscriptions

app.ports.requestBluetoothConnection.subscribe(() => {
  navigator.bluetooth.requestDevice({ filters: [{ services: ['0000180f-0000-1000-8000-00805f9b34fb'] }] })
    .then(device => {
      console.log(device)
      app.ports.bluetoothConnectionResponse.send(device.name)
      return device.gatt.connect()
    })
    .then(server => {
      // Getting Battery Service...
      console.log(server)
    // return server.getPrimaryService('0000180f-0000-1000-8000-00805f9b34fb')
    })
    // .then(service => {
    //   console.log(service)
    //   // Getting Battery Level Characteristic...
    //   return service.getCharacteristic('00002a19-0000-1000-8000-00805f9b34fb')
    // })
    // .then(characteristic => {
    //   console.log(characteristic)
    //   // Reading Battery Level...
    //   characteristic.addEventListener('characteristicvaluechanged', handleScannedBarcodes)
    //   return characteristic.readValue()
    // })
    // .then(value => {
    //   console.log(value)
    //   console.log('Battery percentage is ' + value.getUint8(0))
    // })
    .catch(error => {
      console.log(error)
    })
})

function handleScannedBarcodes (event) {
  let scannedBarcode = event.target.value.getUint8(0)
  console.log(scannedBarcode)
}

// service:         0000180f-0000-1000-8000-00805f9b34fb
// characteristic:  00002a19-0000-1000-8000-00805f9b34fb
// descriptors:     00002904-0000-1000-8000-00805f934fb / 00002908-0000-1000-8000-00805f934fb / 00002902-0000-1000-8000-00805f934fb
