import ExpenseCard from "@/components/ExpenseCard";
import SummaryRow from "@/components/SummaryRow";
import { Spacing } from "@/constants/theme";
import { expenses } from "@/data/expenses";
import { FlatList, StyleSheet, View, useWindowDimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

function Separator() {
  return <View style={styles.separator} />;
}

export default function Index() {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();

  const columns = width >= 900 ? 3 : width >= 600 ? 2 : 1;
  const cardWidth = Math.floor(
    (width - 2 * Spacing.md - (columns - 1) * Spacing.md) / columns,
  );

  return (
    <FlatList
      key={columns}
      numColumns={columns}
      columnWrapperStyle={columns > 1 ? styles.columns : undefined}
      data={expenses}
      keyExtractor={(expense) => expense.id}
      renderItem={({ item }) => (
        <ExpenseCard expense={item} style={{ width: cardWidth }} />
      )}
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
  columns: { gap: Spacing.md },
});
