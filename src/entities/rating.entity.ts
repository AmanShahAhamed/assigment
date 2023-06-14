import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('rating')
export class Rating {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'float' })
  averageRating: number;

  @Column({ type: 'int' })
  numVotes: number;
}
