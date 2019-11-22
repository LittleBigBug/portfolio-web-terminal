## Web Terminal

This is a basic ubuntu based web terminal that serves as an interactive portfolio of mine.
You are welcome to use it, I just ask for credit.

It features a command system, as well as an "auto typer" that automatically types out and enters commands from code.
This is useful for visitors that are not familiar with CLIs and broadens the amount of people who can navigate it.
To increase this further, files listed with "ls" and other places can be clicked on to automatically execute commands like cat

## How-To setup

If you'd like to configure it for your own needs, any file in the terminalfiles folder are automatically available for the terminal to use.
`cat welcome.txt` and `ls` are automatically ran when the terminal starts. You can change welcome.txt to change the welcome message or change the commands themselves in terminal.js

If you would like to add custom commands you may add it to any script included after terminal.js. I recommend making a new file and add any custom commands to that instead of defaultcommands.js to make any git merges a little easier.
You can look at any command in defaultcommands.js for more examples or reference the example below:

```js
function myCommand(args) {
  terminalPrint("Message here"); // accepts a string, prints a message to the terminal. Optional second argument, if true it will add line break.
  cmdDone(); // MUST be called when the function is done. (Allows for any asynchronous functions)
}
```
