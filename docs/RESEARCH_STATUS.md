# Research Status

Where every source stands, what each can and can't support, and what's still missing. In Phase 3, these rows seed `src/research/sources.json` and `claims.json`. After that, the JSON is the source of truth and this page tracks the to-do list.

## Status levels (DECISIONS D-09)

| Level | Means | Passes `--release`? |
|---|---|---|
| `lead` | Found in a search; not opened | No |
| `assistant-checked` | Claude opened it through a web fetch and checked the metadata. **The fetch summarizes with a small model, so quoted wording is not trusted.** | No |
| `shawn-verified` | Shawn read the original page or PDF and confirmed the metadata and the exact sentence the claim rests on | **Yes** |

## How to verify a source (about 10 minutes each)

1. Open the **original** (the DOI link or the publisher page, not a summary).
2. Check every APA field against the page: all authors and initials, year (and month/day for web/news), exact title, journal/site name, volume(issue), pages or article number, DOI.
3. Find the **exact sentence** each claim rests on. Note its location: `p. #` for a PDF, `para. #` for a web page.
4. Write the claim in **your own words** (paraphrase), or copy the sentence exactly in quotation marks with its locator (quote).
5. Fill in limitations: who it's about, where, how old, draft or final.
6. Set `status` to `shawn-verified` and add the date.

## Sources

| id | APA (draft, check against original) | Status | Can support | Can't support / watch out |
|---|---|---|---|---|
| **SRC-01** | Milwaukee County Office of the County Executive. (2026, May 27). *Milwaukee County, Medical College of Wisconsin release draft report of suicide trends pre-post COVID-19* [Press release]. https://county.milwaukee.gov/EN/County-Executive/News/Milwaukee-County-Medical-College-of-Wisconsin-Release-Draft-Report-of-Suicide-Trends-Pre-Post-COVID-19 | assistant-checked (the county site **blocks automated fetching**, HTTP 403; figures cross-checked via [CivicMedia, 2026-05-28](https://civicmedia.us/news/2026/05/28/milwaukee-county-medical-college-of-wisconsin-release-draft-report-of-suicide-trends-pre-post-covid-19)) | **Statistic.** Pre-COVID (2002–Mar 2020): 1,945 suicide deaths, 76.1% male. Post-COVID (Mar 2020–2024): 80.3% male. Analysis by the MCW Comprehensive Injury Center, sponsored by the Greater Milwaukee Foundation. | These are **shares of deaths, not rates**, so they don't show that men's risk is rising. It's a **draft** report: check whether a final version exists. Confirm the exact title, author line, and date on the page itself. |
| **SRC-02** | Kirwan, H. (2026, May 20). *Milwaukee study highlights post-COVID shift in suicide deaths*. Wisconsin Public Radio. https://www.wpr.org/news/milwaukee-study-highlights-post-covid-shift-in-suicide-deaths | assistant-checked | **Expert testimony.** Dr. Ben Weston, Chief Health Policy Advisor, Milwaukee County: the preliminary data show no notable change in the overall suicide rate since 2002; he names a lack of access to affordable health care as a long-standing factor. Also covers the county's count range (87 deaths in 2002 to a peak of 156 in 2017). | Nothing male-specific. Confirm Weston's exact words and title before quoting. |
| **SRC-03** | Mokhwelepa, L. W., & Sumbane, G. O. (2025). Men's mental health matters: The impact of traditional masculinity norms on men's willingness to seek mental health support; a systematic review of literature. *American Journal of Men's Health, 19*(3). https://doi.org/10.1177/15579883251321670 | assistant-checked (online 2025-05-27; May–June 2025 issue) | **Causes and barriers.** A systematic review of 47 studies (2000–2024, US most represented): emotional suppression and self-reliance norms linked to worse outcomes; barriers include fear of seeming weak, fear of judgment, delayed care. Notes that resilience can be a resource. Recommends interventions that normalize emotional expression and reduce stigma. | **Not Milwaukee data.** Evaluates **no** program, so it can't prove a solution works. The fetch listed it as "Article 15579883251321670" (no page range). APA 7 puts that after the issue: *19*(3), Article 15579883251321670. Confirm on the publisher page. |
| **SRC-04** | Frey, J. J., Osteen, P. J., Sharpe, T. L., Mosby, A. O., Joiner, T., Ahmedani, B., Iwamoto, D., Nam, B., Spencer-Thomas, S., Ko, J., Ware, O. D., Imboden, R., Cornette, M. M., & Gilgoff, J. (2023). Effectiveness of Man Therapy to reduce suicidal ideation and depression among working-age men: A randomized controlled trial. *Suicide and Life-Threatening Behavior, 53*(1), 137–153. https://doi.org/10.1111/sltb.12932 | assistant-checked (online 2022-11-14; a **correction** was published in 2024, 54(4), 798, so read it) | **Solution evidence, with honest limits.** A randomized trial with 554 Michigan men aged 25–64. Man Therapy (an online, male-framed program) vs. an anonymous online screening + referral site. **Men in both groups improved** in suicidal ideation and depression. | **No significant difference between the groups**, so it doesn't prove Man Therapy itself caused the improvement. Sample mostly White and college-educated. Michigan, not Milwaukee. |

