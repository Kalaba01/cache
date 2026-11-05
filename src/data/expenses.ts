import type { Expense } from "@/types";

export const expenses: Expense[] = [
  {
    id: "1",
    title: "Groceries",
    amount: 23.4,
    category: "Food",
    date: "2026-10-23",
    note: "Weekly shopping",
  },
  {
    id: "2",
    title: "Bus ticket",
    amount: 1.8,
    category: "Transport",
    date: "2026-10-23",
  },
  {
    id: "3",
    title: "Lunch",
    amount: 6,
    category: "Food",
    date: "2026-10-22",
  },
  {
    id: "4",
    title: "Coffee",
    amount: 3.5,
    category: "Food",
    date: "2026-10-22",
  },
  {
    id: "5",
    title: "Phone bill",
    amount: 30,
    category: "Bills",
    date: "2026-10-21",
  },
  {
    id: "6",
    title: "Notebook",
    amount: 12.5,
    category: "Shopping",
    date: "2026-10-21",
    note: "For the faculty",
  },
];
