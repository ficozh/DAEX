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
import { FormsModule } from '@angular/forms';
// 国际化
import { TranslateModule } from '@ngx-translate/core';
// 路由相关模块
import { RouterModule, Routes } from '@angular/router';
// 视图组件
import { IndexComponent } from './app.index.component';
// 视图事件
import { IndexAction } from './app.index.action';

// 公共模块
import { COMMONMODILES } from '../commonModule/commonModule.module';

// 组件
import {
  // AppHeaderComponent,
  // AppFooterComponent,
  AppBannerComponent,
  AppAboutComponent,
  AppValueComponent,
  AppEcosystemComponent,
  AppRoadmapComponent,
  AppTeamComponent,
  AppCommunityComponent } from '@shared/modules';
import { RouteService } from '@shared/services';
import { RouteguardService } from '@shared/guard';

const PATH_ARR = ['index', 'home'];
// 根路径
const ROOT_PATH = ['home'];
/*定义路由const表示不可改变*/
const viewRoutes: Routes = [
  // path是路由访问的路径
  // 留空可以让路径默认指向第一个组件，访问时候没有带任何子路径情况下
  // component是映射的组件
  // children是嵌套组件的包含层
  // canActivate是内置拦截器，RouteguardService是鉴权服务
  //  DAEX首页
  { path: 'home', data: {title: 'DAEX'}, canActivate: [RouteguardService], component: IndexComponent },
  // 错误路由重定向[写在最后一个]
  { path: '**', redirectTo: 'home',  pathMatch: 'full'  /* 必须要设置 */}
];
@NgModule({
  // 本模块声明的组件模板需要的类所在的其它模块。
  imports: [RouterModule.forChild(viewRoutes)],
  // declarations 的子集，可用于其它模块的组件模板
  exports: [RouterModule],
})
export class AppViewRoutingModule {}

@NgModule({
  // 自定义html元素
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  // 声明本模块中拥有的视图类。Angular 有三种视图类：组件、指令和管道。
  declarations: [
    // 视图组件
    IndexComponent,
    // Header
    // AppHeaderComponent,
    // footer
    // AppFooterComponent,
    // index组件
    AppBannerComponent,
    AppAboutComponent,
    AppValueComponent,
    AppEcosystemComponent,
    AppRoadmapComponent,
    AppTeamComponent,
    AppCommunityComponent,
  ],
  // 本模块声明的组件模板需要的类所在的其它模块。
  imports: [
    // 国际化
    TranslateModule,
    COMMONMODILES,
    FormsModule,
    AppViewRoutingModule
  ],
  // 服务的创建者，并加入到全局服务列表中，可用于应用任何部分。
  providers: [
    // 事件
    IndexAction,
  ]
})
export class ViewModule {
  constructor(
    private routeService: RouteService,
  ) {
    this.routeService.PATH_ARR = PATH_ARR;
    this.routeService.ROOT_PATH = ROOT_PATH;
  }
}
