import ExpenseCard from "@/components/ExpenseCard";
import SummaryRow from "@/components/SummaryRow";
import { Spacing } from "@/constants/theme";
import { expenses } from "@/data/expenses";
import {
  ScrollView,
  StyleSheet,
  View,
  useWindowDimensions,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Index() {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();

  const columns = width >= 900 ? 3 : width >= 600 ? 2 : 1;
  const cardWidth = Math.floor(
    (width - 2 * Spacing.md - (columns - 1) * Spacing.md) / columns,
  );

  return (
    <ScrollView
      contentContainerStyle={[
        styles.content,
        { paddingBottom: Spacing.md + insets.bottom },
      ]}
    >
      <SummaryRow expenses={expenses} />
      <View style={styles.grid}>
        {expenses.map((expense) => (
          <ExpenseCard
            key={expense.id}
            expense={expense}
            style={{ width: cardWidth }}
          />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: { padding: Spacing.md, gap: Spacing.md },
  grid: { flexDirection: "row", flexWrap: "wrap", gap: Spacing.md },
});
