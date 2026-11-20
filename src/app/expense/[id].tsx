import EmptyState from "@/components/EmptyState";
import ExpenseDetails from "@/components/ExpenseDetails";
import { getExpense } from "@/data/api";
import { Stack, useLocalSearchParams } from "expo-router";

export default function ExpenseDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const expense = getExpense(id);

  if (!expense) {
    return (
      <>
        <Stack.Screen options={{ title: "Not found" }} />
        <EmptyState
          title="Expense not found"
          message="It may have been deleted, or the link is wrong."
        />
      </>
    );
  }

  return (
    <>
      <Stack.Screen options={{ title: expense.title }} />
      <ExpenseDetails expense={expense} />
    </>
  );
}
