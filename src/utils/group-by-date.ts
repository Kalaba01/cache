import type { Expense } from "@/types";

export type DaySection = {
  title: string;
  total: number;
  data: Expense[];
};

export function groupByDate(list: Expense[]): DaySection[] {
  const groups: Record<string, Expense[]> = {};

  for (const expense of list) {
    groups[expense.date] = [...(groups[expense.date] ?? []), expense];
  }

  return Object.keys(groups)
    .sort((a, b) => b.localeCompare(a))
    .map((date) => ({
      title: date,
      total: groups[date].reduce((sum, e) => sum + e.amount, 0),
      data: groups[date],
    }));
}
