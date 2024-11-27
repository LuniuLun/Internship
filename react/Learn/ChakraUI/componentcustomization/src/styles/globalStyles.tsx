// globalStyles.ts
import { extendTheme, StyleFunctionProps } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

export const globalStyles = extendTheme({
  styles: {
    global: (props: StyleFunctionProps) => ({
      body: {
        fontFamily: "'Poppins', sans-serif",
        color: mode("brand.primaryDark", "brand.white")(props),
        bg: mode("brand.white", "brand.primaryDark")(props),
        lineHeight: "base",
      },
      "*": {
        margin: 0,
        padding: 0,
        boxSizing: "border-box",
      },
      a: {
        color: "brand.primary",
        textDecoration: "none",
        _hover: {
          textDecoration: "underline",
        },
      },
    }),
  },
});
