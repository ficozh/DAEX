/**
 * 个人资料
 * @class: UserCenterInfoComponent
 * @version: 0.0.1
 * @date: 2018/06/14
 * @author: fico
 * @description:
 */
import { Component, OnInit} from '@angular/core';
import { AppParam, UserModel } from '@user';
import { UserCenterAction } from '../app.userCenter.action';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
declare const laydate: any;
declare const $$: any;

@Component({
  selector: 'app-info',
  templateUrl: './app.info.component.html',
  styleUrls: ['./app.info.component.css']
})

export class UserCenterInfoComponent implements OnInit {
  AgencyForm: any;
  AgencyFormImg = {};
  isDisabled = false;
  PersonalForm: any;
  PersonalFormImg = {};
  constructor(
    private userModel: UserModel,
    private appParam: AppParam,
    private formBuilder: FormBuilder,
    private userCenterAction: UserCenterAction,
  ) {
    this.createForm();
  }
   // 创建表单元素
   createForm(options?) {
     if (options) {
       options = options.user;
       if (options.licenseFront) {
        this.imgSrc('licenseFront', options.licenseFront);
       }
       if (options.licenseBack) {
        this.imgSrc('licenseBack', options.licenseBack);
       }
       if (options.handFront) {
        this.imgSrc('handFront', options.handFront);
       }
       if (options.handBack) {
        this.imgSrc('handBack', options.handBack);
       }
       if (options.licenseUrl) {
        this.imgSrc('licenseUrl', options.licenseUrl);
       }
     } else {
       options = {};
     }
      this.PersonalForm = this.formBuilder.group({
        usemame: [{value: options.usemame || '', disabled: !this.isDisabled} , [Validators.required]],
        firstName: [{value: options.firstName || '', disabled: !this.isDisabled}],
        lastName: [{value: options.lastName || '', disabled: !this.isDisabled}, [Validators.required]],
        nation: [{value: options.nation || '', disabled: !this.isDisabled}],
        cardType: [{value: options.cardType || '', disabled: !this.isDisabled}, [Validators.required]],
        cardCode: [{value: options.cardCode || '', disabled: !this.isDisabled}, [Validators.required]],
        mobile: [{value: options.mobile || '', disabled: !this.isDisabled}, [Validators.required]],
        validDate: [{value: options.validDate || '', disabled: !this.isDisabled}],
        address: [{value: options.address || '', disabled: !this.isDisabled}],
        purseAddress: [{value: options.purseAddress || '', disabled: !this.isDisabled}],
        licenseFront: [{value: options.licenseFront || '', disabled: !this.isDisabled}],
        licenseBack: [{value: options.licenseBack || '', disabled: !this.isDisabled}],
        handFront: [{value: options.handFront || '', disabled: !this.isDisabled}],
        handBack: [{value: options.handBack || '', disabled: !this.isDisabled}]
      });
      this.AgencyForm = this.formBuilder.group({
        name: [{value: options.name || '', disabled: !this.isDisabled}, [Validators.required]],
        firesname: [{value: options.firesname || '', disabled: !this.isDisabled}],
        registerCode: [{value: options.registerCode || '', disabled: !this.isDisabled}],
        certifyAuthority: [{value: options.certifyAuthority || '', disabled: !this.isDisabled}],
        registerDate: [{value: options.registerDate || '', disabled: !this.isDisabled}],
        validDate: [{value: options.validDate || '', disabled: !this.isDisabled}],
        companyAddress: [{value: options.companyAddress || '', disabled: !this.isDisabled}],
        representative: [{value: options.representative || '', disabled: !this.isDisabled}],
        licenseUrl: [{value: options.licenseUrl || '', disabled: !this.isDisabled}],
        contact: [{value: options.contact || '', disabled: !this.isDisabled}],
        purseAddress: [{value: options.purseAddress || '', disabled: !this.isDisabled}]
      });
  }
  // 提升性能
  trackByFn(index, item) {
    return index; // or item.id
  }
  // 设置图片
  imgSrc(name, url) {
    document.getElementById(name)['src'] = url;
  }
  // 提交
  submit( id ) {
    let Data;
    if (id === 1) {
      this.PersonalForm.value['licenseFront'] = this.PersonalFormImg['licenseFront'];
      this.PersonalForm.value['licenseBack'] = this.PersonalFormImg['licenseBack'];
      this.PersonalForm.value['handFront'] = this.PersonalFormImg['handFront'];
      this.PersonalForm.value['handBack'] = this.PersonalFormImg['handBack'];

      Data = this.PersonalForm.value;
      Data.userType = 1;
    } else {
      this.AgencyForm.value['licenseUrl'] = this.AgencyFormImg['licenseUrl'];
      Data = this.AgencyForm.value;
      Data.userType = 2;
    }
    this.userCenterAction.set('updateinfo', Data, () => {
      $$.alert('', '<span style="line-height:80px;">Successful Operation</span>', function() {}, ['<span class="Btn BtnSmall BtnPrimary">Confirm</span>']);
    });
  }
  // 上传图片
  upLoad(ev, name, id) {
    console.log(window.URL.createObjectURL(ev.target.files[0]));
    // 获取图片对象数组
    const file = ev.target.files[0];
    // 将图片生成blob额  这儿我也不知道叫什么  可以生成一个 本地的临时预览图片的字符串
    // 暂且叫他 blob对象吧   有知道叫什么的大佬 记得留言告诉我哈  省得改天出门丢人了
    const blob = window.URL.createObjectURL(file);

    /* function insertAfter( newElement, targetElement) {
      const parent = targetElement.parentNode;
      if ( parent.lastChild === targetElement ) {
            // 如果最后的节点是目标元素，则直接添加。因为默认是最后
            parent.appendChild( newElement );
      } else {
            // 如果不是，则插入在目标元素的下一个兄弟节点的前面。也就是目标元素的后面
            parent.insertBefore( newElement, targetElement.nextSibling );
      }
    } */
    const Img = document.createElement('img');
    Img.src = blob;
    Img.className = 'ShowImg';
    this.userCenterAction.set('upload', {'file': ev.target.files}, (ResultData) => {
      /* insertAfter(Img, ev.target); */
      // ev.target.value = ResultData.data.url;
      this.imgSrc(name, ResultData.data.url);
      if (id === 0) {
        this.PersonalForm.value[name] = ResultData.data.url;
        this.PersonalFormImg[name] = ResultData.data.url;
      } else {
        this.AgencyForm.value[name] = ResultData.data.url;
        this.AgencyFormImg[name] = ResultData.data.url;
      }
    });
  }

  // 组件初始化
  ngOnInit(): void {
    $$.tabs('.TAB');
    $$.loadJC('./assets/laydate/laydate.js', 'js', function () {
      laydate.render({
        elem: '#PersonalDate',
        lang: 'en'
      });
      laydate.render({
        elem: '#AgencyDate',
        lang: 'en'
      });
      laydate.render({
        elem: '#AgencyADate',
        lang: 'en'
      });
    });
    this.userCenterAction.get('userInfo', (ResultData) => {
      this.isDisabled = this.userModel.user.status || (window.sessionStorage['UserStatus'] === 'true' ? true : false);
      this.createForm(ResultData.data);
    });
  }

}
