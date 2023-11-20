import DotenvExpand from "dotenv-expand";
import DotenvFlow from "dotenv-flow";
import { Cli } from "kysely-codegen";

DotenvExpand.expand(DotenvFlow.config());

async function start() {
  const cli = new Cli();

  await cli.run(process.argv);
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
start();
