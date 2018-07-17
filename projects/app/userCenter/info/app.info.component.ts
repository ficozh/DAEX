/**
 * 个人资料
 * @class: UserCenterInfoComponent
 * @version: 0.0.1
 * @date: 2018/06/14
 * @author: fico
 * @description:
 */
import { Component, OnInit} from '@angular/core';
import { AppParam } from '@user';
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
  PersonalForm: any;
  PersonalFormImg = {};
  constructor(
    private appParam: AppParam,
    private formBuilder: FormBuilder,
    private userCenterAction: UserCenterAction,
  ) {
    this.createForm();
  }
   // 创建表单元素
   createForm() {
      this.PersonalForm = this.formBuilder.group({
        usemame: ['', [Validators.required]],
        firstName: [''],
        lastName: ['', [Validators.required]],
        nation: [''],
        cardType: ['', [Validators.required]],
        cardCode: ['', [Validators.required]],
        mobile: ['', [Validators.required]],
        validDate: [''],
        address: [''],
        purseAddress: [''],
        licenseFront: [''],
        licenseBack: [''],
        handFront: [''],
        handBack: ['']
      });
      this.AgencyForm = this.formBuilder.group({
        name: ['', [Validators.required]],
        firesname: [''],
        registerCode: [''],
        certifyAuthority: [''],
        registerDate: [''],
        validDate: [''],
        companyAddress: [''],
        representative: [''],
        licenseUrl: [''],
        contact: [''],
        purseAddress: ['']
      });
  }
  // 提升性能
  trackByFn(index, item) {
    return index; // or item.id
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

    function insertAfter( newElement, targetElement) {
      const parent = targetElement.parentNode;
      if ( parent.lastChild === targetElement ) {
            // 如果最后的节点是目标元素，则直接添加。因为默认是最后
            parent.appendChild( newElement );
      } else {
            // 如果不是，则插入在目标元素的下一个兄弟节点的前面。也就是目标元素的后面
            parent.insertBefore( newElement, targetElement.nextSibling );
      }
    }
    const Img = document.createElement('img');
    Img.src = blob;
    Img.className = 'ShowImg';
    this.userCenterAction.set('upload', {'file': ev.target.files}, (ResultData) => {
      insertAfter(Img, ev.target);
      // ev.target.value = ResultData.data.url;
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


  }

}
