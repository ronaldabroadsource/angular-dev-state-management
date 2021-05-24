import { CommentsResponse } from '../../../models/comments.interface';
import { Observable, of } from 'rxjs';
import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { CommentsTableDataSource } from './mat-comments-table-datasource';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { selectComments, selectPostsComments } from 'src/app/selectors/comments.selector';
import { loadPostsComments } from 'src/app/store/actions/comments.actions';

@Component({
  selector: 'mat-comments-table',
  templateUrl: './mat-comments-table.component.html',
  styleUrls: ['./mat-comments-table.component.css']
})
export class MatCommentsTableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<CommentsResponse>;
  dataSource: CommentsTableDataSource;
  comments$ : Observable<CommentsResponse[]>;
  ids=Array(100).fill(0).map((x,i)=>i+1);
  displayedColumns = ['id','postid','name','email','body'];

  constructor(private store : Store<AppState>) {
    this.comments$=this.store.select(selectPostsComments);
    this.dataSource = new CommentsTableDataSource(this.comments$);
  }
  load(postsId : number){
    this.store.dispatch(loadPostsComments({postsId:postsId}));
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
