/* eslint no-unused-vars: "off" */

const slides = [
  {
    title: "Bike to Hike",
    content: `
      Can I get to a nearby hiking trail by bike? What's the safest way to do so? This project explores two ways to get to Wissahickon Valley Park from near my home.
    `,
    era: 'intro',
    style: {fillColor: 'red'},
    bounds: [[39.94641, -75.29063], [40.042780490350005, -75.12308]],
    showpopups: true,
  },

  {
    title: 'Route 1: the Google Way',
    content: `
      The first route I look at is how Google Maps recommends that I travel. This route is **6.8 miles** long and supposed to take **42 minutes**, and is the quickest route Google suggests.
      Since Google always optimizes speed over safety, I want to see whether

    `,
    era: 'br1-1',
    showpopups: true,
    bounds: [[39.94748, -75.29063], [40.02, -75.12308]],
  },

  {
    title: 'Route 1: Vehicle Crashes Involving Cyclists',
    content: `
      When Mjumbe was 11, his family moved across the country to Philadelphia.
      They lived in what would later be knows as the **Cedar Park**
      neighborhood, and Mjumbe attended **J.R. Masterman** for middle and high
      school.
    `,
    era: 'br1-3',
    showpopups: false,
    bounds: [[39.94748, -75.29063], [40.02, -75.12308]],
  },

  {
    title: 'Route 1: Speed Limits',
    content: `
      Mjumbe went back to California for college. He graduated with a computer
      science degree from **Harvey Mudd College** in **Claremont, California**.
      After college, Mjumbe moved back to the Cedar Park neighborhood and worked
      for a few years at the University of Pennsylvania, making tools for
      modeling and simulation in the social sciences.
    `,
    era: 'br1-4',
    showpopups: true,
    bounds: [[39.94748, -75.29063], [40.02, -75.12308]],
  },

  {
    title: 'Route 1: Bicycle Network',
    content: `
      After Code for America, Mjumbe went to work for OpenPlans, a NYC-based
      non-profit making tools to help citizens get involved in the urban
      planning process. He would usually work remotely from **Independents Hall**,
      making occasional trips to the NYC office from his home in **Yorktown** via
      the **Temple University train station**.
    `,
    era: 'br1-5',
    showpopups: true,
    bounds: [[39.94748, -75.29063], [40.02, -75.12308]],
  },

  {
    title: 'Route 2: Perceived Safety',
    content: `
      The next route is one that I would instinctively turn towards instead of the Google route.
      This route includes the bike lane I'm most familiar with on Spruce/South St as well as the Schuylkill River Trail, which is separated from the road.
      According to Google, this route is **8.9 miles** long and takes **52 minutes** to complete.
    `,
    era: 'br2-1',
    showpopups: true,
    bounds: [[39.94748, -75.29063], [40.02, -75.12308]],
  },

  {
    title: 'Route 2: Vehicle Crashes Involving Cyclists',
    content: `
      After Code for America, Mjumbe went to work for OpenPlans, a NYC-based
      non-profit making tools to help citizens get involved in the urban
      planning process. He would usually work remotely from **Independents Hall**,
      making occasional trips to the NYC office from his home in **Yorktown** via
      the **Temple University train station**.
    `,
    era: 'br2-3',
    showpopups: false,
    bounds: [[39.94748, -75.29063], [40.02, -75.12308]],
  },

  {
    title: 'Route 2: Speed Limits',
    content: `
      Mjumbe then went to work for the **City of Philadelphia** in the Office of
      Open Data and Digital Transformation. During this period he lived near
      Temple University in the **Hartranft** neighborhood.
    `,
    era: 'br2-4',
    showpopups: true,
    bounds: [[39.94748, -75.29063], [40.02, -75.12308]],
  },

  {
    title: 'Route 2: Bicycle Network',
    content: `
      Mjumbe left the city of Philadelphia to work on a startup called Stepwise
      with a former coworker and friend. They made tools to help investors get
      a fuller picture of potential investment properties. They would often work
      out of the **First Round Capital** offices. For a time Mjumbe lived in the
      **Woodland Terrace** neighborhood, and later in an apartment overlooking
      **Malcolm X Park**.
    `,
    era: 'br2-5',
    showpopups: true,
    bounds: [[39.94748, -75.29063], [40.02, -75.12308]],
  },

  {
    title: 'Conclusion',
    content: `
      Mjumbe left the city of Philadelphia to work on a startup called Stepwise
      with a former coworker and friend. They made tools to help investors get
      a fuller picture of potential investment properties. They would often work
      out of the **First Round Capital** offices. For a time Mjumbe lived in the
      **Woodland Terrace** neighborhood, and later in an apartment overlooking
      **Malcolm X Park**.
    `,
    era: 'br2-5',
    showpopups: true,
    bounds: [[39.94748, -75.29063], [40.02, -75.12308]],
  }

];
