import { type NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';

export async function POST(request: NextRequest) {
  try {
    const { 
      websiteType,
      pagesCount,
      cms,
      customDesign,
      integrations,
      deadline,
      email,
      budget,
      requirements,
      seo,
      maintenance,
      hosting,
      domain
    } = await request.json();

    // Input validation
    if (!email || !websiteType || !pagesCount || !cms) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    const transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MY_EMAIL,
        pass: process.env.MY_PASSWORD,
      },
    });

    const formattedDate = deadline ? new Date(deadline).toLocaleDateString('pl-PL') : 'Nie określono';
    
    const emailContent = `
Nowe zapytanie o wycenę strony internetowej

Szczegóły projektu:
------------------
Typ strony: ${websiteType}
Liczba stron: ${pagesCount}
System CMS: ${cms}
Projekt na zamówienie: ${customDesign ? 'Tak' : 'Nie'}
Zakres budżetu: ${budget || 'Nie określono'}
Integracje: ${integrations}

Dodatkowe opcje:
--------------
SEO: ${seo ? 'Tak' : 'Nie'}
Hosting: ${hosting ? 'Tak' : 'Nie'}
Domena: ${domain ? 'Tak' : 'Nie'}
Opieka techniczna: ${maintenance ? 'Tak' : 'Nie'}

Dodatkowe wymagania:
------------------
${requirements || 'Brak dodatkowych wymagań'}

Termin realizacji:
----------------
Oczekiwany termin: ${formattedDate}

Kontakt do klienta:
------------------
Email: ${email}

Wiadomość wygenerowana automatycznie przez formularz wyceny KPZsProductions.
    `.trim();

    const mailOptions: Mail.Options = {
      from: process.env.MY_EMAIL,
      to: process.env.MY_EMAIL,
      subject: `Zapytanie o wycenę - ${websiteType} (KPZsProductions Pricing)`,
      text: emailContent,
      replyTo: email // Bezpieczne ustawienie adresu do odpowiedzi
    };

    await new Promise<void>((resolve, reject) => {
      transport.sendMail(mailOptions, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });

    return NextResponse.json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Email sending error:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}