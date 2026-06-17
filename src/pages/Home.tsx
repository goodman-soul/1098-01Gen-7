import { Link } from 'react-router-dom';
import {
  Sparkles,
  UtensilsCrossed,
  Droplets,
  Camera,
  Headphones,
  ArrowRight,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SmartFilter from '@/components/SmartFilter';
import ProductCard from '@/components/ProductCard';
import { products } from '@/data/products';

export default function Home() {
  const hotProducts = products.slice(0, 4);

  const categories = [
    {
      icon: UtensilsCrossed,
      title: '智能喂食器',
      description: '定时定量精准投喂，APP远程操控，让爱宠每一餐都营养均衡',
      link: '/products?category=feeder',
      gradient: 'from-orange-50 to-amber-50',
      iconBg: 'bg-orange-100 text-orange-600',
    },
    {
      icon: Droplets,
      title: '宠物饮水机',
      description: '循环过滤活水，UV杀菌净化，静音设计让毛孩子爱上喝水',
      link: '/products?category=water',
      gradient: 'from-blue-50 to-cyan-50',
      iconBg: 'bg-blue-100 text-blue-600',
    },
    {
      icon: Camera,
      title: '智能摄像头',
      description: '1080P高清夜视，双向语音互动，随时随地陪伴守护爱宠',
      link: '/products?category=camera',
      gradient: 'from-purple-50 to-pink-50',
      iconBg: 'bg-purple-100 text-purple-600',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-16 md:pt-20">
        <section className="py-20 max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                <Sparkles className="w-4 h-4" />
                <span>智能养宠新选择</span>
              </div>
              <h1 className="font-display text-5xl md:text-6xl font-bold text-dark leading-tight">
                给毛孩子最好的
                <br />
                <span className="text-primary">智能守护</span>
              </h1>
              <p className="text-lg text-dark/70 leading-relaxed max-w-lg">
                我们专注智能宠物用品研发，用科技守护每一只毛孩子的健康与快乐。
                从智能喂食到远程监护，让养宠更轻松、更安心。
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/products"
                  className="gradient-primary inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-white shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 hover:-translate-y-0.5 transition-all duration-300"
                >
                  开始智能匹配
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  to="/support"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-dark border-2 border-gray-200 hover:border-primary hover:text-primary transition-all duration-300"
                >
                  了解更多
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -top-6 -left-6 w-72 h-72 bg-primary/20 rounded-full blur-3xl" />
              <div className="absolute -bottom-6 -right-6 w-72 h-72 bg-secondary/20 rounded-full blur-3xl" />
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=800&h=700&fit=crop"
                  alt="cat with smart pet feeder, warm lighting"
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Sparkles className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold text-dark">智能匹配系统</div>
                      <div className="text-sm text-dark/60">
                        基于爱宠特征，精准推荐最适合的产品
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 max-w-7xl mx-auto px-6 bg-gradient-to-b from-white/50 to-transparent">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-dark mb-4">
              智能匹配，为你的爱宠找到最合适的产品
            </h2>
            <p className="text-dark/60 max-w-2xl mx-auto">
              回答几个简单问题，我们将根据宠物类型、体型、饮食习惯和居住空间，
              为你推荐最匹配的智能宠物用品
            </p>
          </div>
          <SmartFilter />
        </section>

        <section className="py-20 max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-dark mb-4">
              热门产品分类
            </h2>
            <p className="text-dark/60 max-w-2xl mx-auto">
              三大核心产品线，全方位满足毛孩子的日常生活需求
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <Link
                  key={cat.title}
                  to={cat.link}
                  className={`group relative bg-gradient-to-br ${cat.gradient} rounded-3xl p-8 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 overflow-hidden`}
                >
                  <div className="absolute -right-8 -top-8 w-40 h-40 bg-white/30 rounded-full blur-2xl group-hover:bg-white/50 transition-all duration-300" />
                  <div className="relative">
                    <div
                      className={`w-16 h-16 rounded-2xl ${cat.iconBg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-bold text-dark mb-3">
                      {cat.title}
                    </h3>
                    <p className="text-dark/70 mb-6 leading-relaxed">
                      {cat.description}
                    </p>
                    <div className="inline-flex items-center gap-2 text-primary font-semibold group-hover:gap-3 transition-all duration-300">
                      查看更多
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="py-20 max-w-7xl mx-auto px-6 bg-gradient-to-b from-transparent to-white/50">
          <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-dark mb-4">
                热门产品推荐
              </h2>
              <p className="text-dark/60">
                精选用户最喜爱的高品质智能宠物用品
              </p>
            </div>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all duration-300"
            >
              查看全部
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {hotProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        <section className="py-20 max-w-7xl mx-auto px-6">
          <div className="relative bg-secondary rounded-3xl overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute -left-20 -top-20 w-80 h-80 bg-white rounded-full blur-3xl" />
              <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-white rounded-full blur-3xl" />
            </div>
            <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 p-10 md:p-14 items-center">
              <div className="text-white">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 text-white text-sm font-medium mb-6">
                  <Headphones className="w-4 h-4" />
                  <span>专业售后支持</span>
                </div>
                <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                  遇到问题？我们来帮你
                </h2>
                <p className="text-white/80 text-lg leading-relaxed max-w-lg mb-8">
                  我们的专业客服团队随时为你解答产品使用中的各种疑问，
                  提供详细的故障排查指南和技术支持，让你使用无忧。
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link
                    to="/support"
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold bg-white text-secondary shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
                  >
                    查看故障排查
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                  <a
                    href="tel:400-888-9999"
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-white border-2 border-white/30 hover:bg-white/10 transition-all duration-300"
                  >
                    <Headphones className="w-5 h-5" />
                    400-888-9999
                  </a>
                </div>
              </div>
              <div className="hidden lg:flex justify-center">
                <div className="relative">
                  <div className="w-64 h-64 rounded-full bg-white/10 flex items-center justify-center">
                    <div className="w-48 h-48 rounded-full bg-white/15 flex items-center justify-center">
                      <Headphones className="w-24 h-24 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
