/**
 * 版本对比
 * @function: IsVerEqual
 * @version: 0.0.1
 * @date: 2018/06/06
 * @author: fico
 * @description:
 */

export class IsVerEqual {
    // 版本转换
    private toNum(version: string) {
        const _version_ = version.toString();
        const _versionArray_ = _version_.split('.');
        const num_place = ['', '0', '00', '000', '0000'], r = num_place.reverse();
        _versionArray_.forEach((itme, index) => {
            const len = itme.length;
            _versionArray_[index] = r[len] + String(itme);
        });
        const res = _versionArray_.join('');
        return res;
    }
    // 比对版本
    version(versionA, versionB) {
        const _a = this.toNum(versionA), _b = this.toNum(versionB);
        if (_a <= _b) {
            return true;
        } else {
            return false;
        }
    }
}

