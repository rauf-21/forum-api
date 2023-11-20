import DotenvExpand from "dotenv-expand";
import DotenvFlow from "dotenv-flow";
import { promises as fs } from "fs";
import { FileMigrationProvider, Migrator } from "kysely";
import { run } from "kysely-migration-cli";
import * as path from "path";

import { db } from "../src/infrastructures/database/postgres/db";

DotenvExpand.expand(DotenvFlow.config());

(() => {
  const migrator = new Migrator({
    db,
    provider: new FileMigrationProvider({
      fs,
      path,
      migrationFolder: path.join(__dirname, "../migrations"),
    }),
  });

  run(db, migrator);
})();
