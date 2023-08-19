import { ConnectionOptions, NatsConnection, connect} from 'nats';
import { Client} from 'pg';

interface Device {
  id: number;
  temperature: number;
}

const dbConfig = {
  user: 'postgres',
  host: 'localhost',
  database: 'heat-sensor-db',
  password: '123456',
  port: 5432,
};



const devices: Device[] = [];
const numDevices = 3;

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

// send to the NATS server
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


// Subs NATS server and persist data to DB when a message is received
// async function persistData() {
//   const nc = await connect(natsOptions)

//   const subscription = nc.subscribe('deviceTemperature');

//   (async function processMessages() {
//     for await (const msg of subscription) {
//       const data = JSON.parse(new TextDecoder().decode(msg.data)) as Device;

//       const insertQuery = `INSERT INTO devices (id, temperature) VALUES ($1, $2)`; // Use placeholders
//       const values = [data.id, data.temperature];

//       const client = new Client(dbConfig);
//       await client.connect();

//       try {
//         await client.query(insertQuery, values);
//         console.log('Data successfully inserted');
//       } catch (error) {
//         console.error('Error while inserting data:', error);
//       } finally {
//         client.end();
//       }
//     }
//   })();

//   process.on('SIGINT', async () => {
//     await nc.close(); // Close NATS connection
//     process.exit();
//   });
// }

// persistData().catch(error => console.error('Error:', error));
