import { useState, useEffect } from 'react';
import { Menu, X, Phone, User, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { user, isAdmin, signOut } = useAuth();

  const navItems = [
    { name: 'Home', href: '#home', id: 'home' },
    { name: 'Packages', href: '#packages', id: 'packages' },
    { name: 'Tests', href: '#tests', id: 'tests' },
    { name: 'Downloads', href: '#downloads', id: 'downloads' },
    { name: 'Blog', href: '#blog', id: 'blog' },
    { name: 'Doctors', href: '#doctors', id: 'doctors' },
    { name: 'Contact', href: '#contact', id: 'contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => document.getElementById(item.id)).filter(Boolean);
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="bg-background/95 backdrop-blur-md shadow-medical border-b border-border sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo Section */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center gap-4 hover-lift">
              <img 
                src="/lovable-uploads/287bfd2f-2f1f-43be-8391-995acac3fa03.png" 
                alt="Prathmam Medicare Labs Logo" 
                className="h-12 w-12 rounded-lg shadow-sm"
              />
              <div>
                <h1 className="text-xl font-bold text-primary font-medium tracking-tight">
                  Prathmam Medicare Labs
                </h1>
                <p className="text-sm text-muted-foreground font-light">A unit of Prathmam Medicare LLP</p>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:block">
            <div className="flex items-center space-x-2">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.href)}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 relative group ${
                    activeSection === item.id
                      ? 'text-primary bg-primary/10 shadow-sm'
                      : 'text-foreground hover:text-primary hover:bg-primary/5'
                  }`}
                >
                  {item.name}
                  <span className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-3/4 ${
                    activeSection === item.id ? 'w-3/4' : ''
                  }`} />
                </button>
              ))}
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            <div className="flex items-center text-primary text-sm font-medium bg-primary/5 px-3 py-2 rounded-lg hover:bg-primary/10 transition-colors">
              <Phone className="h-4 w-4 mr-2" />
              +91 9403892093
            </div>
            
            {isAdmin && (
              <Link to="/admin">
                <Button variant="outline" size="sm" className="bg-purple-50 border-purple-200 text-purple-700 hover:bg-purple-100 font-medium">
                  Admin
                </Button>
              </Link>
            )}
            
            {user ? (
              <Button variant="outline" size="sm" onClick={signOut} className="bg-red-50 border-red-200 text-red-700 hover:bg-red-100 font-medium">
                Sign Out
              </Button>
            ) : (
              <Link to="/auth">
                <Button variant="outline" size="sm" className="bg-secondary border-border hover:bg-accent font-medium">
                  <User className="w-4 h-4 mr-2" />
                  Login
                </Button>
              </Link>
            )}
            
            <Button className="bg-primary hover:bg-primary-glow text-primary-foreground font-medium shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5">
              <ShoppingCart className="w-4 h-4 mr-2" />
              Cart
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-foreground hover:text-primary p-3 rounded-lg hover:bg-primary/5 transition-all duration-300"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="lg:hidden bg-background/98 backdrop-blur-md border-t border-border animate-fade-in">
          <div className="px-4 py-6 space-y-4">
            <div className="space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.href)}
                  className={`w-full text-left px-4 py-3 text-base font-medium rounded-lg transition-all duration-300 ${
                    activeSection === item.id
                      ? 'text-primary bg-primary/10 shadow-sm'
                      : 'text-foreground hover:text-primary hover:bg-primary/5'
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </div>
            
            <div className="border-t border-border pt-4 space-y-3">
              <div className="flex items-center justify-center text-primary text-sm font-medium bg-primary/5 px-3 py-2 rounded-lg">
                <Phone className="h-4 w-4 mr-2" />
                +91 9403892093
              </div>
              
              {isAdmin && (
                <Link to="/admin" onClick={() => setIsOpen(false)}>
                  <Button variant="outline" size="sm" className="w-full bg-purple-50 border-purple-200 text-purple-700 font-medium">
                    Admin
                  </Button>
                </Link>
              )}
              
              {user ? (
                <Button variant="outline" size="sm" className="w-full bg-red-50 border-red-200 text-red-700 font-medium" onClick={() => { signOut(); setIsOpen(false); }}>
                  Sign Out
                </Button>
              ) : (
                <Link to="/auth" onClick={() => setIsOpen(false)}>
                  <Button variant="outline" size="sm" className="w-full bg-secondary border-border hover:bg-accent font-medium">
                    <User className="w-4 h-4 mr-2" />
                    Login
                  </Button>
                </Link>
              )}
              
              <Button className="w-full bg-primary hover:bg-primary-glow text-primary-foreground font-medium shadow-md">
                <ShoppingCart className="w-4 h-4 mr-2" />
                Cart
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;