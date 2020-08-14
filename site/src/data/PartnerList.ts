export interface Partner {
   /**
    * The key to use for thie source in ActionKit and for a vanity URL `https://powerthepolls.org/{partnerId}`
    * for the partner which will include their partnerID when the form is submitted
    */
   readonly partnerId: string;

   /**
    * Optional vanity URL which will result in `https://powerthepolls.org/{additionalVanityUrl}` including `partnerId`
    * upon submission. Note that `partnerId` will itself always be a valid URL (`https://powerthepolls.org/{partnerId}`),
    * so this is only needed if there is an alternative URL desired.
    */
   readonly vanityUrl?: string;

   /**
    * The full name of this partner
    */
   readonly name: string;

   /**
    * A logo for partners that should be displayed on the `/partners` page (page-partners.tsx). Images are sourced
    * from `/site/public/assets/images/partners/*`). If no logo is provided, the partner will no appear on the
    * Partners page.
    */
   readonly logo?: string;

   /**
    * By, default users are opted into chase in ActionKit.
    */
   readonly optUserOutOfChase?: boolean;

   /**
    * If `true` this partner is a Founding Partner
    */
   readonly founding?: boolean;

   /**
    * The label for an additional field to be displayed on the signup form. If not provided, no additional field
    * will be displayed.
    */
   readonly customSignupFormField?: string;

   /**
    * Whether to include the partner `logo` on the landing page of the partner's vanity URL (either
    * `https://powerthepolls.org/{partnerId}` or `https://powerthepolls.org/{additionalVanityUrl}`).
    */
   readonly customLandingLogo?: boolean;

   /**
    * If true, the `logo`, when displayed, will receive a white background.
    */
   readonly logoIsDark?: boolean;
}

