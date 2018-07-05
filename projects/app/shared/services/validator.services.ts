/**
 * 自定义验证服务
 * 传递的参数是当前需要验证的表单的FormControl
 * 通过传递的参数获取当前表单输入的值
 * @class: ValidatorServices
 * @version: 0.0.1
 * @date: 2018/07/05
 * @author: fico
 * @description:
 */
import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
@Injectable({
  providedIn: 'root',
})
export class ValidatorServices {
  // 绑定事件
  mobileValidator(control: FormControl): any {
    console.dir(control);
    // 获取到输入框的值
    const val = control.value;
    // 手机号码正则
    const mobieReg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
    const result = mobieReg.test(val);
    return result ? null : { mobile: { info: '手机号码格式不正确' } };
  }

  // 定义一个密码组的验证方法
  passValidator(controlGroup: FormGroup): any {
    // 获取密码输入框的值
    const pass1 = controlGroup.get('password').value as FormControl;
    const pass2 = controlGroup.get('confirmPassword').value as FormControl;
    console.log('你输入的值:', pass1, pass2);
    const isEqule: boolean = (pass1 === pass2);
    return isEqule ? null : { passValidator: { info: '两次密码不一致' } };
  }

}
