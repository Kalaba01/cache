import { FontSize, Radius, Spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import type { Expense } from "@/types";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

type ExpenseDetailsProps = {
  expense: Expense;
};

export default function ExpenseDetails({ expense }: ExpenseDetailsProps) {
  const theme = useTheme();

  const rows = [
    { label: "Category", value: expense.category },
    { label: "Date", value: expense.date },
    ...(expense.note ? [{ label: "Note", value: expense.note }] : []),
  ];

  return (
    <ScrollView contentContainerStyle={styles.scroll}>
      <View style={styles.content}>
        {expense.receiptUri ? (
          <Image source={{ uri: expense.receiptUri }} style={styles.photo} />
        ) : (
          <View
            style={[
              styles.photo,
              styles.placeholder,
              { backgroundColor: theme.card },
            ]}
          >
            <Text style={{ color: theme.muted }}>No receipt photo</Text>
          </View>
        )}

        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.text }]}>
            {expense.title}
          </Text>
          <Text style={[styles.amount, { color: theme.primary }]}>
            {expense.amount.toFixed(2)} KM
          </Text>
        </View>

        <View
          style={[
            styles.card,
            { backgroundColor: theme.card, borderColor: theme.border },
          ]}
        >
          {rows.map((row) => (
            <View key={row.label} style={styles.row}>
              <Text style={[styles.label, { color: theme.muted }]}>
                {row.label}
              </Text>
              <Text style={[styles.value, { color: theme.text }]}>
                {row.value}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { padding: Spacing.md },
  content: {
    width: "100%",
    maxWidth: 600,
    alignSelf: "center",
    gap: Spacing.lg,
  },
  photo: { width: "100%", aspectRatio: 16 / 9, borderRadius: Radius.md },
  placeholder: { justifyContent: "center", alignItems: "center" },
  header: { gap: Spacing.xs },
  title: { fontSize: FontSize.hero, fontWeight: "bold" },
  amount: { fontSize: FontSize.title, fontWeight: "bold" },
  card: {
    padding: Spacing.md,
    gap: Spacing.md,
    borderRadius: Radius.md,
    borderWidth: 1,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: Spacing.md,
  },
  label: { fontSize: FontSize.body },
  value: { fontSize: FontSize.body, flexShrink: 1, textAlign: "right" },
});
