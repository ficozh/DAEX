/**
 * 路由服务
 * @class: RouteService
 * @version: 0.0.1
 * @date: 2018/05/29
 * @author: fico
 * @description:
 */
export class RouteService {
    // 路径
    path = [];
    PATH_ARR = [];
    ROOT_PATH = [];
    // 路径状态
    routeState: boolean;
    // 路由加载方式
    routeMode: boolean;

    set(route) {
        // 根据点击事件添加或删除路径数组队列
        if (this.routeState) {
            this.path.pop();
            this.routeState = false;
        } else {
            this.path.push(route.url);
        }
    }

    get(index: number) {
        return this.path[this.path.length + index];
    }
}
