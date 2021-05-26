import { Component, VERSION, ViewChild } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  name = 'Angular ' + VERSION.major;

  constructor(mediaObserver: MediaObserver){
    mediaObserver.asObservable().subscribe(media=>this.media=media[0].mqAlias);
  }
    title = 'ecommerce';
    showFilter = false;
    isDrawerOpened : boolean | undefined = undefined;
    menuHidden=true;
    media ='';
    private _filters = [{id:1,name:'filter1',show:true},{id:2,name:'filter2',show:false},{id:3,name:'filter3',show:false}];
  
    get filters(){
      return this._filters.filter(f=>f.show);
    }
  
    increment(){
      let filter = this._filters.find(m=>!m.show);
      if(filter){
        filter.show=true;
      }
    }
  
    removeFilter(id:number){
      this._filters.map(f=>{
        if(f.id==id){
          f.show=false;
        }
      });
    }
  
    @ViewChild('drawer' , {read:MatDrawer}) drawer : MatDrawer | undefined;
    toggle(drawer : MatDrawer){
      this.isDrawerOpened=!this.isDrawerOpened;
      drawer.toggle();
    }
}
