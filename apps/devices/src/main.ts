import { ConnectionOptions, NatsConnection, connect } from 'nats';

interface Device {
  id: number;
  temperature: number;
}

const devices: Device[] = [];
const numDevices = 1000;

// NATS SERVER CONNECTION
const natsOptions: ConnectionOptions = {
  servers: ['nats://localhost:4222']
};

const ncPromise: Promise<NatsConnection> = connect(natsOptions);

// Create imaginary devices
for (let i = 0; i < numDevices; i++) {
  devices.push({
    id: i,
    temperature: generateRandomTemperature(),
  });
}

// Generate random temperature
function generateRandomTemperature() {
  return Math.floor(Math.random() * 50) + 10;
}

// Update temperature
function updateTemperature(device: Device) {
  device.temperature = generateRandomTemperature();
}

ncPromise.then(nc => {
  console.log('Connected to NATS server.');
  setInterval(() => {
    devices.forEach((device) => {
      console.log(`Device ${device.id} - Temperature: ${device.temperature}°C`);
      updateTemperature(device);

      // Publish device temperature to NATS
      nc.publish('deviceTemperature', JSON.stringify(device));
    });
  }, 10000);
}).catch((err) => {
  console.error(err);
});

console.log(`Simulating ${numDevices} imaginary devices...`);
