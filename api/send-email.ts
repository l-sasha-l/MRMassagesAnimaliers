import { Resend } from 'resend';
import type { VercelRequest, VercelResponse } from '@vercel/node';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: VercelRequest, res: VercelResponse) {
    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { name, email, phone, message } = req.body;

        // Validation
        if (!name || !email || !message) {
            return res.status(400).json({ error: 'Champs requis manquants' });
        }

        // Send email using Resend
        const data = await resend.emails.send({
            from: 'MR Massages Animaliers <onboarding@resend.dev>', // Tu changeras après vérification du domaine
            to: ['mr_massages.animaliers@yahoo.com'],
            subject: `Nouveau message de ${name}`,
            html: `
                <h2>Nouveau message de contact</h2>
                <p><strong>Nom:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Téléphone:</strong> ${phone || 'Non fourni'}</p>
                <p><strong>Message:</strong></p>
                <p>${message}</p>
            `,
        });

        return res.status(200).json({ success: true, data });
    } catch (error) {
        console.error('Error sending email:', error);
        return res.status(500).json({ error: 'Erreur lors de l\'envoi du message' });
    }
}
