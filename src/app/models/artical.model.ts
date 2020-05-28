
export interface Artical {
  id: number;
  article_code: string;
  article_name: string;
  profile_picture: string;

  user_discount?: number;
  price: number;

  isOnWishList: boolean;

  article_rate: number;
  number_of_rates?: number;

  uri?: string;
  producer_info?: {
    producer_name: string;
​​    profile_image: string;
    uri: string;
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
    responses: {
      comment_id: number;
      user: string;
      profile_image: string;
      comment: string;​​​
      last_modified: Date;​​​
    }[];
  }[];
  description?: string;
  unit_of_measure?: string;
  is_available?: boolean;
}
