# 🚗 FindMyCar

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.2.4.

## Running the project locally 💻

Firstly, clone the project and add the Google Maps API Key to the GMAPS_API_KEY constant at `src/environments/environment.development.ts`.

Install the dependencies with `npm install` and then run the server with `ng serve`.
After that, navigate to `http://localhost:4200/`.

<strong>This project uses miragejs, to use the API delete the mirageJS script from main.ts (src/main.ts)</strong>

Clone this repository 
## General Information and Dependencies ℹ️

This project was developed as a part of a coding challenge from Localiza. This project has the following dependencies (aside from the ones which come with every Angular project):
* Angular Material 
* Compodoc (for documentation)
* Firebase (for hosting)
* MirageJS (for mock/dumb server)


## Live version 🌐

You can see a live (hosted/deployed) version of this project at https://find-my-car-challenge.web.app .

## Documentation and project structure 📚

This project supports documentation via TSDOC and Compodoc (that's the main reason you'll see comments on the code)

You can see the generated code documentation at https://find-my-car-challenge.web.app/documentation/

To generate new documentation files use: `npm run compodoc`.

The app is made of one base module (app-module) and 3 submodules + a routing module.
The business logic is concetrated in the services.

## Design prototypes 🎨

Some low-level design prototypes made by me are available at the following [Figma Link](https://www.figma.com/file/4gxN78ZrHcSb2GfyGwvprM/localiza-challenge?type=design&node-id=0%3A1&mode=design&t=qK9LRQSRdK75umEG-1)


## Code scaffolding 🛠️

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build 🏗️

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests 🔍

<strong>Disclaimer: unit testing was not implemented</strong>.

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Information ℹ️

This project was made as a challenge project for Localiza.
