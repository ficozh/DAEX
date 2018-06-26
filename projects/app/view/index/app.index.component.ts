/**
 * index
 * @class: IndexComponent
 * @version: 0.1.1
 * @date: 2018/02/11
 * @author: fico
 * @description:
 */
import { Component, OnInit } from '@angular/core';
import { ViewAction } from '../app.view.action';
import { UserModel } from '@user';
// 定义 $$ 对象
declare const $$: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.index.component.html',
  styleUrls: ['./app.index.component.css']
})

export class IndexComponent implements OnInit  {
  anchor = 0;
  anchorName;
  constructor(
    private userModel: UserModel,
    private viewAction: ViewAction,
  ) {
  }

  ngOnInit(): void {
    this.anchor = this.userModel.anchor;
    if (!this.userModel.anchorOffset['value']) {
      const _Name_ = ['ecosystem', 'value', 'community'];
      setTimeout(() => {
        _Name_.forEach(Itme => {
          this.userModel.anchorOffset[Itme] = $$('#' + Itme).offset().top - 45;
        });
      }, 1000);
    } else {
      $$('html').scrollTop(this.userModel.anchorOffset[this.userModel.anchorName], 300);
    }

  }
}
