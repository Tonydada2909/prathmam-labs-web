import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Edit, Trash2, Download } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Package {
  id: string;
  name: string;
  price: number;
  original_price: number;
  ideal_for: string;
  report_time: string;
  included_tests: string[];
  is_popular: boolean;
  is_active: boolean;
}

export default function PackagesManagement() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingPackage, setEditingPackage] = useState<Package | null>(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    original_price: '',
    ideal_for: '',
    report_time: '',
    included_tests: '',
    is_popular: false,
    is_active: true,
  });

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    const { data, error } = await supabase
      .from('packages')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch packages',
        variant: 'destructive',
      });
    } else {
      setPackages(data || []);
    }
    setLoading(false);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      price: '',
      original_price: '',
      ideal_for: '',
      report_time: '',
      included_tests: '',
      is_popular: false,
      is_active: true,
    });
    setEditingPackage(null);
  };

  const handleSave = async () => {
    const packageData = {
      ...formData,
      price: parseFloat(formData.price),
      original_price: formData.original_price ? parseFloat(formData.original_price) : null,
      included_tests: formData.included_tests.split(',').map(t => t.trim()),
    };

    let error;
    if (editingPackage) {
      ({ error } = await supabase
        .from('packages')
        .update(packageData)
        .eq('id', editingPackage.id));
    } else {
      ({ error } = await supabase
        .from('packages')
        .insert([packageData]));
    }

    if (error) {
      toast({
        title: 'Error',
        description: `Failed to ${editingPackage ? 'update' : 'create'} package`,
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Success',
        description: `Package ${editingPackage ? 'updated' : 'created'} successfully`,
      });
      setDialogOpen(false);
      resetForm();
      fetchPackages();
    }
  };

  const handleEdit = (pkg: Package) => {
    setEditingPackage(pkg);
    setFormData({
      name: pkg.name,
      price: pkg.price.toString(),
      original_price: pkg.original_price ? pkg.original_price.toString() : '',
      ideal_for: pkg.ideal_for,
      report_time: pkg.report_time,
      included_tests: pkg.included_tests.join(', '),
      is_popular: pkg.is_popular,
      is_active: pkg.is_active,
    });
    setDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase
      .from('packages')
      .delete()
      .eq('id', id);

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete package',
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Success',
        description: 'Package deleted successfully',
      });
      fetchPackages();
    }
  };

  const exportData = () => {
    const csvContent = [
      ['Name', 'Price', 'Original Price', 'Ideal For', 'Report Time', 'Popular', 'Status'],
      ...packages.map(pkg => [
        pkg.name,
        pkg.price.toString(),
        pkg.original_price?.toString() || '',
        pkg.ideal_for,
        pkg.report_time,
        pkg.is_popular ? 'Yes' : 'No',
        pkg.is_active ? 'Active' : 'Inactive'
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'packages-export.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Packages Management</CardTitle>
            <CardDescription>Add, edit, and manage health packages</CardDescription>
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
                  Add Package
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>{editingPackage ? 'Edit Package' : 'Add New Package'}</DialogTitle>
                  <DialogDescription>
                    Fill in the package details below
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4">
                  <div>
                    <Label htmlFor="name">Package Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="price">Price (₹)</Label>
                      <Input
                        id="price"
                        type="number"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="original_price">Original Price (₹)</Label>
                      <Input
                        id="original_price"
                        type="number"
                        value={formData.original_price}
                        onChange={(e) => setFormData({ ...formData, original_price: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="ideal_for">Ideal For</Label>
                      <Input
                        id="ideal_for"
                        value={formData.ideal_for}
                        onChange={(e) => setFormData({ ...formData, ideal_for: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="report_time">Report Time</Label>
                      <Input
                        id="report_time"
                        value={formData.report_time}
                        onChange={(e) => setFormData({ ...formData, report_time: e.target.value })}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="included_tests">Included Tests (comma-separated)</Label>
                    <Textarea
                      id="included_tests"
                      value={formData.included_tests}
                      onChange={(e) => setFormData({ ...formData, included_tests: e.target.value })}
                      placeholder="Complete Blood Count, Lipid Profile, Thyroid Function Test..."
                    />
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="is_popular"
                        checked={formData.is_popular}
                        onCheckedChange={(checked) => setFormData({ ...formData, is_popular: checked })}
                      />
                      <Label htmlFor="is_popular">Most Popular</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="is_active"
                        checked={formData.is_active}
                        onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
                      />
                      <Label htmlFor="is_active">Active</Label>
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleSave}>
                      {editingPackage ? 'Update' : 'Create'}
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
                <TableHead>Price</TableHead>
                <TableHead>Original Price</TableHead>
                <TableHead>Ideal For</TableHead>
                <TableHead>Popular</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {packages.map((pkg) => (
                <TableRow key={pkg.id}>
                  <TableCell className="font-medium">{pkg.name}</TableCell>
                  <TableCell>₹{pkg.price}</TableCell>
                  <TableCell>{pkg.original_price ? `₹${pkg.original_price}` : '-'}</TableCell>
                  <TableCell>{pkg.ideal_for}</TableCell>
                  <TableCell>
                    <Badge variant={pkg.is_popular ? 'default' : 'secondary'}>
                      {pkg.is_popular ? 'Yes' : 'No'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={pkg.is_active ? 'default' : 'secondary'}>
                      {pkg.is_active ? 'Active' : 'Inactive'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleEdit(pkg)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(pkg.id)}
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