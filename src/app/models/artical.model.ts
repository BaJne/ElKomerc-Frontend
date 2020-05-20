import { Feature } from './category.model';
import { Producer } from './producer.model';

export interface Artical {
  id: number;
  article_code: string;
  article_name: string;
  price: number;
  isOnWishList: boolean;
  profile_picture: string;
  artical_rate: number;

  number_of_rates?: number;
  uri?: string;
  producer_info?: {
    producer_name: string;
​​    profile_image: string;
    uri: string;
  };
  category?: {
    category_id: number;
    category_name: string;
    sub_category_id: number;
    sub_category_name: string;
  };
  attributes?: {
    attribute_name: string;
    value: string;
    is_selectable: boolean;
  }[];
  article_images?: {
    uri: string;
    purpose?: string;
  }[];
  comments?: {
    comment_id: number;
    user: string;
    profile_image: string;
    comment: string;​​​
    last_modified: Date;​​​
  }[];
  description?: string;
  unit_of_measure?: string;
  user_discount?: number;
  is_available?: boolean;
}
