import { h } from "@stencil/core";

/**
 * Ordered list of questions and answers for page-faq.tsx, see also app-root.tsx
 */
const data: { sectionTitle: string, questions: { question: string, answer: () => HTMLElement }[]}[] = [
   {
      sectionTitle: "Requirements for being a poll worker",
      questions: [
         {
            question: "What are the requirements for being a poll worker?",
            answer: () => <p>
               Qualifications vary by jurisdictions. Many states require poll workers to be registered to vote in the state or their local jurisdiction.
               In some cases, younger people who aren’t yet eligible to vote can also serve as poll workers.
               You can check the requirements for your jurisdiction <a href="https://www.powerthepolls.org/search">here</a>.
            </p>,
         },
         {
            question: "Can I be a poll worker in a state I don’t live in/am not registered in?",
            answer: () => <p>
               While, some jurisdictions allow individuals to travel and work the polls even if they are not registered to vote in that location, for the most part, individuals are only allowed to serve in the state where they reside.
               </p>,
         },
         {
            question: "I’m not a U.S. citizen / I’m a permanent resident. Can I serve as a poll worker?",
            answer: () => <p>
               In most states you cannot work the polls unless you are a registered voter and citizen. The best place to find guidance is with your local administrator, which you can <a href="https://www.powerthepolls.org/signup#form">search for by entering your information on our site</a>.
            </p>,
         },
         {
            question: "I’m under 18. Can I still help?",
            answer: () => <p>
            Many states allow individuals under 18 to be poll workers, but each state has its own requirements, and this can vary in different cities and counties.
            Some states also have additional requirements for students like permission slips, a certain GPA, etc. The best place to find this information is by <a href="https://www.powerthepolls.org/search">reaching out to your local election administrator</a>.
            </p>,
         },
         {
            question: "Do I have to work the full day, or can I sign up for a shift?",
            answer: () => <div>
                  <p>
                     Some jurisdictions allow workers to sign up for shifts, while others require you to work full days. However, you should still sign up and let your election officials know about your availability. You can <a href="http://www.powerthepolls.com/search">look up the shift requirements in your area here</a>.
                     If your jurisdiction requires a full day of work and you can’t make those hours but still want to help, think about recruiting other people you know to be a poll worker and can serve for the full time needed.
                  </p>
                  <p>If your jurisdiction requires a full day of work and you can’t make those hours but still want to help, think about recruiting other people you know to be a poll worker and can serve for the full time needed.</p>
               </div>,
         },
      ],
   },
   {
      sectionTitle: "Poll worker responsibilities",
      questions: [
         {
            question: "Is a poll worker the same as a poll watcher?",
            answer: () => <p>
               No, poll workers work for election administrators to help administer the election. They do things like check in voters, fix voting machines, and troubleshoot any other issues at polling sites.
               Poll watchers, which are sometimes also known as poll observers and poll monitors, are volunteers or staff from a political party or campaign that are certified to observe and monitor election administration. In most states, only political parties, candidates and ballot issue committees can appoint poll watchers.
               Organizations and civic groups can also appoint poll watchers in some states.
               </p>,
         },
         {
            question: "What do poll workers do?",
            answer: () => <p>
               There are many kinds of jobs for poll workers to do, including helping voters maintain physical distance in lines, wiping down machines and equipment, and helping voters check in, understand their ballots, and cast their vote. With absentee and mail voting, poll workers also help open and count mailed ballots.
               </p>,
         },
         {
            question: "Do poll workers need training?",
            answer: () => <p>
               Local jurisdictions will often have mandatory trainings, and provide poll workers with all the necessary information and skills they need prior to Election Day.
               You can look up information about trainings <a href="http://www.powerthepolls.org/search">here</a> - and if nothing is posted,
               reach out to your election administrator directly to ask when trainings are and how to schedule yourself to attend.
               </p>,
         },
         {
            question: "Does it matter if I’m a Republican, Democrat, or Independent?",
            answer: () => <p>
               Poll working is usually a non-partisan activity and your party affiliation does not matter, but in some states poll workers are matched to locations in pairs based on their party registration.
               This is sometimes done to ensure party balance among poll workers at every polling location. Applications in some jurisdictions may ask you for party registration information. You can <a href="http://www.powerthepolls.org/search">learn more about the requirements in your area here</a>.
               </p>,
         },
      ],
   },
   {
      sectionTitle: "Submitting your application",
      questions: [
         {
            question: "Please sign me up to be a poll worker!",
            answer: () => <p>
               Please be sure you have completed your official application. Enter your information <a href="https://www.powerthepolls.org/signup#form">here</a> to get started on your application.
               </p>,
         },
         {
            question: "Can you mail me an application?",
            answer: () => <p>
               Unfortunately, Power the Polls can’t mail you an application -- but we can connect you with the people who can. You should <a href="https://www.powerthepolls.org/search"> reach out to your local administrators</a> for information on how to proceed.
               </p>,
         },
      ],
   },
   {
      sectionTitle: "After you apply",
      questions: [
         {
            question: "What do I do after I complete my application?",
            answer: () => <p>
               We will be in touch to help you through the process, but also be sure to be on the lookout for any communication from your local election administrators! If you want to reach out to them directly, you can look up their zip code <a href="https://act.powerthepolls.org/signup/application-completed/">here</a>.
               We'll reach out to remind you to check in on trainings, and to provide other helpful resources, but it’s also important to reach out to your administrators directly for more information to move along in the process.
               </p>,
         },
         {
            question: "I already applied. Why do I keep getting emails asking me to apply?",
            answer: () => <p>
               <a href="https://act.powerthepolls.org/signup/application-completed/">Add your name to this form</a> if you have completed your official application to be a poll worker in your jurisdiction. This way, our team will know to stop sending you reminders.
               </p>,
         },
         {
            question: "Do poll workers need training?",
            answer: () => <p>
               Local jurisdictions will often have mandatory trainings, and provide poll workers with all the necessary information and skills they need prior to Election Day.
               </p>,
         },
         {
            question: "When will the training start?",
            answer: () => <div>
                  <p>
                     If you've already <a href="https://www.powerthepolls.org/signup#form">applied</a>, you can check in to see if your local administrator has posted new training information.
                     Enter your zip code <a href="http://www.powerthepolls.org/search">here</a> to look up poll worker trainings in your community. In some places, there are online trainings you can start immediately.
                  </p>
                  <p>If there is no information about trainings online, reach out to your election administrator directly to ask when trainings are and how to schedule yourself to attend.</p>
               </div>,
         },
         {
            question: "I applied, but I haven’t heard back from my local city or county!",
            answer: () => <p>
               While there is a great need for poll workers right now, many election administrators do not reach out to poll worker applicants until closer to Election Day. This year, election administrators may be even farther behind schedule as they are also overwhelmed with many of the other areas of election administration that have been made more complicated due to the pandemic. You likely will not hear back immediately from your local office, but we expect you'll hear from them soon and we'll keep sending updates to you as well. We encourage you to complete any of the required training and to keep up with us as we share more information.
               </p>,
         },
         {
            question: "What’s the deadline to apply/for recruitment?",
            answer: () => <div>
                  <p>
                     Most election administrators accept applications on a rolling basis, so we do not have a set deadline nationwide or even state-by-state. However, we would like to recruit as many poll workers as possible by the end of September so they are first in line for trainings and placement.
                  </p>
                  <p>
                     In most jurisdictions, administrators do require that poll workers complete training sessions which are scheduled between September and October (there is lots of variation among jurisdictions),
                     so applying as early as possible is important. Furthermore, administrators make decisions about the number of polling locations they plan to open based on the number of poll workers they have, so getting applications in as early as possible is important to help administrators in their planning.
                  </p>
                  <p>
                     If you’re ready to get started, please begin your signup process <a href="https://www.powerthepolls.org/signup#form">here</a>.
                  </p>
               </div>,
         },
         {
            question: "My elections administrator told me I wasn’t needed.",
            answer: () => <div>
                  <p>With so many complications around how elections will be administered this year, some administrators are having difficulty identifying areas of need.
                     In many of the primary elections that have taken place since the start of the pandemic, we’ve seen that election administrators don’t identify a major gap until the final weeks before the Election.</p>
                  <p>So while you may not have been picked today, it’s possible that election administrators will be sending out a call for poll workers in your area as we get closer to November.
                     Ask if you can be put on a waitlist to fill in if someone else is not able to make it. We encourage you to complete any of the required training so you’re ready to go to meet that call.</p>
               </div>,
         },
         {
            question: "I need to withdraw my application. How can I still help?",
            answer: () => <p>
                  We completely understand that plans change. If you can no longer be a poll worker, one of the most important things you can do is recruit people to replace you this year to help keep polling locations open!
               </p>,
         },
      ],
   },
   {
      sectionTitle: "Compensation and safety",
      questions: [
         {
            question: "Are poll workers paid?",
            answer: () =>
            <p>
               Local jurisdictions will often pay poll workers a stipend for their participation. In most cases, you will be paid with a check for a day’s worth of work. In some cases, poll working may be voluntary and not paid. You can find out more about pay in your jurisdiction <a href="http://www.powerthepolls.org/search">here</a>.
            </p>,
         },
         {
            question: "I’m concerned about my safety. What precautions are being taken to protect poll workers?",
            answer: () => <p>
               Power the Polls is working with local organizations and partners to help election officials provide PPE. If you have specific concerns about what PPE will be provided in your jurisdiction, please reach out to your local officials for more information. Contact information can be found <a href="http://www.powerthepolls.org/search">here</a>.
               </p>,
         },
         {
            question: "I have a disability. What accommodations are being provided?",
            answer: () => <p>
               These vary state to state, so the best place to find information is by contacting your local elections administrator directly. Enter your information <a href="http://www.powerthepolls.org/search">here</a> and you’ll get redirected to information for your local election administrators. If information is not on their website, you can reach out to them directly.
               </p>,
         },
         {
            question: "I don’t want to be paid to be a poll worker.",
            answer: () => <p>
                  If you are not interested in being paid, you can ask your administrator about waiving your wages or you can choose to donate it to a charity.
               </p>,
         },
      ],
   },
   {
      sectionTitle: "Additional inquiries",
      questions: [
         {
            question: "I’m an organization and would like to partner with Power the Polls.",
            answer: () => <p>
                  Thank you for your interest in partnering with Power the Polls! Please apply to be a partner through our <a href="https://erin701737.typeform.com/to/avgyQmci">partner sign-on form</a>. This <a href="https://docs.google.com/presentation/d/1I-FJIAbgWceL2A0OIgkKcLNgTBtmUpYMUgR4O8sdLSU/edit#slide=id.g8f13243ead_0_108">deck</a> and <a href="https://drive.google.com/file/d/1TTXtGqCNA8vlPcNFUZmLuHKZ5hKAKkWv/view?usp=sharing">one pager</a> include some more background information on partnerships with Power the Polls.
               </p>,
         },
         {
            question: "If I’m working the polls, when do I vote?",
            answer: () => <p>
               Poll workers usually cast their votes early or by mail, but some cast their votes on Election Day. Certain jurisdictions may require poll workers to vote early or via absentee ballot. Please contact your local elections official for details about how poll workers cast their ballots.
               </p>,
         },
         {
            question: "How can I contact my local elections administrator directly?",
            answer: () => <p>
               You should reach out to your local administrators for this information. Enter your zip and search for their info at <a href="https://www.powerthepolls.org/search">https://www.powerthepolls.org/search</a>. Hopefully they can help you out!
               </p>,
         },
         {
            question: "Who started this organization?",
            answer: () => <p>
               The initiative was launched by nonprofit organizations and businesses including the Civic Alliance, Comedy Central, Fair Elections Center, Center for Secure and Modern Elections Levi Strauss & Co, MTV, Patagonia, Pizza to the Polls, Time To Vote, Uber, and We Can Vote.
               </p>,
         },
      ],
   },
   {
      sectionTitle: "Technical issues",
      questions: [
         {
            question: "I hit the “Complete Your Application” button, but it brought me to a blank email. What next?",
            answer: () => <div>
                  <p>If the "Complete Your Application!" prompt lead you to a blank email, that means that you need to email your local election administrator directly to apply. If you're not sure what to write, please feel free to use this sample text in the body of your message:</p>
                  <p>To Whom It May Concern</p>
                  <p>I am writing to you to express my interest in being a poll worker in this November's election. I am committed to making sure all eligible voters in my area are able to exercise their right to vote this year.</p>
                  <p>I have reviewed the requirements for our area and I am ready, willing, and able to serve. I can be reached by phone at (###) ###-#### or at this email. My address is 123 Main Street, EveryTown, State, Zip code.</p>
                  <p>I look forward to hearing from you about all training opportunities and next steps so I can serve as a poll worker this year.</p>
               </div>,
         },
         {
            question: "I filled out an application online, but there’s no way to submit it. Can I email it to you as an attachment?",
            answer: () => <p>
               Unfortunately, we cannot process your application directly - but we can connect you with the people who can. You should reach out to your local administrators for information on how to proceed. Enter your zip and search for their information <a href="https://www.powerthepolls.org/search">here</a>.
               </p>,
         },
         {
            question: "I’m experiencing a technical error while trying to access your site/I found an error on your site!",
            answer: () => <p>
               Please reach out to us here to report this issue. Be sure to include a screenshot and the zip code you used to sign up.
               </p>,
         },
      ],
   },
];
export default data;
