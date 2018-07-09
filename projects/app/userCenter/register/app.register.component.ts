/**
 * 注册
 * @class: UserCenterRegisterComponent
 * @version: 0.0.1
 * @date: 2018/06/14
 * @author: fico
 * @description:
 */
import { Component, OnInit } from '@angular/core';
import { UserCenterAction } from '../app.userCenter.action';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './app.register.component.html',
  styleUrls: ['./app.register.component.css']
})

export class UserCenterRegisterComponent implements OnInit {
  RegisterForm: any;
  confirmPasswordError: boolean;
  emailError: boolean;
  constructor(
    private userCenterAction: UserCenterAction,
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
    // 请求图片验证码
  }
  // 请求图片验证码
  validate(event) {
    event.target.src = 'http://daex.zhixingcy.com/web/api/refreshCode';
  }
  // 请求邮箱验证码
  emailCode() {
    this.userCenterAction.get('sendingMailCode', this.RegisterForm.value);
  }
  // 验证
  registerValid(name) {
    switch (name) {
      case 'email':
          const _email_ = this.RegisterForm.get('email').valid;
          if (_email_) {
            this.userCenterAction.get('emailValid', this.RegisterForm.value, () => {
            });
          }
          break;
      case 'emailCode':
          this.userCenterAction.get('validMailCode', this.RegisterForm.value, (su) => {
            console.log(su);
          }, (err) => {
            console.log(err);
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
    this.RegisterForm = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        emailCode: [''],
        verify: [''],
        password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
        inviteCode: ['']
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
    if (this.RegisterForm.valid) {
      this.userCenterAction.set('register', this.RegisterForm.value, () => {

      });
    }
  }

}
