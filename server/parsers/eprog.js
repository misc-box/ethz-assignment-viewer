// Copyright 2023 Ziad Malik

import * as cheerio from "cheerio";

export default async function parse() {
    const baseUrl = "https://www.lst.inf.ethz.ch/education/einfuehrung-in-die-programmierung-i--252-0027-1/_jcr_content/par/accordion/accordionitem_753370236/par/table.tableComp.json";
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
        })
    })

    return exercises;
};
parse()