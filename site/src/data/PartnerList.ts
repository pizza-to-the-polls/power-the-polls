export interface Partner {
   /**
    * Unique ID for this partner
    */
   readonly id: string;

   /**
    * The full name of this partner
    */
   readonly name: string;

   /**
    * A logo for partners that should be displayed on the partners page.
    * If no logo is provided, the partner will no appear on page-partners.tsx
    */
   readonly logo?: string;

   /**
    * The key to use for thie source in ActionKit. If `undefined`, then the value
    * of `id` should be used instead.
    */
   readonly source?: string;

   /**
    * By, default users are opted into chase in ActionKit.
    */
   readonly optUserOutOfChase?: boolean;

   /**
    * If `true` this partner is a Founding Partner
    */
   readonly founding?: boolean;

   /**
    * The label for an additional field to be displayed on the signup form
    */
   readonly customSignupFormField?: string;

   /**
    *
    */
   readonly dark?: boolean;
}

const data: Partner[] = [
   {
      id: "911day",
      name: "9/11 Day",
      logo: "911-day.png",
      dark: true,
   },
   {
      id: "acs",
      logo: "acs.png",
      name: "American Constitution Society",
      source: "american-constitution-society",
   },
   {
      name: "Action Button",
      id: "actionbutton",
      logo: "action-button.png",
   },
   {
      id: "aflcio",
      name: "AFL-CIO",
      source: "labor-aflcio",
      optUserOutOfChase: true,
      customSignupFormField: "Union Name",
   },
   {
      id: "afscme",
      name: "AFSCME",
      source: "labor-afscme",
      logo: "afscme.png",
      optUserOutOfChase: true,
   },
   {
      id: "aft",
      name: "AFT",
      source: "labor-aft",
      optUserOutOfChase: true,
   },
   {
      id: "allin",
      name: "All In",
      logo: "all-in.svg",
   },
   {
      id: "AYO",
      name: "Alliance for Youth Organizing",
      logo: "alliance-for-youth-organizing.png",
      founding: true,
   },
   {
      id: "alliance-students-at-the-polls",
      name: "Alliance Students at the Polls",
      logo: "alliance-students-at-the-polls.png",
   },
   {
      id: "american-promise",
      name: "American Promise",
      logo: "american-promise.png",
   },
   {
      id: "baltimore-votes",
      name: "Baltimore Votes",
      logo: "baltimore-votes.png",
      dark: true,
   },
   {
      id: "blockpower",
      name: "Block Power",
      logo: "block-power.png",
   },
   {
      id: "boys-and-girls-club",
      logo: "boys-and-girls-clubs.png",
      name: "Boys and Girls Clubs of America",
      source: "boys-and-girls-clubs",
   },
   {
      id: "bbyo",
      name: "BBYO",
      logo: "bbyo.png",
   },
   {
      id: "big-tent-usa",
      name: "Big Tent USA",
      logo: "big-tent-usa.jpeg",
      dark: true,
   },
   {
      id: "breakout",
      name: "Breakout",
      logo: "breakout.png",
   },
   {
      id: "burton",
      name: "Burton",
      logo: "burton.png",
   },
   {
      id: "campus",
      name: "Campus Compact",
      logo: "campus-compact.png",
   },
   {
      id: "campusvote",
      name: "Campus Vote Project",
      logo: "campus-vote-project.png",
   },
   {
      id: "caa",
      name: "CAA Foundation",
      logo: "caa-foundation.png",
      founding: true,
      dark: true,
   },
   {
      id: "cbs",
      name: "CBS",
   },
   {
      id: "cc",
      name: "Comedy Central",
      logo: "comedy-central.png",
      source: "ComedyCentral",
      founding: true,
   },
   {
      id: "civicgeorgia",
      logo: "civi-georgia.png",
      name: "Civic Georgia",
      source: "civic-georgia",
   },
   {
      id: "civicalliance",
      name: "Civic Alliance",
      logo: "civic-alliance.png",
      source: "CivicAlliance",
      founding: true,
   },
   {
      id: "civil-review-board",
      name: "Civil Review Board",
      logo: "civil-review-board.jpg",
      dark: true,
   },
   {
      id: "CrookedMedia",
      name: "Crooked Media",
      logo: "vsa.png",
   },
   {
      id: "defendourfuture",
      name: "Defend Our Future",
      logo: "defend-our-future.png",
   },
   {
      id: "evc",
      logo: "every-vote-counts.png",
      name: "Every Vote Counts",
   },
   {
      id: "fairelections",
      logo: "fair-elections-center.png",
      name: "Fair Elections Center",
      source: "FairElections",
      founding: true,
   },
   {
      id: "feministmajority",
      logo: "feminist-majority-foundation.png",
      name: "Feminist Majority Foundation",
      dark: true,
   },
   {
      id: "fl",
      name: "Florida",
   },
   {
      id: "global-black-caucus",
      name: "Global Black Caucus",
      logo: "global-black-caucus.jpg",
      dark: true,
   },
   {
      id: "headcount",
      name: "HeadCount",
      logo: "head-count.png",
      source: "HeadCount",
      dark: true,
   },
   {
      id: "impactual",
      name: "Impactual",
      logo: "impactual.png",
      dark: true,
   },
   {
      id: "jolt",
      name: "Jolt Action",
      logo: "jolt.png",
      dark: true,
   },
   {
      id: "leadershipnow",
      name: "Leadership Now Project",
      logo: "leadership-now-project.png",
      dark: true,
   },
   {
      id: "leadmn",
      name: "Lead MN",
      logo: "lead-mn.jpg",
      dark: true,
   },
   {
      id: "levis",
      logo: "levi-strauss.png",
      name: "Levi's",
      source: "Levis",
      founding: true,
   },
   {
      id: "mtv",
      logo: "mtv.png",
      name: "MTV",
      founding: true,
   },
   {
      id: "miami-dade-college",
      name: "Miami Dade College",
      logo: "miami-dade-college.jpg",
      dark: true,
   },
   {
      id: "AAAAAAAAAAAA",
      logo: "nrdn.png",
      name: "National Disability Rights Network",
      source: "NDRN",
      founding: true,
   },
   {
      id: "mcn",
      name: "Master Clinician Network",
      logo: "mcn.png",
      dark: true,
   },
   {
      id: "mitzvote",
      name: "Mitz Vote",
      logo: "mitz-vote.png",
      dark: true,
   },
   {
      id: "mweg",
      name: "Mormon Women For Ethical Government",
      logo: "mweg.svg",
      dark: true,
   },
   {
      id: "national-coalition-for-accessible-voting",
      name: "National College for Accessible Voting",
      logo: "national-coalition-for-accessible-voting.png",
      dark: true,
   },
   {
      id: "ncbcp",
      name: "National Coalition On Black Civic Participation",
      logo: "ncbcp.png",
      dark: true,
   },
   {
      id: "microsoft",
      name: "Microsoft",
      source: "Microsoft",
   },
   {
      id: "microsoftint",
      name: "Microsoft",
      source: "MicrosoftInt",
   },
   {
      id: "nea",
      name: "NEA",
      source: "labor-nea",
      optUserOutOfChase: true,
   },
   {
      name: "OMG WTF",
      id: "omg-wtf",
      logo: "omg-wtf.png",
   },
   {
      id: "nh",
      name: "New Hampshire",
   },
   {
      id: "patagonia",
      logo: "patagonia.png",
      name: "Patagonia",
      source: "Patagonia",
      founding: true,
   },
   {
      id: "pizza",
      logo: "pizza-to-the-polls.png",
      name: "Pizza to the Polls",
      source: "Pizza",
      founding: true,
   },
   {
      id: "AAAAAAApublicwiseAAAAA",
      logo: "public-wise.png",
      name: "Public Wise",
   },
   {
      id: "repairtheworld",
      logo: "repair-the-world.png",
      name: "Repair The World",
   },
   {
      id: "represent-us",
      name: "Represent US",
      logo: "represent-us.png",
   },
   {
      id: "salesforce",
      name: "Salesforce",
      source: "Salesforce",
   },
   {
      id: "scholars-strategy-network",
      name: "Scholars Strategy Network",
      logo: "scholars-strategy-network.png",
      dark: true,
   },
   {
      id: "seiu",
      name: "SEUI",
      source: "labor-seiu",
      optUserOutOfChase: true,
   },
   {
      id: "slsv",
      logo: "slsv.png",
      name: "Students Learn Students Vote",
      source: "SLSV",
      founding: true,
   },
   {
      id: "socially-driven-music",
      name: "Socially Driven Music",
      logo: "socially-driven-music.png",
   },
   {
      id: "starbucks",
      name: "Starbucks",
   },
   {
      id: "sva",
      name: "Student Veterans of America",
      logo: "sva.png",
   },
   {
      id: "texas-lbj-school",
      name: "Texas LBJ School",
      logo: "texas-lbj-school.png",
      dark: true,
   },
   {
      id: "tds",
      name: "The Daily Show",
      source: "TheDailyShow",
   },
   {
      id: "theSkimm",
      logo: "the-skimm.png",
      name: "theSkimm",
      source: "skimm",
   },
   {
      id: "timetovote",
      logo: "time-to-vote.png",
      name: "Time to Vote",
      source: "TimeToVote",
      founding: true,
   },
   {
      name: "Town Hall Project",
      id: "town-hall-project",
      logo: "town-hall-project.png",
   },
   {
      id: "uber",
      logo: "uber.png",
      name: "Uber",
      source: "Uber",
      founding: true,
   },
   {
      id: "unitedway",
      logo: "unitedway.png",
      name: "United Way",
      source: "UnitedWay",
      founding: true,
   },
   {
      id: "viacomcbs",
      name: "ViacomCBS",
      source: "ViacomCBS",
   },
   {
      id: "Vote411",
      name: "Vote411",
      logo: "vote-411.png",
   },
   {
      id: "wecanvote",
      logo: "wecanvote.png",
      name: "We Can Vote",
      source: "WeCanVote",
      founding: true,
   },
   {
      id: "weslayan-engaged",
      name: "Weslayan Engaged",
      logo: "weslayan-engaged.jpg",
      dark: true,
   },
   {
      id: "when-we-all-vote",
      logo: "when-we-all-vote.png",
      name: "When We All Vote",
      source: "when-we-all-vote",
   },
   {
      id: "wi",
      name: "Wisconsin",
   },
   {
      id: "work-elections",
      name: "Work Elections",
   },
   {
      id: "YMCA",
      name: "YMCA",
      logo: "ymca.png",
   },
];
export default data;
