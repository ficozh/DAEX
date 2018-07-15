/**
 * 积分
 * @class: IntegralComponent
 * @version: 0.0.1
 * @date: 2018/06/14
 * @author: fico
 * @description:
 */
import { Component, OnInit } from '@angular/core';
import { UserModel } from '@user';
import { UserCenterAction } from '../app.userCenter.action';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
declare const $$: any;

@Component({
  selector: 'app-integral',
  templateUrl: './app.integral.component.html',
  styleUrls: ['./app.integral.component.css']
})

export class IntegralComponent implements OnInit {
  EXCHANGE: boolean;
  integral;
  ExchangeForm: any;
  integralList: any;
  constructor(
    private userModel: UserModel,
    private userCenterAction: UserCenterAction,
    private formBuilder: FormBuilder
  ) {
    this.createForm();
  }
   // 创建表单元素
   createForm() {
    this.ExchangeForm = this.formBuilder.group({
      depositAddress: [''],
      status: [''],
      rule: [''],
      depositCount: [''],
      costCoin: ['']
    });
}
  // 提升性能
  trackByFn(index, item) {
    return index; // or item.id
  }
  // 组件初始化
  ngOnInit(): void {
    if ( this.userModel.user.integral ) {
      this.integral = this.userModel.user.integral;
    } else {
      this.userCenterAction.get('coinCount',  (ResultData) => {
        this.integral = ResultData.data.coinCount;
        this.userModel.user.integral = ResultData.data.coinCount;
      });
    }
    // 任务列表
    this.userCenterAction.get('mission', (ResultData) => {
      this.integralList = ResultData.data.missions;
    });
  }
  exchange() {
    this.EXCHANGE = true;
  }
  cancel() {
    this.EXCHANGE = false;
  }
  confirm() {
    this.EXCHANGE = false;
    this.userCenterAction.set('saveExchangeRecord', this.ExchangeForm.value, () => {
    });
  }
}
