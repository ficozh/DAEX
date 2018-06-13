/**
 * http服务
 * @class: HttpServices
 * @version: 0.0.1
 * @date: 2018/06/07
 * @author: fico
 * @description:
 * 2018/02/09  增加 Cordova 回调方法，并在回调中设置参数，轮询检查参数的有效性，并在指定的时间后执行回调
 */
import { Injectable } from '@angular/core';
// http 模块
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IsVerEqual } from '@mid/common';
import { BasicServices } from './basic.services';
import { UserModel, AppParam } from '@user';

import { HttpOption, ResponseResult, HandleOption } from '@int/types';

declare const $$: any;

@Injectable({
 providedIn: 'root',
})
export class HttpServices {
    // 时间戳
    readonly timestamp = String(+new Date) || '1521715375267';
    // 设置请求头
    private httpOptions: object;
    // app版本
    private appVersion: boolean;

    constructor(
        // private changeDetectorRef: ChangeDetectorRef,
        private basic: BasicServices,
        private http: HttpClient,
        private appParam: AppParam,
        private userModel: UserModel
    ) {
        this.appVersion = IsVerEqual.prototype.version(($$.fn.device.osVersion || '6.0'), '7.0.0');
    }

    // 设置http请求头
    private setHttpOptions(sign) {
        // 增加时间戳
        this.userModel.APP.timestamp = this.timestamp;
        // 增加签名
        this.userModel.APP.sign = sign || 'e2818674b765456632f5f247770075f114935bd6f988382edb0f9331a126d82e';
        this.httpOptions = {
            headers: new HttpHeaders(this.userModel.APP)
        };
    }

    HTTP(options: HttpOption, callback: (Val: HandleOption) => void ) {
        const that = this;
        const _appVersion_ = this.appVersion;
        const _Result_: HandleOption = {
            'type': 'success',
            'name': options.name,
            'result': '',
            'callback': options.callback,
            'error': options.error,
            'isIgnore': options.isIgnore
        };
        if (this.appParam.isTestParam) {
            $$.get(window.location.origin + '/assets/test.json', function(httpData) {
                httpData = JSON.parse(httpData);
                _Result_.result = httpData[options.name];
                callback(_Result_);
            });
            return;
        }
        // 获取签名
        this.basic.getSign(this.appParam.isTestParam, {
            // url地址
            'url':  '/' + options.paramUrl,
            // 加密数据
            'paramStr': JSON.stringify(options.httpBody),
            // 时间戳
            'timestamp': this.timestamp
        }, sign => {
            that.setHttpOptions(sign);
            console.log(options.name + ' 签名：' + sign);
            // console.log(JSON.stringify(options.httpBody));
            // console.log(JSON.stringify(that.userModel.APP));
            // 接口请求
            if (options.isCordovaHTTP) {
                console.log(options.name + '请求cordovaHTTP接口');
                that.userModel.APP['Content-Type'] = 'application/json;charset=utf-8';
                window['cordovaHTTP'].post(options.url, options.httpBody, that.userModel.APP, function(httpData) {
                    let __httpData__ = httpData.data;
                    if (typeof httpData.data === 'string') {
                        __httpData__ = JSON.parse(httpData.data);
                    }
                    _Result_.result = __httpData__;
                    callback(_Result_);
                },
                function(err) {
                    console.log('textStatus=' + err);
                    _Result_.type = 'error';
                    _Result_.result = err;
                    callback(_Result_);
                });
            } else if ($$.fn.device.os === 'android' && _appVersion_) {
                console.log(options.name + '请求ajax接口');
                $$.ajax({
                    method: 'POST',
                    url: options.url,
                    contentType: 'application/json;charset=utf-8',
                    headers: that.userModel.APP,
                    data: JSON.stringify(options.httpBody),
                    success: function(httpData) {
                        let __httpData__ = httpData;
                        if (typeof httpData === 'string') {
                            __httpData__ = JSON.parse(httpData);
                        }
                        _Result_.result = __httpData__;
                        callback(_Result_);
                    },
                    error: function(err, textStatus, errorThrown ) {
                        console.log('textStatus=' + textStatus);
                        _Result_.type = 'error';
                        _Result_.result = err;
                        callback(_Result_);
                    }
                 });
            } else {
                console.log(options.name + '请求post接口');
                that.http.post<ResponseResult>(options.url, options.httpBody, that.httpOptions).subscribe(
                    httpData => {// 成功
                        _Result_.result = httpData;
                        callback(_Result_);
                    },
                    err => {// 失败
                        _Result_.type = 'error';
                        _Result_.result = err;
                        callback(_Result_);
                    }
                );
             }
        });
    }
}
