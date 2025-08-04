import { useState } from 'react';
import { Menu, X, ChevronDown, Phone, MapPin, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { user, isAdmin, signOut } = useAuth();

  const navItems = [
    { name: 'Home', href: '#home' },
    { 
      name: 'Services', 
      href: '#services',
      dropdown: [
        { name: 'Test Directory', href: '#tests' },
        { name: 'Health Packages', href: '#packages' },
        { name: 'Downloads', href: '#downloads' },
      ]
    },
    { name: 'About Us', href: '#about' },
    { name: 'Downloads', href: '#downloads' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Blog', href: '#blog' },
    { name: 'Doctors Zone', href: '#doctors' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 shadow-xl sticky top-0 z-50 animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top info bar */}
        <div className="border-b border-blue-500 py-2 text-sm bg-gradient-to-r from-primary to-blue-600 text-white">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4 animate-slide-in-left">
              <div className="flex items-center gap-1 hover:text-yellow-200 transition-colors">
                <Phone className="h-4 w-4" />
                <span>9403892093, 9799656357</span>
              </div>
              <div className="flex items-center gap-1 hover:text-yellow-200 transition-colors">
                <MapPin className="h-4 w-4" />
                <span>Karauli, Rajasthan</span>
              </div>
            </div>
            <div className="hidden md:block font-medium hover:text-yellow-200 transition-colors animate-slide-in-right">
              Advanced Diagnostic Services | Trusted Healthcare
            </div>
          </div>
        </div>

        {/* Main navbar */}
        <div className="flex justify-between items-center py-4 bg-white/95 backdrop-blur-sm">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center gap-3 group animate-scale-in">
              <img 
                src="/lovable-uploads/287bfd2f-2f1f-43be-8391-995acac3fa03.png" 
                alt="Prathmam Medicare Labs Logo" 
                className="h-12 w-12 group-hover:scale-110 transition-transform duration-300"
              />
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-700 to-blue-900 bg-clip-text text-transparent group-hover:from-blue-600 group-hover:to-blue-800 transition-all duration-300">
                  Prathmam Labs
                </h1>
                <p className="text-xs text-gray-600 group-hover:text-blue-600 transition-colors">Accurate • Reliable • Trusted</p>
              </div>
            </div>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navItems.map((item, index) => (
                <div
                  key={item.name}
                  className="relative group"
                  style={{animationDelay: `${index * 100}ms`}}
                  onMouseEnter={() => item.dropdown && setActiveDropdown(item.name)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <a
                    href={item.href}
                    className="flex items-center text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-all duration-300 hover:bg-blue-50 rounded-md transform hover:scale-105 story-link"
                  >
                    {item.name}
                    {item.dropdown && <ChevronDown className="ml-1 h-4 w-4" />}
                  </a>
                  
                  {item.dropdown && activeDropdown === item.name && (
                    <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-lg shadow-xl border border-blue-100 z-50 animate-scale-in">
                      {item.dropdown.map((dropItem) => (
                        <a
                          key={dropItem.name}
                          href={dropItem.href}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 hover:pl-6 first:rounded-t-lg last:rounded-b-lg"
                        >
                          {dropItem.name}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                {isAdmin && (
                  <Link to="/admin">
                    <Button variant="outline" size="sm">
                      Admin Dashboard
                    </Button>
                  </Link>
                )}
                <Button variant="outline" size="sm" onClick={signOut}>
                  Sign Out
                </Button>
              </>
            ) : (
              <Link to="/auth">
                <Button variant="outline" size="sm">
                  <User className="w-4 h-4 mr-2" />
                  Login
                </Button>
              </Link>
            )}
            <Button variant="cta" size="sm" asChild>
              <a href="https://wa.me/919799656357?text=Hello! I would like to book a test." target="_blank" rel="noopener noreferrer">Book Test</a>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-foreground hover:text-primary p-2"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <div key={item.name}>
                <a
                  href={item.href}
                  className="block px-3 py-2 text-base font-medium text-foreground hover:text-primary hover:bg-accent rounded-md"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </a>
                {item.dropdown && (
                  <div className="pl-4 space-y-1">
                    {item.dropdown.map((dropItem) => (
                      <a
                        key={dropItem.name}
                        href={dropItem.href}
                        className="block px-3 py-2 text-sm text-muted-foreground hover:text-primary rounded-md"
                        onClick={() => setIsOpen(false)}
                      >
                        {dropItem.name}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="px-3 pt-4 space-y-2">
              {user ? (
                <>
                  {isAdmin && (
                    <Link to="/admin" onClick={() => setIsOpen(false)}>
                      <Button variant="outline" size="sm" className="w-full">
                        Admin Dashboard
                      </Button>
                    </Link>
                  )}
                  <Button variant="outline" size="sm" className="w-full" onClick={() => { signOut(); setIsOpen(false); }}>
                    Sign Out
                  </Button>
                </>
              ) : (
                <Link to="/auth" onClick={() => setIsOpen(false)}>
                  <Button variant="outline" size="sm" className="w-full">
                    <User className="w-4 h-4 mr-2" />
                    Login
                  </Button>
                </Link>
              )}
              <Button variant="cta" className="w-full" asChild>
                <a href="https://wa.me/919799656357?text=Hello! I would like to book a test." target="_blank" rel="noopener noreferrer">Book Test</a>
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;