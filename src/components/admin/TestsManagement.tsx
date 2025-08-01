import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Edit, Trash2, Download } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Test {
  id: string;
  name: string;
  category_id: string;
  sample_type: string;
  method: string;
  reporting_time: string;
  price: number;
  description: string;
  parameters: string[];
  is_active: boolean;
  categories: { name: string } | null;
}

interface Category {
  id: string;
  name: string;
}

export default function TestsManagement() {
  const [tests, setTests] = useState<Test[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingTest, setEditingTest] = useState<Test | null>(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    category_id: '',
    sample_type: '',
    method: '',
    reporting_time: '',
    price: '',
    description: '',
    parameters: '',
    is_active: true,
  });

  useEffect(() => {
    fetchTests();
    fetchCategories();
  }, []);

  const fetchTests = async () => {
    const { data, error } = await supabase
      .from('tests')
      .select('*, categories(name)')
      .order('created_at', { ascending: false });

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch tests',
        variant: 'destructive',
      });
    } else {
      setTests(data || []);
    }
    setLoading(false);
  };

  const fetchCategories = async () => {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name');

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch categories',
        variant: 'destructive',
      });
    } else {
      setCategories(data || []);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      category_id: '',
      sample_type: '',
      method: '',
      reporting_time: '',
      price: '',
      description: '',
      parameters: '',
      is_active: true,
    });
    setEditingTest(null);
  };

  const handleSave = async () => {
    const testData = {
      ...formData,
      price: parseFloat(formData.price),
      parameters: formData.parameters.split(',').map(p => p.trim()),
    };

    let error;
    if (editingTest) {
      ({ error } = await supabase
        .from('tests')
        .update(testData)
        .eq('id', editingTest.id));
    } else {
      ({ error } = await supabase
        .from('tests')
        .insert([testData]));
    }

    if (error) {
      toast({
        title: 'Error',
        description: `Failed to ${editingTest ? 'update' : 'create'} test`,
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Success',
        description: `Test ${editingTest ? 'updated' : 'created'} successfully`,
      });
      setDialogOpen(false);
      resetForm();
      fetchTests();
    }
  };

  const handleEdit = (test: Test) => {
    setEditingTest(test);
    setFormData({
      name: test.name,
      category_id: test.category_id || '',
      sample_type: test.sample_type,
      method: test.method,
      reporting_time: test.reporting_time,
      price: test.price.toString(),
      description: test.description || '',
      parameters: test.parameters.join(', '),
      is_active: test.is_active,
    });
    setDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase
      .from('tests')
      .delete()
      .eq('id', id);

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete test',
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Success',
        description: 'Test deleted successfully',
      });
      fetchTests();
    }
  };

  const exportData = () => {
    const csvContent = [
      ['Name', 'Category', 'Sample Type', 'Method', 'Reporting Time', 'Price', 'Status'],
      ...tests.map(test => [
        test.name,
        test.categories?.name || '',
        test.sample_type,
        test.method,
        test.reporting_time,
        test.price.toString(),
        test.is_active ? 'Active' : 'Inactive'
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'tests-export.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Tests Management</CardTitle>
            <CardDescription>Add, edit, and manage laboratory tests</CardDescription>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={exportData}>
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </Button>
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={resetForm}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Test
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>{editingTest ? 'Edit Test' : 'Add New Test'}</DialogTitle>
                  <DialogDescription>
                    Fill in the test details below
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Test Name</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="category">Category</Label>
                      <Select value={formData.category_id} onValueChange={(value) => setFormData({ ...formData, category_id: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category.id} value={category.id}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="sample_type">Sample Type</Label>
                      <Input
                        id="sample_type"
                        value={formData.sample_type}
                        onChange={(e) => setFormData({ ...formData, sample_type: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="method">Method</Label>
                      <Input
                        id="method"
                        value={formData.method}
                        onChange={(e) => setFormData({ ...formData, method: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="reporting_time">Reporting Time</Label>
                      <Input
                        id="reporting_time"
                        value={formData.reporting_time}
                        onChange={(e) => setFormData({ ...formData, reporting_time: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="price">Price (₹)</Label>
                      <Input
                        id="price"
                        type="number"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="parameters">Parameters (comma-separated)</Label>
                    <Textarea
                      id="parameters"
                      value={formData.parameters}
                      onChange={(e) => setFormData({ ...formData, parameters: e.target.value })}
                      placeholder="RBC Count, WBC Count, Hemoglobin..."
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="is_active"
                      checked={formData.is_active}
                      onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
                    />
                    <Label htmlFor="is_active">Active</Label>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleSave}>
                      {editingTest ? 'Update' : 'Create'}
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Sample Type</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tests.map((test) => (
                <TableRow key={test.id}>
                  <TableCell className="font-medium">{test.name}</TableCell>
                  <TableCell>{test.categories?.name}</TableCell>
                  <TableCell>{test.sample_type}</TableCell>
                  <TableCell>₹{test.price}</TableCell>
                  <TableCell>
                    <Badge variant={test.is_active ? 'default' : 'secondary'}>
                      {test.is_active ? 'Active' : 'Inactive'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleEdit(test)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(test.id)}
                        className="text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}