import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Phone } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface Test {
  id: string;
  name: string;
  price: number;
  description: string;
  sample_type: string;
  method: string;
  reporting_time: string;
  category_id?: string;
  is_active: boolean;
}

interface Category {
  id: string;
  name: string;
  description?: string;
}

const TestDirectory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [tests, setTests] = useState<Test[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch categories from Supabase
  const fetchCategories = async () => {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name');
    
    if (error) {
      console.error('Error fetching categories:', error);
      return;
    }
    
    setCategories(data || []);
  };

  // Fetch tests from Supabase
  const fetchTests = async () => {
    const { data, error } = await supabase
      .from('tests')
      .select('*')
      .eq('is_active', true)
      .order('name');
    
    if (error) {
      console.error('Error fetching tests:', error);
      return;
    }
    
    setTests(data || []);
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([fetchCategories(), fetchTests()]);
      setLoading(false);
    };

    loadData();

    // Set up real-time subscriptions
    const testsChannel = supabase
      .channel('tests-changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'tests' }, 
        (payload) => {
          fetchTests();
        }
      )
      .subscribe();

    const categoriesChannel = supabase
      .channel('categories-changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'categories' }, 
        (payload) => {
          fetchCategories();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(testsChannel);
      supabase.removeChannel(categoriesChannel);
    };
  }, []);

  const getCategoryName = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category?.name || 'General';
  };

  const filteredTests = tests.filter(test => {
    const matchesSearch = test.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (test.description && test.description.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'All' || 
                           getCategoryName(test.category_id || '') === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const allCategories = ['All', ...categories.map(cat => cat.name)];

  if (loading) {
    return (
      <section id="tests" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">Loading tests...</div>
        </div>
      </section>
    );
  }

  return (
    <section id="tests" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Test Directory</h2>
          <p className="text-lg text-gray-600">Comprehensive list of all available tests with current pricing</p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 space-y-4">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search tests..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            {allCategories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="hover-scale"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Tests Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTests.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500">No tests found matching your criteria.</p>
            </div>
          ) : (
            filteredTests.map((test) => (
              <Card key={test.id} className="hover-lift border-0 shadow-sm hover:shadow-md transition-all duration-300">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg leading-tight">{test.name}</CardTitle>
                    <span className="text-xl font-bold text-primary">₹{test.price}</span>
                  </div>
                  <p className="text-sm text-gray-500">{getCategoryName(test.category_id || '')}</p>
                </CardHeader>
                <CardContent>
                  {test.description && (
                    <p className="text-gray-600 mb-4">{test.description}</p>
                  )}
                  <div className="space-y-2 text-sm text-gray-500 mb-4">
                    <div>Sample: {test.sample_type}</div>
                    <div>Method: {test.method}</div>
                    <div>Report: {test.reporting_time}</div>
                  </div>
                  <Button className="w-full" variant="cta" asChild>
                    <a href="https://wa.me/919799656357?text=Hello! I would like to book a test." target="_blank" rel="noopener noreferrer">
                      <Phone className="mr-2 h-4 w-4" />
                      Book Now
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Admin Guide */}
        <div className="mt-16 p-6 bg-blue-50 rounded-lg border border-blue-200">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Test Management (Real-time Sync Enabled)</h3>
          <div className="text-left space-y-3 text-gray-700">
            <p><strong>✅ Your tests are now connected to Supabase with real-time updates!</strong></p>
            <p><strong>To manage tests:</strong></p>
            <ol className="list-decimal list-inside space-y-2">
              <li>Login as admin and go to Admin Dashboard</li>
              <li>Navigate to "Tests Management"</li>
              <li>Add, edit, or remove tests - changes appear instantly</li>
              <li>Organize tests by categories</li>
              <li>Set pricing and availability</li>
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

export default TestDirectory;