import React from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiMapPin, FiPhone, FiSend, FiGithub, FiLinkedin, FiInstagram, FiFacebook } from 'react-icons/fi';

const Contact = () => {
    const [result, setResult] = React.useState("");

    const onSubmit = async (event) => {
        event.preventDefault();
        setResult("Sending...");
        const formData = new FormData(event.target);
        formData.append("access_key", "9494e776-c630-4dcf-8af5-c0032e3776d4");

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData
            });

            const data = await response.json();

            if (data.success) {
                setResult("Message Sent Successfully!");
                event.target.reset();
                setTimeout(() => {
                    setResult("");
                }, 5000); // Changed to 5 seconds. Let me know if you want a different time!
            } else {
                setResult("Error Sending Message: " + data.message);
            }
        } catch (error) {
            setResult("An error occurred. Please try again.");
        }
    };

    return (
        <div className="w-full max-w-6xl mx-auto pt-10 px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-16"
            >
                <span className="text-orange-600 dark:text-orange-400 font-semibold tracking-wider uppercase text-sm">Get in Touch</span>
                <h2 className="text-4xl md:text-5xl font-bold mt-2">Contact <span className="text-gradient">Me</span></h2>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Left Column: Info + Map */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col gap-8"
                >
                    <div className="space-y-4">
                        <h3 className="text-3xl font-bold text-text-primary">Get in Touch</h3>
                        <p className="text-text-secondary leading-relaxed max-w-md">
                            Feel free to reach out to me for any inquiries about projects,
                            collaborations, or just to say hi.
                        </p>
                    </div>

                    <div className="space-y-6">
                        {/* Email */}
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-orange-500/10 rounded-lg border border-orange-500/20 mt-1">
                                <FiMail className="text-xl text-orange-600 dark:text-orange-400" />
                            </div>
                            <div>
                                <h4 className="font-bold text-text-primary mb-1">Email</h4>
                                <a href="mailto:amilafernando2004@gmail.com" className="text-text-secondary hover:text-orange-600 dark:hover:text-orange-400 transition-colors">
                                    amilafernando2004@gmail.com
                                </a>
                            </div>
                        </div>

                        {/* Phone */}
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-orange-500/10 rounded-lg border border-orange-500/20 mt-1">
                                <FiPhone className="text-xl text-orange-600 dark:text-orange-400" />
                            </div>
                            <div>
                                <h4 className="font-bold text-text-primary mb-1">Phone</h4>
                                <a href="https://wa.me/94711237591" target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-orange-600 dark:hover:text-orange-400 transition-colors">
                                    +94 71 123 7591
                                </a>
                            </div>
                        </div>

                        {/* Address */}
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-orange-500/10 rounded-lg border border-orange-500/20 mt-1">
                                <FiMapPin className="text-xl text-orange-600 dark:text-orange-400" />
                            </div>
                            <div>
                                <h4 className="font-bold text-text-primary mb-1">Address</h4>
                                <p className="text-text-secondary">
                                    NO.66/Layanal Road,Lansigama
                                    <br />
                                    Katuneriya.
                                </p>
                            </div>
                        </div>


                    </div>

                    {/* Google Map */}
                    <div className="w-full h-64 md:h-80 rounded-2xl overflow-hidden shadow-lg border border-white/10 mt-4 relative group">
                        {/* 📍 CHANGE MAP LOCATION HERE: Update the 'q' parameter with new coordinates (Lat,Lng), address, or City */}
                        <iframe
                            src="https://maps.google.com/maps?q=7.3791906,79.8263894&hl=en&z=14&output=embed"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            className="bg-[#242f3e] dark:grayscale group-hover:grayscale-0 transition-all duration-700"
                            title="SLTC Location"
                        ></iframe>
                        {/* Hover overlay to restore color/interactive feel hint */}
                        <div className="absolute inset-0 bg-transparent group-hover:bg-transparent pointer-events-none transition-all" />
                    </div>
                </motion.div>

                {/* Right Column: Contact Form */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="glass-card p-8 md:p-10 border border-[var(--glass-border)] bg-[var(--bg-secondary)]/50 h-fit"
                >
                    <form onSubmit={onSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-text-secondary ml-1">Name</label>
                            <input
                                name="name"
                                type="text"
                                required
                                className="w-full bg-[var(--bg-primary)] border border-[var(--glass-border)] rounded-xl p-4 text-text-primary focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors"
                                placeholder="Your Name"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-text-secondary ml-1">Email</label>
                            <input
                                name="email"
                                type="email"
                                required
                                className="w-full bg-[var(--bg-primary)] border border-[var(--glass-border)] rounded-xl p-4 text-text-primary focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors"
                                placeholder="your@email.com"
                            />
                        </div>


                        <div className="space-y-2">
                            <label className="text-sm font-medium text-text-secondary ml-1">Message</label>
                            <textarea
                                name="message"
                                rows="5"
                                required
                                className="w-full bg-[var(--bg-primary)] border border-[var(--glass-border)] rounded-xl p-4 text-text-primary focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors resize-none"
                                placeholder="Your message..."
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            className="w-full py-4 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-lg hover:shadow-lg hover:shadow-orange-500/20 transition-all hover:-translate-y-1 flex items-center justify-center gap-2"
                        >
                            <FiSend /> Send Message
                        </button>

                        {result && (
                            <p className={`text-center text-sm font-medium ${result.includes("Success") ? "text-green-500" : "text-red-500"
                                }`}>
                                {result}
                            </p>
                        )}
                    </form>
                </motion.div>
            </div >
        </div >
    );
};

export default Contact;
