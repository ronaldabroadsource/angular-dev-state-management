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
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCommentsTableComponent } from './pages/comments/mat-comments-table/mat-comments-table.component';
import { AppMaterialModule } from './app-material.module';
import { PlainCommentsTableComponent } from './pages/comments/plain-comments-table/plain-comments-table.component';

const routes : Routes=[
  {
    path:'mat-table', component : MatCommentsTableComponent
  },
  {
    path:'plain-table', component : PlainCommentsTableComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
@NgModule({
  declarations: [ AppComponent, CommentsComponent, MatCommentsTableComponent,PlainCommentsTableComponent ],
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
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AppMaterialModule
    
  ],
  bootstrap:[ AppComponent ]
})
export class AppModule { }
