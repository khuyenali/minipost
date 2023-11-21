## Description

A small application for uploading images from a domain to Imgur using NestJS with a Simple JSON Database

## Installation

```bash
$ npm install
```

## Prerequisite
```bash
# Add the .env
copy .env.dist .env

# Optional: pre-load some testing data
copy example.posts.json posts.json
```
## :warning: Attention: Things to Watch Out For :warning:
- Make sure to add ClientID to the `.env` file and the Imgur api url is up-to-date
- Don't manualy change the posts.json (database) while the server is running


## Running the app
```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
