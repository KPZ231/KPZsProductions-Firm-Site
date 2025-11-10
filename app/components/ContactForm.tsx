import { FC, useState } from 'react';

export type FormData = {
  name: string;
  surname: string;
  email: string;
  phone: string;
  message: string;
};

const ContactForm: FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    surname: '',
    email: '',
    phone: '',
    message: ''
  });
  const [status, setStatus] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [isSending, setIsSending] = useState(false);

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setStatus({ type: 'error', text: '✗ Imię jest wymagane' });
      return false;
    }
    if (!formData.email.trim()) {
      setStatus({ type: 'error', text: '✗ Email jest wymagany' });
      return false;
    }
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(formData.email)) {
      setStatus({ type: 'error', text: '✗ Nieprawidłowy format emaila' });
      return false;
    }
    if (!formData.message.trim()) {
      setStatus({ type: 'error', text: '✗ Wiadomość jest wymagana' });
      return false;
    }
    if (formData.phone) {
      const phoneRegex = /^(\+\d{1,3}\s?)?\d{3}[\s-]?\d{3}[\s-]?\d{3}$/;
      if (!phoneRegex.test(formData.phone)) {
        setStatus({ type: 'error', text: '✗ Nieprawidłowy format numeru telefonu' });
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async () => {
    try {
      if (!validateForm()) return;

      setIsSending(true);
      setStatus(null);

      const response = await fetch('/api/email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Błąd podczas wysyłania wiadomości');
      }

      setStatus({ type: 'success', text: '✓ Wiadomość została pomyślnie wysłana' });
      setFormData({ name: '', surname: '', email: '', phone: '', message: '' });
    } catch (err: any) {
      setStatus({ type: 'error', text: `✗ ${err.message}` });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-6">
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

      <div className="code-form w-full max-w-6xl bg-[#111111] border border-[#222222] rounded-lg overflow-hidden subtle-glow relative">
        {/* Minimalistyczny nagłówek */}
        <div className="bg-[#0d0d0d] border-b border-[#1a1a1a] px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-[#2a2a2a]"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-[#2a2a2a]"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-[#2a2a2a]"></div>
            </div>
            <span className="text-[#666666] text-xs tracking-wider">CONTACT.TSX</span>
          </div>
          <div className="text-[#444444] text-xs">
            <span className="text-[#666666]">ln</span> 1:1
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
              * Wyślij do nas wiadomość
            </div>
            <div className="text-[#555555] text-sm mb-1 pl-3">
              * Odezwiemy się do Ciebie wkrótce
            </div>
            <div className="text-[#555555] text-sm">
              <span className="text-[#666666]">*/</span>
            </div>
          </div>

          {/* Pole Imię */}
          <div className="mb-6">
            <div className="text-[#888888] text-xs mb-2 font-medium tracking-wide">
              IMIĘ
            </div>
            <div className="input-line">
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                className="w-full bg-transparent text-[#e0e0e0] text-sm outline-none pb-2 border-b border-[#222222] focus:border-[#333333] transition-colors"
                placeholder="Wpisz swoje imię"
              />
            </div>
          </div>

          {/* Pole Nazwisko */}
          <div className="mb-6">
            <div className="text-[#888888] text-xs mb-2 font-medium tracking-wide">
              NAZWISKO
            </div>
            <div className="input-line">
              <input
                type="text"
                value={formData.surname}
                onChange={(e) => handleChange('surname', e.target.value)}
                className="w-full bg-transparent text-[#e0e0e0] text-sm outline-none pb-2 border-b border-[#222222] focus:border-[#333333] transition-colors"
                placeholder="Wpisz swoje nazwisko"
              />
            </div>
          </div>

          {/* Pole Email */}
          <div className="mb-6">
            <div className="text-[#888888] text-xs mb-2 font-medium tracking-wide">
              EMAIL
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

          {/* Pole Telefon */}
          <div className="mb-6">
            <div className="text-[#888888] text-xs mb-2 font-medium tracking-wide">
              TELEFON <span className="text-[#555555]">// opcjonalnie</span>
            </div>
            <div className="input-line">
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                className="w-full bg-transparent text-[#e0e0e0] text-sm outline-none pb-2 border-b border-[#222222] focus:border-[#333333] transition-colors"
                placeholder="+48 123 456 789"
              />
            </div>
          </div>

          {/* Pole Wiadomość */}
          <div className="mb-8">
            <div className="text-[#888888] text-xs mb-2 font-medium tracking-wide">
              WIADOMOŚĆ
            </div>
            <textarea
              value={formData.message}
              onChange={(e) => handleChange('message', e.target.value)}
              rows={5}
              className="w-full bg-[#0d0d0d] text-[#e0e0e0] text-sm outline-none p-4 border border-[#222222] focus:border-[#333333] rounded transition-colors resize-none"
              placeholder="Wpisz tutaj swoją wiadomość..."
            />
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
              disabled={isSending}
              className="flex-1 bg-[#1a1a1a] hover:bg-[#222222] disabled:bg-[#0d0d0d] text-[#cccccc] hover:text-white disabled:text-[#555555] text-sm py-3 px-6 border border-[#2a2a2a] hover:border-[#3a3a3a] transition-all duration-200 disabled:cursor-not-allowed"
            >
              {isSending ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="animate-pulse">●</span> WYSYŁANIE
                </span>
              ) : (
                'WYŚLIJ WIADOMOŚĆ'
              )}
            </button>
          </div>

          {/* Stopka */}
          <div className="mt-8 pt-6 border-t border-[#1a1a1a] text-[#555555] text-xs">
            <div className="flex items-center justify-between">
              <span>v1.0.0</span>
              <span className="text-[#444444]">Naciśnij ESC, aby wyczyścić</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
