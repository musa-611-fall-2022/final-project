# Requirements - "The Perfect Date" App

## Idea
The idea behind "The Perfect Date" App is to assist anxious indecisive souls who are trying to get themselves out there and make connections. This app doesn't connect you to people, but rather assists during that stressful stage of planning a date activity. The app is similar to Google Maps: it shows locations of restaurants, museums, and parks across Philadelphia and then offers filters based on price, neighborhood, and casual-fancy scale. The best part? This app offers an option to randomly select a destination within your search category, so you don't have to put the responsibility of discerning the perfect place on your shoulders. Just relax, let the app chose your itinerary, and have fun on your perfect date. The best part? It can be used for friends or for yourself aside from romantic activities!

## Core
- [ ] A drop-down menu should offer the selections "park date", "museum date", "restaurant date", or "all of the above!", and begin to display the markers on the map. The placeholder text for the menu should say "What would you like to plan?".
  
  **The `input` element should be available on the global `window` object as a variable named `window.menu`.**
  
- [ ] Based on the category selected in the menu, different checkboxes should be displayed to filter the markers on the map. For restaurants: cuisine style, price range, fanciness range; museums: museum subject, ticket price range; and for parks: park size (small/med/large). Restaurant checkboxes and markers should be red, museums yellow, and parks white. If "all of the above!" is selected, all of the checkboxes should show up.
  
   **An array of `input` elements should be available on the global `window` object as a variable named `window.restFilters`, `window.parksFilters`, and `window.museumFilters`.**

- [ ] A set of checkboxes that can be used to filter based on the various neighborhoods of Philadelphia. The neighborhoods will then be highlighted on the map and only destinations within the neighborhoods will be shown. These checkboxes should be shown no matter what, and should be black.
  
  **An array of `input` elements should be available on the global `window` object as a variable named `window.nbhdFilters`.**

- [ ] A marker should be present on the map for each restaurant, park, and museum that meets the current filter criteria, and no markers should be present for places that _do not_ meet the filter criteria.

  **The Leaflet Map object that represents the map on the page should be available on the global `window` objects as a variable named `window.dateMap`.**

- [ ] A list item should be present in the lcoations that meet the current filter criteria, and no list items should be present for locations that _do not_ meet the filter criteria. List items should contain at least:
  - Restaurant: Restaurant name, cuisine style, price category, fanciness category
  - Museum: Museum name, museum subject (art, history,etc), ticket price
  - Park: park name, park size (small/med/large)

  **The elements represeting the lists (i.e. the `ul` or `ol`) should be available on the global `window` object as variables named `window.parksList`, `window.restList`, and `window.museumList`.**

- [ ] When you click on a restaurant, park, or museum in the list or map, the marker and list item should be highlighted.

- [ ] When a spot is highlighted, that marker and list item should stay visible no matter the filters or menu items selected, aka 'pinned'. This can occur for multiple spots.

- [ ] When you click on a spot that is already highlighted, it be un-highlighted on the list and map, and no longer pinned.

- [ ] A button labeled "Choose for me" should be on the bottom of the map and when clicked, randomly select a spot within the filtered criteria and highlight it on the list or map. Clicking on it again will un-highlight and un-pin it.

  **The `input` element should be available on the global `window` object as a button named `window.randomButton`.**

- [ ] A button labeled "Complete" should automatically wipe the map and lists of everything except the pinned, selected spots. Then a pop-up text should appear saying "It's a date!".

  **The `input` element should be available on the global `window` object as a button named `window.completeButton`.**