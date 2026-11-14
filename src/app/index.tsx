import EmptyState from "@/components/EmptyState";
import ExpenseCard from "@/components/ExpenseCard";
import FilterChip from "@/components/FilterChip";
import SummaryRow from "@/components/SummaryRow";
import { FontSize, Radius, Spacing } from "@/constants/theme";
import { fetchExpenses } from "@/data/api";
import { useTheme } from "@/hooks/use-theme";
import type { Category, Expense } from "@/types";
import { CATEGORIES } from "@/types";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Status = "loading" | "error" | "ready";
type Filter = "All" | Category;

const FILTERS: Filter[] = ["All", ...CATEGORIES];

function Separator() {
  return <View style={styles.separator} />;
}

export default function Index() {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();

  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [status, setStatus] = useState<Status>("loading");
  const [attempt, setAttempt] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [filter, setFilter] = useState<Filter>("All");

  useEffect(() => {
    let ignore = false;

    async function load() {
      try {
        const data = await fetchExpenses();
        if (!ignore) {
          setExpenses(data);
          setStatus("ready");
        }
      } catch {
        if (!ignore) setStatus("error");
      }
    }
    load();

    return () => {
      ignore = true;
    };
  }, [attempt]);

  function retry() {
    setStatus("loading");
    setAttempt((a) => a + 1);
  }

  async function refresh() {
    setRefreshing(true);
    try {
      const data = await fetchExpenses();
      setExpenses(data);
    } catch {
      // osvježavanje nije uspjelo, stara lista ostaje na ekranu
    } finally {
      setRefreshing(false);
    }
  }

  const visible =
    filter === "All"
      ? expenses
      : expenses.filter((expense) => expense.category === filter);

  const emptyTitle =
    expenses.length === 0 ? "No expenses yet" : `No ${filter} expenses`;
  const emptyMessage =
    expenses.length === 0
      ? "Your expenses will appear here."
      : "Choose another category.";

  const columns = width >= 900 ? 3 : width >= 600 ? 2 : 1;
  const cardWidth = Math.floor(
    (width - 2 * Spacing.md - (columns - 1) * Spacing.md) / columns,
  );

  if (status === "loading") {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={theme.primary} />
      </View>
    );
  }

  if (status === "error") {
    return (
      <View style={styles.center}>
        <Text style={[styles.errorText, { color: theme.text }]}>
          Could not load expenses
        </Text>
        <Pressable
          onPress={retry}
          style={({ pressed }) => [
            styles.button,
            { backgroundColor: theme.primary },
            pressed && styles.pressed,
          ]}
        >
          <Text style={[styles.buttonText, { color: theme.onPrimary }]}>
            Try again
          </Text>
        </Pressable>
      </View>
    );
  }

  return (
    <FlatList
      key={columns}
      numColumns={columns}
      columnWrapperStyle={columns > 1 ? styles.columns : undefined}
      data={visible}
      keyExtractor={(expense) => expense.id}
      refreshing={refreshing}
      onRefresh={refresh}
      renderItem={({ item }) => (
        <ExpenseCard expense={item} style={{ width: cardWidth }} />
      )}
      ListHeaderComponent={
        <View style={styles.headerContent}>
          <SummaryRow expenses={expenses} />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.chips}
          >
            {FILTERS.map((f) => (
              <FilterChip
                key={f}
                label={f}
                selected={filter === f}
                onPress={() => setFilter(f)}
              />
            ))}
          </ScrollView>
        </View>
      }
      ListHeaderComponentStyle={styles.header}
      ListEmptyComponent={
        <EmptyState title={emptyTitle} message={emptyMessage} />
      }
      ItemSeparatorComponent={Separator}
      contentContainerStyle={[
        styles.content,
        { paddingBottom: Spacing.md + insets.bottom },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  content: { padding: Spacing.md, flexGrow: 1 },
  header: { marginBottom: Spacing.md },
  headerContent: { gap: Spacing.md },
  chips: { gap: Spacing.sm },
  separator: { height: Spacing.md },
  columns: { gap: Spacing.md },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.md,
    padding: Spacing.lg,
  },
  errorText: { fontSize: FontSize.body, textAlign: "center" },
  button: {
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.lg,
    borderRadius: Radius.pill,
  },
  buttonText: { fontSize: FontSize.body, fontWeight: "bold" },
  pressed: { opacity: 0.6 },
});
