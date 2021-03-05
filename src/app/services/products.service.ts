import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../model/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  host = environment.host;

  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<Product[]> {
    // let host = Math.random() > 0.2 ? environment.host : environment.unreachableHost;
    return this.http.get<Product[]>(this.host + 'products');
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(this.host + 'products/' + id);
  }

  getSelectedProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.host + 'products?selected=true');
  }

  getAvailableProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.host + 'products?available=true');
  }

  searchProducts(keyWord: string): Observable<Product[]> {
    return this.http.get<Product[]>(
      this.host + 'products?name_like=' + keyWord
    );
  }

  select(product: Product): Observable<Product> {
    product.selected = !product.selected;
    return this.http.put<Product>(
      this.host + 'products/' + product.id,
      product
    );
  }

  deleteProduct(product: Product): Observable<void> {
    return this.http.delete<void>(this.host + 'products/' + product.id);
  }

  save(product: Product): Observable<Product> {
    return this.http.post<Product>(this.host + 'products', product);
  }

  updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(
      this.host + 'products/' + product.id,
      product
    );
  }
}
