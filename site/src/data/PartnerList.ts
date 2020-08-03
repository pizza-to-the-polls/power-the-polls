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
}

const data: Partner[] = [
   {
      id: "acs",
      logo: "acs.png",
      name: "American Constitution Society",
      source: "american-constitution-society",
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
      optUserOutOfChase: true,
   },
   {
      id: "aft",
      name: "AFT",
      source: "labor-aft",
      optUserOutOfChase: true,
   },
   {
      id: "AYO",
      name: "Alliance for Youth Organizing",
      logo: "alliance-for-youth-organizing.png",
      founding: true,
   },
   {
      id: "american-promise",
      name: "American Promise",
      logo: "american-promise.png",
   },
   {
      id: "boys-and-girls-club",
      logo: "boys-and-girls-clubs.png",
      name: "Boys and Girls Clubs of America",
      source: "boys-and-girls-clubs",
   },
   {
      id: "campus",
      name: "Campus Compact",
      logo: "campus-compact.png",

   },
   {
      id: "cbs",
      name: "CBS",
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
      id: "cc",
      name: "Comedy Central",
      logo: "comedy-central.png",
      source: "ComedyCentral",
      founding: true,
   },
   {
      id: "evc",
      logo: "every-vote-counts.png",
      name: "Every Vote Counts",
   },
   {
      id: "CrookedMedia",
      name: "Crooked Media",
      logo: "VSA_logo.png",
   },
   {
      id: "fairelections",
      logo: "fair-elections-center.png",
      name: "Fair Elections Center",
      source: "FairElections",
      founding: true,
   },
   {
      id: "fl",
      name: "Florida",
   },
   {
      id: "headcount",
      name: "HeadCount",
      logo: "HeadCount.png",
      source: "HeadCount",
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
      id: "AAAAAAAAAAAA",
      logo: "nrdn.png",
      name: "National Disability Rights Network",
      source: "NDRN",
      founding: true,
   },
   {
      id: "nea",
      name: "NEA",
      source: "labor-nea",
      optUserOutOfChase: true,
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
      id: "starbucks",
      name: "Starbucks",
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
      id: "wecanvote",
      logo: "wecanvote.png",
      name: "We Can Vote",
      source: "WeCanVote",
      founding: true,
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
];
export default data;
