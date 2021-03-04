import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, catchError, startWith } from 'rxjs/operators';
import { Product } from 'src/app/model/product.model';
import { ProductsService } from 'src/app/services/products.service';
import { AppDataState, DataStateEnum } from 'src/app/state/product.state';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  // products: Product[] | null = null;
  products$: Observable<AppDataState<Product[]>> | null = null;

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {}

  // Solution One
  // onGetAllProducts() {
  //   this.productsService.getAllProducts().subscribe(
  //     (data) => {
  //       this.products = data;
  //     },
  //     (err) => {
  //       console.log(err);
  //     }
  //   );
  // }

  // Solution two
  onGetAllProducts() {
    this.products$ = this.productsService.getAllProducts().pipe(
      map((data) => ({ dataState: DataStateEnum.LOADED, data: data })),
      startWith({ dataState: DataStateEnum.LOADING }),
      catchError((err) =>
        of({ dataState: DataStateEnum.ERROR, errorMessage: err.message })
      )
    );
  }
}
