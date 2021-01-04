let getToken = () => {
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "https://discord.com/api/v8/oauth2/token");

  xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
  xhr.setRequestHeader(
    "Authorization",
    "Basic Nzk1MTI2NTc0NjU0ODE2MjY3Om9pSGZJalRSWHZNWGNhMnRtZnVHdEZ4UUd2LVFudm5h"
  );
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      console.log(xhr.status);
      console.log(xhr.responseText);
      console.log(JSON.stringify(xhr));
    }
  };

  var data = "grant_type=client_credentials&scope=identify";

  xhr.send(data);
};
getToken();
