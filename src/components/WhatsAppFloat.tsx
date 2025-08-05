import { MessageCircle, Phone } from 'lucide-react';

const WhatsAppFloat = () => {
  const whatsappNumber = "919799656357";
  const message = "Hello! I would like to inquire about lab tests.";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center space-y-2">
      <span className="text-xs text-gray-600 bg-white px-2 py-1 rounded shadow-sm">Need Help?</span>
      <span className="text-xs text-gray-700 font-medium">9799656357</span>
      <div className="flex space-x-2">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 group"
          aria-label="Contact us on WhatsApp"
        >
          <MessageCircle className="h-5 w-5" />
          <div className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            WhatsApp
          </div>
        </a>
        <a
          href="tel:+919799656357"
          className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 group"
          aria-label="Call us"
        >
          <Phone className="h-5 w-5" />
          <div className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Call
          </div>
        </a>
      </div>
    </div>
  );
};

export default WhatsAppFloat;