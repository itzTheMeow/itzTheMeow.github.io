window.APIURL = "https://meow-user-fetch.herokuapp.com";

let getUser = (id, tkn) => {
  return new Promise((acc, rej) => {
    fetch(`${APIURL}/user/${id}`)
      .then((res) => res.json())
      .then((user) => {
        acc(user);
      })
      .catch(rej);
  });
};

window.onload = function () {
  fetch(`${APIURL}/user/all`)
    .then((res) => res.json())
    .then((users) => {
      users.forEach((u) => {
        getUser(u)
          .then((user) => {
            console.log(user);
          })
          .catch((err) => {
            alert(`Error fetching user. Please try again.
Error: ${err}`);
          });
      });
    })
    .catch((err) => {
      alert(`Error connecting to user fetch API. Please try again.
Error: ${err}`);
    });
};
