import { motion } from 'motion/react';

export default function Privacy() {
  const lastUpdated = "May 5, 2026";

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto glass p-8 sm:p-12 w-full"
    >
      <h1 className="text-3xl font-extrabold tracking-tight mb-3 text-white">Privacy Policy</h1>
      <p className="text-sm text-[#94a3b8] mb-8 pb-8 border-b border-white/10">Last Updated: {lastUpdated}</p>

      <div className="text-[#cbd5e1] space-y-8 leading-relaxed">
        <section>
          <h2 className="text-xl font-bold text-white mb-3">1. Information We Do Not Collect</h2>
          <p>
            When you use the Age Calculator, all calculations are performed locally on your device in your web browser. 
            <strong className="text-white font-medium"> We do not collect, store, or transmit your date of birth or the calculation targets.</strong> These inputs never leave your computer.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3">2. Information We Automtically Collect</h2>
          <p>
            Like most standard website servers, we and our hosting partners use log files. This includes internet protocol (IP) addresses, browser type, internet service provider (ISP), referring/exit pages, platform type, date/time stamp, and number of clicks to analyze trends, administer the site, track user's movement in the aggregate, and gather broad demographic information for aggregate use.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3">3. Cookies</h2>
          <p>
            We may use cookies and similar tracking technologies to track the activity on our Service and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3">4. Security of Data</h2>
          <p>
            The security of your data is important to us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3">5. Changes to This Privacy Policy</h2>
          <p>
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mb-3">6. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us via our <a href="/contact" className="text-[#38bdf8] hover:underline">Contact page</a>.
          </p>
        </section>
      </div>
    </motion.div>
  );
}
