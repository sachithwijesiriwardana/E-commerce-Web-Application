import { Component, inject, OnInit, signal } from '@angular/core';
import { MainService } from '../../service/main.service';
import { APIResponseModel, ProductList } from '../../model/Product';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  //productLists: ProductList []= [];

  //This is the new version where you use signals
  productLists = signal<ProductList[]>([]);

  mainService = inject(MainService);
  ngOnInit(): void {
    this.loadAllProducts();
  }

  loadAllProducts() {
    this.mainService.getAllProducts().subscribe((res: APIResponseModel) => {
      this.productLists.set(res.data);
    });
  }
}
