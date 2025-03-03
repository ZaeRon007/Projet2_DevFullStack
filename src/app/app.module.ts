import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { DashboardComponent } from "./dashboard/dashboard.component";
import { HeaderComponent } from "./header/header.component";
import { DetailsComponent } from './details/details.component';

@NgModule({
  declarations: [AppComponent, 
                HomeComponent, 
                NotFoundComponent,
                DashboardComponent,
                DetailsComponent,
                HeaderComponent],
  imports: [BrowserModule,
            BrowserAnimationsModule,
            AppRoutingModule,
            HttpClientModule,
            NgxChartsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
