import test from "node:test";
import assert from "node:assert/strict";
import { questions, roles } from "../src/content.js";
import { scoreAnswers } from "../src/scoring.js";

const dimensionKeys = ["energy", "pressure", "direction", "connection"];

// Build valid selections through the public answer format.
function answersForTotals(totals) {
  const remaining = Object.fromEntries(
    dimensionKeys.map((key, index) => [key, totals[index]]),
  );
  return Object.fromEntries(
    questions.map((question, index) => {
      const score = Math.min(3, remaining[question.dimension]);
      remaining[question.dimension] -= score;
      const choice = question.options.findIndex(
        (option) => option.score === score,
      );
      assert.notEqual(
        choice,
        -1,
        `No valid option for ${question.id}, score ${score}`,
      );
      return [index, choice];
    }),
  );
}

function metrics(result) {
  return Object.fromEntries(
    result.metrics.map(({ key, value }) => [key, value]),
  );
}

test("the question model covers all four dimensions with three questions each", () => {
  assert.equal(questions.length, 12);
  assert.equal(new Set(questions.map((question) => question.id)).size, 12);
  for (const key of dimensionKeys) {
    const group = questions.filter((question) => question.dimension === key);
    assert.equal(group.length, 3, key);
    for (const question of group)
      assert.deepEqual(
        question.options.map((option) => option.score),
        [0, 1, 2, 3],
      );
  }
});

test("all eight state creatures are reachable from valid answers", async (t) => {
  const cases = [
    ["night-owl", [1, 9, 6, 6]],
    ["jellyfish", [1, 4, 6, 6]],
    ["cactus", [9, 9, 9, 0]],
    ["snail", [9, 0, 0, 9]],
    ["potato", [0, 0, 6, 6]],
    ["cat", [9, 0, 6, 0]],
    ["duck", [9, 6, 6, 6]],
    ["sprout", [6, 0, 6, 6]],
  ];
  assert.deepEqual(
    new Set(cases.map(([id]) => id)),
    new Set(roles.map((role) => role.id)),
  );
  for (const [id, totals] of cases) {
    await t.test(id, () => {
      const result = scoreAnswers(answersForTotals(totals));
      assert.equal(result.role.id, id);
      assert.equal(result.evidence.length, 3);
      assert.ok(
        result.evidence.every(
          (text) => typeof text === "string" && text.length > 0,
        ),
      );
    });
  }
});

test("dimension values normalize to 0–100 with rounded boundaries", () => {
  assert.deepEqual(metrics(scoreAnswers(answersForTotals([0, 0, 0, 0]))), {
    energy: 0,
    pressure: 0,
    direction: 0,
    connection: 0,
  });
  assert.deepEqual(metrics(scoreAnswers(answersForTotals([9, 9, 9, 9]))), {
    energy: 100,
    pressure: 100,
    direction: 100,
    connection: 100,
  });
  assert.deepEqual(metrics(scoreAnswers(answersForTotals([1, 3, 4, 5]))), {
    energy: 11,
    pressure: 33,
    direction: 44,
    connection: 56,
  });
  assert.deepEqual(metrics(scoreAnswers(answersForTotals([6, 7, 8, 2]))), {
    energy: 67,
    pressure: 78,
    direction: 89,
    connection: 22,
  });
});

test("rule overlaps respect the documented first-match order", () => {
  const overlaps = [
    ["night-owl", [1, 9, 6, 0]], // owl and cactus
    ["cactus", [9, 9, 0, 0]], // cactus and snail
    ["jellyfish", [1, 4, 0, 9]], // jellyfish and snail
    ["snail", [0, 0, 0, 6]], // snail and potato
    ["cat", [9, 5, 6, 0]], // cat and duck at pressure 56
  ];
  for (const [id, totals] of overlaps)
    assert.equal(scoreAnswers(answersForTotals(totals)).role.id, id);
});

test("missing or inherited answers cannot silently become a result", () => {
  for (const input of [undefined, null, true, 1, "answers"]) {
    assert.throws(() => scoreAnswers(input), TypeError);
  }
  for (const input of [{}, [], { 0: 0 }])
    assert.throws(() => scoreAnswers(input), RangeError);

  const complete = answersForTotals([6, 0, 6, 6]);
  const missing = { ...complete };
  delete missing[7];
  assert.throws(() => scoreAnswers(missing), /第 8 道题/);

  const inherited = Object.create({ 7: complete[7] });
  Object.assign(inherited, missing);
  assert.throws(() => scoreAnswers(inherited), /第 8 道题/);
});

test("each answer must be an integer index for a real option", () => {
  const complete = answersForTotals([6, 0, 6, 6]);
  for (const invalid of [-1, 4, 1.5, "1", NaN, Infinity, null, undefined]) {
    assert.throws(() => scoreAnswers({ ...complete, 4: invalid }), /第 5 道题/);
  }
  const arrayAnswers = questions.map((_, index) => complete[index]);
  assert.deepEqual(scoreAnswers(arrayAnswers), scoreAnswers(complete));
});

test("scoring is deterministic and leaves answers and shared content unchanged", () => {
  const answers = Object.freeze(answersForTotals([1, 9, 6, 6]));
  const originalAnswers = structuredClone(answers);
  const originalContent = structuredClone({ questions, roles });
  const first = scoreAnswers(answers);
  assert.deepEqual(scoreAnswers(answers), first);
  assert.deepEqual(answers, originalAnswers);
  assert.deepEqual({ questions, roles }, originalContent);

  // Consumers can annotate their own result without changing future results.
  first.role.name = "locally changed";
  first.role.tags.push("local-only");
  first.metrics[0].value = -100;
  first.evidence[0] = "local-only";
  const fresh = scoreAnswers(answers);
  assert.deepEqual(fresh, scoreAnswers(originalAnswers));
  assert.deepEqual({ questions, roles }, originalContent);
  assert.equal(
    fresh.role.name,
    roles.find((role) => role.id === fresh.role.id).name,
  );
  assert.ok(!fresh.role.tags.includes("local-only"));
  assert.ok(
    fresh.metrics.every((metric) => metric.value >= 0 && metric.value <= 100),
  );
  assert.notEqual(fresh.evidence[0], "local-only");
});
