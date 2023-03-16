# Volunteer Assistant in Mathare Slum!
An app is designed for volunteers working in Mathare, click [here](https://miaomiao612.github.io/Mathare-Slum-Facilities-App/ "悬停显示文字") to tour our app!


### Brief Introduction：

There are tons of NGOs doing projects in Mathare slum (Nairobi, Kenya). Voluntters usually work for educational and medical project, they also have other requirements like using restroom, buying water and so on. However, the location and infromation of these facilities are not in the google/apple map. Also due to the high density of buildings in slum, it's really hard for volunteers to find the right location of their purpose. This app is developed for volunteers working in the slum to find their destinations and the shortest way to get there.

### Main function：
* Map and My position

   There should be a map with whole page size, centered at Mathare Slum.
   The position of the user(volunteer) should be shown when open this app.
   
   <img src="https://github.com/miaomiao612/Mathare-Slum-Facilities-App/blob/main/%E5%8A%A8%E7%94%BB1.gif" width="320" alt="1">

* Loading desitination for volunteer works/ other purpose

   So, this app should have a search bar floating above the map that allows volunteers to input the type of facilities (schools, playgrounds, NGO working offices,      clinics, hospitals, goceries, restrooms) or the name of a specific facility.
After input the name, there should be a button to hit, and the destination(s) will show on the map as markers. 

   <img src="https://github.com/miaomiao612/Mathare-Slum-Facilities-App/blob/main/%E5%8A%A8%E7%94%BB2.gif" width="320" alt="2">

* Facility details and comments

   When clicked on a map marker, it should be highlighted.
   When clicked on a map marker, a panel should pop up floating above the map. In this panel, there should be several components.
   One component is the detail information of the clicked facility, including name, managing organization or any information available, and also comments and a picture of this facility.
   Another component is a comment bar and a save button, which allow users to upload comments. After hit the save button, these comments will be shown public to other users in the panel.
   
   <img src="https://github.com/miaomiao612/Mathare-Slum-Facilities-App/blob/main/%E5%8A%A8%E7%94%BB3.gif" width="320" alt="3">

* The shortest way to my destination

   There should be also a large button at the bottom of the panel named "direction", after hit this button, there should be a line shown on the map which is the shortest way from the user's position and the destination. (The planned roads may be a little longer than we expect, that's because the road network data from leaflet doesn't cover narrow paths, therefore, not all the paths are included when doing road planning. In the future, we will promote this function by searching more precise road data or vectoring the paths in ArcGIS Pro👩‍💻)

   <img src="https://github.com/miaomiao612/Mathare-Slum-Facilities-App/blob/main/%E5%8A%A8%E7%94%BB4.gif" width="320" alt="4">

### Data Source：
UN-Habitat urban data site——[Mathare Slum Data Points](https://github.com/miaomiao612](https://data.unhabitat.org/datasets/GUO-UN-Habitat::mathare-slum-data-points/explore?location=-0.690293%2C35.785444%2C9.59) "悬停显示文字")

### Step to get it running:
Fork the repo in your GitHub

Clone the folder in your computer

Type "npx http-server" in the teminal and open the link in your browser



