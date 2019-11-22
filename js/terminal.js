let cmds = [];
let printTemplate = `<span class="prefix"><span class="userdomain">visitor@yasfu.net</span>:<span class="tilde">~</span>&#36; &nbsp;</span>`;
let inputBoxTemplate = `<input type="text" id="terminput" name="terminput">`;
let textStampTemplate = `<span class="textstamp">{TEXT}</span><br/>`;
let printTxtTemplate = `<span class="print">{TEXT}</span>`;
let term;
let inputBox;

let autowrite;
let isAutoWriting = false;
let autowriteQueue = [];

function ready() {
  term = $("#terminal");

  $.ajax("phputil/lastlogin.php").done(function(lastLogin) {
    $.ajax("systeminfo.txt").done(function(data) {
      data = data.replace("{USERAGENT}", navigator.userAgent);
      data = data.replace("{LASTLOGIN}", lastLogin);

      terminalPrint(data);
    }).always(function() {
      setTimeout(function() {
        addInputPrefix();

        setInterval(autoWrite, 80);
        autowriteQueue.push("cat welcome.txt");
        autowriteQueue.push("ls");
      }, 200);
    });
  });
}

function autoWrite() {
  if (inputBox == null) {
    return;
  }

  if (autowrite == null || autowrite == "") {
    if (isAutoWriting) {
      actEnter();
      isAutoWriting = false;
    }

    if (autowriteQueue.length < 1) {
      toggleInput(false);
      return;
    }

    if (inputBox == null) {
      return;
    }

    autowrite = autowriteQueue[0];
    autowriteQueue.shift();
    inputBox.val("");
    isAutoWriting = true;
    toggleInput(true);
  }

  let oVal = inputBox.val();
  inputBox.val(oVal + autowrite.charAt(0));
  autowrite = autowrite.slice(1);
}

function appendToTerm(obj) {
  obj.appendTo(term);
}

function toggleInput(tog) {
  if (inputBox == null) {
    return;
  }

  if (tog == null) {
    tog = !inputBox.prop("disabled");
  }

  inputBox.prop("disabled", tog);
}

function addInputPrefix() {
  let temp = $(printTemplate);
  appendToTerm(temp);
  resetInputBox(false);
}

function actEnter() {
  let v = inputBox.val();
  stampInputBox();
  callCmd(v);
}

function cmdDone() {
  addInputPrefix();
  resetInputBox();
}

function onInputKeypress(ev) {
  if (ev.which != "13") {
    return;
  }

  actEnter();
}

function stampInputBox() {
  let stampWMsg = inputBox.val();
  stampWMsg = textStampTemplate.replace("{TEXT}", stampWMsg);

  let textStamp = $(stampWMsg);
  textStamp.insertBefore(inputBox);

  inputBox.remove();
  inputBox = null;
}

function resetInputBox(shouldStamp) {
  if (shouldStamp && inputBox != null) {
    stampInputBox();
  }

  if (inputBox != null) {
    inputBox.remove();
  }

  inputBox = $(inputBoxTemplate);

  var prefW = $(".prefix").width();
  var winW = $(window).width();
  var prop = 100 * (prefW / winW);
  var nProp = 95 - prop;

  inputBox.width(nProp + "%");

  appendToTerm(inputBox);

  inputBox.on("keydown", onInputKeypress);
  inputBox.on("focusout", function() { inputBox.focus(); });
  inputBox.focus();
}

function terminalPrint(print, bre) {
  if (bre == null) {
    bre = true;
  }

  let printWMsg = printTxtTemplate.replace("{TEXT}", print);

  let text = $(printWMsg);
  appendToTerm(text);


  if (bre) {
    appendToTerm($("<br/>"));
  }
}

function addCmd(cmd, func) {
  cmds[cmd] = func;
}

function callCmd(str) {
  let args = str.match(/(?:[^\s"]+|"[^"]*")+/g);

  if (args == null || args.length < 1) {
    cmdDone();
    return;
  }

  let cmd = args[0];

  args.shift();

  if (cmds[cmd] == null) {
    terminalPrint(cmd + ": command not found");
    cmdDone();
    return;
  }

  let call = cmds[cmd];

  try {
    call(args);
  } catch (error) {
    terminalPrint("Error processing command '" + cmd + "' with error: " + error);
    console.log("Error processing command '" + cmd + "' with error: " + error);
    cmdDone();
  }
}

$(document).ready(ready);
