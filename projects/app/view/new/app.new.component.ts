/**
 * new
 * @class: NewComponent
 * @version: 0.0.1
 * @date: 2018/07/12
 * @author: fico
 * @description:
 */
import { Component, OnInit } from '@angular/core';
import { ViewAction } from '../app.view.action';
import { UserModel } from '@user';
import { Router } from '@angular/router';
// 定义 $$ 对象
declare const $$: any;

@Component({
  selector: 'app-new',
  templateUrl: './app.new.component.html',
  styleUrls: ['./app.new.component.css']
})

export class NewComponent implements OnInit {
  newInfo: any;
  ListData: Array<any>;
  pageIndex = 1;
  isMore = true;

  constructor(
    private userModel: UserModel,
    private router: Router,
    private viewAction: ViewAction,
  ) {
    $$('html').scrollTop(0, 300);
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
      } else {
        this.ListData.push(ResultData.data.page.list);
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
    if (this.isMore) {
      this.isMore = false;
      ++this.pageIndex;
      this.getMessage(this.pageIndex);
    }
  }
  // 提升性能
  trackByFn(index, item) {
    return index; // or item.id
  }
}
