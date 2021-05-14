import { Store } from '@ngrx/store';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CommentsResponse } from "../models/comments.interface";
import { AppState } from '../store';
import { selectFirstComment } from '../selectors/comments.selector';
import { concatMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({providedIn:'root'})
export class CommentsService{
    constructor(private http: HttpClient,private store : Store<AppState>){}

    comments(){
        return this.http.get<CommentsResponse[]>('https://jsonplaceholder.typicode.com/comments');
    }

    getComment(){        
        return this.http.get<CommentsResponse>('https://jsonplaceholder.typicode.com/comments?postId=1');
    }

    /**
     * get first record from the store and use the postid to get the comments of that post
     * to do that, we're using a store selector then we use pipe to chain observable(httpCLient)
     * we can use this approach when we need to get a record from the store and use that record to compose our payload or parameters for our http actions.
     * @returns Observable<Comments[]>
     */
    getCommentsWithParameterComingFromStoreUsingSelector() : Observable<CommentsResponse[]>{      
        let firstRecord = this.store.select(selectFirstComment);
        return firstRecord.pipe(concatMap(comment=>this.http.get<CommentsResponse[]>('https://jsonplaceholder.typicode.com/comments?postId='+comment.postId)))        
    }
}