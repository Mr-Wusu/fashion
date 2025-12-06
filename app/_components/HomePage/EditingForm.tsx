import { Button } from "../Miscellaneous/Button";
import { IoClose } from "react-icons/io5";

interface EditingFormProps {
  setIsEditing: (isEditing: boolean) => void;
}

export default function EditingForm({ setIsEditing }: EditingFormProps) {
  return (
    <form className="pt-9 absolute inset-0 bg-white/85 z-40 p-4 flex top-0  flex-col h-full w-full gap-6">
      <IoClose
        className="h-6 w-6 bg-rose-700 hover:bg-rose-600 transition-colors duration-200 text-lightRose2  rounded-full absolute right-1 top-1 cursor-pointer"
        onClick={() => setIsEditing(false)}
      />
      <input type="file" name="image" accept="image/*" />
      <textarea
        className="flex-grow bg-white border-2 rounded px-2 w-full border-rose-500 focus:outline-none"
        placeholder="Description"
        name="description"
        // defaultValue={cloth.description}
      />
      <input
        className="h-9 bg-white border-2 rounded px-2 w-full border-rose-500 focus:outline-none"
        type="text"
        name="price"
        placeholder="Set price. Numbers only"
      />
      <input
        className="h-9 bg-white border-2 rounded px-2 w-full border-rose-500 focus:outline-none"
        placeholder="Enter a tag for the cloth"
      />
      <Button className="py-2 px-2.5" type="submit">
        Update cloth
      </Button>
    </form>
  );
}
