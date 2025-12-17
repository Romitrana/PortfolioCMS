import React, { useState } from "react";
import styles from "./ContactForm.module.css";
const API_URL = import.meta.env.VITE_API_URL;
const initialState = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

const ContactForm = () => {
  const [form, setForm] = useState(initialState);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API_URL}/portfolio/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Something went wrong");
        return;
      }

      setSubmitted(true);
      setForm(initialState);
    } catch (error) {
      console.error(error);
      alert("Server error");
    }
  };

  return (
    <div className={styles.contactContainer} id="contact">
      {/* Background video */}
      <video
        className={styles.backgroundVideo}
        src="earthMove.mp4" // adjust the path to your video file
        autoPlay
        muted
        loop
        playsInline
      />
      <div className={styles.overlay} />

      <form className={styles.form} onSubmit={handleSubmit} autoComplete="off">
        <h2 className={styles.heading}>Contact Us</h2>
        <div className={styles.row}>
          <input
            type="text"
            name="name"
            className={styles.input}
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            className={styles.input}
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>
        <input
          type="text"
          name="subject"
          className={styles.input}
          placeholder="Subject"
          value={form.subject}
          onChange={handleChange}
          required
        />
        <textarea
          name="message"
          className={styles.textarea}
          placeholder="Message"
          value={form.message}
          onChange={handleChange}
          required
          rows={5}
        />
        <button type="submit" className={styles.button}>
          Send Message
        </button>
        {submitted && (
          <div className={styles.success}>Thank you for reaching out!</div>
        )}
      </form>
    </div>
  );
};

export default ContactForm;
