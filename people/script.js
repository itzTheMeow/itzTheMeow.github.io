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
            console.log(`[i] Fetched ${user.tag}`, user);
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
          let flags = user.formatted_flags;

          let card = document.createElement("div");
          card.className = "user-card";

          let cardTitle = document.createElement("div");
          cardTitle.className = "user-card-title";
          cardTitle.innerHTML = user.name || user.username;
          card.appendChild(cardTitle);

          let cardBadges = document.createElement("div");
          cardBadges.className = "user-card-badges";

          let badges = [];
          if (flags.staff) badges.push(`staff`);
          if (flags.hypesquad_events) badges.push(`hs_events`);
          if (flags.house !== "NONE") badges.push(`hs_${flags.house.toLowerCase()}`);
          if (flags.bughunter) badges.push(`bughunter_${flags.bughunter}`);
          if (flags.developer) badges.push(`developer`);
          if (flags.partner) badges.push(`partner`);
          if (flags.early_supporter) badges.push(`early_supporter`);

          badges.forEach((b) => {
            let badge = document.createElement("img");
            badge.src = `../badges/${b}.png`;
            badge.className = "user-card-badge";

            let badgeTexts = {
              bughunter_1: "Bug Hunter Level 1",
              bughunter_2: "Bug Hunter Level 2",
              developer: "Early Verified Developer",
              early_supporter: "Early Supporter",
              hs_balance: "Hypesquad Balance",
              hs_bravery: "Hypesquad Bravery",
              hs_brilliance: "Hypesquad Brilliance",
              hs_events: "Hypesquad Events",
              partner: "Partner (uwu)",
              staff: "Discord Staff",
            };

            cardBadges.appendChild(badge);
            tippy(badge, {
              content: badgeTexts[b] || "Unknown",
              allowHTML: true,
              duration: [200, 0],
            });
          });
          card.appendChild(cardBadges);

          let cardSubtitle = document.createElement("div");
          cardSubtitle.className = "user-card-subtitle";
          cardSubtitle.innerHTML = `${user.username}<span class="user-card-subtitle-discrim">#${user.discriminator}</span>`;
          cardSubtitle.onclick = function () {
            var input = document.body.appendChild(document.createElement("input"));
            input.value = user.tag;
            input.focus();
            input.select();
            document.execCommand("copy");
            input.parentNode.removeChild(input);
            old.destroy();
            let newt = tippy(cardSubtitle, {
              content: "Copied!",
              allowHTML: true,
              duration: [200, 0],
              theme: "success",
            });
            newt.show();
            setTimeout(function () {
              newt.destroy();
              old = tippy(cardSubtitle, {
                content: "Copy Tag",
                allowHTML: true,
                duration: [200, 0],
              });
            }, 1500);
          };
          card.appendChild(cardSubtitle);
          let old = tippy(cardSubtitle, {
            content: "Copy Tag",
            allowHTML: true,
            duration: [200, 0],
          });

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
