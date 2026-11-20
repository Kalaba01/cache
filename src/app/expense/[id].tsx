import EmptyState from "@/components/EmptyState";
import ExpenseDetails from "@/components/ExpenseDetails";
import { FontSize, Radius, Spacing } from "@/constants/theme";
import { getExpense } from "@/data/api";
import { useTheme } from "@/hooks/use-theme";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { Pressable, StyleSheet, Text } from "react-native";

export default function ExpenseDetailsScreen() {
  const theme = useTheme();
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const expense = getExpense(id);

  function backToList() {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/");
    }
  }

  if (!expense) {
    return (
      <>
        <Stack.Screen options={{ title: "Not found" }} />
        <EmptyState
          title="Expense not found"
          message="It may have been deleted, or the link is wrong."
        />
      </>
    );
  }

  return (
    <>
      <Stack.Screen options={{ title: expense.title }} />
      <ExpenseDetails expense={expense}>
        <Pressable
          onPress={backToList}
          accessibilityRole="button"
          style={({ pressed }) => [
            styles.button,
            { borderColor: theme.primary },
            pressed && styles.pressed,
          ]}
        >
          <Text style={[styles.buttonText, { color: theme.primary }]}>
            Back to the list
          </Text>
        </Pressable>
      </ExpenseDetails>
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: Spacing.sm + 4,
    borderRadius: Radius.pill,
    borderWidth: 1,
    alignItems: "center",
  },
  pressed: { opacity: 0.6 },
  buttonText: { fontSize: FontSize.body, fontWeight: "bold" },
});
