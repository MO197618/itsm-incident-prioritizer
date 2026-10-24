import test from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";

test("incident prioritizer returns valid incident priorities", () => {
const output = execFileSync("node", ["index.js"], {
encoding: "utf8"
});

const incidents = JSON.parse(output);

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
const output = execFileSync("node", ["index.js"], {
encoding: "utf8"
});

const incidents = JSON.parse(output);
const criticalIncident = incidents.find(
incident => incident.number === "INC1001"
);

assert.ok(criticalIncident);
assert.equal(criticalIncident.priority, "P1");
});
