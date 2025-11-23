import { Resend } from "resend";
import type { VercelRequest, VercelResponse } from "@vercel/node";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { name, email, phone, animal, message, company } = req.body;

    if (company) {
      return res.status(200).json({ success: true });
    }

    // Validation
    if (!name || !email || !message) {
      return res.status(400).json({ error: "Champs requis manquants" });
    }

    // Envoyer la notification au propriétaire
    await resend.emails.send({
      from: "MR Massages Animaliers <onboarding@resend.dev>",
      to: ["sasha.laigle@gmail.com"],
      subject: `Nouveau message de ${name}`,
      replyTo: email,
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

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error sending email:", error);
    return res.status(500).json({ error: "Erreur lors de l'envoi du message" });
  }
}
