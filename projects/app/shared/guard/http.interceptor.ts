/**
 * http 拦截器
 * @class: NoopInterceptor
 * @version: 0.0.6
 * @date: 2018/02/09
 * @author: fico
 * @description:
 *      拦截所以 http 请求，并在请求前修正参数
 *      根据返回结果执行回调处理
 * 2018/06/04 version：0.0.6  增加URL_ARRAY 参数，防止请求重复
 * 2018/06/08 version：0.0.7  增加国际化请求拦截 匹配 i18n
 */
import { Injectable } from '@angular/core';
// http 服务
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
// 异步编程库
// tslint:disable-next-line:import-blacklist
import { Observable,  of } from 'rxjs';
import { catchError,  mergeMap } from 'rxjs/operators';
// 环境配置
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class NoopInterceptor implements HttpInterceptor {
  private URL_ARRAY = [];
  constructor(
  ) { }

  private handleData(event: HttpResponse<any> | HttpErrorResponse): Observable<any> {
    // 可能会因为 `throw` 导出无法执行 `_HttpClient` 的 `end()` 操作
    // this.injector.get(_HttpClient).end();
    // 业务处理：一些通用操作
    switch (event.status) {
      case 200:
        // 业务层级错误处理，以下假如响应体的 `status` 若不为 `0` 表示业务级异常
        // 并显示 `error_message` 内容
        // const body: any = event instanceof HttpResponse && event.body;
        // if (body && body.status !== 0) {
        //     this.msg.error(body.error_message);
        //     // 继续抛出错误中断后续所有 Pipe、subscribe 操作，因此：
        //     // this.http.get('/').subscribe() 并不会触发
        //     return ErrorObservable.throw(event);
        // }
        break;
      case 401: // 未登录状态码
        // this.goTo('/passport/login');
        console.log('未登录状态码');
        break;
      case 403:
      case 404:
      case 500:
        // 404
        console.log('无效请求');
        break;
    }
    return of(event);
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // 统一加上服务端前缀
    let _url_ = req.url;
    // startsWith 判断当前字符串是否以 https:// 或 http:// 作为开头
    if (!_url_.startsWith('https://') && !_url_.startsWith('http://') && !/i18n/.test(_url_)) {
      _url_ = environment.paths.SERVER_URL + _url_;
    }
    // 设置 Headers
    const changedReq = req.clone({
      url: _url_,
      setHeaders: {
        'Content-Type': 'application/json;charset=utf-8'
      }
    });
    // 如果在url数组中有请求链接，直接返回
    if (this.URL_ARRAY.indexOf(_url_) > -1 ) { return; }
    // 添加url到数组中
    this.URL_ARRAY.push(_url_);
    // 清空url数组
    setTimeout(() => { this.URL_ARRAY = []; }, 250);
    // 执行 http 请求
    return next.handle(changedReq)/* .pipe(
      mergeMap((event: any) => {
        // 允许统一对请求错误处理，这是因为一个请求若是业务上错误的情况下其HTTP请求的状态是200的情况下需要
        if (event instanceof HttpResponse && event.status !== 200) {
          return this.handleData(event);
        }
        // 若一切都正常，则后续操作
        return of(event);
      }),
      catchError((err: HttpErrorResponse) => this.handleData(err))
    ) */;
  }
}
