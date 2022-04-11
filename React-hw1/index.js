import getData from "./app.js"
import inquirer from "inquirer"

var questions = [{
    type: 'input',
    name: 'userId',
    message: "USER ID ?"
  },
  {
    type: 'input',
    name: 'postId',
    message: "POST ID ?"
  }
];

inquirer.prompt(questions).then(answers => {
    getData(answers.userId, answers.postId) 
});



