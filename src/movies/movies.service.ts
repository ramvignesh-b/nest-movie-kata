import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class MoviesService {
  constructor(private readonly httpService: HttpService) {}

  private readonly baseUrl = 'http://localhost:3002';

  async getOldness(movieName: string): Promise<string> {
    const response = await firstValueFrom(
      this.httpService.get(`${this.baseUrl}/${movieName}`),
    );
    const year = this.parseYear(response.data.data.meta.released);
    return this.getOldnessFromYear(year);
  }

  private getOldnessFromYear(year: number): string {
    if (year >= 2000) {
      return 'NEW';
    }
    return '90s';
  }

  private parseYear(releaseDate: string): number {
    return new Date(releaseDate).getFullYear();
  }
}
