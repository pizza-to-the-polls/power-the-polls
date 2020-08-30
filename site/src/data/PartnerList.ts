export interface Partner {
   /**
    * The key to use for thie source in ActionKit and for a vanity URL `https://powerthepolls.org/{partnerId}`
    * for the partner which will include their partnerID when the form is submitted
    */
   readonly partnerId: string;

   /**
    * Optional additional vanity URLs that will resolve to this partner.
    * Note that `partnerId` will itself always be a valid URL (`https://powerthepolls.org/{partnerId}`),
    * so this is only needed if there are alternative URLs desired.
    */
   readonly additionalVanityUrls?: string[];

   /**
    * The full name of this partner.
    */
   readonly name: string;

   /**
    * A logo for partners that should be displayed on the `/partners` page (page-partners.tsx). Images are sourced
    * from `/site/public/assets/images/partners/*`). If no logo is provided, the partner will no appear on the
    * Partners page.
    */
   readonly logo?: string;

   /**
    * If `true`, when users sign up using the form and this `partnerId` the `chase` flag will be set to false.
    */
   readonly optUserOutOfChase?: boolean;

   /**
    * If `true` this partner is a Founding Partner
    */
   readonly isFoundingPartner?: boolean;

   /**
    * The label for an additional field to be displayed on the signup form. If not provided, no additional field
    * will be displayed.
    */
   readonly customSignupFormField?: string;

   /**
    * Whether to include the partner `logo` on the landing page of the partner's vanity URL (either
    * `https://powerthepolls.org/{partnerId}` or `https://powerthepolls.org/{vanityUrls}`).
    */
   readonly logoAppearsOnLandingPage?: boolean;

   /**
    * If true, the `logo`, when displayed, will receive a white background. If the logo is already on a white background
    * then set this to `true` so that the corners will be rounded.
    */
   readonly logoIsDark?: boolean;

   /**
    * Optional case (typically for certain more partisan partners) that we want to exclude from the public Partner List page
    * despite them having a `logo` assigned.
    */
   readonly excludeFromPartnerList?: boolean;
}

/**
 * If a partner is not in this list, they can only have their partner ID added as the source using the `source` querystring parameter
 * (e.g.: `https://powerthepolls.org?source=foobar-baz`)
 */
