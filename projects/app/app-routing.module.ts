/**
 * 路由基本模型
 * @class: AppRoutingModule
 * @version: 0.0.6
 * @date: 2018/02/09
 * @author: fico
 * @description:
 *      场景路由的定义和守卫的绑定
 * 2018/06/08 0.0.7 增加国际化配置
 */
// 主库
import { NgModule, Injectable /*, ModuleWithProviders*/ } from '@angular/core';
// import { FormsModule } from '@angular/forms';

// 路由相关模块
import { CanActivate, RouterModule, Routes, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
// http
import { HttpClient } from '@angular/common/http';
// 组件
import { AppHeaderComponent, AppFooterComponent } from '@shared/modules';
import { RouteService } from '@shared/services';
import { AppParam } from '@user';
import { BrowserModule } from '@angular/platform-browser';
// 国际化
import { TranslateService, TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { RouteguardService, AuthComponent } from '@shared/guard';

// 国际化JSON文件
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

// 注入翻译解析器
@Injectable()
export class TranslateResolver implements Resolve<any> {
    constructor(public translate: TranslateService, ) {
        this.translate.addLangs(['ZH-CN', 'EN']);
    }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const lang: string = localStorage.getItem('language');
        if (lang) {
          return this.translate.use(lang);
        } else {
          return this.translate.use('EN');
        }
    }
}
/*定义路由const表示不可改变*/
const routes: Routes = [
  /*
   path:是路由访问的路径,
        留空可以让路径默认指向第一个组件，访问时候没有带任何子路径情况下
   component:是映射的组件
   canActivate 是内置拦截器， RouteguardService 是鉴权服务
   pathMatch:为字符串默认为前缀匹配 "prefix"; "full" 为完全匹配。
   redirectTo:指向为路径，既path
   outlet:字符串，路由目标，面对多个路由的情况
   children:Routes 子路由相关
   */
  // 首页
  {path: 'view',  resolve: { translate: TranslateResolver }, loadChildren: './view/app.view.module#ViewModule'},
  // 用户中心
  {path: 'userCenter',  resolve: { translate: TranslateResolver }, loadChildren: './userCenter/app.userCenter.module#UserCenterViewModule'},
  // 错误路由重定向[写在最后一个]
  { path: '**', redirectTo: '/view/index', pathMatch: 'full' /* 必须要设置 */}
];

@NgModule({
  // 声明本模块中拥有的视图类。Angular 有三种视图类：组件、指令和管道。
  declarations: [
    AuthComponent
  ],
  // 服务的创建者，并加入到全局服务列表中，可用于应用任何部分。
  providers: [
    // Header
    AppHeaderComponent,
    AppFooterComponent,
    // APP 信息
    AppParam,
    // 路由服务
    RouteService,
    TranslateResolver
  ],
  // 注入到模块中，forChild只能用于子模块，forRoot只能用于根模块
  // forRoot有一个可选的配置参数，里面有四个选项
  // enableTracing ：在console.log中打印出路由内部事件信息
  // useHash ： { useHash: true } 把url改成hash风格，protocol://domain/#/account/login ，不使用时会影响图片路径指向
  // initialNavigation ： 禁用初始导航
  // errorHandler ：使用自定义的错误处理，来抛出报错信息；
  imports: [
    // FormsModule,
    BrowserModule,
    // 国际化模块
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: (createTranslateLoader),
          deps: [HttpClient]
      }
  }),
    RouterModule.forRoot(routes, { useHash: true }) ],
  // exports是导出组件，一般用于自定义组件或者模块
  // declarations 的子集，可用于其它模块的组件模板
  exports: [ RouterModule ]
})
export class AppRoutingModule {}

// ModuleWithProviders 是个接口，就是允许ngModule和providers类型
// export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(routes, { useHash: true });


// 上面这种写法只是把路由到处到一个变量，也就是要生效必须到相应的模块中引入(NgModule)中import进去
String.prototype['len'] = function () {
  return this.replace(/[^\x00-\xff]/g, 'xx').length;
};
