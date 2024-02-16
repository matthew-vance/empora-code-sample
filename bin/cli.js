#!/usr/bin/env node
import "dotenv/config";

import { run } from "../dist/cli/cli.js";

await run();
