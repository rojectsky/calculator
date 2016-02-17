
# Days Calculator
This library will calculate the days between the 2 given days.
## Prerequisite Technologies
### Linux
* *Node.js* - <a href="http://nodejs.org/download/">Download</a> and Install Node.js, nodeschool has free <a href=" http://nodeschool.io/#workshoppers">node tutorials</a> to get you started.

### Windows
* *Node.js* - <a href="http://nodejs.org/download/">Download</a> and Install Node.js, nodeschool has free <a href=" http://nodeschool.io/#workshoppers">node tutorials</a> to get you started.
* *Git* - The easiest way to install git and then run the rest of the commands through the *git bash* application (via command prompt) is by downloading and installing <a href="http://git-scm.com/download/win">Git for Windows</a>

### OSX
* *Node.js* -  <a href="http://nodejs.org/download/">Download</a> and Install Node.js or use the packages within brew or macports.
* *git* - Get git <a href="http://git-scm.com/download/mac">from here</a>.

## Prerequisite packages
if you want to run test cases, please run the below command, this will install the test libraries.
```
$ npm install
```
and then
```
$ npm test
```

## Use this module in your project
```
var calculator = require("./calculator");

calculator.calculate('01/01/2013', '03/01/2013,)
```


## Command to run the script
```
node run 01/01/2013 03/01/2013
```
you will see the output:
```
1
```


if the input date is invalid,e.g
```
node run 320/04/abc 03/01/2013
```
 you will see this error:Wrong Date format(DD/MM/YYYY) : 320/04/abc
