interface Device {
  id: number;
  temperature: number;
}

const devices: Device[] = [];
const numDevices = 1000;

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

// Update temperature every 10 seconds
setInterval(() => {
  devices.forEach((device) => {
    updateTemperature(device);
    console.log(`Device ${device.id} - Temperature: ${device.temperature}°C`);
  });
}, 10000); // 10 seconds (10000 milliseconds)

console.log(`Simulating ${numDevices} imaginary devices...`);
