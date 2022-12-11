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
      Since Google always optimizes speed over safety, I want to see whether this route is also comparable in safety to what I would instinctively choose.

    `,
    era: 'br1-1',
    showpopups: true,
    bounds: [[39.94748, -75.29063], [40.02, -75.12308]],
  },

  {
    title: 'Route 1: Vehicle Crashes',
    content: `
      When we look at vehicle crashes overall, there have been **163 crashes** between 2019-2021 along this route.
    `,
    era: 'br1-2',
    showpopups: false,
    bounds: [[39.94748, -75.29063], [40.02, -75.12308]],
  },

  {
    title: 'Route 1: Vehicle Crashes Involving Cyclists',
    content: `
      Looking at just crashes involving cyclists, there have only been **three crashes** between 2019-2021, with one of them causing a serious injury (hover over to see which).
    `,
    era: 'br1-3',
    showpopups: false,
    bounds: [[39.94748, -75.29063], [40.02, -75.12308]],
  },

  {
    title: 'Route 1: Speed Limits',
    content: `
      If a person is in a crash, speed limits have a large impact on whether they'll survive. Based on Vision Zero statistics, which are currently limited to pedestrians, when a person is hit at 20mph, **1 out of 10** die. 
      When hit at 30mph, **5 out of 10 die**; at 40mph, **9 out of 10 die**. Though cyclists are in a slightly different situation, higher speed limits would still be riskier in the result of a crash. 
      As shown here, many of the roads along this route have a speed limit of 30mph or over.
    `,
    era: 'br1-4',
    showpopups: true,
    bounds: [[39.94748, -75.29063], [40.02, -75.12308]],
  },

  {
    title: 'Route 1: Bicycle Network',
    content: `
      Lastly, a reason I (and many others) choose to bike certain routes is because the presence of bike lanes makes me feel safe.
      On this route, only about **1.2 miles** of this route is within the bicycle network.
    `,
    era: 'br1-5',
    showpopups: true,
    bounds: [[39.94748, -75.29063], [40.02, -75.12308]],
  },

  {
    title: 'Route 2: Perceived Safety',
    content: `
      The next route is one that I would instinctively turn towards instead of the Google route, because it feels safer.
      This route begins with the bike lane I'm most familiar with on Spruce/South St, then turning onto Schuylkill River Trail, which is separated from the road entirely.
      According to Google, this route is **8.9 miles** long and takes **52 minutes** to complete.
    `,
    era: 'br2-1',
    showpopups: true,
    bounds: [[39.94748, -75.29063], [40.02, -75.12308]],
  },


  {
    title: 'Route 2: Vehicle Crashes',
    content: `
      On this route, there were **76 crashes** between the years of 2019 and 2021, so less than half compared to the first route.
      Note: only crashes not along the Schuylkill River trail are included, as I assume most crashes near the trail are actually on adjacent Kelly Drive.
    `,
    era: 'br2-2',
    showpopups: false,
    bounds: [[39.94748, -75.29063], [40.02, -75.12308]],
  },

  {
    title: 'Route 2: Vehicle Crashes Involving Cyclists',
    content: `
      As for crashes involving cyclists, there have been **12 crashes** between 2019-2021, which is four times as much as Route 1.
      However, none of these crashes caused the cyclist serious injury; most likely, the increased number of crashes, which are all concentrated on Spruce St, are due to the high volume of cyclists going either to the University of Pennsylvania or from West Philadelphia to Center City.
      This, in addition to erratic traffic activity near the university, may contribute to a higher number of minor crashes.
    `,
    era: 'br2-3',
    showpopups: false,
    bounds: [[39.94748, -75.29063], [40.02, -75.12308]],
  },

  {
    title: 'Route 2: Speed Limits',
    content: `
      Speed limits along this route are much lower on average, with the vast majority of the route running along the Schuylkill River Trail.
      Again, Vision Zero pedestrian statistics state: 
      **1 out of 10 die** when hit at 20mph, **5 out of 10 die** when hit at 30mph, and **9 out of 10 die** when hit at 40mph.
    `,
    era: 'br2-4',
    showpopups: true,
    bounds: [[39.94748, -75.29063], [40.02, -75.12308]],
  },

  {
    title: 'Route 2: Bicycle Network',
    content: `
      Unlike Route 1, the vast majority of this route takes place on bike lanes or paths, with much of it being on a high-quality off-street trail with no interaction with vehicle traffic.
      Only 350 feet of this route is not within the Philadelphia bicycle network.
    `,
    era: 'br2-5',
    showpopups: true,
    bounds: [[39.94748, -75.29063], [40.02, -75.12308]],
  },

  {
    title: 'Conclusion',
    content: `
      Through my exploration on this project, I was surprised to see such a low number of bicycle-related crashes along the route Google suggested; however, I suspect this is because bicycle volumes are likely very low.
      For my own safety, I would still stick to the Schuylkill route, despite how much longer it takes, due to the presence of high-quality cycling infrastructure along it.
      Lastly, I did not realize initially that there are actually no Indego stations near the Wissahickon Valley Park, making it difficult for anyone without their own bike to travel there.
      Hopefully, in the future, Indego will spread to more natural connections and help Philadelphians reach a more peaceful state of mind.
    `,
    era: 'close',
    showpopups: false,
    bounds: [[39.94748, -75.29063], [40.02, -75.12308]],
  }

];
