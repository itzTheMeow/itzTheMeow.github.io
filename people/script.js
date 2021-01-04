window.APIURL = "https://themeowdotmlbackend.herokuapp.com";

let getUser = (id, tkn) => {
  return new Promise((acc, rej) => {
    fetch(`${APIURL}/user/${id}`)
      .then((res) => res.json())
      .then((user) => {
        acc({
          ...user,
          ...{ avatarURL: `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png` },
        });
      })
      .catch(rej);
  });
};
window.onload = function () {
  getUser("609286417981505557").then((user) => {
    console.log(user);
  });
};
