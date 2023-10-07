import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class SellerEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp with time zone' })
  date: Date;

  @Column('decimal', { precision: 10, scale: 2 })
  value: number;

  @Column({ type: 'text' })
  name: string;
}
