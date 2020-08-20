/**
 * Ordered list of questions and answers for page-faq.tsx, see also app-root.tsx
 */
const data: { question: string, answer: string }[] = [
   {
      question: "Can anyone be a poll worker?",
      answer: `
      Qualifications vary by jurisdiction. Many states require poll workers to be registered to vote in
      the state or their local jurisdiction. In some cases, younger people who aren’t yet eligible to
      vote can also serve as poll workers.
      `,
   },
   {
      question: "I’m not a U.S. citizen / I’m a permanent resident. Can I serve as a poll worker?",
      answer: `
      In most states you cannot work the polls unless you are a registered voter and citizen. The best
      place to find guidance is with your local administrator, which you can search for by entering your
      information on our site.
      `,
   },
   {
      question: "Are poll workers paid?",
      answer: `
      Local jurisdictions will often pay poll workers a stipend for their
      participation.  In most cases, you will be paid with a check for a day’s
      worth of work. In some cases, poll working may be voluntary and not paid.
      `,
   },
   {
      question: "What do poll workers do?",
      answer: `
      There are many kinds of jobs for poll workers to do, including helping
      voters maintain physical distance in lines, wiping down machines and
      equipment, and helping voters check in, understand their ballots, and
      cast their vote. With absentee and mail voting, poll workers also help
      open and count mailed ballots.
      `,
   },
   {
      question: "Do poll workers need training?",
      answer: `
      Local jurisdictions will often have mandatory trainings, and provide poll
      workers with all the necessary information and skills they need prior to
      Election Day.
      `,
   },
   {
      question: "Will poll workers be provided personal protective equipment (i.e. masks, gloves, etc.)?",
      answer: `
      Power the Polls is working with local organizations and partners to help
      election officials provide PPE. If you have specific concerns about what
      PPE will be provided in your jurisdiction, please reach out to your local
      officials for more information. Contact information can be found at
      workelections.com.
      `,
   },
   {
      question: "What if I can only serve for part of a day?",
      answer: `
      Some jurisdictions allow workers to sign up for shifts, while others
      require you to work all of Election Day. However, you should still sign
      up and let your election officials know about your availability.
      `,
   },
   {
      question: "If I’m working the polls, when do I vote?",
      answer: `
      Poll workers usually cast their votes early or by mail, but some cast their votes
      on Election Day. Certain jurisdictions may require poll workers to vote
      early or via absentee ballot. Please contact your local elections official
      for details about how poll workers cast their ballots.
      `,
   },
   {
      question: "Does it matter if I’m a Republican, Democrat, or Independent?",
      answer: `
      Poll working is usually a non-partisan activity and your party affiliation
      does not matter, but in some states poll workers are matched to locations
      in pairs based on their party registration. Applications in some
      jurisdictions may ask you for party registration information.
      `,
   },
   {
      question: "Can I travel to a new location and work the polls in a jurisdiction where I'm not registered to vote?",
      answer: `
      Regulations vary across the country and some jurisdictions allow
      individuals to travel and work the polls even if they are not registered
      to vote in that location. Workelections.com has more information for each
      jurisdiction. However, we encourage individuals to sign up to work locally.
      `,
   },
   {
      question: "I’m an experienced poll worker, but I’m not comfortable serving this year due to COVID. How can I help?",
      answer: `
      You might be able to help virtually, but the most important thing you can do is recruit someone to
      replace you this year to help keep polling locations open.
      `,
   },
];
export default data;
