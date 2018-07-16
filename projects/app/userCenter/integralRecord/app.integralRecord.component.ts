/**
 * 积分
 * @class: IntegralRecordComponent
 * @version: 0.0.1
 * @date: 2018/07/13
 * @author: fico
 * @description:
 */
import { Component, OnInit } from '@angular/core';
import { UserCenterAction } from '../app.userCenter.action';

@Component({
  selector: 'app-integralrecord',
  templateUrl: './app.integralRecord.component.html',
  styleUrls: ['./app.integralRecord.component.css']
})

export class IntegralRecordComponent implements OnInit {
  EXCHANGE: boolean;
  integral;
  ExchangeForm: any;
  RecordList: any;
  constructor(
    private userCenterAction: UserCenterAction,
  ) {
  }
  // 提升性能
  trackByFn(index, item) {
    return index; // or item.id
  }
  // 组件初始化
  ngOnInit(): void {
    this.userCenterAction.get('exchangeRecordList', {
      // 分页大小
      'limit': '40',
      // 页数
      'page': '1',
      // 排序方式，desc,asc两个选项
      'order': 'desc',
      // 其他条件，没有可不填
      'sidx': ''
    }, (ResultData) => {
      if (ResultData.data !== '' && ResultData.data.exchangeVos !== '') {
        ResultData.data.exchangeVos.forEach(element => {
          const Mark = (element.email.indexOf('@') - 1) / 2;
          element.emailA = element.email.substr(0, Mark) + '****' + element.email.substr(element.email.length - Mark - 4);
          if (element.status === 0) {
            element.statusName = 'Get Mission';
          } else if (element.status === 1) {
            element.statusName = 'Accepted';
          } else if (element.status === 2) {
            element.statusName = 'Auditing';
          } else if (element.status === 3) {
            element.statusName = 'Done';
          }
        });
        this.RecordList = ResultData.data.exchangeVos;
      }
    });
  }
}
