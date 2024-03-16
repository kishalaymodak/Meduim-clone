function Avatar({
  name,
  size = "small" || "big",
}: {
  name: string;
  size?: string;
}) {
  return (
    <div
      className={`relative inline-flex items-center p-2 justify-center ${
        size == "small" ? "w-6 h-6" : "w-8 h-8"
      } h-${size} overflow-hidden bg-gray-700 rounded-full `}
    >
      <span
        className={` font-normal ${
          size == "small" ? "text-base" : "text-lg"
        } text-white`}
      >
        {name[0]}
      </span>
    </div>
  );
}

export default Avatar;
