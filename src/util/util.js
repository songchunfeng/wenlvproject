
// ===============================localStorage相关===================================
const prefix = 'dajia';
//添加 localStorage
export function setSessionItem(key, value) {
    const session = window.sessionStorage;
    if(session){
        session.setItem(prefix+key, value);
    }
}
//获取 localStorage
export function getSessionItem(key) {
    return sessionStorage.getItem(prefix+key)
}

//删除 localStorage
export function removeSessionItem(key) {
   return sessionStorage.removeItem(prefix+key)
}
// ================================号码校验相关=======================================

//手机号码的校验
export function checkPhoneNo(data) {
    let reg = /^1[3456789]\d{9}$/;
    if (data == "" || data == null || !data) {
        // alert("请填写您的手机号码！");
        // store.commit('setToastObj', { showToast: true, msg: '手机号不能为空，请输入手机号！' })
        return '手机号不能为空，请输入手机号！';
    } else {
        if (!reg.test(data)) {
            // alert("您输入的手机号码有误！");
            // store.commit('setToastObj', { showToast: true, msg: '您输入的手机号有误，请如实填写！' })
            return '您输入的手机号有误，请如实填写！';
        } else {
            return 'success'
        }
    }



}
// ================================名字校验相关=======================================

//中文名字校验
export function checkName(name) {
    let reg = /^([\u4E00-\u9FA5]+(?:[·•][\u4E00-\u9FA5]+)*|(([A-Za-z]+\s+)*[A-Za-z]+))$/;
    if (name == "" || name == null || !name) {
        // alert('姓名不能为空！');
        // store.commit('setToastObj', { showToast: true, msg: '姓名不能为空' })
        return '姓名不能为空'
    } else if (name.toLowerCase() == "null") {
        // alert('姓名输入字符不合法，请重新输入！');
        // store.commit('setToastObj', { showToast: true, msg: '姓名输入字符不合法，请重新输入！' })
        return '姓名输入字符不合法，请重新输入！'
    }
    if (reg.test(name)) {
        if (name.replace(/[^\x00-\xff]/g, 'xxx').length < 4) {
            // alert('姓名输入字符不合法，请重新输入！');
            // store.commit('setToastObj', { showToast: true, msg: '姓名输入字符不合法，请重新输入！' })
            return '姓名输入字符不合法，请重新输入！'
        }
    }
    if (reg.test(name)) {
        if (name.replace(/[^\x00-\xff]/g, 'xxx').length > 50) {
            // alert('姓名最多可输入16个字符！');
            // store.commit('setToastObj', { showToast: true, msg: '姓名最多可输入16个字符！' })
            return '姓名最多可输入50个字符！'
        } else {
            return 'success'
        }
    } else {
        // alert('姓名格式不正确！');
        // store.commit('setToastObj', { showToast: true, msg: '姓名格式不正确！' })
        return '姓名格式不正确！'
    }
}

//英文名字的校验
export function checkEnName(englishName) {
    let reg = /^(([A-Za-z]+\s+)*[A-Za-z]+)$/;
    if (englishName == "" || englishName == null || !englishName) {
        // alert('英文名/拼音不能为空！');
        // store.commit('setToastObj', { showToast: true, msg: '姓名不能为空' })
        return '姓名不能为空'
    }
    if (englishName.toLowerCase() == "null") {
        // alert('英文名/拼音输入字符不合法，请重新输入！');
        // store.commit('setToastObj', { showToast: true, msg: '姓名输入字符不合法，请重新输入！' })
        return '姓名输入字符不合法，请重新输入！'
    }
    if (reg.test(englishName)) {
        if (englishName.length < 3) {
            // alert('英文名/拼音输入字符不合法，请重新输入！');
            // store.commit('setToastObj', { showToast: true, msg: '姓名输入字符不合法，请重新输入！' })
            return '姓名输入字符不合法，请重新输入！'
        } else if (englishName.length > 48) {
            // alert('英文名/拼音最多可输入48个字符！');
            // store.commit('setToastObj', { showToast: true, msg: '姓名最多可输入16个字符！' })
            return '英文名/拼音最多可输入48个字符！'
        } else {
            return 'success'
        }
    } else {
        // alert('英文名/拼音格式不正确！');
        // store.commit('setToastObj', { showToast: true, msg: '姓名格式不正确！' })
        return '英文名/拼音格式不正确！'
    }
}



// ================================身份证校验相关=======================================

// 根据身份证得到 生日 和 性别
export function getBirthAndSex(iIdNo) {
    var birthday = '';
    var returnData = {};
    if (iIdNo.length == 15) {
        birthday = "19"+iIdNo.substr(6,6);
        returnData.birthday = birthday.replace(/(.{4})(.{2})/,"$1-$2-");
        returnData.sex      = parseInt(iIdNo.substring(14, 1), 10) % 2 == 1 ? "0": "1";
    } else if (iIdNo.length == 18) {
        birthday = iIdNo.substr(6,8);
        returnData.birthday = birthday.replace(/(.{4})(.{2})/,"$1-$2-");
        returnData.sex      = parseInt(iIdNo.substring(17, 1), 10) % 2 == 1 ? "0" : "1";
    } else{
        returnData.birthday = "";
        returnData.sex      = "";
    }
    return returnData;
}

