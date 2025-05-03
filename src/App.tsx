import './App.css'
import { useState, useEffect } from 'react';
import { Stepper, Button, Group, Title, Stack, Box, Text, Image } from '@mantine/core';
import { Dropzone, FileRejection, MIME_TYPES } from '@mantine/dropzone';
import { IconUpload, } from '@tabler/icons-react'; // Optional icons
import 'react-mask-editor/dist/style.css'; // Importing the CSS for react-mask-editor

import '@mantine/core/styles.css';
import React from 'react';
import { MaskEditor, toMask } from "react-mask-editor";

function App() {
  const [preview, setPreview] = useState<string | null>(null);
  const [active, setActive] = useState(1);
  const nextStep = () => setActive((current) => (current < 4 ? current + 1 : current));
  const prevStep = () => setActive((current) => Math.max(current - 1, 0));
  const canvas = React.useRef<HTMLCanvasElement>();

  const handleDrop = (files: File[]) => {
    const file = files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
    }
  };

  const handleRemove = () => {
    if (preview) URL.revokeObjectURL(preview);
    setPreview(null);
  };



  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, []);


  return (
    <>
      <Box w="100vh" h="100vh">
        <Stack
          align="stretch"
          justify="center"
          gap="lg"
        >
          <Box mb={10}>
            <Title
              order={1}
              style={{
                fontWeight: 800,
                fontSize: '3rem',
                textAlign: 'center',
                background: 'linear-gradient(90deg, #00DBDE 0%, #FC00FF 100%)', // beautiful AI gradient
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0 0 10px rgba(0, 219, 222, 0.5)', // subtle glow
                letterSpacing: '1px',
                animation: 'glowing 2.5s ease-in-out infinite alternate', // Add glowing animation
              }}
            >
              DEEP LEARNING MECHANISM FOR OBJECT REMOVAL TO ENHANCE BACKGROUND
            </Title>
          </Box>
          <Box p={30}
           style={{
            border: '1px solid #000',
            borderRadius: '30px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          }}>
            <Stepper active={active} onStepClick={setActive}>
              <Stepper.Step label="Welcome" description="">
                Step 1 content: Create an account
              </Stepper.Step>
              <Stepper.Step label="Select image" description="">
                Step 2 content: Verify email
              </Stepper.Step>
              <Stepper.Step label="Processing Image" description="">
                Step 3 content: Get full access
              </Stepper.Step>
              <Stepper.Step label="Final result" description="">
                Step 4 content: Get full access
              </Stepper.Step>
              <Stepper.Completed>
                Completed, click back button to get to previous step
              </Stepper.Completed>
            </Stepper>
          </Box>
          <Box
            p={30} style={{
              border: '1px solid #000',
              borderRadius: '30px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            }}
          >
            <>
              {active === 0 && (
                <>
                  <Title>Welcome to ...</Title>
                  <Text>Upload your photo to remove the background</Text>
                  <Group justify="center" mt="xl">
                    <Button variant="default" onClick={prevStep}>Back</Button>
                    <Button onClick={nextStep}>Next step</Button>
                  </Group>
                </>
              )}
              {active === 1 && (
                <>
                  <Title>Upload Your Photo</Title>
                  <Text mb={10}>Upload your photo to remove the background</Text>
                  <Dropzone
                    onDrop={handleDrop}
                    onReject={(files: FileRejection[]) => {
                      console.log('Rejected files', files);
                    }}
                    maxSize={5 * 1024 ** 2} // 5 MB
                    accept={[MIME_TYPES.jpeg, MIME_TYPES.png]}
                    multiple={false}
                    style={{
                      border: '1px dashed #ccc',
                      borderRadius: '30px',
                      height: '60vh', // Dynamic height for nice display
                      backgroundColor: '#f9f9f9',
                      overflow: 'hidden',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative',
                    }}
                  >
                    {preview ? (
                      <Image
                        src={preview}
                        alt="Preview"
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'contain', // Makes image fit nicely without distortion
                        }}
                      />
                    ) : (
                      <Group justify="center">
                        <IconUpload size={50} stroke={1.5} color="#888" />
                        <Text size="md" color="dimmed">Drag an image here or click to select</Text>
                      </Group>
                    )}
                  </Dropzone>
                  <Group justify="center" mt="xl">
                    <Button variant="default" onClick={prevStep}>Back</Button>
                    <Button onClick={nextStep}>Next step</Button>
                  </Group>
                  {preview && (
                    <Button
                      color="red"
                      variant="light"
                      onClick={handleRemove}
                      mt="sm"
                    >
                      Remove Image
                    </Button>
                  )}
                </>
              )}
              {active === 2 && (
                <>
                  <Title>Processing Image</Title>
                  <Text>Processing your image...</Text>
                  <MaskEditor
                    src={preview}
                    canvasRef={canvas}
                  />
                  <Button onClick={() => console.log(toMask(canvas.current))}>
                    Get Mask
                  </Button>

                  <Group justify="center" mt="xl">
                    <Button variant="default" onClick={prevStep}>Back</Button>
                    <Button onClick={nextStep}>Next step</Button>
                  </Group>
                </>
              )}
              {active === 3 && (
                <>
                  <Title>Final Result</Title>
                  <Text>Your image has been processed successfully!</Text>
                  <Group justify="center" mt="xl">
                    <Button variant="default" onClick={prevStep}>Back</Button>
                    <Button onClick={nextStep}>Finish</Button>
                  </Group>
                </>
              )}
              {active === 4 && (
                <>
                  <Title>Thank You!</Title>
                  <Text>Your image has been processed successfully!</Text>
                  <Group justify="center" mt="xl">
                    <Button variant="default" onClick={prevStep}>Back</Button>
                    <Button onClick={nextStep}>Finish</Button>
                  </Group>
                </>
              )}
            </>
          </Box>

        </Stack>
      </Box>

      <style>
        {`
    @keyframes glowing {
      0% {
        text-shadow: 0 0 5px rgba(0, 219, 222, 0.5), 0 0 10px rgba(0, 219, 222, 0.3), 0 0 15px rgba(0, 219, 222, 0.1);
        color: #00DBDE;
      }
      50% {
        text-shadow: 0 0 20px rgba(0, 219, 222, 1), 0 0 30px rgba(0, 219, 222, 0.7), 0 0 50px rgba(0, 219, 222, 0.3);
        color: #FC00FF;
      }
      100% {
        text-shadow: 0 0 5px rgba(0, 219, 222, 0.5), 0 0 10px rgba(0, 219, 222, 0.3), 0 0 15px rgba(0, 219, 222, 0.1);
        color: #00DBDE;
      }
    }
  `}
      </style>
    </>

  )

}

export default App
