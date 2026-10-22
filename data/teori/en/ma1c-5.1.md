---
kalla: 081a4be1de
id: ma1c-5.1
title: Statistical surveys, sampling and sources of error
course: Matematik nivå 1c
chapter: Statistik och sannolikhetslära
chapterNumber: 5
section: '5.1'
---

# Statistical surveys, sampling and sources of error

## Statistical surveys and sampling

Information that is handled in a survey is called **data**.

The set that the survey is about is called the **population**. The population
can consist of, for example, people or objects.

If you collect data from a whole population it is called a
**census**. Censuses are exact, but time-consuming if
the population is large.

If you select and examine a smaller part of the population, this is called
a **sample survey**. It is less exact, but is easier to
carry out.

In sample surveys you must in some way choose which members of
the population will take part in the survey. How you choose them is called
**sampling**.

::: formel "Three common sampling methods"
- **Simple random sampling.** Each individual in the population is assigned
  a number. Then a number is chosen with a random number generator. "Drawing names out of a
  hat." The sample is completely random.
- **Systematic sampling.** You use a system for how you make your
  selection, for example choosing every fifth person from a class list. Contrary
  to what you might think, this method is *not* random (unless you have
  shuffled the order of the class list beforehand).
- **Stratified sampling.** You adapt the choice of individuals in the sample in order
  to reflect the population. For example, if 75 % of a population are women,
  75 % of the sample should also be women, if you think that sex has an effect
  on the result.
:::

## Sources of error

Statistical surveys can give incorrect results. Causes of
incorrect results are called **sources of error**.

Errors that are due to the sample not representing the population are called
**sampling errors**. An example of this could be standing outside
a church and asking the question "Do you believe in God?" in order to draw a conclusion about
belief in God in a town. Since churchgoers are to a greater extent
religious, the probability that they believe in God is greater than for the whole
population of the town. That is why the sample is unsuitable.

Errors that make the collected values incorrect are called **measurement errors**.
Measurement errors can be caused by a wrongly graduated ruler, but also by unclear or
**leading questions** or answer options that do not cover all possible
answers:

| Question | Assessment |
| --- | --- |
| "Maths is a fun subject, isn't it?" | Very leading question |
| "Is maths a fun subject?" | Leading question |
| "What do you think of maths?" | Good |

If not everyone asked in a survey answers, we get
**non-response**. If the non-response is large, or if the people who make up
the non-response can be suspected of answering the survey differently,
the non-response needs to be taken into account.

::: exempel "Example 1: Examine a survey question"
**You want to investigate opinions about languages and ask the question below
in a questionnaire:**

> Which language do you think is the most beautiful: Spanish or French?
> ☐ Catalan
> ☐ French

**Are there any problems with the survey?**

::: handskrift
typ: enkatfraga
:::

::: textlosning
**Answer:** Yes, the answer options do not cover all possible answers. It is
not certain that a respondent prefers either of the languages. Nor is it
certain that a respondent knows what, for example, Catalan sounds like. The options
"Neither" and "Don't know" are therefore missing. (In addition, the question mentions *Spanish*, but
the option given is *Catalan*.)
:::
:::

::: exempel "Example 2: Taking the non-response into account"
**A questionnaire was sent out to 1 000 people. The question was "Are you in favour of
or against the expansion of nuclear power?". The result was**

$$
\left[\begin{array}{l}
\text{In favour: 420} \\
\text{Against: 380} \\
\text{Don't know: 80}
\end{array}\right.
$$

**a) What proportion of those who answered were in favour of the expansion of nuclear power?<br>b) How large was the non-response as a percentage?<br>c) If we take the non-response into account, between which values can the proportion in favour of the expansion of nuclear power lie?**

::: handskrift
typ: bortfall
:::

::: textlosning
**a)** We have 420 in favour out of $(420 + 380 + 80) = 880$ respondents. The proportion
in favour is then

$$
\frac{420}{880} = 0.477\ldots \approx 0.48 = 48\ \%
$$

**Answer:** 48 %

**b)** 1 000 questionnaires were sent out and 880 answered. The number in the non-response is
therefore $(1\,000 - 880) = 120$. The percentage non-response is therefore

$$
\frac{120}{1\,000} = 0.12 = 12\ \%
$$

**Answer:** 12 %

**c)** We get the *lower* limit if no one in the non-response is in favour.
The number in favour is then still 420 and the proportion is then

$$
\frac{420}{1\,000} = 0.42 = 42\ \%
$$

The *upper* limit is obtained if everyone in the non-response is in favour. The number in favour
is then $(420 + 120) = 540$, which gives the proportion

$$
\frac{540}{1\,000} = 0.54 = 54\ \%
$$

**Answer:** Between 42 % and 54 %.
:::
:::

::: sammanfattning "Summary"

::: sampunkt "Basic concepts"
- **Data**: the information that is handled.
- **Population**: the whole set the survey is about.
- **Census**: the whole population is examined. Exact but
  time-consuming.
- **Sample survey**: only a part is examined. Less exact but
  easier to carry out.
:::

::: sampunkt "Three sampling methods"
- **Simple random**: each individual gets a number and a random number generator
  chooses. Completely random.
- **Systematic**: according to a system, for example every fifth person on a list.
  **Not random**, unless the list has been shuffled first.
- **Stratified**: the sample is adapted so that it **reflects the population**,
  for example the same distribution of sexes.
:::

::: sampunkt "Sources of error"
- **Sampling error**: the sample does not represent the population. Asking about
  belief in God outside a church.
- **Measurement error**: the values become incorrect. Faulty measuring instruments, **leading
  questions** or answer options that do not cover all answers.
:::

::: sampunkt "Leading questions"
- "Maths is a fun subject, isn't it?" is very leading.
- "Is maths a fun subject?" is leading.
- "What do you think of maths?" is good.
:::

::: sampunkt "Non-response"
- Those asked who **do not answer**.
- If the non-response is large, or they can be suspected of answering differently,
  it must be taken into account.
- Then report an **interval**: from everyone in the non-response answering one way
  to everyone answering the other.
:::
:::
