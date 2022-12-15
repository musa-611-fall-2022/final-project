# Final Project README

# Submitted by: 
Morgan Griffths 

# Data Sources: 
* Site feature points from Google My Maps (originally crowdsourced from Somerville residents and compiled by me): https://www.google.com/maps/d/u/1/edit?mid=1ygLkbAZGw1hJQi2lYwernQcrtIanKU_J&ll=42.39486365890395%2C-71.10465965000002&z=14, 
* Somerville Boundary from the City of Somerville: https://data.somervillema.gov/GIS-data/City-Limits/pz4k-wh6e 

# External Packages and Libraries Used/Required
* Leaflet for the basemap 
* Mapbox, with the theme "dark-v11" for the custom map tiles
* Font from W3Schools: "https://www.w3schools.com/w3css/4/w3.css" 


# Process 
* I downloaded the data from the Google MyMaps map as a KMZ and used an online tool to convert it into a geoJSON
* I then brought the geoJSON into VSCode and followed a similar process to the School Explorer Project to set up the map and   the filtering system, and learned how to add popups to the feature points on the map. 


# Features  
* Displays a map of Somerville with circle markers showing the locations of various "I Spy Somerville" entries
* The user can click on each marker to load a popup that will display more information about the correspondinge entry
* The user can type a name into the "Enter Submittor Name..." textbox and filter the entries by who submitted them
* The user can click checkboxes to filter the entries by particular challenge or neighborhood location

