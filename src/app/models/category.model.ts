export interface Category {
  id: number;
  category_name: string;
  sub_categories: {
    id: number;
    subcategory_name: string;
    features: Feature[];
  }[];
}
export interface Feature {
  data_type: string;
  feature_name: string;
  id: number;
}
