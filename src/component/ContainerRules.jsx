import RulesCard from "./RulesCard"
import { Truck, CircleDollarSign, BadgePercent, Headset } from 'lucide-react';
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
        }
    ];
    return (
        <div className="m-4 flex gap-1">
            {rules.map((rule, index) =>(

                    <RulesCard key={index} icon={rule.icon} title={rule.title} description={rule.description} index={index} />

            ))}
        </div>
    )
}

export default ContainerRules

