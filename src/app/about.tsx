import { FontSize, Spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import { ScrollView, StyleSheet, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function AboutScreen() {
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      contentContainerStyle={[
        styles.content,
        { paddingBottom: Spacing.md + insets.bottom },
      ]}
    >
      <Text style={[styles.title, { color: theme.text }]}>Cache</Text>
      <Text style={[styles.body, { color: theme.text }]}>
        Cache helps you keep track of your spending. Write down what you paid
        for, how much it cost and when, and see where your money went at the end
        of the month.
      </Text>
      <Text style={[styles.body, { color: theme.muted }]}>
        Made by Edin Kalaba for IT 3003 Cross-Platform Development at
        International Burch University.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: { padding: Spacing.md, gap: Spacing.md },
  title: { fontSize: FontSize.hero, fontWeight: "bold" },
  body: { fontSize: FontSize.body, lineHeight: 24 },
});
