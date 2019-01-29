/*
 * @Author: changge
 * @Date: 2018-06-05 17:23:21
 * @Last Modified by:   changge
 * @Last Modified time: 2018-06-05 17:23:21
 */
import fnPureProcessResourceData from '../util';
import BaseAPI from '../base';

// 用户登录数据实体
class UserLogin extends BaseAPI {
  constructor() {
    super();
    this.sUpdateUrl = '';
    this.sValidateUrl = '/auth/login';
  }
  update(option = {}) {
    return fnPureProcessResourceData({
      url: this.sUpdateUrl,
      method: 'post',
      ...option,
    });
  }
  validate(option = {}) {
    return fnPureProcessResourceData({
      url: this.sValidateUrl,
      method: 'post',
      ...option,
    });
  }
}

// 用户画像信息数据
class UserPortrait extends BaseAPI {
  constructor() {
    super();
    this.sRetrieveUrl = '';
    this.sUpdateUrl = '';
  }
  getUserInfoF(option = {}) {
    return fnPureProcessResourceData({
      url: this.getUserInfo,
      method: 'post',
      ...option,
    });
  }
}


export default {
  userLogin: new UserLogin(),
  userPortrait: new UserPortrait(),
};
