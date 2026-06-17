import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ChevronRight,
  Minus,
  Plus,
  ShoppingCart,
  Zap,
  Wifi,
  Bluetooth,
  ShieldCheck,
  Lock,
  HardDrive,
  Cloud,
  CheckCircle,
  XCircle,
  Package,
  Home,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { products } from '@/data/products';
import type { ConnectivityType } from '@/types';
import { cn } from '@/lib/utils';

const connectivityIcons: Record<ConnectivityType, typeof Wifi> = {
  wifi: Wifi,
  bluetooth: Bluetooth,
  zigbee: Zap,
};

const connectivityLabels: Record<ConnectivityType, string> = {
  wifi: 'WiFi 连接',
  bluetooth: '蓝牙连接',
  zigbee: 'Zigbee 连接',
};

const connectivityColors: Record<ConnectivityType, string> = {
  wifi: 'bg-blue-100 text-blue-600',
  bluetooth: 'bg-indigo-100 text-indigo-600',
  zigbee: 'bg-amber-100 text-amber-600',
};

type TabKey = 'connectivity' | 'consumables' | 'privacy';

const tabLabels: Record<TabKey, string> = {
  connectivity: '联网方式',
  consumables: '耗材信息',
  privacy: '隐私设置',
};

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const product = products.find((p) => p.id === id);

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<TabKey>('connectivity');

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-16 md:pt-20">
          <div className="flex flex-col items-center justify-center py-32 text-center px-6">
            <div className="w-32 h-32 rounded-full bg-gray-100 flex items-center justify-center mb-8">
              <Package className="w-16 h-16 text-gray-400" />
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-dark mb-4">
              404
            </h1>
            <h2 className="text-2xl font-semibold text-dark mb-3">
              产品未找到
            </h2>
            <p className="text-dark/60 max-w-md mb-8">
              抱歉，您访问的产品不存在或已下架，请返回商品列表查看其他产品。
            </p>
            <Link
              to="/products"
              className="gradient-primary inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-white shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 hover:-translate-y-0.5 transition-all duration-300"
            >
              返回商品列表
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  const ConnectivityIcon = connectivityIcons[product.connectivity.type];

  const decreaseQty = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const increaseQty = () => {
    setQuantity(quantity + 1);
  };

  const specsEntries = Object.entries(product.specs);
  const halfIndex = Math.ceil(specsEntries.length / 2);
  const specsLeft = specsEntries.slice(0, halfIndex);
  const specsRight = specsEntries.slice(halfIndex);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-16 md:pt-20">
        <section className="py-8 max-w-7xl mx-auto px-6">
          <nav className="flex items-center gap-2 text-sm text-dark/60 mb-8 flex-wrap">
            <Link
              to="/"
              className="flex items-center gap-1 hover:text-primary transition-colors"
            >
              <Home className="w-4 h-4" />
              首页
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link
              to="/products"
              className="hover:text-primary transition-colors"
            >
              全部商品
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-dark font-medium line-clamp-1">
              {product.name}
            </span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
            <div className="space-y-4">
              <div className="relative aspect-square bg-white rounded-3xl overflow-hidden shadow-lg">
                <img
                  src={product.images[activeImageIndex]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-4 gap-3">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={cn(
                      'relative aspect-square rounded-xl overflow-hidden border-2 transition-all duration-200',
                      activeImageIndex === idx
                        ? 'border-primary shadow-md scale-105'
                        : 'border-transparent hover:border-gray-300'
                    )}
                  >
                    <img
                      src={img}
                      alt={`${product.name} ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col">
              <h1 className="font-display text-3xl md:text-4xl font-bold text-dark mb-4 leading-tight">
                {product.name}
              </h1>

              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-4xl font-bold text-primary">
                  ¥{product.price}
                </span>
                {product.originalPrice && (
                  <>
                    <span className="text-xl text-gray-400 line-through">
                      ¥{product.originalPrice}
                    </span>
                    <span className="px-2.5 py-1 bg-primary/10 text-primary text-sm font-semibold rounded-md">
                      省¥{product.originalPrice - product.price}
                    </span>
                  </>
                )}
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {product.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-3 py-1.5 rounded-full text-sm bg-secondary/10 text-secondary font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <p className="text-dark/70 text-base leading-relaxed mb-8">
                {product.description}
              </p>

              <div className="bg-gray-50 rounded-2xl p-5 mb-8">
                <h3 className="text-sm font-semibold text-dark mb-4 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-primary" />
                  核心规格亮点
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {Object.entries(product.specs)
                    .slice(0, 4)
                    .map(([key, value]) => (
                      <div
                        key={key}
                        className="flex flex-col bg-white rounded-xl px-4 py-3"
                      >
                        <span className="text-xs text-dark/50 mb-1">
                          {key}
                        </span>
                        <span className="text-sm font-medium text-dark">
                          {value}
                        </span>
                      </div>
                    ))}
                </div>
              </div>

              <div className="mb-8">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-sm font-semibold text-dark">
                    购买数量
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="inline-flex items-center border border-gray-200 rounded-xl overflow-hidden">
                    <button
                      onClick={decreaseQty}
                      className={cn(
                        'w-11 h-11 flex items-center justify-center transition-colors',
                        quantity <= 1
                          ? 'text-gray-300 cursor-not-allowed'
                          : 'text-dark/70 hover:bg-gray-50 hover:text-primary'
                      )}
                      disabled={quantity <= 1}
                    >
                      <Minus className="w-5 h-5" />
                    </button>
                    <span className="w-14 text-center text-base font-semibold text-dark">
                      {quantity}
                    </span>
                    <button
                      onClick={increaseQty}
                      className="w-11 h-11 flex items-center justify-center text-dark/70 hover:bg-gray-50 hover:text-primary transition-colors"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                  <span className="text-sm text-dark/60">
                    库存充足，可放心购买
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 mt-auto">
                <button className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-semibold text-primary border-2 border-primary hover:bg-primary/5 transition-all duration-200">
                  <ShoppingCart className="w-5 h-5" />
                  加入购物车
                </button>
                <button className="flex-1 gradient-primary inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-semibold text-white shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 hover:-translate-y-0.5 transition-all duration-300">
                  立即购买
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-10 max-w-7xl mx-auto px-6">
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="border-b border-gray-100 px-4 sm:px-8">
              <div className="flex gap-1">
                {(Object.keys(tabLabels) as TabKey[]).map((key) => (
                  <button
                    key={key}
                    onClick={() => setActiveTab(key)}
                    className={cn(
                      'px-5 py-4 text-sm font-semibold transition-all relative',
                      activeTab === key
                        ? 'text-primary'
                        : 'text-dark/60 hover:text-dark'
                    )}
                  >
                    {tabLabels[key]}
                    {activeTab === key && (
                      <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-primary rounded-full" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-6 sm:p-10">
              {activeTab === 'connectivity' && (
                <div className="space-y-8">
                  <div className="flex flex-col sm:flex-row items-start gap-6">
                    <div
                      className={cn(
                        'w-20 h-20 rounded-2xl flex items-center justify-center shrink-0',
                        connectivityColors[product.connectivity.type]
                      )}
                    >
                      <ConnectivityIcon className="w-10 h-10" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-dark mb-2">
                        {connectivityLabels[product.connectivity.type]}
                      </h3>
                      <p className="text-dark/70 leading-relaxed">
                        {product.connectivity.description}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-base font-semibold text-dark mb-5">
                      配置指引
                    </h4>
                    <div className="space-y-4">
                      {product.connectivity.setupSteps.map((step, idx) => (
                        <div
                          key={idx}
                          className="flex gap-4 items-start bg-gray-50 rounded-2xl p-5"
                        >
                          <div className="shrink-0 w-9 h-9 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold">
                            {idx + 1}
                          </div>
                          <p className="pt-1.5 text-dark/80 leading-relaxed">
                            {step}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'consumables' && (
                <div className="space-y-6">
                  {product.consumables.length > 0 ? (
                    <>
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b border-gray-200">
                              <th className="text-left py-4 px-4 text-sm font-semibold text-dark">
                                耗材名称
                              </th>
                              <th className="text-left py-4 px-4 text-sm font-semibold text-dark">
                                型号
                              </th>
                              <th className="text-left py-4 px-4 text-sm font-semibold text-dark">
                                更换周期
                              </th>
                              <th className="text-left py-4 px-4 text-sm font-semibold text-dark">
                                价格
                              </th>
                              <th className="text-right py-4 px-4 text-sm font-semibold text-dark">
                                操作
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {product.consumables.map((item, idx) => (
                              <tr
                                key={idx}
                                className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                              >
                                <td className="py-4 px-4 text-sm text-dark">
                                  <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
                                      <Package className="w-5 h-5 text-orange-600" />
                                    </div>
                                    <span className="font-medium">
                                      {item.name}
                                    </span>
                                  </div>
                                </td>
                                <td className="py-4 px-4 text-sm text-dark/70 font-mono">
                                  {item.model}
                                </td>
                                <td className="py-4 px-4 text-sm text-dark/70">
                                  {item.replaceCycle}
                                </td>
                                <td className="py-4 px-4 text-sm font-semibold text-primary">
                                  ¥{item.price}
                                </td>
                                <td className="py-4 px-4 text-right">
                                  <button className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary/10 text-primary text-sm font-medium hover:bg-primary/20 transition-colors">
                                    <ShoppingCart className="w-4 h-4" />
                                    购买耗材
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 flex gap-3">
                        <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                        <p className="text-sm text-amber-800 leading-relaxed">
                          <span className="font-semibold">温馨提示：</span>
                          定期更换原装耗材可确保设备最佳性能和宠物健康。使用非原装耗材可能影响产品寿命并导致保修失效。
                        </p>
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                        <Package className="w-10 h-10 text-gray-400" />
                      </div>
                      <h4 className="text-lg font-semibold text-dark mb-2">
                        暂无耗材
                      </h4>
                      <p className="text-dark/60">
                        该产品无需额外耗材，可长期使用
                      </p>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'privacy' && (
                <div className="space-y-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-gray-50 rounded-2xl p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
                          <Lock className="w-6 h-6 text-purple-600" />
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-dark/70">
                            数据加密方式
                          </h4>
                          <p className="text-base font-bold text-dark">
                            {product.privacy.encryption}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="bg-gray-50 rounded-2xl p-5 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
                            <HardDrive className="w-5 h-5 text-green-600" />
                          </div>
                          <span className="text-sm font-medium text-dark">
                            本地存储
                          </span>
                        </div>
                        {product.privacy.localStorage ? (
                          <span className="inline-flex items-center gap-1.5 text-sm font-medium text-green-600">
                            <CheckCircle className="w-5 h-5" />
                            支持
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-400">
                            <XCircle className="w-5 h-5" />
                            不支持
                          </span>
                        )}
                      </div>
                      <div className="bg-gray-50 rounded-2xl p-5 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                            <Cloud className="w-5 h-5 text-blue-600" />
                          </div>
                          <span className="text-sm font-medium text-dark">
                            云端存储
                          </span>
                        </div>
                        {product.privacy.cloudStorage ? (
                          <span className="inline-flex items-center gap-1.5 text-sm font-medium text-green-600">
                            <CheckCircle className="w-5 h-5" />
                            支持
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-400">
                            <XCircle className="w-5 h-5" />
                            不支持
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-base font-semibold text-dark mb-4 flex items-center gap-2">
                      <ShieldCheck className="w-5 h-5 text-primary" />
                      权限说明
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {product.privacy.permissions.map((perm, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3"
                        >
                          <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                          <span className="text-sm text-dark/80">
                            {perm}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="py-10 max-w-7xl mx-auto px-6">
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 sm:p-10">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-dark mb-8">
              详细规格参数
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-0">
              <div className="divide-y divide-gray-100">
                {specsLeft.map(([key, value]) => (
                  <div
                    key={key}
                    className="flex py-4 items-center"
                  >
                    <span className="w-36 text-sm text-dark/50 shrink-0">
                      {key}
                    </span>
                    <span className="text-sm font-medium text-dark">
                      {value}
                    </span>
                  </div>
                ))}
              </div>
              <div className="divide-y divide-gray-100">
                {specsRight.map(([key, value]) => (
                  <div
                    key={key}
                    className="flex py-4 items-center"
                  >
                    <span className="w-36 text-sm text-dark/50 shrink-0">
                      {key}
                    </span>
                    <span className="text-sm font-medium text-dark">
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {relatedProducts.length > 0 && (
          <section className="py-10 max-w-7xl mx-auto px-6 pb-20">
            <div className="flex items-end justify-between mb-8 flex-wrap gap-4">
              <div>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-dark mb-2">
                  相关推荐
                </h2>
                <p className="text-dark/60">
                  为您推荐同品类的其他优质产品
                </p>
              </div>
              <Link
                to="/products"
                className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all duration-300"
              >
                查看全部
                <ChevronRight className="w-5 h-5" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
