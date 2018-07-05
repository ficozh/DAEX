/**
 * 开发环境配置
 * @class: environment
 * @version: 0.0.2
 * @date: 2018/02/09
 * @author: fico
 * @description:
 *      当前环境中的文件内容将在构建期间重写这些文件
 *      构建系统默认使用 `environment.ts` 开发环境
 *      `ng build --env=prod` 会使用 `environment.prod.ts` 来替代
 *      该环境映射的列表，可以在 `.angular-cli.json` 中找到
 *      2018/02/27 -- 添加接口路径
 */
export const environment = {
  // 是否是测试
  IS_ALERT: false,
  // IS_TEST: false,
  IS_TEST: true,
  // 本地测试环境  接口路径
  paths: {
    SERVER_URL: 'http://daex.zhixingcy.com/web/'
  },
  // 本地测试环境  文件路径
  publicBase: '/',
  production: false
};
