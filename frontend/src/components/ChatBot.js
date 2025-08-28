import React, { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, User, Minimize2 } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! I'm Consulta AI Assistant. How can I help you with automation solutions today?",
      sender: "bot",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Predefined responses for common queries
  const botResponses = {
    greeting: [
      "Hello! Welcome to Consulta Technologies. How can I assist you today?",
      "Hi there! I'm here to help you with any questions about our automation solutions.",
      "Greetings! How may I help you with your automation needs?"
    ],
    services: [
      "We provide automation solutions across 8 major industries: Power, Cement, Material Handling, Steel, Water, Chemical/Pharmaceutical, Food & Beverages, and Oil & Gas. Which industry are you interested in?",
      "Our services include industrial automation, process control systems, SCADA solutions, and custom automation development. What specific solution are you looking for?"
    ],
    contact: [
      "You can reach us at +91 22 27560593 or email info@consulta.in. Our office hours are Monday to Saturday, 10:00 AM - 6:00 PM. Would you like me to help you schedule a consultation?",
      "We're located at Tower 5, K-Block, International Technology Park, Belapur, Navi Mumbai. Feel free to visit us or call +91 22 27560593."
    ],
    pricing: [
      "Our pricing depends on the specific automation requirements and project scope. I'd recommend scheduling a free consultation to discuss your needs. Would you like me to connect you with our sales team?",
      "We offer competitive and affordable automation solutions. For a detailed quote, please share your project requirements, and our team will provide a customized proposal."
    ],
    experience: [
      "Consulta Technologies has over 15 years of experience in industrial automation with 500+ successful projects completed across various industries.",
      "We've been serving the automation industry since 2008, with a team of 50+ expert engineers and a 99% client satisfaction rate."
    ]
  };

  const getRandomResponse = (category) => {
    const responses = botResponses[category];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const generateBotResponse = (userMessage) => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
      return getRandomResponse('greeting');
    }
    if (message.includes('service') || message.includes('solution') || message.includes('industry')) {
      return getRandomResponse('services');
    }
    if (message.includes('contact') || message.includes('phone') || message.includes('email') || message.includes('address')) {
      return getRandomResponse('contact');
    }
    if (message.includes('price') || message.includes('cost') || message.includes('pricing') || message.includes('quote')) {
      return getRandomResponse('pricing');
    }
    if (message.includes('experience') || message.includes('years') || message.includes('projects')) {
      return getRandomResponse('experience');
    }
    if (message.includes('power')) {
      return "Our Power industry solutions include Smart Grid Systems, Renewable Energy Integration, Power Distribution Automation, and Energy Management Systems. We help optimize power generation and distribution processes.";
    }
    if (message.includes('cement')) {
      return "For the Cement industry, we provide Production Line Automation, Quality Control Systems, Kiln Process Optimization, and Raw Material Handling solutions to enhance efficiency and product quality.";
    }
    if (message.includes('steel')) {
      return "Our Steel industry expertise covers Blast Furnace Control, Rolling Mill Automation, Quality Testing Systems, and Scrap Processing automation to improve production efficiency.";
    }
    if (message.includes('water')) {
      return "Water industry solutions include Water Treatment Plant automation, Distribution Network management, Quality Monitoring systems, and Wastewater Management solutions.";
    }
    if (message.includes('chemical') || message.includes('pharmaceutical')) {
      return "We offer Process Control Systems, Batch Manufacturing automation, Compliance Monitoring, and Safety Systems for Chemical and Pharmaceutical industries.";
    }
    if (message.includes('food') || message.includes('beverage')) {
      return "Food & Beverage solutions include Production Line Control, Packaging Automation, Quality Assurance systems, and Cold Chain Management for optimal food safety and efficiency.";
    }
    if (message.includes('oil') || message.includes('gas')) {
      return "Oil & Gas industry solutions cover Pipeline Monitoring, Refinery Automation, Safety Systems, and Distribution Network management for secure and efficient operations.";
    }
    if (message.includes('material handling')) {
      return "Material Handling solutions include Conveyor Systems, Robotic Sorting, Warehouse Automation, and Inventory Management systems to streamline your logistics operations.";
    }
    
    // Default responses for unrecognized queries
    const defaultResponses = [
      "I'd be happy to help you with that! Could you please provide more details about your automation requirements?",
      "That's a great question! For detailed information, I recommend speaking with our technical team. Would you like me to schedule a consultation?",
      "I understand you're looking for automation solutions. Could you specify which industry or type of automation you're interested in?",
      "Thank you for your inquiry! For the best assistance, please let me know more about your specific automation needs or contact our experts at +91 22 27560593."
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: inputMessage,
      sender: "user",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentMessage = inputMessage;
    setInputMessage("");
    setIsTyping(true);

    try {
      // Import API service
      const { chatbotAPI } = await import('../services/api');
      
      // Get session ID from localStorage or generate new one
      let sessionId = localStorage.getItem('chatbot_session_id');
      
      // Send message to backend
      const response = await chatbotAPI.sendMessage(currentMessage, sessionId);
      
      // Store session ID for future messages
      if (response.session_id && !sessionId) {
        localStorage.setItem('chatbot_session_id', response.session_id);
      }

      const botMessage = {
        id: Date.now() + 1,
        text: response.message,
        sender: "bot",
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Chatbot error:', error);
      
      // Fallback to local response generation
      const botMessage = {
        id: Date.now() + 1,
        text: generateBotResponse(currentMessage),
        sender: "bot",
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(true)}
          className="group bg-gray-900 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
        >
          <MessageCircle className="h-6 w-6 group-hover:rotate-12 transition-transform duration-300" />
        </button>
      </div>
    );
  }

  return (
    <div className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${isMinimized ? 'w-80 h-16' : 'w-80 h-96'}`}>
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col h-full">
        {/* Header */}
        <div className="bg-gray-900 text-white p-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <Bot className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-semibold text-sm">Consulta AI Assistant</h3>
              <p className="text-xs text-gray-300">Online now</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="p-1 hover:bg-white/20 rounded transition-colors"
            >
              <Minimize2 className="h-4 w-4" />
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-white/20 rounded transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-gray-50">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className="flex items-start space-x-2 max-w-[80%]">
                    {message.sender === 'bot' && (
                      <div className="w-6 h-6 bg-gray-900 rounded-full flex items-center justify-center flex-shrink-0">
                        <Bot className="h-3 w-3 text-white" />
                      </div>
                    )}
                    <div
                      className={`px-3 py-2 rounded-2xl text-sm ${
                        message.sender === 'user'
                          ? 'bg-gray-900 text-white ml-auto'
                          : 'bg-white text-gray-900 border border-gray-200'
                      }`}
                    >
                      {message.text}
                    </div>
                    {message.sender === 'user' && (
                      <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                        <User className="h-3 w-3 text-gray-600" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-start space-x-2">
                    <div className="w-6 h-6 bg-gray-900 rounded-full flex items-center justify-center">
                      <Bot className="h-3 w-3 text-white" />
                    </div>
                    <div className="bg-white border border-gray-200 rounded-2xl px-3 py-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-200 bg-white">
              <div className="flex items-center space-x-2">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about our automation solutions..."
                  className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-xl focus:ring-1 focus:ring-gray-300 focus:border-gray-300"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim() || isTyping}
                  className="px-3 py-2 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ChatBot;