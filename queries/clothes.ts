import Clothe from "@/model/cloth-model";
import { IClothes } from "@/types/types";
import { revalidatePath } from "next/cache";

interface ICloth {
  altTag: string;
  price: number;
  description: string;
  image: string;
}

interface IEditCloth {
  clothId: string;
  altTag?: string;
  price?: number;
  description?: string;
  image?: string;
}

// STORE CLOTH
export async function storeCloth(clothInput: ICloth) {
  const { altTag, price, description, image } = clothInput;

  // Check if cloth with altTag already exists
  const tagExists = await Clothe.findOne({ altTag });
  if (tagExists) {
    return {
      success: false,
      error: "altTag already exists",
    };
  }

  const newCloth = await Clothe.create({
    altTag,
    price,
    description,
    image,
  });

  if (!newCloth) {
    return {
      success: false,
      error: "Failed to store cloth details in mongodb!",
    };
  } else {
    revalidatePath("/");
    return {
      success: true,
      message: "Cloth successfully uploaded!",
    };
  }
}

// UPDATE CLOTH
export async function editClothDB(editInput: IEditCloth) {
  const { clothId, altTag, price, description, image } = editInput;

  // Find the existing cloth
  const existingCloth = await Clothe.findById(clothId);

  if (!existingCloth) {
    return {
      success: false,
      error: "Cloth does not exist in database",
    };
  }

  // If altTag is being changed, check if new altTag already exists
  if (altTag && altTag !== existingCloth.altTag) {
    const tagExists = await Clothe.findOne({ altTag });
    if (tagExists) {
      return {
        success: false,
        error: "altTag already exists",
      };
    }
  }

  const updateData: Partial<ICloth> = { altTag, price, description, image };

  // Update the cloth
  const updatedCloth = await Clothe.findByIdAndUpdate(clothId, updateData, {
    new: true,
    runValidators: true,
  });

  if (updatedCloth) {
    revalidatePath("/");
    return {
      success: true,
      message: "Cloth updated successfully",
    };
  } else {
    return {
      success: false,
      message: "Error in updating cloth",
    };
  }
}

// GET CERTAIN CLOTH
export async function getClothById(clothId: string) {
  const cloth = await Clothe.findById(clothId);
  if (!cloth) {
    return {
      success: false,
      error: "Cloth not found",
    };
  } else {
    return {
      success: true,
      cloth: {
        _id: cloth._id.toString(),
        imageUrl: cloth.image,
        altTag: cloth.altTag,
        price: cloth.price,
        description: cloth.description,
      },
    };
  }
}

// GET ALL CLOTHES
export async function getAllClothes(): Promise<IClothes[]> {
  const clothes = await Clothe.find({}).sort({ createdAt: -1 }); // Sort by newest first

  if(clothes) {
    return clothes.map((cloth) => ({
      _id: cloth._id.toString(),
      imageUrl: cloth.image,
      altTag: cloth.altTag,
      price: cloth.price,
      description: cloth.description,
    }))
  } else {
    return []
  }
}
