import {
  ChakraProvider,
  Heading,
  Container,
  Text,
  Input,
  Button,
  Wrap,
  Stack, 
  Image,
  SkeletonCircle,
  SkeletonText,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";

const App = () => {
  const [image, updateImage] = useState();
  const [prompt, updatePrompt] = useState();
  const [loading, updateLoading] = useState();

  const generate = async (prompt) => {
    updateLoading(true);
    const result = await axios.get(`https://backend-app-v1-stayamazed.vercel.app/?prompt=${prompt}`);
    updateImage(result.data.output[0]);
    updateLoading(false);
  };

  return (
    <ChakraProvider>
      <Container padding={"50px"}>
        <Heading>Stable Diffusion Playground</Heading>
        <Text marginBottom={"10px"}>
          Just enter the prompt and click the generate button, No code required to generate the image.
        </Text>

        <Wrap marginBottom={"10px"}>
          <Input
            value={prompt}
            onChange={(e) => updatePrompt(e.target.value)}
            width={"350px"}
          ></Input>
          <Button onClick={(e) => generate(prompt)} colorScheme={"yellow"}>
            Generate
          </Button>
        </Wrap>

        {loading ? (
          <Stack>
            <SkeletonCircle />
            <SkeletonText />
          </Stack>
        ) : image ? (
          <Image src={image} boxShadow="lg" />
        ) : null}
      </Container>
    </ChakraProvider>
  );
};

export default App;