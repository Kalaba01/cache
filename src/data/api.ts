import type { Expense } from "@/types";
import { expenses } from "./expenses";

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function fetchExpenses(
  options: { fail?: boolean } = {},
): Promise<Expense[]> {
  await wait(800);
  if (options.fail) throw new Error("Could not load expenses");
  return expenses;
}
