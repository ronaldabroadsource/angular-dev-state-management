import { Update } from '@ngrx/entity';
import { createAction, props } from "@ngrx/store";
import { CommentsResponse } from "../../models/comments.interface";

export const loadComments = createAction("[Comments Page] Load Comments");

export const loadCommentsSuccess = createAction("[Comments Page] Load Comments Success",props<{ comments : CommentsResponse[]}>());

export const loadPostSampleComment = createAction("[Comments Page] Load Post's comments");

export const loadPostsSampleCommentsSuccess = createAction("[Comments Page] Load Post Comments Success",props<{ sampleComments : CommentsResponse[]}>());

export const updateComment = createAction("[Comments Page] Update Comment",props<{update : Update<CommentsResponse>}>());