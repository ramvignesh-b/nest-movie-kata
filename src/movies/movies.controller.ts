import { Controller, Get, Param } from '@nestjs/common';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get(':movieName/oldness')
  async getOldness(@Param('movieName') movieName: string) {
    const oldness = await this.moviesService.getOldness(movieName);
    return { category: oldness };
  }
}