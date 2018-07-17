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
declare const $$: any;

@Component({
  selector: 'app-login',
  templateUrl: './app.login.component.html',
  styleUrls: ['./app.login.component.css']
})

export class UserCenterLoginComponent implements OnInit {
  LoginForm: any;
  RegisterForm: any;
  LoginStatus = true;
  // 时间戳
  readonly timestamp = String(+new Date) || '1521715375267';
  confirmPasswordError: boolean;
  emailError: boolean;
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
  switch(index) {
    this.LoginStatus = index === 1 ? true : false;
  }

  // 组件初始化
  ngOnInit(): void {

  }
  // 请求图片验证码
  validate(event) {
    event.target.src = 'http://daex.zhixingcy.com/web/api/refreshCode';
  }
  // 请求邮箱验证码
  emailCode() {
    this.userCenterAction.get('sendingMailCode', this.RegisterForm.value, () => {
      $$.alert('', '<span style="line-height:80px;">Successful Operation</span>', function() {}, ['<span class="Btn BtnSmall BtnPrimary">Confirm</span>']);
    }, (error) => {
      $$.alert('', '<span style="line-height:80px;">' + error.msg + '</span>', function() {}, ['<span class="Btn BtnSmall BtnPrimary">Confirm</span>']);
    });
  }
  // 验证
  registerValid(name) {
    switch (name) {
      case 'email':
          /* const _email_ = this.RegisterForm.get('email').valid;
          if (_email_) {
            this.userCenterAction.get('emailValid', this.RegisterForm.value, () => {
            });
          } */
          break;
      case 'emailCode':
          this.userCenterAction.get('validMailCode', this.RegisterForm.value, (su) => {
            console.log(su);
          }, (error) => {
            $$.alert('', '<span style="line-height:80px;">' + error.msg + '</span>', function() {}, ['<span class="Btn BtnSmall BtnPrimary">Confirm</span>']);
          });
          break;
      case 'verify':
          this.userCenterAction.get('validCode', this.RegisterForm.value, (su) => {
            console.log(su);
          }, (err) => {
            console.log(err);
          });
          break;
      case 'password':
          break;
      case 'confirmPassword':
            if (this.RegisterForm.value.password !== this.RegisterForm.value.confirmPassword) {
              this.confirmPasswordError = true;
            } else {
              this.confirmPasswordError = false;
            }
            break;
      case 'inviteCode':
          break;
      default:
          return false;
    }
  }
  // 创建表单元素
  createForm() {
      this.LoginForm = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]]
      });
      this.RegisterForm = this.formBuilder.group({
        email: [this.userModel.email, [Validators.required, Validators.email]],
        emailCode: [''],
        tag: this.timestamp,
        verify: [''],
        password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
        inviteCode: ['']
    });
  }
  // 提交表单函数
  LoginSubmit() {
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

  // 提交表单函数
  RegisterSubmit() {
    /**
     * valid:是否有效
     * invalid:无效
     * dirty:脏
     * status:状态
     * errors:显示错误
     */
  if (this.RegisterForm.valid) {
    this.userCenterAction.set('register', this.RegisterForm.value, () => {
      $$.alert('', '<span style="line-height:80px;">Successful Operation</span>', function() {}, ['<span class="Btn BtnSmall BtnPrimary">Confirm</span>']);
    }, (error) => {
      $$.alert('', '<span style="line-height:80px;">' + error.msg + '</span>', function() {}, ['<span class="Btn BtnSmall BtnPrimary">Confirm</span>']);
    });
  }
}
}
