module.exports.createHtml = function(reqBody){
	var subject = reqBody.subject;
	var name = reqBody.name;
	var msg = reqBody.message;
	return '<ul><li><strong>Subject:</strong>'+
	subject + '</li><br><li><strong>From:</strong>' + name+'</li><br><li><strong>Message:</strong><br>' + 
	msg + '</li></ul>';
}

module.exports.createMsg = function(reqBody){
	var subject = reqBody.subject;
	var name = reqBody.name;
	var msg = reqBody.message;
	return 'Subject:'+
	subject + 'From:' + name+'Message:' + msg;
}