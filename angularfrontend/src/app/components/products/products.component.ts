import { Component, OnInit } from '@angular/core';
import { CatalogueService } from '../../services/catalogue.service'
import { ActivatedRoute, NavigationEnd, Route, Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products: any;

  constructor(
    public catalogueService: CatalogueService, 
    private router: Router, 
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    // this.getProducts();
    this.router.events.subscribe(value=>{
      //!TODAAA what is that
      if(value instanceof NavigationEnd){
        let url = value.url;
        console.log(url);

        let p1 = this.route.snapshot.params['p1'];

        if(p1==1){
          this.getProducts("/products");
        }else if (p1==2){
          let idCat=this.route.snapshot.params['p2'];
          this.getProducts("/categories/"+ idCat +"/products/");
        }
      }
    });
    let p1 = this.route.snapshot.params['p1'];
    if(p1==1){
      this.getProducts("/products");
    }
  }

  private getProducts(url:string) {
    //"/products"
    this.catalogueService.getResources(url)
      .subscribe(data => {
        this.products = data;
        // console.log("###############");
        // console.log(data);
      }, error => {
        console.log(error);
      })
  }
}
