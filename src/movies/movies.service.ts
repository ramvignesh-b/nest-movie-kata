import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { MovieResponse, MovieAge, AgeCategory } from './types/movie.types';

@Injectable()
export class MoviesService {
  private readonly baseUrl = 'http://localhost:3002';
  private readonly ageCategories: AgeCategory[] = [
    {
      name: 'NEW',
      matches: (year: number) => year >= 2000,
    },
    {
      name: '90s',
      matches: (year: number) => year >= 1990 && year < 2000,
    },
    {
      name: 'OLD',
      matches: (year: number) => year < 1990,
    },
  ];

  constructor(private readonly httpService: HttpService) {}

  async getOldness(movieName: string): Promise<MovieAge> {
    const response = await firstValueFrom(
    this.httpService.get<MovieResponse>(`${this.baseUrl}/${movieName}`),
      );

      const year = this.parseYear(response.data.data.meta.released);
      return this.getOldnessFromYear(year);
  }

  private getOldnessFromYear(year: number): MovieAge {
      const category = this.ageCategories.find(category => category.matches(year));
      return category?.name ?? 'OLD';
  }

  private parseYear(releaseDate: string): number {
    const date = new Date(releaseDate);
    return date.getFullYear();
  }
}