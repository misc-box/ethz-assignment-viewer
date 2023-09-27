// Copyright 2023 Ziad Malik

import linalg from "../parsers/linalg";
import cadmo from "../parsers/cadmo";
import eprog from "../parsers/eprog";

export default defineEventHandler(async event => {
    return {
        "Lineare Algebra": await linalg(),
        "Algorithmen und Datenstrukturen": await cadmo(),
        "Einführung in die Programmierung": await eprog(),
    };
});