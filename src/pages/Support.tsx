import { useState, useMemo } from 'react';
import {
  Headphones,
  Phone,
  Wrench,
  Clock,
  Mail,
  MapPin,
  MessageCircle,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FaultAccordion from '@/components/FaultAccordion';
import { faults } from '@/data/faults';
import type { ProductCategory } from '@/types';
import { cn } from '@/lib/utils';

type CategoryFilter = 'all' | ProductCategory;

const categoryTabs: { value: CategoryFilter; label: string }[] = [
  { value: 'all', label: '全部' },
  { value: 'feeder', label: '喂食器' },
  { value: 'water', label: '饮水机' },
  { value: 'camera', label: '摄像头' },
];

const helpCards = [
  {
    icon: MessageCircle,
    title: '在线客服',
    description: '专业客服团队在线解答您的问题，平均响应时间5分钟',
    buttonText: '立即咨询',
    gradient: 'from-blue-500 to-indigo-500',
    bgColor: 'bg-blue-50',
    iconColor: 'text-blue-600',
  },
  {
    icon: Phone,
    title: '服务热线',
    description: '工作日 9:00-21:00 全天候为您服务，7x12小时支持',
    buttonText: '400-888-9999',
    gradient: 'from-green-500 to-emerald-500',
    bgColor: 'bg-green-50',
    iconColor: 'text-green-600',
  },
  {
    icon: Wrench,
    title: '上门维修',
    description: '全国200+城市提供上门维修服务，工程师48小时内响应',
    buttonText: '预约维修',
    gradient: 'from-orange-500 to-amber-500',
    bgColor: 'bg-orange-50',
    iconColor: 'text-orange-600',
  },
];

export default function Support() {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all');

  const filteredFaults = useMemo(() => {
    if (activeCategory === 'all') return faults;
    return faults.filter((f) => f.category === activeCategory);
  }, [activeCategory]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-16 md:pt-20">
        <section className="relative overflow-hidden bg-gradient-to-br from-orange-500 via-amber-500 to-rose-500">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute -top-32 -left-32 w-96 h-96 bg-white rounded-full blur-3xl" />
            <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-yellow-200 rounded-full blur-3xl" />
          </div>
          <div className="relative max-w-7xl mx-auto px-6 py-20 md:py-28 text-center text-white">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-medium mb-6">
              <Headphones className="w-4 h-4" />
              专业售后团队
            </div>
            <h1 className="font-display text-4xl md:text-6xl font-bold mb-4 leading-tight">
              售后服务中心
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
              我们为您提供全面的产品支持，让您使用无忧
            </p>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-6 -mt-10 md:-mt-14">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
            {helpCards.map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.title}
                  className="relative bg-white rounded-2xl shadow-lg p-6 md:p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  <div
                    className={cn(
                      'w-14 h-14 rounded-2xl flex items-center justify-center mb-5',
                      card.bgColor
                    )}
                  >
                    <Icon className={cn('w-7 h-7', card.iconColor)} />
                  </div>
                  <h3 className="text-xl font-bold text-dark mb-2">
                    {card.title}
                  </h3>
                  <p className="text-dark/60 text-sm leading-relaxed mb-5">
                    {card.description}
                  </p>
                  <button
                    className={cn(
                      'w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-white bg-gradient-to-r shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200',
                      card.gradient
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    {card.buttonText}
                  </button>
                </div>
              );
            })}
          </div>
        </section>

        <section className="py-16 max-w-7xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-dark mb-3">
              常见故障排查
            </h2>
            <p className="text-dark/60">
              选择您的产品类型，快速找到故障解决方案
            </p>
          </div>

          <div className="flex items-center justify-center gap-2 mb-10 flex-wrap">
            {categoryTabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setActiveCategory(tab.value)}
                className={cn(
                  'px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200',
                  activeCategory === tab.value
                    ? 'bg-primary text-white shadow-md shadow-primary/30'
                    : 'bg-white text-dark/70 border border-gray-200 hover:border-primary hover:text-primary'
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="max-w-4xl mx-auto">
            <FaultAccordion faults={filteredFaults} />
          </div>
        </section>

        <section className="py-16 max-w-7xl mx-auto px-6 pb-24">
          <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute -top-20 -right-20 w-72 h-72 bg-primary rounded-full blur-3xl" />
              <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-secondary rounded-full blur-3xl" />
            </div>
            <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-10 p-8 md:p-12 lg:p-16 items-center">
              <div className="text-white">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 text-white text-sm font-medium mb-6">
                  <Headphones className="w-4 h-4" />
                  联系我们
                </div>
                <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                  需要更多帮助？
                </h2>
                <p className="text-white/80 text-lg leading-relaxed mb-8">
                  我们的专业客服团队随时为您服务，无论是产品使用咨询、故障排查还是维修服务，都能得到及时响应和解决。
                </p>
                <button className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold bg-white text-slate-800 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
                  <MessageCircle className="w-5 h-5" />
                  联系在线客服
                </button>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-4 bg-white/10 backdrop-blur-sm rounded-2xl p-5">
                  <div className="w-11 h-11 rounded-xl bg-white/15 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">客服热线</h4>
                    <p className="text-white/70 text-sm">400-888-9999</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 bg-white/10 backdrop-blur-sm rounded-2xl p-5">
                  <div className="w-11 h-11 rounded-xl bg-white/15 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">服务时间</h4>
                    <p className="text-white/70 text-sm">
                      周一至周日 9:00 - 21:00
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 bg-white/10 backdrop-blur-sm rounded-2xl p-5">
                  <div className="w-11 h-11 rounded-xl bg-white/15 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">邮件支持</h4>
                    <p className="text-white/70 text-sm">support@pawsmart.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 bg-white/10 backdrop-blur-sm rounded-2xl p-5">
                  <div className="w-11 h-11 rounded-xl bg-white/15 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">公司地址</h4>
                    <p className="text-white/70 text-sm">
                      北京市海淀区中关村科技园区
                    </p>
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
