export interface PaymentItemCreate {
  article_id: number;
  number_of_pieces: number;
  article_attributes: string;
  // article_attributes: {
  //   [key:string]: any
  // }[];
}
export interface OrderCreate {
  address: string;
  city: string;
  zip_code: string;
  method_of_payment: number;
  phone: string;
  comment: string;
  payment_items: PaymentItemCreate[];
}

export enum OrderStatusCode{
  NA_CEKANJU,
  U_OBRADI,
  ODBIJENO,
  MODIFIKOVANO,
  ODOBRENO_ZA_SLANJE,
  POSLATO,
  VRACENO,
  ISPORUCENO
};

export enum PaymentItemStatus{
  NOT_VALID = -1,
  NO_CHANGE,
  VALID
}
export class OrderStatus{
  static statuses: OrderStatus[] = [
    new OrderStatus(OrderStatusCode.NA_CEKANJU,         "Na čekanju",         "fas fa-shopping-cart"    , "--yellow-"),
    new OrderStatus(OrderStatusCode.U_OBRADI,           "U obradi",           "fas fa-cog"              , "--blue-"),
    new OrderStatus(OrderStatusCode.ODBIJENO,           "Odbijeno",           "fas fa-times"            , "--bluegray-"),
    new OrderStatus(OrderStatusCode.MODIFIKOVANO,       "Modifikovano",       "fas fa-pen"              , "--orange-"),
    new OrderStatus(OrderStatusCode.ODOBRENO_ZA_SLANJE, "Odobreno za slanje", "fas fa-box"              , "--teal-"),
    new OrderStatus(OrderStatusCode.POSLATO,            "Poslato",            "fas fa-truck"            , "--indigo-"),
    new OrderStatus(OrderStatusCode.VRACENO,            "Vraćeno",            "far fa-hand-point-right" , "--pink-"),
    new OrderStatus(OrderStatusCode.ISPORUCENO,         "Isporučeno",         "fas fa-check"            , "--green-"),
  ]
  private constructor(public code: OrderStatusCode, public text: string, public icon: string, public color: string){}

  getNextAvailableStates(): OrderStatus[] {
    let result: OrderStatus[] = [];

    switch(this.code){
      case OrderStatusCode.NA_CEKANJU:
      case OrderStatusCode.U_OBRADI:
        result.push(
          OrderStatus.statuses[OrderStatusCode.MODIFIKOVANO],
          OrderStatus.statuses[OrderStatusCode.ODOBRENO_ZA_SLANJE],
          OrderStatus.statuses[OrderStatusCode.ODBIJENO]
        );
        break;
      case OrderStatusCode.ODOBRENO_ZA_SLANJE:
        result.push(OrderStatus.statuses[OrderStatusCode.POSLATO]);
        break;
      case OrderStatusCode.POSLATO:
        result.push(
          OrderStatus.statuses[OrderStatusCode.VRACENO],
          OrderStatus.statuses[OrderStatusCode.ISPORUCENO]
        );
      default:
    }
    return result;
  }
};

export interface PaymentItem{
  article_id: number;
  article_code: string;
  name: string;
  discount: number;
  count: number;
  price: number;
  unit_of_measure: string;
  valid: PaymentItemStatus;
  article_attributes: Attribute[]
};
export interface Attribute{
  [key:string]: string
};

export interface Order{
  id: number;
  full_name: string;
  status: OrderStatusCode;
  time_created: Date;
  time_modified: Date;
  total_cost: number;
  not_notified?: boolean;

  // More details
  email?: string;
  address?: string;
  city? :string;
  zip_code?: string;
  phone?: string;

  method_of_payment?: string;

  payment_items?: PaymentItem[];
  history?: OrderHistory[];
};
export interface OrderHistory{
  is_staff: boolean
  time_created: Date;
  comment: string;
  status: OrderStatusCode
};
