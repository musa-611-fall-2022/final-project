# MUSA 611 Final Project PRD: Philadelphia Birding Reference

## Purpose

There are countless birding resources available to aspiring and seasoned birdwatchers around the world. So many, in fact, that the options can get overwhelming; it can be hard to separate the useful and relevant from the overcomplicated or unrelated. The goal of this product is to create a simple resource for beginner birdwatchers in Philadelphia to get a sense of which birds are being seen throughout the city on a real-time basis, providing helpful guidance into where to go and what to look for without overwhelming with extra information. 

## Features

The application will be based around [eBird's API](https://documenter.getpostman.com/view/664302/S1ENwy59), which provides real-time information on user-generated bird observations based on location, as well as more general information from the Cornell Lab of Ornithology's databases. At a high level, the application will present a map of recent observations with options to view most common species, a search function for specific species, and the opportunity for the user to record their own observations. The application's features are outlined below:

* Mobile and desktop friendly
* Map of Philadelphia which, upon startup, will display most recent observations in region
* Each observation will be clickable, bringing up the bird, time, and location of the observation, as well as the distance from the user's location. Popup will link to the eBird website page for that species for more detailed information. 
* Button to filter to only "notable" observations (a classification provided by the API for particularly rare or interesting species)
* Button to display "hotspots" on map (another data type provided by the API based on frequency of recent observations)
* Search bar to look for specific species. When a species is selected from the search results, recent observations of that species will appear on the map, and recent observation counts/bird information will be displayed elsewhere on the page. 
* Button for user to enter their own observation. When clicked, a popup will appear with fields to enter the species, location, and any notes. 
* User observations will be saved in local storage and can be recalled with a button, which will display a list of observations.

## Milestones

1. Set up workstream to pull recent observation data, recent notable observation data, and hotspot data from the eBird API
1. Create map and user location identification system
1. Lay out page with necessary buttons, search bar, etc.
1. Create HTML objects for all necessary elements, including popup objects
1. Set up local storage system for user observation saving
1. Style the page using CSS