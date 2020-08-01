/**
 * Ordered list of questions and answers for ptp-faq.tsx, see also app-root.tsx
 */
const data: { question: string, answer: string }[] = [
   {
      question: "What do poll workers do?",
      answer: `
      There are many kinds of jobs for poll workers to do, including helping voters maintain physical
      distance in lines, wiping down machines and equipment, and helping voters check in, understand
      their ballots, and cast their vote. With absentee and mail voting, poll workers also help open
      and count mailed ballots.
      `,
   },
   {
      question: "Are poll workers paid?",
      answer: `
      Poll worker pay varies by location. In most cases, you will be paid with a check for a day’s worth
      of work. In some cases, poll working may be voluntary and not paid.
      `,
   },
   {
      question: "Can anyone be a poll worker?",
      answer: `
      Qualifications vary by jurisdiction. Many states require poll workers to be registered to vote in
      the state or their local jurisdiction. In some cases, younger people who aren’t yet eligible to
      vote can also serve as poll workers.
      `,
   },
   {
      question: "What if I can only serve for part of a day?",
      answer: `
      You should still sign up and let your election officials know about your availability.
      `,
   },
   {
      question: "If I’m working the polls, when do I vote?",
      answer: `
      Poll workers usually cast their votes early or by mail, but some cast their votes on Election Day.
      Certain jurisdictions may require poll workers to vote early or via absentee ballot. Please contact
      your local elections official for details about how poll workers cast their ballots.
      `,
   },
   {
      question: "Can I take the day off to work the polls?",
      answer: `
      In many states, companies must give workers time off to vote by law, and some companies are creating
      or extending policies to allow time off for poll working. Ask your employer and encourage colleagues
      to join you.
      `,
   },
   {
      question: "Does it matter if I’m a Democrat, Republican or Independent?",
      answer: `
      Poll working is usually a non-partisan activity and your party affiliation does not matter, but in
      some states poll workers are matched to locations in pairs based on their party registration.
      Applications in some jurisdictions may ask you for party registration information.
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
