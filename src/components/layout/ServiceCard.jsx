const ServiceCard = ({ image, title }) => (
  <div className="relative rounded-2xl overflow-hidden group cursor-pointer shadow-sm">
    <img
      src={image}
      alt={title}
      className="w-full h-64 object-cover group-hover:scale-105 transition duration-300"
    />
    <div className="absolute inset-0 bg-black/40 flex items-end p-6">
      <h3 className="text-white text-xl font-semibold">{title}</h3>
    </div>
  </div>
);

export default ServiceCard;
