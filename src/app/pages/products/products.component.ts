import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { MainService } from '../../service/main.service';
import {
  APIResponseModel,
  Cartmodel,
  CategoryList,
  Customer,
  ProductList,
} from '../../model/Product';
import { map, Observable, Subscription } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { Constant } from '../../constant/constant';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit, OnDestroy {
  //productLists: ProductList []= [];

  //This is the new version where you use signals
  productLists = signal<ProductList[]>([]);
  catergoryList: Observable<CategoryList[]> = new Observable<CategoryList[]>();
  subscriptionList: Subscription[] = [];
  mainService = inject(MainService);

  constructor() {}
  ngOnInit(): void {
    this.loadAllProducts();
    this.catergoryList = this.mainService
      .getAllCategory()
      .pipe(map((item) => item.data));
  }

  getProductByCatergory(id: number) {
    this.mainService
      .getAllCategoryById(id)
      .subscribe((res: APIResponseModel) => {
        this.productLists.set(res.data);
      });
  }

  loadAllProducts() {
    this.subscriptionList.push(
      this.mainService.getAllProducts().subscribe((res: APIResponseModel) => {
        this.productLists.set(res.data);
      })
    );
  }
  onAddtoCart(id: number) {
    const newObj: Cartmodel = new Cartmodel();
    newObj.ProductId = id;
    newObj.CustId = this.mainService.loggedUserData.custId;
    this.mainService.addToCart(newObj).subscribe((res: APIResponseModel) => {
      if (res.result) {
        alert('Item Successfully Added to Cart');
        this.mainService.onCartAdded.next(true);
      } else {
        alert(res.message);
      }
    });
  }
  ngOnDestroy(): void {
    this.subscriptionList.forEach((element) => {
      element.unsubscribe();
    });
  }
}
