'use client'
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { sendEmail } from '../utils/send-email';

export type FormData = {
    name: string;
    surname: string;
    email: string;
    phone: string;
    message:string;
};

const ContactForm: FC = () => {
    const {register, handleSubmit} = useForm<FormData>();

    function onSubmit(data: FormData){
        sendEmail(data);
    }
    return(
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-4xl mx-auto p-6 mb-12 mt-12">
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
                            <input {...register('name')} type="text" className="w-full bg-gray-700 text-white rounded-full h-10 px-4 outline-none focus:ring-2 focus:ring-red-500" />
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
                            <input {...register('surname')} type="text" className="w-full bg-gray-700 text-white rounded-full h-10 px-4 outline-none focus:ring-2 focus:ring-red-500" />
                            
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
                            <input {...register('email')} type="email" className="w-full bg-gray-700 text-white rounded-full h-10 px-4 outline-none focus:ring-2 focus:ring-red-500" />
                           
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
                            <input {...register('phone')} type="tel" className="w-full bg-gray-700 text-white rounded-full h-10 px-4 outline-none focus:ring-2 focus:ring-red-500" />
                            
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
                            <textarea {...register('message')} rows={6} className="w-full bg-gray-700 text-white rounded-2xl p-4 outline-none focus:ring-2 focus:ring-red-500" />
                            
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