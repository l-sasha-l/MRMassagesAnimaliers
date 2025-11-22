import { Resend } from "resend";
import type { VercelRequest, VercelResponse } from "@vercel/node";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { name, email, phone, animal, message } = req.body;

    // Validation
    if (!name || !email || !message) {
      return res.status(400).json({ error: "Champs requis manquants" });
    }

    // Email 1: Envoyer les détails du formulaire à MR Massages Animaliers
    await resend.emails.send({
      from: "MR Massages Animaliers <onboarding@resend.dev>",
      to: ["sasha.laigle@gmail.com"],
      subject: `Nouveau message de ${name}`,
      html: `
                <h2>Nouveau message de contact</h2>
                <p><strong>Nom:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Téléphone:</strong> ${phone || "Non fourni"}</p>
                <p><strong>Type d'animal:</strong> ${animal || "Non spécifié"}</p>
                <p><strong>Message:</strong></p>
                <p>${message}</p>
            `,
    });

    // Email 2: Envoyer une confirmation à l'utilisateur
    await resend.emails.send({
      from: "MR Massages Animaliers <onboarding@resend.dev>",
      to: [email],
      subject: "Confirmation de votre message - MR Massages Animaliers",
      html: `
                <h2>Merci pour votre message !</h2>
                <p>Bonjour ${name},</p>
                <p>Nous avons bien reçu votre message et nous vous remercions de votre intérêt pour nos services de massages animaliers.</p>
                <p>Nous vous contacterons dans les plus brefs délais pour répondre à votre demande.</p>
                <br>
                <p><strong>Récapitulatif de votre message :</strong></p>
                <p><strong>Type d'animal:</strong> ${animal || "Non spécifié"}</p>
                <p><strong>Votre message:</strong></p>
                <p>${message}</p>
                <br>
                <p>À très bientôt,</p>
                <p><strong>MR Massages Animaliers</strong></p>
                <p>Email: mr_massages.animaliers@yahoo.com</p>
            `,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error sending email:", error);
    return res.status(500).json({ error: "Erreur lors de l'envoi du message" });
  }
}
