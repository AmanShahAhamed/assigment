import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Rating } from './rating.entity';

@Entity('movies')
export class Movies {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  tconst: string;

  @Column()
  titleType: string;

  @Column()
  primaryTitle: string;

  @Column({ type: 'int' })
  runtimeMinutes: number;

  @Column()
  genres: string;

  @OneToOne(() => Rating)
  @JoinColumn()
  rating: Rating;
}
