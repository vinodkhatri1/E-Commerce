import RulesCard from "./RulesCard";
import { Truck, CircleDollarSign, BadgePercent, Headset } from "lucide-react";

const ContainerRules = () => {
  const rules = [
    {
      icon: Truck,
      title: "Free Delivery",
      description: "Orders from all items",
    },
    {
      icon: CircleDollarSign,
      title: "Return & Refund",
      description: "Money back guarantee",
    },
    {
      icon: BadgePercent,
      title: "Member Discount",
      description: "On order over $99",
    },
    {
      icon: Headset,
      title: "Support 24/7",
      description: "Contact us 24 hours a day",
    },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Responsive Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {rules.map((rule, index) => (
          
          <div key={index} className="w-full">
             <RulesCard
                icon={rule.icon}
                title={rule.title}
                description={rule.description}
                index={index}
              />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContainerRules;