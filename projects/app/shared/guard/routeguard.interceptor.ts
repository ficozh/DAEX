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
import { PlatformLocation } from '@angular/common';
// 路由相关模块
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserModel, AppParam } from '@user';
import { BasicServices } from '@shared/services/basic.services';
import { RouteService } from '@shared/services/route.service';
// 标题组件
import { Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class RouteguardService implements CanActivate {

  constructor(
    private routeService: RouteService,
    private basic: BasicServices,
    private location: PlatformLocation,
    private router: Router,
    private userModel: UserModel,
    private appParam: AppParam,
    private titleService: Title,
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    // 处理安卓物理返回键回退 监听location的变化
    this.location.onPopState(() => {
      if (!this.routeService.routeState || (this.routeService.path.length >= 2 && (this.routeService.get(-1).indexOf(this.routeService.ROOT_PATH[0]) > -1))) {
        this.basic.exitApp();
        return false;
      }
    });
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
    console.log(this.routeService.path);
    console.log('路由：' + path);
    // nextRoute: 设置需要路由守卫的路由集合
    const nextRoute = this.routeService.PATH_ARR;
    // 是否登录
    const isLogin = this.userModel.isLogin;
    // 认证达到 20 次 返回 false
    if (this.userModel.authCount >= 20) {
      return false;
    }
    // 当前路由是nextRoute指定页时
    if (nextRoute.indexOf(path) >= 0) {
      if (typeof this.routeService.routeMode === 'undefined') {
        this.routeService.routeMode = false;
      }
      if (!isLogin) {
        // 未登录，跳转到login
        /* if (this.userModel.authCount >= 100) {
          return false;
        } */
        // setTimeout(() => {
          this.router.navigate(['auth']);
        // }, 50);
        return false;
      } else {
        // 已登录，跳转到当前路由
        return true;
      }
    }
    // 当前路由是login时
    if (path === 'auth') {
      if (typeof this.routeService.routeMode === 'undefined') {
        this.routeService.routeMode = true;
      }
      if (!isLogin) {
        // this.userModel.isLogin = true;
        // 未登录，跳转到当前路由
        return true;
      } else {
        // 已登录，跳转到首页
        this.router.navigate(['/view/index']);
        return false;
      }
    }
  }
}
