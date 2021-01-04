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
      let allUsers = [];
      users.forEach((u) => {
        getUser(u)
          .then((user) => {
            console.log("[i] Fetched " + user.tag);
            allUsers.push(user);
            usersDone();
          })
          .catch((err) => {
            alert(`Error fetching user. Please try again.
Error: ${err}`);
          });
      });
      let usersDone = function () {
        if (allUsers.length !== users.length) return;
        allUsers = allUsers.sort((a, b) =>
          (b.name || b.username) > (a.name || a.username) ? 1 : -1
        );
        allUsers.forEach((user) => {
          let card = document.createElement("div");
          card.className = "user-card";

          let cardTitle = document.createElement("div");
          cardTitle.className = "user-card-title";
          cardTitle.innerHTML = user.name || user.username;
          card.appendChild(cardTitle);

          let cardSubtitle = document.createElement("div");
          cardSubtitle.className = "user-card-subtitle";
          cardSubtitle.innerHTML = `${user.username}<span class="user-card-subtitle-discrim">#${user.discriminator}</span>`;
          card.appendChild(cardSubtitle);

          let cardDescription = document.createElement("div");
          cardDescription.className = "user-card-description";
          cardDescription.innerHTML = user.description || "No description provided.";
          card.appendChild(cardDescription);

          document.getElementById("cards").appendChild(card);
        });
      };
    })
    .catch((err) => {
      alert(`Error connecting to user fetch API. Please try again.
Error: ${err}`);
    });
};
