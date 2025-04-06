import { z } from "zod";
import { procedure, router } from "../trpc";

let todos = [
  { id: 1, title: "Buy milk", completed: false },
  { id: 2, title: "Buy bread", completed: false },
  {
    id: 3,
    title: "Buy coffee" + new Date().toISOString(),
    completed: false,
  },
];

const todosRouter = router({
  list: procedure.query(async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return [
      ...todos,
      {
        id: 3,
        title: "Buy coffee" + new Date().toISOString(),
        completed: false,
      },
    ];
  }),
  create: procedure
    .input(
      z.object({ id: z.number(), title: z.string(), completed: z.boolean() }),
    )
    .mutation(async ({ input }) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      todos.push(input);
      return input;
    }),
});

export const appRouter = router({
  todos: todosRouter,
  hello: procedure
    .input(
      z.object({
        text: z.string(),
      }),
    )
    .query(async (opts) => {
      await new Promise((resolve) => setTimeout(resolve, 15000));

      return {
        greeting: `hello ${opts.input.text}`,
      };
    }),
});
// export type definition of API
export type AppRouter = typeof appRouter;
