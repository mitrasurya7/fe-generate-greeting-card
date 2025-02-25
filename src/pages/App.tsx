import { useEffect, useRef, useState } from "react";
import { fabric } from "fabric";
import {
  Button,
  Card,
  FileUpload,
  TextAreaField,
  TextField,
} from "../components";
import "../styles/index.css";

function App() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fabricCanvasRef = useRef<fabric.Canvas | null>(null);
  const [dear, setDear] = useState("");
  const [message, setMessage] = useState("");
  const [from, setFrom] = useState("");
  const [initialFile, setInitialFile] = useState<boolean>(false);
  const textObjectsRef = useRef<{ dear?: fabric.Text; message?: fabric.Text; from?: fabric.Text }>({});
  const [errorMessage, setErrorMessage] = useState<{key: "dear" | "message" | "from" | "image", message: string}[]>([]);

  useEffect(() => {
    if (!canvasRef.current || !initialFile) return;

    const canvas = new fabric.Canvas(canvasRef.current, {
      backgroundColor: "white",
    });

    fabricCanvasRef.current = canvas;

    return () => {
      canvas.dispose();
    };
  }, [initialFile]);

  const handleDownload = () => {
    const errors: {key: "dear" | "message" | "from" | "image", message: string}[] = [];

    if (!dear.trim()) {
      errors.push({
        key: "dear",
        message: "Please enter a name.",
      });
    }
    if (!message.trim()) {
      errors.push({
        key: "message",
        message: "Please enter a message.",
      });
    }
    if (!from.trim()) {
      errors.push({
        key: "from",
        message: "Please enter a name.",
      });
    }
    if (!fabricCanvasRef.current || fabricCanvasRef.current.isEmpty()) {
      errors.push({
        key: "image",
        message: "Please upload an image.",
      });
    }

    if (errors.length > 0) {
      setErrorMessage(errors);
      return;
    }

    setErrorMessage([]);


    if (!fabricCanvasRef.current) return;
  
    const dataURL = fabricCanvasRef.current.toDataURL({
      format: "png",
      quality: 1,
    });
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "greating-card.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const updateTextOnCanvas = (key: "dear" | "message" | "from" , text: string, left: number, top: number) => {
    if (!fabricCanvasRef.current) return;

    const canvas = fabricCanvasRef.current;
    if (textObjectsRef.current[key]) {
      canvas.remove(textObjectsRef.current[key]!);
    }
    if (!text) {
      canvas.renderAll();
      return;
    }
    const textObj = new fabric.Text(text, {
      left,
      top,
      fontSize: 24,
      fill: "black",
      selectable: true,
    });

    textObjectsRef.current[key] = textObj;
    canvas.add(textObj);
    canvas.renderAll();
  };

  useEffect(() => {
    updateTextOnCanvas("dear", dear, 50, 100);
  }, [dear]);

  useEffect(() => {
    updateTextOnCanvas("message", message, 50, 150);
  }, [message]);

  useEffect(() => {
    updateTextOnCanvas("from", from, 50, 200);
  }, [from]);

  return (
    <main className="container lg:w-3/5  w-full min-h-screen mx-auto">
      <Card>
        <h1 className="lg:text-3xl text-2xl font-semibold py-2">Gift Card</h1>
        <div className="my-5 border-t border-gray-300 border-b">
        {initialFile && (
          <div className="flex justify-center my-2">
            <canvas
              ref={canvasRef}
              width={350} 
              height={350} 
              className="border border-gray-300 w-full max-w-xs"
            />
          </div>
        )}
          <FileUpload
            onFileSelect={(file) => {
              setInitialFile(true);
              const reader = new FileReader();
              reader.onload = (e) => {
                if (e.target?.result) {
                  setTimeout(() => {
                    if (!fabricCanvasRef.current) return;
                    fabric.Image.fromURL(
                      e.target!.result as string,
                      (image) => {
                        fabricCanvasRef.current?.add(image);
                        fabricCanvasRef.current?.renderAll();
                      }
                    );
                  }, 100);
                }
              };
              reader.readAsDataURL(file);
            }}
          />
          <p className="text-red-500 text-sm">{errorMessage.find((error) => error.key === "image")?.message}</p>
          <section className="my-2 border rounded-lg p-2 border-gray-300">
            <TextField
              id="dear"
              label="Dear"
              placeholder="Please enter name"
              value={dear}
              errorMessage={ errorMessage.find((error) => error.key === "dear")?.message }
              onChange={(e) => setDear(e.target.value)}
            />
            <TextAreaField
              id="message"
              label="Message"
              placeholder="Please enter message"
              errorMessage={ errorMessage.find((error) => error.key === "message")?.message }
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <TextField
              id="from"
              label="From"
              placeholder="Please enter name"
              value={from}
              errorMessage={ errorMessage.find((error) => error.key === "from")?.message }
              onChange={(e) => setFrom(e.target.value)}
            />
          </section>
          <div className="flex justify-center my-2">
            <Button onClick={handleDownload}>Download</Button>
          </div>
        </div>
      </Card>
    </main>
  );
}

export default App;
