import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    pickup: "",
    drop: ""
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Booking in progress...");

    try {
      const res = await axios.post("/api/book", formData);
      if (res.data.success) {
        setStatus("✅ Booking sent to WhatsApp!");
        setFormData({ name: "", phone: "", pickup: "", drop: "" });
      } else {
        setStatus("❌ Error sending booking");
      }
    } catch (err) {
      setStatus("❌ Server error");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center" }}>🚖 Taxi Booking</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
        /><br/><br/>

        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          required
        /><br/><br/>

        <input
          type="text"
          name="pickup"
          placeholder="Pickup Location"
          value={formData.pickup}
          onChange={handleChange}
          required
        /><br/><br/>

        <input
          type="text"
          name="drop"
          placeholder="Drop Location"
          value={formData.drop}
          onChange={handleChange}
          required
        /><br/><br/>

        <button type="submit">Book Now</button>
      </form>
      <p style={{ textAlign: "center", marginTop: "10px" }}>{status}</p>
    </div>
  );
}
