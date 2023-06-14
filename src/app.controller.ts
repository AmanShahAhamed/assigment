import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { MoviesDto } from './dto/movies.dto';
import { Movies } from './entities/movies.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('longest-duration-movies')
  async getLongestDurationMovies(): Promise<Movies[]> {
    return await this.appService.getLongestDurationMovies();
  }

  @Get('top-rated-movies')
  async getTopRatedMovies() {
    return await this.appService.getTopRatedMovies();
  }

  @Get('genre-movies-with-subtotals')
  async getMoviesWithSubtotals() {
    return await this.appService.getMoviesWithSubtotals();
  }

  @Post('new-movie')
  async saveNewMovie(@Body() body: MoviesDto): Promise<string> {
    return await this.appService.saveNewMovie(body);
  }

  @Post('update-runtime-minutes')
  async updateRuntimeMinutes(): Promise<string> {
    return this.appService.updateRuntimeMinutes();
  }
}
