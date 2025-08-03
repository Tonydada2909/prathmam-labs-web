import { useState, useEffect } from 'react';
import { X, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const WelcomePopup = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleWhatsApp = () => {
    const whatsappNumber = "919799656357";
    const message = "Hello! I saw your welcome message. I would like to inquire about lab tests.";
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-medical max-w-md w-full p-6 animate-scale-in">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
              <img 
                src="/lovable-uploads/a6a52f9a-8cf2-4b94-87ca-841de2fda975.png" 
                alt="Prathmam Logo" 
                className="w-8 h-8 object-contain"
              />
            </div>
            <div>
              <h3 className="text-lg font-bold text-foreground">Welcome to Prathmam Labs</h3>
              <p className="text-sm text-muted-foreground">प्रथमम् लैब्स में आपका स्वागत है</p>
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setIsOpen(false)}
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="space-y-4">
          <p className="text-foreground">
            Hello! Tell me how can I help you today?
          </p>
          <p className="text-muted-foreground text-sm">
            हैलो! बताएं आज मैं आपकी कैसे सहायता कर सकता हूं?
          </p>
          
          <div className="flex gap-3">
            <Button 
              onClick={handleWhatsApp}
              className="flex-1 bg-green-500 hover:bg-green-600 text-white"
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              Chat on WhatsApp
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setIsOpen(false)}
              className="flex-1"
            >
              Browse Website
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePopup;