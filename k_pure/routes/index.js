/**
 * 首页展示信息
 */
exports.index1 = function(req,res){

	/**
	 * 给监听的view index添加返回数据
	 * @type {string}
	 */
  res.render('index',{title:"pure css"});
};