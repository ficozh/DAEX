// 主库
// import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, ModuleWithProviders } from '@angular/core';
// http 模块
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
// 页面路由
import { AppRoutingModule } from './app-routing.module';
// 页面动画
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// 基本路径
import { APP_BASE_HREF } from '@angular/common';

// 页面模块
import { AppComponent } from './app.component';
import { ViewModule } from './view/app.view.module';
import { UserCenterViewModule } from './userCenter/app.userCenter.module';

// 组件
import { NoopInterceptor } from '@shared/guard';
// app参数
import { UserModel } from '@user';
import { environment } from '../environments/environment';

@NgModule({
  // 声明本模块中拥有的视图类。Angular 有三种视图类：组件、指令和管道。
  declarations: [
    // 页面
    AppComponent,
    // 鉴权认证
  ],
  // 导入其他模块，这样本模块可以使用暴露出来的组件、指令、管道等
  // 本模块声明的组件模板需要的类所在的其它模块。
  imports: [
    // BrowserModule,
    // FormsModule,
    AppRoutingModule,
    // BrowserAnimationsModule,
    HttpClientModule
  ],
  // 服务的创建者，并加入到全局服务列表中，可用于应用任何部分。
  providers: [
    ViewModule,
    UserCenterViewModule,
    // http拦截
    {
      provide: HTTP_INTERCEPTORS,
      useClass: NoopInterceptor,
      multi: true,
    },
    // APP base 配置
    {
      provide: APP_BASE_HREF,
      useValue: environment.publicBase
    },
    // 用户信息
    UserModel
  ],
  // 自定义html元素
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  // 指定应用的主视图（称为根组件），它是所有其它视图的宿主。只有根模块才能设置 bootstrap 属性。
  bootstrap: [AppComponent]
})

export class AppModule {
  constructor(
  ) {
    // 判断是否使用alert
    if (environment.IS_ALERT) {
      const log = console.log;
      console.log = function(message) {
        alert(message);
        log(message);
      };
    }
  }
}
