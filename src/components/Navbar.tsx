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
      ]
    },
    { name: 'About Us', href: '#about' },
    { name: 'Doctors Zone', href: '#doctors' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className="bg-white/95 backdrop-blur-md shadow-card sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top info bar */}
        <div className="border-b border-gray-100 py-2 text-sm">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4 text-muted-foreground">
              <div className="flex items-center gap-1">
                <Phone className="h-4 w-4" />
                <span>9403892093</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>Karauli, Rajasthan</span>
              </div>
            </div>
            <div className="hidden md:block text-primary font-medium">
              ISO Certified Lab | Trusted Healthcare
            </div>
          </div>
        </div>

        {/* Main navbar */}
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Prathmam Medicare Labs
              </h1>
              <p className="text-xs text-muted-foreground">Accurate • Reliable • Trusted</p>
            </div>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navItems.map((item) => (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => item.dropdown && setActiveDropdown(item.name)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <a
                    href={item.href}
                    className="flex items-center text-foreground hover:text-primary px-3 py-2 text-sm font-medium transition-colors"
                  >
                    {item.name}
                    {item.dropdown && <ChevronDown className="ml-1 h-4 w-4" />}
                  </a>
                  
                  {item.dropdown && activeDropdown === item.name && (
                    <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-lg shadow-lg border z-50">
                      {item.dropdown.map((dropItem) => (
                        <a
                          key={dropItem.name}
                          href={dropItem.href}
                          className="block px-4 py-2 text-sm text-foreground hover:bg-accent hover:text-accent-foreground first:rounded-t-lg last:rounded-b-lg"
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
              <a href="tel:9403892093">Book Test</a>
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
                <a href="tel:9403892093">Book Test</a>
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;