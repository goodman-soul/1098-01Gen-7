import { Link } from 'react-router-dom';
import { PawPrint, Facebook, Twitter, Instagram } from 'lucide-react';

export default function Footer() {
  const quickLinks = [
    { to: '/', label: '首页' },
    { to: '/products', label: '全部商品' },
    { to: '/products?category=feeder', label: '智能喂食器' },
    { to: '/products?category=water', label: '宠物饮水机' },
    { to: '/products?category=camera', label: '宠物摄像头' },
    { to: '/support', label: '售后服务' },
  ];

  return (
    <footer className="bg-[#1B4332] text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          <div>
            <div className="flex items-center gap-2 mb-5">
              <div className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center">
                <PawPrint className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold">PawSmart 宠智选</span>
            </div>
            <p className="text-white/80 text-sm leading-relaxed mb-6">
              专注智能宠物用品研发，用科技守护每一只毛孩子的健康与快乐。我们致力于打造高品质、安全可靠的智能喂食、饮水和监护产品，让养宠更轻松、更安心。
            </p>
            <div className="flex items-center gap-3">
              <a
                href="#"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                aria-label="Twitter"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-5">快速链接</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-white/80 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-5">联系方式</h3>
            <ul className="space-y-3 text-sm text-white/80">
              <li className="flex flex-col">
                <span className="text-white/60">客服热线</span>
                <span className="font-medium">400-888-9999</span>
              </li>
              <li className="flex flex-col">
                <span className="text-white/60">服务时间</span>
                <span>周一至周日 9:00 - 21:00</span>
              </li>
              <li className="flex flex-col">
                <span className="text-white/60">商务合作</span>
                <span>business@pawsmart.com</span>
              </li>
              <li className="flex flex-col">
                <span className="text-white/60">公司地址</span>
                <span>北京市海淀区中关村科技园区</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 text-sm text-white/60">
            <p>© {new Date().getFullYear()} PawSmart 宠智选. 保留所有权利.</p>
            <div className="flex items-center gap-5">
              <a href="#" className="hover:text-white transition-colors">
                隐私政策
              </a>
              <a href="#" className="hover:text-white transition-colors">
                服务条款
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
