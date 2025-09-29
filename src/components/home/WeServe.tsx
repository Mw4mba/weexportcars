
import { useState, useEffect, RefObject } from 'react';
import { Globe, CheckCircle } from 'lucide-react';

// Color scheme constants
const DARK_TEXT_COLOR = '#2a3443';
const ACCENT_COLOR = '#d10e22';
const BG_LIGHT_COLOR = '#e6e6e6';



const SERVICE_COUNTRIES = [
    // Coordinates adjusted to fit the new, more realistic map path
    { name: "Botswana", coords: { x: 300, y: 600 } },
    { name: "Eswatini", coords: { x: 400, y: 680 } },
    { name: "Kenya", coords: { x: 450, y: 200 } },
    { name: "Tanzania", coords: { x: 420, y: 300 } },
    { name: "Mozambique", coords: { x: 450, y: 500 } },
    { name: "Lesotho", coords: { x: 350, y: 720 } },
    { name: "Namibia", coords: { x: 250, y: 550 } },
    { name: "Uganda", coords: { x: 400, y: 120 } },
    { name: "Zimbabwe", coords: { x: 380, y: 550 } },
    { name: "Zambia", coords: { x: 350, y: 450 } }
];

// 1. Custom SVG Map Component
type Country = { name: string; coords: { x: number; y: number } };
type AfricaMapProps = {
    countries: Country[];
    hoveredCountry: string | null;
    setHoveredCountry: (country: string | null) => void;
};
const AfricaMap = ({ countries, hoveredCountry, setHoveredCountry }: AfricaMapProps) => {
    // A simplified, but more realistic SVG path focusing on South/East Africa
    const mapOutlinePath = "M 302.5 102.5 C 313.5 102.5 352.5 87.5 372.5 89.5 C 392.5 91.5 435.5 120.5 450.5 174.5 C 465.5 228.5 482.5 301.5 487.5 376.5 C 492.5 451.5 485.5 540.5 455.5 613.5 C 425.5 686.5 371.5 730.5 315.5 744.5 C 259.5 758.5 210.5 736.5 175.5 699.5 C 140.5 662.5 125.5 596.5 119.5 525.5 C 113.5 454.5 118.5 380.5 140.5 307.5 C 162.5 234.5 204.5 167.5 233.5 125.5 C 262.5 83.5 291.5 102.5 302.5 102.5 Z";
    
    return (
        <svg viewBox="0 0 700 850" className="w-full h-full rounded-2xl shadow-2xl bg-white" preserveAspectRatio="xMidYMid meet">
            {/* Background Map Shape (More realistic African Outline) */}
            <path 
                d={mapOutlinePath}
                fill="#F3F4F6" // Light gray map color
                stroke={DARK_TEXT_COLOR}
                strokeWidth="3"
            />

            {/* Service Country Markers */}
            {countries.map((country: Country) => (
                <g key={country.name} 
                    onMouseEnter={() => setHoveredCountry(country.name)}
                    onMouseLeave={() => setHoveredCountry(null)}
                    className="cursor-pointer transition-transform duration-300 hover:scale-[1.1]"
                >
                    {/* Highlight Circle */}
                    <circle 
                        cx={country.coords.x} 
                        cy={country.coords.y} 
                        r={hoveredCountry === country.name ? 15 : 8}
                        fill={hoveredCountry === country.name ? ACCENT_COLOR : DARK_TEXT_COLOR}
                        opacity={hoveredCountry === country.name ? 0.9 : 0.6}
                        className="transition-all duration-300"
                    />
                    {/* Inner Dot */}
                     <circle 
                        cx={country.coords.x} 
                        cy={country.coords.y} 
                        r={hoveredCountry === country.name ? 5 : 4}
                        fill="white"
                    />
                    {/* Country Label (Appears on hover) */}
                    <text
                        x={country.coords.x + 20}
                        y={country.coords.y + 5}
                        fill={ACCENT_COLOR}
                        fontSize="20"
                        fontWeight="bold"
                        className="pointer-events-none transition-opacity duration-300"
                        opacity={hoveredCountry === country.name ? 1 : 0}
                    >
                        {country.name}
                    </text>
                </g>
            ))}
        </svg>
    );
};
type WeServeSectionProps = {
    sectionRefs: { weServe: RefObject<HTMLElement> };
    scrollToSection: (section: string) => void;
    hoveredCountry: string | null;
    setHoveredCountry: (country: string | null) => void;
};
const WeServeSection = ({ sectionRefs, scrollToSection, hoveredCountry, setHoveredCountry }: WeServeSectionProps) => {
    const serveRef = sectionRefs.weServe;
    const [isVisible, setIsVisible] = useState(false);

    // Intersection Observer logic to change body background color
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
                if (entry.isIntersecting) {
                    // Change page background to white for contrast
                    document.body.style.backgroundColor = 'white'; 
                } else {
                    // Revert to light gray when scrolling away
                    document.body.style.backgroundColor = BG_LIGHT_COLOR;
                }
            },
            {
                root: null,
                rootMargin: '0px',
                threshold: 0.5, // Trigger when 50% of the section is visible
            }
        );

        if (serveRef.current) {
            observer.observe(serveRef.current);
        }

        return () => {
            if (serveRef.current) {
                observer.unobserve(serveRef.current);
            }
            // Ensure background is reset if the component unmounts or page unloads
            document.body.style.backgroundColor = BG_LIGHT_COLOR; 
        };
    }, [serveRef]); 

    return (
        <section ref={sectionRefs.weServe} id="weServe" className={`py-28 bg-white transition-opacity duration-1000`} >
            <div 
                className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-opacity duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            >
                <h2 className={`text-5xl font-extrabold text-[${DARK_TEXT_COLOR}] mb-6 text-center tracking-tighter flex items-center justify-center`}>
                    <Globe size={48} className={`mr-4 text-[${ACCENT_COLOR}]`} />
                    Serving Key African Markets
                </h2>
                <p className="text-xl text-gray-600 max-w-4xl mx-auto text-center mb-16">
                    We specialize in secure and timely vehicle export to a growing list of dynamic markets across Southern and Eastern Africa. Hover over the map or list to see details.
                </p>

                <div className="grid md:grid-cols-2 gap-12 items-center">
                    {/* Left: Interactive Map */}
                    <div className="h-96 md:h-full aspect-[4/5] mx-auto w-full max-w-lg">
                       <AfricaMap 
                           countries={SERVICE_COUNTRIES} 
                           hoveredCountry={hoveredCountry} 
                           setHoveredCountry={setHoveredCountry} 
                       />
                    </div>

                    {/* Right: Country List */}
                    <div>
                        <h3 className={`text-3xl font-bold text-[${DARK_TEXT_COLOR}] mb-6`}>Our Primary Destinations:</h3>
                        <ul className="grid grid-cols-2 gap-x-6 gap-y-4 text-lg">
                            {SERVICE_COUNTRIES.map((country) => (
                                <li 
                                    key={country.name} 
                                    className={`flex items-center text-gray-700 font-medium transition-colors duration-200 cursor-pointer ${
                                        hoveredCountry === country.name ? `text-[${ACCENT_COLOR}] font-bold transform translate-x-1` : ''
                                    }`}
                                    onMouseEnter={() => setHoveredCountry(country.name)}
                                    onMouseLeave={() => setHoveredCountry(null)}
                                >
                                    <CheckCircle size={20} className={`mr-3 ${hoveredCountry === country.name ? `text-[${ACCENT_COLOR}]` : 'text-gray-400'} flex-shrink-0 transition-colors duration-200`} />
                                    {country.name}
                                </li>
                            ))}
                        </ul>
                        <button
                            onClick={() => scrollToSection('contact')}
                            className={`mt-10 px-8 py-3 text-lg font-semibold text-white bg-[${ACCENT_COLOR}] rounded-xl shadow-lg hover:bg-opacity-90 transition-all duration-300 focus:ring-4 focus:ring-red-400`}
                        >
                            Get Shipping Quote to Your Country
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WeServeSection;