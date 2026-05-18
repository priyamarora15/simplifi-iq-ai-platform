import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import {
  signInWithPopup,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth, provider } from "./firebase/config";

function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();

  }, []);
  const [formData, setFormData] = useState({
    companyName: "",
    website: "",
    email: "",
  });

  const [loading, setLoading] = useState(false);

  const [auditResult, setAuditResult] = useState(null);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleGoogleLogin = async () => {
    try {

      const result = await signInWithPopup(auth, provider);

      setUser(result.user);

      alert(`Welcome ${result.user.displayName}`);

    } catch (error) {
      console.log(error);
      alert("Google Login Failed");
    }
  };
  const generateAudit = async () => {
    if (!formData.companyName || !formData.website || !formData.email) {
      alert("Please fill all fields");
      return;
    }
    try {

      setLoading(true);

      const response = await fetch(
        "https://simplifi-iq-ai-platform.onrender.com/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      console.log(data);

      setAuditResult(data);

      setTimeout(() => {
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: "smooth",
        });
      }, 500);

      setLoading(false);

    } catch (error) {

      console.log(error);

      alert("Audit Generation Failed");

      setLoading(false);

    }

  };
  const handleLogout = async () => {

    await signOut(auth);

    setUser(null);

  };
  if (!user) {
    return (
      <div className="min-h-screen bg-[#050816] text-white overflow-hidden relative flex items-center justify-center">

        {/* Glow Effects */}
        <div className="absolute w-[500px] h-[500px] bg-purple-600 opacity-20 blur-[120px] rounded-full top-[-100px] left-[-100px]" />

        <div className="absolute w-[400px] h-[400px] bg-cyan-500 opacity-20 blur-[120px] rounded-full bottom-[-100px] right-[-100px]" />

        {/* Login Card */}
        <div className="relative z-10 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-14 w-[420px] text-center shadow-2xl">

          <div className="mb-8">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              SimplifiIQ
            </h1>

            <p className="text-gray-400 mt-4">
              AI Powered Business Intelligence Platform
            </p>
          </div>

          <button
            onClick={handleGoogleLogin}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-600 text-lg font-semibold hover:scale-105 transition duration-300 shadow-lg shadow-purple-500/20"
          >
            Sign In With Google
          </button>


        </div>

      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-purple-50 text-black overflow-hidden relative">

      {/* Glow Effects */}
      <div className="absolute w-[500px] h-[500px] bg-purple-600 opacity-20 blur-[120px] rounded-full top-[-100px] left-[-100px]" />

      <div className="absolute w-[400px] h-[400px] bg-cyan-500 opacity-20 blur-[120px] rounded-full bottom-[-100px] right-[-100px]" />

      {/* Navbar */}
      <nav className="flex items-center justify-between px-10 py-6 relative z-10">

        <h1 className="text-2xl font-bold">
          SimplifiIQ
        </h1>

        <div className="flex items-center gap-4">

          <p className="text-sm text-gray-700 font-medium">
            Hello, {user?.displayName}
          </p>

          <button
            onClick={handleLogout}
            className="px-5 py-2 rounded-xl border border-red-500 hover:bg-red-500/20 transition"
          >
            Logout
          </button>

        </div>

      </nav>

      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center px-6 pt-10 relative z-10">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-6 px-4 py-2 border border-purple-500 rounded-full bg-purple-100 text-purple-700"
          whileHover={{ scale: 1.01 }}
        >
          AI Powered Lead Intelligence
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-6xl md:text-7xl font-bold text-center leading-tight"
        >
          Generate
          <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            {" "}AI Business Audits
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-6 text-gray-600 text-lg text-center max-w-2xl leading-8"
        >
          Analyze any company using AI-powered scraping,
          business intelligence, and automated growth insights.
        </motion.p>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-14 w-full max-w-2xl backdrop-blur-xl bg-white border border-purple-100 rounded-3xl p-8 shadow-2xl"
        >

          <div className="grid gap-5">

            <input
              type="text"
              name="companyName"
              placeholder="Company Name"
              value={formData.companyName}
              onChange={handleChange}
              className="bg-purple-50 text-black border border-purple-100 rounded-2xl px-5 py-4 outline-none focus:border-cyan-400 transition"
            />

            <input
              type="text"
              name="website"
              placeholder="Company Website"
              value={formData.website}
              onChange={handleChange}
              className="bg-purple-50 text-black border border-purple-100 rounded-2xl px-5 py-4 outline-none focus:border-cyan-400 transition"
            />

            <input
              type="email"
              name="email"
              placeholder="Business Email"
              value={formData.email}
              onChange={handleChange}
              className="bg-purple-50 text-black border border-purple-100 rounded-2xl px-5 py-4 outline-none focus:border-cyan-400 transition"
            />

            <motion.button
              onClick={generateAudit}
              disabled={loading}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="mt-4 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-600 font-semibold text-lg shadow-xl shadow-purple-500/30 hover:shadow-cyan-500/20 transition duration-300"
            >
              {
                loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <Loader2 className="animate-spin w-5 h-5" />
                    Generating...
                  </div>
                ) : (
                  "Generate AI Audit"
                )
              }
            </motion.button>


          </div>

        </motion.div>
        {
          auditResult && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-5xl mx-auto mt-14 mb-20"
            >
              <div className="bg-white rounded-3xl p-8 shadow-2xl border border-purple-100">

                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-4xl font-bold text-gray-900">
                      AI Audit Report
                    </h2>

                    <p className="text-gray-500 mt-2">
                      Generated for {auditResult.companyName}
                    </p>
                  </div>

                  <div className="px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 text-white text-sm font-semibold">
                    AI Powered
                  </div>
                </div>

                {/* Company Info */}
                <div className="grid md:grid-cols-2 gap-6 mb-8">

                  <div className="bg-gray-50 p-5 rounded-2xl">
                    <h3 className="font-semibold text-gray-500 mb-2">
                      Website Title
                    </h3>

                    <p className="text-gray-800 font-medium">
                      {auditResult.scrapedData?.title}
                    </p>
                  </div>

                  <div className="bg-gray-50 p-5 rounded-2xl">
                    <h3 className="font-semibold text-gray-500 mb-2">
                      Meta Description
                    </h3>

                    <p className="text-gray-700 text-sm leading-7">
                      {auditResult.scrapedData?.metaDescription}
                    </p>
                  </div>
                </div>

                {/* AI Insights */}
                <div className="bg-gradient-to-r from-cyan-50 to-purple-50 p-6 rounded-3xl border border-purple-100">

                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    AI Insights
                  </h3>

                  <div className="text-gray-700 leading-8 whitespace-pre-line">
                    {auditResult.aiInsights?.insights ||
                      "No AI insights available"}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

      </div>
    </div>
  );
}

export default App;