import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ProductService} from '../services/product.service';
import {Product} from '../model/product.model';
import {Observable} from 'rxjs';


@Component({
  selector: 'app-products',
  standalone: false,
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  public products: Array<Product> = [];
  public keyword: string ="";

  constructor(private productService: ProductService) {
  }

  ngOnInit() {
    this.getProducts();
    //this.products$ = this.productService.getProducts();
  }

  getProducts() {
    this.productService.getProducts(1, 4)
      .subscribe({
        next: data => {
          this.products = data;
        },
        error: err => {
          console.log(err);
        }
      });

    //this.products$ = this.productService.getProducts();
  }


  handleCheckProduct(product: Product) {
    //On utilise put pour mettre à jour tout les attributs d'un produit & patch qu'un seul attribut
    this.productService.checkProduct(product) //Template String ${product.id}
      .subscribe({
        next: updatedProduct => {
          product.checked = !product.checked;
          //this.getProducts();
        }
      });
  }

  handleDelete(product: Product) {
    if (confirm("Are you sure you want to delete this product?"))
    this.productService.deleteProduct(product)
      .subscribe({
        next: value => {
          //this.getProducts();
          this.products = this.products.filter(p => p.id != product.id);
        }
      })
  }
  searchProducts() {
    this.productService.searchProducts(this.keyword).subscribe({
      next : value => {
        this.products = value;
      },
      error: err => {
        console.error("Search error:", err);
      }
    });
  }
}
// the uncommented code is the same as the commented code
// but with a different approach to not get all the attributes
// of the products again just the attribute checked that was updated (patch)
