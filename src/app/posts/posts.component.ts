import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CardComponent } from '../card/card.component';

import { PagedataService } from '../services/pagedata.service';
import { WebclientService } from '../services/webclient.service';
import { SpinnerService } from "../services/spinner.service";

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  public posts = [];
  private _path: string;
  errorMessage: any;
  numberOfPages: number = 0;
  currentPage: number;
  noData: boolean = false;
  nextNumber: number;
  previousNumber: number;
  flytype: string = 'in';
  constructor(private spinner: SpinnerService, private postService: WebclientService, private route: ActivatedRoute, private router: Router, private pageData: PagedataService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.currentPage = params['id'];
      this.flyInOutType();
      if (this.currentPage && !isNaN(this.currentPage)) {
        this.nextNumber = parseInt(this.currentPage.toString()) + 1;
        this.previousNumber = parseInt(this.currentPage.toString()) - 1;
        this._path = this.route.snapshot.url.slice(0, this.route.snapshot.url.length - 1).join('') + this.currentPage;
        console.debug(this._path + "on change...!");
        var data = this.pageData.getPageData(this._path);
        if (data) {
          console.debug("Data Present..!");
          this.posts = data.posts;
          this.noData = false;
          this.numberOfPages = data.totalPages;
        } else {
          this.posts = [];
          if (this.numberOfPages != 0 && this.numberOfPages < this.currentPage && this.currentPage <= 0) {
            this.noData = true;
          } else {
            this.spinner.start();
            this.callGetPosts(this.currentPage as number);
          }
        }
      } else {
        this.router.navigate(["/search"]);
      }
    });
  }

  ngOnDestroy() {
    console.debug("POSTS destory...!");
  }

  callGetPosts(pageno: number) {
    console.debug("Calling..!");
    this.postService.getPosts(pageno)
      .subscribe(
      data => {
        this.numberOfPages = data.totalPages;
        if (data.error || this.currentPage > this.numberOfPages) {
          this.noData = true;
        } else {
          this.noData = false;
          this.posts = data.posts;
          this.pageData.setPageData(this._path, data);
        }
      },
      error => {this.errorMessage = <any>error; this.noData = true;},
      () => {
        console.debug("Do something here...");
      }
      );
  }



  flyInOutType() {
    this.flytype = "in";
    if (this.previousNumber == this.currentPage) {
      this.flytype = "out";
    } else if (this.nextNumber == this.currentPage) {
      this.flytype = "in";
    }
  }
}
