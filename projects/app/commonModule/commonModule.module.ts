/**
 * 公共组件定义
 * @class: COMMONMODILE
 * @version: 0.0.1
 * @date: 2018/05/09
 * @author: fico
 * @description:
 *  对于公共部分组件进行导入导出
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppFooterComponent, AppHeaderComponent } from '@shared/modules';
// 国际化
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    // 本模块声明的组件模板需要的类所在的其它模块。
    imports: [
        TranslateModule,
        CommonModule],
    // 声明本模块中拥有的视图类。Angular 有三种视图类：组件、指令和管道。
    // 这里引入共享的组件
    declarations: [
        AppHeaderComponent,
        AppFooterComponent
    ],
    // 这里将共享的组件放入到导出的出口中
    exports: [
        CommonModule,
        AppHeaderComponent,
        AppFooterComponent
    ]
})
export class COMMONMODILES { }