const data: Partner[] = [
   {
      partnerId: "911day",
      name: "9/11 Day",
      logo: "911-day.png",
      logoIsDark: true,
   },
   {
      partnerId: "AALDEF",
      name: "Asian American Legal Defense and Education Fund",
      logo: "aaldef.png",
   },
   {
      partnerId: "AARP",
      name: "AARP",
      logoAppearsOnLandingPage: true,
      logo: "aarp.png",
   },
   {
      name: "AMC Theaters",
      partnerId: "amctheaters",
      logo: "amc-theaters.png",
   },
   {
      partnerId: "american-constitution-society",
      additionalVanityUrls: ["acs"],
      name: "American Constitution Society",
      logo: "acs.png",
   },
   {
      partnerId: "AmericorpsAlumni",
      name: "AmericorpsAlumni",
      logo: "americorps-alumni.jpg",
      logoAppearsOnLandingPage: true,
      logoIsDark: true,
   },
   {
      partnerId: "ACLUGeorgia",
      name: "ACLU Georgia",
      additionalVanityUrls: ["acluga"],
   },
   {
      partnerId: "ACLUMI",
      name: "ACLU Michigan",
   },
   {
      partnerId: "actionbutton",
      name: "Action Button",
      logo: "action-button.png",
   },
   {
      partnerId: "labor-aflcio",
      additionalVanityUrls: ["aflcio"],
      name: "AFL-CIO",
      optUserOutOfChase: true,
      customSignupFormField: "Union Name",
      logo: "aflcio.svg",
      logoAppearsOnLandingPage: true,
   },
   {
      partnerId: "labor-afscme",
      additionalVanityUrls: ["afscme"],
      name: "AFSCME",
      logo: "afscme.png",
      optUserOutOfChase: true,
      logoAppearsOnLandingPage: true,
   },
   {
      partnerId: "labor-aft",
      additionalVanityUrls: ["aft"],
      name: "AFT",
      optUserOutOfChase: true,
   },
   {
      partnerId: "allin",
      name: "All In",
      logo: "all-in.svg",
   },
   {
      partnerId: "AlphaPhiAlpha",
      name: "Alpha Phi Alpha Fraternity, Inc (ΑΦΑ)",
      logo: "alpha-phi-alpha.png",
      logoIsDark: true,
   },
   {
      partnerId: "AVIL",
      name: "All Voting Is Local",
      logo: "avil.svg",
   },
   {
      partnerId: "LeadershipConferece",
      name: "All Voting Is Local Leadership Conference",
      logo: "avil-lc.png",
   },
   {
      partnerId: "AYO",
      name: "Alliance for Youth Organizing",
      logo: "alliance-for-youth-organizing.png",
      isFoundingPartner: true,
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
      name: "The Andrew Goodman Foundation",
      partnerId: "AndrewGoodmanFoundation",
      logo: "andrew-goodman-foundation.png",
      logoIsDark: true,
   },
   {
      name: "Anonymous Content",
      partnerId: "anonymouscontent",
      logo: "anonymous-content.png",
   },
   {
      name: "App Dynamics",
      partnerId: "appdynamics",
      logo: "app-dynamics.png",
   },
   {
      name: "Arizona",
      partnerId: "azadvocacy",
   },
   {
      partnerId: "ASAP",
      name: "Alliance of Students at the Polls",
   },
   {
      partnerId: "ASIV",
      name: "ASIV",
      logo: "asiv.jpg",
      logoIsDark: true,
   },
   {
      partnerId: "APBCO",
      name: "Association of Pro Bono Counsel",
      customSignupFormField: "Are You a Lawyer?",
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
      partnerId: "blueapron",
      name: "Blue Apron",
      logo: "blue-apron.png",
      logoIsDark: true,
   },
   {
      partnerId: "bluecrossandblueshieldminnesota",
      name: "BlueCross and BlueShield of Minnesota",
      logo: "blue-cross-and-blue-shield-minnesota.jpg",
      logoIsDark: true,
   },
   {
      partnerId: "boys-and-girls-clubs",
      name: "Boys and Girls Clubs of America",
      logo: "boys-and-girls-clubs.png",
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
   },
   {
      partnerId: "BillieEilish",
      name: "Billie Eilish",
   },
   {
      name: "Bird + Stone",
      logo: "bird-stone.png",
      partnerId: "birdstone",
   },
   {
      partnerId: "blk",
      name: "BLK",
      logo: "blk.png",
   },
   {
      partnerId: "BAC",
      name: "Black Advancement Coalition",
      logo: "bac.png",
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
      partnerId: "CamelsVote",
      name: "CamelsVote",
      logo: "camels-vote.png",
      logoIsDark: true,
   },
   {
      name: "Campbell Ewald",
      partnerId: "campbellewald",
      logo: "campbell-ewald.png",
   },
   {
      partnerId: "campus",
      name: "Campus Compact",
      logo: "campus-compact.png",
   },
   {
      partnerId: "campusvote",
      name: "Campus Vote Project",
      additionalVanityUrls: ["CVP", "CVPE", "CVPM", "CVPS"],
      logo: "campus-vote-project.png",
   },
   {
      partnerId: "caa",
      name: "CAA Foundation",
      logo: "caa-foundation.png",
      isFoundingPartner: true,
      logoIsDark: true,
   },
   {
      name: "Compass Coffee",
      partnerId: "compasscoffee",
      logo: "compass-coffee.png",
      logoIsDark: true,
   },
   {
      name: "Crossover Collective",
      partnerId: "crossovercollective",
      logo: "crossover-collective.png",
   },
   {
      partnerId: "cbs",
      name: "CBS",
   },
   {
      partnerId: "CollectiveImpact",
      additionalVanityUrls: ["2020", "hero", "now"],
      name: "Collective Impact",
   },
   {
      name: "The Change Agentcy",
      partnerId: "thechangeagentcy",
      logo: "the-change-agentcy.png",
   },
   {
      name: "Color Farm Media",
      partnerId: "colorfarmmedia",
      logo: "color-farm-media.png",
      logoIsDark: true,
   },
   {
      partnerId: "ComedyCentral",
      additionalVanityUrls: ["cc"],
      name: "Comedy Central",
      logo: "comedy-central.png",
      isFoundingPartner: true,
   },
   {
      partnerId: "civic-georgia",
      additionalVanityUrls: ["civicgeorgia"],
      logo: "civi-georgia.png",
      name: "Civic Georgia",
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
      isFoundingPartner: true,
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
      partnerId: "DemLabs",
      name: "DemLabs",
      logo: "demlabs.png",
      logoAppearsOnLandingPage: true,
   },
   {
      name: "Democracy Maine",
      partnerId: "DemocracyMaine",
   },
   {
      name: "Democracy North Carolina",
      partnerId: "DemocracyNC",
   },
   {
      partnerId: "defendourfuture",
      name: "Defend Our Future",
      logo: "defend-our-future.png",
   },
   {
      partnerId: "discovery",
      name: "Discovery Inc.",
      logo: "discovery.png",
      logoIsDark: true,
   },
   {
      partnerId: "evc",
      logo: "every-vote-counts.png",
      name: "Every Vote Counts",
   },
   {
      partnerId: "expediagroup",
      additionalVanityUrls: ["expediagroupvotes2020"],
      name: "Expedia",
      logo: "expedia-group.png",
   },
   {
      partnerId: "FairElections",
      logo: "fair-elections-center.png",
      name: "Fair Elections Center",
      isFoundingPartner: true,
   },
   {
      partnerId: "fairfight",
      name: "Fair Fight",
      logo: "fairfight.png",
      logoAppearsOnLandingPage: true,
      excludeFromPartnerList: true,
   },
   {
      partnerId: "feministmajority",
      logo: "feminist-majority-foundation.png",
      name: "Feminist Majority Foundation",
      logoIsDark: true,
   },
   {
      partnerId: "fenwick",
      name: "Fenwick & West",
      logo: "fenwick.png",
      logoIsDark: true,
   },
   {
      name: "Ferrara",
      partnerId: "ferrara",
      logo: "ferrara.png",
   },
   {
      partnerId: "floridavoices",
      name: "Florida Voices",
   },
   {
      partnerId: "floridavotes",
      name: "Florida Votes",
   },
   {
      name: "General Assembly",
      partnerId: "generalassembly",
      logo: "general-assembly.png",
      logoIsDark: true,
   },
   {
      name: "GitHub",
      logo: "github.png",
      partnerId: "github.png",
   },
   {
      partnerId: "global-black-caucus",
      name: "Global Black Caucus",
      logo: "global-black-caucus.jpg",
      logoIsDark: true,
   },
   {
      name: "Good Fear Content",
      partnerId: "goodfearcontent",
      logo: "good-fear-content.svg",
   },
   {
      name: "Harry's",
      partnerId: "harrys",
      logo: "harrys.jpg",
      logoIsDark: true,
   },
   {
      partnerId: "HeadCount",
      name: "HeadCount",
      logo: "head-count.png",
      logoIsDark: true,
   },
   {
      name: "Human Rights Campaign Foundation",
      logo: "hrc.png",
      logoAppearsOnLandingPage: true,
      excludeFromPartnerList: true,
      additionalVanityUrls: ["HRCFoundation"],
      partnerId: "HRC",
      logoIsDark: true,
   },
   {
      name: "iCitizen",
      partnerId: "icitizen",
      logo: "icitizen.jpg",
      logoIsDark: true,
   },
   {
      partnerId: "invision",
      name: "InVision",
      logo: "invision.jpg",
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
   },
   {
      partnerId: "LCV",
      name: "League of Conservation Voters",
      logo: "lcv.jpg",
      logoIsDark: true,
      logoAppearsOnLandingPage: true,
      excludeFromPartnerList: true,
   },
   {
      partnerId: "LCVEF",
      name: "League of Conservation Voters Education Fund",
   },
   {
      partnerId: "LCVMI",
      name: "League of Conservation Voters Michigan",
   },
   {
      name: "League of United Latin American Citizens",
      partnerId: "LULAC",
   },
   {
      name: "LinkedIn",
      partnerId: "linkedin",
      logo: "linkedin.png",
      logoIsDark: true,
   },
   {
      name: "Verizon Media",
      partnerId: "verizonmedia",
      logo: "verizon-media.png",
      logoIsDark: true,
   },
   {
      partnerId: "Vote411",
      name: "League of Women Voters",
      logo: "lwv.jpg",
      logoIsDark: true,
   },
   {
      name: "League of Women Voters Maine",
      partnerId: "LVWME",
   },
   {
      partnerId: "levis",
      logo: "levi-strauss.png",
      name: "Levi's",
      isFoundingPartner: true,
   },
   {
      name: "Lime",
      partnerId: "lime",
      logo: "lime.png",
   },
   {
      name: "Litify",
      partnerId: "litify",
      logo: "litify.jpeg",
      logoIsDark: true,
   },
   {
      name: "Lyft",
      partnerId: "lyft",
      logo: "lyft.png",
      logoIsDark: true,
   },
   {
      partnerId: "mainevoices",
      name: "Maine Voices",
   },
   {
      partnerId: "miami-dade-college",
      name: "Miami Dade College",
      logo: "miami-dade-college.jpg",
      logoIsDark: true,
   },
   {
      partnerId: "mcn",
      name: "Master Clinician Network",
      logo: "mcn.png",
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
      partnerId: "mitzvote",
      name: "Mitz Vote",
      logo: "mitz-vote.png",
      logoIsDark: true,
   },
   {
      partnerId: "Motivote",
      name: "Motivote",
      logo: "motivote.png",
   },
   {
      partnerId: "SEARAC",
      name: "Southeast Asia Resource Action Center",
      logo: "searac.png",
      logoAppearsOnLandingPage: true,
   },
   {
      partnerId: "mtv",
      logo: "mtv.png",
      name: "MTV",
      isFoundingPartner: true,
   },
   {
      partnerId: "mweg",
      name: "Mormon Women For Ethical Government",
      logo: "mweg.svg",
      logoIsDark: true,
   },
   {
      partnerId: "NAACP",
      name: "NAACP",
      logo: "naacp.png",
      logoAppearsOnLandingPage: true,
   },
   {
      partnerId: "ncjw",
      name: "National Council of Jewish Women",
      logo: "ncjw.jpg",
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
      partnerId: "NDRN",
      logo: "nrdn.png",
      name: "National Disability Rights Network",
      isFoundingPartner: true,
   },
   {
      partnerId: "ncbcp",
      name: "National Coalition On Black Civic Participation",
      logo: "ncbcp.png",
      logoIsDark: true,
   },
   {
      partnerId: "NRDCA",
      additionalVanityUrls: ["nrdcactionfund"],
      name: "Natural Resources Defense Council",
      logo: "nrdc.jpg",
      logoIsDark: true,
      logoAppearsOnLandingPage: true,
   },
   {
      partnerId: "labor-nea",
      additionalVanityUrls: ["nea"],
      name: "NEA",
      optUserOutOfChase: true,
   },
   {
      name: "Neu",
      partnerId: "neu",
      logo: "neu.png",
      logoIsDark: true,
   },
   {
      name: "Nevada",
      partnerId: "silverstatevoices",
   },
   {
      name: "Nucleus",
      partnerId: "nucleus",
      logo: "nucleus.png",
      logoIsDark: true,
   },
   {
      partnerId: "nuifc",
      name: "National Urban Indian Family Coalition",
      logo: "nuifc.png",
      logoIsDark: true,
   },
   {
      name: "Old Navy",
      logo: "old-navy.png",
      partnerId: "oldnavy",
      logoIsDark: true,
      logoAppearsOnLandingPage: true,
   },
   {
      name: "Old Navy Fam",
      logo: "old-navy.png",
      partnerId: "oldnavyfam",
      logoIsDark: true,
      logoAppearsOnLandingPage: true,
      excludeFromPartnerList: true,
   },
   {
      partnerId: "omg-wtf",
      name: "OMG WTF",
      logo: "omg-wtf.png",
   },
   {
      partnerId: "otherwiseincorporated",
      name: "Otherwise Incorporated",
      logo: "otherwise-incorporated.png",
   },
   {
      partnerId: "NARAL",
      name: "NARAL Pro-Choice America",
      logo: "naral.png",
      logoIsDark: true,
      logoAppearsOnLandingPage: true,
      excludeFromPartnerList: true,
   },
   {
      partnerId: "ncai",
      name: "National Congress of American Indians",
      logo: "ncai.png",
      logoIsDark: true,
   },
   {
      partnerId: "nhvotes",
      name: "New Hampshire",
   },
   {
      name: "PagerDuty",
      partnerId: "pagerduty",
      logo: "pagerduty.svg",
   },
   {
      partnerId: "patagonia",
      logo: "patagonia.png",
      name: "Patagonia",
      isFoundingPartner: true,
   },
   {
      name: "PayPal",
      partnerId: "paypal",
      logo: "paypal.png",
   },
   {
      partnerId: "Pizza",
      logo: "pizza-to-the-polls.png",
      name: "Pizza to the Polls",
      isFoundingPartner: true,
   },
   {
      partnerId: "PWP",
      name: "The Poll Workers Project",
   },
   {
      partnerId: "PublicCitizen",
      name: "Public Citizen MOU",
   },
   {
      name: "Pro Georgia",
      partnerId: "ProGeorgia",
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
      name: "Reddit",
      partnerId: "reddit",
      logo: "reddit.png",
   },
   {
      name: "Richer Poorer",
      partnerId: "richerpoorer",
      logo: "richer-poorer.png",
      logoIsDark: true,
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
      additionalVanityUrls: ["seiu"],
      name: "SEIU",
      optUserOutOfChase: true,
      logo: "seiu.jpg",
      logoAppearsOnLandingPage: true,
   },
   {
      partnerId: "SLSV",
      logo: "slsv.png",
      name: "Students Learn Students Vote",
      isFoundingPartner: true,
   },
   {
      partnerId: "socially-driven-music",
      additionalVanityUrls: ["SociallyDrivenMusic"],
      name: "Socially Driven Music",
      logo: "socially-driven-music.png",
      customSignupFormField: "Name of Local Artist that Referred You",
   },
   {
      partnerId: "SocialGoodClub",
      name: "ocial Good Club",
      logo: "social-good-club.png",
   },
   {
      name: "Solve",
      partnerId: "solve",
      logo: "solve.png",
      logoIsDark: true,
   },
   {
      partnerId: "StandUpAmerica",
      name: "Stand Up America",
      logo: "sua.png",
   },
   {
      partnerId: "sva",
      name: "Student Veterans of America",
      logo: "sva.png",
   },
   {
      partnerId: "skimm",
      additionalVanityUrls: ["theSkimm"],
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
      partnerId: "SpreadTheVote",
      name: "Spread the Vote",
      logo: "spread-the-vote.png",
   },
   {
      partnerId: "starbucks",
      name: "Starbucks",
      logo: "starbucks.jpg",
      logoIsDark: true,
   },
   {
      partnerId: "texas-lbj-school",
      name: "Texas LBJ School",
      logo: "texas-lbj-school.png",
      logoIsDark: true,
   },
   {
      partnerId: "TheDailyShow",
      additionalVanityUrls: ["tds"],
      name: "The Daily Show",
   },
   {
      partnerId: "TheFlow",
      name: "The Flow",
      logo: "the-flow.png",
      logoIsDark: true,
   },
   {
      name: "The Vote Project",
      partnerId: "thevoterproject",
   },
   {
      name: "Timber Wolves and Lynx",
      partnerId: "timberwolves",
      logo: "timber-wolves-and-lynx.png",
   },
   {
      partnerId: "TimeToVote",
      logo: "time-to-vote.png",
      name: "Time to Vote",
      isFoundingPartner: true,
   },
   {
      partnerId: "Twitter",
      name: "Twitter",
      logo: "twitter.png",
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
      isFoundingPartner: true,
   },
   {
      partnerId: "UFCW",
      name: "United Food & Commercial Workers Intl Union",
      logo: "ufcw.png",
   },
   {
      partnerId: "USW",
      name: "United Steel Workers",
   },
   {
      partnerId: "UnitedWay",
      logo: "unitedway.png",
      name: "United Way",
      isFoundingPartner: true,
      logoIsDark: true,
   },
   {
      partnerId: "UniteHere",
      logo: "unite-here.png",
      name: "Unite Here!",
   },
   {
      partnerId: "UVA",
      name: "UVA Alumni Association",
      logo: "uvaaa.png",
   },
   {
      partnerId: "ViacomCBS",
      name: "ViacomCBS",
      logo: "viacomcbs.png",
      isFoundingPartner: true,
      logoIsDark: true,
   },
   {
      partnerId: "VPC",
      name: "Voter Protection Corps",
      logo: "vpc.png",
   },
   {
      partnerId: "VAI",
      name: "Veterans for American Ideals",
      logo: "vets-for-american-ideals.jpg",
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
      isFoundingPartner: true,
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
      partnerId: "wivoices",
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
   {
      name: "Zillow",
      partnerId: "zillow",
      logo: "zillow.png",
      logoIsDark: true,
   },
];
export default data;
