/**
 * 获取URL参数
 * @function: getUrlParams
 * @version: 0.0.1
 * @date: 2018/02/11
 * @author: fico
 * @example: getUrlParams()
 * @return: {}
 * @type: Object
 * @description:
 *      获取URL参数方法 返回结果为JSON对象
 *      可以对 ?a=1&b=2 参数进行解析 {'a':'1','b':'2'}
 *      可以对复杂的url参数进行解析 ?c=3#/?a=1&b=2 参数进行解析 {'a':'1','b':'2','c':'3'}
 *      可以对入参的 url 进行解析 {'url':'http://***.com/?c=3#/?a=1&b=2'}
 *      可以指定获取某个参数 {type:['url=','url']} 例如：http://***.com/?c=3#/?url=1&b=2 返回的结果 {'url':'1&b=2'}
 */

interface OptionsValue {
    url?: string;
    type?: Array<any>;
}

export function getUrlParams(options?: OptionsValue) {
    options = options || {};
    const ArrayData = {};
    const LinkURL = options.url ? options.url : window.location.href;
    const Mark = LinkURL.indexOf('?') + 1;
    let URLData = LinkURL.substring(Mark);
    if (Mark !== 0) {
        if (!!options.type) {
            const typeData = URLData.indexOf(options.type[0]) + options.type[0].length;
            ArrayData[options.type[1]] = URLData.substring(typeData);
        } else {
            // angular #/ 多问号 特殊处理
            URLData = URLData.replace(/%26/gi, '&').
            replace(/%2F/gi, '/').
            replace(/%3D/gi, '=').
            replace(/%2B/gi, '+').
            replace(/%40/gi, '@').
            replace(/%3A/gi, ':').
            replace(/%24/g, '$').
            replace(/%2C/gi, ',').
            replace(/%3B/gi, ';').
            replace(/%20/g, ' ').
            replace(/\?/g, '&').
            replace(/\#\//g, '&').
            replace(/\&&/g, '&');
            // 获取参数的值
            const _Data = URLData.split('&');
            for (let i = 0; i < _Data.length; i++) {
                const _Array = _Data[i].split('=');
                ArrayData[_Array[0]] = _Array[1];
            }
        }
    }
    return ArrayData;
}
