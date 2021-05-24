import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { CommentsService } from "../../services/comments.service";
import { CommentsActions } from '../../store/action.types';
import { concatMap, map, catchError, switchMap, tap } from 'rxjs/operators';

@Injectable()
export class CommentsEffects{
    constructor(private actions$: Actions, private commentsService: CommentsService ){}

    /**
     * ofType -> works the same as filter, this effect will take effect if loadComments was dispatch, then executes concatMap & map
     *  
     */
    loadComments$ = createEffect(()=>{
        return this.actions$.pipe(
            ofType(CommentsActions.loadComments),
            tap(()=>console.log('dispatch')),
            concatMap(()=>this.commentsService.comments()),
            map(data =>CommentsActions.loadCommentsSuccess({comments:data}))
        )
    });

    loadFirstComment$ = createEffect(()=>{
        return this.actions$.pipe(
            ofType(CommentsActions.loadPostSampleComment),
            concatMap(()=>this.commentsService.getCommentsWithParameterComingFromStoreUsingSelector()),
            map(data =>CommentsActions.loadPostsSampleCommentsSuccess({sampleComments:data}))
        )
    });

    loadPostsComments$ = createEffect(()=>{
        return this.actions$.pipe(
            ofType(CommentsActions.loadPostsComments),
            tap(()=>console.log('dispatch')),
            concatMap((params)=>this.commentsService.postsComments(params.postsId)),
            map(data =>CommentsActions.loadPostsCommentsSuccess({comments:data}))
        )
    });

   
}   