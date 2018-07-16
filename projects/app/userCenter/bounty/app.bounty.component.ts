/**
 * FAQ
 * @class: BountyComponent
 * @version: 0.0.1
 * @date: 2018/07/09
 * @author: fico
 * @description:
 */
import { Component, OnInit } from '@angular/core';
import { UserCenterAction } from '../app.userCenter.action';
// 定义 $$ 对象
declare const $$: any;

@Component({
  selector: 'app-bounty',
  templateUrl: './app.bounty.component.html',
  styleUrls: ['./app.bounty.component.css']
})

export class BountyComponent implements OnInit {
  bountyList: Array<any>;
  recordList: Array<any>;
  constructor(
    private userCenterAction: UserCenterAction,
  ) {
    $$('html').scrollTop(0, 300);
  }
  // 任务记录
  record() {
    this.userCenterAction.get('record', {
      // 分页大小
      'limit': '20',
      // 页数
      'page': '1',
      'subType': '0',
      'type': '1',
      // 排序方式，desc,asc两个选项
      'order': 'desc',
      // 其他条件，没有可不填
      'sidx': ''
    }, (ResultData) => {
      if (ResultData.data !== '') {
        ResultData.data.forEach(element => {
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
        this.recordList = ResultData.data;
      }
    });
  }
  // 接受任务
  save(id) {
    console.log(id);
    this.userCenterAction.set('recordSave', {'missionId': id}, () => {
      this.userCenterAction.get('mission', (ResultData) => {
        this.bountyList = ResultData.data.missions;
      });
    });
  }

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
        this.recordList = ResultData.data.exchangeVos;
      }
    });
    // 任务列表
    this.userCenterAction.get('mission', (ResultData) => {
      this.bountyList = ResultData.data.missions;
    });
    this.record();
  }

  // 提升性能
  trackByFn(index, item) {
    return index; // or item.id
  }
}
