import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


import { CardComponent } from '../card/card.component';
import { PagedataService } from '../services/pagedata.service';
import { WebclientService } from '../services/webclient.service'
import { SpinnerService } from "../services/spinner.service"

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  keyword: string = "";
  currentWord: string = "";
  dividerColor: string = "primary";
  hintLabelText: string = "Type search text and press enter";
  public posts = [];
  private _path: string;
  errorMessage: any;
  numberOfPages: number = 0;
  currentPage: number;
  noData: boolean = true;
  nextNumber: number;
  previousNumber: number;
  SEARCH_WORD_MIN_LENGTH: number = 3;
  flytype: string = 'in';
  constructor(private spinner: SpinnerService, private postService: WebclientService, private route: ActivatedRoute, private router: Router, private pageData: PagedataService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['keyword'] && (params['keyword'].replace(/^\s+|\s+$/g, "")).length >= this.SEARCH_WORD_MIN_LENGTH) {
        this.keyword = params['keyword'];
        this.currentWord = params['keyword'];
      } else {
        this.noData = true;
        return;
      }
      this.currentPage = params['id'];
      this.flyInOutType();
      if (this.currentPage && !isNaN(this.currentPage)) {
        this.nextNumber = parseInt(this.currentPage.toString()) + 1;
        this.previousNumber = parseInt(this.currentPage.toString()) - 1;
        this._path = this.route.snapshot.url.slice(0, this.route.snapshot.url.length - 2).join('') + this.currentWord + this.currentPage;
        console.debug(this._path + "on change...!");
        var data = this.pageData.getPageData(this._path);
        if (data) {
          console.debug("Data Present..!");
          this.posts = data.posts;
          this.noData = false;
          this.numberOfPages = data.totalPages;
        } else {
          this.posts = [];
          if (this.numberOfPages != 0 && this.numberOfPages < this.currentPage) {
            this.noData = true;
          } else {
            this.spinner.start();
            this.searchPostsWithWord(this.currentWord, this.currentPage as number);
          }
        }
      } else {
        this.noData = true;
      }

    });
  }
  onChange(newValue) {
    this.keyword = newValue;
    if ((this.keyword.replace(/^\s+|\s+$/g, "")).length < this.SEARCH_WORD_MIN_LENGTH) {
      this.dividerColor = "warn";
      this.hintLabelText = "Please enter minimum " + this.SEARCH_WORD_MIN_LENGTH + " characters";
    } else {
      this.dividerColor = "primary";
      this.hintLabelText = "Type search text and press enter";
    }
  }
  startSearch(e) {
    if ((this.keyword.replace(/^\s+|\s+$/g, "")).length < this.SEARCH_WORD_MIN_LENGTH || this.currentWord == this.keyword) {
      return;
    }
    this.router.navigate(["/search/" + this.keyword.replace(/^\s+|\s+$/g, "") + "/1"]);
  }



  searchPostsWithWord(word: string, pageno: number) {
    console.debug("Calling..!");
    this.postService.searchPostsWithWord((word.replace(/^\s+|\s+$/g, "")), pageno)
      .subscribe(
      data => {
        this.numberOfPages = data.totalPages || 0;
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
