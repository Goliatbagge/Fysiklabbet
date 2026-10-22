---
kalla: 2fd785ec24
id: ma1c-3.4
title: Saving and interest calculations
course: Matematik nivå 1c
chapter: Procentuella förändringar
chapterNumber: 3
section: '3.4'
---

# Saving and interest calculations

When you deposit money in an account you lend your money to the bank
(which in turn lends your money to others and earns on
the difference). As payment for the loan,
the bank can pay you a certain fee called **interest**. The interest is given in kronor or as a
percentage of what you have in the account. The **annual interest rate** states by what percentage the amount in the account
grows each year. If a task just says "interest", it is understood to mean
the *annual interest rate*. The amount in the account is called the **balance**.

If we want to find out the balance in an account each year quickly, we can
use a **spreadsheet**, for example Google Sheets or Microsoft Excel.

A spreadsheet is built up of boxes called **cells**. Each cell has
a name consisting of a letter and a number. Every cell in
column A begins with the letter A and every cell in row 1 ends
with the number 1. So the cell in column A in row 1 is called A1. The cell in column C
in row 5 is called C5.

::: figur
<svg viewBox="26 11 371 207" width="542" height="303" font-family="Poppins, system-ui, sans-serif" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A spreadsheet with the columns A to D and the rows 1 to 5. Each cell has its name written out. Column C and row 5 are highlighted, and the cell where they meet is called C5.">
  <rect x="76" y="36" width="318" height="154" fill="#ffffff"/>
  <rect x="76" y="36" width="318" height="24" fill="#f1f3f4"/>
  <rect x="76" y="36" width="30" height="154" fill="#f1f3f4"/>
  <rect x="250" y="60" width="72" height="130" fill="#1a73e8" fill-opacity="0.12"/>
  <rect x="106" y="164" width="288" height="26" fill="#e37400" fill-opacity="0.14"/>
  <rect x="250" y="36" width="72" height="24" fill="#d3e3fd"/>
  <rect x="76" y="164" width="30" height="26" fill="#fde3c4"/>
  <line x1="106" y1="36" x2="106" y2="190" stroke="#b6b9bc" stroke-width="1"/>
  <line x1="178" y1="36" x2="178" y2="190" stroke="#b6b9bc" stroke-width="1"/>
  <line x1="250" y1="36" x2="250" y2="190" stroke="#b6b9bc" stroke-width="1"/>
  <line x1="322" y1="36" x2="322" y2="190" stroke="#b6b9bc" stroke-width="1"/>
  <line x1="394" y1="36" x2="394" y2="190" stroke="#b6b9bc" stroke-width="1"/>
  <line x1="76" y1="36" x2="76" y2="190" stroke="#b6b9bc" stroke-width="1"/>
  <line x1="76" y1="60" x2="394" y2="60" stroke="#b6b9bc" stroke-width="1"/>
  <line x1="76" y1="86" x2="394" y2="86" stroke="#b6b9bc" stroke-width="1"/>
  <line x1="76" y1="112" x2="394" y2="112" stroke="#b6b9bc" stroke-width="1"/>
  <line x1="76" y1="138" x2="394" y2="138" stroke="#b6b9bc" stroke-width="1"/>
  <line x1="76" y1="164" x2="394" y2="164" stroke="#b6b9bc" stroke-width="1"/>
  <line x1="76" y1="190" x2="394" y2="190" stroke="#b6b9bc" stroke-width="1"/>
  <line x1="76" y1="36" x2="394" y2="36" stroke="#b6b9bc" stroke-width="1"/>
  <text x="142" y="52.5" font-size="12" text-anchor="middle" fill="#5f6368">A</text>
  <text x="214" y="52.5" font-size="12" text-anchor="middle" fill="#5f6368">B</text>
  <text x="286" y="52.5" font-size="12" text-anchor="middle" fill="#0b57d0" font-weight="700">C</text>
  <text x="358" y="52.5" font-size="12" text-anchor="middle" fill="#5f6368">D</text>
  <text x="91" y="77.5" font-size="12" text-anchor="middle" fill="#5f6368">1</text>
  <text x="91" y="103.5" font-size="12" text-anchor="middle" fill="#5f6368">2</text>
  <text x="91" y="129.5" font-size="12" text-anchor="middle" fill="#5f6368">3</text>
  <text x="91" y="155.5" font-size="12" text-anchor="middle" fill="#5f6368">4</text>
  <text x="91" y="181.5" font-size="12" text-anchor="middle" fill="#a14f00" font-weight="700">5</text>
  <text x="142" y="77.5" font-size="12" text-anchor="middle" fill="#80868b">A1</text>
  <text x="214" y="77.5" font-size="12" text-anchor="middle" fill="#80868b">B1</text>
  <text x="286" y="77.5" font-size="12" text-anchor="middle" fill="#80868b">C1</text>
  <text x="358" y="77.5" font-size="12" text-anchor="middle" fill="#80868b">D1</text>
  <text x="142" y="103.5" font-size="12" text-anchor="middle" fill="#80868b">A2</text>
  <text x="214" y="103.5" font-size="12" text-anchor="middle" fill="#80868b">B2</text>
  <text x="286" y="103.5" font-size="12" text-anchor="middle" fill="#80868b">C2</text>
  <text x="358" y="103.5" font-size="12" text-anchor="middle" fill="#80868b">D2</text>
  <text x="142" y="129.5" font-size="12" text-anchor="middle" fill="#80868b">A3</text>
  <text x="214" y="129.5" font-size="12" text-anchor="middle" fill="#80868b">B3</text>
  <text x="286" y="129.5" font-size="12" text-anchor="middle" fill="#80868b">C3</text>
  <text x="358" y="129.5" font-size="12" text-anchor="middle" fill="#80868b">D3</text>
  <text x="142" y="155.5" font-size="12" text-anchor="middle" fill="#80868b">A4</text>
  <text x="214" y="155.5" font-size="12" text-anchor="middle" fill="#80868b">B4</text>
  <text x="286" y="155.5" font-size="12" text-anchor="middle" fill="#80868b">C4</text>
  <text x="358" y="155.5" font-size="12" text-anchor="middle" fill="#80868b">D4</text>
  <text x="142" y="181.5" font-size="12" text-anchor="middle" fill="#80868b">A5</text>
  <text x="214" y="181.5" font-size="12" text-anchor="middle" fill="#80868b">B5</text>
  <text x="286" y="181.5" font-size="12" text-anchor="middle" fill="currentColor" font-weight="700">C5</text>
  <text x="358" y="181.5" font-size="12" text-anchor="middle" fill="#80868b">D5</text>
  <rect x="250" y="164" width="72" height="26" fill="none" stroke="#1a73e8" stroke-width="2.5"/>
  <line x1="286" y1="26" x2="286" y2="35" stroke="currentColor" stroke-width="1.2"/>
  <text x="286" y="22" font-size="13" text-anchor="middle" fill="currentColor">Column C</text>
  <line x1="66" y1="177" x2="75" y2="177" stroke="currentColor" stroke-width="1.2"/>
  <text x="62" y="181.5" font-size="13" text-anchor="end" fill="currentColor">Row 5</text>
  <line x1="286" y1="191.5" x2="286" y2="200" stroke="currentColor" stroke-width="1.2"/>
  <text x="286" y="214" font-size="13" text-anchor="middle" fill="currentColor">Cell C5</text>
