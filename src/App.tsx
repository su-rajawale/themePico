import { Box, Button, Center, Input, Stack, Text } from "@chakra-ui/react";
import { useSmartLightInterface } from "./hooks/useSmartLightInterface";

export const App = () => {
  const {
    connect,
    isConnected,
    isLoading,
    setRainbow,
    setFill,
    setChase,
    runGcode,
    runCommand,
  } = useSmartLightInterface();

  if (isLoading) {
    return (
      <Center height={"100vh"} backgroundColor="#1D201F">
        <Stack>
          <Button disabled colorScheme="teal" size="lg">
            Trying to connect...
          </Button>
          <Button
            onClick={() => {
              window.location.reload();
            }}
            colorScheme="yellow"
            size="md"
          >
            Reset
          </Button>
        </Stack>
      </Center>
    );
  } else {
    return (
      <Center height={"100vh"} backgroundColor="#1D201F">
        <Stack>
          {isConnected ? (
            <Box display="flex" flexDirection="column" gap={4}>
              <img
                src="Bluetooth.png"
                alt="bluetooth"
                style={{
                  width: "40%",
                  height: "auto",
                  alignSelf: "center",
                  marginBottom: "1rem",
                }}
              />
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
                <Stack gap={1}>
                  <Input
                    variant={"filled"}
                    size={"lg"}
                    backgroundColor={"#2D2F2E"}
                    color="white"
                    _hover={{ backgroundColor: "#2D2F2E", opacity: 0.8 }}
                    type="text"
                    name="command"
                    id="command"
                    placeholder="Command"
                  />
                  <Button colorScheme="blue" size="md" type="submit">
                    Send
                  </Button>
                </Stack>
              </form>
              <Stack direction="row" gap={4} justify="center">
                <Button onClick={setRainbow} colorScheme={"twitter"} size="lg">
                  Set Rainbow
                </Button>
                <Button onClick={setFill} colorScheme={"green"} size="lg">
                  Set Fill
                </Button>
                <Button onClick={setChase} colorScheme={"orange"} size="lg">
                  Set Chase
                </Button>
                <Button onClick={runGcode} colorScheme={"yellow"} size="lg">
                  Run Gcode
                </Button>
              </Stack>
            </Box>
          ) : (
            <Box display="flex" flexDirection="column" alignItems="center">
              <Box
                marginBottom={8}
                display="flex"
                flexDirection="column"
                alignItems="center"
              >
                <Text
                  fontSize={"4xl"}
                  fontWeight="bold"
                  color="white"
                  marginBottom={2}
                >
                  Connect to your Smart Light
                </Text>
                <Text fontSize={"sm"} color="white">
                  To use web bluetooth, enable the experimental web platform
                  features
                </Text>
                <Text fontSize={"sm"} color="whiteAlpha.400">
                  <code>
                    chrome://flags/#enable-experimental-web-platform-features
                  </code>
                </Text>
              </Box>
              <Button onClick={connect} colorScheme="pink" size="lg">
                Connect
              </Button>
            </Box>
          )}
        </Stack>
      </Center>
    );
  }
};
