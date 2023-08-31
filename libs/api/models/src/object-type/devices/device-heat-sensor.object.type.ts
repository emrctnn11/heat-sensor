import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class DeviceHeatSensorObjectType {

    @Field(type => Int)
    id?: number;

    @Field({ nullable: true })
    temperature?: number;

    @Field({ nullable: true })
    updatedat?: number;

}
