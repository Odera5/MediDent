import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function HealthcareNews() {
  const [selectedCategory, setSelectedCategory] = useState("Nigeria");
  const [newsData, setNewsData] = useState({
    Nigeria: [],
    Africa: [],
    Global: [],
  });
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);

 const apiKey = "d1c8ca839a7345f4a47931797e03d087";

  const fetchCategoryNews = async (category, query) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://newsapi.org/v2/everything?q=${query}+health&language=en&sortBy=publishedAt&pageSize=9&apiKey=${apiKey}`
      );
      const data = await response.json();
      setNewsData((prev) => ({
        ...prev,
        [category]: data.articles || [],
      }));
      setLastUpdated(new Date());
    } catch (error) {
      console.error(`Error fetching ${category} news:`, error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategoryNews("Nigeria", "Nigeria");
    fetchCategoryNews("Africa", "Africa");
    fetchCategoryNews("Global", "global");

    // Auto-refresh every 30 minutes
    const interval = setInterval(() => {
      fetchCategoryNews("Nigeria", "Nigeria");
      fetchCategoryNews("Africa", "Africa");
      fetchCategoryNews("Global", "global");
    }, 1800000); // 30 mins = 1,800,000 ms

    return () => clearInterval(interval);
  }, []);

  const categories = ["Nigeria", "Africa", "Global"];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-16 px-6 sm:px-10">
      {/* Page Title */}
      <motion.h1
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-3xl font-semibold text-blue-900 text-center mb-2"
      >
        Healthcare News
      </motion.h1>

      {/* Last Updated Timestamp */}
      {lastUpdated && (
        <p className="text-center text-gray-600 text-sm mb-8">
          Last updated:{" "}
          {lastUpdated.toLocaleString("en-NG", {
            dateStyle: "medium",
            timeStyle: "short",
          })}
        </p>
      )}

      {/* Category Tabs */}
      <div className="flex justify-center mb-8 space-x-4">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-5 py-2 rounded-full font-medium transition ${
              selectedCategory === category
                ? "bg-blue-700 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* News Cards */}
      {loading ? (
        <p className="text-center text-blue-700 font-medium animate-pulse">
          Fetching latest {selectedCategory} health news...
        </p>
      ) : (
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {newsData[selectedCategory].length > 0 ? (
            newsData[selectedCategory].map((article, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition"
              >
                {/* Image */}
                {article.urlToImage ? (
                  <img
                    src={article.urlToImage}
                    alt={article.title}
                    className="w-full h-48 object-cover"
                  />
                ) : (
                  <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-500">
                    No Image
                  </div>
                )}

                {/* Article Info */}
                <div className="p-5">
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <h3 className="text-lg font-semibold text-blue-800 hover:underline mb-1">
                      {article.title}
                    </h3>
                  </a>
                  <p className="text-sm text-gray-500 mb-2">
                    {article.source?.name || "Unknown Source"} —{" "}
                    {new Date(article.publishedAt).toLocaleString("en-NG", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </p>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {article.description || "No summary available."}
                  </p>
                </div>
              </motion.div>
            ))
          ) : (
            <p className="text-center text-gray-600 col-span-full">
              No recent articles found for {selectedCategory}.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
