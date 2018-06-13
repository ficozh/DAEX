/**
 * 转场动画
 * @class: routeAnimation
 * @version: 0.0.2
 * @date: 2018/02/09
 * @author: fico
 * @description:
 *      页面之间切换的动画
 */
import {trigger, transition, animate, style, query, group, keyframes, state} from '@angular/animations';

export const routeAnimation =
 trigger('routeAnimation', [

    state('inactive', style({
      transform: 'translate3d(0,0,0)',
    })),
    state('active', style({
      transform: 'translate3d(0,0,0)',
      'box-shadow': '0px 0px 0px 2000px rgba(0, 0, 0, .6)'
    })),

    transition('active => inactive', animate('300ms ease-in', keyframes([
      style({ opacity: 0, transform: 'translate3d(100%,0,0)', offset: 0 }),
      style({ opacity: 1, transform: 'translate3d(0,0,0)', offset: 1.0 })
    ]))),
    transition('inactive => active', animate('300ms ease-in', keyframes([
      style({ opacity: 0, transform: 'scale(1) translate3d(0,0,0)', offset: 0 }),
      style({ opacity: 1, transform: 'scale(0.2) translate3d(100%,0,0)', offset: 1.0 })
    ]))),

 ]);
