import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { DetailsComponent } from './details/details.component';
import { PostsComponent } from './posts/posts.component';
import { DriverRoutesComponent } from './driver-routes/driver-routes.component';
import { RouteOrdersComponent } from './route-orders/route-orders.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { TestapiComponent } from './testapi/testapi.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './_guards/auth.guard';


const routes: Routes = [
  {path: '', component: DriverRoutesComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent },
  {path: 'users', component: UsersComponent, canActivate: [AuthGuard]},
  {
    path: 'details/:id',
    component: DetailsComponent,    
    },

  {
    path: 'posts',
    component: PostsComponent,    
    },

  {
    path: 'driver-routes',
    component: DriverRoutesComponent,    
    canActivate: [AuthGuard]},
   
  {
    path: 'route-Orders/:routeName',
    component: RouteOrdersComponent,    
  },
  {
    path: 'order-details/:DocumentId',
    component: OrderDetailsComponent,    
  },
  {
    path: 'testapi',
    component: TestapiComponent,    
  },

  { path: '**', redirectTo: '' }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { display = true;}