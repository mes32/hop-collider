# Hop Collider
A data visualization tool to help brewers compare different varieties of hops. Users can select one or more hop varieties and plot the concentrations of flavor and aroma producing compounds against the distribution for all hop varities.

A deployed version can be found here: [hop-collider.herokuapp.com](https://hop-collider.herokuapp.com) 

![Screenshot](documentation/images/screenshot_hop-collider.png)

## Utilized Web Stack
- `User Interface` - React, CSS, Chart.js
- `Client` - React, Redux, Redux-Saga
- `Server` - Node.js, Express
- `Database` - PostgreSQL

## Requirements
- Git
- Web browser
- Node and npm
- PostgreSQL

## Setup and Run
```bash
# 1. Create PostgreSQL database named 'hop_collider'
createdb hop_collider

# 2. Create table "Tasks" using SQL create statement in 'database.sql'. 
# (Optional: initalize database with sample data from 'database.sql')

# 3. Install Node dependencies/libraries using NPM
npm install

# 4. Start the server
npm run server

# 5. Start the client
npm run client

# 6. Application runs locally on PORT 3000
```

**See:** [localhost:3000](http://localhost:3000)

## Features

### Completed Features
- [x] Administrators can add, delete, and modify hops in the database
- [x] Users can add one or more hop varieties to an analysis
- [x] Hop analysis plots hop chemistry using Chart.js
- [x] Users can register an account and authenticate using Passport
- [x] Once logged in users can save an hop analysis and reload it later
- [x] Hops listed for adding to analysis can be sorted by alphabetical order or by popularity 

### Planned Features
- [ ] Better optimized mobile view
- [ ] Reduce the height of the background distribution to make it clear that the distributions and ranges are not interacting
- [ ] Make it more clear that the order of the order of hops in analysis does not matter, possibly by making the hops re-orderable
- [ ] When mousing over a hop range project that hop's constituent distribution in the comulative distribution below
- [ ] Allow users to sort and filter the hops available to choose and possibly the hops included in the background distribution
- [ ] Make the list of hops searchable

## Authors
Michael Stockman

## Acknowledgements
- I would like to thank my instructors at Prime Digital Academy
- I would like to thank Yakima Chief Hops for the hop chemistry analysis
