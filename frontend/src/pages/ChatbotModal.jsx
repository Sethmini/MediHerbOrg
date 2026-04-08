import React, { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { Modal, Button, Form, Spinner, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; // <- Import useNavigate
import axios from "axios";
import "./styles/Chatbot.css";

function ChatbotModal({ show, handleClose }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [savedSpecialization, setSavedSpecialization] = useState(
    localStorage.getItem("predicted_specialization") || ""
  );

  const messagesEndRef = useRef(null);
  const navigate = useNavigate(); // <- Hook to navigate programmatically

  // Auto scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, show]);

  const sendMessage = useCallback(async () => {
    const trimmedInput = input.trim();
    if (!trimmedInput) return;

    const userMessage = { from: "user", text: trimmedInput };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/v1/chat/message",
        { message: trimmedInput }
      );

      const { reply, symptoms, predicted_specialization } = response.data;

      const botMessages = [
        {
          from: "bot",
          text: reply || "Sorry, I didn’t quite get that. Could you rephrase?",
        },
      ];

      if (symptoms?.length > 0) {
        botMessages.push({
          from: "bot",
          text: `🩺 I detected these symptoms: ${symptoms.join(", ")}.`,
        });
      }

      if (predicted_specialization) {
        botMessages.push({
          from: "bot",
          text: `🤖 Based on your symptoms, you may want to consult a **${predicted_specialization}**.`,
        });

        // Save specialization in localStorage
        localStorage.setItem("predicted_specialization", predicted_specialization);
        setSavedSpecialization(predicted_specialization);

        // Navigate to /doctors page immediately
        navigate("/doctors");
      }

      // Limit messages to last 50 for performance
      setMessages((prev) => [...prev, ...botMessages].slice(-50));
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "⚠️ Something went wrong. Please try again later." },
      ]);
    } finally {
      setLoading(false);
    }
  }, [input, navigate]);

  const handleKeyPress = useCallback(
    (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
      }
    },
    [sendMessage]
  );

  const handleCloseModal = () => {
    setMessages([]);
    setInput("");
    handleClose();
  };

  const clearSavedSpecialization = () => {
    localStorage.removeItem("predicted_specialization");
    setSavedSpecialization("");
  };

  const renderedMessages = useMemo(
    () =>
      messages.map((msg, idx) => (
        <div
          key={idx}
          style={{
            textAlign: msg.from === "user" ? "right" : "left",
            margin: "6px 0",
          }}
        >
          <div
            style={{
              display: "inline-block",
              padding: "10px 14px",
              borderRadius: "15px",
              backgroundColor: msg.from === "user" ? "#0d6efd" : "#f1f3f5",
              color: msg.from === "user" ? "#fff" : "#212529",
              maxWidth: "80%",
              wordWrap: "break-word",
              whiteSpace: "pre-wrap",
              boxShadow:
                msg.from === "user"
                  ? "0 2px 5px rgba(13,110,253,0.3)"
                  : "0 2px 5px rgba(0,0,0,0.1)",
            }}
            dangerouslySetInnerHTML={{
              __html: msg.text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>"),
            }}
          />
        </div>
      )),
    [messages]
  );

  return (
    <Modal show={show} onHide={handleCloseModal} centered size="md">
      <Modal.Header closeButton>
        <Modal.Title>🩺 Doctor Recommendation</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {savedSpecialization && (
          <Alert
            variant="info"
            className="d-flex justify-content-between align-items-center"
          >
            <div>
              💾 Saved recommendation: <strong>{savedSpecialization}</strong>
            </div>
            <Button size="sm" variant="outline-danger" onClick={clearSavedSpecialization}>
              Clear
            </Button>
          </Alert>
        )}

        <div
          className="chat-container"
          style={{
            maxHeight: "400px",
            overflowY: "auto",
            padding: "10px",
            border: "1px solid #ddd",
            borderRadius: "8px",
            backgroundColor: "#fff",
            marginBottom: "10px",
          }}
        >
          {renderedMessages}
          <div ref={messagesEndRef} />
        </div>

        <Form>
          <Form.Group className="d-flex gap-2">
            <Form.Control
              as="textarea"
              rows={1}
              placeholder="Describe your symptoms..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={loading}
              style={{ resize: "none" }}
            />
            <Button onClick={sendMessage} disabled={loading || !input.trim()}>
              {loading ? <Spinner animation="border" size="sm" /> : "Send"}
            </Button>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default ChatbotModal;
