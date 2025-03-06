import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  RouterProvider,
  createRouter,
  createRootRoute,
  createRoute,
} from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { RecipesPage } from "./pages/RecipesPage";
import { RecipeDetailsPage } from "./pages/RecipeDetailsPage";
import { SelectedRecipesPage } from "./pages/SelectedRecipesPage";
import { Root } from "./components/Root";
import "./types/router";

const queryClient = new QueryClient();

const rootRoute = createRootRoute({
  component: Root,
});

const recipesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: RecipesPage,
});

const recipeDetailsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/recipe/$recipeId",
  component: RecipeDetailsPage,
});

const selectedRecipesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/selected",
  component: SelectedRecipesPage,
});

const routeTree = rootRoute.addChildren([
  recipesRoute,
  recipeDetailsRoute,
  selectedRecipesRoute,
]);

const router = createRouter({
  routeTree,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <AnimatePresence mode="wait">
            <RouterProvider router={router} />
          </AnimatePresence>
        </motion.div>
      </ChakraProvider>
    </QueryClientProvider>
  );
}

export default App;
