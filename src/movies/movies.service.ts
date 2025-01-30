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
    const year = new Date(response.data.data.meta.released).getFullYear();
    return year >= 2000 ? 'NEW' : '90s';
  }
}
