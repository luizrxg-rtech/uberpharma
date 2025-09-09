export interface Address {
  id?: string;
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface PaymentMethod {
  type: 'pix' | 'credit_card' | 'boleto';
  cardNumber?: string;
  cardName?: string;
  expiryDate?: string;
  cvv?: string;
  installments?: number;
}

export interface Shipping {
  method: string;
  price: number;
  estimatedDays: number;
}

export interface Coupon {
  code: string;
  discount: number;
  type: 'percentage' | 'fixed';
}

export interface CheckoutData {
  address: Address;
  paymentMethod: PaymentMethod;
  shipping: Shipping;
  coupon?: Coupon;
  total: number;
  subtotal: number;
  shippingCost: number;
  discount: number;
}
