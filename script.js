window.openLink = function openLink(lnk) {
  switch (lnk) {
    case "discord":
      window.open("https://discord.gg/McsbWXWt2T", "_blank");
      break;
    case "github":
      window.open("https://github.com/itzTheMeow", "_blank");
      break;
    case "youtube":
      window.open("https://www.youtube.com/channel/UCWANi1TTqUP1ar4VTlOrqDA", "_blank");
      break;
    case "reddit":
      window.open("https://www.reddit.com/user/itzTheMeow_", "_blank");
      break;
    case "twitter":
      window.open("https://twitter.com/ALEXMEOW4560", "_blank");
      break;
    case "twitch":
      window.open("https://www.twitch.tv/alexmeow4560", "_blank");
      break;
    case "instagram":
      window.open("https://www.instagram.com/meowcatpersonthing", "_blank");
      break;
    case "steam":
      window.open("https://steamcommunity.com/id/ALEXMEOW4560", "_blank");
      break;
    default:
      alert("NO");
  }
};

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
  <img src="${proj.icon}" /> ${proj.name}
</div>`.trim();
      document.getElementById("projs").innerHTML += pHTML;
      appearDelay += appearStep;
    });

  setTimeout(function () {
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

      tippy(`#${id}`, {
        content: content || "Unknown",
        allowHTML: true,
        duration: [300, 0],
      });
    });
    document.querySelectorAll("[tooltip-for]").forEach((tt) => {
      let tipFor = tt.getAttribute("tooltip-for");
      let content = "Click It";

      switch (tipFor) {
        case "discord":
          content = "Join my Discord server!";
          break;
        case "github":
          content = "Check out my GitHub for random projects.";
          break;
        case "youtube":
          content = "See my <s>dead</s> YouTube channel.";
          break;
        case "reddit":
          content = "Stalk me on Reddit.";
          break;
        case "twitter":
          content = "See me do absolutely nothing on Twitter.";
          break;
        case "twitch":
          content = "See me stream nothing on Twitch.";
          break;
        case "instagram":
          content = "See me post nothing on Instagram.";
          break;
        case "steam":
          content = "See my imaginary game library.";
          break;
      }
      tippy(`[tooltip-for="${tipFor}"]`, {
        content: content || "Click It",
        allowHTML: true,
        duration: [300, 0],
      });
    });
  }, 1000);
};
