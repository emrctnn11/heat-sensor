import { devicesQueryHandlers } from './devices/devices-query-handlers';

export const cqrsQueryHandlers = [
  ...devicesQueryHandlers,
];
