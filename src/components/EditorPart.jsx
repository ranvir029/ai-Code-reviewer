import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import Select from "react-select";
import { GoogleGenAI } from "@google/genai";
import Markdown from "react-markdown";
import PulseLoader from "react-spinners/PulseLoader";

const EditorPart = () => {
  const options = [
    { value: "javascript", label: "JavaScript" },
    { value: "typescript", label: "TypeScript" },
    { value: "python", label: "Python" },
    { value: "java", label: "Java" },
    { value: "csharp", label: "C#" },
    { value: "cpp", label: "C++" },
    { value: "php", label: "PHP" },
    { value: "go", label: "Go" },
    { value: "ruby", label: "Ruby" },
  ];

  const [selectedOption, setSelectedOption] = useState(options[0]);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");

  const ai = new GoogleGenAI({
    apiKey:import.meta.env.VITE_GOOGLE_API_KEY,
  });

  async function reviewCode() {
    setResponse("");
    setLoading(true);
    const response = await ai.models.generateContent({
      model: "gemini-1.5-flash",
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `You are an expert-level software developer, skilled in writing efficient, clean, and advanced code.
I'm sharing a piece of code written in ${selectedOption.value}.
Your job is to deeply review this code and provide the following:

1. A quality rating: Better, Good, Normal, or Bad.
2. Detailed suggestions for improvement, including best practices and advanced alternatives.
3. A clear explanation of what the code does, step by step.
4. A list of any potential bugs or logical errors, if found.
5. Identification of syntax errors or runtime errors, if present.
6. Solutions and recommendations on how to fix each identified issue.

Analyze it like a senior developer reviewing a pull request.

Here is the code:\n\`\`\`${selectedOption.value}\n${code}\n\`\`\``,
            },
          ],
        },
      ],
    });
    setResponse(response.text);
    setLoading(false);
  }

  return (
    <>
      <div
        className="
        flex flex-col lg:flex-row
        h-[calc(100vh-4rem)]
        overflow-y-auto lg:overflow-hidden
      "
      >
        {/* Left Section */}
        <div className="w-full lg:w-1/2 px-4 py-4 flex flex-col">
          <div className="flex items-center gap-4 flex-wrap">
            <Select
              value={selectedOption}
              onChange={(options) => setSelectedOption(options)}
              options={options}
              className="flex-1 min-w-[150px]"
            />
            <button
              onClick={() => {
                if (code === "") {
                  alert("Please Enter the code first");
                } else {
                  reviewCode();
                }
              }}
              className="bg-[#052659] text-[15px] border-none rounded-md h-[38px] text-white cursor-pointer font-medium px-4 py-2"
            >
              Review
            </button>
          </div>
          <div className="w-full flex-1 min-h-[300px] mt-3 ">
            <Editor
              language={selectedOption.value}
              theme="vs-dark"
              defaultValue="// some comment"
              className="rounded-lg w-full h-full"
              onChange={(e) => setCode(e)}
            />
          </div>
        </div>

        {/* Right Section */}
        <div
          className="
          w-full lg:w-1/2
          bg-[#1c2130] rounded-tl-xl
          mt-6 lg:mt-0
          flex flex-col
        "
        >
          <div className="shadow-xl flex justify-between items-center sticky top-0 bg-[#2d2f34] z-10">
            <h2 className="text-white  response font-bold text-[17px] px-6 py-2 h-12 rounded-tl-xl font-[Euclid Circular A]">
              Response
            </h2>
            <button
              className="border-none bg-white text-black mr-3 cursor-pointer px-4 py-2 font-medium rounded-sm"
              onClick={() => {
                setResponse("");
              }}
            >
              Clear All
            </button>
          </div>
          <div
            className="p-4 text-white overflow-y-auto min-h-[200px] lg:min-h-[0]"
            style={{ maxHeight: "78vh" }}
          >
            {loading && (
              <div className="flex justify-center items-center h-full">
                <PulseLoader color="blue" size={12} />
              </div>
            )}
            <Markdown>{response}</Markdown>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditorPart;
