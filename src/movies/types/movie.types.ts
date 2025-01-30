export interface MovieResponse {
  data: {
    meta: {
      name?: string;
      released: string;
    };
    stats: {
      budget: number;
      made: number;
    };
  };
}

export type MovieAge = 'NEW' | '90s' | 'OLD';

export interface AgeCategory {
  name: MovieAge;
  matches: (year: number) => boolean;
}
