// Copyright 2023 Ziad Malik

import * as cheerio from "cheerio";

function extractDateFromString(inputString) {
  // Get the current year
  const currentYear = new Date().getFullYear();

  // Extract the day and month from the input string
  const match = inputString.match(/(\d{1,2})\.(\d{1,2})\./);

  if (match) {
    // Extracted day and month
    const day = parseInt(match[1]);
    const month = parseInt(match[2]) - 1; // Subtract 1 to adjust for zero-based months

    // Create a Date object with the extracted day, month, and current year
    const dateObject = new Date(currentYear, month, day);

    return dateObject;
  }

  // Return null if no valid date was found in the input string
  return null;
}

export default async function parse() {
    const baseUrl = "https://www.lst.inf.ethz.ch/education/einfuehrung-in-die-programmierung-i--252-0027-1/_jcr_content/par/accordion/accordionitem_753370236/par/table.tableComp.json";
    const website = "https://www.lst.inf.ethz.ch/education/einfuehrung-in-die-programmierung-i--252-0027-1.html"
    const res = await fetch(baseUrl)

    if (!res.ok) {
        console.log('Response not OK');
        return;
    }

    const exercises = [];

    const tableContents = await res.json();
    tableContents.tbody.rows.forEach(row => {

        const content = row.cells[0].content;

        if (!content.includes("href")) {
            return;
        }


        const $ = cheerio.load(content);

        // Regular expression to match "Übung N" where N is a digit(s)
        const regex = /Übung \d+/;

        const exerciseName = $('a').text().match(regex)[0];
        const exercisePDF = $('a').attr('href');

        exercises.push({
            exerciseName,
            exercisePDF,
            solutionPDF: null,
            bonusLink: null,
            dueDate: extractDateFromString(row.cells[2].content),
        })
    })

    return { 
        exercises,
        website,
        video: "https://video.ethz.ch/lectures/d-infk/2023/autumn/252-0027-00L.html",
    };
};
