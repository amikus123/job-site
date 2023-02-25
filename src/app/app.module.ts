import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { TestComponent } from './test/test.component';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { LayoutModule } from './layout/layout.module';
import { MaterialModule } from './material/material.module';

@NgModule({
  declarations: [AppComponent, TestComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireAuthModule,
    AngularFirestoreModule.enablePersistence({ synchronizeTabs: true }),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    BrowserAnimationsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    MaterialModule,
    LayoutModule,
  ],
  providers: [{ provide: FIREBASE_OPTIONS, useValue: environment.firebase }],
  bootstrap: [AppComponent],
})
export class AppModule {}
