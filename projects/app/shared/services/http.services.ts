/**
 * http服务
 * @class: HttpServices
 * @version: 0.0.1
 * @date: 2018/06/07
 * @author: fico
 * @description:
 */
import { Injectable } from '@angular/core';
// http 模块

import { HttpOption, HandleOption } from '@int/types';

declare const $$: any;

@Injectable({
 providedIn: 'root',
})
export class HttpServices {

    constructor(
    ) {
    }

    HTTP(options: HttpOption, callback: (Val: HandleOption) => void ) {
        const that = this;
        const _Result_: HandleOption = {
            'type': 'success',
            'name': options.name,
            'isCallback': options.isCallback,
            'result': '',
            'callback': options.callback,
            'error': options.error
        };
        /* if (this.appParam.isTestParam) {
            $$.get(window.location.origin + '/assets/test.json', function(httpData) {
                httpData = JSON.parse(httpData);
                _Result_.result = httpData[options.name];
                callback(_Result_);
            });
            return;
        } */
        if (options.name === 'upload') {
            // 创建一个表单参数
            const fromObj = new FormData();
            // 获取图片对象
            const files = options.httpBody.file[0];
            // 将图片对象 添加进待上传参数中
            fromObj.append('file', files);
            $$.ajax({
              url: options.url, // 上传的路径
              type: 'POST',
              data: fromObj, // 上传的方式
              contentType: false, // 如果是传图片则这俩项需要为false
              processData: false, // 如果是传图片则这俩项需要为false
              success: function (httpData) {
                _Result_.result = httpData;
                callback(_Result_);
              }
            });
        } else {
            console.log(options.name + '请求post接口');
            $$.ajax({
                url: options.url, // 上传的路径
                type: 'POST',
                data: options.httpBody, // 上传的方式
                // contentType: 'application/json;charset=utf-8', // 如果是传图片则这俩项需要为false
                // processData: false, // 如果是传图片则这俩项需要为false
                success: function (httpData) {
                  _Result_.result = httpData;
                  callback(_Result_);
                },
                error: function(err, textStatus ) {
                    console.log('textStatus=' + textStatus);
                    _Result_.type = 'error';
                    _Result_.result = err;
                    callback(_Result_);
                }
              });
            /* that.http.post<ResponseResult>(options.url, options.httpBody, that.httpOptions).subscribe(
                httpData => {// 成功
                    _Result_.result = httpData;
                    callback(_Result_);
                },
                err => {// 失败
                    _Result_.type = 'error';
                    _Result_.result = err;
                    callback(_Result_);
                }
            ); */
        }
    }
}
