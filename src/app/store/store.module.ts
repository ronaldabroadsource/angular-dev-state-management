import { NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { CommentsEffects } from "./effects/comments.effects";
import { commentsFeatureKey, commentsReducers } from "./reducers/comments.reducer";

@NgModule({
    imports:[
        StoreModule.forFeature(commentsFeatureKey, commentsReducers),     
        EffectsModule.forFeature([CommentsEffects])
    ]
  })
  export class AppFeatureStoreModule{
  }
  