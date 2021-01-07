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
          (a.name || a.username).toLowerCase() > (b.name || b.username).toLowerCase() ? 1 : -1
        );
        allUsers.forEach((user) => {
          let flags = user.formatted_flags;

          let card = document.createElement("div");
          card.className = "user-card";

          let cardHeader = document.createElement("div");

          let cardTitle = document.createElement("div");
          cardTitle.className = "user-card-title";
          cardTitle.innerHTML = `<img src="${user.avatarURL}" alt="AVTR" class="user-card-avatar">${
            user.name || user.username
          }`;
          cardHeader.appendChild(cardTitle);

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
          cardHeader.appendChild(cardBadges);
          card.appendChild(cardHeader);

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

          let cardAliases = document.createElement("div");
          cardAliases.className = "user-card-aliases";

          let aliases = (user.aliases || []).join(", ");
          cardAliases.innerHTML = `<span class="user-card-subtitle-discrim">A.K.A.</span> ${aliases}`;
          if (aliases) card.appendChild(cardAliases);

          let cardInterests = document.createElement("div");
          cardInterests.className = "user-card-interests";

          let interests = user.interests || [];
          let interestDB = {
            minecraft: "Minecraft",
            programming: "Developer",
          };
          interests = interests.sort((a, b) =>
            interestDB[a].toLowerCase() > interestDB[b].toLowerCase() ? 1 : -1
          );
          if (!interests.length) {
            let noInterests = document.createElement("div");
            noInterests.className = "user-card-interest";
            noInterests.innerHTML = `<i class="fas fa-times-circle" style="color:#ff594d;"></i> No Interests`;
            cardInterests.appendChild(noInterests);
            tippy(noInterests, {
              content: "This user has no interests.",
              allowHTML: true,
              duration: [200, 0],
            });
          } else
            interests.forEach((i) => {
              switch (i) {
                case "programming":
                  let programming = document.createElement("div");
                  programming.className = "user-card-interest";
                  programming.innerHTML = `<i class="fas fa-laptop-code" style="color:#3e70dd;"></i> Developer`;
                  cardInterests.appendChild(programming);
                  tippy(programming, {
                    content: "Likes to code.",
                    allowHTML: true,
                    duration: [200, 0],
                  });
                  break;
                case "minecraft":
                  let minecraft = document.createElement("div");
                  minecraft.className = "user-card-interest";
                  minecraft.innerHTML = `<img src="../badges/minecraft.png"> Minecraft`;
                  cardInterests.appendChild(minecraft);
                  tippy(minecraft, {
                    content: "Plays Minecraft.",
                    allowHTML: true,
                    duration: [200, 0],
                  });
                  break;
              }
            });

          card.appendChild(cardInterests);

          let cardDescription = document.createElement("div");
          cardDescription.className = "user-card-description";
          cardDescription.innerHTML = user.description || "No description provided.";
          card.appendChild(cardDescription);

          let cardLink = document.createElement("div");
          cardLink.className = "user-card-interests";

          let link = user.link || "about:blank";

          card.appendChild(cardLink);

          document.getElementById("cards").appendChild(card);
        });
      };
    })
    .catch((err) => {
      alert(`Error connecting to user fetch API. Please try again.
Error: ${err}`);
    });
};
