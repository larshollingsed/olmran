import { ChakraProvider, extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  components: {
    FormLabel: { 
      baseStyle: {
        marginTop: '10px',
      },
    },
    Select: {
      baseStyle: {
        field: {
          marginBottom: '100px',
        },
      },
    },
  },
});

const Chakra = ({ children }) => (
  <ChakraProvider theme={theme}>{children}</ChakraProvider>
);

export default Chakra;
