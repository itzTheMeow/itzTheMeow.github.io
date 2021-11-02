const langs = {
  js: { name: "JavaScript", icon: "b_js-square", level: 5 },
  html: { name: "HTML", icon: "b_html5", level: 5 },
  css: { name: "CSS/SCSS", icon: "b_css3-alt", level: 5 },
  py: { name: "Python", icon: "b_python", level: 3 },
  nodejs: { name: "Node.js", icon: "b_node-js", level: 5 },
  djs: { name: "Discord.js", icon: "b_discord", level: 5 },
  ahk: { name: "AutoHotKey", icon: "s_keyboard", level: 4 },
  java: { name: "Java", icon: "b_java", level: 3 },
  cpp: { name: "C++", icon: "s_plus-square", level: 1 },
};
const projects = {
  mmrb: {
    name: "MooMoo Reborn",
    icon: "http://moomooreborn.io/img/icons/favicon.png",
    link: "http://moomooreborn.io",
  },
  sand: {
    name: "Sand Drawings",
    icon: "https://themeow.ml/sand-drawings/site/favicon.ico",
    link: "https://themeow.ml/sand-drawings/site",
  },
  mch: {
    name: "MCHangout",
    icon: "https://themeow.ml/noa-mc/noagame/build/img/blocks/grass_side.png",
    link: "https://themeow.ml/noa-mc/noagame/build/index.html",
  },
  ytmusic: {
    name: "YTMusic",
    icon: "",
    link: "https://github.com/itzTheMeow/YTMusic",
  },
  shaker: {
    name: "Window Shaker",
    icon: "",
    link: "https://github.com/itzTheMeow/window-shaker",
  },
  mcmd: {
    name: "mcommand.js",
    icon: "",
    link: "https://github.com/itzTheMeow/mcommand.js",
  },
  tdsc: {
    name: "TDSClient",
    icon: "",
    link: "https://github.com/itzTheMeow/tdsclient",
  },
};
const links = {
  discord: {
    icon: "b_discord",
    msg: "Join my Discord server!",
    link: "https://discord.gg/McsbWXWt2T",
  },
  github: {
    icon: "b_github",
    msg: "Check out my GitHub for random projects.",
    link: "https://github.com/itzTheMeow",
  },
  youtube: {
    icon: "b_youtube",
    msg: "See my <s>dead</s> YouTube channel.",
    link: "https://www.youtube.com/channel/UCWANi1TTqUP1ar4VTlOrqDA",
  },
  reddit: {
    icon: "b_reddit",
    msg: "Stalk me on Reddit.",
    link: "https://www.reddit.com/user/itzTheMeow_",
  },
  twitter: {
    icon: "b_twitter",
    msg: "See me do absolutely nothing on Twitter.",
    link: "https://twitter.com/ALEXMEOW4560",
  },
  twitch: {
    icon: "b_twitch",
    msg: "See me stream nothing on Twitch.",
    link: "https://www.twitch.tv/alexmeow4560",
  },
  instagram: {
    icon: "b_instagram",
    msg: "See me post nothing on Instagram.",
    link: "https://www.instagram.com/meowcatpersonthing",
  },
  steam: {
    icon: "b_steam",
    msg: "See my imaginary game library.",
    link: "https://steamcommunity.com/id/ALEXMEOW4560",
  },
};

window.onload = function () {
  let appearDelay = 1100;
  let appearStep = 50;

  Object.keys(langs).forEach((l) => {
    let lang = langs[l];
    let lHTML = `
<div id="lang-${l}" class="aboutcard-lang-entry" data-aos="flip-up" data-aos-delay="${appearDelay}">
  <i class="fa${lang.icon.split("_").join(" fa-")}" lang-quality="${lang.level}"></i> ${lang.name}
</div>`.trim();
    document.getElementById("langs").innerHTML += lHTML;
    appearDelay += appearStep;
  });

  Object.keys(projects)
    .sort((a, b) => {
      return projects[a].name.toLowerCase() > projects[b].name.toLowerCase() ? 1 : -1;
    })
    .forEach((p) => {
      let proj = projects[p];
      let pHTML = `
<div
  id="proj-${p}"
  class="aboutcard-lang-entry"
  data-aos="flip-up"
  data-aos-delay="${appearDelay}"
  onclick="window.open('${proj.link}', '_blank')"
>
  <img src="${proj.icon || "https://github.com/fluidicon.png"}" /> ${proj.name}
</div>`.trim();
      document.getElementById("projs").innerHTML += pHTML;
      appearDelay += appearStep;
    });

  appearDelay = 1100 - appearStep * 2;
  Object.keys(links).forEach((l) => {
    let link = links[l];
    let lHTML = `
<div
  id="lnk-${l}"
  data-aos="zoom-out"
  data-aos-delay="${appearDelay}"
  data-aos-duration="750"
  data-aos-easing="ease-out-in"
  data-aos-once="true"
>
  <i
    class="fa${link.icon.split("_").join(" fa-")}"
    onclick="window.open('${link.link}', '_blank')"
  >
  </i>
</div>`.trim();
    document.getElementById("links").innerHTML += lHTML;
    setTimeout(function () {
      tippy(`#lnk-${l}`, {
        content: link.msg,
        allowHTML: true,
        duration: [300, 0],
      });
    }, 1000);
    appearDelay += 50;
  });

  document.querySelectorAll("[lang-quality]").forEach((lang) => {
    let id = "tp" + Math.floor(Math.random() * 100000);
    lang.id = id;

    let quality = Number(lang.getAttribute("lang-quality"));

    let content = "Unknown";
    switch (quality) {
      case 5:
        content = "Master (5/5)";
        break;
      case 4:
        content = "Proficient (4/5)";
        break;
      case 3:
        content = "Good (3/5)";
        break;
      case 2:
        content = "Beginner (2/5)";
        break;
      case 1:
        content = "Not too Great (1/5)";
        break;
    }

    content = `<span lang-quality="${quality}">${content}</span>`;
    setTimeout(function () {
      tippy(`#${id}`, {
        content: content || "Unknown",
        allowHTML: true,
        duration: [300, 0],
      });
    }, 1000);
  });
};
