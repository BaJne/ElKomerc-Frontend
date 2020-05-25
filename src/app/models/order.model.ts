export interface PaymentItem {
  article_id: number;
  number_of_pieces: number;
  item_attributes: {
    attribute_name: string;
    value: string;
  }[];
}

export interface Order {
  address: string;
  city: string;
  zip_code: string;
  method_of_payment: string;
  note: string;
  payment_items: PaymentItem[];
}

// Order details get
export interface OrderPreview {
  address: string;
  attribute_notes: string;
  city: string;
  id: number;
  items: {
    id: number;
    article_id: number;
    article_code: string;
    article_name: string;
    user_discount: number;
    number_of_pieces: number;
    article_price: number;
    price: number;
    reject_comment: string;
    unit_of_measure: string;
    payment_order_id: string;
  }[];
  method_of_payment: string;
  note: string;​​​
  status: string;
  time_created: Date;​
  total_cost: number;​​​
  zip_code: string;
}
