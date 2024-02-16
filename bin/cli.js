#!/usr/bin/env node
import "dotenv/config";

import { run } from "../dist/cli/cli.js";

console.time("execution time");
await run();
console.timeEnd("execution time");
