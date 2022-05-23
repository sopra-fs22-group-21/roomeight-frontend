<p align="center">
  <a href="https://github.com/sopra-fs22-group-21" target="_blank">
    <img alt="roomeight-logo" height="150" src="https://raw.githubusercontent.com/sopra-fs22-group-21/roomeight/b3de2881db6579ee9322e9e8bc70634c94ad7414/room8.svg"/>
  </a>
</p>
<p align="center">
    <a href="https://github.com/sopra-fs22-group-21/roomeight">Docs</a> <a>| </a><a href="https://www.instagram.com/roomeight.ch/">Instagram</a><a> | </a><a href="https://github.com/sopra-fs22-group-21/roomeight-backend">Backend</a>
</p>
<p align="center">
    <img alt="GitHub release (latest SemVer)" src="https://img.shields.io/github/v/release/sopra-fs22-group-21/roomeight-frontend">
    <img alt="GitHub issues" src="https://img.shields.io/github/issues-raw/sopra-fs22-group-21/roomeight-frontend">
    <img alt="GitHub closed issues" src="https://img.shields.io/github/issues-closed-raw/sopra-fs22-group-21/roomeight-frontend?color=">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/sopra-fs22-group-21/roomeight-frontend">
    <img alt="GitHub commit activity" src="https://img.shields.io/github/commit-activity/m/sopra-fs22-group-21/roomeight-frontend">
    <img alt="apero" src="https://img.shields.io/badge/%F0%9F%98%89-ap%C3%A9ro-brightgreen">
    <img alt="Sonarcloud" src="https://github.com/sopra-fs22-group-21/roomeight-frontend/actions/workflows/sonarcloud_analysis.yml/badge.svg?branch=main">
    <img alt="GitHub" src="https://img.shields.io/github/license/sopra-fs22-group-21/roomeight-frontend">


</p>


# Introduction
roomeight© is a better matching platform for future roomeight's!
Our goal is to connect people who are looking for a room and shared flats which are offering one - 
in a playful and fun way

[Check it out!](https://expo.dev/@sopragroup21/roomeight)

# Illustrations
Screenshots & gifs to be inserted!

# Technologies

## Important libraries
- [React Native](https://reactnative.dev/), which enabled us to leverage the React JavaScript library while still developing natively. 
- [Redux](https://redux.js.org/), maintain a centralized application state container
- [React-Navigation](https://reactnavigation.org/), to handle routing and navigation
## External APIs
- [Firebase](https://firebase.google.com/docs/), which is used by our [backend](https://github.com/sopra-fs22-group-21/roomeight-backend) to provide services like authentication and the REST interface
- [Google's Geocoding API](https://developers.google.com/maps/documentation/geocoding/overview), to convert addresses to coordinates for Map views
## Other
- [Expo](https://expo.dev/), to simplify builds, development, testing,  as well as distribution of our application
- [Prettier](https://prettier.io/) & [husky](https://github.com/typicode/husky), for code formatting and pre-commit hooks

# High-level components
The Application entry point is [App.js](/App.js), It initializes the redux store and provides it to the rest of the app by [wrapping](/App.js#L36) it in a provider.

From there the [Route](/src/navigation/index.js) Component handles all of our navigation between screens. It is also responsible to react to authentication changes and [builds](/src/navigation/index.js#L96) the current navigation stack that the user is allowed to see.

All the requests and the logic behind it regarding fetching, posting, updating and deleting are handled by redux [actions](/src/redux/actions/) and [reducers](/src/redux/reducers/). Our roomeight documentation repository provides an [overview](https://github.com/sopra-fs22-group-21/roomeight/blob/main/diagrams/reduxStore.drawio.svg) of our redux states and their functionality.

Furthermore we built several [screens](/src/screens) to display all the information and let the user interact with his profile and other resources. Throughout all of the screens we used custom built [components](/src/components/).

# Launch & Deployment
## Prerequisites
For your local development environment, you will need Node.js. You can download it [here](https://nodejs.org). All other dependencies, including React & React-Native, get installed with:

`npm install`

Run this command before you start your application for the first time.

You will also need to install [Expo Go](https://expo.dev/expo-go) to your phone. Please note that all of our testing and development has been focused on IOS clients, however android should be supported. If you run into any bugs please report them to us.

Be aware that the functionality relies on the [roomeight backend](https://github.com/sopra-fs22-group-21/roomeight-backend) to be deployed and available. Check out their README for more information.

## Development
For local development you can start the server with:

`expo start`

Now you can open [http://localhost:19002](http://localhost:19002) to view the developer tools.

With your phone and Expo Go installed you can scan the qr code and start interacting with the app.

Expo supports fast refresh so you should be able to see any changes immediately. In doubt shake your phone and press `"Reload"` to force the client to reload the JavaScript bundle.

You can also use Xcodes Simulator application to test but be aware that some features like Push Notifications will not work on a simulated device!

## Debugging
For debugging use [React Native Debugger](https://github.com/jhen0409/react-native-debugger) and connect the remote JS Debugger on port 19000. It is almost essential for redux debugging.

## Deployment
If you want the application to be available on your phone all the time you can use

`expo publish`

to deploy the app to expo's servers. It will then be available on your expo account.

# Roadmap
Future features could include:
 - an extensive settings page to change things like email or reset your password
 - an option to report malicious profiles
 - an option to easily post your profile to social media to promote it
 - and more...

 # Authors and acknowledgment
 Jordi Küffer @flyingbeat

 Luisa Stückelberger @luisauzh

 Jasmin Hochuli @jaesebaese

 # License
This project is licensed under GNU AGPLv3