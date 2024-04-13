# Task Management Application Project

This is the implementation of the Task Management App, which enables its users to create user acoounts. Each registered user can create, update, delete and view their tasks separately from other users of the platform.

## How To Run the Application

To run this application is really easy. Please follow the steps below:

1. First, open up VSCode terminal and change directory to a desired location (example desktop or documents)
2. On your terminal run the command

```
git clone https://github.com/PromiseUdo/task-app-promise.git
```

3.  Wait for step 2 process to complete. After step 2 is done, for convenience open up the project from its root directory on a new VSCode window.
4.  On the new VSCode window, start a new terminal. It's recommended to have two terminals running since the client server and the backend server have to be started independently.
5.  On the first opened terminal, change directory to client directory. DO this by typing the command

```
cd client
```

Once changed run the command

```npm install

```

This will enable the client server install all dependencies on the package.json file.
Once this is complete, run the command

```
npm run start
```

This last command will run the client server 6. On the second opened terminal, change directory to the server by typing the command

```
npm server
```

Once changed run the command

```npm install

```

This will enable the backend server install all dependencies on the package.json file.
Once this is complete, run the command

```
npm run serve
```

This last command will start backend server

## Things To Know

This project was implemented with react library.

Create React App (CRA) was used in setting up this project, with a typescript template and the tool CRA Configuration Override (CRACO) was used to enhance CRA for typescript so that we can support alias and other features.
