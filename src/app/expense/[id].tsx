import EmptyState from "@/components/EmptyState";
import { FontSize, Spacing } from "@/constants/theme";
import { getExpense } from "@/data/api";
import { useTheme } from "@/hooks/use-theme";
import { useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function ExpenseDetailsScreen() {
  const theme = useTheme();
  const { id } = useLocalSearchParams<{ id: string }>();
  const expense = getExpense(id);

  if (!expense) {
    return (
      <EmptyState
        title="Expense not found"
        message="It may have been deleted, or the link is wrong."
      />
    );
  }

  return (
    <View style={styles.screen}>
      <Text style={[styles.title, { color: theme.text }]}>{expense.title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, padding: Spacing.md },
  title: { fontSize: FontSize.title, fontWeight: "bold" },
});
