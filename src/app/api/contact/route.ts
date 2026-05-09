import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { fullName, email, phone, category, details } = body;

        if (!fullName || !email || !details) {
            return NextResponse.json({ message: 'Lütfen gerekli alanları doldurun.' }, { status: 400 });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json({ message: 'Lütfen geçerli bir e-posta adresi giriniz.' }, { status: 400 });
        }

        if (phone) {
            const phoneRegex = /^\+?[0-9\s\-\(\)]{7,20}$/;
            if (!phoneRegex.test(phone)) {
                return NextResponse.json({ message: 'Lütfen geçerli bir telefon numarası giriniz.' }, { status: 400 });
            }
        }

        // Configure nodemailer with environment variables
        // This requires SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS in .env.local
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST || 'smtp.gmail.com',
            port: Number(process.env.SMTP_PORT) || 587,
            secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        // Email content
        const mailOptions = {
            from: process.env.SMTP_FROM || process.env.SMTP_USER,
            to: 'info@ekols.com.tr',
            replyTo: email,
            subject: `Yeni Proje Teklifi: ${fullName}`,
            html: `
                <h2>Yeni Proje Teklif Talebi</h2>
                <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                        <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Ad Soyad:</strong></td>
                        <td style="padding: 8px; border-bottom: 1px solid #eee;">${fullName}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>E-Posta:</strong></td>
                        <td style="padding: 8px; border-bottom: 1px solid #eee;">${email}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Telefon:</strong></td>
                        <td style="padding: 8px; border-bottom: 1px solid #eee;">${phone || '-'}</td>
                    </tr>
                    <tr>
                        <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>İlgili Alan:</strong></td>
                        <td style="padding: 8px; border-bottom: 1px solid #eee;">${category || '-'}</td>
                    </tr>
                </table>
                <br/>
                <h3>Proje / Ürün Detayları:</h3>
                <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px;">
                    <p style="white-space: pre-wrap;">${details}</p>
                </div>
            `,
        };

        // Send email
        await transporter.sendMail(mailOptions);

        return NextResponse.json({ message: 'E-posta başarıyla gönderildi.' }, { status: 200 });
    } catch (error) {
        console.error('Email sending error:', error);
        return NextResponse.json(
            { message: 'E-posta gönderilirken bir sunucu hatası oluştu.', error: String(error) }, 
            { status: 500 }
        );
    }
}
