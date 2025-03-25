import { Component, inject, OnInit } from '@angular/core';
import { MainService } from '../../service/main.service';
import {
  APIResponseModel,
  Cartmodel,
  OrderModel,
  RootObject,
} from '../../model/Product';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-order',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './create-order.component.html',
  styleUrl: './create-order.component.css',
})
export class CreateOrderComponent implements OnInit {
  mainService = inject(MainService);
  cartData: RootObject[] = [];
  totalAmount: number = 0;
  orderObj: OrderModel = new OrderModel();

  ngOnInit(): void {
    this.getCartItems();
  }

  getCartItems() {
    this.totalAmount = 0;
    this.mainService
      .getCarttProductByCustomerId(this.mainService.loggedUserData.custId)
      .subscribe((res: APIResponseModel) => {
        if (res && res.data) {
          this.cartData = res.data;
          this.cartData.forEach((element) => {
            this.totalAmount += element.productPrice;
          });
        }
      });
  }
}
