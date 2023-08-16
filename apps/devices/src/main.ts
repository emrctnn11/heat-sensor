import { ConnectionOptions, NatsConnection, connect } from 'nats';

interface Device {
  id: number;
  temperature: number;
}

const devices: Device[] = [];
const numDevices = 1000;

// NATS sunucusuna bağlanma
const natsOptions: ConnectionOptions = {
  servers: ['nats://localhost:4222'] // NATS sunucu adresini burada belirtin
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
  return Math.floor(Math.random() * 50) + 10; // Random number between 10 and 59
}

// Update temperature
function updateTemperature(device: Device) {
  device.temperature = generateRandomTemperature();
}

ncPromise.then(nc => {
  setInterval(() => {
    devices.forEach((device) => {
      updateTemperature(device);

      // Mesajı NATS sunucusuna yayınla
      nc.publish('deviceTemperature', JSON.stringify(device));
      console.log(`Device ${device.id} - Temperature: ${device.temperature}°C`);
    });
  }, 10000);
});

console.log(`Simulating ${numDevices} imaginary devices...`);
