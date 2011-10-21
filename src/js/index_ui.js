/**
 * 
 */

$(document).ready(function(){
	setHeight();
});
GenderList = ["","男生","女生"];
NationList = ["","本國","外國"];
MarriageList = ["","未婚","已婚","離婚","喪偶"];

window.onresize = function(event) {
	setHeight();
    $('#calendar').fullCalendar('option', 'height', window.innerHeight - 20 ); 
}

window.onload = function(event) {
	setHeight();    
}

function closeNotification() {
    $('#notification').addClass("hidden");
    $('#notificationBackground').addClass("hidden");
}
function showNotifiaction(text) {
	$('#notificationText').html(text);
    $('#notification').removeClass("hidden");
    $('#notificationBackground').removeClass("hidden");
    
}

function setHeight() {
	var height = window.innerHeight;
	var width = window.innerWidth;

	$("#listDiv").height(height);
	$("#personal").height(height);
	
    $('#transparent').height(height);
	$("#List").height(height);	
	$("#info").height(height);
	$("#Form").height(height);
	
	$(".formData").height(height-$(".redTitle").height()-$(".button").height()-120);
	//$(".tableDiv").height(height-$("#listTitle").height()-$("#new").height()-50);
	$(".tableDiv").height(height-$("#listTitle").height()-40);
	//$("#personList").height(height-$("#newInfo").height()-$('#photoTitle').height()-50);
	$("#personList").height(height-$('#photoTitle').height()-20);	

    var notificationTop = (window.innerHeight - $('#notification').height()) / 2;
    $('#notification').css("top", notificationTop);

    var whiteBackgroundTop = (window.innerHeight - $('#whiteBackground').height()) / 2;
    $('#whiteBackground').css("top", whiteBackgroundTop);
    var whiteBackgroundLeft = (window.innerWidth - $('#whiteBackground').width()) / 2;
    $('#whiteBackground').css("left", whiteBackgroundLeft);
    
    $('#profileButton').css("top","70%");
	/*
	$('#listDiv').css("border-right", width*0.003+"px solid #999");
	$('#personal').css("border-right", width*0.003+"px solid #999");
	$('#List').css("border-right", width*0.003+"px solid #999");
	
	$('#calendar').css("width",width*0.687);
	$('#Form').css("width",width*0.687);
	$('#info').css("width",width*0.687);
	*/
}
