import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseServices } from './database-services';
import { typeOrmEntities } from '@heat-sensor/entities';

@Global()
@Module({
    imports: [TypeOrmModule.forFeature([...typeOrmEntities])],
    providers: [...databaseServices],
    exports: [...databaseServices],
})
export class DatabaseServiceModule { }
