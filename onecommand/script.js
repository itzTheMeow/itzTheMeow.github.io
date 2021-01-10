document.getElementById("cmd-generate").onclick = function () {
  let cmds = document
    .getElementById("cmd-input")
    .value.split("\n")
    .filter((c) => c);

  if (!cmds.length) return;

  cmds = cmds
    .map(
      (c) =>
        `{id:command_block_minecart,Command:"${c.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"}`
    )
    .join(",");

  let template = `summon falling_block ~ ~1 ~ {Time:1,BlockState:{Name:redstone_block},Passengers:[{id:falling_block,Passengers:[{id:falling_block,Time:1,BlockState:{Name:activator_rail},Passengers:[{id:command_block_minecart,Command:'gamerule commandBlockOutput false'},${cmds},{id:command_block_minecart,Command:'setblock ~ ~1 ~ command_block{auto:1,Command:"fill ~ ~ ~ ~ ~-3 ~ air"}'},{id:command_block_minecart,Command:'kill @e[type=command_block_minecart,distance=..1]'}]}]}]}`;
  document.getElementById("cmd-output").value = template;
};
