import { useState } from 'react';

export default function PricingForm() {
  type WebsiteType = 'portfolio' | 'business' | 'store' | 'blog' | 'custom';
  type CmsType = 'wordpress' | 'custom' | 'none';
  type IntegrationType = 'none' | 'payments' | 'social' | 'analytics' | 'newsletter' | 'crm' | 'multiple';

  const [formData, setFormData] = useState({
    websiteType: 'portfolio' as WebsiteType,
    pagesCount: 1,
    cms: 'wordpress' as CmsType,
    customDesign: false,
    integrations: 'none' as IntegrationType,
    deadline: '',
    email: '',
    budget: '',
    requirements: '',
    seo: false,
    maintenance: false,
    hosting: false,
    domain: false,
  });
  const [status, setStatus] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    if (!formData.email.trim()) {
      setStatus({ type: 'error', text: '✗ Email jest wymagany' });
      return false;
    }
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(formData.email)) {
      setStatus({ type: 'error', text: '✗ Nieprawidłowy format emaila' });
      return false;
    }
    if (formData.pagesCount < 1) {
      setStatus({ type: 'error', text: '✗ Liczba stron musi być większa od 0' });
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    try {
      if (!validateForm()) return;

      setIsSubmitting(true);
      setStatus(null);

      const response = await fetch('/api/pricing', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Błąd podczas wysyłania formularza');
      }

      setStatus({ type: 'success', text: '✓ Wycena została pomyślnie wysłana' });
      // Reset form after successful submission
      setFormData({
        websiteType: 'portfolio',
        pagesCount: 1,
        cms: 'wordpress',
        customDesign: false,
        integrations: 'none',
        deadline: '',
        email: '',
        budget: '',
        requirements: '',
        seo: false,
        maintenance: false,
        hosting: false,
        domain: false,
      });
    } catch (err: any) {
      setStatus({ type: 'error', text: `✗ ${err.message}` });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Oblicz wycenę na podstawie danych z formularza
  const calculateEstimate = () => {
    let minCost = 2000;
    let maxCost = 5000;
    let minWeeks = 2;
    let maxWeeks = 4;

    // Korekta za liczbę stron
    minCost += formData.pagesCount * 500;
    maxCost += formData.pagesCount * 800;

    // Korekta za typ strony
    if (formData.websiteType === 'store') {
      minCost += 3000;
      maxCost += 5000;
      minWeeks += 2;
      maxWeeks += 3;
    } else if (formData.websiteType === 'business') {
      minCost += 1500;
      maxCost += 3000;
      minWeeks += 1;
      maxWeeks += 2;
    }

    // Korekta za projekt na zamówienie
    if (formData.customDesign) {
      minCost += 3000;
      maxCost += 5000;
      minWeeks += 2;
      maxWeeks += 3;
    }

    // Korekta za CMS
    if (formData.cms === 'custom') {
      minCost += 2000;
      maxCost += 4000;
      minWeeks += 1;
      maxWeeks += 2;
    }

    return { minCost, maxCost, minWeeks, maxWeeks };
  };

  const estimate = calculateEstimate();

  return (
    <div className="min-h-[60vh] bg-[#0a0a0a] flex items-center justify-center p-6">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&display=swap');
        
        body {
          font-family: 'JetBrains Mono', monospace;
        }
        
        .code-form {
          font-family: 'JetBrains Mono', monospace;
        }
        
        .subtle-glow {
          box-shadow: 0 0 40px rgba(100, 100, 100, 0.1);
        }
        
        .input-line {
          position: relative;
        }
        
        .input-line::before {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 1px;
          background: linear-gradient(90deg, #6b7280, #4b5563);
          transition: width 0.3s ease;
        }
        
        .input-line:focus-within::before {
          width: 100%;
        }
        
        .grid-bg {
          background-image: 
            linear-gradient(rgba(75, 85, 99, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(75, 85, 99, 0.1) 1px, transparent 1px);
          background-size: 20px 20px;
        }
      `}</style>

      <div className="code-form mx-auto w-[90%] max-w-4xl bg-[#111111] border border-[#222222] rounded-lg overflow-hidden subtle-glow relative">
        {/* Minimalistyczny nagłówek */}
        <div className="bg-[#0d0d0d] border-b border-[#1a1a1a] px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-[#f8b500]"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-[#6faadb]"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-[#e06c75]"></div>
            </div>
            <span className="text-[#f8b500] text-xs tracking-wider">// PRICING.TSX</span>
          </div>
          <div className="text-[#6faadb] text-xs">
            <span className="text-[#c5d4e8]">ln</span> 1:1
          </div>
        </div>

        {/* Zawartość formularza */}
        <div className="p-8 grid-bg">
          {/* Komentarz nagłówka */}
          <div className="mb-8">
            <div className="text-[#555555] text-sm mb-2">
              <span className="text-[#666666]">/**</span>
            </div>
            <div className="text-[#555555] text-sm mb-1 pl-3">
              * Opowiedz nam o swoim projekcie
            </div>
            <div className="text-[#555555] text-sm mb-1 pl-3">
              * Otrzymaj dokładną wycenę w kilka sekund
            </div>
            <div className="text-[#555555] text-sm">
              <span className="text-[#666666]">*/</span>
            </div>
          </div>

          {/* Typ strony */}
          <div className="mb-6">
            <div className="text-[#888888] text-xs mb-2 font-medium tracking-wide">
              TYP_STRONY
            </div>
            <select
              value={formData.websiteType}
              onChange={(e) => handleChange('websiteType', e.target.value)}
              className="w-full bg-[#0d0d0d] text-[#e0e0e0] text-sm outline-none px-4 py-3 border border-[#222222] focus:border-[#333333] transition-colors"
            >
              <option value="portfolio">Portfolio</option>
              <option value="store">Sklep</option>
              <option value="firm">Strona firmowa</option>
            </select>
          </div>

          {/* Liczba stron */}
          <div className="mb-6">
            <div className="text-[#888888] text-xs mb-2 font-medium tracking-wide">
              LICZBA_STRON
            </div>
            <div className="input-line">
              <input
                type="number"
                value={formData.pagesCount}
                onChange={(e) => handleChange('pagesCount', parseInt(e.target.value) || 1)}
                min="1"
                className="w-32 bg-transparent text-[#e0e0e0] text-sm outline-none pb-2 border-b border-[#222222] focus:border-[#333333] transition-colors"
              />
            </div>
          </div>

          {/* CMS */}
          <div className="mb-6">
            <div className="text-[#888888] text-xs mb-2 font-medium tracking-wide">
              WYBÓR_CMS
            </div>
            <select
              value={formData.cms}
              onChange={(e) => handleChange('cms', e.target.value)}
              className="w-full bg-[#0d0d0d] text-[#e0e0e0] text-sm outline-none px-4 py-3 border border-[#222222] focus:border-[#333333] transition-colors"
            >
              <option value="wordpress">WordPress</option>
              <option value="custom">Własny CMS</option>
              <option value="none">Bez CMS</option>
            </select>
          </div>

          {/* Projekt na zamówienie */}
          <div className="mb-6">
            <div className="text-[#888888] text-xs mb-2 font-medium tracking-wide">
              TYPOWY_PROJEKT
            </div>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.customDesign}
                onChange={(e) => handleChange('customDesign', e.target.checked)}
                className="w-5 h-5 bg-[#0d0d0d] border-2 border-[#222222] checked:bg-[#2a2a2a] checked:border-[#333333] cursor-pointer"
              />
              <span className="text-sm text-[#999999]">Projekt na zamówienie</span>
            </label>
          </div>

          {/* Integracje */}
          <div className="mb-6">
            <div className="text-[#888888] text-xs mb-2 font-medium tracking-wide">
              INTEGRACJE
            </div>
            <select
              value={formData.integrations}
              onChange={(e) => handleChange('integrations', e.target.value)}
              className="w-full bg-[#0d0d0d] text-[#e0e0e0] text-sm outline-none px-4 py-3 border border-[#222222] focus:border-[#333333] transition-colors"
            >
              <option value="payments">Płatności</option>
              <option value="accounts">Zarządzanie kontem</option>
              <option value="blog">Blog</option>
              <option value="admin">Panel administracyjny</option>
            </select>
          </div>

          {/* Termin */}
          <div className="mb-6">
            <div className="text-[#888888] text-xs mb-2 font-medium tracking-wide">
              TERMIN <span className="text-[#555555]">// opcjonalnie</span>
            </div>
            <input
              type="date"
              value={formData.deadline}
              onChange={(e) => handleChange('deadline', e.target.value)}
              className="w-full bg-[#0d0d0d] text-[#e0e0e0] text-sm outline-none px-4 py-3 border border-[#222222] focus:border-[#333333] transition-colors"
            />
          </div>

          {/* E-mail */}
          <div className="mb-8">
            <div className="text-[#888888] text-xs mb-2 font-medium tracking-wide">
              E-MAIL
            </div>
            <div className="input-line">
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                className="w-full bg-transparent text-[#e0e0e0] text-sm outline-none pb-2 border-b border-[#222222] focus:border-[#333333] transition-colors"
                placeholder="twoj@email.com"
              />
            </div>
          </div>

          {/* Wynik wyceny */}
          <div className="mb-8 p-6 bg-[#0d0d0d] border border-[#222222] rounded">
            <div className="text-[#888888] text-xs mb-4 font-medium tracking-wide">
              // WYNIK_WYCENY
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <span className="text-[#666666]">koszt:</span>
                <span className="text-[#cccccc]">
                  {estimate.minCost.toLocaleString()} PLN - {estimate.maxCost.toLocaleString()} PLN
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-[#666666]">czas:</span>
                <span className="text-[#cccccc]">
                  {estimate.minWeeks} - {estimate.maxWeeks} tygodnie
                </span>
              </div>
            </div>
          </div>

          {/* Komunikaty statusu */}
          {status && (
            <div className={`mb-6 text-xs px-4 py-3 rounded border ${
              status.type === 'success' 
                ? 'bg-[#1a1a1a] border-[#2a2a2a] text-[#999999]' 
                : 'bg-[#1a1a1a] border-[#2a2a2a] text-[#888888]'
            }`}>
              {status.text}
            </div>
          )}

          {/* Przycisk wysyłania */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="flex-1 bg-linear-to-r from-blue-600 via-indigo-500 to-indigo-600 text-white text-sm py-3 px-6 border border-transparent rounded transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="animate-pulse">●</span> WYSYŁANIE
                </span>
              ) : (
                'UZYSKAJ_WYCENĘ()'
              )}
            </button>
          </div>

          {/* Stopka */}
          <div className="mt-8 pt-6 border-t border-[#1a1a1a] text-[#555555] text-xs">
            <div className="flex items-center justify-between">
              <span>v1.0.0</span>
              <span className="text-[#444444]">Naciśnij ESC, aby zresetować</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
