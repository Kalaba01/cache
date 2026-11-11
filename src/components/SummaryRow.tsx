import { FontSize, Radius, Spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import type { Expense } from "@/types";
import { StyleSheet, Text, View } from "react-native";

type SummaryRowProps = {
  expenses: Expense[];
};

export default function SummaryRow({ expenses }: SummaryRowProps) {
  const theme = useTheme();

  const total = expenses.reduce((sum, e) => sum + e.amount, 0);

  const byCategory = expenses.reduce<Record<string, number>>(
    (acc, e) => ({ ...acc, [e.category]: (acc[e.category] ?? 0) + e.amount }),
    {},
  );
  const top = Object.entries(byCategory).sort((a, b) => b[1] - a[1])[0];

  const items = [
    { label: "expenses", value: String(expenses.length) },
    { label: "KM total", value: total.toFixed(2) },
    { label: "top category", value: top ? top[0] : "-" },
  ];

  return (
    <View style={styles.row}>
      {items.map((item) => (
        <View
          key={item.label}
          style={[
            styles.box,
            { backgroundColor: theme.card, borderColor: theme.border },
          ]}
        >
          <Text
            style={[styles.value, { color: theme.text }]}
            numberOfLines={1}
            adjustsFontSizeToFit
          >
            {item.value}
          </Text>
          <Text style={[styles.label, { color: theme.muted }]}>
            {item.label}
          </Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", gap: Spacing.sm },
  box: {
    flex: 1,
    alignItems: "center",
    gap: Spacing.xs,
    padding: Spacing.md,
    borderRadius: Radius.md,
    borderWidth: 1,
  },
  value: { fontSize: FontSize.title, fontWeight: "bold" },
  label: { fontSize: FontSize.small, textAlign: "center" },
});
