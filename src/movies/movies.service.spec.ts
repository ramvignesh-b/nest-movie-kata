import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import { HttpService } from '@nestjs/axios';
import { of } from 'rxjs';
import { describe, it, beforeEach, expect, vi } from 'vitest';

describe('MoviesService', () => {
  let service: MoviesService;
  const mockHttpService = {
    get: vi.fn(() =>
      of({ data: { data: { meta: { released: '2020-01-01' } } } }),
    ),
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

    expect(mockHttpService.get).toHaveBeenCalledWith(
      'http://localhost:3002/new-movie',
    );
    expect(oldness).toBe('NEW');
  });

  it('returns 90s for year >= 1990 and < 2000', async () => {
    mockHttpService.get.mockReturnValueOnce(
      of({ data: { data: { meta: { released: '1995-01-01' } } } }),
    );

    const oldness = await service.getOldness('90s-movie');

    expect(mockHttpService.get).toHaveBeenCalledWith(
      'http://localhost:3002/90s-movie',
    );
    expect(oldness).toBe('90s');
  });

  it('returns OLD for year < 1990', async () => {
    mockHttpService.get.mockReturnValueOnce(
      of({ data: { data: { meta: { released: '1985-01-01' } } } }),
    );
    const oldness = await service.getOldness('old-movie');

    expect(mockHttpService.get).toHaveBeenCalledWith(
      'http://localhost:3002/old-movie',
    );
    expect(oldness).toBe('OLD');
  });

  it('returns PROFITABLE when made > budget', async () => {
    mockHttpService.get.mockReturnValueOnce(
      of({
        data: {
          data: {
            meta: { name: 'profitable-movie', released: '2020-01-01' },
            stats: { budget: 100, made: 150 },
          },
        },
      }),
    );
    const profitability = await service.getProfitability('profitable-movie');

    expect(mockHttpService.get).toHaveBeenCalledWith(
      'http://localhost:3002/profitable-movie',
    );
    expect(profitability).toBe('PROFITABLE');
  });

  it('returns NONPROFITABLE when made <= budget', async () => {
    mockHttpService.get.mockReturnValueOnce(
      of({
        data: {
          data: {
            meta: { name: 'nonprofitable-movie', released: '2020-01-01' },
            stats: { budget: 200, made: 150 },
          },
        },
      }),
    );
    const profitability = await service.getProfitability('nonprofitable-movie');

    expect(mockHttpService.get).toHaveBeenCalledWith(
      'http://localhost:3002/nonprofitable-movie',
    );
    expect(profitability).toBe('NONPROFITABLE');
  });

  it('returns BLOCKBUSTER when (made - budget) > 100', async () => {
    mockHttpService.get.mockReturnValueOnce(
      of({
        data: {
          data: {
            meta: { name: 'blockbuster-movie', released: '2020-01-01' },
            stats: { budget: 100, made: 300 },
          },
        },
      }),
    );
    const profitability = await service.getProfitability('blockbuster-movie');

    expect(mockHttpService.get).toHaveBeenCalledWith(
      'http://localhost:3002/blockbuster-movie',
    );
    expect(profitability).toBe('BLOCKBUSTER');
  });

  it('returns rating out of 5', async () => {
    mockHttpService.get.mockReturnValueOnce(
      of({
        data: {
          data: {
            meta: { name: 'High Rated', released: '2020-01-01' },
            stats: { rating: 8 },
          },
        },
      }),
    );
    const rating = await service.getRating('high-rated-movie');

    expect(mockHttpService.get).toHaveBeenCalledWith(
      'http://localhost:3002/high-rated-movie',
    );
    expect(rating).toBe(4);
  });
});

