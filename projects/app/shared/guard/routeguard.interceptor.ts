/**
 * 路由守卫
 * @class: RouteguardService
 * @version: 0.1.0
 * @date: 2018/02/09
 * @author: fico
 * @description:
 *      根据 userModel.isLogin 信息执行路由跳转的状态返回
 *      userModel.isLogin 如果是 false，跳转到 auth 进行用户信息的同步更新处理
 * 2018/06/08   version: 0.1.1  将返回根路径名称通过变量传递 ROOT_PATH
 */
import { Injectable } from '@angular/core';
// 路由相关模块
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserModel, AppParam } from '@user';
import { RouteService } from '@shared/services/route.service';
// 标题组件
import { Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class RouteguardService implements CanActivate {

  constructor(
    private routeService: RouteService,
    private router: Router,
    private userModel: UserModel,
    private appParam: AppParam,
    private titleService: Title,
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    // 设置页面标题
    const _Title_ = route.data['title'];
    if (typeof _Title_ !== 'undefined' && this.appParam.title !== _Title_) {
      this.titleService.setTitle(_Title_);
      // 标题
      this.appParam.title = _Title_;
    }
    // 返回值 true: 跳转到当前路由 false: 不跳转到当前路由
    // 当前路由名称
    const path = route.routeConfig.path;
    // 根据点击事件添加或删除路径数组队列
    this.routeService.set(state);
    if (route.data['load']) {
      return true;
    }
    console.log(this.routeService.path);
    console.log('路由：' + path);
    // nextRoute: 设置需要路由守卫的路由集合
    const nextRoute = this.routeService.PATH_ARR;
    if (this.appParam.isTestParam) {
      this.userModel.isLogin = true;
    }
    // 是否登录
    const isLogin = this.userModel.isLogin || (window.sessionStorage.isLogin && window.sessionStorage.isLogin === 'true');
    if (window.sessionStorage.isLogin === 'true') {
      this.userModel.user.tokenId = window.sessionStorage.tokenId;
    }

    // 当前路由是nextRoute指定页时
    if (nextRoute.indexOf(path) >= 0) {
      if (typeof this.routeService.routeMode === 'undefined') {
        this.routeService.routeMode = false;
      }
      if (!isLogin) {
        // 未登录，跳转到login
        this.router.navigate(['userCenter/login']);
        return false;
      } else {
        // 已登录，跳转到当前路由
        return true;
      }
    }
    // 当前路由是login时
    if (path === 'login') {
      if (typeof this.routeService.routeMode === 'undefined') {
        this.routeService.routeMode = true;
      }
      if (!isLogin) {
        // this.userModel.isLogin = true;
        // 未登录，跳转到当前路由
        return true;
      } else {
        // 已登录，跳转到首页
        this.router.navigate(['userCenter/index']);
        return false;
      }
    }
  }

}
