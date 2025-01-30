export interface MovieResponse {
  data: {
    meta: {
      released: string;
    };
  };
}

export type MovieAge = 'NEW' | '90s' | 'OLD';

export interface AgeCategory {
  name: MovieAge;
  matches: (year: number) => boolean;
} 