<h1><img src="frontend/public/img/profile-rounded.png" width=30 /> GPS Trails</h1>

GPS  Trails  is  a  user-centralized web-application that  is  designed  to  foster  a  new community of nature enthusiasts. Some of its features include allowing users to input their own trial discoveries and reviewing previous trails already in the database.

<p align="center">
    <img src="frontend/public/img/previews/homepage.png" />
    <small><i>Homepage</i></small>
</p>
<br />

## Implementation
GPS Trails is implemented using 3 stand-alone  components: Angular for the client facing front-end, NestJS as the backend API server that talks to a MySQL database to store and fetch trail and user related data. Additionally, we make use of the Mapbox API in order to serve a custom interactable map interface.

## Pages
<p align="center">
    <img src="frontend/public/img/previews/explore_acadia.png" />
    <small><i>Emplore page on <a href="https://en.wikipedia.org/wiki/Acadia_National_Park">Acadia National Park</a></i></small>
</p>
<br />
<p align="center">
    <img src="frontend/public/img/previews/park_page.png" />
    <small><i>Detailed park page on <a href="https://en.wikipedia.org/wiki/Yosemite_National_Park">Yosemite National Park</a></i></small>
</p>

## Set Up
### Clone project
```
$ git clone https://github.com/ayaanqui/gps-trails.git
$ cd gps-trails
```

### Create database
Since this project relies on MySQL as the database, all dependencies are for MySQL. To ensure that the project runs properly create an empty database.
`CREATE DATABASE gps-trails;`

### Setting Up the API Server
```
$ cd gps-trails/api/
```
### Setting Up TypeORM Config Files
Now, we need to ensure that TypeORM is able to find the connection strings to connect to the database properly

1. Create a file named `ormconfig.json` in the root of `gps-trails/api/` directory
2. Paste and fill out the contents with the appropriate information
```json
{
  "type": "mysql",
  "host": "localhost",
  "port": 3306,
  "username": "root",
  "password": "root",
  "database": "gps-trails",
  "entities": ["dist/**/*.entity{.ts,.js}"],
  "synchronize": true
}
```
_*The only fields that need to be changed are `username`, `password`, and `database`. Anything other than these fields should not be changed._

After this we will need to make sure that all the dependencies are installed for the server to start up properly.

```
$ npm install
```
Once this step is complete, run the command `npm start`. If everything compiles and runs properly, you should be able to access `localhost:3000`, and you should see the following message on the console:
```
[Nest] 430432   - 05/16/2021, 4:32:14 PM   [NestFactory] Starting Nest application...
[Nest] 430432   - 05/16/2021, 4:32:14 PM   [InstanceLoader] TypeOrmModule dependencies initialized
....
```
With that, the server should be up, and ready to be used for our frontend Angular service.

### Setting Up The Frontend
```
$ cd gps-trails/frontend
$ npm install
$ npm start
```
Running this should open up a new browser tab with the GPS Trails homepage, ready to be used.