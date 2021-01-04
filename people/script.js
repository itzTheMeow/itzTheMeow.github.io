window.APIURL = "https://themeowdotmlbackend.herokuapp.com";
window.FLAGS = {
  DISCORD_EMPLOYEE: 1 << 0,
  PARTNERED_SERVER_OWNER: 1 << 1,
  DISCORD_PARTNER: 1 << 1, // merge
  HYPESQUAD_EVENTS: 1 << 2,
  BUGHUNTER_LEVEL_1: 1 << 3,
  HOUSE_BRAVERY: 1 << 6,
  HOUSE_BRILLIANCE: 1 << 7,
  HOUSE_BALANCE: 1 << 8,
  EARLY_SUPPORTER: 1 << 9,
  TEAM_USER: 1 << 10,
  SYSTEM: 1 << 12,
  BUGHUNTER_LEVEL_2: 1 << 14,
  VERIFIED_BOT: 1 << 16,
  EARLY_VERIFIED_DEVELOPER: 1 << 17,
  VERIFIED_DEVELOPER: 1 << 17, // merge
};

let serialize = function (...hasParams) {
  const serialized = {};
  for (const [flag, bit] of Object.entries(FLAGS)) serialized[flag] = (hasParams[0] & bit) === bit;
  return serialized;
};

let getUser = (id, tkn) => {
  return new Promise((acc, rej) => {
    fetch(`${APIURL}/user/${id}`)
      .then((res) => res.json())
      .then((user) => {
        acc({
          // move to server side, check for 'id' attribute
          ...user,
          ...{
            avatarURL: `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`,
            tag: `${user.username}#${user.discriminator}`,
            flags: serialize(user.public_flags), // move to something like "bugHunter = 0/1/2" and "squad = 'bravery/brilliance/balance"
          },
        });
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
