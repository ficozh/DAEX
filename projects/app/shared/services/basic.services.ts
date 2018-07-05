/**
 * 基础服务
 * @class: BasicServices
 * @version: 0.0.1
 * @date: 2018/06/07
 * @author: fico
 * @description:
 */
import { Injectable } from '@angular/core';
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

}
