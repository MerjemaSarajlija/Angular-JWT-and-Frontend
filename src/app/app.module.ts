import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// used to create fake backend

import { AppComponent } from './app.component';
import { appRoutingModule } from './app.routing';

import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register/register.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {MatDialogModule} from  '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {NgbModal, ModalDismissReasons, NgbModalConfig, NgbModalModule} from '@ng-bootstrap/ng-bootstrap';
import { TransactionComponent } from './transaction/transaction.component';
import { ChartsModule } from 'ng2-charts';
import { BarChartComponent } from './bar-chart/bar-chart.component';

@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        appRoutingModule, 
        MatDialogModule
,      BrowserAnimationsModule,
        NgbModalModule,
        ChartsModule
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        TransactionComponent,
        BarChartComponent,
    ],
    entryComponents: [  TransactionComponent, HomeComponent],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        NgbModalConfig,
        NgbModal
    ],
    bootstrap: [AppComponent],
    exports:[]
})
export class AppModule { }
