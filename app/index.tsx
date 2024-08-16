import { useRootNavigationState, Redirect } from 'expo-router';

export default function InitialRouting() {
  const rootNavigationState = useRootNavigationState();

  // Check if the root navigation state is ready
  if (!rootNavigationState?.key) return null;

  // Redirect using expo-router
  return <Redirect href={'/authentication/loginStudent'} />;
}
