-- Create categories table
CREATE TABLE public.categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create tests table
CREATE TABLE public.tests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
  sample_type TEXT NOT NULL,
  method TEXT NOT NULL,
  reporting_time TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  description TEXT,
  parameters TEXT[],
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create packages table
CREATE TABLE public.packages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  original_price DECIMAL(10,2),
  ideal_for TEXT NOT NULL,
  report_time TEXT NOT NULL,
  included_tests TEXT[] NOT NULL,
  is_popular BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create profiles table for admin users
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT DEFAULT 'user',
  full_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check admin role
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE user_id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

-- Create policies for categories
CREATE POLICY "Anyone can view categories" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Admins can manage categories" ON public.categories FOR ALL USING (public.is_admin());

-- Create policies for tests
CREATE POLICY "Anyone can view active tests" ON public.tests FOR SELECT USING (is_active = true);
CREATE POLICY "Admins can manage tests" ON public.tests FOR ALL USING (public.is_admin());

-- Create policies for packages
CREATE POLICY "Anyone can view active packages" ON public.packages FOR SELECT USING (is_active = true);
CREATE POLICY "Admins can manage packages" ON public.packages FOR ALL USING (public.is_admin());

-- Create policies for profiles
CREATE POLICY "Users can view their own profile" ON public.profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Admins can view all profiles" ON public.profiles FOR SELECT USING (public.is_admin());
CREATE POLICY "Admins can manage all profiles" ON public.profiles FOR ALL USING (public.is_admin());

-- Create trigger function for updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON public.categories FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_tests_updated_at BEFORE UPDATE ON public.tests FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_packages_updated_at BEFORE UPDATE ON public.packages FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Create trigger to auto-create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name, role)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name', 'user');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Insert sample categories
INSERT INTO public.categories (name, description) VALUES
('Hematology', 'Blood cell counts and related tests'),
('Biochemistry', 'Chemical analysis of blood and body fluids'),
('Microbiology', 'Detection and identification of microorganisms'),
('Immunology', 'Immune system and antibody tests'),
('Cardiology', 'Heart and cardiovascular system tests'),
('Endocrinology', 'Hormone and endocrine system tests');

-- Insert sample tests
INSERT INTO public.tests (name, category_id, sample_type, method, reporting_time, price, description, parameters) VALUES
('Complete Blood Count', (SELECT id FROM public.categories WHERE name = 'Hematology'), 'Venous Blood', 'Automated Cell Counter', '4-6 hours', 350.00, 'Comprehensive analysis of blood cells including RBC, WBC, and platelets', ARRAY['RBC Count', 'WBC Count', 'Hemoglobin', 'Hematocrit', 'Platelet Count']),
('Lipid Profile', (SELECT id FROM public.categories WHERE name = 'Biochemistry'), 'Venous Blood', 'Spectrophotometry', '6-8 hours', 450.00, 'Assessment of cholesterol and triglyceride levels', ARRAY['Total Cholesterol', 'HDL Cholesterol', 'LDL Cholesterol', 'Triglycerides']),
('Thyroid Function Test', (SELECT id FROM public.categories WHERE name = 'Endocrinology'), 'Venous Blood', 'CLIA', '24 hours', 650.00, 'Evaluation of thyroid gland function', ARRAY['TSH', 'T3', 'T4']),
('Blood Glucose', (SELECT id FROM public.categories WHERE name = 'Biochemistry'), 'Venous Blood', 'Glucose Oxidase Method', '2-4 hours', 150.00, 'Measurement of blood sugar levels', ARRAY['Glucose Level']);

-- Insert sample packages
INSERT INTO public.packages (name, price, original_price, ideal_for, report_time, included_tests, is_popular) VALUES
('Basic Health Checkup', 1999.00, 2500.00, 'Adults 18-40 years', '24-48 hours', ARRAY['Complete Blood Count', 'Blood Glucose', 'Lipid Profile', 'Liver Function Test'], true),
('Comprehensive Health Package', 3999.00, 5000.00, 'Adults above 40 years', '48-72 hours', ARRAY['Complete Blood Count', 'Lipid Profile', 'Thyroid Function Test', 'Kidney Function Test', 'Liver Function Test', 'Vitamin D', 'Vitamin B12'], false),
('Cardiac Risk Assessment', 2499.00, 3000.00, 'High-risk cardiac patients', '24-48 hours', ARRAY['Lipid Profile', 'ECG', 'Troponin I', 'CRP', 'Homocysteine'], false);