import { FontSize, Spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import { Link, Stack } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function NotFoundScreen() {
  const theme = useTheme();

  return (
    <>
      <Stack.Screen options={{ title: "Not found" }} />
      <View style={styles.box}>
        <Text style={[styles.title, { color: theme.text }]}>
          This page does not exist
        </Text>
        <Text style={[styles.message, { color: theme.muted }]}>
          The link may be wrong or out of date.
        </Text>
        <Link href="/" replace style={[styles.link, { color: theme.primary }]}>
          Go to your expenses
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  box: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.sm,
    padding: Spacing.lg,
  },
  title: { fontSize: FontSize.title, fontWeight: "bold", textAlign: "center" },
  message: { fontSize: FontSize.body, textAlign: "center" },
  link: { fontSize: FontSize.body, fontWeight: "bold", marginTop: Spacing.sm },
});
