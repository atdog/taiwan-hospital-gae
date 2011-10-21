	$(document).ready(function() {
	//dropTable();
        /* $('#editButton').addClass('hidden'); */
		selectAllPerson();
	});

	function selectAllPerson() {
        updateLeftList();
	}

	function updateLeftList() {
        $('#personList').html("");
        var results = $.cookie("data");
        if(results == null) {
        	return;
        }
		for ( var i = 0; i < results.length; i++) {
			var person = results[i];

			$('#personList')
					.append(
							'<div class="photo"><img src="http://www.cs.nctu.edu.tw/~hcsu/hospital_db/view_image.php?id='
                                    + person.id
									+ '" width="100px" onClick="updateRightData(\''
									+ person.name
									+ '\',\''
									+ person.id
									+ '\',\''
									+ person.birthday
									+ '\',\''
									+ person.phone
									+ '\',\''
									+ person.gender
									+ '\',\''
									+ person.nation
									+ '\',\''
									+ person.marriage
									+ '\')"></img></div>');
		}
	}
	function deletePerson(idNumber) {
        var results = $.cookie("data");
		for ( var i = 0; i < results.length; i++) {
            if(results[i].id == idNumber) {
                results.splice(i,1);
                break;
            }
        }
        $.cookie("data", results);
        $('#editButton').addClass('hidden');
        updateLeftList();
		$('#inputNameValue').html("");
		$('#inputIdValue').html("");
		$('#inputBirthdayValue').html("");
		$('#inputPhoneValue').html("");
        hideEditPage();
	}
	function updateRightData(name, id, birthday, phone, gender,nation,marriage) {
        /* $('#editButton').removeClass('hidden'); */

		$('#inputNameValue').val(name);
		$('#inputIdValue').val(id);
		$('#inputBirthdayValue').val(birthday);
		$('#inputPhoneValue').val(phone);
		$('#inputGender').val(gender);
		$('#inputNation').val(nation);
		$('#inputMarriage').val(marriage);
	}
	function updateCookieCheck(){
		alert('XD');
		$('#checkRegister').html("");
		$('#checkRegister').append('<div id="title">掛號成功</div>');
		$('#checkRegister').removeClass('hidden');
		$('#transparent').removeClass('hidden');
		 /* $('#checkRegister').html("是否儲存個人資訊在此裝置，若不儲存則無法在首頁看到您的掛號資訊");
		 $('#checkRegister').append('<div id="check" onClick="updateCookie()">是</div><div id="check" onClick="submitRegister()">否</div>'); */
		
	}
    function updateCookie() {
		var inputName = $('#inputNameValue').val();
		var inputId = $('#inputIdValue').val();
		var inputBirthday = $('#inputBirthdayValue').val();
		var inputPhone = $('#inputPhoneValue').val();
		var inputGender = $('#inputGender').val();
		var inputNation = $('#inputNation').val();
		var inputMarriage = $('#inputMarriage').val();


        if(inputName.length != 0 && inputId.length != 0 && inputBirthday.length != 0 && inputPhone.length != 0 && inputGender != 0 && inputNation != 0 && inputMarriage != 0) {
            /* $('#transparentBackground').removeClass("hidden"); */
            if( navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/iPad/i)) {
                window.location="/submitNewUserInfo";
            }
            //for cookie
            var old_data = $.cookie("data");
            var isExist = false;
            var candidate;
            if(old_data == null) {
                old_data = new Array();
            }
            else {
                for ( var i = 0; i < old_data.length; i++) {
                    if(old_data[i].id == inputId) {
                        isExist = true;
                        candidate = i;
                        break;
                    }
                }
            }
            
            if(!isExist) {
            	var row = $
				.template('<div class="row"><div class="clear"></div></div>');
       			 $('#checkRegister').html("");
        		 $('#checkRegister').append('<div id="title">儲存個人資訊</div>');
				 $('#checkRegister').append('<div class="row"><div class="center">是否儲存個人資訊在此裝置，若不儲存則無法在首頁看到您的掛號資訊</div></div>');
		
        		 $('#checkRegister').append('<div class="row"><div class="leftBtn" id="checkyes" onClick="saveUserInfo();">是</div><div class="rightBtn" id="checkno" onClick="NoSaveUserInfo();">否</div><div class="clear"></div></div>');
				 $('#checkRegister').removeClass('hidden');
				 $('#transparent').removeClass('hidden');
        		 var queryDivTop = (window.innerHeight - $('#checkRegister').height()) / 2;
        		 $('#checkRegister').css("top", queryDivTop);
   	
            }
            else {
                old_data[candidate].name = inputName;
                old_data[candidate].id = inputId;
                old_data[candidate].birthday = inputBirthday;
                old_data[candidate].phone = inputPhone;
                old_data[candidate].gender = inputGender;
                old_data[candidate].nation = inputNation;
                old_data[candidate].marriage = inputMarriage;
                $.cookie("data",old_data);
                //updateLeftList();
                //updateRightData(inputName, inputId, inputBirthday, inputPhone);
                //hideEditPage();

    			$.ajax({
    				type : "GET",
    				url : "http://www.cs.nctu.edu.tw/~hcsu/hospital/local-ajax/newUser.php",
    				dataType : "jsonp",
    				data : {
    					"id" : inputId,
    					"birthday" : inputBirthday
    				},
    				success : function(response) {
    					 submitRegister(); 
    				},
    				error : function(xhr, ajaxOptions, thrownError) {
    					//alert(xhr.status);
    					//alert(thrownError);
    				}
    			});
            }
            
           
		} else {
            showNotifiaction();
		}
    }

    function saveUserInfo() {
    	var inputName = $('#inputNameValue').val();
		var inputId = $('#inputIdValue').val();
		var inputBirthday = $('#inputBirthdayValue').val();
		var inputPhone = $('#inputPhoneValue').val();
		var inputGender = $('#inputGender').val();
		var inputNation = $('#inputNation').val();
		var inputMarriage = $('#inputMarriage').val();
        //for cookie
        var old_data = $.cookie("data");
        var isExist = false;
        var candidate;
        if(old_data == null) {
            old_data = new Array();
        }
        else {
            for ( var i = 0; i < old_data.length; i++) {
                if(old_data[i].id == inputId) {
                    isExist = true;
                    candidate = i;
                    break;
                }
            }
        }
    	var data = {
                name: inputName,
                id: inputId,
                birthday: inputBirthday,
                phone: inputPhone,
                gender: inputGender,
                nation: inputNation,
                marriage: inputMarriage
            };
            old_data.push(data);
            
            $.cookie("data",old_data);
            //updateLeftList();
            //updateRightData(inputName, inputId, inputBirthday, inputPhone);
            //hideEditPage();

			$.ajax({
				type : "GET",
				url : "http://www.cs.nctu.edu.tw/~hcsu/hospital/local-ajax/newUser.php",
				dataType : "jsonp",
				data : {
					"id" : inputId,
					"birthday" : inputBirthday
				},
				success : function(response) {
					 submitRegister(); 
				},
				error : function(xhr, ajaxOptions, thrownError) {
					//alert(xhr.status);
					//alert(thrownError);
				}
			});
    	
    }
    function NoSaveUserInfo() {
    	var inputName = $('#inputNameValue').val();
		var inputId = $('#inputIdValue').val();
		var inputBirthday = $('#inputBirthdayValue').val();
		var inputPhone = $('#inputPhoneValue').val();
    	


			$.ajax({
				type : "GET",
				url : "http://www.cs.nctu.edu.tw/~hcsu/hospital/local-ajax/newUser.php",
				dataType : "jsonp",
				data : {
					"id" : inputId,
					"birthday" : inputBirthday
				},
				success : function(response) {
					 submitRegister(); 
				},
				error : function(xhr, ajaxOptions, thrownError) {
					//alert(xhr.status);
					//alert(thrownError);
				}
			});   
    	
    
    }

	function backIndex() {
		window.location = "/";
	}
	function submitRegister() {
		var inputName = $('#inputNameValue').val();
		var inputId = $('#inputIdValue').val();
		var inputBirthday = $('#inputBirthdayValue').val();
		var inputPhone = $('#inputPhoneValue').val();
		$('#transparent').addClass('hidden');
		
        if(inputName.length == 0 || inputId.length == 0 || inputBirthday.length == 0 || inputPhone.length == 0 || $('#inputHospital').val() == "" || $('#inputDept').val() == ""|| $('#inputDoctor').val() == "" || $('#inputTime').val() == "" )
		{
            showNotifiaction();
			return;
		}


        /*
         *  Start query to register. If success, the data will write to database to record 
         */
        
        $.ajax({
                type: "GET",
                url: $('#hospitalUrl').val()+"/register",
                dataType: "jsonp",
                data: {
						'doctorId' : $('#doctorId').val(),
						'deptId' : $('#deptId').val(),
						'id' : $('#inputIdValue').val(),
						'birthday' : $('#inputBirthdayValue').val(),
						'time' : $('#inputTime').val(),
						'first' : 'true',
						'name' : $('#inputNameValue').val(),
						'gender' : $('#inputGender').val(),
						'nation' : $('#inputNation').val(),
						'marriage' : $('#inputMarriage').val(),				
                },
                success: function(response) {
                },
                error : function(xhr, ajaxOptions, thrownError) {
                }
        });
        return;
		
		$
				.ajax({
					type : "GET",
					url : "http://www.cs.nctu.edu.tw/~hcsu/hospital/local-ajax/register.php",
					dataType : "jsonp",
					data : {
						'hospitalId' : $('#hospitalId').val(),
						'doctorId' : $('#doctorId').val(),
						'deptId' : $('#deptId').val(),
						'hospital' : $('#inputHospital').val(),
						'dept' : $('#inputDept').val(),
						'doctor' : $('#inputDoctor').val(),
						'id' : $('#inputIdValue').val(),
						'birthday' : $('#inputBirthdayValue').val(),
						'time' : $('#inputTime').val(),
						'first' : 'true'
					},
					success : function(response) {
						var row = $
								.template('<div class="row"><div class="left">${item}</div><div class="right">${value}</div><div class="clear"></div></div>');
                        $('#checkRegister').html("");
                        $('#checkRegister').append('<div id="title">掛號成功</div>');
						$('#checkRegister').append(row, {
							item : '醫院:',
							value : $('#inputHospital').val()
						});
						$('#checkRegister').append(row, {
							item : '科別:',
							value : $('#inputDept').val()
						});
						$('#checkRegister').append(row, {
							item : '醫生:',
							value : $('#inputDoctor').val()
						});
						$('#checkRegister').append(row, {
							item : '時段:',
							value : $('#inputTime').val()
						});
						$('#checkRegister').append(row, {
							item : '診號:',
							value : response['message']
						});
		                $('#checkRegister').append('<div id="check" onClick="backIndex();">確認完成</div>');
						$('#checkRegister').removeClass('hidden');
						$('#transparent').removeClass('hidden');
                        var queryDivTop = (window.innerHeight - $('#checkRegister').height()) / 2;
                        $('#checkRegister').css("top", queryDivTop);
					},
					error : function(xhr, ajaxOptions, thrownError) {
						alert("Error. back to main page");
                        
						//window.location="/";
					}
				});

	}
	

	
	function lastPage() {
		$("body").append('<div id="loadingNewPage">載入中...</div>');
		window.location='/register	';
	}	
	

    function editPage(title, newInfo) {
        if(newInfo == 1) {
            $('#inputName').val("");
            $('#inputId').val("");
            $('#inputBirthday').val("");
            $('#inputPhone').val("");
            $('#deleteButton').addClass('hidden');
        }
        else {
            $('#inputName').val($('#inputNameValue').html());
            $('#inputId').val($('#inputIdValue').html());
            $('#inputBirthday').val($('#inputBirthdayValue').html());
            $('#inputPhone').val($('#inputPhoneValue').html());
            $('#deleteButton').removeClass('hidden');
        }
        $('#editInfo').slideDown('slow');
        $('#transparent').removeClass('hidden');
        $('#newInfoTitle').html(title);
    }
	
    function hideEditPage() {
        $('#editInfo').slideUp('slow');
        $('#transparent').addClass('hidden');

    }

    function closeEditMode() {
        if( navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/iPad/i)) {
            window.location="/cancel";
        }
        hideEditPage();
    }
		
    function takeshot() {
        if($('#inputIdValue').val() == "") {
            showNotifiaction();
        }
        else {
            if( navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/iPad/i)) {
                window.location='/takeshot?id='+$('#inputIdValue').val();
            }
        }
    }