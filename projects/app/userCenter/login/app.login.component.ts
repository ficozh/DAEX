/**
 * 登录页面
 * @class: UserCenterLoginComponent
 * @version: 0.0.1
 * @date: 2018/06/14
 * @author: fico
 * @description:
 */
import { Component, OnInit } from '@angular/core';
import { UserModel } from '@user';
import { UserCenterAction } from '../app.userCenter.action';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './app.login.component.html',
  styleUrls: ['./app.login.component.css']
})

export class UserCenterLoginComponent implements OnInit {
  LoginForm: any;
  constructor(
    private userModel: UserModel,
    private userCenterAction: UserCenterAction,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.createForm();
  }

  // 提升性能
  trackByFn(index, item) {
    return index; // or item.id
  }
  // 组件初始化
  ngOnInit(): void {

  }
  // 创建表单元素
  createForm() {
      this.LoginForm = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]]
      });
  }
  // 提交表单函数
  postDate() {
      /**
       * valid:是否有效
       * invalid:无效
       * dirty:脏
       * status:状态
       * errors:显示错误
       */
    if (this.LoginForm.valid) {
      this.userCenterAction.set('login', this.LoginForm.value, (ResultData) => {
        window.sessionStorage.setItem('tokenId', ResultData.data.tokenId);
        window.sessionStorage.setItem('isLogin', 'true');
        window.sessionStorage.setItem('email', this.LoginForm.value.email);
        this.userModel.user.tokenId = ResultData.data.tokenId;
        this.userModel.user.email = this.LoginForm.value.email;
        this.userModel.isLogin = true;
        this.router.navigate(['userCenter/index']);
      });
    }
  }
}
