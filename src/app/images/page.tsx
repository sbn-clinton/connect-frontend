import axios from "axios";
import Image from "next/image";

const ImagePage = async () => {
  const images = await axios.get("http://localhost:5000/files", {
    withCredentials: true,
  });
  if (images.data) {
    console.log("Images fetched successfully");
  }
  return (
    <div className="flex flex-col items-center py-20">
      <div className="grid md:grid-cols-2 gap-4 items-center justify-center">
        {images.data.map((img: any) => (
          <div key={img._id}>
            <Image
              src={`http://localhost:5000/files/${img._id}`}
              alt={img.name}
              className="w-full h-auto rounded shadow"
              width={300}
              height={300}
            />
            <p>{img.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImagePage;
