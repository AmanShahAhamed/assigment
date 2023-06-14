import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Movies } from './entities/movies.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MoviesDto } from './dto/movies.dto';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Movies) private readonly moviesRepo: Repository<Movies>,
  ) {}
  getHello(): string {
    return 'Hello World!';
  }

  async getLongestDurationMovies(): Promise<Movies[]> {
    try {
      const select = [
        'm.tconst AS tconst',
        'm.primaryTitle AS primaryTitle',
        'm.runtimeMinutes AS runtimeMinutes',
        'm.genres AS genres',
      ];
      return await this.moviesRepo
        .createQueryBuilder('m')
        .select(select)
        .orderBy('m.runtimeMinutes', 'DESC')
        .limit(10)
        .getRawMany();
    } catch (error) {
      throw new BadRequestException({ message: 'Something went wrong' });
    }
  }

  async saveNewMovie(movieDto: MoviesDto): Promise<string> {
    try {
      await this.moviesRepo.save(movieDto);
      return 'success';
    } catch (error) {
      throw new BadRequestException({ message: 'Something went wrong' });
    }
  }

  //This route returns as JSON the movies with an averageRating > 6.0, in sorted
  // order by averageRating
  // The output should contain tconst, primaryTitle, genre & averageRating.

  async getTopRatedMovies() {
    try {
      const select = [
        'm.tconst AS tconst',
        'm.primaryTitle AS primaryTitle',
        'm.genres AS genres',
        'r.averageRating AS averageRating',
      ];
      return await this.moviesRepo
        .createQueryBuilder('m')
        .innerJoin('m.rating', 'r')
        .select(select)
        .where('r.averageRating > 6.0')
        .orderBy('r.averageRating', 'DESC')
        .getRawMany();
    } catch (error) {
      console.error(error);
      throw new BadRequestException({ message: 'Something went wrong' });
    }
  }

  async getMoviesWithSubtotals() {
    try {
      const rawQuery = `
      SELECT CASE WHEN "primaryTitle"='TOTAL' THEN '' ELSE "genres" END AS "genres",
             "primaryTitle", "numVotes"
      FROM (
        SELECT
            m."genres",
            m."primaryTitle",
            r."numVotes",
            1 AS sort_order
        FROM
            "movies" m
        INNER JOIN
            "rating" r ON m."ratingId" = r."id"
        UNION 
        SELECT
            "genres",
            'TOTAL' AS "primaryTitle",
            SUM(r."numVotes") AS "numVotes",
            2 AS sort_order
        FROM
            "movies" m
        INNER JOIN
            "rating" r ON m."ratingId" = r."id"
        GROUP BY
            "genres"
        ORDER BY
            "genres" ASC, "sort_order" ASC
      ) AS subquery`;
      return await this.moviesRepo.query(rawQuery);
    } catch (error) {
      console.error(error);
      throw new BadRequestException({ message: 'Something went wrong' });
    }
  }

  async updateRuntimeMinutes(): Promise<string> {
    try {
      const rawQuery = `UPDATE "movies"
      SET "runtimeMinutes" = CASE
          WHEN "genres" = 'Documentary' THEN "runtimeMinutes" + 15
          WHEN "genres" = 'Animation' THEN "runtimeMinutes" + 30
          ELSE "runtimeMinutes" + 45
      END;`;
      await this.moviesRepo.query(rawQuery);
      return 'Success';
    } catch (error) {
      console.error(error);
      throw new BadRequestException({ message: 'Something went wrong' });
    }
  }
}
