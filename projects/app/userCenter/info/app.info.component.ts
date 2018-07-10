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
  PersonalForm: any;
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
        usemame: [''],
        firstName: [''],
        lastName: [''],
        nation: [''],
        cardType: [''],
        cardCode: [''],
        validDate: [''],
        address: [''],
        purseAddress: [''],
      });
      this.AgencyForm = this.formBuilder.group({
        name: [''],
        firesname: [''],
        registerCode: [''],
        certifyAuthority: [''],
        registerDate: [''],
        validDate: [''],
        companyAddress: [''],
        representative: [''],
        contact: [''],
        purseAddress: [''],
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
      Data = this.PersonalForm;
      Data.userType = 1;
    } else {
      Data = this.AgencyForm;
      Data.userType = 2;
    }
    this.userCenterAction.set('updateinfo', Data, () => {
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
