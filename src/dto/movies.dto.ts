import { Transform } from 'class-transformer';
import { IsEnum, IsInt, IsNotEmpty, IsString } from 'class-validator';
import { Genres } from 'src/constant/genres.enum';

export class MoviesDto {
  @IsString({ message: 'tconst be string' })
  @IsNotEmpty({ message: 'tconst is required' })
  tconst: string;

  @IsString({ message: 'titleType be string' })
  @IsNotEmpty({ message: 'titleType is required' })
  titleType: string;

  @IsString({ message: 'primaryTitle be string' })
  @IsNotEmpty({ message: 'primaryTitle is required' })
  primaryTitle: string;

  @IsInt({ message: 'runtimeMinutes must be a integer' })
  @IsNotEmpty({ message: 'runtimeMinutes is required' })
  @Transform(({ value }) => (value ? Number(value) : null))
  runtimeMinutes: number;

  @IsEnum(Genres, {
    message:
      'genres must be one of the type Documentary,Animation,Comedy,Short,Sport,Romance,Action,News,Drama,Horror,Fantasy,or Family',
  })
  @IsNotEmpty({ message: 'genres is required' })
  genres: Genres;
}
