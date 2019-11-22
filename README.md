## Web Terminal

This is a basic ubuntu based web terminal that serves as an interactive portfolio of mine.
You are welcome to use it, I just ask for credit.

If you would like a live version, visit my portfolio: https://yasfu.net/

It features a command system, as well as an "auto typer" that automatically types out and enters commands from code.
This is useful for visitors that are not familiar with CLIs and broadens the amount of people who can navigate it.
To increase this further, files listed with "ls" and other places can be clicked on to automatically execute commands like cat

## How-To setup

If you'd like to configure it for your own needs, any file in the terminalfiles folder are automatically available for the terminal to use.
By default the commands `cat welcome.txt` and `ls` are automatically ran when the terminal starts. You can change welcome.txt to change the welcome message or change the commands themselves in terminal.js, line 27:

```js
autowriteQueue.push("Command here with arguments");
```

Pushing anything to the queue will type out the command while locking user input as soon as input is ready.


If you would like to add custom commands you may add it to any script included after terminal.js. I recommend making a new file and add any custom commands to that instead of defaultcommands.js to make any git merges a little easier.
You can look at any command in defaultcommands.js for more examples or reference the example below:

```js
function myCommand(args) {
  terminalPrint("Message here");
  cmdDone(); // Required after finishing function. Useful for any asynchronous functions. (ie. AJAX)
}

function ready() {
  addCmd("mycommand", myCommand);
}

$(document).ready(ready);
```

the first argument passed to any command function is a list of arguments given by the user. It is seperated by spaces but ignores quotes
For example: `mycommand there are "some arguments" 'to pass'` would yield `there, are, some arguments, to pass`.

### Useful functions

`terminalPrint` is a simple print function. The first argument is the message to print, and the second optional argument is a boolean that, if true, adds a line break to the end. By default this value is true.

`cmdDone` resets the user's input, and must be called after a command execute is finished. This is needed to support Asynchronous functions like AJAX.

`toggleInput` disables or enables user input. `true` will block input and `false` will enable it. No argument will toggle it based on the current locked state.

`addCmd` adds the command to the terminal. The first argument is a string and is the keyword for the user to execute the command. The second is a function that is called with a table of arguments the user passed with the command


## Contributing

You're welcome to submit pull requests if you want to, just try and keep code style consistent with the rest of the file.
Try to submit bug fixes instead of major feature changes. If you feel like a feature change may make a good contribution to the main software then you are welcome to do so, however there is no guarantee that it will be merged. Any new commands must be 'general' commands and can be widely applicable to be merged with the main branch. Something like `tail` or an existing linux/unix command.
I have been using camelCase for the most part, and K&R style for bracket positioning.
