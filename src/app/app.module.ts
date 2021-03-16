import { BrowserModule } from '@angular/platform-browser';
import { NgModule, enableProdMode } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule,JsonpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { AppComponent } from './app.component';
import {QrcodeComponent} from "./qrcode.component";
import { environment } from '../environments/environment';
import {SpinnerService} from "./services/spinner.service"
import { PagedataService } from './services/pagedata.service';
import { WebclientService } from './services/webclient.service';

import 'hammerjs';
import { RidhtmlPipe } from './pipes/ridhtml.pipe';
import { CardComponent } from './card/card.component';
import { PostsComponent } from './posts/posts.component';
import { SearchComponent } from './search/search.component';
import { EllipsizePipe } from './pipes/ellipsize.pipe';

const appRoutes: Routes = [
  {
    path: 'posts',
    redirectTo: '/posts/page/1',
    pathMatch: 'full'
  },
  { path: '',
    redirectTo: '/posts/page/1',
    pathMatch: 'full'
  },
  { path: 'posts/page/0',
    redirectTo: '/posts/page/1',
    pathMatch: 'full'
  },
  { path: 'posts/page',
    redirectTo: '/posts/page/1',
    pathMatch: 'full'
  },
  { path: 'posts/page/:id',      component: PostsComponent },
  { path: 'search',      component: SearchComponent },
  { path: 'search/:keyword/:id',      component: SearchComponent },
  { path: '**', component: PostsComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    RidhtmlPipe,
    CardComponent,
    PostsComponent,
    SearchComponent,
    EllipsizePipe,
    QrcodeComponent
  ],
  entryComponents:[QrcodeComponent],
  imports: [
    MaterialModule.forRoot(),
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    RouterModule.forRoot(appRoutes, {useHash: true})
  ],
  providers: [SpinnerService, PagedataService, WebclientService],
  bootstrap: [AppComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
