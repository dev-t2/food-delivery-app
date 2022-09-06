export interface IOrder {
  orderId: string;
  price: number;
  start: {
    latitude: number;
    longitude: number;
  };
  end: {
    latitude: number;
    longitude: number;
  };
  rider?: string;
}

export interface InitialState {
  orders: IOrder[];
  delivery: IOrder | null;
}

export interface IOrdersResponse {
  orders: IOrder[];
}

export interface IAcceptRequest {
  orderId: string;
}

export interface ICompletesResponse {
  orders: IOrder[];
}
