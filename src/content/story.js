// =============================================================================
// THE STORY: the one file Shawn edits.
//
// How to write a scene:
//   1. Read its `brief` (what the scene must do, which source to cite, how long).
//   2. Lines starting with '[PLACEHOLDER]' are CLAUDE'S DRAFTS, there only to show the
//      flow and where the data goes. Rewrite each one in your own words, then delete
//      the '' prefix. One string = one paragraph.
//   3. Leave `id`, `to`, and `cites` alone unless you mean to change the flow.
//   4. Run `npm run placeholders` to see what's left. It must say 0 before you hand it in.
//
// Facts must cite a source: put the source id in that scene's (or card's) `cites` list,
// and the game shows the APA in-text citation as a button that opens the full reference.
// Numbers match the sources as summarized in docs/RESEARCH_STATUS.md.
//
// Safe-messaging rules (docs/CONTENT_REVIEW.md): no method or detail of any death, no
// "epidemic"/"skyrocketing" language, no diagnosis of Jordan, no rescue fantasy.
// Always point toward help. Jordan makes his own choice.
// =============================================================================

export const story = {
    title: 'The Door Was Always There',
    author: 'Shawn James Dunn',
    start: 'notice',

    scenes: {
        // ---------------------------------------------------------------- 1
        notice: {
            title: 'Before you open the case',
            brief: 'Introduction, self help notice, and concept.',
            text: [
                'This is a fictional story about a student who is struggling quietly. It mentions suicide statistics for Milwaukee County. It does not describe any death or self-harm.',
                'If you or someone you know needs support right now, call or text 988 any time. If there is an emergency please call 911. More options are on the Resources page.',
            ],
            choices: [{ label: 'Open the case file', to: 'case' }],
        },

        // ---------------------------------------------------------------- 2
        case: {
            title: 'Case file: Jordan',
            brief: 'Introduce Jordan. He is 25+, works about 30 hours a week, and came back to school. Lately he has stopped coming to his study group and has missed shifts. Introduce the player: a peer mentor who keeps case notes. No diagnosis, no guessing why yet. 3–5 sentences.',
            note: 'Jordan, 27. Stopped coming to study group 3 weeks ago. Missed 2 shifts.',
            text: [
                'Case file: Jordan, 27. Back in school after six years of working. He takes three classes and works about 30 hours a week at a warehouse.',
                'Note in file: For his first month, Jordan never missed study group. He was the one who kept everyone on track. Three weeks ago he stopped coming. A classmate who works with him says he has missed two shifts.',
                'Your Background: You are a peer mentor in the student success office. Your job is not to fix anyone. It is to notice, ask, and point toward the door. This morning there was a sticky note on your desk from the study-group leader: "Haven\'t seen Jordan in weeks. Can you check in?"',
            ],
            choices: [{ label: 'Talk to a classmate', to: 'classmate' }],
        },

        // ---------------------------------------------------------------- 3
        classmate: {
            title: 'Witness: a classmate',
            brief: 'A classmate describes what they noticed. Show the difference between an OBSERVATION ("he stopped answering the group chat") and a GUESS ("he must not care anymore"). The player writes down only the observation. 3–5 lines of dialogue.',
            note: 'Seen: no replies in the group chat for 2 weeks. Said he was "just tired."',
            text: [
                'Marcus (Study Group Member): "I dunno, he just stopped showing up. He hasn\'t answered the group chat in two weeks. I did see him in the hallway Monday and he said he was \'just tired\' and kept on walking."',
                'Marcus: "Honestly? I think he just doesn\'t care about the class anymore. A lot of students come in here all talk and no action, and I think he\'s one of them."',
                'You write down what Marcus saw, not what he guessed. Not answering the chat and saying he is tired are things that happened. "Doesn\'t care" is only a guess.',
            ],
            choices: [{ label: 'You walk by one of the student-services bulletin boards and notice some flyers', to: 'flyer' }],
        },

        // ---------------------------------------------------------------- 4
        flyer: {
            title: 'Evidence: the flyer',
            brief: 'The only mental-health flyer on the board is generic and crisis-only ("In crisis? Call…"). Explain why a man like Jordan, who is not "in crisis" and believes he should handle things alone, walks right past it. Cite SRC-03 for self-reliance and fear of judgment. This sets up why general awareness is not enough. 3–4 sentences.',
            note: 'The only flyer is crisis-only. Jordan would not see himself in it.',
            cites: ['SRC-03'],
            text: [
                'The bulletin board outside student services has one mental-health flyer. Big red letters: "IN CRISIS? CALL NOW." Below that, a phone number and a stock photo of someone holding their head in their hands.',
                'You wonder if Jordan sees himself in crisis. Jordan\'s demeanor might suggest that he wouldn\'t admit he is "in crisis" even if he is. Marcus said Jordan said he is tired, and facts show he is behind, and quiet. A flyer like this tells him that help is for people who are falling apart, so it must not be for him.',
                'Research you find supports this. A 2025 review of 47 studies found that norms like handling problems alone and fear of being seen as weak keep many men from seeking help. It recommends making help-seeking feel normal instead of like an emergency.',
            ],
            choices: [{ label: 'Go to the case board and lay out the evidence', to: 'board' }],
        },

        // ---------------------------------------------------------------- 5
        board: {
            title: 'The case board',
            brief: 'The evidence, as four cards. This is the PROBLEM + EVIDENCE section of the proposal. Paraphrase in your own words; use a short quote only with quotation marks. The 4th card is your reframe: the local data shows THAT men are dying, not WHY they do not seek help. Do not say Milwaukee has done nothing.',
            text: ['You pin everything to the case board. Jordan is one person, but the numbers say he is not alone.'],
            cards: [
                {
                    heading: 'The outcome (local)',
                    cites: ['SRC-01', 'SRC-02'],
                    text: 'From 2002 to early 2020, men were 76.1% of suicide deaths in Milwaukee County. From 2020 to 2024, that share rose to 80.3%, or about 4 in 5. The overall suicide rate showed no notable change, so men make up a growing share of the people the county loses.',
                },
                {
                    heading: 'The door exists (local)',
                    cites: ['SRC-02'],
                    text: 'Help already exists: a 24/7 county crisis line, a walk-in Mental Health Emergency Center, 988, and campus counseling. But Milwaukee County\'s Chief Health Policy Advisor, Dr. Ben Weston, names a lack of affordable care as a long-standing problem.',
                },
                {
                    heading: 'The path is blocked (research)',
                    cites: ['SRC-03'],
                    text: 'A review of 47 studies from 2000 to 2024 found that traditional masculinity norms, like handling things alone and hiding emotions, are linked to men delaying or avoiding help. Fear of being judged or seen as weak was a common barrier.',
                },
                {
                    heading: 'Missing file',
                    missing: true,
                    cites: ['SRC-01', 'SRC-03'],
                    text: 'The county report counts who died. It does not ask why men here are not reaching help, and we found no local study that does. The research on why comes from national and international studies. Milwaukee has the outcome and the door, but the file on the path between them is empty.',
                },
            ],
            note: 'Problem: help exists, but about 4 in 5 suicide deaths here are men, and local data does not explain why men are not reaching help.',
            choices: [{ label: 'Find Jordan', to: 'talk' }],
        },

        // ---------------------------------------------------------------- 6
        talk: {
            title: 'Talking with Jordan',
            brief: 'You find Jordan. The player picks HOW to start. This scene is just the setup: one or two sentences of where he is and how he seems. The choice is the point.',
            text: ['You find Jordan alone in the library, his laptop open to an assignment that was due two days ago. He looks up, nods once, and goes back to the screen.'],
            choices: [
                { label: 'Ask privately how he\'s been, and say you noticed he\'s been missing', to: 'listen' },
                { label: 'Tell him he should go see a counselor', to: 'pushback' },
            ],
        },

        // ---------------------------------------------------------------- 6b
        pushback: {
            side: true,
            title: 'Talking with Jordan',
            brief: 'The wrong approach. Jordan shuts down ("I\'m fine, I can handle it"). Show self-reliance in action. Short: 2–3 lines. The player gets to try again.',
            text: [
                'You: "Hey, you should really go talk to a counselor."',
                'Jordan: "I\'m fine. I don\'t need a counselor. I can handle it." He closes the laptop and leaves.',
                'You told him what to do before you asked how he was. To a man who believes he should handle things alone, that sounded like "you can\'t."',
            ],
            choices: [{ label: 'Try again', to: 'talk' }],
        },

        // ---------------------------------------------------------------- 6c
        listen: {
            title: 'Talking with Jordan',
            brief: 'The consent-based approach works. Jordan opens up a little. Barriers come out in THIS order: (1) "I should handle it myself" (self-reliance), (2) "people would think I\'m weak" (fear of judgment), (3) "counseling is for people who are falling apart" (misconception), then (4) "and I don\'t have the time or money anyway" (cost/time). Normal conversation, no diagnosis. 5–8 lines.',
            note: 'Barriers Jordan named: handle it alone; looking weak; "counseling is for a crisis"; no time or money.',
            text: [
                'You: "Hey. We\'ve missed you at study group. No pressure. How have you been, really?"',
                'Jordan: "Honestly? Not great. But I\'ll figure it out. I always have. It\'s my problem to deal with."',
                'Jordan: "And I\'m not going to be the guy who can\'t handle a couple of classes. Everyone else is doing fine."',
                'Jordan: "Counseling is for people who are really falling apart. I\'m not there. I\'m just tired."',
                'Jordan: "Besides, I work thirty hours a week. I don\'t have time to sit in a waiting room, and I can\'t pay for therapy."',
            ],
            choices: [{ label: 'Show him the door is already there', to: 'door' }],
        },

        // ---------------------------------------------------------------- 7
        door: {
            title: 'The door',
            brief: 'The player points out options that already exist (campus counseling; the free, no-appointment county options on the Resources page) and answers one barrier honestly. Jordan makes HIS OWN choice: maybe he says he\'ll try one appointment, maybe "not yet, but I\'ll keep the card." No rescue, no cure. End by turning to the bigger question: Jordan only got here because someone reached out. Most men never get that. 4–6 sentences.',
            note: 'Jordan agreed to try one appointment. His choice.',
            text: [
                'You tell him that counseling on campus is free for students, and that you can help him find a time that fits around his shifts. It does not have to be a crisis. Plenty of people go because they are tired and behind. You also hand him a card with 988, which works by text, and the county\'s walk-in options.',
                'Jordan is quiet for a while. Then: "One appointment. No promises." He puts the card in his wallet.',
                'The door was always there. Jordan found the path to it because someone noticed and asked. Most men like Jordan will never have a peer mentor check on them, so the campus needs a better path for all of them.',
            ],
            choices: [{ label: 'Take the case to the dean of student services', to: 'proposal' }],
        },

        // ---------------------------------------------------------------- 8
        proposal: {
            title: 'The proposal',
            brief: 'SOLUTION section. You pitch a one-semester pilot to the dean (unnamed). Fill each card in your own words. Keep it small and realistic: it uses staff and peer mentors the college already has. Cite SRC-05 as evidence a male-framed approach raised professional help-seeking, and SRC-04 for its honest limit (both groups improved).',
            text: ['"Dean, the services we have are good. The problem is the path to them. I\'m proposing a one-semester pilot to build that path for the men on this campus."'],
            cards: [
                {
                    heading: 'What',
                    text: 'A one-semester pilot with three "front doors." (1) Peer mentors trained to check in early, before anything becomes a crisis. (2) Messages written for men, posted where they already are: trades and tech programs, athletics, the gym, and student jobs. (3) An anonymous online self-check that links to campus counseling, the county\'s walk-in options, and 988.',
                },
                {
                    heading: 'Who runs it and what it costs',
                    text: 'Student services runs it with the peer mentors and counselors it already has. The main costs are a few hours of mentor training, printing, and a simple web page.',
                },
                {
                    heading: 'Voluntary and private',
                    text: 'Nobody has to take part. The self-check is anonymous and collects no names. Mentors share options. They never report on a student.',
                },
                {
                    heading: 'How we measure it',
                    text: 'An anonymous survey at the start and end of the semester asks "Would you consider talking to a professional?", plus questions about handling things alone and fear of judgment. That fills the missing file: the first local data on why men here do or do not seek help. We also count self-check visits and counseling referrals from the pilot, as totals only.',
                },
                {
                    heading: 'Why we think it can work',
                    cites: ['SRC-05', 'SRC-04'],
                    text: 'In a randomized trial of 554 Michigan men aged 25 to 64, men offered Man Therapy, an online program written for men, had about 1.5 times the odds of seeking professional help. In the same trial, men in both groups improved on depression and suicidal thoughts, so the program is promising, not proven. That is why this is a pilot: start small, measure, then decide.',
                },
            ],
            choices: [{ label: 'Hear the dean\'s concern', to: 'objection' }],
        },

        // ---------------------------------------------------------------- 9
        objection: {
            title: 'The objection',
            brief: 'COUNTERARGUMENT section. The dean raises a fair objection: "We already have counseling, and the county has walk-in care. Men are adults; they can choose to go." Write it so it sounds reasonable, not like a villain. Then the player picks a response.',
            text: ['Dean: "I appreciate the work you put into this. But we already have counseling, and it\'s free. The county has walk-in care around the clock. These are adults. If a man wants help, he knows where the door is. Why should we spend staff time on people who haven\'t asked?"'],
            choices: [
                { label: 'Agree with what\'s true, then answer it', to: 'refutation' },
                { label: 'Argue that the services aren\'t good enough', to: 'weak' },
            ],
        },

        // ---------------------------------------------------------------- 9b
        weak: {
            side: true,
            title: 'The objection',
            brief: 'The weak response backfires: the dean defends the counseling staff and the conversation stalls. Short (2–3 lines). Teaches that attacking the other side is not a refutation.',
            text: [
                'You: "Because the counseling we have isn\'t working for men."',
                'Dean: "Our counselors are excellent, and I won\'t have them blamed." The conversation stalls.',
                'The services were never the problem. Jordan didn\'t turn counseling down. He never got close enough to try it.',
            ],
            choices: [{ label: 'Try again', to: 'objection' }],
        },

        // ---------------------------------------------------------------- 10
        refutation: {
            title: 'The answer',
            brief: 'REFUTATION. (1) Concede: yes, the services are real and men do choose. (2) Turn: even so, about 4 in 5 suicide deaths here are men (SRC-01), and research shows norms like self-reliance make the choice harder (SRC-03). (3) No local study of WHY is not evidence there is no local problem; the pilot would gather that data. (4) The pilot respects choice: it is voluntary and just makes the path easier. Your words, 4–6 sentences.',
            cites: ['SRC-01', 'SRC-03'],
            text: [
                '"You\'re right. The services are real and they\'re good, and every man gets to decide for himself. This pilot doesn\'t change that."',
                '"But an open door hasn\'t been enough. Even with all of these services, about 4 in 5 suicide deaths in Milwaukee County are men. Research shows why: norms like handling it alone and fear of looking weak keep men from walking through, even when they know where the door is."',
                '"We also don\'t have local data on why men here aren\'t reaching help. Not having a study isn\'t proof there\'s no problem. It\'s a reason to measure, and this pilot does."',
                '"And it respects choice. Everything is voluntary and anonymous. We aren\'t pushing anyone through the door. We\'re making the path to it shorter and easier to see."',
            ],
            choices: [{ label: 'Close the case', to: 'close' }],
        },

        // ---------------------------------------------------------------- 11
        close: {
            title: 'Case closed?',
            brief: 'SUMMARY + memorable close. Recap in 3–4 short sentences: problem, evidence, solution, why the objection does not hold. Then one line people will remember (ideas: the door callback; "4 in 5" turned into a question; asking for help as a strength men already use with a mechanic or a coach). End with a call to action for the dean: approve the one-semester pilot.',
            cites: ['SRC-01', 'SRC-03'],
            text: [
                'Milwaukee County has real mental-health services, yet about 4 in 5 of its suicide deaths are men. Research shows that norms like self-reliance and fear of judgment, along with cost and time, keep men from reaching help, and the local data does not yet explain why. A voluntary, one-semester pilot of "front doors" built for men, measured from start to finish, can shorten that path and give us the local answers we are missing.',
                '"I\'m asking you to approve the pilot for next semester."',
                'The door was always there. Jordan just needed someone to show him the path. Let\'s build that path for the next man who won\'t ask.',
                'Conclusion Statement: I, Shawn Dunn, went into this project thinking that I would find some concrete solutions to a problem that has existed for a very long time. I was filled with more questions than solutions. From what I saw in my research, mental health support seems to be lacking across the USA. There are also a great many programs out there. But for men specifically, the data shows that there is a gap somewhere. I see that there are studies and suggestions out there. Some of the programs I found offer helpful support. I tried to take a larger national problem and localize it. The data for me seemed to even get less and less about ways to bridge the gap of there is a problem, there is help, but it is not taken advantage of. My findings have led me to see a trend in culture and what men consider masculine. Many of those traits are held onto so strongly or misunderstood to the point that they become damaging and "toxic". I have learned that there is a need for more research and more programs to help men. I have also learned that there is a need for more awareness and education about mental health and the resources available. I have learned that there is a need for more support and understanding from society as a whole. There is no easy solution or just one that will work. But a cultural shift can start on the smallest of levels, and that is what this pilot is: one small campus making it normal for a man to ask how someone is doing, and to answer honestly. If we as a society do not want someone to feel alone and unable to make the best and healthiest decisions for themselves, that shift has to start somewhere, and it can start here.',
            ],
            choices: [{ label: 'Play again', to: 'notice' }],
            end: true,
        },
    },

    // Sources, cited by id. `apa` is the reference-list entry: *asterisks* mark italics.
    // These are hand-written to APA 7. Re-check each against the original before submitting.
    sources: {
        'SRC-01': {
            inText: 'Milwaukee County Office of the County Executive, 2026',
            apa: 'Milwaukee County Office of the County Executive. (2026, May 27). *Milwaukee County, Medical College of Wisconsin release draft report of suicide trends pre-post COVID-19* [Press release].',
            url: 'https://county.milwaukee.gov/EN/County-Executive/News/Milwaukee-County-Medical-College-of-Wisconsin-Release-Draft-Report-of-Suicide-Trends-Pre-Post-COVID-19',
        },
        'SRC-02': {
            inText: 'Kirwan, 2026',
            apa: 'Kirwan, H. (2026, May 20). *Milwaukee study highlights post-COVID shift in suicide deaths*. Wisconsin Public Radio.',
            url: 'https://www.wpr.org/news/milwaukee-study-highlights-post-covid-shift-in-suicide-deaths',
        },
        'SRC-03': {
            inText: 'Mokhwelepa & Sumbane, 2025',
            apa: 'Mokhwelepa, L. W., & Sumbane, G. O. (2025). Men\'s mental health matters: The impact of traditional masculinity norms on men\'s willingness to seek mental health support; a systematic review of literature. *American Journal of Men\'s Health, 19*(3), Article 15579883251321670.',
            url: 'https://doi.org/10.1177/15579883251321670',
        },
        'SRC-04': {
            inText: 'Frey et al., 2023',
            apa: 'Frey, J. J., Osteen, P. J., Sharpe, T. L., Mosby, A. O., Joiner, T., Ahmedani, B., Iwamoto, D., Nam, B., Spencer-Thomas, S., Ko, J., Ware, O. D., Imboden, R., Cornette, M. M., & Gilgoff, J. (2023). Effectiveness of Man Therapy to reduce suicidal ideation and depression among working-age men: A randomized controlled trial. *Suicide and Life-Threatening Behavior, 53*(1), 137–153.',
            url: 'https://doi.org/10.1111/sltb.12932',
        },
        'SRC-05': {
            inText: 'Gilgoff et al., 2023',
            apa: 'Gilgoff, J. N., Wagner, F., Frey, J. J., & Osteen, P. J. (2023). Help-seeking and Man Therapy: The impact of an online suicide intervention. *Suicide and Life-Threatening Behavior, 53*(1), 154–162.',
            url: 'https://doi.org/10.1111/sltb.12929',
        },
    },

    // Shown on the Resources page. Confirm each number on the official page before submitting.
    resources: [
        {
            name: '988 Suicide & Crisis Lifeline',
            detail: 'Call or text 988, or chat online. Free, confidential, 24/7, for any kind of emotional distress, not only crisis.',
            url: 'https://988lifeline.org/',
        },
        {
            name: 'Milwaukee County Behavioral Health Services crisis line',
            detail: '(414) 257-7222, 24/7. Can send a mobile crisis team.',
            url: 'https://county.milwaukee.gov/EN/DHHS/BHD',
        },
        {
            name: 'Mental Health Emergency Center (Milwaukee)',
            detail: '1525 N. 12th Street. 24/7 walk-in psychiatric emergency care. (414) 966-3030.',
            url: 'https://county.milwaukee.gov/EN/DHHS/BHD',
        },
    ],
};
