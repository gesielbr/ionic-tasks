export interface DemonSlayerCharacter {
  id: number;
  name: string;
  age: number;
  gender: string;
  race: string;
  description: string;
  img: string;
  affiliation_id: number;
  arc_id: number;
  quote: string;
}

export interface Pagination {
  totalElements: number;
  elementsOnPage: number;
  currentPage: number;
  totalPages: number;
  previousPage: string;
  nextPage: string;
}

export interface PagedResponse<T> {
  pagination: Pagination;
  content: T[];
}
