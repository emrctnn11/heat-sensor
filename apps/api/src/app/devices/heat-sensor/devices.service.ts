import { Injectable, OnModuleInit } from '@nestjs/common';
import { Client } from 'pg';
import { connect, Payload, NatsConnection, ConnectionOptions } from 'nats';

export interface Device {
  id: number;
  temperature: number;
}

@Injectable()
export class DevicesService implements OnModuleInit {
  private client: Client;
  private nc: Promise<NatsConnection>;

  private readonly dbConfig = {
    user: 'postgres',
    host: 'localhost',
    database: 'heat-sensor-db',
    password: '123456',
    port: 5432,
  };

  private readonly natsOptions: ConnectionOptions = {
    servers: ['nats://localhost:4222']
  };

  constructor() {
    this.client = new Client(this.dbConfig);
    this.nc = connect(this.natsOptions);
  }

  async onModuleInit() {
    await this.client.connect();
    this.startNatsSubscription();
  }

  async startNatsSubscription() {
    const subscription = (await this.nc).subscribe('deviceTemperature');

    for await (const msg of subscription) {
      const data = JSON.parse(new TextDecoder().decode(msg.data)) as Device;

      const updateQuery = `
        UPDATE devices
        SET temperature = $1,
            temperature_history = array_append(temperature_history, $2::jsonb),
            updatedAt = NOW()
        WHERE id = $3
      `;
      const values = [data.temperature, JSON.stringify(data.temperature), data.id];

      try {
        await this.client.query(updateQuery, values);
        console.log('Data successfully inserted');
      } catch (error) {
        console.error('Error while inserting data:', error);
      }
    }
  }
}
