import { useState } from 'react';
import { Menu, X, ChevronDown, Phone, MapPin, User, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isAdmin, signOut } = useAuth();

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'Find Nearby Labs', href: '#about' },
    { name: 'Packages', href: '#packages' },
    { name: 'Tests', href: '#tests' },
    { name: 'Downloads', href: '#downloads' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Blog', href: '#blog' },
    { name: 'Doctors Zone', href: '#doctors' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center gap-3">
              <img 
                src="/lovable-uploads/287bfd2f-2f1f-43be-8391-995acac3fa03.png" 
                alt="Prathmam Medicare Labs Logo" 
                className="h-10 w-10"
              />
              <div>
                <h1 className="text-lg font-bold text-green-600">
                  Prathmam Medicare Labs
                </h1>
                <p className="text-xs text-gray-500">A unit of Prathmam Medicare LLP</p>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-1">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-green-600 px-3 py-2 text-sm font-medium transition-colors duration-200"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="hidden md:flex items-center space-x-3">
            <div className="flex items-center text-green-600 text-sm font-medium">
              <Phone className="h-4 w-4 mr-1" />
              +91 9166126555
            </div>
            
            {isAdmin && (
              <Link to="/admin">
                <Button variant="outline" size="sm" className="border-purple-300 text-purple-600 hover:bg-purple-50">
                  Admin
                </Button>
              </Link>
            )}
            
            {user ? (
              <Button variant="outline" size="sm" onClick={signOut} className="border-red-300 text-red-600 hover:bg-red-50">
                Sign Out
              </Button>
            ) : (
              <Link to="/auth">
                <Button variant="outline" size="sm" className="border-gray-300 text-gray-700 hover:bg-gray-50">
                  <User className="w-4 h-4 mr-2" />
                  Login
                </Button>
              </Link>
            )}
            
            <Button className="bg-green-600 hover:bg-green-700 text-white">
              <ShoppingCart className="w-4 h-4 mr-2" />
              Cart
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-green-600 p-2"
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
              <a
                key={item.name}
                href={item.href}
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-green-600 hover:bg-gray-50 rounded-md"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </a>
            ))}
            <div className="px-3 pt-4 space-y-2">
              {isAdmin && (
                <Link to="/admin" onClick={() => setIsOpen(false)}>
                  <Button variant="outline" size="sm" className="w-full border-purple-300 text-purple-600">
                    Admin
                  </Button>
                </Link>
              )}
              {user ? (
                <Button variant="outline" size="sm" className="w-full border-red-300 text-red-600" onClick={() => { signOut(); setIsOpen(false); }}>
                  Sign Out
                </Button>
              ) : (
                <Link to="/auth" onClick={() => setIsOpen(false)}>
                  <Button variant="outline" size="sm" className="w-full border-gray-300 text-gray-700">
                    <User className="w-4 h-4 mr-2" />
                    Login
                  </Button>
                </Link>
              )}
              <Button className="w-full bg-green-600 text-white">
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