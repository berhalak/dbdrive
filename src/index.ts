import { Drive } from './Abstractions';
import { InMemoryDrive } from './InMemory';

export * from "./Abstractions"
export * from "./InMemory"

Drive.Memory = () => new InMemoryDrive();