import { useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import NewsletterSection from '@/components/features/NewsletterSection';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';

const Blog = () => {
  const { t } = useLanguage();

  // Set page title and meta description for SEO
  useEffect(() => {
    document.title = 'Blog | ReachImpact';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Explore the latest insights, tips, and best practices for AI-powered calling, lead generation, and sales outreach strategies on the ReachImpact blog.');
    }
  }, []);

  // Mock blog articles - in a real implementation, these would come from an API
  const blogArticles = [
    {
      id: 1,
      title: t('blog.article1.title'),
      excerpt: t('blog.article1.excerpt'),
      date: t('blog.article1.date'),
      author: t('blog.article1.author'),
      category: t('blog.article1.category'),
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500"
    },
    {
      id: 2,
      title: t('blog.article2.title'),
      excerpt: t('blog.article2.excerpt'),
      date: t('blog.article2.date'),
      author: t('blog.article2.author'),
      category: t('blog.article2.category'),
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500"
    },
    {
      id: 3,
      title: t('blog.article3.title'),
      excerpt: t('blog.article3.excerpt'),
      date: t('blog.article3.date'),
      author: t('blog.article3.author'),
      category: t('blog.article3.category'),
      image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500"
    }
  ];

  return (
    <>
      {/* Hero Banner */}
      <section className="bg-primary-50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{t('blog.title')}</h1>
            <p className="text-lg text-neutral-600 mb-8">{t('blog.subtitle')}</p>
          </div>
        </div>
      </section>
      
      {/* Blog Articles */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogArticles.map((article) => (
              <div key={article.id} className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={article.image} 
                    alt={article.title} 
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center text-sm text-neutral-500 mb-2">
                    <span>{article.date}</span>
                    <span className="mx-2">•</span>
                    <span>{article.category}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{article.title}</h3>
                  <p className="text-neutral-600 mb-4">{article.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-neutral-500">
                      {t('blog.by')} {article.author}
                    </span>
                    <Link href={`/blog/${article.id}`}>
                      <Button variant="link" className="text-primary hover:text-primary/80 p-0">
                        {t('blog.readMore')} →
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Button variant="outline">
              {t('blog.loadMore')}
            </Button>
          </div>
        </div>
      </section>
      
      <NewsletterSection />
    </>
  );
};

export default Blog;
