export default function ListItem({
  icon: Icon,
  text,
  active = false,
  onClick,
}: {
  icon: React.ElementType;
  text: string;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-3 px-4 py-2 rounded-xl transition cursor-pointer select-none
        ${
          active
            ? "bg-black text-white font-medium"
            : "text-gray-700 hover:bg-gray-100"
        }
      `}
    >
      <Icon className="w-5 h-5" strokeWidth={2} />
      <span>{text}</span>
    </div>
  );
}
