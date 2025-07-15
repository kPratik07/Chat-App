import { useState, useEffect } from "react";
import { ChevronDown, Globe } from "lucide-react";

const CountryDropdown = ({ onChange, value = "+91" }) => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://restcountries.com/v3.1/all?fields=name,idd');
        const data = await response.json();
        
        const formattedCountries = data
          .filter(country => country.idd.root && country.idd.suffixes)
          .map(country => ({
            name: country.name.common,
            dial_code: country.idd.root + (country.idd.suffixes[0] || ''),
            flag: country.flag
          }))
          .sort((a, b) => a.name.localeCompare(b.name));
        
        setCountries(formattedCountries);
      } catch (error) {
        console.error('Failed to fetch countries:', error);
        // Fallback to hardcoded countries
        setCountries([
          { name: "India", dial_code: "+91" },
          { name: "United States", dial_code: "+1" },
          { name: "United Kingdom", dial_code: "+44" },
          { name: "Canada", dial_code: "+1" },
          { name: "Australia", dial_code: "+61" },
          { name: "Germany", dial_code: "+49" },
          { name: "France", dial_code: "+33" },
          { name: "Brazil", dial_code: "+55" },
          { name: "Japan", dial_code: "+81" },
          { name: "South Korea", dial_code: "+82" },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  const filteredCountries = countries.filter(country =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    country.dial_code.includes(searchTerm)
  );

  const selectedCountry = countries.find(c => c.dial_code === value);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-left focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <div className="flex items-center space-x-2">
          <Globe className="w-4 h-4 text-gray-500" />
          <span className="text-gray-900 dark:text-white">
            {loading ? "Loading..." : selectedCountry ? `${selectedCountry.name} (${selectedCountry.dial_code})` : "Select Country"}
          </span>
        </div>
        <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-lg max-h-60 overflow-auto">
          <div className="p-2 border-b border-gray-200 dark:border-gray-600">
            <input
              type="text"
              placeholder="Search countries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
          
          <div className="py-1">
            {filteredCountries.length > 0 ? (
              filteredCountries.map((country, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => {
                    onChange(country.dial_code);
                    setIsOpen(false);
                    setSearchTerm("");
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 focus:bg-gray-100 dark:focus:bg-gray-600 focus:outline-none"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-gray-900 dark:text-white">{country.name}</span>
                    <span className="text-gray-500 dark:text-gray-400 font-mono">{country.dial_code}</span>
                  </div>
                </button>
              ))
            ) : (
              <div className="px-4 py-2 text-gray-500 dark:text-gray-400">
                No countries found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CountryDropdown;
