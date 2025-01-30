## Problem Statement

Create a movie DB API that consumes another API (mock API) and transforms it's results.

### Requirements

- [ ] Create an endpoint `/:movieName/oldness` which should return values `NEW|90s|OLD` based on the release date of the movie.
  - Year >= 2000 : NEW
  - Year >= 90 : 90s
  - Year < 90 : OLD
- [ ] Create and endpoint `/:movieName/profitable` which should return values `PROFITABLE|NONPROFITABLE` based on the budget and made.
- [ ] Extend the `/:movieName/profitable` endpoint by adding a `BLOCKBUSTER` response type if the difference between budget and made is greater than 100.
- [ ] Create an endpoint `/:movieName/rating` that returns the rating of the movie out of 5, given the mock server returns the rating out of 10.

## Testing

- Use `vitest` for testing.
- Use `msw` for mocking the API.
- Use `supertest` for testing the API.

## Running the tests

```bash
npm run test
```

## Running the tests with e2e

```bash
npm run test:e2e
```
