/**
 * 执行一次事件
 * @function: once
 * @version: 0.0.1
 * @date: 2018/06/01
 * @author: fico
 * @description:
 */
export function once(liveEvent) {
    let result;
    return function() {
        if (liveEvent) {
            result = liveEvent.apply(this, arguments);
            liveEvent = null;
        }
        return result;
    };
}
