## Description

A small application for uploading images from a domain to Imgur using NestJS with a Simple JSON Database
-  GET   `/posts`: Get all posts
-  POST  `/posts`: Create a post with a body consists only `coverUrl` field (the image url)
-  Every a minute the crob job will get all IDLE posts and upload the image to Imgur
-  JSON database schema: `{ next_id: number, posts: Post[] }`
-  Post's Schema `{ id: number, coverUrl: string, imgurCoverUrl: string, status: Status}`

## Installation

```bash
$ npm install
```

## Prerequisite
```bash
# Add the .env
cp .env.dist .env

# Optional: pre-load some testing data
cp example.posts.json posts.json
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


