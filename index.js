function prioritizeIncident(incident) {
const { impact, urgency } = incident;

if (!impact || !urgency) {
throw new Error("Impact and urgency are required.");
}

const matrix = {
High: { High: "P1", Medium: "P2", Low: "P3" },
Medium: { High: "P2", Medium: "P3", Low: "P4" },
Low: { High: "P3", Medium: "P4", Low: "P4" }
};

if (!matrix[impact] || !matrix[impact][urgency]) {
throw new Error("Impact and urgency must be High, Medium, or Low.");
}

return {
incident: incident.description,
impact,
urgency,
priority: matrix[impact][urgency]
};
}

const incident = {
description: "Company email service is unavailable",
impact: "High",
urgency: "High"
};

console.log(JSON.stringify(prioritizeIncident(incident), null, 2));
