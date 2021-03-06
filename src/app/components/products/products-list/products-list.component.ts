import { Component, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { EventEmitter } from '@angular/core';

import { Product } from 'src/app/model/product.model';
import {
  ActionEvent,
  AppDataState,
  DataStateEnum,
  ProductActionTypes,
} from 'src/app/state/product.state';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css'],
})
export class ProductsListComponent implements OnInit {
  @Input() productsInput$: Observable<AppDataState<Product[]>> | null = null;
  @Output()
  productsEventEmitter: EventEmitter<ActionEvent> = new EventEmitter<ActionEvent>();
  readonly DataStateEnum = DataStateEnum;

  constructor() {}

  ngOnInit(): void {}

  onSelect(p: Product) {
    this.productsEventEmitter.emit({
      type: ProductActionTypes.SELECT_PRODUCT,
      payload: p,
    });
  }

  onDelete(p: Product) {
    this.productsEventEmitter.emit({
      type: ProductActionTypes.DELETE_PRODUCT,
      payload: p,
    });
  }

  onUpdate(p: Product) {
    this.productsEventEmitter.emit({
      type: ProductActionTypes.UPDATE_PRODUCT,
      payload: p,
    });
  }

  onActionEvent($event: ActionEvent) {
    this.productsEventEmitter.emit($event);
  }
}
