
import test from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";

function getIncidents() {
const output = execFileSync("node", ["index.js"], {
encoding: "utf8"
});

return JSON.parse(output);
}

test("incident prioritizer returns valid incidents", () => {
const incidents = getIncidents();

assert.ok(Array.isArray(incidents));
assert.ok(incidents.length > 0);

for (const incident of incidents) {
assert.ok(incident.number);
assert.ok(incident.description);
assert.ok(["P1", "P2", "P3", "P4"].includes(incident.priority));
assert.ok(incident.reason);
}
});

test("high impact and high urgency produce P1", () => {
const incidents = getIncidents();
const incident = incidents.find(item => item.number === "INC1001");

assert.ok(incident);
assert.equal(incident.priority, "P1");
});

test("low impact and medium urgency produce P4", () => {
const incidents = getIncidents();
const incident = incidents.find(item => item.number === "INC1002");

assert.ok(incident);
assert.equal(incident.priority, "P4");
});

test("medium impact and medium urgency produce P3", () => {
const incidents = getIncidents();
const incident = incidents.find(item => item.number === "INC1003");

assert.ok(incident);
assert.equal(incident.priority, "P3");
});
