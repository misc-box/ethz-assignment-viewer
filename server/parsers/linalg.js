// Copyright 2023 Ziad Malik

import * as cheerio from "cheerio";

export default async function parse() {
    const baseUrl = "https://ti.inf.ethz.ch/ew/courses/LA23/index.html";
    const res = await fetch(baseUrl)

    if (!res.ok) {
        console.log('Response not OK');
        return;
    }

    const html = await res.text();

    const $ = cheerio.load(html);
    // const exercises = [];
    // Initialize an array to store the data for each row
    const rows = [];

    // Iterate through each table row in the tbody
    $('table tbody tr').each((index, element) => {
        if (element.children.length < 2) {
            return;
        }

        const columns = $(element).find('td');

        const exerciseName = $(columns[4]).find('a').text();
        const exercisePDF = $(columns[4]).find('a').attr('href');
        const solutionPDF = $(columns[5]).find('a').attr('href');
        const bonusLink = $(columns[6]).find('a').attr('href');

        // Create an object for the row and push it to the array
        rows.push({
            exerciseName,
            exercisePDF,
            solutionPDF,
            bonusLink,
        });
    });

    const exercises = rows.filter(e => e.exerciseName && e.exercisePDF);

    return exercises;
};