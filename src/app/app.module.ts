import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { reducers } from './store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { metaReducers } from '../app/store'
import { EffectsModule } from '@ngrx/effects';
import { CommentsComponent } from './pages/comments/comments.component';
import { AppFeatureStoreModule } from './store/store.module';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [ AppComponent, CommentsComponent ],
  imports:[ 
    BrowserModule, 
    FormsModule, 
    StoreModule.forRoot(reducers, { metaReducers, runtimeChecks:{
    strictActionImmutability:true,
    strictActionSerializability:true,
    strictStateImmutability:true,
    strictStateSerializability:true
    } }), !environment.production ? StoreDevtoolsModule.instrument() : [] ,
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    AppFeatureStoreModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  bootstrap:[ AppComponent ]
})
export class AppModule { }
