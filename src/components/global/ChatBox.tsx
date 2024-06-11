"use client";

import { colors } from "@/constants";
import { geminiService } from "@/services/api/gemini";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { IoMdSend } from "react-icons/io";
import { MdAdd, MdOutlineClose } from "react-icons/md";
import Markdown from "react-markdown";

const Chatbox = ({ toggleChatBox }: { toggleChatBox: () => void }) => {
  const textareaRef = useRef(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [currentPrompt, setCurrentPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const textarea: any = textareaRef.current;

  const handleStartNewSession = async () => {
    setMessages([]);
    await geminiService.startNewChat();
  };

  useEffect(() => {
    const getChatHistory = async () => {
      const response = await geminiService.getChatHistory();
      const historyMessages = response.data.map((message: any) => {
        const text = message.parts.map((part: any) => part.text).join("");
        const role = message.role;
        return { text, role };
      });
      setMessages(historyMessages);
    };
    getChatHistory();
  }, []);

  useEffect(() => {
    const adjustTextareaHeight = () => {
      if (textarea) {
        textarea.style.height = "auto";
        textarea.style.height = textarea.scrollHeight + "px";
      }
    };

    if (textarea) {
      textarea.addEventListener("input", adjustTextareaHeight);
    }

    adjustTextareaHeight();

    return () => {
      if (textarea) {
        textarea.removeEventListener("input", adjustTextareaHeight);
      }
    };
  }, [textarea]);

  const handleSendPrompt = async () => {
    setMessages([...messages, { text: currentPrompt, role: "user" }]);
    setCurrentPrompt("");
    textarea.style.height = "auto";
    try {
      setLoading(true);
      const response = await geminiService.generateText(currentPrompt);
      setLoading(false);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: response.data.text, role: "model" },
      ]);
    } catch (err) {
      console.log(err);
      setLoading(false);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: "Xin lỗi, có lỗi xảy ra", role: "model" },
      ]);
    }
  };

  return (
    <div className="absolute top-full right-0 w-[420px] h-[calc(100vh-66px)] bg-white border border-slate-300 shadow-md">
      <div className="px-4 py-2 border-b border-gray-300 flex justify-between">
        <span className="font-semibold">Chatbot</span>
        <div className="flex gap-2">
          <div
            className="tooltip tooltip-bottom flex-center"
            data-tip="New chat"
          >
            <button
              onClick={handleStartNewSession}
              disabled={messages.length === 0}
            >
              <MdAdd size={24} color="#666" />
            </button>
          </div>
          <button onClick={toggleChatBox}>
            <MdOutlineClose size={20} color="#666" />
          </button>
        </div>
      </div>

      <div className="px-4 py-2 max-h-[420px] overflow-y-scroll">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center mt-8">
            <Image
              src="https://res.cloudinary.com/dufuwsrue/image/upload/v1717771748/motortour/images/other/download_khte6v.jpg"
              alt="chatbot-logo"
              width={100}
              height={100}
            />
            <span className="mt-2 font-semibold">
              Xin chào! Tôi có thể giúp gì cho bạn
            </span>
          </div>
        ) : (
          messages.map((message, index) => (
            <div key={index} className="mt-2">
              <p className="font-semibold text-primary">
                {message.role === "user" ? "Bạn" : "Chatbot"}
              </p>
              <Markdown>{message.text}</Markdown>
            </div>
          ))
        )}
        {loading && (
          <div className="relative flex w-full animate-pulse gap-2 py-4">
            <div className="flex-1">
              <div className="mb-2 h-5 w-16 rounded-lg bg-slate-400 text-lg"></div>
              <div className="h-12 w-full rounded-lg bg-slate-400 text-sm"></div>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 absolute bottom-0 left-0 w-full">
        <div className="relative">
          <textarea
            ref={textareaRef}
            className="w-full min-h-10 max-h-[160px] border border-gray-500 rounded-2xl pl-2 pr-10 bg-[#f0f4f9] placeholder:text-gray-600 block resize-none place-content-center overflow-auto hidden-scrollbar"
            placeholder="Nhập thông tin cần trợ giúp"
            value={currentPrompt}
            onChange={(e) => setCurrentPrompt(e.target.value)}
          />
          <button
            className="absolute right-2 top-1/2 transform -translate-y-1/2"
            onClick={handleSendPrompt}
          >
            <IoMdSend
              size={22}
              color={currentPrompt ? colors.primary : "#666"}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbox;
