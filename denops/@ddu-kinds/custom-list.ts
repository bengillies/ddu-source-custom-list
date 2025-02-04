import {
  ActionFlags,
  Actions,
  BaseKind,
  DduItem,
} from "https://deno.land/x/ddu_vim@v2.0.0/types.ts";
import { Denops } from "https://deno.land/x/ddu_vim@v2.0.0/deps.ts";

export type ActionData = {
  name: string;
  cmd: string;
  callbackId: string;
};

type Params = Record<never, never>;

export class Kind extends BaseKind<Params> {
  actions: Actions<Params> = {
    callback: async (args: { denops: Denops; items: DduItem[] }) => {
      for (const item of args.items) {
        const action = item?.action as ActionData;
        await args.denops.call(
          "denops#callback#call",
          action.callbackId,
          action.cmd,
        );
      }

      return Promise.resolve(ActionFlags.None);
    },
  };

  params(): Params {
    return {};
  }
}
