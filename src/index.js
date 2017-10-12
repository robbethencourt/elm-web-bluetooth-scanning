import './main.css'
import { Main } from './Main.elm'

const app = Main.embed(document.getElementById('root'))

// Elm Subscriptions

app.ports.requestBluetoothConnection.subscribe(() => {
  navigator.bluetooth.requestDevice({ filters: [{ services: ['battery_service'] }] })
    .then(device => {
      console.log(device)
      app.ports.bluetoothConnectionResponse.send(device.name)
      return device.gatt.connect()
    })
    .then(server => {
      // Getting Battery Service...
      console.log(server)
      return server.getPrimaryService('battery_service')
    })
    .then(service => {
      // Getting Battery Level Characteristic...
      return service.getCharacteristic('battery_level')
    })
    .then(characteristic => {
      // Reading Battery Level...
      return characteristic.readValue()
    })
    .then(value => {
      console.log('Battery percentage is ' + value.getUint8(0))
    })
    .catch(error => {
      console.log(error)
    })
})
