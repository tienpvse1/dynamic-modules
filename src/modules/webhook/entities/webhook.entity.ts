import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Webhook extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  url: string;
}
