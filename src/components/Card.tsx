export function Card({ time, title, description, image }: { time: string, title: string, description: string, image: string}) {
    return <div className="rounded-xl flex flex-col p-4 px-6 pt-6 bg-cmsn-black-lighter shadow-lg shadow-black">
        <span className="font-bold text-cmsn-white text-xl">{title}</span>
        <span className="text-cmsn-gray text-lg mb-4">{time}</span>
        <img src={image} className="rounded-xl" />
        <p className="text-lg text-cmsn-gray mt-4">{description}</p>
    </div>
}