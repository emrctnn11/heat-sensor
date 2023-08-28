import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class DeviceHeatSensorObjectType {

    @Field()
    id?: number;

    @Field()
    temperature?: number;

    @Field()
    updatedat?: number;

}
