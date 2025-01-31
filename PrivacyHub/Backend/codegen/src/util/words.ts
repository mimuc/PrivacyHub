/**
 * @license
 * Copyright 2022-2024 Matter.js Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import { readFileSync } from "fs";
import wordListPath from "word-list";

export const Words = new Set(readFileSync(wordListPath, "utf-8").split("\n"));

Words.add("namespace");

// Acronym for "micro reciprocal degree" used by color cluster
Words.add("mireds");
