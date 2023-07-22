import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base.entity';
import { AccountStatus } from '../@types';

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @Column({ type: 'varchar', length: 50, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  password: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  username: string;

  @Column({ type: 'varchar', length: 50, unique: true, nullable: true })
  phone_number: string;

  @Column({
    type: 'enum',
    enum: AccountStatus,
    default: AccountStatus.NOT_VERIFIED,
  })
  account_status: AccountStatus;

  @Column({ type: 'boolean', default: false })
  email_verified: boolean;

  @Column({ type: 'boolean', default: true })
  email_otp_enabled: boolean;

  @Column({ type: 'varchar', length: 300, nullable: true })
  email_otp_base32: string;

  @Column({ type: 'boolean', default: false })
  sms_otp_enabled: boolean;

  @Column({ type: 'boolean', default: false })
  sms_otp_verified: boolean;

  @Column({ type: 'varchar', length: 300, nullable: true })
  sms_otp_base32: string;
}