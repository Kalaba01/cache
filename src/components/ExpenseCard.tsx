import type { Expense } from "@/types";
import { Pressable, StyleSheet, Text } from "react-native";

type ExpenseCardProps = {
  expense: Expense;
};

export default function ExpenseCard({ expense }: ExpenseCardProps) {
  return (
    <Pressable
      onPress={() => console.log("Open", expense.id)}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
    >
      <Text style={styles.title}>{expense.title}</Text>
      <Text style={styles.details}>
        {expense.category} · {expense.date} · {expense.amount.toFixed(2)} KM
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    gap: 4,
    borderRadius: 12,
    backgroundColor: "#E6EEF7",
  },
  pressed: { opacity: 0.6 },
  title: { fontSize: 16, fontWeight: "bold" },
  details: { color: "#5B6475" },
});
