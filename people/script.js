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
let getUser = (id, tkn) => {
  return new Promise((acc, rej) => {
    fetch(`https://discord.com/api/v8/users/${id}`, {
      headers: { Authorization: `Bearer ${tkn}` },
    })
      .then((res) => res.json())
      .then(console.log)
      .catch(rej);
  });
};
getToken().then((token) => {
  getUser("609286417981505557", token);
});
