import { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { PawPrint, ShoppingCart, Headphones, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/components/Toast';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [cartCount] = useState(3);
  const toast = useToast();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { to: '/', label: '首页' },
    { to: '/products', label: '商品' },
    { to: '/support', label: '售后支持' },
  ];

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b',
        isScrolled
          ? 'bg-white shadow-md border-gray-100'
          : 'bg-white border-gray-50'
      )}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <PawPrint className="w-6 h-6 text-primary" />
            </div>
            <span className="text-xl font-bold text-dark">
              PawSmart 宠智选
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  cn(
                    'text-base font-medium transition-colors hover:text-primary',
                    isActive ? 'text-primary' : 'text-dark/80'
                  )
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <button
              onClick={() => {
                toast.info('购物车功能开发中');
              }}
              className="relative p-2 rounded-full hover:bg-gray-100 transition-colors group"
            >
              <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6 text-dark/70 group-hover:text-primary transition-colors" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-primary text-white text-xs font-medium rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            <button className="hidden sm:flex p-2 rounded-full hover:bg-gray-100 transition-colors group">
              <Headphones className="w-5 h-6 text-dark/70 group-hover:text-primary transition-colors" />
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="切换菜单"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-dark" />
              ) : (
                <Menu className="w-6 h-6 text-dark" />
              )}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100 animate-fadeIn">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === '/'}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      'px-4 py-3 rounded-lg text-base font-medium transition-colors',
                      isActive
                        ? 'bg-primary/10 text-primary'
                        : 'text-dark/80 hover:bg-gray-50'
                    )
                  }
                >
                  {link.label}
                </NavLink>
              ))}
              <Link
                to="/support"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium text-dark/80 hover:bg-gray-50 transition-colors"
              >
                <Headphones className="w-5 h-5" />
                在线客服
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
