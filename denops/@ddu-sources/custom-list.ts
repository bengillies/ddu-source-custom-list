import { BaseSource, Item } from "https://deno.land/x/ddu_vim@v2.0.0/types.ts";
import { Denops } from "https://deno.land/x/ddu_vim@v2.0.0/deps.ts";

import { ActionData } from "../@ddu-kinds/custom-list.ts";

type Params = {
  cmdList: { name: string, cmd: string }[];
  callbackId: string;
};

export class Source extends BaseSource<Params> {
  kind = "custom-list";

  gather(args: {
    denops: Denops;
    sourceParams: Params;
  }): ReadableStream<Item<ActionData>[]> {
    return new ReadableStream({
      start(controller) {
        controller.enqueue(args.sourceParams.cmdList.map(({ name, cmd }) => {
          return {
            word: name,
            action: {
              name: name,
              cmd: cmd,
              callbackId: args.sourceParams.callbackId,
            },
          };
        }));

        controller.close();
      },
    });
  }

  params(): Params {
    return {
      cmdList: [],
      callbackId: "",
    };
  }
}
