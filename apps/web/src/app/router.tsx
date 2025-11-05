import { createRouter, RouterProvider } from '@tanstack/react-router';
import { routeTree } from './route-tree.gen';

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
});

export function AppRouter() {
  return <RouterProvider router={router} />;
}
