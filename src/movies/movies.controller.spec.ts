import { Test, TestingModule } from '@nestjs/testing';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { describe, it, beforeEach, expect, vi } from 'vitest';

describe('MoviesController', () => {
  let controller: MoviesController;
  const mockMoviesService = {
    getOldness: vi.fn().mockResolvedValue('OLD'),
    getProfitability: vi.fn().mockResolvedValue('PROFITABLE'),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MoviesController],
      providers: [{ provide: MoviesService, useValue: mockMoviesService }],
    }).compile();

    controller = module.get<MoviesController>(MoviesController);
  });

  it('returns { category: "OLD" }', async () => {
    const result = await controller.getOldness('old-movie');

    expect(mockMoviesService.getOldness).toHaveBeenCalledWith('old-movie');
    expect(result).toEqual({
      category: 'OLD',
    });
  });

  it('returns { revenue: "PROFITABLE" }', async () => {
    const result = await controller.getProfitability('profitable-movie');

    expect(mockMoviesService.getProfitability).toHaveBeenCalledWith(
      'profitable-movie',
    );
    expect(result).toEqual({
      revenue: 'PROFITABLE',
    });
  });
});
