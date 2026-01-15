import { icons, Truck } from 'lucide-react';
const RulesCard = ({icon, title, description, index}) => {
    const Icons = icon;
    return (
        <div key={index} className="h-25 w-3xl bg-amber-300 flex items-center px-5">
            <Icons className="m-2" size={40} />
            <div>
                <h1 className='text-xl'>{title}</h1>
                <p>{description}</p>
            </div>
        </div>
    )
}

export default RulesCard