import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  const { name, phone, pickup, drop } = req.body;

  try {
    const url = `https://graph.facebook.com/v17.0/${process.env.WHATSAPP_PHONE_ID}/messages`;

    const message = `
🚖 *New Taxi Booking* 🚖

👤 Name: ${name}
📞 Phone: ${phone}
📍 Pickup: ${pickup}
🏁 Drop: ${drop}
    `;

    await axios.post(
      url,
      {
        messaging_product: "whatsapp",
        to: process.env.OWNER_NUMBER,
        type: "text",
        text: { body: message },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.status(200).json({ success: true });
  } catch (err) {
    console.error("Error sending WhatsApp message:", err.response?.data || err.message);
    res.status(500).json({ success: false, error: err.message });
  }
}
