import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { ISProduct, TISProduct, TProduct } from './home.model';
import { HttpService } from 'src/app/http.service';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class HomeComponentStore extends ComponentStore<TISProduct> {
  constructor(private _http: HttpService) {
    super(ISProduct);
  }

  getProducts = this.effect((trigger$) => {
    return trigger$.pipe(
      switchMap(() =>
        this._http.getProduct().pipe(
          tapResponse(
            (res) => this.updateProducts(res),
            (err) => of(err)
          )
        )
      )
    );
  });

  updateProducts = this.updater((state, payload: TProduct[]) => {
    return { ...state, products: payload };
  });

  addToCart = this.updater((state, product: TProduct): TISProduct => {
    const idx = state.cart.products.findIndex((p) => p.id === product.id);
    if (idx === -1) {
      return {
        ...state,
        cart: { products: [...state.cart.products, { ...product, count: 1 }] },
      };
    }
    return {
      ...state,
      cart: {
        products: state.cart.products.map((p) => {
          if (p.id === product.id) {
            return { ...p, count: p.count + 1 };
          }
          return { ...p };
        }),
      },
    };
  });

  removeFromCart = this.updater((state, product: TProduct): TISProduct => {
    const idx = state.cart.products.findIndex((p) => p.id === product.id);
    if (state.cart.products[idx].count === 1) {
      return {
        ...state,
        cart: {
          products: state.cart.products.filter((p) => p.id !== product.id),
        },
      };
    }
    return {
      ...state,
      cart: {
        products: state.cart.products.map((p) => {
          if (p.id === product.id) {
            return { ...p, count: p.count + 1 };
          }
          return { ...p };
        }),
      },
    };
  });
}
