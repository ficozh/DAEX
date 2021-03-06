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
import { ViewComponent } from './app.view.component';
// 视图事件
import { ViewAction } from './app.view.action';
// 页面组件
import { IndexComponent } from './index/app.index.component';
import { InformationComponent } from './information/app.information.component';
import { TeamComponent } from './team/app.team.component';
import { WhitepaperComponent } from './whitepaper/app.whitepaper.component';
import { CommunityComponent } from './community/app.community.component';
import { FAQComponent } from './FAQ/app.faq.component';
import { FollowusComponent } from './followus/app.followus.component';
import { NewComponent } from './new/app.new.component';
import { NewDetailsComponent } from './newDetails/app.newDetails.component';

// 公共模块
import { COMMONMODILES } from '../commonModule/commonModule.module';

// 组件
import {
  AppBannerComponent,
  AppAboutComponent,
  AppValueComponent,
  AppRoadmapComponent,
  AppTeamComponent,
  AppCommunityComponent,
  AppEcosystemComponent,
  AppFollowUsComponent,
  AppForeignComponent
 } from '@shared/modules';
import { RouteService } from '@shared/services';
import { RouteguardService } from '@shared/guard';

const PATH_ARR = ['view', 'index', 'information', 'community', 'followus', 'team', 'whitepaper', 'FAQ', 'bounty'];
// 根路径
const ROOT_PATH = ['index'];
/*定义路由const表示不可改变*/
const viewRoutes: Routes = [
  // path是路由访问的路径
  // 留空可以让路径默认指向第一个组件，访问时候没有带任何子路径情况下
  // component是映射的组件
  // children是嵌套组件的包含层
  {
    path: '', component: ViewComponent, children: [
      //  home
      { path: 'index', data: {title: 'DAEX', load: true}, canActivate: [ RouteguardService ], component: IndexComponent },
      //  information
      { path: 'information', data: {title: 'information', load: true}, canActivate: [ RouteguardService ],  component: InformationComponent },
      // community
      { path: 'community' , data: {title: 'community', load: true}, canActivate: [ RouteguardService ], component: CommunityComponent},
      // followus
      { path: 'followus', data: {title: 'followus', load: true}, canActivate: [ RouteguardService ], component: FollowusComponent },
      // team
      { path: 'team', data: {title: 'team', load: true}, canActivate: [ RouteguardService ], component: TeamComponent },
      // whitepaper
      { path: 'whitepaper', data: {title: 'whitepaper', load: true}, canActivate: [ RouteguardService ],  component: WhitepaperComponent },
      // FAQ
      { path: 'faq', data: {title: 'FAQ', load: true}, canActivate: [ RouteguardService ], component: FAQComponent },
      // new
      { path: 'new', data: {title: 'new', load: true}, canActivate: [ RouteguardService ], component: NewComponent },
      // new
      { path: 'newDetails', data: {title: 'new', load: true}, canActivate: [ RouteguardService ], component: NewDetailsComponent },
      // 错误路由重定向[写在最后一个]
      { path: '**', redirectTo: 'index',  pathMatch: 'full'  /* 必须要设置 */}
    ]
  }
];
@NgModule({
  // 本模块声明的组件模板需要的类所在的其它模块。
  imports: [RouterModule.forChild(viewRoutes)],
  // declarations 的子集，可用于其它模块的组件模板
  exports: [RouterModule],
})
export class AppViewRoutingModule {}

@NgModule({
  // 本模块声明的组件模板需要的类所在的其它模块。
  imports: [
    // 国际化
    TranslateModule,
    FormsModule,
    // 公共模块
    COMMONMODILES,
    AppViewRoutingModule
  ],
  // 自定义html元素
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  // 声明本模块中拥有的视图类。Angular 有三种视图类：组件、指令和管道。
  declarations: [
    // 视图组件
    ViewComponent,
    // 轮播图
    AppBannerComponent,
    // 评论列表
    // 页面
    IndexComponent,
    FollowusComponent,
    NewComponent,
    NewDetailsComponent,
    InformationComponent,
    TeamComponent,
    WhitepaperComponent,
    FAQComponent,
    CommunityComponent,

    AppAboutComponent,
    AppValueComponent,
    AppRoadmapComponent,
    AppTeamComponent,
    AppCommunityComponent,
    AppEcosystemComponent,
    AppFollowUsComponent,
    AppForeignComponent
  ],
  // 服务的创建者，并加入到全局服务列表中，可用于应用任何部分。
  providers: [
    // 场景事件
    ViewAction,
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
