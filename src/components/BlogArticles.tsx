import { Calendar, ArrowRight, Heart, Droplets } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const BlogArticles = () => {
  const articles = [
    {
      title: "Why Regular Health Checkups Matter",
      titleHindi: "नियमित स्वास्थ्य जांच क्यों जरूरी है",
      description: "Learn about the importance of preventive healthcare and how regular checkups can help detect health issues early.",
      descriptionHindi: "निवारक स्वास्थ्य सेवा के महत्व के बारे में जानें और कैसे नियमित जांच से स्वास्थ्य समस्याओं का जल्दी पता लगाया जा सकता है।",
      icon: Heart,
      date: "December 15, 2024",
      readTime: "5 min read"
    },
    {
      title: "Sugar Test FAQs",
      titleHindi: "शुगर टेस्ट से जुड़े सामान्य प्रश्न",
      description: "Common questions about diabetes testing, preparation guidelines, and understanding your results.",
      descriptionHindi: "मधुमेह परीक्षण, तैयारी के दिशानिर्देश और अपने परिणामों को समझने के बारे में सामान्य प्रश्न।",
      icon: Droplets,
      date: "December 10, 2024",
      readTime: "3 min read"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Health & Wellness Blog
          </h2>
          <h3 className="text-2xl font-semibold text-primary mb-4">
            स्वास्थ्य और कल्याण ब्लॉग
          </h3>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Stay informed with our latest health tips and medical insights
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {articles.map((article, index) => (
            <Card 
              key={index} 
              className="border-none shadow-card hover:shadow-medical transition-all duration-300 hover:-translate-y-1 bg-white group cursor-pointer"
            >
              <CardHeader>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <article.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {article.date}
                    </div>
                    <span>{article.readTime}</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                  {article.title}
                </h3>
                <h4 className="text-lg font-semibold text-primary">
                  {article.titleHindi}
                </h4>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  {article.description}
                </p>
                <p className="text-muted-foreground/80 text-sm leading-relaxed">
                  {article.descriptionHindi}
                </p>
                <Button variant="ghost" className="group-hover:text-primary p-0 h-auto font-medium">
                  Read More
                  <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            View All Articles
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BlogArticles;