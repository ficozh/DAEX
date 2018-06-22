/**
 * 基础服务
 * @class: BasicServices
 * @version: 0.0.1
 * @date: 2018/06/07
 * @author: fico
 * @description:
 * 2018/02/09  增加 Cordova 回调方法，并在回调中设置参数，轮询检查参数的有效性，并在指定的时间后执行回调
 */
import { Injectable } from '@angular/core';
declare const upuser: any;
declare const upcore: any;
@Injectable({
  providedIn: 'root',
})
export class BasicServices {
  // 绑定事件
  initialize() {
    document.addEventListener('deviceready', () => {
      // 回调函数
      window['_cordovaIsReady'] = true;
      console.log('Cordova Ready!');
    }, false);
  }

  // 检测Cordova是否准备好了
  isReady(isTest, CallBack: Function) {
    let timeOut = 0;
    // 开启定时器
    const CordovaReadyTime = setInterval(() => {
      timeOut++;
      if (window['_cordovaIsReady'] === true || isTest || timeOut >= 30) {
        // 清除定时器
        clearInterval(CordovaReadyTime);
        CallBack(isTest);
      }
    }, 100);
  }

  // 获取用户信息
  getUserInfo(callback?: Function, error?: Function) {
    upuser.getUserInfo((ResultData) => {
      if (ResultData.retCode === '00000') {
        callback(ResultData.data);
      } else {
        error();
      }
    }, () => {
      error();
    });
  }

  // 通过调用 Cordova 签名方法 upuser.getSign 获取签名
  getSign(isTest: boolean, SignData: any, callback: Function, error?: Function) {
    if (isTest) {
      return callback();
    }
    upuser.getSign(ResultData => {
      if (ResultData.retCode === '00000') {
        callback(ResultData.retData.sign);
      } else {
        error(ResultData.retInfo);
      }
    }, () => { }, SignData);
  }

}
