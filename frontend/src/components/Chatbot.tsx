'use client';
import { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "system", content: "You are a helpful assistant." },
    { role: "assistant", content: "Hi! How can I assist you today?" },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const toggleChat = () => setIsOpen(!isOpen);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  async function sendMessage() {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch response");
      }

      const data = await response.json();
      const assistantMessage = data.message;

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Oops, something went wrong. Please try again.",
        },
      ]);
    }
  }

  return (
    <>
      <button
        className="fixed bottom-20 right-6 bg-blue-700 hover:bg-blue-800 text-white rounded-full p-3 shadow-md z-50"
        onClick={toggleChat}
        aria-label="Toggle Chatbot"
      >
        💬
      </button>

      {isOpen && (
        <div className="fixed bottom-20 right-6 w-80 bg-white border border-gray-300 rounded-xl shadow-xl z-50 flex flex-col overflow-hidden">
          <div className="bg-blue-700 text-white p-3 font-semibold flex justify-between items-center">
            AI Chat Assistant
            <button
              onClick={toggleChat}
              className="text-white font-bold px-2"
              aria-label="Close Chatbot"
            >
              ✕
            </button>
          </div>

          <div className="flex-1 p-3 space-y-2 overflow-y-auto max-h-64 text-gray-700">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`p-2 rounded-lg text-sm ${
                  msg.role === "user"
                    ? "bg-blue-100 text-right ml-auto"
                    : "bg-gray-200 text-left mr-auto"
                }`}
              >
                {msg.content}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-2 border-t flex">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              className="flex-1 px-3 py-1 border border-gray-300 rounded-l-md focus:outline-none text-gray-700"
              placeholder="Type a message..."
              aria-label="Message input"
            />
            <button
              onClick={sendMessage}
              className="bg-blue-700 text-white px-3 rounded-r-md flex items-center"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
