import { extendTheme } from "@chakra-ui/react";
import { ButtonStyles as Button } from "./components/ButtonStyles";
import { defaultTheme } from "./theme";
import { globalStyles } from "./globalStyles.tsx";

const overrides = {
  ...defaultTheme,
  components: {
    Button,
  },
  styles: globalStyles.styles,
};

export default extendTheme(overrides);
