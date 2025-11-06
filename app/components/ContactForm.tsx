 'use client'
import { FC, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import gsap from 'gsap';
import { sendEmail } from '../utils/send-email';

export type FormData = {
    name: string;
    surname: string;
    email: string;
    phone: string;
    message:string;
    topic: string;
};

const ContactForm: FC = () => {
    const {register, handleSubmit} = useForm<FormData>();
    const formRef = useRef<HTMLFormElement | null>(null);

    useEffect(() => {
        // entrance animation for the whole form and staggered fields
        const el = formRef.current;
        if (!el) return;

        const q = gsap.utils.selector(el);

        gsap.from(el, { opacity: 0, y: 18, duration: 0.6, ease: 'power2.out' });
        // include select and button so <select> also animates
        gsap.from(q('input, textarea, select'), { opacity: 0, y: 10, stagger: 0.06, duration: 0.45, delay: 0.12, ease: 'power2.out' });
    }, []);

    const [status, setStatus] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
    const [isSending, setIsSending] = useState(false);
    const bannerRef = useRef<HTMLDivElement | null>(null);

    async function onSubmit(data: FormData){
        try {
            setIsSending(true);
            const res = await sendEmail(data);
            setStatus({ type: 'success', text: res?.message || 'Wiadomość została wysłana.' });
        } catch (err: any) {
            setStatus({ type: 'error', text: err?.message || 'Wystąpił błąd podczas wysyłania.' });
        } finally {
            setIsSending(false);
        }
    }

    // subtle focus/blur animation using GSAP
    function handleFocus(e: React.FocusEvent<HTMLElement>) {
        gsap.to(e.currentTarget, { boxShadow: '0 0 0 6px rgba(239,68,68,0.08)', duration: 0.18 });
    }
    function handleBlur(e: React.FocusEvent<HTMLElement>) {
        gsap.to(e.currentTarget, { boxShadow: '0 0 0 0px rgba(0,0,0,0)', duration: 0.18 });
    }

    // animate banner in when status changes
    useEffect(() => {
        const b = bannerRef.current;
        if (!b) return;
        if (status) {
            gsap.fromTo(b, { y: -8, opacity: 0 }, { y: 0, opacity: 1, duration: 0.28, ease: 'power2.out' });
        }
    }, [status]);

    function dismissBanner() {
        const b = bannerRef.current;
        if (!b) return setStatus(null);
        gsap.to(b, { y: -8, opacity: 0, duration: 0.18, ease: 'power2.in', onComplete: () => setStatus(null) });
    }

    return(
        <>
            <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className="w-full max-w-4xl mx-auto p-6 mb-12 mt-12">
                {/* Inline banner for success / error messages */}
                {status && (
                    <div ref={bannerRef} className={`mb-4 rounded-2xl p-3 flex items-start justify-between gap-4 ${status.type === 'success' ? 'bg-green-800/80 text-green-100' : 'bg-red-900/90 text-red-100'}`} role="status" aria-live="polite">
                        <div className="flex items-center gap-3">
                            <strong className="font-semibold">{status.type === 'success' ? 'Email Sent' : 'Błąd'}</strong>
                        </div>
                        <button type="button" onClick={dismissBanner} className="text-sm opacity-80 hover:opacity-100">Zamknij</button>
                    </div>
                )}
                {/* Visual wrapper showing tags and styled form */}
                <div className="text-left text-gray-100">
                    <div className="mb-6">  
                        <h3 className="text-2xl font-semibold text-white py-2"><span className='text-red-500'>{"<h3>"}</span>Contact Us<span className='text-red-500'>{"</h3>"}</span></h3>                      
                    </div>

                    {/* Name */}
                    <div className="mb-5">
                        <div className="flex items-center gap-2">
                            <span className="font-mono text-red-400 text-sm">{'<label for="name">'}</span>
                            <span className="text-gray-200">Name</span>
                            <span className="font-mono text-red-400 text-sm">{'</label>'}</span>
                        </div>
                        <div className="mt-2">
                            <input {...register('name')} type="text" onFocus={handleFocus} onBlur={handleBlur} className="w-full bg-gray-700 text-white rounded-full h-10 px-4 outline-none focus:ring-2 focus:ring-red-500" />
                        </div>
                    </div>

                    {/* Topic */}
                    <div className="mb-5">
                        <div className="flex items-center gap-2">
                            <span className="font-mono text-red-400 text-sm">{'<label for="topic">'}</span>
                            <span className="text-gray-200">Topic</span>
                            <span className="font-mono text-red-400 text-sm">{'</label>'}</span>
                        </div>
                        <div className="mt-2">
                            <select {...register('topic')} onFocus={handleFocus} onBlur={handleBlur} className="w-full bg-gray-700 text-white rounded-full h-10 px-4 outline-none focus:ring-2 focus:ring-red-500">
                                <option value="" disabled hidden>Wybierz temat</option>
                                <option value="strona internetowa">Strona internetowa</option>
                                <option value="poprawki">Poprawki</option>
                                <option value="seo">SEO</option>
                                <option value="inne">Inne</option>
                            </select>
                        </div>
                    </div>

                    {/* Surname */}
                    <div className="mb-5">
                        <div className="flex items-center gap-2">
                            <span className="font-mono text-red-400 text-sm">{'<label for="surname">'}</span>
                            <span className="text-gray-200">Surname</span>
                            <span className="font-mono text-red-400 text-sm">{'</label>'}</span>
                        </div>
                        <div className="mt-2">
                            <input {...register('surname')} type="text" onFocus={handleFocus} onBlur={handleBlur} className="w-full bg-gray-700 text-white rounded-full h-10 px-4 outline-none focus:ring-2 focus:ring-red-500" />
                            
                        </div>
                    </div>

                    {/* Email */}
                    <div className="mb-5">
                        <div className="flex items-center gap-2">
                            <span className="font-mono text-red-400 text-sm">{'<label for="email">'}</span>
                            <span className="text-gray-200">E-mail</span>
                            <span className="font-mono text-red-400 text-sm">{'</label>'}</span>
                        </div>
                        <div className="mt-2">
                            <input {...register('email')} type="email" onFocus={handleFocus} onBlur={handleBlur} className="w-full bg-gray-700 text-white rounded-full h-10 px-4 outline-none focus:ring-2 focus:ring-red-500" />
                           
                        </div>
                    </div>

                    {/* Phone */}
                    <div className="mb-5">
                        <div className="flex items-center gap-2">
                            <span className="font-mono text-red-400 text-sm">{'<label for="phone">'}</span>
                            <span className="text-gray-200">Phone Number (optional)</span>
                            <span className="font-mono text-red-400 text-sm">{'</label>'}</span>
                        </div>
                        <div className="mt-2">
                            <input {...register('phone')} type="tel" onFocus={handleFocus} onBlur={handleBlur} className="w-full bg-gray-700 text-white rounded-full h-10 px-4 outline-none focus:ring-2 focus:ring-red-500" />
                            
                        </div>
                    </div>

                    {/* Message */}
                    <div className="mb-6">
                        <div className="flex items-center gap-2">
                            <span className="font-mono text-red-400 text-sm">{'<label for="message">'}</span>
                            <span className="text-gray-200">Message</span>
                            <span className="font-mono text-red-400 text-sm">{'</label>'}</span>
                        </div>
                        <div className="mt-2">
                            <textarea {...register('message')} rows={6} onFocus={handleFocus} onBlur={handleBlur} className="w-full bg-gray-700 text-white rounded-2xl p-4 outline-none focus:ring-2 focus:ring-red-500" />
                            
                        </div>
                    </div>

                    {/* Submit button with visible tag */}
                    <div className="mb-2">                       
                        <button type="submit"><span className='text-red-400'>{"<span>"}</span>Send<span className='text-red-400'>{"</span>"}</span></button>                    
                    </div>
                </div>
            </form>
        </>
    );
}

export default ContactForm;