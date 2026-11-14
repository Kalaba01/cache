import EmptyState from "@/components/EmptyState";
import ExpenseCard from "@/components/ExpenseCard";
import SummaryRow from "@/components/SummaryRow";
import { FontSize, Radius, Spacing } from "@/constants/theme";
import { fetchExpenses } from "@/data/api";
import { useTheme } from "@/hooks/use-theme";
import type { Expense } from "@/types";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Status = "loading" | "error" | "ready";

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
    } finally {
      setRefreshing(false);
    }
  }

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
      data={expenses}
      keyExtractor={(expense) => expense.id}
      refreshing={refreshing}
      onRefresh={refresh}
      renderItem={({ item }) => (
        <ExpenseCard expense={item} style={{ width: cardWidth }} />
      )}
      ListHeaderComponent={<SummaryRow expenses={expenses} />}
      ListHeaderComponentStyle={styles.header}
      ListEmptyComponent={
        <EmptyState
          title="No expenses yet"
          message="Your expenses will appear here."
        />
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
