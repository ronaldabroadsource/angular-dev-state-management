import { createEntityAdapter, EntityState, Update } from "@ngrx/entity";
import { createReducer, on } from "@ngrx/store";
import { CommentsResponse } from "../../models/comments.interface";
import { CommentsActions } from '../../store/action.types';

export const commentsFeatureKey = 'comments';

export interface CommentStateEntity extends EntityState<CommentsResponse>{};


export const commentsAdapter =createEntityAdapter<CommentsResponse>({
    selectId: comments=>comments.id
});


export const { selectIds, selectAll } = commentsAdapter.getSelectors();


export interface CommentState{
    comments : CommentStateEntity;
    postsComments : CommentStateEntity;
    sampleComments : CommentsResponse[]; 
}

const initialState : CommentState={
    comments:commentsAdapter.getInitialState(),
    postsComments:commentsAdapter.getInitialState(),
    sampleComments:[]
}

export const commentsReducers = createReducer(initialState,
    on(CommentsActions.loadCommentsSuccess,(state,action)=>{      
        return {
            ...state, comments : commentsAdapter.setAll(action.comments,state.comments)
        }
    }),
    on(CommentsActions.loadPostsCommentsSuccess,(state,action)=>{      
        return {
            ...state, postsComments : commentsAdapter.upsertMany(action.comments,state.postsComments)
        }
    }),
    on(CommentsActions.loadPostsSampleCommentsSuccess,(state,action)=>{      
        return {
            ...state, sampleComments : action.sampleComments
        }
    }),
    on(CommentsActions.updateComment,(state,action)=>{              
        return {
            ...state, comments : commentsAdapter.updateOne(action.update,state.comments)
        }
    })
    
);