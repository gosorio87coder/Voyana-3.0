import React, { useState } from "react";
import AccordionItem from "../components/AccordionItem";
import DatePicker from "../components/DatePicker";
import { PlaneIcon, HotelIcon, GuideIcon, TrainIcon, TicketIcon } from "../components/icons/FeatureIcons";
import { usePageTitle } from "../hooks/usePageTitle";

// ====== DATA ======
const galleryImages = [
  "https://res.cloudinary.com/dnszd7czq/image/upload/v1758720006/voyana-cusco-machu-picchu-card-3x4-v3_rxrcoo.webp",
  "https://images.unsplash.com/photo-1558005530-382465103328?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1613469144899-78b15a6b5a8d?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600115329383-a4c91b5c1c2b?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1579032391295-a131804f58c6?q=80&w=1974&auto=format&fit=crop",
];

const inclusions = [
  { icon: <PlaneIcon />, text: "Boleto aéreo Lima - Cusco - Lima" },
  { icon: <GuideIcon />, text: "Traslados aeropuerto - hotel - aeropuerto" },
  { icon: <HotelIcon />, text: "03 noches de alojamiento en Cusco" },
  { icon: <TrainIcon />, text: "Tour a Machu Picchu en tren Expedition" },
  { icon: <GuideIcon />, text: "City Tour y excursión al Valle Sagrado" },
  { icon: <TicketIcon />, text: "Boletos de ingreso a los atractivos" },
];

const itinerary = [
  {
    title: "Día 1: Arribo a Cusco y City Tour",
    content:
      "Recepción en el aeropuerto de Cusco y traslado a su hotel. Por la tarde, iniciaremos el City Tour visitando la Catedral, el Templo del Sol (Qoricancha) y los centros arqueológicos de Sacsayhuamán, Q'enqo, Puka Pukara y Tambomachay. Noche en Cusco.",
  },
  {
    title: "Día 2: El Valle Sagrado de los Incas",
    content:
      "Excursión de día completo al Valle Sagrado. Visitaremos el mercado de Pisac y su centro arqueológico. Almuerzo buffet en Urubamba. Por la tarde, Ollantaytambo. Tren a Aguas Calientes. Noche en Aguas Calientes.",
  },
  {
    title: "Día 3: La Ciudadela de Machu Picchu",
    content:
      "Muy temprano, bus a Machu Picchu. Visita guiada y tiempo libre. Tren de regreso a Ollantaytambo y bus a Cusco. Noche en Cusco.",
  },
  {
    title: "Día 4: Despedida de la Ciudad Imperial",
    content:
      "Desayuno en el hotel. A la hora coordinada, traslado al aeropuerto para su vuelo a Lima. Fin de servicios.",
  },
];

const addons = [
  { id: 1, name: "Upgrade a tren Vistadome", description: "Vistas panorámicas en tu viaje a Machu Picchu.", price: 75 },
  { id: 2, name: "Tour a Montaña de 7 Colores", description: "Excursión de día completo a Vinicunca (día extra).", price: 60 },
  { id: 3, name: "Tour a Laguna Humantay", description: "Caminata a una joya turquesa de los Andes.", price: 55 },
  { id: 4, name: "Noche Adicional en Aguas Calientes", description: "Disfruta el pueblo y las aguas termales.", price: 90 },
];

// ====== COMPONENTE ======
interface CuscoPageProps {
  onOpenQuote: () => void;
}

