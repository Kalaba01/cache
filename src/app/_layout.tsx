import { FontSize } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import { Link, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  const theme = useTheme();

  return (
    <>
      <StatusBar style="auto" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: theme.background },
          headerTintColor: theme.text,
          headerShadowVisible: false,
          contentStyle: { backgroundColor: theme.background },
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            title: "Expenses",
            headerRight: () => (
              <Link
                href="/about"
                style={{ color: theme.primary, fontSize: FontSize.body }}
              >
                About
              </Link>
            ),
          }}
        />
        <Stack.Screen name="about" options={{ title: "About" }} />
        <Stack.Screen name="expense/[id]" options={{ title: "" }} />
      </Stack>
    </>
  );
}
