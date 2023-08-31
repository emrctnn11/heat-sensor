import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('devices')
export class DevicesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  temperature?: number;

  @Column({ nullable: true })
  updatedat?: Date;
}
