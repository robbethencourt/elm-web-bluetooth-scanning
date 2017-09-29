import './main.css'
import { Main } from './Main.elm'

const app = Main.embed(document.getElementById('root'))

// Elm Subscriptions

app.ports.requestBluetoothConnection.subscribe((testing) => {
  console.log(testing)
  navigator.bluetooth.requestDevice({ filters: [{ services: ['battery_service'] }] })
    .then(device => {
      // Human-readable name of the device.
      console.log(device.name)

      // Attempts to connect to remote GATT Server.
      return device.gatt.connect()
    })
    .then(server => {
      /* ... */
    })
    .catch(error => {
      console.log(error)
    })
})
