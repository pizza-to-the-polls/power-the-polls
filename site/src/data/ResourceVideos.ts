import { VideoGroup } from "./types";

const data: VideoGroup[] = [
   {
      // single videos with no category will take up the full column width
      videos: [
         {
            name: "Be a Hero this Election",
            url: "https://src.powerthepolls.org/assets/HERO_16x9.mp4",
            startFrom: 0.3,
         },
      ],
   },
   {
      category: "Getting from Signup to Election Day",
      videos: [
         {
            name: "You're a poll worker, now what?",
            url: "https://src.powerthepolls.org/assets/NOW_WHAT_16x9.mp4",
            startFrom: 2,
         },
         {
            name: "Oct 15th Poll Worker Prep Rally",
            url: "https://src.powerthepolls.org/assets/PREP_RALLY_16x9.mp4",
            startFrom: 205,
         },
      ],
   },
   {
      category: "Tips and Best Practices",
      videos: [
         {
            name: "Planning Ahead for a Safer Election Day",
            url: "https://src.powerthepolls.org/assets/PLANNING_AHEAD_16x9.mp4",
            startFrom: 2,
         },
         {
            name: "COVID-19 Safety on Election Day",
            url: "https://src.powerthepolls.org/assets/COVID_SAFETY_16x9.mp4",
            startFrom: 2,
         },
         {
            name: "Problem-solving on Election Day",
            url: null,
         },
         {
            name: "Addressing conflict at the polling place",
            url: null,
         },
      ],
   },
];
export default data;
