# 1 Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm install`

to be able to make http request to the server install axios by running:

### `npm install axios`

then:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment




# 2. Getting Started with node js and mongo db

download mongodb server: https://www.mongodb.com/try/download/community

download mongodbshell: https://www.mongodb.com/try/download/shell

optional download mongodb compass(GUI): https://www.mongodb.com/try/download/compass


after installation:

add both the binary file location of mongodb server and mongodb shell to system paths under enviroment variables:

![ini](https://github.com/MLesky/Creative-Skills-Hub/assets/123896407/e741de18-7610-4c04-ada7-ef667b126cfc)

click on new and paste the your binary path of mongodb server then do same for mongosh


both paths to be added to system path should look like this "C:\Program Files\MongoDB\Server\7.0\bin" and "C:\Program Files\mongosh-2.2.2-win32-x64\mongosh-2.2.2-win32-x64\bin".


to start mongodb server, open terminal on windows and enter the command:

### `mongod --dbpath="C:\Program Files\MongoDB\Server\7.0"`

once mongo server is running connect it to mongoshell by opening a new terminal and entering the command:

### `mongosh`

NOW MONGOSERVER AND MONGOSH ARE RUNNING YOU CAN HEAD TO THE PROJECT FOLDER IN YOUR CODE EDITOR.


first get to the backend folder with:

### `cd backend`

initialize node js in the folder  

### `npm init -y`

install neccessary dependencies

### `npm install express mongoose body-parser axios dotenv cors bcrypt`


express for the server framework.

mongoose for MongoDB interactions.

body-parser to parse incoming request bodies.

axios for making HTTP requests (for email verification).

dotenv to manage environment variables.

cors for Cross-Origin Resource Sharing(since frontend and backend server are running on different ports).

bcrypt for hashing and salting passwords.



finally start your node js server on a different terminal in your code editor since react is already running in the other terminal


### `node auth-server.js`


Open [http://localhost:3000](http://localhost:4000) to view it in your browser.
