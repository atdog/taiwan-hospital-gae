$(function() {
	updatePersonalPage();
});

function deletePerson(idNumber) {
        var results = $.cookie("data");
		for ( var i = 0; i < results.length; i++) {
            if(results[i].id == idNumber) {
                results.splice(i,1);
                break;
            }
        }
        $.cookie("data", results);
        $('#editProfilePage').fadeOut("fast");
        updatePersonalPage();
}
function updatePersonalPage() {
	$('#profileData').html('');
	var cookie = $.cookie('data');
	if(cookie == null) {
		return;
	}
	for(var i = 0 ; i < cookie.length; ++i) {
		var person = cookie[i];
		$('#profileData').append("<div class='profilePhoto'><img onclick='choosePerson(\""+person.name+"\",\""+person.id+"\",\""+person.birthday+"\",\""+person.phone+"\",\""+person.gender+"\",\""+person.nation+"\",\""+person.marriage+"\")' src='http://www.cs.nctu.edu.tw/~hcsu/hospital_db/view_image.php?id="+person.id+"' width='120px'></img></div>");
	}
	
	
}
function newRegist() {
	window.location = "register";
};
function queryRegist(rid) {
    $('#queryDiv').html("");
	$.ajax({
		type : "GET",
		url : "http://www.cs.nctu.edu.tw/~hcsu/hospital/local-ajax/search_register.php",
		dataType : "jsonp",
		data: {
			"rid": rid
		},
		success : function(response) {
	        $('#queryDiv').html('<div id="title">掛號資訊</div>');
			var row = $.template('<div class="row"><div class="left">${item}:</div><div class="right">${value}</div><div class="clear"></div></div>');
			$('#queryDiv').append(row, {
				item:'醫院',
				value:response['hospital'],
			}).append(row, {
				item:'科別',
				value:response['dept'],
			}).append(row, {
				item:'醫生',
				value:response['doctor'],
			}).append(row, {
				item:'時段',
				value:response['time'],
			}).append(row, {
				item:'診號',
				value:response['number'],
			}).append('<div class="row"><div class="leftBtn" onClick="javascript:$(\'#queryDiv\').addClass(\'hidden\');$(\'#transparent\').addClass(\'hidden\')">確認完成</div><div class="rightBtn" onClick="cancelRegister(\''+response['rid']+'\',\''+response['hospitalURL']+'\',\''+response['deptId']+'\',\''+response['doctorId']+'\',\''+response['idNumber']+'\',\''+response['birthday']+'\',\''+response['realTime']+'\');">取消掛號</div><div class="clear"></div><div>');

            var queryDivTop = (window.innerHeight - $('#queryDiv').height()) / 2;
            $('#queryDiv').css("top", queryDivTop);

		},
		error : function(xhr, ajaxOptions, thrownError) {
			//alert(xhr.status);
			//alert(thrownError);
		}
	});
	$('#queryDiv').removeClass('hidden');
	$('#transparent').removeClass('hidden');
};

