import ExpenseCard from "@/components/ExpenseCard";
import { expenses } from "@/data/expenses";
import { ScrollView, StyleSheet, Text } from "react-native";

export default function Index() {
  return (
    <ScrollView contentContainerStyle={styles.content}>
      <Text style={styles.count}>{expenses.length} expenses</Text>
      {expenses.map((expense) => (
        <ExpenseCard key={expense.id} expense={expense} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: { padding: 16, gap: 12 },
  count: { color: "#5B6475" },
});
