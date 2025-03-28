export interface APIResponseModel {
  message: string;
  result: boolean;
  data: any;
}

export interface CategoryList {
  categoryId: number;
  categoryName: string;
  parentCategoryId: number;
  userId: number;
}

export interface RootObject {
  cartId: number;
  custId: number;
  productId: number;
  quantity: number;
  addedDate: Date;
  productShortName: string;
  prodductName: string;
  categoryName: string;
  productImageUrl: string;
  productPrice: number;
}

export class Customer {
  custId: number;
  name: string;
  MobileNo: string;
  Password: string;

  constructor() {
    this.custId = 0;
    this.name = '';
    this.MobileNo = '';
    this.Password = '';
  }
}

export class OrderModel {
  SaleId: number;
  CustId: number;
  SaleDate: string;
  TotalInvoiceAmount: number;
  Discount: number;
  PaymentNaration: string;
  DeliveryAddress1: string;
  DeliveryAddress2: string;
  DeliveryCity: string;
  DeliveryPinCode: string;
  DeliveryLandMark: string;
  IsCanceled: boolean;

  constructor() {
    this.SaleId = 0;
    this.CustId = 0;
    this.SaleDate = '';
    this.TotalInvoiceAmount = 0;
    this.Discount = 0;
    this.PaymentNaration = '';
    this.DeliveryAddress1 = '';
    this.DeliveryAddress2 = '';
    this.DeliveryCity = '';
    this.DeliveryPinCode = '';
    this.DeliveryLandMark = '';
    this.IsCanceled = false;
  }
}

export class Cartmodel {
  CustId: number;
  CartId: number;
  name: string;
  ProductId: number;
  Quantity: number;
  AddedDate: Date;

  constructor() {
    this.CustId = 0;
    this.CartId = 0;
    this.name = '';
    this.ProductId = 0;
    this.Quantity = 1;
    this.AddedDate = new Date();
  }
}

export class Login {
  UserName: string;
  UserPassword: string;

  constructor() {
    this.UserName = '';
    this.UserPassword = '';
  }
}

export interface ProductList {
  productId: number;
  productSku: string;
  productName: string;
  productPrice: number;
  productShortName: string;
  productDescription: string;
  createdDate: string;
  deliveryTimeSpan: string;
  categoryId: number;
  productImageUrl: string;
  categoryName: string;
}
