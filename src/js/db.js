
function initDatabase() {
    if(window.openDatabase) {
        HospitalDB = window.openDatabase("person", "", "hospital personal database", 1024*1024);
        createTable();
    }	
    else {
        alert("Local storage is not supported by this browser");
    }
}

function createTable() {
    HospitalDB.transaction(function(transaction) {  
            transaction.executeSql('CREATE TABLE IF NOT EXISTS personal_info(keyId INTEGER PRIMARY KEY AUTOINCREMENT,name TEXT NOT NULL,id TEXT UNIQUE NOT NULL,birthday TEXT NOT NULL,phone TEXT NOT NULL, image TEXT NOT NULL, color TEXT NOT NULL);', [], nullDataHandler, errorHandler);  
            }); 	
}

function selectAll() {
    HospitalDB.transaction(function(transaction){
            transaction.executeSql("SELECT * FROM personal_info;", [],  
                dataSelectHandler, errorHandler);
            });
}

function insertPersonInfo(keyId, name, id, birthday, phone) {
    if(name.length == 0 || id.length == 0 || birthday.length == 0 || phone.length == 0) {
        return false;
    }
    if(keyId == 0) {
        // insert new row
        HospitalDB.transaction(function (transaction) {  
                var data = [name, id, birthday, phone, 'http://www.cs.nctu.edu.tw/~hcsu/view_image.php?id=1', 'red'];  
                transaction.executeSql("INSERT INTO personal_info(name, id, birthday, phone, image, color) VALUES (?, ?, ?, ?, ?, ?)", [data[0], data[1], data[2], data[3], data[4], data[5]]);  
                });	

    }
    else {
        // update row in table
        HospitalDB.transaction(function (transaction) {  
                var data = [name, id, birthday, phone];  
                transaction.executeSql("UPDATE personal_info SET name=?, id=?, birthday=?, phone=? WHERE keyId = "+ keyId, [data[0], data[1], data[2], data[3]]);
                });

    }
    return true;
}
function dropTable(){  
    var db = window.openDatabase("person", "", "hospital personal database", 1024*1024);
    db.transaction(  
            function (transaction) {  
            transaction.executeSql("DROP TABLE personal_info;", [], nullDataHandler, errorHandler);  
            }  
            );  
    // location.reload();  
}  
function dataSelectHandler() {
    alert("select success!");
}
function errorHandler() {
    alert("something wrong!");
}
function nullDataHandler() {
    //alert("do nothing");
}
