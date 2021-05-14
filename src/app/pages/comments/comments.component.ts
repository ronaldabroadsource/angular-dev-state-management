import { loadComments, loadPostSampleComment, updateComment } from './../../store/actions/comments.actions';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store';
import { Observable } from 'rxjs';
import { CommentsResponse } from '../../models/comments.interface';
import { hasComments, selectComments, selectFirstComment, selectPost, selectSampleComments } from '../../selectors/comments.selector';
import { Update } from '@ngrx/entity';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  constructor(private store : Store<AppState>) { }
  comments$ : Observable<CommentsResponse[]>;
  sampleComments$ : Observable<CommentsResponse[]>;
  hasComments$ : Observable<boolean>;
  comment$ : Observable<CommentsResponse>;
  textSearch : string = '';
  commentId : number;
  body : string;

  search(){
    this.comments$ = this.store.select(selectComments).pipe(map(data=>{
      console.log(data);
      let records =  data.filter(f=>f.body.includes(this.textSearch));
      console.log(records);
      return records;
    }));    
  }
  ngOnInit(): void {
    //get all comments
  
    this.comments$ = this.store.select(selectComments);

    //get sample comments 
    this.sampleComments$ = this.store.select(selectSampleComments);
    
    this.hasComments$ = this.store.select(hasComments);

  }

  /**
   * sample usage for dispatching an action(loadComments), this does not have a corresponding reducer, but is registered in effects(comments.effects)
   * execution order -> action -> effects -> action -> reducer 
   * actual : loadComments -> effects -> loadCommentsSuccess -> reducer 
   */
  load(){
    this.store.dispatch(loadComments());
  }

   /**
   * sample usage for getting a record from store and use that record for the api to compose the payload or parameters. implementation was in the comments.effects & commentsService
   * sample usage for dispatching an action(loadPostComment), this does not have a corresponding reducer, but is registered in effects(comments.effects)
   * execution order -> action -> effects -> action -> reducer 
   * actual : loadPostComment -> effects -> loadPostsCommentsSuccess -> reducer 
   */
  loadFirstComment(){
    this.store.dispatch(loadPostSampleComment());
  }

  /**
   * sample usage : update 1 record from store
   */
  updateComment(){          
    //select specific comment
    this.comment$ = this.store.select(selectPost,{id:this.commentId});

    let update : Update<CommentsResponse>={
      id:this.commentId,
      changes:{ body:this.body}
    }
    this.store.dispatch(updateComment({update:update}));

  }

}
