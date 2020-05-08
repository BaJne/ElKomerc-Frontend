import { Feature } from './category.model';
import { Producer } from './producer.model';

export interface Artical {
  id: number;
  article_code: string;
  article_name: string;
  price: string;

  producer_info?: Producer;
  uri?: string;
  category?: {
    category_id: number;
    category_name: string;
    sub_category_id: number;
    sub_category_name: string;
  };
  attributes?: {
    attribute_id: number;
    attribute_name: string;
    value: string;
    is_selectable: boolean;
  }[];
  article_images?: {
    uri: string;
    purpose?: string;
    content_type?: string;
    height?: number;
    width?: number;
  }[];
  discount_group?: {
    id: number;
    group_name: string;
  };
  description?: string;
  unit_of_measure?: string;
  currency?: string;
  is_available?: boolean;
}
