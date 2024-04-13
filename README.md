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

```
npm install
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

```
npm install
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

This application backend server has two models. The user model and the auth model.

These models are defined in the models directory found in the server directory.

The task model shows the structure of the data for tasks. While the user model is for app users.

The controllers directory contains functions which can be executed for each data model.

To add a new function, study the workflow, create your function and export it.

## Folder Structure

The following subsections explain the structure and the architecture of the application.

### src

This is where the implementation of the application is. The following sub-directions shows how the architecture of the application is structured.

#### assets

The `assets` folder contains icons and images . In images store any pictures used throughout the application. Here we basically all our custom icons and images. The icons directory hold basically `.svg` files that the application needs, While the images contain any `.png` or `.jpeg` files.

#### common

The common directory will contain any reusable components that are commonly used throughout the application. For instance, buttons, form components, components related to typography, and so on.\*\*\*\*

#### layouts

The `layouts` directory, as the name suggests, should have components that provide different layouts for your pages. For example, in this application we have two types of layouts:

1. auth layouts
2. dashboard layouts

#### store

The store folder is responsible for files related to global state management. There are many state management solutions that can be used for React projects, such as Redux, Zustand, Jotai, and many many more. In this application we used Redux Tool kit (RTK), which is an extension of Redux.

#### pages

Usually, the `pages` directory only contains route/page components.

#### routes

Here I setup the rules for what page will be made accessible to the public in the application, i.e.,doesn't need authentication which include the auth pages and what need authentication. These are named ProtectedRoutes.tsx
