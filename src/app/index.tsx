import ExpenseCard from "@/components/ExpenseCard";
import { expenses } from "@/data/expenses";
import { View } from "react-native";

export default function Index() {
  return (
    <View style={{ padding: 16 }}>
      <ExpenseCard expense={expenses[0]} />
    </View>
  );
}