</svg>

The columns are denoted by letters and the rows by numbers. The cell where column C and row 5 meet is called C5.
:::

If we are to enter calculations in a cell, the formula in the cell always begins
with an equals sign, =.

::: exempel "Example 1: Savings account in a spreadsheet"
**You deposit money in an account. Use a spreadsheet and calculate
the balance in the account each year up to and including year 8 if you<br>
a) deposit 30 000 kr at the interest rate 3.5 %<br>
b) deposit 40 000 kr at the interest rate 3.5 %<br>
c) deposit 40 000 kr at the interest rate 4.5 %**

::: textlosning
**a)** We open a spreadsheet and do the calculation in three steps. Click
through the steps one at a time in the spreadsheet below. Below the sheet it is explained what happens in each step.

::: minisim
typ: kalkylblad
:::

**Answer:** The balance each year is in column B of the spreadsheet. After
8 years it is 39 504.27 kr.

**b)** We start from the spreadsheet in a) and click through the steps.

::: minisim
typ: kalkylblad
scen: sparkonto-b
:::

**Answer:** After 8 years the balance is 52 672.36 kr.

**c)** We start from the spreadsheet in b) and click through the steps.

::: minisim
typ: kalkylblad
scen: sparkonto-c
:::

**Answer:** After 8 years the balance is 56 884.02 kr.
:::
:::

::: exempel "Example 2: Annual saving"
**You deposit 5 000 kr at the end of each year in an account with 2.8 %
interest. What is the balance in the account directly after the 10th deposit?**

::: textlosning
We open a spreadsheet and do the calculation in three steps. Click through
the steps one at a time in the spreadsheet below. Below the sheet it is explained what happens in each step.

::: minisim
typ: kalkylblad
scen: arligt
:::

**Answer:** 56 794.24 kr
:::
:::

::: sammanfattning "Summary"

::: sampunkt "The concepts"
- **Interest**: how much the money grows.
- **Annual interest rate**: the interest per year. If it just says "interest", the **annual interest rate** is meant.
- **Balance**: the amount in the account.
:::

::: sampunkt "A deposited amount that grows"
- Use the change factor raised to the number of years:
  $\text{balance} = K \cdot \mathit{cf}^{\,n}$.
- $30\,000$ kr at 3.5 % interest for 8 years becomes
  $30\,000 \cdot 1.035^{8}$.
:::

::: sampunkt "Annual saving"
- If an amount is deposited **every** year, each deposit grows for a different length of time.
- The first deposit has time to grow for the most years, the last for no time at all.
- Add up the deposits' amounts one by one, or use a
  spreadsheet.
:::

::: sampunkt "Spreadsheets"
- A spreadsheet is built of **cells**, named with a column letter and
  a row number: A1, C5.
- A formula in a cell **always begins with an equals sign**.
- Write the formula once and drag it down, and all the years are calculated automatically.
:::
:::
