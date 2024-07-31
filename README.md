# OlympicGamesStarter Documentation :

## App folders :

* core :

The core folder implements interfaces, models and a service :

1. Interfaces are ones used to handle datas which ngx-chart understand.

2. Models are used to handle datas from olympic.json.
3. Olympic service is downloading all datas from olympic.json by a http request. It provides data by a subscribe action done in dashboard component and details component.

* dashboard :

This component is the first interface specified in sketch. It includes general informations and a pie-chart showing us a score by a country. User can hover onto it to see the name of country plus the score value. If user performs a clic, he's redirected to details page.

* details :

Details component is the second interface specified in sketch. It includes more stats and a line-chart to illustrate performance by years per country. It implements a back button in order to go back to dashboard and allow user to select another country.

* header :

Header component implements the head of pages. It include a logo and the title of the page.

* pages :

Pages folder contains in a hand a home folder and in the other hand the not-found folder :

1. The home component can be considered as the landing-page. It include app-dashboard which is our first interface for this project.

2. The not-found component allow us to handle the not-found exception. It include a text "404 not found" and a back button redirecting to home component and indirectly to dashboard component.

## Assets folders :

This folder contains images used by our project and the data file olympic.json.

# Requirements :
Don't forget to install :

* NPM & NODE :

Run the command `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash ` in a terminal.

Relaunch your terminal then run `nvm install 20`.

You can check versions with :

`node -v` which should print `v20.16.0` and `npm -v`. with `10.8.1`

* Ngx-chart :

Run theses commands in a terminal located in the project directory :

`npm install @swimlane/ngx-charts`

`npm install @types/d3 --save-dev`

`npm install @angular/animations`

## Before launch :

Run `npm install` in the project directory.

Then run `npm i -g @angular/cli` to setup angular.

Whould you like to share pseudonymous datas : `n`

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.
