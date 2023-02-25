var axios = require('axios');
console.log(document.getElementsByClassName("submit"))
document.getElementsByClassName("submit").onClick= function (event){
    event.preventDefault()
    var email = document.getElementsByClassName("email")
    var password = document.getElementsByClassName("password")
    console.log(email)
    var data = JSON.stringify({
        // "email": "admin@vul.hunter",
        // "password": "P@$$w0rd!@#$%^&*()"

        "email": email,
        "password": password
      });
      

      var config = {
        method: 'post',
        url: 'http://185.213.27.86:5000/api/v1/auth/login',
        headers: { 
          'Content-Type': 'application/json'
        },
        data : data
      };
      
      axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
}

