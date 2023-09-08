import {connect, JSONCodec} from 'nats';

const jsonCodec = JSONCodec();

(async () => {
  try {
    const natsConnection = await connect({ servers: "nats://localhost:4222" });

    const sendDeviceDataToNats = ({ deviceId, temperature, dateTime }) => {
      natsConnection.publish(
        "temperature-subject",
        jsonCodec.encode({
          deviceId,
          temperature,
          dateTime,
        })
      );
    };

    const generateSensorData = () => {
      const devices = [...Array(1000).keys()];
      let currentDeviceIndex = 0;
      setInterval(() => {
        for (let i = 0; i < 100; i++) {
          const deviceId = devices[currentDeviceIndex];
          const temperature = Math.random() * 100;
          const dateTime = new Date();
          sendDeviceDataToNats({ deviceId, temperature, dateTime });
          currentDeviceIndex++;
        }
        if (currentDeviceIndex === devices.length) {
          currentDeviceIndex = 0;
        }
      }, 1000);
    };

    generateSensorData();
    console.log('application started...');
  } catch (error) {
    console.error("An error occurred:", error);
  }
})();
