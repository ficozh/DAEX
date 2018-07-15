/**
 * foreign 组件
 * @class: AppForeignComponent
 * @version: 0.0.1
 * @date: 2018/06/25
 * @author: fico
 * @description:
 */
import { Component, OnInit } from '@angular/core';
import { ViewAction } from 'app/view/app.view.action';
import { UserModel } from '@user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-foreign',
  templateUrl: './app.foreign.html',
  styleUrls: ['./app.foreign.css']
})

export class AppForeignComponent implements OnInit {
  ListData: Array<any>;
  pageIndex = 1;
  isMore = true;
  constructor(
    private viewAction: ViewAction,
    private userModel: UserModel,
    private router: Router,
  ) {
  }

  getMessage(index) {
    this.viewAction.get('message', {
      'limit': '10',
      'order': 'desc',
      'sidx': '1',
      'page': index
    }, (ResultData) => {
      this.isMore = true;
      if (index === 1) {
        this.ListData = ResultData.data.page.list;
      }
    });
  }
  // 组件初始化
  ngOnInit(): void {
    this.getMessage(this.pageIndex);
  }

  details(code) {
    this.userModel.newId = code;
    window.sessionStorage.setItem('newId', code);
    this.router.navigate(['view/newDetails']);
  }

  more() {
    this.router.navigate(['view/new']);
    /* if (this.isMore) {
      this.isMore = false;
      ++this.pageIndex;
      this.getMessage(this.pageIndex);
    } */
  }
  // 提升性能
  trackByFn(index, item) {
    return index; // or item.id
  }

}
