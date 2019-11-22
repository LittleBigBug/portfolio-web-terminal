function cat(args) {
  let path = window.location.pathname + "terminalfiles/";

  if (args[0] == null) {
    cmdDone();
    return;
  }

  path = path + args[0];
  $.ajax(path)
  .done(function(data) {
    terminalPrint(data);
  })
  .fail(function() {
    terminalPrint(args[0] + " does not exist or there was an error trying to access it.");
  })
  .always(function() {
    cmdDone();
  });
}

function ls(args) {
  $.ajax("phputil/gettermfiles.php")
  .done(function(data) {
    let ar = JSON.parse(data);

    for (var v in ar) {
      let str = ar[v];

      if ((args.length < 1 || args[0] != "-a") && str.match(/^(\.+)/gm)) {
        continue;
      }

      var isDirectory = ar[v].match(/\.\w+/g) == null;
      if (isDirectory) {
        str = `<span class="lsdir">` + str + `</span>`;
      } else {
        str = `<a class="lsfile" href="#" onclick="clickCmd('cat ` + ar[v] + `')">` + str + `</a>`
      }

      terminalPrint(str + "&#9;", false);
    }

    terminalPrint("");
  })
  .fail(function() {
  })
  .always(function() {
    cmdDone();
  });
}

function cd(args) {
  var resp = "bash: cd: {dir} Permission denied";
  var dir = "/:";

  if (args.length > 0) {
    var isDirectory = args[0].match(/\.\w+/g) == null;
    if (!isDirectory) {
      resp = "bash: cd: " + args[0] + ": Not a directory";
    } else {
      dir = args[0] + ":";
    }
  }

  resp = resp.replace("{dir}", dir);
  terminalPrint(resp);

  cmdDone();
}

function help() {
  let i = 1;
  for (var c in cmds) {
    var notlast = (i != Object.keys(cmds).length);
    var str = `<a href="#" class="helpcmd" onclick="clickCmd('` + c + `')">` + c + `</a>`

    terminalPrint(str, !notlast);

    if (notlast) {
      terminalPrint(", ", false);
    }

    i++;
  }

  cmdDone();
}

function clickCmd(cmd) {
  autowriteQueue.push(cmd);
}

function ready() {
  addCmd("cat", cat);
  addCmd("ls", ls);
  addCmd("cd", cd);
  addCmd("help", help);
}

$(document).ready(ready);
