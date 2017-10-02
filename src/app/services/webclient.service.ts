import { Injectable } from '@angular/core';
import { Http, Response, Jsonp } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
//import { Observable }     from 'rxjs/Rx';
import {SpinnerService} from "./spinner.service"


import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

@Injectable()
export class WebclientService {
  private POSTS_URL = "http://dev3.shareourideas.com/words/api/posts.php";
  private SEARCH_URL = "http://dev3.shareourideas.com/words/api/search.php";
  private PAGE_SIZE = 12;
  constructor(private jsop: Jsonp,private http: Http, public spinner: SpinnerService) { }

  getPosts(pageno: number):Observable<any>{
    console.debug("in getPosts..!");
    this.spinner.start();
    return this.jsop.get(this.POSTS_URL + "?pageno="+pageno+"&pagesize="+this.PAGE_SIZE+"&callback=JSONP_CALLBACK")
                    .map(this.extractData)
                    .catch(this.handleError)
                    .finally(() => {this.spinner.stop();})
  }

  searchPostsWithWord(word:string, pageno: number):Observable<any>{
    console.debug("in searchPosts..!");
    this.spinner.start();
    return this.jsop.get(this.SEARCH_URL + "?pageno="+pageno+"&word="+word.replace(/ /g, "%20")+"&pagesize="+this.PAGE_SIZE+"&callback=JSONP_CALLBACK")
                    .map(this.extractData)
                    .catch(this.handleError)
                    .finally(() => {this.spinner.stop();})
  }

/**
 * Response catch here and format
 */
  private extractData(res: Response) {
    let body = res.json();
    console.debug("Success..!");
    return body || {};
  }
/**
 * Error handle here
 */
    private handleError (error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}