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

    // Validation des champs requis
    if (!name || !email || !message) {
      return res.status(400).json({ error: "Champs requis manquants" });
    }

    // Validation du format email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Format d'email invalide" });
    }

    // Validation de la longueur des champs
    if (name.length > 100 || email.length > 100 || message.length > 5000) {
      return res
        .status(400)
        .json({ error: "Les données envoyées sont trop volumineuses" });
    }

    if (phone && phone.length > 20) {
      return res.status(400).json({ error: "Numéro de téléphone invalide" });
    }

    // Envoyer la notification au propriétaire
    await resend.emails.send({
      from: "MR Massages Animaliers <onboarding@resend.dev>",
      to: ["mr_massages.animaliers@yahoo.com"],
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