const data: Partner[] = [
   {
      partnerId: "911day",
      name: "9/11 Day",
      logo: "911-day.png",
      logoIsDark: true,
   },
   {
      partnerId: "american-constitution-society",
      vanityUrl: "acs",
      name: "American Constitution Society",
      logo: "acs.png",
   },
   {
      partnerId: "actionbutton",
      name: "Action Button",
      logo: "action-button.png",
   },
   {
      partnerId: "labor-aflcio",
      vanityUrl: "aflcio",
      name: "AFL-CIO",
      optUserOutOfChase: true,
      customSignupFormField: "Union Name",
      logo: "aflcio.svg",
      customLandingLogo: true,
   },
   {
      partnerId: "labor-afscme",
      vanityUrl: "afscme",
      name: "AFSCME",
      logo: "afscme.png",
      optUserOutOfChase: true,
      customLandingLogo: true,
   },
   {
      vanityUrl: "aft",
      name: "AFT",
      partnerId: "labor-aft",
      optUserOutOfChase: true,
   },
   {
      partnerId: "allin",
      name: "All In",
      logo: "all-in.svg",
   },
   {
      partnerId: "AYO",
      name: "Alliance for Youth Organizing",
      logo: "alliance-for-youth-organizing.png",
      founding: true,
   },
   {
      partnerId: "alliance-students-at-the-polls",
      name: "Alliance Students at the Polls",
      logo: "alliance-students-at-the-polls.png",
   },
   {
      partnerId: "american-promise",
      name: "American Promise",
      logo: "american-promise.png",
   },
   {
      name: "Bad Robot",
      partnerId: "BadRobot",
      logo: "bad-robot.png",
      logoIsDark: true,
   },
   {
      partnerId: "baltimore-votes",
      name: "Baltimore Votes",
      logo: "baltimore-votes.png",
      logoIsDark: true,
   },
   {
      partnerId: "blockpower",
      name: "Block Power",
      logo: "block-power.png",
   },
   {
      partnerId: "boys-and-girls-clubs",
      vanityUrl: "boys-and-girls-club",
      logo: "boys-and-girls-clubs.png",
      name: "Boys and Girls Clubs of America",
   },
   {
      partnerId: "bbyo",
      name: "BBYO",
      logo: "bbyo.png",
   },
   {
      partnerId: "big-tent-usa",
      name: "Big Tent USA",
      logo: "big-tent-usa.jpeg",
      logoIsDark: true,
   },
   {
      partnerId: "BillieEilish",
      name: "Billie Eilish",
   },
   {
      partnerId: "blk",
      name: "BLK",
   },
   {
      partnerId: "breakout",
      name: "Breakout",
      logo: "breakout.png",
   },
   {
      partnerId: "burton",
      name: "Burton",
      logo: "burton.png",
   },
   {
      partnerId: "campus",
      name: "Campus Compact",
      logo: "campus-compact.png",
   },
   {
      partnerId: "campusvote",
      name: "Campus Vote Project",
      logo: "campus-vote-project.png",
   },
   {
      partnerId: "caa",
      name: "CAA Foundation",
      logo: "caa-foundation.png",
      founding: true,
      logoIsDark: true,
   },
   {
      partnerId: "cbs",
      name: "CBS",
   },
   {
      partnerId: "ComedyCentral",
      vanityUrl: "cc",
      name: "Comedy Central",
      logo: "comedy-central.png",
      founding: true,
   },
   {
      vanityUrl: "civicgeorgia",
      logo: "civi-georgia.png",
      name: "Civic Georgia",
      partnerId: "civic-georgia",
   },
   {
      partnerId: "Civic",
      name: "Civic",
      logo: "civic.png",
   },
   {
      partnerId: "CivicAlliance",
      name: "Civic Alliance",
      logo: "civic-alliance.png",
      founding: true,
   },
   {
      partnerId: "civil-review-board",
      name: "Civil Review Board",
      logo: "civil-review-board.jpg",
      logoIsDark: true,
   },
   {
      partnerId: "CrookedMedia",
      name: "Crooked Media",
      logo: "vsa.png",
   },
   {
      partnerId: "defendourfuture",
      name: "Defend Our Future",
      logo: "defend-our-future.png",
   },
   {
      partnerId: "evc",
      logo: "every-vote-counts.png",
      name: "Every Vote Counts",
   },
   {
      name: "Expedia",
      partnerId: "expedia",
      vanityUrl: "expediagroupvotes2020",
   },
   {
      partnerId: "FairElections",
      logo: "fair-elections-center.png",
      name: "Fair Elections Center",
      founding: true,
   },
   {
      partnerId: "feministmajority",
      logo: "feminist-majority-foundation.png",
      name: "Feminist Majority Foundation",
      logoIsDark: true,
   },
   {
      partnerId: "fl",
      name: "Florida",
   },
   {
      partnerId: "global-black-caucus",
      name: "Global Black Caucus",
      logo: "global-black-caucus.jpg",
      logoIsDark: true,
   },
   {
      partnerId: "HeadCount",
      name: "HeadCount",
      logo: "head-count.png",
      logoIsDark: true,
   },
   {
      partnerId: "impactual",
      name: "Impactual",
      logo: "impactual.png",
      logoIsDark: true,
   },
   {
      partnerId: "jolt",
      name: "Jolt Action",
      logo: "jolt.png",
      logoIsDark: true,
   },
   {
      partnerId: "leadershipnow",
      name: "Leadership Now Project",
      logo: "leadership-now-project.png",
      logoIsDark: true,
   },
   {
      partnerId: "leadmn",
      name: "Lead MN",
      logo: "lead-mn.jpg",
      logoIsDark: true,
   },
   {
      partnerId: "levis",
      logo: "levi-strauss.png",
      name: "Levi's",
      founding: true,
   },
   {
      partnerId: "mtv",
      logo: "mtv.png",
      name: "MTV",
      founding: true,
   },
   {
      partnerId: "miami-dade-college",
      name: "Miami Dade College",
      logo: "miami-dade-college.jpg",
      logoIsDark: true,
   },
   {
      partnerId: "NDRN",
      logo: "nrdn.png",
      name: "National Disability Rights Network",
      founding: true,
   },
   {
      partnerId: "mcn",
      name: "Master Clinician Network",
      logo: "mcn.png",
      logoIsDark: true,
   },
   {
      partnerId: "mitzvote",
      name: "Mitz Vote",
      logo: "mitz-vote.png",
      logoIsDark: true,
   },
   {
      partnerId: "mweg",
      name: "Mormon Women For Ethical Government",
      logo: "mweg.svg",
      logoIsDark: true,
   },
   {
      partnerId: "national-coalition-for-accessible-voting",
      name: "National College for Accessible Voting",
      logo: "national-coalition-for-accessible-voting.png",
      logoIsDark: true,
   },
   {
      partnerId: "NACDD",
      name: "National Association of Councils on Developmental Disabilities",
      logo: "nacdd.png",
      logoIsDark: true,
   },
   {
      partnerId: "ncbcp",
      name: "National Coalition On Black Civic Participation",
      logo: "ncbcp.png",
      logoIsDark: true,
   },
   {
      partnerId: "microsoft",
      name: "Microsoft",
      logo: "microsoft.png",
      logoIsDark: true,
   },
   {
      partnerId: "MicrosoftInt",
      name: "Microsoft",
   },
   {
      partnerId: "labor-nea",
      vanityUrl: "nea",
      name: "NEA",
      optUserOutOfChase: true,
   },
   {
      partnerId: "omg-wtf",
      name: "OMG WTF",
      logo: "omg-wtf.png",
   },
   {
      partnerId: "NARAL",
      name: "NARAL Pro-Choice America",
      logo: "naral.png",
   },
   {
      partnerId: "nh",
      name: "New Hampshire",
   },
   {
      partnerId: "patagonia",
      logo: "patagonia.png",
      name: "Patagonia",
      founding: true,
   },
   {
      partnerId: "Pizza",
      logo: "pizza-to-the-polls.png",
      name: "Pizza to the Polls",
      founding: true,
   },
   {
      partnerId: "publicwise",
      logo: "public-wise.png",
      name: "Public Wise",
   },
   {
      partnerId: "repairtheworld",
      logo: "repair-the-world.png",
      name: "Repair The World",
   },
   {
      partnerId: "represent-us",
      name: "Represent US",
      logo: "represent-us.png",
   },
   {
      partnerId: "Salesforce",
      name: "Salesforce",
      logo: "salesforce.png",
   },
   {
      partnerId: "scholars-strategy-network",
      name: "Scholars Strategy Network",
      logo: "scholars-strategy-network.png",
      logoIsDark: true,
   },
   {
      partnerId: "labor-seiu",
      vanityUrl: "seiu",
      name: "SEUI",
      optUserOutOfChase: true,
   },
   {
      partnerId: "SLSV",
      logo: "slsv.png",
      name: "Students Learn Students Vote",
      founding: true,
   },
   {
      partnerId: "socially-driven-music",
      name: "Socially Driven Music",
      logo: "socially-driven-music.png",
   },
   {
      partnerId: "starbucks",
      name: "Starbucks",
   },
   {
      partnerId: "SUA",
      name: "Stand Up America",
      logo: "sua.png",
   },
   {
      partnerId: "sva",
      name: "Student Veterans of America",
      logo: "sva.png",
   },
   {
      partnerId: "texas-lbj-school",
      name: "Texas LBJ School",
      logo: "texas-lbj-school.png",
      logoIsDark: true,
   },
   {
      partnerId: "TheDailyShow",
      vanityUrl: "tds",
      name: "The Daily Show",
   },
   {
      partnerId: "skimm",
      vanityUrl: "theSkimm",
      logo: "the-skimm.png",
      name: "theSkimm",
   },
   {
      name: "Spiro",
      partnerId: "Spiro",
      logo: "spiro.jpg",
      logoIsDark: true,
   },
   {
      name: "Starbucks",
      partnerId: "starbucks",
      logo: "starbucks.png",
      logoIsDark: true,
   },
   {
      partnerId: "TimeToVote",
      logo: "time-to-vote.png",
      name: "Time to Vote",
      founding: true,
   },
   {
      name: "Twitter",
      logo: "twitter.png",
      logoIsDark: true,
      partnerId: "Twitter",
   },
   {
      partnerId: "town-hall-project",
      name: "Town Hall Project",
      logo: "town-hall-project.png",
   },
   {
      partnerId: "Uber",
      logo: "uber.png",
      name: "Uber",
      founding: true,
   },
   {
      partnerId: "UFCW",
      name: "United Food & Commercial Workers Intl Union",
      logo: "",
   },
   {
      partnerId: "UnitedWay",
      logo: "unitedway.png",
      name: "United Way",
      founding: true,
   },
   {
      partnerId: "UniteHere",
      logo: "unite-here.png",
      name: "Unite Here!",
   },
   {
      partnerId: "ViacomCBS",
      name: "ViacomCBS",
   },
   {
      partnerId: "Vote411",
      name: "Vote411",
      logo: "vote-411.png",
   },
   {
      name: "Warby Parker",
      partnerId: "warbyparker",
      logo: "warby-parker.png",
   },
   {
      partnerId: "WeCanVote",
      logo: "wecanvote.png",
      name: "We Can Vote",
      founding: true,
   },
   {
      partnerId: "weslayan-engaged",
      name: "Weslayan Engaged",
      logo: "weslayan-engaged.jpg",
      logoIsDark: true,
   },
   {
      partnerId: "when-we-all-vote",
      logo: "when-we-all-vote.png",
      name: "When We All Vote",
   },
   {
      partnerId: "wi",
      name: "Wisconsin",
   },
   {
      partnerId: "work-elections",
      name: "Work Elections",
   },
   {
      partnerId: "YMCA",
      name: "YMCA",
      logo: "ymca.png",
   },
];
export default data;
