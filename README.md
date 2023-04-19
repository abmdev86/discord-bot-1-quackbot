# Quackathon-Teams-Bot  ![MIT](https://img.shields.io/badge/license-MIT-green)

  - [Description](#description)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Contributions](#contributions)
  - [Tests](#tests)
  - [Questions](#questions)
  - [License?](#license)

  ## Bot-Story

  AS A BOT, WHEN I RECEIVE THE FOLLOWING COMMANDS, I PERFORM THE APPROPRIATE ACTIONS.

  ```/join-quackathon OR /jq -``` 
  
  generate a sign-up form when the member will list the team members
  
  The user will then be asked to submit the following:

  >
    Team Name:
    Team members:
    Project Title:

  A new project will then be created in the database, and will reference the member, as well as t   he current quackathon IDs.
 
  ```/submit-quackathon-project OR /sqp -```

  Bot will check to see that the current user has created a project, then verify that the user wou  would like to submit the project. The database will then be updated to reflect that the project   has been submitted with a timestamp.

  AS A BOT, WHEN AN ADMIN TYPES THE WORDS, "Congratulations to this week's winners!", I WILL SAVE THE WINNING TEAM IN THE QUACKATHON TABLE AND UPDATE EACH USER'S QUACKATHON WINS

  ## Description
 
  A Discord bot that helps to organize and manage Quackathon participants.

  ## Installation

  To run the client locally, clone the repo, ```git clone {name of repo}```, install dependancies ```npm install```, and start with ```node index```.

  ## Usage

  This is an open source project for the Dear Junior Dev Discord server. Its purpose is to make it easier to find teams, and track your Quackathon history.

  ## Contributions
  
  Keegan, Auroya, Rick were the createors. To contribute, start by looking in the issues, and make a pull request. 

  ## Tests

  ```npm test``` to run all unit tests.

  ## Questions

  [My Github profile](https://github.com/guitarkeegan)

  Send me and email [here](mailto:keegananglim@gmail.com) to contact me directly.

  ## License
  This project is licensed under the [MIT License](https://choosealicense.com/licenses/mit/) - click the link to read the license.
  
 
