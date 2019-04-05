# Hop Collider
Hop-collider is a data visualization tool to help brewers compare the chemistry of different varieties of hops. There are over 140 different hop varieties used to brew beer. These varieties naturally contain different amounts of flavor and aroma producing chemical compounds. This variance in the hop chemistry results in the distinctive flavor of each variety.

Using this tool users can select one or more hop varieties to compare, producing a series of plots one for each chemical compound. These plots visualize the typical range found in a particular variety along with the aggregate distribution found in all the hop varieties. This helps brewers discover new and interesting hops to use, find substitute hops based on similar profiles, and dig into the chemical-basis of hop flavor.

Users can also register for an account. After authenticating, this allows them to save hop comparisons and load them again at a later date. When sorting hop varieties by popularity on the comparison page this is partially influenced by the number of saved comparisons that include each variety.

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