// 从身份证号码中提取出身日期
export function GetBirthdayByID (idCard) {
    var birthday = "";
    if(idCard != null && idCard != ""){
        if(idCard.length == 15){
            birthday = "19"+idCard.substr(6,6);
        } else if(idCard.length == 18){
            birthday = idCard.substr(6,8);
        }
        birthday = birthday.replace(/(.{4})(.{2})/,"$1-$2-");
    }
    return birthday;
}

//把中国标准时间转换为‘2020-9-10 19:38:22’
export function changeFullTime(date){
    var d = new Date(date);
  
    var datetime =
      d.getFullYear() +
      "-" +
      (d.getMonth() + 1) +
      "-" +
      d.getDate() +
      " " +
      d.getHours() +
      ":" +
      d.getMinutes() +
      ":" +
      d.getSeconds();
    // console.log(datetime);
    return datetime;
  }

// 根据出生日期计算年龄
export function GetAgeByBirthday(birthday) {
    let Age = 0,
        birthdayArr = birthday.split("-"),
        birthYear = birthdayArr[0],       // 出生年
        birthMonth = birthdayArr[1],       // 出生月
        birthDay = birthdayArr[2],       // 出生日
        date = new Date(),           // 获取当前日期
        nowYear = date.getFullYear(),   // 当前年
        nowMonth = date.getMonth() + 1,  // 当前月
        nowDay = date.getDate();       // 当前日

    let ageDiff = nowYear - birthYear;
    if (ageDiff < 0) {
        Age = -1;  //返回-1 表示出生日期输入错误 晚于今天
    } else if (ageDiff == 0) {
        Age = 0;   //同年 则为0岁 
    } else {
        let monthDiff = nowMonth - birthMonth;
        if (monthDiff == 0) {   // 同月的情况下 比较日
            var dayDiff = nowDay - birthDay;
            if (dayDiff < 0) {
                Age = ageDiff - 1;
            } else {
                Age = ageDiff;
            }
        } else if (monthDiff < 0) {
            Age = ageDiff - 1;
        } else {
            Age = ageDiff;
        }
    }
    return Age;   //返回周岁年龄 
}
//校验身份证的最后一个校验位
function GetVerifyBit(id) {
    let result;
    let nNum = eval(id.charAt(0) * 7 + id.charAt(1) * 9 + id.charAt(2) * 10 + id.charAt(3) * 5 + id.charAt(4) * 8 + id.charAt(5) * 4 + id.charAt(6) * 2 + id.charAt(7) * 1 + id.charAt(8) * 6 + id.charAt(9) * 3 + id.charAt(10) * 7 + id.charAt(11) * 9 + id.charAt(12) * 10 + id.charAt(13) * 5 + id.charAt(14) * 8 + id.charAt(15) * 4 + id.charAt(16) * 2);
    nNum = nNum % 11;
    switch (nNum) {
        case 0 :
            result = "1";
            break;
        case 1 :
            result = "0";
            break;
        case 2 :
            result = "X";
            break;
        case 3 :
            result = "9";
            break;
        case 4 :
            result = "8";
            break;
        case 5 :
            result = "7";
            break;
        case 6 :
            result = "6";
            break;
        case 7 :
            result = "5";
            break;
        case 8 :
            result = "4";
            break;
        case 9 :
            result = "3";
            break;
        case 10 :
            result = "2";
            break;
        default:
            break
    }
    return result;
}

 

