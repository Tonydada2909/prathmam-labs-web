import { MapPin, Phone, Mail, Instagram, Shield, Award } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About Us', href: '#about' },
    { name: 'Test Directory', href: '#tests' },
    { name: 'Health Packages', href: '#packages' },
    { name: 'Doctors Zone', href: '#doctors' },
    { name: 'Contact', href: '#contact' }
  ];

  const services = [
    'Blood Tests',
    'Urine Tests',
    'Biochemistry',
    'Hematology',
    'Microbiology',
    'Immunology',
    'Radiology',
    'Health Packages'
  ];

  return (
    <footer className="relative bg-foreground text-white overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img 
          src="/lovable-uploads/6316a920-f0e2-4589-86a7-d31768797075.png" 
          alt="Karauli City" 
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-foreground/80"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Prathmam Medicare Labs
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Leading diagnostic laboratory in Karauli, providing accurate and reliable test results 
              with state-of-the-art technology and experienced professionals.
            </p>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-primary" />
                <span className="text-sm">ISO Certified</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                <span className="text-sm">Quality Assured</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    className="text-gray-300 hover:text-primary transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Our Services</h4>
            <ul className="space-y-2">
              {services.map((service, index) => (
                <li key={index}>
                  <span className="text-gray-300 text-sm">{service}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-gray-300 text-sm">
                  Prathmam Medicare Labs<br />
                  Karauli, Rajasthan, India
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary" />
                <div className="text-gray-300 text-sm">
                  <a href="tel:9403892093" className="hover:text-primary transition-colors block">
                    +91 9403892093
                  </a>
                  <a href="tel:9799656357" className="hover:text-primary transition-colors block">
                    +91 9799656357
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary" />
                <a href="mailto:contact@prathmammedlabs.com" className="text-gray-300 hover:text-primary transition-colors text-sm">
                  contact@prathmammedlabs.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Instagram className="h-5 w-5 text-primary" />
                <a 
                  href="https://instagram.com/prathmam_labs" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-primary transition-colors text-sm"
                >
                  @prathmam_labs
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-300 text-sm">
              © {currentYear} Prathmam Medicare Labs. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-gray-300 hover:text-primary transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-300 hover:text-primary transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-gray-300 hover:text-primary transition-colors">
                Quality Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;