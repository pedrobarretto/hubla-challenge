import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class SaleEntity {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 3 })
  @Column()
  type: number;

  @ApiProperty({ example: '2022-01-15 19:20:30.000 -0300' })
  @Column({ type: 'timestamp with time zone' })
  date: Date;

  @ApiProperty({ example: 'DESENVOLVEDOR FULL STACK' })
  @Column({ type: 'text' })
  product: string;

  @ApiProperty({ example: 127.5 })
  @Column('decimal', { precision: 10, scale: 2 })
  value: number;

  @ApiProperty({ example: 'JOSE CARLOS' })
  @Column({ type: 'text' })
  seller: string;
}
