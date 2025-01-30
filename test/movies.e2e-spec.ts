import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { MoviesModule } from '../src/movies/movies.module';
import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';
import request from 'supertest';
import { describe, it, beforeAll, afterAll } from 'vitest';

const server = setupServer(
  http.get('http://localhost:3002/new-movie', () => {
    return HttpResponse.json({
      data: { meta: { released: '2020-01-01' } },
    });
  }),
);

describe('MoviesController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    server.listen();
    const moduleRef = await Test.createTestingModule({
      imports: [MoviesModule],
    }).compile();
    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    server.close();
    await app.close();
  });

  it('GET /movies/new-movie/oldness → returns NEW (200)', async () => {
    await request(app.getHttpServer())
      .get('/movies/new-movie/oldness')
      .expect(200)
      .expect({ category: 'NEW' });
  });


  server.use(
    http.get('http://localhost:3002/profitable-movie', () => {
      return HttpResponse.json({
        data: {
          meta: { name: 'profitable-movie' },
          stats: { budget: 100, made: 500 },
        },
      });
    }),
  );

  it('GET /movies/profitable-movie/profitable → returns PROFITABLE', async () => {
    await request(app.getHttpServer())
      .get('/movies/profitable-movie/profitable')
      .expect(200)
      .expect({ revenue: 'PROFITABLE' });
  });
});
