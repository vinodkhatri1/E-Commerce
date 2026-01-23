import { Truck } from "lucide-react";

const RulesCard = ({ icon, title, description, index }) => {
  const IconComponent = icon || Truck;

  return (
    <div
      key={index}
      className="w-full bg-orange-50/50 border border-orange-100 rounded-lg p-4 flex items-center gap-4 hover:shadow-md transition-shadow"
    >
      <div className="bg-white p-3 rounded-full text-orange-500 shadow-sm">
        <IconComponent size={24} />
      </div>
      <div>
        <h1 className="text-lg font-bold text-gray-800">{title}</h1>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  );
};

export default RulesCard;
