import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DriverRoutesComponent } from './driver-routes/driver-routes.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PostsComponent } from './posts/posts.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UsersComponent } from './users/users.component';
import { DetailsComponent } from './details/details.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { RouteOrdersComponent } from './route-orders/route-orders.component';
import { MatButtonModule } from '@angular/material';
import { MatTableModule, MatPaginatorModule, MatSortModule } from '@angular/material';
import { MatListModule, MatToolbarModule, MatSidenavModule, MatIconModule } from '@angular/material';
import { MatCheckboxModule, MatInputModule, MatSelectModule, } from '@angular/material';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OrderDetailsComponent } from './order-details/order-details.component';

import { Globals } from './globals';
import { TestapiComponent } from './testapi/testapi.component';
import { JwtInterceptor } from 'src/app/_helpers/jwt.interceptor';
import { ErrorInterceptor } from 'src/app/_helpers/error.interceptor';
import { LoginComponent } from './login/login.component';
import { AlertComponent } from './alert/alert.component';
import { AlertService } from './_services/alert.service';
import { AuthenticationService } from './_services/authentication.service';
import { FooterComponent } from './footer/footer.component';
import { SignaturePadModule } from 'angular2-signaturepad';
import { SignatureComponent } from './signature/signature.component';
import { RejectproductsComponent } from './rejectproducts/rejectproducts.component';
import { DeliveryComponent } from './delivery/delivery.component';
import { NotifierModule, NotifierOptions } from 'angular-notifier';

const customNotifierOptions: NotifierOptions = {
  position: {
  horizontal: {
  position: 'middle',
  distance: 12,
  },
  vertical: {
  position: 'top',
  distance: 12,
  gap: 10
  }
},
  theme: 'material',
  behaviour: {
    autoHide: 2000,
    onClick: 'hide',
    onMouseover: 'pauseAutoHide',
    showDismissButton: true,
    stacking: 4
  },
  animations: {
    enabled: true,
    show: {
      preset: 'slide',
      speed: 300,
      easing: 'ease'
    },
    hide: {
      preset: 'fade',
      speed: 300,
      easing: 'ease',
      offset: 50
    },
    shift: {
      speed: 300,
      easing: 'ease'
    },
    overlap: 150
  }
};


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PostsComponent,
    UsersComponent,
    DetailsComponent,
    DriverRoutesComponent,
    RouteOrdersComponent,
    OrderDetailsComponent,
    TestapiComponent,
    LoginComponent,
    AlertComponent,
    FooterComponent,
    SignatureComponent,
    RejectproductsComponent,
    DeliveryComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    NgbModule.forRoot(),
    SignaturePadModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCheckboxModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    NotifierModule.withConfig(customNotifierOptions),
  //   AgmCoreModule.forRoot({
  //     // tslint:disable-next-line:max-line-length
  //     apiKey: 'AIzaSyCdiuA3wZZ17bbnUYj_lU_UHlJal6GqS9g'
  //   }),
  //   AgmDirectionModule      // agm-direction
  // //  $,
  ],
  providers: [
    Globals,
    AlertService,
    AuthenticationService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
