import { ComponentStyleConfig } from "@chakra-ui/react";
import { mode, darken } from "@chakra-ui/theme-tools";

export const ButtonStyles: ComponentStyleConfig = {
  baseStyle: {
    fontWeight: "bold",
    borderRadius: "md",
  },
  sizes: {
    sm: {
      fontSize: "sm",
      px: 4,
      py: 2,
    },
    md: {
      fontSize: "md",
      px: 6,
      py: 3,
    },
    lg: {
      fontSize: "lg",
      px: 8,
      py: 4,
    },
  },
  variants: {
    primary: (props) => ({
      bg: "brand.primary",
      color: "white",
      _hover: {
        bg: mode(darken("brand.primary", 10), darken("brand.primary", 20))(props),
        border: "none",
        boxShadow: "md",
      },
    }),
    primarySolid: {
      bgColor: "transparent",
      border: "2px solid",
      borderColor: "brand.primary",
      color: "brand.primary",
      transition: "all 200ms ease",
      _hover: {
        bg: "brand.primary",
        color: "white",
        boxShadow: "md",
        transform: "scale(1.02)",
        border: "none",
      },
    },
  },
  defaultProps: {
    size: "md",
    colorScheme: "brand",
    outline: "none",
  },
};