$(document).ready(function() {
	$('#calendar').fullCalendar({
		header:{
		    left:   'prev,next today',
		    center: 'title',
		    right:  'month,agendaWeek,agendaDay'
		},
        height: window.innerHeight-20,
	   	firstDay: 1,
	   	buttonText:{
	   		today: '今天',
	   		month:'月',
	   		week: '週',
	   		day:'日'
	    },
		dayClick: function(date, allDay, jsEvent, view) {
	        //alert('a day has been clicked!'+date);
	    },
	    eventClick: function(calEvent, jsEvent, view) {
	    	//alert('a event has been clicked!');
	    },
	});
	selectAllPerson();
});
function cancelRegister(rid, hospitalURL, deptId, doctorId, idNumber, birthday, time) {
	var results = $.cookie("data");
	var nation;
	for ( var i = 0; i < results.length; i++) {
		var person = results[i];
		if(person.id == idNumber) {
			nation = person.nation;
			break;
		}
	}
	$.ajax({
		type : "GET",
		url : "http://www.cs.nctu.edu.tw/~hcsu/hospital/local-ajax/cancel_register_to_hospital.php",
		dataType : "jsonp",
		data: {
			"url":hospitalURL,
			"doctor":doctorId,
			"dept":deptId,
			"id":idNumber,
			"birthday":birthday,
			"time":time,
			"nation":nation
		},
		success : function(response) {
			if(response.status == 0) {
					$.ajax({
						type : "GET",
						url : "http://www.cs.nctu.edu.tw/~hcsu/hospital/local-ajax/cancel_register.php",
						dataType : "jsonp",
						data: {
							"rid":rid
						},
						success : function(response) {
							$('#queryDiv').addClass('hidden');
							$('#transparent').addClass('hidden');
							window.location.reload();
						},
						error : function(xhr, ajaxOptions, thrownError) {
							//alert(xhr.status);
							//alert(thrownError);
						}
					});
			}
			else {
				showNotifiaction("取消掛號失敗");
			}
		},
		error : function(xhr, ajaxOptions, thrownError) {
			showNotifiaction("系統錯誤");
		}
	});
	return

}
function selectAllPerson() {
    updateLeftCalendar();
	//HospitalDB.transaction(function(transaction) {
	//	transaction.executeSql("SELECT * FROM personal_info;", [],
	//			updateLeftCalendar, errorHandler);
	//});
}
function updateLeftCalendar() {
    var results = $.cookie("data");
	var idMap = {'id':[]};
	if(results == null) {
		return;
	}
	IMAGEMAP = {};
	for ( var i = 0; i < results.length; i++) {
		var row = results[i];
		var id = row.id;
		var image = null;
		IMAGEMAP[id]=image;
		idMap.id.push(id);
	}
	$('#calendar').fullCalendar('addEventSource', {
		url: 'http://www.cs.nctu.edu.tw/~hcsu/hospital/local-ajax/schedule.php',
 		data: {
 			'idJson': JSON.stringify(idMap, replacer),
 		},
		success: function(response) {
			$('#listDiv .tableDiv').html("");
			var row = $.template('<div class="rowDiv" onClick="queryRegist(\'${rid}\')"><div class="rowLeft"><img src="${image}" width="100%"></img></div><div class="rowRight"><p>${title}</p><p>${subtitle}</p>${time}</div><div class="clear"></div></div>');
			for( var j =0; j< response.length ;++j) {
				$('#listDiv .tableDiv').append(row,{
					rid:response[j]['rid'],
					image:"http://www.cs.nctu.edu.tw/~hcsu/hospital_db/view_image.php?id="+response[j]['idNumber'],
					title:response[j]['title'],
					subtitle:response[j]['subtitle'],
					time:response[j]['start']
				});	
			}
		},
  		dataType: 'jsonp',
	    error : function(xhr, ajaxOptions, thrownError) {
	    	//alert(xhr.status);
	    	//alert(thrownError);
	    },
  		color: "purple",
	});
}
function replacer(key, value) {
    if (typeof value === 'number' && !isFinite(value)) {
        return String(value);
    }
    return value;
}

function showPersonalInfo() {
	$('#transparentProfile').removeClass('hidden');
	$('#profileButton').unbind('click',showPersonalInfo);

	$('#profile').animate({"left":"0px"},"slow");
	
	
	$('#profileButton').bind('click',hidePersonalInfo);
	
}
function hidePersonalInfo() {
	$('#profileButton').unbind('click',hidePersonalInfo);
	$('#profile').animate({"left":"-200px"},"slow");
	$('#transparentProfile').addClass('hidden');
	$('#editProfilePage').fadeOut("slow");
	$('#profileButton').bind('click',showPersonalInfo);
}

function choosePerson(name,id,birthday,phone,gender,nation,marriage) {
	$('#editProfilePage').fadeOut("fast");
	$('#editProfilePage').fadeIn("slow");
	
	$('#editProfilePage').html("<div class=title>"+name+"<span class='button' style='float:right;' onClick='deletePerson(\""+id+"\")'>刪除</span></div><div id='personalInfo'><div id='personalImage'><img src='http://www.cs.nctu.edu.tw/~hcsu/hospital_db/view_image.php?id="+id+"' width='140px'></img><div class='button'>拍照</div></div><div id='personalContent'><div><div class='row'><span class='left'>身分證字號：</span><span class='right'>"+id+"</span></div><div class='row'><span class='left'>生日：</span><span class='right'>"+birthday+"</span></div><div class='row'><span class='left'>電話：</span><span class='right'>"+phone+"</span></div><div class='row'><span class='left'>性別：</span><span class='right'>"+GenderList[gender]+"</span></div><div class='row'><span class='left'>國籍：</span><span class='right'>"+NationList[nation]+"</span></div><div class='row'><span class='left'>婚姻：</span><span class='right'>"+MarriageList[marriage]+"</span></div></div>");
}