/**
 * @constructor
 * @type {Object} 核心库
 */
var Core = {};
Core.util = {};

/**
 * 去掉字符串首位空格
 * @param  {String} str
 * @return {String}
 */
Core.util.trim = function(str){
	return str.replace(/^\s*|\s*$/g,"");
}