## Leads (not yet opened)

| id | Lead | Why it might help |
|---|---|---|
| ~~LEAD-05~~ → **SRC-05** | Gilgoff, J. N., Wagner, F., Frey, J. J., & Osteen, P. J. (2023). Help-seeking and Man Therapy: The impact of an online suicide intervention. *Suicide and Life-Threatening Behavior, 53*(1), 154–162. https://doi.org/10.1111/sltb.12929 | **assistant-checked 2026-11-03.** Man Therapy associated with higher odds of **professional** help-seeking (OR = 1.55, p = .049); no effect on nonprofessional help-seeking. The strongest solution evidence so far. |
| LEAD-08 | The Confess Project (barbers as mental-health advocates); Barbershop Talk Therapy Project (Fort Worth) | Small pre/post studies of willingness to seek help. See [SUGGESTIONS.md](SUGGESTIONS.md) |
| LEAD-09 | HeadsUpGuys survey (2024, *Health Education Journal*); Men's Sheds (*BMC Public Health* 2022; *AJMH* 2022 review) | Self-reported benefits, no control groups |
| LEAD-10 | Milwaukee Health Care Partnership 2021 CHNA (via Milwaukee NNS, May 2022): about 38% cite cost, nearly a quarter cite waits | **Local material-barrier evidence.** Check for a 2024 CHNA |
| LEAD-11 | Wisconsin DHS rural-men suicide prevention program (Act 85); peer support recommended | Verify figures and age range at dhs.wisconsin.gov/prevent-suicide |
| LEAD-12 | Milwaukee County crisis line (414) 257-7222; Mental Health Emergency Center, 1525 N. 12th St (opened Sept 2022, 24/7 walk-in); Access Clinics | Resources screen + refutation ("the services exist") |
| LEAD-06 | Man Therapy Ohio evaluation (Univ. of Maryland School of Social Work, 2024–2025); Rhode Island Zero Suicide + Man Therapy study (Frey) | A program "being tried elsewhere." Results unknown. |
| LEAD-07 | ThriveOn King (Milwaukee men-of-color wellness group, [FOX6](https://www.fox6now.com/news/milwaukee-social-group-works-help-men-color-mental-wellness)); All of Us "Men's Health Nights" (Milwaukee) | A possible **local** partner or venue for the pilot. Dates and details unknown. |

## Gaps (the rubric needs these)

1. **Milwaukee/Wisconsin evidence on men's barriers and service use**, not just deaths. Ideas: Milwaukee County Behavioral Health Services reports, Wisconsin DHS behavioral health data, the Milwaukee County Community Health Needs Assessment, MCW reports. Until found, the game shows an honest research-gap box.
2. **A solution with outcome evidence**, ideally a male-focused outreach program evaluated in the US, with costs and results. LEAD-05/06 are the starting points.
3. **Verified local resources** for the Resources screen: non-crisis options in Milwaukee County (official pages only, no claims about hours or eligibility we can't confirm).
4. **Optional expert interview** (DECISIONS N-14): named person, job title, date, and a note of what they said. Never invent or "smooth" a quote.

## Design guidance sources (not graded references)

Used for [CONTENT_REVIEW.md](CONTENT_REVIEW.md). Checked 2026-11-03.

- SAVE. *Recommendations for Reporting on Suicide* (media recommendations, developed by consensus with AFSP, CDC, NAMI and others). https://www.save.org/media/media-recommendations/ (reportingonsuicide.org redirects here)
- National Action Alliance for Suicide Prevention. *Framework for Successful Messaging* (Strategy, Safety, Positive Narrative, Guidelines). https://suicidepreventionmessaging.org/
- 988 Suicide & Crisis Lifeline. Call or text 988, chat at https://chat.988lifeline.org/. Free, confidential, 24/7, "for everyone," including emotional distress. https://988lifeline.org/
