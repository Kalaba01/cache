import { FontSize, Radius, Spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import type { Expense } from "@/types";
import { formatDate } from "@/utils/format";
import type { ReactNode } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type ExpenseDetailsProps = {
  expense: Expense;
  children?: ReactNode;
};

export default function ExpenseDetails({
  expense,
  children,
}: ExpenseDetailsProps) {
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  const facts = [
    { label: "Amount", value: `${expense.amount.toFixed(2)} KM` },
    { label: "Category", value: expense.category },
    { label: "Date", value: formatDate(expense.date) },
  ];

  return (
    <ScrollView
      contentContainerStyle={[
        styles.scroll,
        { paddingBottom: Spacing.md + insets.bottom },
      ]}
    >
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

        <Text style={[styles.title, { color: theme.text }]}>
          {expense.title}
        </Text>

        <View style={styles.facts}>
          {facts.map((fact) => (
            <View
              key={fact.label}
              style={[
                styles.fact,
                { backgroundColor: theme.card, borderColor: theme.border },
              ]}
            >
              <Text
                style={[styles.factValue, { color: theme.text }]}
                numberOfLines={1}
                adjustsFontSizeToFit
              >
                {fact.value}
              </Text>
              <Text style={[styles.factLabel, { color: theme.muted }]}>
                {fact.label}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Note</Text>
          <Text
            style={[
              styles.body,
              { color: expense.note ? theme.text : theme.muted },
            ]}
          >
            {expense.note || "No note for this expense."}
          </Text>
        </View>

        {children}
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
  title: { fontSize: FontSize.hero, fontWeight: "bold" },
  facts: { flexDirection: "row", gap: Spacing.sm },
  fact: {
    flex: 1,
    alignItems: "center",
    gap: Spacing.xs,
    padding: Spacing.sm,
    borderRadius: Radius.md,
    borderWidth: 1,
  },
  factValue: { fontSize: FontSize.body, fontWeight: "bold" },
  factLabel: { fontSize: FontSize.small },
  section: { gap: Spacing.xs },
  sectionTitle: { fontSize: FontSize.title, fontWeight: "bold" },
  body: { fontSize: FontSize.body, lineHeight: 24 },
});
