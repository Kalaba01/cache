import ExpenseCard from "@/components/ExpenseCard";
import { Spacing } from "@/constants/theme";
import { expenses } from "@/data/expenses";
import { useTheme } from "@/hooks/use-theme";
import { ScrollView, StyleSheet, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Index() {
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      contentContainerStyle={[
        styles.content,
        { paddingBottom: Spacing.md + insets.bottom },
      ]}
    >
      <Text style={{ color: theme.muted }}>{expenses.length} expenses</Text>
      {expenses.map((expense) => (
        <ExpenseCard key={expense.id} expense={expense} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: { padding: Spacing.md, gap: Spacing.md },
});
