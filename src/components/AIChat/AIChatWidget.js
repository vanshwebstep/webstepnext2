"use client";
import React, { useState, useEffect, useRef } from "react";

const AIChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hello! 👋 I'm WebStep's AI assistant. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showNotif, setShowNotif] = useState(true);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
      setShowNotif(false);
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

 const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    const userMsg = { role: "user", content: trimmed };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);

    try {
      const apiEndpoint = (process.env.NEXT_PUBLIC_PHP_API_URL || "https://webstepsolutions.com/admin").replace(/\/+$/, "") + "/api/chat.php";
      const res = await fetch(apiEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updatedMessages }),
      });

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply || "Sorry, I could not process that. Please try again!" },
      ]);

    } catch (err) {
      console.error("Chat request failed:", err);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, something went wrong. Please try again! 🙏",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      <style>{`
        .ws-widget * {
          font-family: inherit;
          box-sizing: border-box;
        }

        .ws-bubble {
          position: fixed;
          bottom: 28px;
          right: 28px;
          z-index: 99999;
        }

        .ws-trigger {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: linear-gradient(135deg, #FF1F8E, #ff6eb4);
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 8px 32px rgba(255,31,142,0.45);
          transition: transform 0.3s cubic-bezier(.34,1.56,.64,1), box-shadow 0.3s ease;
          position: relative;
        }
        .ws-trigger:hover {
          transform: scale(1.1);
          box-shadow: 0 12px 40px rgba(255,31,142,0.55);
        }
        .ws-trigger svg {
          transition: transform 0.3s ease, opacity 0.2s ease;
        }

        .ws-notif {
          position: absolute;
          top: -8px;
          right: -6px;
          background: #0f172a;
          color: white;
          font-size: 10px;
          font-weight: 700;
          padding: 2px 7px;
          border-radius: 20px;
          white-space: nowrap;
          animation: ws-bounce 2s infinite;
          border: 2px solid white;
        }
        @keyframes ws-bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }

        .ws-panel {
          position: fixed;
          bottom: 100px;
          right: 28px;
          width: 370px;
          max-height: 560px;
          background: #fff;
          border-radius: 24px;
          box-shadow: 0 24px 80px rgba(0,0,0,0.18), 0 4px 20px rgba(255,31,142,0.08);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          z-index: 99998;
          transform-origin: bottom right;
          animation: ws-open 0.35s cubic-bezier(.34,1.56,.64,1);
          border: 1px solid rgba(255,31,142,0.1);
        }
        @keyframes ws-open {
          from { opacity: 0; transform: scale(0.7) translateY(20px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }

        .ws-header {
          background: linear-gradient(135deg, #FF1F8E 0%, #ff6eb4 100%);
          padding: 18px 20px 16px;
          display: flex;
          align-items: center;
          gap: 12px;
          position: relative;
        }
        .ws-avatar {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: rgba(255,255,255,0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 22px;
          flex-shrink: 0;
          border: 2px solid rgba(255,255,255,0.4);
        }
        .ws-header-info { flex: 1; }
        .ws-header-name {
          color: white;
          font-weight: 700;
          font-size: 15px;
          line-height: 1.2;
        }
        .ws-header-status {
          display: flex;
          align-items: center;
          gap: 5px;
          color: rgba(255,255,255,0.85);
          font-size: 12px;
          margin-top: 3px;
          font-weight: 500;
        }
        .ws-status-dot {
          width: 7px; height: 7px;
          background: #4ade80;
          border-radius: 50%;
          animation: ws-pulse 2s infinite;
        }
        @keyframes ws-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(0.85); }
        }
        .ws-close {
          background: rgba(255,255,255,0.2);
          border: none;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 16px;
          transition: background 0.2s;
        }
        .ws-close:hover { background: rgba(255,255,255,0.35); }

        .ws-messages {
          flex: 1;
          overflow-y: auto;
          padding: 16px 14px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          background: #f8fafc;
          scroll-behavior: smooth;
        }
        .ws-messages::-webkit-scrollbar { width: 4px; }
        .ws-messages::-webkit-scrollbar-thumb {
          background: #e2e8f0;
          border-radius: 4px;
        }

        .ws-msg {
          display: flex;
          gap: 8px;
          max-width: 90%;
          animation: ws-msg-in 0.25s ease;
        }
        @keyframes ws-msg-in {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .ws-msg.user { align-self: flex-end; flex-direction: row-reverse; }
        .ws-msg.assistant { align-self: flex-start; }

        .ws-msg-avatar {
          width: 28px; height: 28px;
          border-radius: 50%;
          background: linear-gradient(135deg, #FF1F8E, #ff6eb4);
          display: flex; align-items: center; justify-content: center;
          font-size: 13px;
          flex-shrink: 0;
          margin-top: auto;
        }

        .ws-msg-bubble {
          padding: 10px 14px;
          border-radius: 18px;
          font-size: 13.5px;
          line-height: 1.55;
          font-weight: 500;
          word-break: break-word;
        }
        .ws-msg.assistant .ws-msg-bubble {
          background: white;
          color: #1e293b;
          border-bottom-left-radius: 4px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.06);
        }
        .ws-msg.user .ws-msg-bubble {
          background: linear-gradient(135deg, #FF1F8E, #e8127a);
          color: white;
          border-bottom-right-radius: 4px;
        }

        .ws-typing {
          display: flex; gap: 5px;
          align-items: center;
          padding: 12px 16px;
          background: white;
          border-radius: 18px;
          border-bottom-left-radius: 4px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.06);
          width: fit-content;
        }
        .ws-dot {
          width: 7px; height: 7px;
          background: #FF1F8E;
          border-radius: 50%;
          animation: ws-typing-anim 1.2s infinite;
        }
        .ws-dot:nth-child(2) { animation-delay: 0.2s; }
        .ws-dot:nth-child(3) { animation-delay: 0.4s; }
        @keyframes ws-typing-anim {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
          30% { transform: translateY(-6px); opacity: 1; }
        }

        .ws-input-area {
          padding: 12px 14px;
          background: white;
          border-top: 1px solid #f1f5f9;
          display: flex;
          gap: 8px;
          align-items: flex-end;
        }
        .ws-input {
          flex: 1;
          border: 1.5px solid #e2e8f0;
          border-radius: 14px;
          padding: 10px 14px;
          font-size: 13.5px;
          font-family: inherit;
          resize: none;
          outline: none;
          color: #1e293b;
          background: #f8fafc;
          transition: border-color 0.2s, box-shadow 0.2s;
          max-height: 100px;
          line-height: 1.4;
          font-weight: 500;
        }
        .ws-input:focus {
          border-color: #FF1F8E;
          box-shadow: 0 0 0 3px rgba(255,31,142,0.1);
          background: white;
        }
        .ws-send {
          width: 40px; height: 40px;
          border-radius: 12px;
          background: linear-gradient(135deg, #FF1F8E, #e8127a);
          border: none;
          cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          transition: transform 0.2s, box-shadow 0.2s, opacity 0.2s;
          box-shadow: 0 4px 14px rgba(255,31,142,0.35);
        }
        .ws-send:hover:not(:disabled) {
          transform: scale(1.07);
          box-shadow: 0 6px 20px rgba(255,31,142,0.45);
        }
        .ws-send:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }
        .ws-send svg { color: white; }

        .ws-footer {
          text-align: center;
          font-size: 11px;
          color: #94a3b8;
          padding: 6px 0 10px;
          font-weight: 500;
          background: white;
        }

        @media (max-width: 420px) {
          .ws-panel {
            width: calc(100vw - 24px);
            right: 12px;
            bottom: 88px;
          }
          .ws-bubble { right: 16px; bottom: 20px; }
        }
      `}</style>

      <div className="ws-widget ws-bubble">

        {/* Notification badge */}
        {showNotif && !isOpen && (
          <div className="ws-notif">Ask me anything!</div>
        )}

        {/* Chat Trigger Button */}
        <button
          className="ws-trigger"
          onClick={() => setIsOpen((v) => !v)}
          aria-label="Open chat"
        >
          {isOpen ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          ) : (
            <svg width="26" height="26" viewBox="0 0 24 24" fill="white">
              <path d="M12 2C6.48 2 2 6.02 2 11c0 2.68 1.15 5.09 3 6.79V22l4.33-2.17C10.5 20.26 11.24 20.35 12 20.35c5.52 0 10-4.02 10-8.97S17.52 2 12 2z"/>
            </svg>
          )}
        </button>

        {/* Chat Panel */}
        {isOpen && (
          <div className="ws-panel">
            {/* Header */}
            <div className="ws-header">
              <div className="ws-avatar">🤖</div>
              <div className="ws-header-info">
                <div className="ws-header-name">WebStep AI Assistant</div>
                <div className="ws-header-status">
                  <div className="ws-status-dot" />
                  Online — replies instantly
                </div>
              </div>
              <button className="ws-close" onClick={() => setIsOpen(false)}>✕</button>
            </div>

            {/* Messages */}
            <div className="ws-messages">
              {messages.map((msg, i) => (
                <div key={i} className={`ws-msg ${msg.role}`}>
                  {msg.role === "assistant" && (
                    <div className="ws-msg-avatar">🤖</div>
                  )}
                  <div className="ws-msg-bubble">{msg.content}</div>
                </div>
              ))}
              {isLoading && (
                <div className="ws-msg assistant">
                  <div className="ws-msg-avatar">🤖</div>
                  <div className="ws-typing">
                    <div className="ws-dot" />
                    <div className="ws-dot" />
                    <div className="ws-dot" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="ws-input-area">
              <textarea
                ref={inputRef}
                className="ws-input"
                rows={1}
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <button
                className="ws-send"
                onClick={sendMessage}
                disabled={!input.trim() || isLoading}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13"/>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                </svg>
              </button>
            </div>

            <div className="ws-footer">Powered by WebStep AI</div>
          </div>
        )}
      </div>
    </>
  );
};

export default AIChatWidget;
