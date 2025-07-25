import { isRouteErrorResponse, Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router";

import type { Route } from "./+types/root";
import colorSchemeApi from "@dazl/color-scheme/client?url";
import { Theme } from "@radix-ui/themes";

import "./styles/reset.css";
import "./styles/tokens/utils.css";
import "./styles/tokens/animations.css";
import "./styles/tokens/colors.css";
import "./styles/tokens/decorations.css";
import "./styles/tokens/sizes.css";
import "./styles/tokens/spacings.css";
import "./styles/tokens/typography.css";
import "./styles/theme.css";
import "@radix-ui/themes/styles.css";
import { useColorScheme } from "@dazl/color-scheme/react";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const { rootCssClass, resolvedScheme } = useColorScheme();
  return (
    <html lang="en" suppressHydrationWarning className={rootCssClass} style={{ colorScheme: resolvedScheme }}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <script src={colorSchemeApi}></script>
        <Links />
      </head>
      <body>
        <Theme appearance="light" accentColor="iris" grayColor="sand" radius="medium" scaling="100%">
          {children}
        </Theme>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details = error.status === 404 ? "The requested page could not be found." : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main>
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre>
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
