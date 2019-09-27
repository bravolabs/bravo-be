# Bravo Backend
 You can find the deployed project at https://saybravo.io
## Team
|                                       [Samar Vir](https://github.com/samarv)                                        |                                       [Aaron Thompson](https://github.com/AaronJThompson)                                        |                                       [James Eneh](https://github.com/erozonachi)                                        |                                       [Borja Soler](https://github.com/borjasolerr)                                        |                                       [Johnson Ogwuru](https://github.com/ogwurujohnson)                                        |
| :-----------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------: |
|                      [<img src="https://i.imgur.com/Kaz7vzu.png" width = "200" />](https://github.com/samarv)                       |                      [<img src="https://i.imgur.com/yBwp24U.png" width = "200" />](https://github.com/AaronJThompson)                       |                      [<img src="https://avatars0.githubusercontent.com/u/35371532?s=400&v=4" width = "200" />](https://github.com/erozonachi)                       |                      [<img src="https://avatars3.githubusercontent.com/u/39691848?s=400&v=4" width = "200" />](https://github.com/borjasolerr)                       |                      [<img src="https://avatars1.githubusercontent.com/u/14821816?s=400&v=4" width = "200" />](https://github.com/ogwurujohnson)                       |
|                 [<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/samarv)                 |            [<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/AaronJThompson)             |           [<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/erozonachi)            |          [<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/borjasolerr)           |            [<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/ogwurujohnson)             |
| [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](https://www.linkedin.com/) | [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](https://www.linkedin.com/) | [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](https://www.linkedin.com/) | [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](https://www.linkedin.com/) | [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](https://www.linkedin.com/) |
|                                       [__Maxime Salomon__](https://github.com/maximesalomon)                                        |                                       [__Noble Obioma__](https://github.com/nobioma1)                                        |                                       [__Petar Vlaisavljevic__](https://github.com/ropeks)                                        |
|                      [<img src="https://avatars1.githubusercontent.com/u/2175908?s=400&v=4" width = "200" />](https://github.com/maximesalomon)                       |                      [<img src="https://avatars1.githubusercontent.com/u/30900531?s=400&v=4" width = "200" />](https://github.com/nobioma1)                       |                      [<img src="https://i.imgur.com/yh9RqTh.png" width = "200" />](https://github.com/ropeks)                       |
|                 [<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/maximesalomon)                 |            [<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/nobioma1)             |           [<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/ropeks)            |
| [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](https://www.linkedin.com/) | [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](https://www.linkedin.com/) | [ <img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](https://www.linkedin.com/) |
## Project Overview
[Trello Board](https://trello.com/b/RmnRC4ez/labs) <br>
[Product Canvas](https://www.notion.so/Acknowledge-Coworkers-in-Slack-96c60f39816b477d9b81fe5d97a992ee) <br>
[UX Design files](https://www.figma.com/file/SbSjn8oAUtdWY1slSJeP9u/Bravo) <br>

Healthy office cultures often acknowledge good work from their coworkers and peers. Award your peers with acknowledgments that act like coins/points in Slack when they do awesome things - and never let the acknowledgment of their good work get lost in the shuffle again.
### Key Features
-    users can send public shoutouts to their teammates for their good work in Slack
-    users can see all the shoutouts for given teammate in Slack
-    for every shoutout, comment or reaction to shoutout users get bravos
-    users can see how many bravos they have in their wallet in Slack
-    users can see their Slack workspace leaderboard in Slack
## Tech Stack
#### [Back end](https://github.com/bravolabs/bravo-be) built using:
-    _NodeJS (Express)_
-    _PostgreSQL_
# APIs
We use [Slack API](https://api.slack.com/) for both authentication and our Slack bot.
# Environment Variables
For the app to function correctly, the user must set up their own environment variables. There should be a .env file containing the following:

    DATABASE_URL = database URL
    SLACK_BASE_URL = https://slack.com/api
    CLIENT_URL = https://saybravo.io
    PORT = port for running the server locally
    SLACK_APP_TOKEN = Slack app's access token, found in app features --> OAuth & permissions
    BOT_ACCESS_TOKEN = Slack app's bot access token, found in app features --> OAuth & permissions
    SLACK_CLIENT_ID = Slack app's client Id, found in app features --> OAuth & permissions
    SLACK_CLIENT_SECRET = Slack app's client secret, found in app features --> OAuth & permissions
    VERIFICATION_TOKEN = verification token
    JWT_SECRET = long random string used for generating JWT token

## Bot Commands

| Command             | Description                                                       |
| --------------------| ----------------------------------------------------------------- |
| `/bravo`            | Displays all available commands                                   |
| `/bravo help`       | Walks you through the process                                     |
| `/bravo shoutout`   | Used for giving and viewing shoutouts                             |
| `/bravo wallet`     | Shows you how many bravos you have in your wallet                 |
| `/bravo leaderboard`| Shows the leaderboard for your workspace                          |

## Project Files Structure

:rocket: data directory

- [x] migrations directory
- [x] models directory
- [x] seeds directory
- [x] dbConfig.js file

:rocket: routes directory

- [x] shoutouts.js

:rocket: services directory

- [x] bot
- [x] shoutouts.js
- [x] shoutouts.spec.js

## Coding styles and conventions

:heavy_check_mark: Folders, files and variables naming

- Camel Case `eg: bot, slackBot`

:heavy_check_mark: Constants and env variables naming

- Snake Case (All Caps) `eg: SECRET, DATABASE_URL`

:heavy_check_mark: Asynchronous Operations method

- async-await method

## NPM Commands and Descriptions

| Command            | Description                                                       |
| -------------------| ----------------------------------------------------------------- |
| `npm run server`   | Starts the server in hot-reload mode for development              |
| `npm test`         | Runs the project test suite                                       |
| `npm start`        | Starts the app server in dev, staging and production environments |
| `npm migration`    | Runs latest migrations for production                             |
| `npm dev-migration`| Runs latest migrations for development                            |
| `npm test-watch`   | Runs the project test watcher suite                               |
| `npm coverage`     | Reports coverage                                                  |

### Prettier Setup for VS Code

- Install the VS-Code extension below;

  - [x] Name: Prettier - Code formatter
  - [x] Id: esbenp.prettier-vscode
  - [x] Description: VS Code plugin for prettier/prettier
  - [x] Version: 1.9.0
  - [x] Publisher: Esben Petersen
  - [x] VS Marketplace Link: https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode

- Head over to the VS-Code settings and search for prettier

- Locate and tick the checkbox under `Prettier: Eslint Integration` section... You good to go! :sunglasses:

[![Build Status](https://travis-ci.org/bravolabs/bravo-be.svg?branch=develop)](https://travis-ci.org/bravolabs/bravo-be)

[![Test Coverage](https://api.codeclimate.com/v1/badges/b7883f2f1a9e9a0b7e99/test_coverage)](https://codeclimate.com/github/bravolabs/bravo-be/test_coverage)

# Contributing
When contributing to this repository, please first discuss the change you wish to make via issue, email, or any other method with the owners of this repository before making a change
## Issue/Bug Request
   
 **If you are having an issue with the existing project code, please submit a bug report under the following guidelines:**
 - Check first to see if your issue has already been reported.
 - Check to see if the issue has recently been fixed by attempting to reproduce the issue using the latest master branch in the repository.
 - Create a live example of the problem.
 - Submit a detailed bug report including your environment & browser, steps to reproduce the issue, actual and expected outcomes,  where you believe the issue is originating from, and any potential solutions you have considered.
### Feature Requests
We would love to hear from you about new features which would improve this app and further the aims of our project. Please provide as much detail and information as possible to show us why you think your new feature should be implemented.
### Pull Requests
If you have developed a patch, bug fix, or new feature that would improve this app, please submit a pull request. It is best to communicate your ideas with the developers first before investing a great deal of time into a pull request to ensure that it will mesh smoothly with the project.
Remember that this project is licensed under the MIT license, and by submitting a pull request, you agree that your work will be, too.
#### Pull Request Guidelines
- Ensure any install or build dependencies are removed before the end of the layer when doing a build.
- Update the README.md with details of changes to the interface, including new plist variables, exposed ports, useful file locations and container parameters.
- Ensure that your code conforms to our existing code conventions and test coverage.
- Include the relevant issue number, if applicable.
- You may merge the Pull Request in once you have the sign-off of two other developers, or if you do not have permission to do that, you may request the second reviewer to merge it for you.
## Documentation
See [Frontend Documentation](https://github.com/bravolabs/bravo-fe/blob/develop/README.md) for details on the frontend of our project.
### Attribution
These contribution guidelines have been adapted from [this good-Contributing.md-template](https://gist.github.com/PurpleBooth/b24679402957c63ec426).
