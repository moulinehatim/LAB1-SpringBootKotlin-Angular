import { Component, ViewChild } from '@angular/core';
import { CatalogueService } from './services/catalogue.service';
import { Router } from '@angular/router';

import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  public categories: any;
  public currentCategory: any;

  constructor(private catalogueService: CatalogueService,
    private router: Router, private observer: BreakpointObserver) { }

  ngAfterViewInit() {
    this.observer
      .observe(['(max-width: 800px)'])
      .pipe(delay(1))
      .subscribe((res) => {
        if (res.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
        } else {
          this.sidenav.mode = 'side';
          this.sidenav.open();
        }
      });
  }

  ngOnInit(): void {
    this.getCategories();
  }

  private getCategories() {
    this.catalogueService.getResources("/categories")
      .subscribe(data => {
        // console.log("### data ###");
        // console.log(data);
        this.categories = data;
      }, error => {
        // console.log("### error ###");
        console.log(error);
      })
  }

  getProductsByCat(c: any) {
    this.currentCategory = c;
    this.router.navigateByUrl('products/2/' + c.id);
  }

  onSelectedProduct() {
    this.currentCategory = undefined;
    this.router.navigateByUrl('products/1/0');
  }
}