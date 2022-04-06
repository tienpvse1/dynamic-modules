import { BaseEntity, Column, Entity, Index, PrimaryColumn } from 'typeorm';

@Entity()
export class Account extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  @Index({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  @Index({ unique: true })
  username: string;
}
