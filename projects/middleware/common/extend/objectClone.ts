/**
 * 对象克隆
 * @function: objectClone
 * @version: 0.0.1
 * @date: 2018/06/01
 * @author: fico
 * @description:
 */

export function objectClone(Obj: Object) {
    // 判断不是对象
    if (Object.prototype.toString.call(Obj) !== '[object Object]' || Obj == null) {
        return Obj;
    }
    // 声明新对象
    const _Obj_ = new Object();
    // tslint:disable-next-line:forin
    for (const name in Obj) {
        _Obj_[name] = this.cloneObject(Obj[name]);
    }
    return _Obj_;
}
