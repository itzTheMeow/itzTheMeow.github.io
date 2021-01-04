let getToken = () => {
  return new Promise((acc, rej) => {
    fetch("https://meowdotml-people-token.glitch.me/")
      .then((res) => res.json())
      .then((token) => {
        acc(token.access_token);
      })
      .catch((err) => {
        alert(
          `Error when authorizing with Discord API. Please try again or contact Meow with this error:
      - ${err}`
        );
        rej(err);
      });
  });
};
getToken().then(console.log);
