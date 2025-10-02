import React, { useState } from 'react';
import AccordionItem from '../components/AccordionItem';
import DatePicker from '../components/DatePicker';
import { PlaneIcon, HotelIcon, FoodIcon, GuideIcon, BriefcaseIcon } from '../components/icons/FeatureIcons';

const galleryImages = [
    'https://res.cloudinary.com/dnszd7czq/image/upload/v1758723079/paquete-todo-incluido-decameron-punta-sal-voyana_i6y8l5.webp',
    'https://res.cloudinary.com/dnszd7czq/image/upload/v1758734015/resort-decameron-voyanaamigos-piscina-cocteles_urhklo.webp',
    'https://res.cloudinary.com/dnszd7czq/image/upload/v1758731259/decameron-punta-sal-frutas-hamburguesa-16x9_nafb56.webp',
    'https://res.cloudinary.com/dnszd7czq/image/upload/v1758732925/habitacion-decameron-punta-sal-voyana_vsldnc.webp',
    'https://res.cloudinary.com/dnszd7czq/image/upload/v1758731258/decameron-punta-sal-carne-postre-16x9_l7ocyp.webp',
];

const inclusions = [
    { icon: <PlaneIcon />, text: 'Boleto aéreo Lima - Talara - Lima' },
    { icon: <BriefcaseIcon />, text: 'Equipaje: Mochila + Carry On por persona' },
    { icon: <GuideIcon />, text: 'Traslados compartidos aeropuerto - hotel - aeropuerto' },
    { icon: <HotelIcon />, text: '03 noches de alojamiento en Hotel Royal Decameron Punta Sal' },
    { icon: <FoodIcon />, text: 'Sistema todo incluido: desayunos, almuerzos y cenas tipo buffet' },
];

const itinerary = [
    { title: 'Día 1: Bienvenida a Punta Sal', content: 'Recojo en el aeropuerto de Talara con un letrero con el nombre del pasajero principal. Traslado directo al hotel Royal Decameron. Día libre para disfrutar de las instalaciones y la playa. Cena buffet y show nocturno.' },
    { title: 'Día 2: Relax y Sol en el Resort', content: 'Desayuno buffet. Disfruta de las instalaciones del hotel que incluyen 5 piscinas, gimnasio y acceso directo a la playa. Almuerzo y snacks durante el día. Por la noche, la cena es en restaurantes de especialidades (previa reserva) y luego puedes unirte al karaoke o shows en vivo.' },
    { title: 'Día 3: Aventura y Diversión', content: 'Desayuno buffet. Día libre para relajarte o tomar una de nuestras excursiones adicionales. Disfruta de las bebidas ilimitadas en los diferentes bares del resort, participa en las actividades de animación o simplemente descansa en la playa. Cena buffet y noche de discoteca.' },
    { title: 'Día 4: Despedida con Sabor', content: 'Desayuno buffet. Mañana libre para un último chapuzón. El check-out de la habitación es a las 12:00 p.m. Podrás disfrutar del almuerzo buffet y las instalaciones hasta las 3:00 p.m., hora programada para el traslado de salida hacia el aeropuerto de Talara.' },
];

const addons = [
    { id: 1, name: 'Maleta de bodega (23kg)', description: 'Añade equipaje documentado a tu vuelo.', price: 50 },
    { id: 2, name: 'Traslado Privado', description: 'Servicio exclusivo aeropuerto-hotel-aeropuerto.', price: 60 },
    { id: 3, name: 'Almuerzo Turístico Día 1', description: 'Disfruta de la gastronomía local antes del check-in.', price: 25 },
    { id: 4, name: 'Pulsera de Upgrade', description: 'Acceso a bebidas premium y zonas exclusivas.', price: 90 },
    { id: 5, name: 'Excursión Avistamiento de Ballenas', description: 'Temporada de Julio a Octubre.', price: 80 },
    { id: 6, name: 'Nado con tortugas en El Ñuro', description: 'Una experiencia inolvidable.', price: 55 },
];

interface PuntaSalPageProps {
  onOpenQuote: () => void;
}

