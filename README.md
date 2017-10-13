# React Readable Project

This is the final deliverable for the react redux class of the react nanodegree.
This project is meant to be a simple posting/commenting app in the flavor of say [reddit](https://www.reddit.com/)
but with a lot less complexity (specifically no auth or user model).

## How to run this

You first need to install all dependencies for the backend server and start it up.
In a terminal window do this:

    cd api-server
    npm install
    npm start

You then need to install all dependencies and start the front-end development server.
In a separate terminal window do this:

    cd frontend
    npm install
    npm start

## Usage

You will then be navigated to a browser page that contains some starter example data.
You can create, upvote, downvote, edit, and delete posts in the root page.
You can also sort by time and vote count.
The categories dropdown in the navbar lets you filter down to specific post categories.
If you click on the title of a post you will see the post details, where you can
create, edit, upvote, downvote, and delete post comments.

## Notes to reviewer

1. My CSS UX/UI skills are pretty bad so please excuse the ugliness of this app
2. I've used `react-bootstrap` for most of the styling but I had issues with the modal class in bootstrap.
3. I wanted to create an animation for when post or comment order changes based on upvoting/downvoting but it was not clear how I could do that with react transitions.
