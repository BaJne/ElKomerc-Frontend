import { Feature } from './category.model';
import { Producer } from './producer.model';

export interface Artical {
  id: number;
  article_code: string;
  article_name: string;
  price: number;
  isOnWishList: boolean;
  profile_picture: string;
  uri: string;
  artical_rate: number;

  producer_info?: {
    id: number;
    producer_name: string;
​​    profile_image: string;
  };
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
  comments?: {
    email: string;
    comment: string;​​​
    last_modified: Date;​​​
  }[];
  description?: string;
  unit_of_measure?: string;
  currency?: string;
  is_available?: boolean;
}
