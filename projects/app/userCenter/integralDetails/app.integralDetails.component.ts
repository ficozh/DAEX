/**
 * 积分
 * @class: UserCenterintegralDetailsComponent
 * @version: 0.0.1
 * @date: 2018/07/13
 * @author: fico
 * @description:
 */
import { Component, OnInit } from '@angular/core';
import { UserModel } from '@user';
import { UserCenterAction } from '../app.userCenter.action';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
declare const $$: any;

@Component({
  selector: 'app-integraldetails',
  templateUrl: './app.integralDetails.component.html',
  styleUrls: ['./app.integralDetails.component.css']
})

export class UserCenterintegralDetailsComponent implements OnInit {
  EXCHANGE: boolean;
  integral;
  ExchangeForm: any;
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
    this.integral = this.userModel.user.integral;
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
