import { CreateDateColumn, Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn } from 'typeorm';

export type CustomerRole = 'customer' | 'admin';

@Entity('customers')
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  fullName: string;

  @Column()
  passwordHash: string;

  @Column({ type: 'text', default: 'customer' })
  role: CustomerRole;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
