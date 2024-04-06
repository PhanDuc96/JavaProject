let accounts = [];
let classList = [];
let pageSizeAccount = 5;
let pageNumberAccount = 1;
let sortBy_Account = "id";
let sortType_Account = "asc";


let userName = "";
let apiAcount = "http://localhost:8686/api/v1/account"

function SearchAccountRequest(pageSize, pageNumber, sortBy, sortType, userName){
    this.pageSize = pageSize;
    this.pageNumber = pageNumber;
    this.sortField = sortBy;
    this.sortType = sortType;
    this.name = userName;
    }

$(function () {
    console.log(13123)
    buildAccountPage();
    getClassList();
    checkAdmin();
})

function checkAdmin(){
    if(role != 'ADMIN'){
        $("#account-add-button").empty();
    }
}

// function buildClassList(){
//     classList = [];
//     getClassList();
// }

function getClassList(){
    // -------------------------------- CALL API GET ALL CLASS -------------------
    $.ajax({
        url: "http://localhost:8686/api/v1/classEntity/getAll",
        type: "GET",
        beforeSend: function (xhr) {
          xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem("token"));
        },
        contentType: "application/json",
        error: function (err) {
          console.log(err)
          showAlrtError(err.responseJSON.message)
        },
        success: function (data) {
            fillClassToForm(data);

        }
      });


}


function buildAccountPage(){
    accounts = [];
    getListAccount();
    // fetch('./assets/data/class.json')
    // .then((response) => response.json())
    // .then((json) =>{
    //     fillClassToForm(json.content);
    // }
    // );
}

function fillClassToForm(data){
    if(data){
        $('#ac-class').empty();
        data.forEach(function (item) {
            $('#ac-class').append(
                `<option value="`+item.id +`">`+item.className+`</option>`
            )
        });
    }

    // if(data){
    //     classList = data;
    // }
    // classList.forEach(function (item) {
    //     $('#ac-class').append(
    //         `<option value="`+item.id +`">`+item.className+`</option>`
    //     )
    // });
}
// gọi api GetAllAccount
async function getListAccount() {
    let request = new SearchAccountRequest(pageSizeAccount, pageNumberAccount - 1, sortBy_Account, sortType_Account, userName);
    $.ajax({
        url: apiAcount + "/search",
        type: "POST",
        beforeSend: function (xhr) {
          xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem("token"));
        },
        contentType: "application/json",
        data: JSON.stringify(request),
        error: function (err) {
          console.log(err)
          showAlrtError(err.responseJSON.message)
        },
        success: function (data) {
            fillAccountToTable(data.content);
            buildPaginationAccount(data.number + 1, data.totalPages);
        }
      });

    // fetch('./assets/data/account.json')
    //     .then((response) => response.json())
    //     .then((json) =>{
    //         fillAccountToTable(json.content);
    //         buildPaginationAccount(json.number + 1, json.totalPages);
    //     }
    //     );
}

function searchName(){
    userName = document.getElementById("searchname").value;
    pageNumberAccount = 1;
    getListAccount();
}

function fillAccountToTable(json) {
    if(json){
        accounts = json;
    }
    // check form trống để k lặp lại khi chuyền data
    $('tbody').empty();
    var index = 1;
    console.log(accounts);
    accounts.forEach(function (item) {
        let actionAdmin = role == 'ADMIN' ? '<a class="edit" title="go to  detail" data-toggle="tooltip" onclick="editAccount(' + 
        item.id + ')"><i class="ti-pencil m-1 text-warning" style="font-size:24px"></i></a>' +

        '<a class="edit" title="go to  detail" data-toggle="tooltip" onclick="confirmDeleteAccount(' + 
        item.id + ')"><i class="ti-trash m-1 text-danger" style="font-size:24px"></i></a>' +
        '</td>' : '';
        $('tbody').append(
            '<tr>' +
            '<td>' + (index++) + '</td>' +
            '<td>' + item.username + '</td>' +
            '<td>' + item.birthDay + '</td>' +
            '<td>' + item.address + '</td>' +
            '<td>' + item.fullName + '</td>' +
            '<td>' + item.role + '</td>' +
            '<td>' + item.phoneNumber + '</td>' +
            '<td>' + item.email + '</td>' +
            '<td><a target="_blank" href=' + '"' + item.faceBook + '"> ' + item.faceBook + '<a/></td>' +

            '<td>' +
            actionAdmin
             +
            '</tr>'
        )
    });
}

