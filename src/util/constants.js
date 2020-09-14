function BizEnum(enums) {
	this.enums = enums;
}

BizEnum.prototype.getList = function (codes) {
	var list = [];
	for (var key in this.enums) {
		if (codes && codes.length > 0) {
			if (codes.indexOf(this.enums[key].code) > -1) {
				list.push(this.enums[key]);
			}
		} else {
			list.push(this.enums[key]);
		}
	}
	return list;
}
BizEnum.prototype.getText = function (code) {
	for (let key in this.enums) {
		if (this.enums[key].code == code) {
			return this.enums[key].text;
		}
	}
	return '';
}
BizEnum.prototype.getCode = function (text) {
	for (let key in this.enums) {
		if (this.enums[key].text == text) {
			return this.enums[key].text;
		}
	}
	return '';
}

export default {
	// 性别
	GENDER: new BizEnum({
		女: {code: '0', text: '男'},
		男: {code: '1', text: '女'}
	}),
	// 证件类型
	ID_TYPE: new BizEnum({
        居民身份证 : {code:'0',text:'居民身份证'},
        护照 : {code:'1',text:'护照'},
        军官证 : {code:'2',text:'军官证'},
        驾照 : {code:'3',text:'驾照'},
        出生证明 : {code:'4',text:'出生证明'},
        户口簿 : {code:'5',text:'户口簿'},
        港澳居民来往内地通行证 : {code:'6',text:'港澳居民来往内地通行证'},
        台湾居民来往大陆通行证 : {code:'7',text:'台湾居民来往大陆通行证'},
        其他 : {code:'8',text:'其他'},
        异常身份证 : {code:'9',text:'异常身份证'},
        外国人永久居留身份证 : {code:'I',text:'外国人永久居留身份证'},
        港澳台居民居住证 : {code:'K',text:'港澳台居民居住证'}
	}),
	// 证件类型投保人
	ID_TYPE_1: new BizEnum({
        居民身份证 : {code:'0',text:'居民身份证'},
        护照      : {code:'1',text:'护照'},
        户口簿    : {code:'5',text:'户口簿'}
	}),
	// 证件类型被保人
	ID_TYPE_2: new BizEnum({
        居民身份证 : {code:'0',text:'居民身份证'},
        出生证明  : {code:'4',text:'出生证明'},
        户口簿    : {code:'5',text:'户口簿'},
	}),
	RELATION:new BizEnum({
		本人:{code:'00', text:'本人'},
		父母:{code:'01', text:'父母'},
		配偶:{code:'02', text:'配偶'},
		子女:{code:'03', text:'子女'},
		其他:{code:'04', text:'其他'},
		雇佣:{code:'05', text:'雇佣'},
		抚养:{code:'06', text:'抚养'},
		扶养:{code:'07', text:'扶养'},
		赡养:{code:'08', text:'赡养'}
	}),
	RELATION_2:new BizEnum({
		本人:{code:'00', text:'本人'},
		父母:{code:'01', text:'父母'},
		配偶:{code:'02', text:'配偶'},
		子女:{code:'03', text:'子女'}
	}),
	//['教育','医护','制造','IT','服务'],
	WORK_TYPE:new BizEnum({
		教育: {code: '0', text: '教育'},
		医护: {code: '1', text: '医护'},
		制造: {code: '2', text: '制造'},
		IT : {code: '3', text: 'IT'},
		服务: {code: '4', text: '服务'},
		金融: {code: '5', text: '金融'},
		学生: {code: '6', text: '学生'},
		公职人员: {code: '7', text: '公职人员'},
		其他: {code: '8', text: '其他'},
	}),
	//通用启用禁用状态
	ENABLE_STATUS: new BizEnum({
		ENABLED: {code: '1', text: '已启用'},
		DISABLED: {code: '0', text: '已禁用'}
	}),

	INPUT_TYPE: new BizEnum({
		SELECT: {code: 0, text: '下拉框'},
		TEXT: {code: 1, text: '文本框'}
	}),

	// //常用正则
	REG: {
		testCode:/^\d{4}$/, // 4位验证码
		// phone: /^\d{7,12}$/, //联系电话（包括手机、座机）
		phone: /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/, //联系电话（包括手机、座机）
		email: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/, //邮箱
		bankNum: /^\d{12,30}$/, //银行账号
		cnaps: /^\d{12}$/, //联行号：12位数字
		tel: /^1[3456789]\d{9}$/, //手机号码
		password: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,18}$/, //密码：6到18位字母数字组合
		// loginName: /^[A-Za-z]{3,20}$/ //注册账号
		loginName: /^[0-9a-zA-Z]{3,20}$/, //注册账号
		userName: /^[0-9a-zA-Z\u4E00-\u9FA5]{2,8}$/, //姓名
		goodsName: /^[0-9a-zA-Z\u4E00-\u9FA5（）()*.[\]【】]{1,50}$/, //商品名称验证
		payTreasure: /^(?:\w+\.?)*\w+@(?:\w+\.)+\w+|\d{9,11}$/, //支付宝 (不准确)
		socialCreditCode: /^[0-9a-zA-Z]{18}$/, //社会信用代码
		twoDecimal: /(^[0-9]{1,20}$)|(^[0-9]{1,20}[.][0-9]{1,2}$)/, //2位小数
		ein: /^[0-9A-Z]{18}$/, //税号
		cycle: /^[1-9]\d{0,4}$/, //结账周期
		alipay: /(^1\d{10}$)|(^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$)/, //支付宝账号验证
		materialBarcode: /^[A-Za-z0-9]+$/,//商品条码
		positiveInteger: /^[1-9]\d*$/,//正整数
		alipayAccount: /^[\dA-Za-z.@_]{1,30}$/, //支付宝账号
		nonnegativeInteger: /^\d+$/, //非负整数
		realName: /(^[\u4E00-\u9FA5]{2,8}$)|(^[0-9a-zA-Z]{2,18}$)/, //姓名
		idCard:/(^\d{15}$)|(^\d{17}([0-9]|X)$)/, // 身份证号简单校验
		hukou:/^[a-zA-Z0-9]{3,21}$/, // 户口本
		birthCertificate:/^[a-zA-Z0-9]{5,21}$/,// 出生证
	},

}
