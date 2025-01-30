import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import { HttpService } from '@nestjs/axios';
import { of } from 'rxjs';
import { describe, it, beforeEach, expect, vi } from 'vitest';

describe('MoviesService', () => {
  let service: MoviesService;
  const mockHttpService = {
    get: vi.fn(() => of({ data: { data: { meta: { released: '2020-01-01' } } } })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MoviesService,
        { provide: HttpService, useValue: mockHttpService },
      ],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('returns NEW for year >= 2000', async () => {
    const oldness = await service.getOldness('new-movie');

    expect(mockHttpService.get).toHaveBeenCalledWith('http://localhost:3002/new-movie');
    expect(oldness).toBe('NEW');
  });
});