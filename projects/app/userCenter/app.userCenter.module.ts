/**
 * 视图基本模型
 * @class: ViewModule
 * @version: 0.0.2
 * @date: 2018/04/24
 * @author: fico
 * @description:
 * 2018/06/08  0.0.3 增加国际化配置 TranslateModule
 * 2018/06/08  0.0.4 增加根路径参数 ROOT_PATH
 */
// 主库
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// 国际化
import { TranslateModule } from '@ngx-translate/core';
// 路由相关模块
import { RouterModule, Routes } from '@angular/router';
// 视图组件
import { UserCenterViewComponent } from './app.userCenter.component';
// 视图事件
import { UserCenterAction } from './app.userCenter.action';

// 公共模块
import { COMMONMODILES } from '../commonModule/commonModule.module';
// 页面
import { UserCenterInfoComponent } from './info/app.info.component';
import { UserCenterLoginComponent } from './login/app.login.component';
import { IntegralComponent } from './integral/app.integral.component';
import { IntegralDetailsComponent } from './integralDetails/app.integralDetails.component';
import { IntegralRecordComponent } from './integralRecord/app.integralRecord.component';
import { UserCenterPasswordComponent } from './password/app.password.component';
import { UserCenterRegisterComponent } from './register/app.register.component';
import { UserCenterIndexlComponent } from './index/app.index.component';
import { BountyComponent } from './bounty/app.bounty.component';

import { RouteService } from '@shared/services';
import { RouteguardService } from '@shared/guard';

const PATH_ARR = ['userCenter', 'register', 'login', 'password', 'index', 'info', 'integral', 'integralDetails', 'integralRecord', 'bounty'];
// 根路径
const ROOT_PATH = ['index'];
/*定义路由const表示不可改变*/
const viewRoutes: Routes = [
  // path是路由访问的路径
  // 留空可以让路径默认指向第一个组件，访问时候没有带任何子路径情况下
  // component是映射的组件
  // children是嵌套组件的包含层
  // canActivate是内置拦截器，RouteguardService是鉴权服务
  {
    path: '', component: UserCenterViewComponent, children: [
      // 注册
      { path: PATH_ARR[1], data: {title: 'Sign up', load: true}, canLoad: [ RouteguardService ], component: UserCenterRegisterComponent },
      // 登录
      { path: PATH_ARR[2], data: {title: 'Login', load: true}, canActivate: [ RouteguardService ], component: UserCenterLoginComponent },
      // 忘记密码
      { path: PATH_ARR[3], data: {title: 'Forget Password', load: true}, canActivate: [ RouteguardService ], component: UserCenterPasswordComponent },
      // 首页
      { path: PATH_ARR[4], data: {title: 'Personal Center'}, canActivate: [RouteguardService], component: UserCenterIndexlComponent },
      // 完善信息
      { path: PATH_ARR[5], data: {title: 'Customer Information'}, canActivate: [RouteguardService], component: UserCenterInfoComponent },
      // 账户积分信息
      { path: PATH_ARR[6], data: {title: 'integral'}, canActivate: [RouteguardService], component: IntegralComponent },
      // 账户积分详情
      { path: PATH_ARR[7], data: {title: 'integral details'}, canActivate: [RouteguardService], component: IntegralDetailsComponent },
      // 账户积分记录
      { path: PATH_ARR[8], data: {title: 'Conversion Record'}, canActivate: [RouteguardService], component: IntegralRecordComponent },
      // bounty
      { path: PATH_ARR[9], data: {title: 'bounty'}, canActivate: [ RouteguardService ], component: BountyComponent },
      // 错误路由重定向[写在最后一个]
      { path: '**', redirectTo: PATH_ARR[1],  pathMatch: 'full'  /* 必须要设置 */}
    ]
  }
];
@NgModule({
  // 本模块声明的组件模板需要的类所在的其它模块。
  imports: [RouterModule.forChild(viewRoutes)],
  // declarations 的子集，可用于其它模块的组件模板
  exports: [RouterModule],
})
export class AppWhitepaperViewRoutingModule {}

@NgModule({
  // 自定义html元素
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  // 声明本模块中拥有的视图类。Angular 有三种视图类：组件、指令和管道。
  declarations: [
    // 视图组件
    UserCenterViewComponent,
    // 页面
    UserCenterRegisterComponent,
    UserCenterIndexlComponent,
    UserCenterLoginComponent,
    UserCenterPasswordComponent,
    UserCenterInfoComponent,
    BountyComponent,
    IntegralDetailsComponent,
    IntegralRecordComponent,
    IntegralComponent
  ],
  // 本模块声明的组件模板需要的类所在的其它模块。
  imports: [
    // 国际化
    TranslateModule,
    COMMONMODILES,
    FormsModule,
    ReactiveFormsModule,
    AppWhitepaperViewRoutingModule
  ],
  // 服务的创建者，并加入到全局服务列表中，可用于应用任何部分。
  providers: [
    // 事件
    UserCenterAction,
  ]
})
export class UserCenterViewModule {
  constructor(
    private routeService: RouteService,
  ) {
    this.routeService.PATH_ARR = PATH_ARR;
    this.routeService.ROOT_PATH = ROOT_PATH;
  }
}
