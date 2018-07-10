/**
 * 密码
 * @class: UserCenterPasswordComponent
 * @version: 0.0.1
 * @date: 2018/06/14
 * @author: fico
 * @description:
 */
import { Component, OnInit } from '@angular/core';
import { AppParam } from '@user';
import { UserCenterAction } from '../app.userCenter.action';
import { FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-password',
  templateUrl: './app.password.component.html',
  styleUrls: ['./app.password.component.css']
})

export class UserCenterPasswordComponent implements OnInit {
  PasswordForm: any;
  confirmPasswordError: boolean;
  constructor(
    private appParam: AppParam,
    private formBuilder: FormBuilder,
    private userCenterAction: UserCenterAction,
  ) {
    this.createForm();
  }
  // 创建表单元素
  createForm() {
    this.PasswordForm = this.formBuilder.group({
      depositAddress: [''],
      status: [''],
      rule: [''],
      depositCount: [''],
      costCoin: ['']
    });
  }
  // 请求邮箱验证码
  emailCode() {
    this.userCenterAction.get('sendingMailCode', this.PasswordForm.value);
  }
  // 请求图片验证码
  validate(event) {
    event.target.src = 'http://daex.zhixingcy.com/web/api/refreshCode';
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
        this.userCenterAction.get('validMailCode', this.PasswordForm.value, (su) => {
          console.log(su);
        }, (err) => {
          console.log(err);
        });
        break;
      case 'verify':
        this.userCenterAction.get('validCode', this.PasswordForm.value, (su) => {
          console.log(su);
        }, (err) => {
          console.log(err);
        });
        break;
      case 'password':
        break;
      case 'confirmPassword':
        if (this.PasswordForm.value.password !== this.PasswordForm.value.confirmPassword) {
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

  // 组件初始化
  ngOnInit(): void {

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
    if (this.PasswordForm.valid) {
      this.userCenterAction.set('password', this.PasswordForm.value, () => {

      });
    }
  }

}
