let getToken = () => {
  fetch("https://meowdotml-people-token.glitch.me/")
    .then((res) => res.json())
    .then((token) => {
      console.log(token);
    });
};
getToken();
