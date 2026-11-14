import ExpenseCard from "@/components/ExpenseCard";
import SummaryRow from "@/components/SummaryRow";
import { Spacing } from "@/constants/theme";
import { expenses } from "@/data/expenses";
import { FlatList, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

function Separator() {
  return <View style={styles.separator} />;
}

export default function Index() {
  const insets = useSafeAreaInsets();

  return (
    <FlatList
      data={expenses}
      keyExtractor={(expense) => expense.id}
      renderItem={({ item }) => <ExpenseCard expense={item} />}
      ListHeaderComponent={<SummaryRow expenses={expenses} />}
      ListHeaderComponentStyle={styles.header}
      ItemSeparatorComponent={Separator}
      contentContainerStyle={[
        styles.content,
        { paddingBottom: Spacing.md + insets.bottom },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  content: { padding: Spacing.md },
  header: { marginBottom: Spacing.md },
  separator: { height: Spacing.md },
});
