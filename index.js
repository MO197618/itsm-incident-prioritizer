
import { readFileSync } from "node:fs";

function prioritizeIncident(incident) {
const { impact, urgency } = incident;

const matrix = {
High: {
High: "P1",
Medium: "P2",
Low: "P3"
},
Medium: {
High: "P2",
Medium: "P3",
Low: "P4"
},
Low: {
High: "P3",
Medium: "P4",
Low: "P4"
}
};

if (
!matrix[impact] ||
!matrix[impact][urgency]
) {
throw new Error(
`Invalid impact or urgency for incident ${incident.number}`
);
}

const priority = matrix[impact][urgency];

return {
number: incident.number,
description: incident.description,
impact,
urgency,
priority,
reason: `${impact} impact + ${urgency} urgency = ${priority}`
};
}

const incidents = JSON.parse(
readFileSync("incidents.json", "utf8")
);

const results = incidents.map(prioritizeIncident);

console.log(JSON.stringify(results, null, 2));
