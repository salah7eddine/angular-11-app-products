import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, catchError, startWith } from 'rxjs/operators';
import { Product } from 'src/app/model/product.model';
import { ProductsService } from 'src/app/services/products.service';
import { EventDriverService } from 'src/app/state/event.driver.service';
import {
  ActionEvent,
  AppDataState,
  DataStateEnum,
  ProductActionTypes,
} from 'src/app/state/product.state';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  products$: Observable<AppDataState<Product[]>> | null = null;
  readonly DataStateEnum = DataStateEnum;

  constructor(
    private productsService: ProductsService,
    private router: Router,
    private eventDriverService: EventDriverService
  ) {}

  ngOnInit(): void {
    this.eventDriverService.sourceEventSubjectObservable.subscribe(
      (actionEvent: ActionEvent) => {
        this.onActionEvent(actionEvent);
      }
    );
  }

  onGetAllProducts() {
    this.products$ = this.productsService.getAllProducts().pipe(
      map((data) => {
        return { dataState: DataStateEnum.LOADED, data: data };
      }),
      startWith({ dataState: DataStateEnum.LOADING }),
      catchError((err) =>
        of({ dataState: DataStateEnum.ERROR, errorMessage: err.message })
      )
    );
  }

  onGetSelectedProducts() {
    this.products$ = this.productsService.getSelectedProducts().pipe(
      map((data) => {
        return { dataState: DataStateEnum.LOADED, data: data };
      }),
      startWith({ dataState: DataStateEnum.LOADING }),
      catchError((err) =>
        of({ dataState: DataStateEnum.ERROR, errorMessage: err.message })
      )
    );
  }

  onGetAvailableProducts() {
    this.products$ = this.productsService.getAvailableProducts().pipe(
      map((data) => {
        return { dataState: DataStateEnum.LOADED, data: data };
      }),
      startWith({ dataState: DataStateEnum.LOADING }),
      catchError((err) =>
        of({ dataState: DataStateEnum.ERROR, errorMessage: err.message })
      )
    );
  }

  onSearch(dataForm: any) {
    this.products$ = this.productsService.searchProducts(dataForm.keyWord).pipe(
      map((data) => {
        return { dataState: DataStateEnum.LOADED, data: data };
      }),
      startWith({ dataState: DataStateEnum.LOADING }),
      catchError((err) =>
        of({ dataState: DataStateEnum.ERROR, errorMessage: err.message })
      )
    );
  }

  onSelect(p: Product) {
    this.productsService.select(p).subscribe((data) => {
      p.selected = data.selected;
    });
  }

  onDelete(product: Product) {
    let v = confirm('you wanna delete this product ?');
    if (v == true) {
      this.productsService.deleteProduct(product).subscribe((data) => {
        this.onGetAllProducts();
      });
    }
  }

  onNewProduct() {
    this.router.navigateByUrl('/newProduct');
  }

  onUpdate(p: Product) {
    this.router.navigateByUrl('/updateProduct/' + p.id);
  }

  onActionEvent($event: ActionEvent) {
    switch ($event.type) {
      case ProductActionTypes.GET_ALL_PRODUCTS:
        this.onGetAllProducts();
        break;
      case ProductActionTypes.GET_SELECTED_PRODUCTS:
        this.onGetSelectedProducts();
        break;
      case ProductActionTypes.GET_AVAILABLE_PRODUCTS:
        this.onGetAvailableProducts();
        break;
      case ProductActionTypes.SEARCH_PRODUCTS:
        this.onSearch($event.payload);
        break;
      case ProductActionTypes.GET_ALL_PRODUCTS:
        this.onGetAllProducts();
        break;
      case ProductActionTypes.NEW_PRODUCT:
        this.onNewProduct();
        break;
      case ProductActionTypes.SELECT_PRODUCT:
        this.onSelect($event.payload);
        break;
      case ProductActionTypes.UPDATE_PRODUCT:
        this.onUpdate($event.payload);
        break;
      case ProductActionTypes.DELETE_PRODUCT:
        this.onDelete($event.payload);
        break;
    }
  }
}
