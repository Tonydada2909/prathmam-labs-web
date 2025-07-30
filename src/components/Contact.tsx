import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, Instagram } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    toast({
      title: "Message Sent!",
      description: "Thank you for contacting us. We'll get back to you soon.",
    });
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone',
      details: '+91 9403892093',
      link: 'tel:9403892093'
    },
    {
      icon: Mail,
      title: 'Email',
      details: 'contact@prathmammedlabs.com',
      link: 'mailto:contact@prathmammedlabs.com'
    },
    {
      icon: MapPin,
      title: 'Address',
      details: 'Prathmam Medicare Labs, Karauli, Rajasthan, India',
      link: '#'
    },
    {
      icon: Clock,
      title: 'Working Hours',
      details: 'Mon-Sat: 7:00 AM - 8:00 PM\nSun: 8:00 AM - 6:00 PM',
      link: '#'
    }
  ];

  return (
    <section id="contact" className="py-20 bg-accent/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Get in <span className="text-primary">Touch</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Have questions or need to book a test? We're here to help you with all your diagnostic needs.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-6">Contact Information</h3>
            <div className="space-y-6 mb-8">
              {contactInfo.map((info, index) => (
                <Card key={index} className="border-none shadow-card hover:shadow-medical transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <info.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-foreground mb-1">{info.title}</h4>
                        {info.link !== '#' ? (
                          <a 
                            href={info.link} 
                            className="text-muted-foreground hover:text-primary transition-colors whitespace-pre-line"
                          >
                            {info.details}
                          </a>
                        ) : (
                          <p className="text-muted-foreground whitespace-pre-line">{info.details}</p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Social Media */}
            <Card className="border-none shadow-card">
              <CardContent className="p-6">
                <h4 className="font-semibold text-foreground mb-4">Follow Us</h4>
                <div className="flex gap-4">
                  <Button variant="outline" size="sm" asChild>
                    <a href="https://instagram.com/prathmam_labs" target="_blank" rel="noopener noreferrer">
                      <Instagram className="h-4 w-4 mr-2" />
                      @prathmam_labs
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Map */}
            <div className="mt-8">
              <Card className="border-none shadow-card overflow-hidden">
                <CardHeader>
                  <CardTitle>Our Location</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="h-64 bg-gray-200 flex items-center justify-center">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3592.2487542!2d77.0281!3d26.8983!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjbCsDUzJzU0LjAiTiA3N8KwMDEnNDEuMiJF!5e0!3m2!1sen!2sin!4v1234567890"
                      width="100%"
                      height="256"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Prathmam Medicare Labs Location"
                    ></iframe>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <Card className="border-none shadow-card">
              <CardHeader>
                <CardTitle className="text-2xl">Send us a Message</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                        Full Name *
                      </label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                        Phone Number *
                      </label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Your phone number"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                      Email Address
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your.email@example.com"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                      Message *
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell us about your requirements or questions..."
                    />
                  </div>
                  
                  <Button type="submit" variant="cta" className="w-full">
                    <Send className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <div className="mt-8 grid md:grid-cols-2 gap-4">
              <Button variant="medical" asChild>
                <a href="tel:9403892093">
                  <Phone className="h-4 w-4 mr-2" />
                  Call Now
                </a>
              </Button>
              <Button variant="outline" asChild>
                <a href="https://wa.me/919403892093" target="_blank" rel="noopener noreferrer">
                  WhatsApp Chat
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;