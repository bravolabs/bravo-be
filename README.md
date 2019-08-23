# Bravo Backend

Healthy office cultures often acknowledge good work from their coworkers and peers. Award your peers with acknowledgements that act like coins/points in Slack when they do awesome things - and never let the acknowledgement of their good work get lost in the shuffle again.

## Bot Commands

Type `/bravo @user` to choose between sending and viewing all acknowledgements

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

- async await method

## NPM Commands and Descriptions

| Command          | Description                                                       |
| ---------------- | ----------------------------------------------------------------- |
| `npm run server` | Starts the server in hot-reload mode for development              |
| `npm test`       | Runs the project test suite                                       |
| `npm start`      | Starts the app server in dev, staging and production environments |

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
