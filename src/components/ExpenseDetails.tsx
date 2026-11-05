import type { Expense } from "@/types";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

type ExpenseDetailsProps = {
  expense: Expense;
};

export default function ExpenseDetails({ expense }: ExpenseDetailsProps) {
  return (
    <ScrollView contentContainerStyle={styles.content}>
      {expense.receiptUri ? (
        <Image source={{ uri: expense.receiptUri }} style={styles.receipt} />
      ) : (
        <View style={[styles.receipt, styles.placeholder]}>
          <Text style={styles.muted}>No receipt photo</Text>
        </View>
      )}

      <Text style={styles.title}>{expense.title}</Text>
      <Text style={styles.amount}>{expense.amount.toFixed(2)} KM</Text>

      <View style={styles.card}>
        <View style={styles.row}>
          <Text style={styles.muted}>Category</Text>
          <Text>{expense.category}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.muted}>Date</Text>
          <Text>{expense.date}</Text>
        </View>
        {expense.note ? (
          <View style={styles.row}>
            <Text style={styles.muted}>Note</Text>
            <Text>{expense.note}</Text>
          </View>
        ) : null}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: { padding: 16, gap: 16 },
  receipt: { width: "100%", height: 220, borderRadius: 12 },
  placeholder: {
    backgroundColor: "#E6EEF7",
    justifyContent: "center",
    alignItems: "center",
  },
  title: { fontSize: 22, fontWeight: "bold" },
  amount: { fontSize: 28, fontWeight: "bold" },
  card: { padding: 16, gap: 12, borderRadius: 12, backgroundColor: "#E6EEF7" },
  row: { flexDirection: "row", justifyContent: "space-between", gap: 12 },
  muted: { color: "#5B6475" },
});
