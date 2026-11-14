import EmptyState from "@/components/EmptyState";
import ExpenseCard from "@/components/ExpenseCard";
import FilterChip from "@/components/FilterChip";
import SummaryRow from "@/components/SummaryRow";
import { FontSize, Radius, Spacing } from "@/constants/theme";
import { fetchExpenses } from "@/data/api";
import { useTheme } from "@/hooks/use-theme";
import type { Category, Expense } from "@/types";
import { CATEGORIES } from "@/types";
import { groupByDate } from "@/utils/group-by-date";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Pressable,
  ScrollView,
  SectionList,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Status = "loading" | "error" | "ready";
type Filter = "All" | Category;
type Sort = "Newest" | "Highest";
type Layout = "By day" | "Grid";

const FILTERS: Filter[] = ["All", ...CATEGORIES];
const SORTS: Sort[] = ["Newest", "Highest"];
const LAYOUTS: Layout[] = ["By day", "Grid"];

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
  const [sort, setSort] = useState<Sort>("Newest");
  const [layout, setLayout] = useState<Layout>("By day");

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

  function confirmDelete(expense: Expense) {
    Alert.alert("Delete expense?", `"${expense.title}" will be removed.`, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () =>
          setExpenses((list) => list.filter((e) => e.id !== expense.id)),
      },
    ]);
  }

  const visible =
    filter === "All"
      ? expenses
      : expenses.filter((expense) => expense.category === filter);

  const sorted = [...visible].sort((a, b) =>
    sort === "Newest" ? b.date.localeCompare(a.date) : b.amount - a.amount,
  );

  const sections = groupByDate(sorted);

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

  const listHeader = (
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
      <View style={styles.optionsRow}>
        {SORTS.map((s) => (
          <FilterChip
            key={s}
            label={s}
            selected={sort === s}
            onPress={() => setSort(s)}
          />
        ))}
        <View style={[styles.divider, { backgroundColor: theme.border }]} />
        {LAYOUTS.map((l) => (
          <FilterChip
            key={l}
            label={l}
            selected={layout === l}
            onPress={() => setLayout(l)}
          />
        ))}
      </View>
    </View>
  );

  const emptyState = <EmptyState title={emptyTitle} message={emptyMessage} />;

  const contentStyle = [
    styles.content,
    { paddingBottom: Spacing.md + insets.bottom },
  ];

  if (layout === "By day") {
    return (
      <SectionList
        sections={sections}
        keyExtractor={(expense) => expense.id}
        refreshing={refreshing}
        onRefresh={refresh}
        stickySectionHeadersEnabled
        renderItem={({ item }) => (
          <ExpenseCard expense={item} onLongPress={() => confirmDelete(item)} />
        )}
        renderSectionHeader={({ section }) => (
          <View
            style={[
              styles.sectionHeader,
              { backgroundColor: theme.background },
            ]}
          >
            <Text style={[styles.sectionTitle, { color: theme.text }]}>
              {section.title}
            </Text>
            <Text style={[styles.sectionTotal, { color: theme.muted }]}>
              {section.total.toFixed(2)} KM
            </Text>
          </View>
        )}
        ListHeaderComponent={listHeader}
        ListEmptyComponent={emptyState}
        ItemSeparatorComponent={Separator}
        contentContainerStyle={contentStyle}
      />
    );
  }

  return (
    <FlatList
      key={columns}
      numColumns={columns}
      columnWrapperStyle={columns > 1 ? styles.columns : undefined}
      data={sorted}
      keyExtractor={(expense) => expense.id}
      refreshing={refreshing}
      onRefresh={refresh}
      renderItem={({ item }) => (
        <ExpenseCard
          expense={item}
          style={{ width: cardWidth }}
          onLongPress={() => confirmDelete(item)}
        />
      )}
      ListHeaderComponent={listHeader}
      ListHeaderComponentStyle={styles.header}
      ListEmptyComponent={emptyState}
      ItemSeparatorComponent={Separator}
      contentContainerStyle={contentStyle}
    />
  );
}

const styles = StyleSheet.create({
  content: { padding: Spacing.md, flexGrow: 1 },
  header: { marginBottom: Spacing.md },
  headerContent: { gap: Spacing.md },
  chips: { gap: Spacing.sm },
  optionsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    gap: Spacing.sm,
  },
  divider: { width: 1, alignSelf: "stretch" },
  separator: { height: Spacing.md },
  columns: { gap: Spacing.md },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    paddingTop: Spacing.md,
    paddingBottom: Spacing.md,
  },
  sectionTitle: { fontSize: FontSize.body, fontWeight: "bold" },
  sectionTotal: { fontSize: FontSize.body },
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
