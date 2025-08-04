import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Clock, Users, Phone } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface Package {
  id: string;
  name: string;
  price: number;
  original_price?: number;
  ideal_for: string;
  included_tests: string[];
  report_time: string;
  is_popular?: boolean;
  is_active: boolean;
}

const HealthPackages = () => {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch packages from Supabase
  const fetchPackages = async () => {
    const { data, error } = await supabase
      .from('packages')
      .select('*')
      .eq('is_active', true)
      .order('price');
    
    if (error) {
      console.error('Error fetching packages:', error);
      return;
    }
    
    setPackages(data || []);
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await fetchPackages();
      setLoading(false);
    };

    loadData();

    // Set up real-time subscription
    const packagesChannel = supabase
      .channel('packages-changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'packages' }, 
        (payload) => {
          fetchPackages();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(packagesChannel);
    };
  }, []);

  if (loading) {
    return (
      <section id="packages" className="py-16 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">Loading packages...</div>
        </div>
      </section>
    );
  }

  return (
    <section id="packages" className="py-16 bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Health Packages</h2>
          <p className="text-lg text-gray-600">Comprehensive health checkup packages designed for your needs</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {packages.map((pkg) => (
            <Card key={pkg.id} className={`hover-lift relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 ${pkg.is_popular ? 'ring-2 ring-primary' : ''}`}>
              {pkg.is_popular && (
                <Badge className="absolute top-4 right-4 bg-primary text-white">
                  Most Popular
                </Badge>
              )}
              
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-xl font-bold mb-2">{pkg.name}</CardTitle>
                <div className="flex items-center justify-center gap-2 mb-2">
                  <span className="text-3xl font-bold text-primary">₹{pkg.price}</span>
                  {pkg.original_price && pkg.original_price > pkg.price && (
                    <span className="text-lg text-gray-500 line-through">₹{pkg.original_price}</span>
                  )}
                </div>
                <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                  <Users className="h-4 w-4" />
                  <span>{pkg.ideal_for}</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                  <Clock className="h-4 w-4" />
                  <span>{pkg.report_time}</span>
                </div>
              </CardHeader>

              <CardContent>
                <div className="mb-6">
                  <h4 className="font-semibold mb-3 text-gray-900">Includes:</h4>
                  <div className="space-y-2">
                    {pkg.included_tests.slice(0, 5).map((test, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-600">{test}</span>
                      </div>
                    ))}
                    {pkg.included_tests.length > 5 && (
                      <div className="text-sm text-gray-500 font-medium">
                        +{pkg.included_tests.length - 5} more tests
                      </div>
                    )}
                  </div>
                </div>

                <Button className="w-full" variant="cta" asChild>
                  <a href="https://wa.me/919799656357?text=Hello! I would like to book a health package." target="_blank" rel="noopener noreferrer">
                    <Phone className="mr-2 h-4 w-4" />
                    Book Package
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Custom Package Section */}
        <div className="bg-white rounded-lg shadow-md p-8 text-center animate-fade-in">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Need a Custom Package?</h3>
          <p className="text-gray-600 mb-6">
            Can't find what you're looking for? We can create a customized health package based on your specific requirements.
          </p>
          <Button variant="outline" size="lg" asChild>
            <a href="https://wa.me/919799656357?text=Hello! I would like to inquire about custom health packages." target="_blank" rel="noopener noreferrer">
              Contact Us for Custom Package
            </a>
          </Button>
        </div>

        {/* Admin Guide */}
        <div className="mt-16 p-6 bg-blue-50 rounded-lg border border-blue-200">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Package Management (Real-time Sync Enabled)</h3>
          <div className="text-left space-y-3 text-gray-700">
            <p><strong>✅ Your health packages are now connected to Supabase with real-time updates!</strong></p>
            <p><strong>To manage packages:</strong></p>
            <ol className="list-decimal list-inside space-y-2">
              <li>Login as admin and go to Admin Dashboard</li>
              <li>Navigate to "Packages Management"</li>
              <li>Add, edit, or remove packages - changes appear instantly</li>
              <li>Set pricing, included tests, and target demographics</li>
              <li>Mark popular packages and set availability</li>
            </ol>
            <p className="text-green-600 font-medium">
              Real-time sync is active - any changes you make will be reflected immediately on the website!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HealthPackages;