// 校验身份证
export function checkIDNo(idCard) {
    let SystemDate = new Date();
    let year       = SystemDate.getFullYear();
    let month      = SystemDate.getMonth() + 1;
    let day        = SystemDate.getDate();
    let yyyy;
    let mm;
    let dd;
    let id = idCard;
    if(idCard === undefined || idCard === '' ||  idCard === null){
        return "居民身份证号码不能为空！";
    } else {
        let id_length = id.length;
        if(idCard=="null"){
            return "居民身份证号码输入不合法！";
        }
        if (id_length != 18) {
            return "居民身份证号码长度应为18位！";
        }
        if (id_length == 15) {
            for (let i = 0; i < id_length; i++) {
                if (isNaN(idCard.charAt(i))) {
                    return "15位居民身份证号码中不能有字符！";
                }
            }
            yyyy = "19" + id.substring(6, 8);
            mm = id.substring(8, 10);
            dd = id.substring(10, 12);
            if (mm > 12 || mm <= 0) {
                return "居民身份证生日月份非法！";
            }
            if (dd > 31 || dd <= 0) {
                return "居民身份证号码生日日期非法！";
            }
            if ((mm == 4 || mm == 6 || mm == 9 || mm == 11) && (dd > 30)) {
                return "居民身份证号码生日日期非法！";
            }
            /*判断2月份*/
            if (mm == 2) {
                let isflag = false;
                let intYear = yyyy;
                if (intYear % 100 == 0) {
                    if (intYear % 400 == 0) {
                        isflag = true;
                    }
                } else {
                    if ((intYear % 4) == 0) {
                        isflag = true;
                    }
                }
                if (isflag) {
                    if (dd > 29) {
                        return "居民身份证号码生日日期非法！";
                    }
                } else {
                    if (dd > 28) {
                        return "居民身份证号码生日日期非法！";
                    }
                }
            }
        } else {
            for (let i = 0; i < id_length - 1; i++) {
                if (isNaN(idCard.charAt(i))) {
                    return "居民身份证号码中前17位中不能有字符！";
                }
            }
            if (isNaN(idCard.charAt(17)) && idCard.charAt(17) != "X" && idCard.charAt(17) != "x") {
                return "居民身份证号码校验错误，请认真检查！";
            }
            if (idCard.indexOf("X") > 0 && idCard.indexOf("X") != 17 || idCard.indexOf("x") > 0 && idCard.indexOf("x") != 17) {
                return "居民身份证号码中\"X\"输入位置不正确！";
            }
            yyyy = id.substring(6, 10);
            if (yyyy > year || yyyy < 1900) {
                return "居民身份证号码生日年度非法！";
            }
            mm = id.substring(10, 12);
            if (mm > 12 || mm <= 0) {
                return "居民身份证号码生日月份非法！";
            }
            if (yyyy == year && mm > month) {
                return "居民身份证号码生日月份非法！";
            }
            dd = id.substring(12, 14);
            if (dd > 31 || dd <= 0) {
                return "居民身份证号码生日日期非法！";
            }
            /*4,6,9,11月份日期不能超过30*/
            if ((mm == 4 || mm == 6 || mm == 9 || mm == 11) && (dd > 30)) {
                return "居民身份证号码生日日期非法！";
            }
            /*判断2月份*/
            if (mm == 2) {
                let isflag = false;
                let intYear = yyyy;
                if (intYear % 100 == 0) {
                    if (intYear % 400 == 0) {
                        isflag = true;
                    }
                } else {
                    if ((intYear % 4) == 0) {
                        isflag = true;
                    }
                }
                if (isflag) {
                    if (dd > 29) {
                        return "居民身份证号码生日日期非法！";
                    }
                } else {
                    if (dd > 28) {
                        return "居民身份证号码生日日期非法！";
                    }
                }
            }
            if (yyyy == year && mm == month && dd > day) {
                return "居民身份证号码生日日期非法！";
            }
            if (id.charAt(17) == "x" || id.charAt(17) == "X") {
                if ("x" != GetVerifyBit(id) && "X" != GetVerifyBit(id)) {
                    return "居民身份证号码校验错误，请认真检查！";
                }
            } else {
                if (id.charAt(17) != GetVerifyBit(id)) {
                    return "居民身份证号码校验错误，请认真检查！"
                }
            }
        }
    }
    // return true;
    return 'success'
}

let  commonUtils = {
    checkIDNo: function (idNo) {
         return checkIDNo(idNo)
    },
    checkPhoneNo: function (phoneNum) {
        return checkPhoneNo(phoneNum)
    },
    checkName: function (name) {
        let re = /^(([A-Za-z]+\s+)*[A-Za-z]+)$/ // 纯英文
        var reg = /^([\u4E00-\u9FA5]+(?:[·•][\u4E00-\u9FA5]+)*|(([A-Za-z]+\s+)*[A-Za-z]+))$/ // 纯中文
        if (!name) {
            // store.commit('setToastObj', { showToast: true, msg: '姓名不能为空！' })
            return '姓名不能为空！'
        }
        if (reg.test(name)) {
            return checkName(name)
        }
        if (re.test(name)) {
            return checkEnName(name)
        }
        // store.commit('setToastObj', { showToast: true, msg: '姓名输入字符不合法，请重新输入！' })
        return '姓名输入字符不合法，请重新输入！'
    },
    getBirthAndSex:function(iIdNo){
        return getBirthAndSex(iIdNo)
    },
    getAgeByBirthday:function(birthday){
        return GetAgeByBirthday(birthday)
    },
    changeFullTime:function(date){
        return changeFullTime(date)
    },
    getAgeByIdNo:function (idNo) {
        return GetAgeByBirthday(GetBirthdayByID(idNo))
        // return 23 // 测试使用
    },
    setSessionItem: function (key,value) {
        setSessionItem(key, value)
    },
    getSessionItem: function (key) {
        return getSessionItem(key)
    },
    removeSessionItem: function (key) {
        removeSessionItem(key)
    },
}
export {
    commonUtils
}