const PuntaSalPage: React.FC<PuntaSalPageProps> = ({ onOpenQuote }) => {
    const basePrice = 499;
    const [selectedAddons, setSelectedAddons] = useState<typeof addons[0][]>([]);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    const handleAddonChange = (addon: typeof addons[0]) => {
        setSelectedAddons(prev =>
            prev.some(a => a.id === addon.id)
                ? prev.filter(a => a.id !== addon.id)
                : [...prev, addon]
        );
    };

    const handleDateSelect = (date: Date) => {
        setSelectedDate(date);
    };

    const totalAddonsPrice = selectedAddons.reduce((sum, addon) => sum + addon.price, 0);
    const totalPrice = basePrice + totalAddonsPrice;

    return (
        <div className="animate-fade-in">
            {/* Hero Section */}
            <section className="relative h-[50vh] bg-cover bg-center" style={{ backgroundImage: "url('https://res.cloudinary.com/dnszd7czq/image/upload/v1758723079/paquete-todo-incluido-decameron-punta-sal-voyana_i6y8l5.webp')" }}>
                <div className="absolute inset-0 bg-black/40"></div>
                <div className="relative container mx-auto px-6 h-full flex flex-col justify-center text-white">
                    <h1 className="font-montserrat text-4xl sm:text-5xl md:text-7xl font-extrabold uppercase">Decameron Punta Sal</h1>
                    <p className="text-xl md:text-2xl mt-2 font-light">La experiencia todo incluido que mereces.</p>
                </div>
            </section>

            {/* Gallery */}
            <section className="py-12 bg-gray-50">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl font-bold text-center mb-8">Galería de Destinos</h2>
                    <div className="flex overflow-x-auto space-x-4 pb-4">
                        {galleryImages.map((src, index) => (
                            <img key={index} src={src} alt={`Punta Sal view ${index + 1}`} className="w-80 h-60 object-cover rounded-lg shadow-md flex-shrink-0" />
                        ))}
                    </div>
                </div>
            </section>
            
            <div className="container mx-auto px-6 py-12">
                <div className="grid lg:grid-cols-3 gap-12">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        {/* Inclusions */}
                        <section className="mb-12">
                            <h2 className="text-3xl font-bold mb-6 border-l-4 border-[#1856C5] pl-4">¿Qué incluye tu paquete?</h2>
                            <div className="grid sm:grid-cols-2 gap-6">
                                {inclusions.map((item, index) => (
                                    <div key={index} className="flex items-center bg-blue-50/50 p-4 rounded-lg">
                                        {React.cloneElement(item.icon, { className: 'h-8 w-8 text-[#1856C5] flex-shrink-0' })}
                                        <span className="ml-4 text-gray-700">{item.text}</span>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Itinerary */}
                        <section>
                            <h2 className="text-3xl font-bold mb-6 border-l-4 border-[#1856C5] pl-4">Itinerario Día a Día</h2>
                            <div className="space-y-4">
                                {itinerary.map((item, index) => (
                                    <AccordionItem key={index} title={item.title} content={item.content} />
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Sidebar */}
                    <aside>
                        <div className="sticky top-28 space-y-8">
                            {/* Departure Dates */}
                             <DatePicker selectedDate={selectedDate} onDateSelect={handleDateSelect} minDaysFromToday={7} />

                            {/* Addons */}
                            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                                <h3 className="text-xl font-bold mb-4">Personaliza tu Experiencia</h3>
                                <div className="space-y-4">
                                    {addons.map(addon => (
                                        <div key={addon.id} className="flex items-center justify-between">
                                            <div>
                                                <label htmlFor={`addon-${addon.id}`} className="font-semibold text-gray-800">{addon.name}</label>
                                                <p className="text-sm text-gray-500">{addon.description}</p>
                                            </div>
                                            <div className="flex items-center space-x-3">
                                                <span className="font-bold text-[#0D2B5B]">${addon.price}</span>
                                                <input
                                                  type="checkbox"
                                                  id={`addon-${addon.id}`}
                                                  checked={selectedAddons.some(a => a.id === addon.id)}
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

            {/* Sticky Booking Bar */}
            <div className="sticky bottom-0 bg-white shadow-[0_-4px_12px_rgba(0,0,0,0.08)] p-4 z-40">
                <div className="container mx-auto px-6 flex flex-col sm:flex-row justify-between items-center">
                    <div className="text-center sm:text-left mb-4 sm:mb-0">
                        <p className="text-sm text-gray-600">Precio por persona desde</p>
                        <p className="text-3xl font-extrabold text-[#0D2B5B]">US$ {totalPrice.toLocaleString('en-US')}</p>
                        {selectedAddons.length > 0 && (
                            <p className="text-xs text-green-600 font-semibold">+ ${totalAddonsPrice} en adicionales</p>
                        )}
                    </div>
                    <button
                        onClick={onOpenQuote}
                        className="bg-[#facc15] text-[#0D2B5B] w-full sm:w-auto font-bold py-4 px-10 rounded-lg hover:bg-[#eab308] transition-colors duration-300 text-lg disabled:bg-gray-300 disabled:cursor-not-allowed"
                        disabled={!selectedDate}
                    >
                        Pre-Reservar Ahora
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PuntaSalPage;