function openLink(lnk) {
  switch (lnk) {
    case "discord":
      window.open("https://discord.gg/fEY6bzKt3U", "_blank");
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
      window.open("https://www.instagram.com/meowcatpersonthing/", "_blank");
      break;
    case "steam":
      window.open("https://steamcommunity.com/id/ALEXMEOW4560", "_blank");
      break;
    default:
      alert("NO");
  }
}

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
        animation: "shift-away-subtle",
        duration: [300, 0],
      });
    });
  }, 1000);
};
