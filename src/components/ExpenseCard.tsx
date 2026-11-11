import { FontSize, Radius, Spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import type { Expense } from "@/types";
import { Pressable, StyleSheet, Text } from "react-native";

type ExpenseCardProps = {
  expense: Expense;
};

export default function ExpenseCard({ expense }: ExpenseCardProps) {
  const theme = useTheme();

  return (
    <Pressable
      onPress={() => console.log("Open", expense.id)}
      style={({ pressed }) => [
        styles.card,
        { backgroundColor: theme.card, borderColor: theme.border },
        pressed && styles.pressed,
      ]}
    >
      <Text style={[styles.title, { color: theme.text }]} numberOfLines={1}>
        {expense.title}
      </Text>
      <Text style={[styles.amount, { color: theme.text }]}>
        {expense.amount.toFixed(2)} KM
      </Text>
      <Text style={[styles.date, { color: theme.muted }]}>{expense.date}</Text>

      <Text
        style={[
          styles.badge,
          { backgroundColor: theme.primary, color: theme.onPrimary },
        ]}
      >
        {expense.category}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: Spacing.md,
    gap: Spacing.xs,
    borderRadius: Radius.md,
    borderWidth: 1,
  },
  pressed: { opacity: 0.6 },
  title: { fontSize: FontSize.body, fontWeight: "bold" },
  amount: { fontSize: FontSize.title, fontWeight: "bold" },
  date: { fontSize: FontSize.small },
  badge: {
    position: "absolute",
    top: -Spacing.sm,
    right: Spacing.md,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: Radius.pill,
    overflow: "hidden",
    fontSize: FontSize.small,
    fontWeight: "bold",
  },
});
