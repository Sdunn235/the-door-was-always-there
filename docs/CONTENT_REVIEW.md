# Content Review Checklist

Run through this before marking any scene, claim, or asset `final`. These are **this project's working rules**, based on the handoff and on two published guidelines:

- SAVE, *Recommendations for Reporting on Suicide* (https://www.save.org/media/media-recommendations/)
- National Action Alliance for Suicide Prevention, *Framework for Successful Messaging* (https://suicidepreventionmessaging.org/): Strategy · Safety · Positive Narrative · Guidelines

Those documents are written for media and public messaging. Where a rule below goes beyond them, it comes from the handoff. When unsure, read the full guideline PDF and follow it.

## 1. Suicide-related content (safety)
- [ ] **No method details**, ever: no means, locations, or notes. Case 01 shows **no** suicide or self-harm on screen. Suicide appears only as community statistics.
- [ ] Statistics are calm and in context. No "epidemic," "skyrocketing," or shock framing. Say what the number is (a **share** of deaths, not a rate).
- [ ] Never present suicide as a solution, as inevitable, or as caused by one single event or barrier.
- [ ] **Positive narrative:** show help-seeking as normal and possible, and show what support can look like, without promising a cure.
- [ ] Help is always visible: Resources (988 + local) is reachable from every screen.
- [ ] Nobody is "saved" by the player. The student keeps his own choices; outcomes reflect agency and uncertainty, not win/lose.

## 2. Mental-health accuracy
- [ ] **No diagnosis.** Neither the player nor any character diagnoses anyone. Guesses are tagged `inference` and the case notes say so.
- [ ] Mental illness is never linked to violence or danger.
- [ ] Counseling or therapy is not shown as a guaranteed fix.
- [ ] **Material barriers are real:** time, money, insurance, transport, and scheduling are acknowledged, not treated as "all in his head."
- [ ] Each symbolic tool or barrier has a plain-language line saying what it represents in real life (a skill, not magic).

## 3. Masculinity framing
- [ ] Masculinity itself is **never framed as the problem**. The message is that healthy masculinity can include responsibility, emotional literacy, support-seeking, and respect.
- [ ] Strengths are acknowledged (SRC-03 notes resilience can be a resource).
- [ ] No visual or written stereotypes tying men's distress to violence, anger, or substance use.

## 4. Fiction, privacy, and real people
- [ ] Every character is a **fictional composite**, labeled in-game.
- [ ] **Nothing** comes from `docs/PlanningGuideQA.txt` or Shawn's personal history: not plot, not names, not details.
- [ ] Real people appear only through their **public, cited statements** (e.g. Dr. Ben Weston via WPR), with name and job title.
- [ ] WCTC (or any real organization) is not portrayed as failing men (DECISIONS N-04).

## 5. Evidence honesty
- [ ] Every fact is a **claim id**, never typed into scene text.
- [ ] Each claim states its limitation (population, place, draft status, share vs. rate).
- [ ] No claim says more than its source: no "proves," no causation from correlation.
- [ ] Gaps are shown honestly ("Research pending"), never filled with a guess.
- [ ] Interview content (if any) uses the person's real words, with permission, name, title, and date. Never invented or polished.

## 6. Originality (no plagiarism, no AI text in the final)
- [ ] All story, dialogue, and argument text is **Shawn's own** (`authoring.status: final`).
- [ ] A paraphrase is a genuine rewording in Shawn's voice, not swapped synonyms in the source's sentence structure.
- [ ] A quote is copied **exactly**, in quotation marks, with `p. #` or `para. #`.
- [ ] No `[PLACEHOLDER …]` text remains (`npm run validate -- --release`).

## 7. Accessibility of content
- [ ] Short sentences. Technical terms (telehealth, systematic review, randomized trial) explained the first time.
- [ ] Meaning never relies on color alone.
- [ ] Images (when added) have alt text that says what matters, not just what's pictured.

## 8. Before writing cases 02/03 (DECISIONS N-11)
Each needs its own review first:
- **Suicide-risk crisis:** crisis-response steps must match official 988 / local guidance exactly.
- **Relationship abuse:** never conflate victim and perpetrator; center safety and accountability; use verified, specific DV resources.
- **Substance use / compulsive behavior:** no glamorizing; no diagnosing compulsive sexual behavior from sexual activity alone.

## How reviews work
Shawn may ask Claude to review a draft against this checklist. Claude **flags** issues with the scene id and the rule; Shawn makes the fix. Claude does not rewrite content (DECISIONS D-03).
