import { Button, Center, ChakraProvider, Input, Stack } from "@chakra-ui/react";
import { useSmartLightInterface } from "./hooks/useSmartLightInterface";
import theme from "./theme";

export const App = () => {
  const {
    connect,
    isConnected,
    setRainbow,
    setFill,
    setChase,
    runGcode,
    runCommand,
  } = useSmartLightInterface();

  return (
    <ChakraProvider theme={theme}>
      <Center height={"100vh"}>
        <Stack>
          {isConnected ? (
            <Stack>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const form = e.currentTarget as HTMLFormElement;
                  const formData = new FormData(form);
                  const command = formData.get("command");
                  if (command) {
                    runCommand(command.toString());
                  }
                }}
              >
                <Stack marginBottom={4}>
                  <Input
                    type="text"
                    name="command"
                    id="command"
                    placeholder="Command"
                  />
                </Stack>
                <Stack>
                  <Button colorScheme="whatsapp" size="md" type="submit">
                    Send
                  </Button>
                </Stack>
              </form>
              <Button onClick={setRainbow} colorScheme={"red"} size="lg">
                Set Rainbow
              </Button>
              <Button onClick={setFill} colorScheme={"green"} size="lg">
                Set Fill
              </Button>
              <Button onClick={setChase} colorScheme={"blue"} size="lg">
                Set Chase
              </Button>
              <Button onClick={runGcode} colorScheme={"blue"} size="lg">
                Run Gcode
              </Button>
            </Stack>
          ) : (
            <>
              <Button onClick={connect} colorScheme="pink" size="lg">
                Connect
              </Button>
            </>
          )}
        </Stack>
      </Center>
    </ChakraProvider>
  );
};
