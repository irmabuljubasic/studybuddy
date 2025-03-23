import { useEffect, useState } from "react";
import axios from "axios";

function Offers() {
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const res = await axios.get("http://localhost:5000/offers");
        setOffers(res.data);
      } catch (error) {
        console.error("Fehler beim Laden der Angebote", error);
      }
    };

    fetchOffers();
  }, []);

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-center">📚 Nachhilfe-Angebote</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {offers.map((offer) => (
          <div key={offer._id} className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">{offer.title}</h2>
            <p className="text-gray-600">{offer.description}</p>
            <p className="mt-2 text-blue-600">📖 Fach: {offer.subject}</p>
            <p className="mt-2 font-bold">💰 {offer.price} € / Stunde</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Offers;
