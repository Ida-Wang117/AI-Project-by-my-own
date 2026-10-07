import test from "node:test";
import assert from "node:assert/strict";
import {
  getContent,
  normalizeLanguage,
  readLanguage,
  createShareUrl,
} from "../src/i18n.js";

const han = /\p{Script=Han}/u;

function assertEnglishText(value, field) {
  assert.equal(typeof value, "string", field);
  assert.ok(value.trim().length > 0, `${field} must not be empty`);
  assert.ok(!han.test(value), `${field} contains Chinese text: ${value}`);
}

test("translated questions preserve answer meaning, scores and order", () => {
  const zh = getContent("zh");
  const en = getContent("en");
  assert.equal(en.questions.length, zh.questions.length);
  for (const [index, question] of en.questions.entries()) {
    const original = zh.questions[index];
    assert.deepEqual(
      Object.keys(question).sort(),
      Object.keys(original).sort(),
    );
    assert.equal(question.id, original.id);
    assert.equal(question.dimension, original.dimension);
    assertEnglishText(question.title, `${question.id}.title`);
    assertEnglishText(question.aside, `${question.id}.aside`);
    assert.equal(question.options.length, original.options.length);
    for (const [optionIndex, option] of question.options.entries()) {
      assert.equal(option.score, original.options[optionIndex].score);
      assertEnglishText(option.text, `${question.id}.options[${optionIndex}]`);
    }
  }
});

test("English creatures keep stable identities and translate every required copy field", () => {
  const zh = getContent("zh");
  const en = getContent("en");
  assert.equal(en.roles.length, zh.roles.length);
  const textFields = [
    "name",
    "en",
    "tagline",
    "roast",
    "description",
    "comfort",
    "tinyAction",
    "systemNotice",
    "doNot",
  ];
  for (const [index, role] of en.roles.entries()) {
    const original = zh.roles[index];
    assert.deepEqual(Object.keys(role).sort(), Object.keys(original).sort());
    for (const field of ["id", "color", "statusCode"]) {
      assert.equal(role[field], original[field], `${role.id}.${field}`);
    }
    for (const field of textFields)
      assertEnglishText(role[field], `${role.id}.${field}`);
    assert.equal(role.tags.length, original.tags.length);
    assert.ok(role.tags.length > 0);
    for (const [tagIndex, tag] of role.tags.entries())
      assertEnglishText(tag, `${role.id}.tags[${tagIndex}]`);
  }
});

test("English life contexts preserve identities and translate labels", () => {
  const zh = getContent("zh");
  const en = getContent("en");
  assert.equal(en.contextOptions.length, zh.contextOptions.length);
  for (const [index, context] of en.contextOptions.entries()) {
    assert.equal(context.id, zh.contextOptions[index].id);
    assert.equal(context.emoji, zh.contextOptions[index].emoji);
    assertEnglishText(context.label, `${context.id}.label`);
  }
});

test("URL and saved language values only accept supported identifiers", () => {
  assert.equal(normalizeLanguage("zh"), "zh");
  assert.equal(normalizeLanguage("en"), "en");
  for (const invalid of [
    undefined,
    null,
    "",
    "fr",
    "EN",
    "zh-CN",
    "en-US",
    " zh ",
    1,
    {},
  ]) {
    assert.equal(normalizeLanguage(invalid), null);
  }
});

test("language precedence is valid URL, saved preference, then browser language", () => {
  const cases = [
    [{ search: "?lang=en", stored: "zh", browserLanguage: "zh-CN" }, "en"],
    [{ search: "?lang=zh", stored: "en", browserLanguage: "en-GB" }, "zh"],
    [
      { search: "?r=cat&lang=fr", stored: "zh", browserLanguage: "en-US" },
      "zh",
    ],
    [{ search: "?lang=", stored: "en", browserLanguage: "zh-TW" }, "en"],
    [{ search: "", stored: "invalid", browserLanguage: "zh-Hans-CN" }, "zh"],
    [{ search: "?r=duck", stored: null, browserLanguage: "ZH-TW" }, "zh"],
    [{ search: "", stored: null, browserLanguage: "fr-FR" }, "en"],
    [{ search: "", stored: null, browserLanguage: "en-GB" }, "en"],
    [{}, "en"],
  ];
  for (const [input, expected] of cases)
    assert.equal(readLanguage(input), expected, JSON.stringify(input));
});

test("share links keep language and creature while dropping private query and hash", () => {
  const href =
    "https://example.com/AI-Project-by-my-own/?lang=zh&r=snail&answers=private&context=student&utm_source=test#private-note";
  const output = createShareUrl(href, "en", "night-owl");
  assert.equal(typeof output, "string");
  const url = new URL(output);
  assert.equal(url.origin, "https://example.com");
  assert.equal(url.pathname, "/AI-Project-by-my-own/");
  assert.equal(url.hash, "");
  assert.equal(url.searchParams.get("lang"), "en");
  assert.equal(url.searchParams.get("r"), "night-owl");
  assert.deepEqual(new Set(url.searchParams.keys()), new Set(["lang", "r"]));
  assert.equal([...url.searchParams].length, 2);

  const home = new URL(createShareUrl(href, "zh"));
  assert.equal(home.search, "?lang=zh");
  assert.equal(home.hash, "");
  assert.equal(
    new URL(createShareUrl(href, "invalid", null)).search,
    "?lang=en",
  );
});
