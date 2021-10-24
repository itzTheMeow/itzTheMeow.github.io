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
    case "mmrb":
      window.open("http://moomooreborn.io", "_blank");
      break;
    case "mch":
      window.open("http://themeow.ml/noa-mc/noagame/build/index.html", "_blank");
      break;
    default:
      alert("NO");
  }
};

window.onload = function () {
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
