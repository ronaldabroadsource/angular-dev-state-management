
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { commentsFeatureKey, CommentState, selectAll } from "../store/reducers/comments.reducer";

export const selectCommentsState = createFeatureSelector<CommentState>(commentsFeatureKey);

export const selectComments = createSelector(selectCommentsState,(state)=>selectAll(state.comments));

export const selectPostsComments = createSelector(selectCommentsState,(state)=>selectAll(state.postsComments));

export const selectFirstComment = createSelector(selectComments,(state)=>state[0]);

export const hasComments = createSelector(selectComments,(state)=>state.length>0);

export const selectSampleComments = createSelector(selectCommentsState,(state)=>state.sampleComments);

export const selectPost = createSelector(selectCommentsState,(state:CommentState,props)=>state.comments.entities[props.id]);