const CuscoPage: React.FC<CuscoPageProps> = ({ onOpenQuote }) => {
  usePageTitle("Cusco"); // título de la pestaña

  const basePrice = 399;
  const [selectedAddons, setSelectedAddons] = useState<(typeof addons)[number][]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleAddonChange = (addon: (typeof addons)[number]) => {
    setSelectedAddons((prev) =>
      prev.some((a) => a.id === addon.id) ? prev.filter((a) => a.id !== addon.id) : [...prev, addon]
    );
  };

  const handleDateSelect = (date: Date) => setSelectedDate(date);

  const totalAddonsPrice = selectedAddons.reduce((sum, a) => sum + a.price, 0);
  const totalPrice = basePrice + totalAddonsPrice;

  return (
    <div className="animate-fade-in">
      {/* HERO */}
      <section
        className="relative h-[50vh] bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://res.cloudinary.com/dnszd7czq/image/upload/v1758720006/voyana-cusco-machu-picchu-card-3x4-v3_rxrcoo.webp')",
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative container mx-auto px-6 h-full flex flex-col justify-center text-white">
          <h1 className="font-montserrat text-4xl sm:text-5xl md:text-7xl font-extrabold uppercase">Cusco Mágico</h1>
          <p className="text-xl md:text-2xl mt-2 font-light">El ombligo del mundo y sus maravillas te esperan.</p>
        </div>
      </section>

      {/* GALERÍA */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-8">Galería del Imperio Inca</h2>
          <div className="flex overflow-x-auto space-x-4 pb-4">
            {galleryImages.map((src, i) => (
              <img key={i} src={src} alt={`Cusco ${i + 1}`} className="w-80 h-60 object-cover rounded-lg shadow-md flex-shrink-0" />
            ))}
          </div>
        </div>
      </section>

      {/* CONTENIDO + SIDEBAR */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            {/* INCLUYE */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6 border-l-4 border-[#1856C5] pl-4">¿Qué incluye tu aventura andina?</h2>
              <div className="grid sm:grid-cols-2 gap-6">
                {inclusions.map((item, i) => (
                  <div key={i} className="flex items-center bg-blue-50/50 p-4 rounded-lg">
                    {React.cloneElement(item.icon as any, { className: "h-8 w-8 text-[#1856C5] flex-shrink-0" })}
                    <span className="ml-4 text-gray-700">{item.text}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* ITINERARIO */}
            <section>
              <h2 className="text-3xl font-bold mb-6 border-l-4 border-[#1856C5] pl-4">Itinerario Detallado</h2>
              <div className="space-y-4">
                {itinerary.map((item, i) => (
                  <AccordionItem key={i} title={item.title} content={item.content} />
                ))}
              </div>
            </section>
          </div>

          {/* SIDEBAR */}
          <aside>
            <div className="sticky top-28 space-y-8">
              <DatePicker
                selectedDate={selectedDate}
                onDateSelect={handleDateSelect}
                selectableDays={[0, 1, 2, 3, 4, 5, 6]}
                minDaysFromToday={7}
              />

              <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <h3 className="text-xl font-bold mb-4">Mejora Tu Viaje</h3>
                <div className="space-y-4">
                  {addons.map((addon) => (
                    <div key={addon.id} className="flex items-center justify-between">
                      <div>
                        <label htmlFor={`addon-cu-${addon.id}`} className="font-semibold text-gray-800">
                          {addon.name}
                        </label>
                        <p className="text-sm text-gray-500">{addon.description}</p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="font-bold text-[#0D2B5B]">${addon.price}</span>
                        <input
                          type="checkbox"
                          id={`addon-cu-${addon.id}`}
                          checked={selectedAddons.some((a) => a.id === addon.id)}
                          onChange={() => handleAddonChange(addon)}
                          className="w-5 h-5 text-[#1856C5] bg-gray-100 border-gray-300 rounded focus:ring-[#1856C5] cursor-pointer"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* BARRA DE PRECIO / CTA */}
      <div className="sticky bottom-0 bg-white shadow-[0_-4px_12px_rgba(0,0,0,0.08)] p-4 z-40">
        <div className="container mx-auto px-6 flex flex-col sm:flex-row justify-between items-center">
          <div className="text-center sm:text-left mb-4 sm:mb-0">
            <p className="text-sm text-gray-600">Precio por persona desde</p>
            <p className="text-3xl font-extrabold text-[#0D2B5B]">US$ {totalPrice.toLocaleString("en-US")}</p>
            {selectedAddons.length > 0 && (
              <p className="text-xs text-green-600 font-semibold">+ ${totalAddonsPrice} en adicionales</p>
            )}
          </div>
          <button
            onClick={onOpenQuote}
            className="bg-[#FBBF24] text-[#0D2B5B] w-full sm:w-auto font-bold py-4 px-10 rounded-lg hover:bg-amber-300 transition-colors duration-300 text-lg shadow-md disabled:bg-gray-300 disabled:cursor-not-allowed"
            disabled={!selectedDate}
          >
            Pre-Reservar Ahora
          </button>
        </div>
      </div>
    </div>
  );
};

export default CuscoPage;