function buildPaginationAccount(number, totalPages) {
    // kiểm tra nếu trang hiện tại là trang đầu -> disable đi

    if (number === 1) {
        $("#pagination-account").empty().append(
            `<li class="page-item">
            <a class="page-link disabled" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
                <span class="sr-only">Previous</span>
            </a>
        </li>`);
    } else {
        $("#pagination-account").empty().append(
            `<li class="page-item">
            <a class="page-link" href="#" aria-label="Previous" onclick="prePageAccount()">
                <span aria-hidden="true">&laquo;</span>
                <span class="sr-only">Previous</span>
            </a>
        </li>`);
    }

    // Dùng hàm for để build ra số trang. Kiểm tra xem trang hiện tại là bao nhiêu thì background vàng
    for (let index = 1; index <= totalPages; index++) {
        if (number === (index)) {
            $('#pagination-account').append(`<li class="page-item "><a class="page-link bg-primary" href="#" onclick="chosePageAccount(` + index + `)">`+index+`</a></li>`);
        } else {
            $('#pagination-account').append(`<li class="page-item"><a class="page-link" href="#" onclick="chosePageAccount(` + index + `)">`+index+`</a></li>`);
        }
    }

    // Kiểm tra nếu trang hiện tại là trang cuối -> disable đ
    if (number === totalPages) {
        $("#pagination-account").append(
            `<li class="page-item">
            <a class="page-link" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
                <span class="sr-only">Next</span>
            </a>
        </li>`);
    } else {
        $("#pagination-account").append(
            `<li class="page-item">
            <a class="page-link" href="#" aria-label="Next" onclick="nextPageAccount()">
                <span aria-hidden="true">&raquo;</span>
                <span class="sr-only">Next</span>
            </a>
        </li>`);
    }
}

function chosePageAccount(page) {
    event.preventDefault()
    pageNumberAccount = page;
    getListAccount();
}
function prePageAccount() {
    event.preventDefault()
    pageNumberAccount--;
    getListAccount();
}

function nextPageAccount() {
    event.preventDefault()
    pageNumberAccount++;
    getListAccount();
}

function addAccount(){
    resetFromEditAccount();
    $('#accountModal').modal('show')
}

function editAccount(accountId){
    let account = accounts.find(account => account.id === accountId)
    console.log(account);
    resetFromEditAccount();
    $('#ac-id').val(account.id);
    $('#ac-username').val(account.username);
    $('#ac-fullName').val(account.fullName);
    $("#ac-birthDay").val(account.birthDay);
    $("#ac-phoneNumber").val(account.phoneNumber);
    $("#ac-role").val(account.role);
    $("#ac-address").val(account.address);
    $("#ac-email").val(account.email);
    $("#ac-facebook").val(account.faceBook);
    $("#ac-information").val(account.information);
    $("#ac-class").val(account.classEntityId);
    $("#ac-password").val(account.password);
    $('#accountModal').modal('show')
}


function saveAccount() {
    // Lấy các thông số để lưu
    let accountId = $('#ac-id').val();
    let userName = $('#ac-username').val();
    let fullName = $('#ac-fullName').val();
    let birthDay = $("#ac-birthDay").val();
    let phoneNumber = $("#ac-phoneNumber").val();
    let role = $("#ac-role").val();
    let address = $("#ac-address").val();
    let email = $("#ac-email").val();
    let facebook = $("#ac-facebook").val();
    let information = $("#ac-information").val();
    let classEntityId = $("#ac-class").val();
    let password = $("#ac-password").val();
// ---------------------------------- CALL API UPDATE OR CREATE ----------------------------------
    
    let request = {
        "userName": userName,
        "accountId": accountId,
        "birthDay": birthDay,
        "address": address,
        "phoneNumber": phoneNumber,
        "fullName": fullName,
        "email": email,
        "faceBook": facebook,
        "information": information,
        "role": role,
        "classEntityId": classEntityId,
        "password": password
        };

        let api = accountId ? apiAcount + "/update" : apiAcount + "/create";
        let method = accountId ? "PUT" : "POST";
        let message = accountId ? "Update Account thành công" : "Thêm mới account thành công"

        $.ajax({
            url: api,
            type: method,
            beforeSend: function (xhr) {
              xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem("token"));
            },
            contentType: "application/json",
            data: JSON.stringify(request),
            error: function (err) {
            console.log(err)
            showAlrtError(err.responseJSON.message)
            },
            success: function (data) {
                $('#accountModal').modal('hide')
                showAlrtSuccess(message);
                getListAccount();
            }
        });
}

function resetFromEditAccount(){
    $('#ac-id').val("");
    $('#ac-username').val("");
    $('#ac-fullName').val("");
    $("#ac-birthDay").val("");
    $("#ac-phoneNumber").val("");
    $("#ac-role").val("STUDENT");
    $("#ac-address").append("");
    $("#ac-email").val("");
    $("#ac-facebook").val("");
    $("#ac-information").val("");
    $("#ac-class").val("");
}

function confirmDeleteAccount(accountId) {
    $('#confirmDeleteAccount').modal('show')
    $('#accountIdToDelete').val(accountId)
}

function deleteAccount() {
    let accountId = document.getElementById("accountIdToDelete").value;
    console.log(accountId);
    $('#confirmDeleteAccount').modal('hide')

// ---------------------------------- CALL API DELETE ----------------------------------
$.ajax({
    url: apiAcount + "/" + accountId,
    type: "DELETE",
    beforeSend: function (xhr) {
      xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem("token"));
    },
    contentType: "application/json",
    // data: JSON.stringify(request),
    error: function (err) {
      console.log(err)
      $('#confirmDeleteAccount').modal('hide')
      showAlrtError(err.responseJSON.message)
    },
    success: function (data) {
        $('#confirmDeleteAccount').modal('hide')
        showAlrtSuccess("Xoá Account thành công!");
        getListAccount();
    }
  });
    showAlrtSuccess("Xoá account thành công!");
}

