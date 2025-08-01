import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { LogOut, TestTube, Package, Tag } from 'lucide-react';
import TestsManagement from '@/components/admin/TestsManagement';
import PackagesManagement from '@/components/admin/PackagesManagement';
import CategoriesManagement from '@/components/admin/CategoriesManagement';

export default function AdminDashboard() {
  const { user, isAdmin, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState('tests');

  if (!user || !isAdmin) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <Button variant="outline" onClick={signOut}>
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="tests" className="flex items-center gap-2">
              <TestTube className="w-4 h-4" />
              Tests
            </TabsTrigger>
            <TabsTrigger value="packages" className="flex items-center gap-2">
              <Package className="w-4 h-4" />
              Packages
            </TabsTrigger>
            <TabsTrigger value="categories" className="flex items-center gap-2">
              <Tag className="w-4 h-4" />
              Categories
            </TabsTrigger>
          </TabsList>

          <TabsContent value="tests" className="mt-6">
            <TestsManagement />
          </TabsContent>

          <TabsContent value="packages" className="mt-6">
            <PackagesManagement />
          </TabsContent>

          <TabsContent value="categories" className="mt-6">
            <CategoriesManagement />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}