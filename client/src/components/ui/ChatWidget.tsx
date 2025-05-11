import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { FaRobot, FaUser, FaPaperPlane, FaComment, FaTimes } from 'react-icons/fa';

type Message = {
  id: number;
  text: string;
  sender: 'user' | 'bot';
};

const ChatWidget = () => {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: 1, 
      text: t('chat.welcomeMessage'), 
      sender: 'bot' 
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMessage.trim()) return;
    
    // Add user message
    const userMessageId = Date.now();
    setMessages(prev => [
      ...prev, 
      { id: userMessageId, text: newMessage, sender: 'user' }
    ]);
    setNewMessage('');
    
    // Simulate bot response
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        { 
          id: userMessageId + 1, 
          text: t('chat.demoResponse'),
          sender: 'bot' 
        }
      ]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="absolute bottom-20 right-0 w-96 bg-white rounded-xl shadow-2xl overflow-hidden"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.2 }}
          >
            <div className="bg-primary text-white px-4 py-4 flex justify-between items-center">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center mr-3">
                  <FaRobot />
                </div>
                <div>
                  <h3 className="font-medium">{t('chat.title')}</h3>
                  <p className="text-xs text-white/70">{t('chat.subtitle')}</p>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white hover:bg-transparent"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            
            <div className="h-80 p-4 overflow-y-auto bg-neutral-50" id="chat-messages">
              {messages.map((message) => (
                <div 
                  key={message.id} 
                  className={`flex mb-4 ${message.sender === 'user' ? 'justify-end' : ''}`}
                >
                  {message.sender === 'bot' && (
                    <div className="flex-shrink-0 mr-3">
                      <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary">
                        <FaRobot className="text-sm" />
                      </div>
                    </div>
                  )}
                  
                  <div className={`p-3 rounded-lg shadow-sm max-w-xs ${
                    message.sender === 'user' 
                      ? 'bg-primary-100' 
                      : 'bg-white'
                  }`}>
                    <p className="text-neutral-800">{message.text}</p>
                  </div>
                  
                  {message.sender === 'user' && (
                    <div className="flex-shrink-0 ml-3">
                      <div className="w-8 h-8 rounded-full bg-neutral-300 flex items-center justify-center text-neutral-600">
                        <FaUser className="text-sm" />
                      </div>
                    </div>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            
            <div className="p-4 border-t">
              <form onSubmit={handleSubmit} className="flex">
                <Input
                  type="text"
                  placeholder={t('chat.inputPlaceholder')}
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="flex-grow rounded-l-md border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                />
                <Button 
                  type="submit" 
                  className="px-4 py-2 bg-primary text-white rounded-r-md hover:bg-primary/90"
                >
                  <i className="fas fa-paper-plane"></i>
                </Button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <Button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-primary rounded-full shadow-lg flex items-center justify-center text-white hover:bg-primary/90 transition duration-300"
      >
        <i className={`fas ${isOpen ? 'fa-times' : 'fa-comment-alt'} text-2xl`}></i>
      </Button>
    </div>
  );
};

export default ChatWidget;
