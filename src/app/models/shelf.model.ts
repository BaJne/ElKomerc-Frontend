import { Artical } from './artical.model';

export interface Shelf{
  id: number,
  title: string,
  is_enabled: boolean,
  discount?: number,
  products: Artical[],
  link?: string
}
