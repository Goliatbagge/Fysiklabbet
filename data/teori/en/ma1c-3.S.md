---
kalla: e760408780
id: ma1c-3.S
title: Summary
course: Matematik nivå 1c
chapter: Procentuella förändringar
chapterNumber: 3
section: '3.S'
---

# Summary: Percentage changes

This chapter was about calculating with percentage changes: how
proportions are given as per cent, per mille and ppm, how a change factor makes it
possible to calculate a new value in a single step, and how repeated
changes (for example several years of interest) are combined into a total
change factor. The chapter also showed how a spreadsheet is used to
calculate the balance when saving and to build a repayment plan
for a loan. After the chapter you should be able to calculate with proportions, change factors
and interest, and build spreadsheet formulas with relative and locked
cell references.

## Concepts to know

- **per cent (%)**: hundredth; $1\ \% = \dfrac{1}{100} = 0.01$.
- **per mille (‰)**: thousandth; $1\ \text{‰} = \dfrac{1}{1\,000} = 0.001$.
- **ppm (parts per million)**: millionth;
  $1\ \text{ppm} = \dfrac{1}{1\,000\,000} = 0.000\,001$.
- **proportion**: the part divided by the whole, given in fraction or decimal form.
- **change factor**: the number you multiply the old value by
  to get the new value directly in a percentage change.
- **total change factor**: the product of several change factors in
  repeated changes.
- **interest**: payment or cost for borrowed money, usually given as a
  percentage (interest rate).
- **annual interest rate**: the percentage by which an amount grows (or
  costs) per year; what is meant if only "interest" is mentioned.
- **balance**: the amount in a savings account at a given
  point in time.
- **spreadsheet, cell**: a tool (for example Google Sheets, Excel) built up
  of cells named with a column letter + row number (for example B3); a formula
  in a cell always begins with the equals sign =.
- **fill handle**: the tool in the bottom right corner of a spreadsheet cell that
  copies a formula down a column.
- **relative and locked cell reference**: a relative reference (`B2`) changes when
  the formula is copied to a new row; a locked reference (`$B$12`) stays fixed.
- **loan**: money that is borrowed, from a bank for example, and that must be paid
  back.
- **amortise / amortisation**: repayment of the loan amount itself
  (the debt).
- **interest rate**: the interest expressed as a percentage of the debt.
- **straight-line amortisation**: the same amortisation amount is paid at each
  payment, so the interest (and with it the whole payment) decreases
  as the debt decreases.

## Formulas

::: formel "The chapter's formulas"
**Per cent, per mille and ppm**

$$
1\ \% = \frac{1}{100} = 0.01
\qquad
1\ \text{‰} = \frac{1}{1\,000} = 0.001
\qquad
1\ \text{ppm} = \frac{1}{1\,000\,000} = 0.000\,001
$$

**Proportion**

$$
\text{proportion} = \frac{\text{part}}{\text{whole}}
$$

where the proportion is given in fraction or decimal form (it can be converted to per cent,
per mille or ppm).

**Change factor**

$$
\text{change factor} = \frac{\text{new value}}{\text{old value}}
\quad\Longleftrightarrow\quad
\text{new value} = \text{change factor} \cdot \text{old value}
$$

where what you **compare with** corresponds to the old value.

**Total change factor in repeated changes**

$$
\text{total change factor}
= \text{change factor}_1 \cdot \text{change factor}_2 \cdot \ldots
$$

If all the change factors are equal (for example the same interest every year),
the total change factor becomes a power:

$$
\text{new value} = \text{old value} \cdot \text{change factor}^{\,n}
$$

where *n* = number of repetitions (for example number of years).

**Interest on loans**

$$
\text{annual interest} = \text{interest rate} \cdot \text{debt}
$$

where the interest rate is given in decimal form. If the loan is paid off monthly,
the annual interest is divided by 12:

$$
\text{interest per month} = \frac{\text{annual interest}}{12}
$$

**Payment on a loan**

$$
\text{payment} = \text{amortisation} + \text{interest}
$$
:::

## Important relationships and methods

- In a proportion calculation, the part and the whole must have **the same unit** before
  they are substituted into the formula. For example, convert kilograms to grams before you
  divide.
