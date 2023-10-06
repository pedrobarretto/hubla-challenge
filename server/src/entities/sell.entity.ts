import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class SellEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: number;

  @Column({ type: 'timestamp with time zone' })
  date: Date;

  @Column()
  product: string;

  @Column('decimal', { precision: 10, scale: 2 })
  value: number;

  @Column()
  seller: string;
}
