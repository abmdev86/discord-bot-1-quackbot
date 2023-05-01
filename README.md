# Quackathon-Teams-Bot  ![MIT](https://img.shields.io/badge/license-MIT-green)

  - [Bot-Story](#bot-story)
  - [Description](#description)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Contributions](#contributions)
  - [Tests](#tests)
  - [Questions](#questions)
  - [License?](#license)

  ## Bot-Story

  AS A BOT, WHEN I RECEIVE THE FOLLOWING COMMANDS, I PERFORM THE APPROPRIATE ACTIONS.

  ```/create-quackathon``` 
  
  Will check that the user calling the command is the guild owner.
  
  The owner will then be asked to submit information about the next challenge.

  The challenge will now be stored in the database, and allow user to submit projects until the dueAt date has passed. 
 
  ```/register```

  Any user can register for a quackathon challenge. Once a user is registered, their information will be stored in the database, and they will be able to join a team. 

  > Users will not need to re-register for each challenge, only once.

 ```/create-team```

  After a user is registered, they are able to create a team. Team members can then send invitations for other guild members to join their team. Users should only sign up to one team per quackathon challenge.

  ```/submit-project```
  
  When a team is ready to submit, any of the members can call the this command to submit the team project. Once a team has submitted a project, they will not be allowed to send another one.

  ## Description
 
  A Discord bot that helps to organize and manage Quackathon participants. The guild owner creates the challenge, members can then register to participate, create or join a team, and submit a project. 

  ## Installation

  To run the client locally, clone the repo, ```git clone {name of repo}```, install dependancies ```npm install```, setup a .env file with the following fields:

  ```
  DATABASE_URL={your info}
  CLIENT_ID={your info}
  DISCORD_TOKEN={your info}
  GUILD_ID={your info}
  ```
  
  deploy commands with ```npm run commsync```, and start with ```node index```.

  ## Usage

  This is an open source project for the Dear Junior Dev Discord server. Its purpose is to make it easier to create and join teams, and to track your Quackathon history.

  ## Contributions
  
  [Keegan](https://github.com/keegananglim), [Auroiah](https://github.com/abmdev86), [Rick](https://github.com/RickRieger) were the creators. To contribute, start by looking in the issues, fork the project and make a pull request when you are ready to contribute your code. We will take a look, and if all is well, aprove!

  ## Tests

  Tests are currently a work in progress. If you enjoy writing tests, there is much work to be done here!

  ## License
  This project is licensed under the [MIT License](https://choosealicense.com/licenses/mit/) - click the link to read the license.
  
 
