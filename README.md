# Philly Birding Explorer
Team: Henry Feinstein ([GitHub](https://github.com/henryfeinstein))

## Project Description
The Philly Birding Explorer is a desktop web application which serves as a tool for new and aspiring birders in the Philadelphia area to get a sense of what kinds of birds people are seeing in the city and where they're being seen. The app uses data from the Cornell Lab of Ornithology's eBird database, the leading source of crowdsourced birding information in the world. 

## Getting It Running
1. Fork the [repo](https://github.com/henryfeinstein/final-project-MUSA611).
1. Install dependencies by running `npm install` in the terminal.
1. In the `map.js` module, input your Static Tiles Mapbox API key on line 9 (`mapboxToken`). A Static Tiles Mapbox API key can be acquired [here](https://docs.mapbox.com/api/maps/static-tiles/).
1. In the `dataPull.js` module, input your eBird API token on lines 5 and 39. An eBird API token can be acquired [here](https://ebird.org/api/keygen). 
1. Open a local server using the command `npx http-server`. Enjoy exploring Philadelphia's local birds! 