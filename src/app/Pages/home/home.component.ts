import { Component } from '@angular/core';
import { HomeComponentStore } from './home.component.store';

import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { TProduct } from './home.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  imports: [
    CommonModule,
    MatSidenavModule,
    MatButtonModule,
    MatCheckboxModule,

    MatIconModule
  ],
  styleUrls: ['./home.component.scss'],
  standalone: true,
  providers: [HomeComponentStore],
})
export default class HomeComponent {

  opened: boolean = false;
  products$ = this._store.select((state) => state.products);
  cartProducts$ = this._store.select((state) => state.cart.products);
  cartTotal$ = this._store.select((state)=>state.cart.products.reduce((prev,curr)=>prev+curr.price*curr.count,0))
  constructor(private _store: HomeComponentStore) {
    this._store.getProducts();
  }

  openCart(): void {
    this.opened = !this.opened;
  }

  addToCart(product: TProduct) {
    this._store.addToCart(product);
  }
  removeFromCart(product: TProduct) {
    this._store.removeFromCart(product);
  }
}
