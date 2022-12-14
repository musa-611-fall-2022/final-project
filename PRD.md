# Solar Roof Operations

Minwook Kang / Shengao Yi

## Purpose

To inform building owners how much money they can save when installing Solar Roofs, and shows the potential of Solar Roofs throughout our community.

## Features

Our application consists of two main pages.
The My Roof Potential page is a main page that provides information about individual buildings, and when you search for an address or click on the roof of a building on a map, you can find information about the Solar Roof.  The My City Potential page configures a dashboard that shows the potential of a Solar Roof installation by city.

#### My Roof Potential
* My Roof Search Box
* Map Marker for each roof
* Summary Box of My roof
  * Address
  * Annual Hours of sunlight
  * Area available for installing solar panel
  * Estimated net profits over 20 years
  * potential environmental impact

#### My City Potential

* My City Lists
* Map of Roof by sunlight hours 
* Dashboard
  * Total Number of Roof available for installing solar panel in our city 
  * Total Area of Roof available for installing solar panel in our city
  * Estimated energy generation, MWh per Year of our city 
  * Distribution of energy potential
  * Estimated net profits over 20 years
  * Potential environmental impact
    
## Problem & Methods

The maps are all based on Mapbox.gl, we have come across several problems and solved them:

* Huge Data: our building geojson data's size is approaching 650Mb, it's too huge to load them into a geojson layer once, so we divided it into seven parts through QGIS and loaded them. We don't use Asynchronous loading.

* Select box doesn't listen to changes from Js, just from the web page, mouse or keyboard. So we added a trigger to attention the change event.

* The geocoder part is from Mapbox, we failed to change the input address when we click the roof polygon in the map. But we have defined a variable to tell the app whether the input address is from the clicked roof polygon or the input box.
