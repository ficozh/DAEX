/**
 * 判断引用是否为对象
 * @function: isObject
 * @version: 0.0.1
 * @date: 2018/06/01
 * @author: fico
 * @description:
 */
export function isObject(value) {
    return value !== null && typeof value === 'object';
}
