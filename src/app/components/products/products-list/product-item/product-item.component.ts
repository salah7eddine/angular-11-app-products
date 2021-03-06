import { Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Product } from 'src/app/model/product.model';
import { EventDriverService } from 'src/app/state/event.driver.service';
import { ActionEvent, ProductActionTypes } from 'src/app/state/product.state';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css'],
})
export class ProductItemComponent implements OnInit {
  @Input() product: Product | null = null;
  // @Output()
  // eventEmitter: EventEmitter<ActionEvent> = new EventEmitter<ActionEvent>();

  constructor(private eventDrivenService: EventDriverService) {}

  ngOnInit(): void {}

  onSelect(product: Product) {
    // this.eventEmitter.emit({
    //   type: ProductActionTypes.SELECT_PRODUCT,
    //   payload: product,
    // });

    this.eventDrivenService.publishEvent({
      type: ProductActionTypes.SELECT_PRODUCT,
      payload: product,
    });
  }

  onDelete(product: Product) {
    // this.eventEmitter.emit({
    //   type: ProductActionTypes.DELETE_PRODUCT,
    //   payload: product,
    // });

    this.eventDrivenService.publishEvent({
      type: ProductActionTypes.DELETE_PRODUCT,
      payload: product,
    });
  }

  onUpdate(product: Product) {
    // this.eventEmitter.emit({
    //   type: ProductActionTypes.UPDATE_PRODUCT,
    //   payload: product,
    // });

    this.eventDrivenService.publishEvent({
      type: ProductActionTypes.UPDATE_PRODUCT,
      payload: product,
    });
  }
}
