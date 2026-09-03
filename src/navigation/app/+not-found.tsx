import { StyleSheet, View } from "react-native";
import { router, Stack } from "expo-router";

import { AppButton, AppText, Screen } from "@/components";
import { ROUTES } from "@/navigation";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />

      <Screen>
        <View style={styles.container}>
          <AppText style={styles.title}>errors.notFound</AppText>
          <AppButton
            variant="outline"
            title="notFound.goHome"
            onPress={() => router.replace(ROUTES.ENTRY)}
          />
        </View>
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
  },
  title: {
    fontSize: 20,
    lineHeight: 26,
  },
});
