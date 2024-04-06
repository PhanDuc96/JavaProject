
const urlAuth = "http://localhost:8686/api/v1/auth"

function Login(){
    
    let username = document.getElementById("Username").value;
    let password = document.getElementById("Password").value;

    console.log(username, password)

    let request = {
        "password": password,
        "username": username
    }

    $.ajax({
        url: urlAuth + "/login-jwt",
        type: "POST",
        // beforeSend: function (xhr) {
        //   xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem("token"));
        // },
        contentType: "application/json",
        data: JSON.stringify(request),
        error: function (err) {
          console.log(err)
          alert(err.responseJSON.message)
          
        },
        success: function (data) {
            localStorage.setItem("fullName", data.fullName)
            localStorage.setItem("id", data.id)
            localStorage.setItem("role", data.role)
            localStorage.setItem("token", data.token)
            localStorage.setItem("username", data.username)
            window.location.href = '/index.html';
        }
      });
}

function signUp(){
  let username = document.getElementById("Username").value;
  let password = document.getElementById("Password").value;
  let fullName = document.getElementById("fullName").value;
  let birthDay = document.getElementById("birthDay").value;
  let address = document.getElementById("address").value;
  let role = document.getElementById("role").value;
  let phoneNumber = document.getElementById("phoneNumber").value;
  let email = document.getElementById("email").value;
  let facebook = document.getElementById("facebook").value;
  let information = document.getElementById("facebook").value;

    console.log(username, password)

    let request = {
        "password": password,
        "username": username,
        "fullName": fullName,
        "birthDay": birthDay,
        "address": address,
        "role": role,
        "phoneNumber": phoneNumber,
        "email": email,
        "faceBook": facebook,
        "information": information
    
    }

    $.ajax({
        url: urlAuth + "/register",
        type: "POST",
        // beforeSend: function (xhr) {
        //   xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem("token"));
        // },
        contentType: "application/json",
        data: JSON.stringify(request),
        error: function (err) {
          console.log(err)
          alert(err.responseJSON.message)
          
        },
        success: function (data) {
            localStorage.setItem("fullName", data.fullName)
            localStorage.setItem("id", data.id)
            localStorage.setItem("role", data.role)
            localStorage.setItem("token", data.token)
            localStorage.setItem("username", data.username)
            window.location.href = '/login.html';
        }
      });
}