- The percentage triangle is a memory aid: if the quantities are next to each other
  they are to be multiplied, if they are above each other they are to be divided.
- The change factor is obtained by adding the change in percentage form to (for an
  increase) or subtracting it from (for a decrease) 100 %, and then rewriting it in
  decimal form: $+5\ \% \to 1.05$, $-25\ \% \to 0.75$.
- In comparisons ("how many per cent more/less"), what you
  **compare with** always corresponds to the old value. If you change what you compare with, you get
  a different percentage (18 kr against 22 kr does not give the same answer as 22 kr
  against 18 kr).
- An increase of $x\ \%$ followed by a decrease of $x\ \%$ does **not** give
  back the same value, since the decrease is calculated on an already
  changed (larger) amount.
- In repeated equal changes (for example the same interest year after year),
  the same change factor is multiplied by itself several times, which
  gives a power: the change factor raised to the number of periods.
- In a spreadsheet, a cell reference that is to stay unchanged in all
  rows is locked with dollar signs (`$B$12`), while a reference that is to change from
  row to row (`B2`) is left relative.
- In annual saving with a deposit each period, growth
  (multiplication by the change factor) and a new deposit (addition) are combined in
  the same cell formula, for example `=B2*1.028+5000`.
- With a loan you pay at each payment both **amortisation**
  (repayment of the debt) and **interest** (the cost of the loan); the interest
  is calculated on the debt that remains and therefore decreases over time with
  straight-line amortisation.
- If the interest is given as an annual rate but the payments are made monthly, the
  interest rate (or the calculated annual interest) must be divided by 12 before it is
  used in the monthly calculation.
- A column with all the payments is easily added up in the spreadsheet with
  the SUM function, for example `=SUM(D2:D61)`, to get the total cost of the loan.

## Figures worth remembering

The percentage triangle summarises the relationship between the part, the proportion and the
whole. Cover the quantity you are looking for, and the triangle shows the formula:

::: figur
<svg viewBox="16 6 288 152" width="342" height="181" xmlns="http://www.w3.org/2000/svg" font-family="Poppins, system-ui, sans-serif" role="img" aria-label="The percentage triangle: a triangle with the word part at the top and the words proportion times whole at the bottom, separated by a horizontal line. The part equals the proportion times the whole, the proportion is the part divided by the whole and the whole is the part divided by the proportion."><polygon points="160,10 20,150 300,150" fill="#fdfaf3" stroke="#1f2530" stroke-width="1.5"/><line x1="75" y1="95" x2="245" y2="95" stroke="#1f2530" stroke-width="1.5"/><text x="160" y="72" font-size="16" font-weight="600" text-anchor="middle" fill="#1f2530">part</text><text x="160" y="132" font-size="16" font-weight="600" text-anchor="middle" fill="#1f2530">proportion · whole</text></svg>

The triangle summarises: part = proportion · whole,
proportion = part/whole and whole = part/proportion.
:::

## Before the test

- Can you explain the difference between per cent, per mille and ppm, and convert
  between fraction form, decimal form and the different units?
- Can you find the proportion, the part or the whole when two of the three are
  known, for example with the help of the percentage triangle?
- Can you find a change factor from a percentage increase
  or decrease, and do you know that a decrease gives a factor less than 1?
- Can you use the change factor to calculate a new value
  directly, without intermediate steps?
- Do you know that in comparisons you always start from what you **compare with**
  as the "old value", and that the answer depends on which direction you compare in?
- Can you explain why an increase of $x\ \%$ followed by a decrease of
  the same $x\ \%$ does not give back the original value?
- Can you calculate a total change factor for several repeated
  changes, for example several years of saving at the same interest rate?
- Can you build a spreadsheet that calculates the balance in a savings account
  year by year, and do you know the difference between a relative (`B2`) and a locked
  (`$B$12`) cell reference?
- Can you build a spreadsheet for recurring saving where both
  growth and a new deposit are included in the same formula?
- Do you know the difference between amortisation and interest on a loan, and that
  the interest is calculated on the debt that remains?
- Can you convert an annual interest rate to a monthly interest rate and set up a
  spreadsheet that shows debt, interest and payment month by month with
  straight-line amortisation?
- Can you add up a column in a spreadsheet, for example with the SUM function,
  to get the total cost of the loan?
