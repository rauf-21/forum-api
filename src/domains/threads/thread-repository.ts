import { Selectable } from "kysely";
import { Threads } from "kysely-codegen";

import { AddedThread } from "./entities/added-thread";
import { NewThread } from "./entities/new-thread";

type Thread = Selectable<Threads>;

export interface ThreadRepository {
  addThread(newThread: NewThread): Promise<AddedThread>;
  verifyThreadIsExists(id: string): Promise<void>;
  getThreadById(id: string): Promise<Thread>;
}
