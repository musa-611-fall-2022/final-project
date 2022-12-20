# Product Requirements for a 311 Event-based Scrollytelly (Name TBD)

## Purpose
We would like to make an interactive visualization that informs and entertains people about the vibes that are felt in a city (Philadelphia) during an important event, using 311 data.

## Features
Using a subset of 311 data, the user will scroll through a pre-determined time period and see when and where 311 requests of various types are filed in Philadelphia, and how they correlate to certain important events during that time period. For example, we could show the week leading up to midterm elections, and the user could see where and when information requests and other relevant 311 service requests pop up before and during the big day. 

Primarily, the interface will be made up by a map of Philadelphia, that when scrolled on, will change the time period and reveal the 311 requests that correspond to that time period. We would also like to include a stream graph that serves as a legend on the bottom, showing certain important events during the time period, as well as the current position (in time) of the user.

## Milestones
  1. Download 311 data, analyze to find most interesting time period to visualize. Current ideas include Halloweekend, the most recent World Series, and the midterm elections.
  2. Clean 311 data and aggregate categories into more intuitive buckets (there are a lot of 311 data categories currently).
  3. Design rough mockup (probably in Figma)
  4. Get comfortable with scrollstory library (which uses jQuery) for the scroll interaction, as well as Apex Charts or similar (for the stream graph)
  5. Build map that hides and shows data based on scroll
  6. Build chart that indicates user position within the time period and responds to scrolling
  7. Input cleaned 311 data and debug
  8. Make it pretty! Style it to match the event.
  9. Sleep. 
