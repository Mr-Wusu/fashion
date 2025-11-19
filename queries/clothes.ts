import Clothe from "@/model/cloth-model";
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

export async function storeCloth(
  clothInput: ICloth
) {
  const {altTag, price, description, image} = clothInput;

  try {
    // Check if cloth with altTag already exists
    const tagExists = await Clothe.findOne({ altTag });
    if(tagExists) {
      return {
        success: false,
        error: "altTag already exists"
      }
    }

    const newCloth = await Clothe.create({
      altTag,
      price,
      description,
      image,
    });
    revalidatePath("/");
    return {
      success: true,
      message: "User created successfully",
      clothId: newCloth._id.toString(),
    };
  } catch(err) {
    throw new Error(`Failed to store cloth: ${err}` )
  }
}

export async function editClothDB(editInput: IEditCloth) {
  const { clothId, altTag, price, description, image } = editInput;

  try {
    // Find the existing cloth
    const existingCloth = await Clothe.findById(clothId);

    if (!existingCloth) {
      return {
        success: false,
        error: "Cloth not found",
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

    // Prepare update object with only provided fields
    const updateData: Partial<ICloth> = {};
    if (altTag !== undefined) updateData.altTag = altTag;
    if (price !== undefined) updateData.price = price;
    if (description !== undefined) updateData.description = description;
    if (image !== undefined) updateData.image = image;

    // Update the cloth
    const updatedCloth = await Clothe.findByIdAndUpdate(clothId, updateData, {
      new: true,
      runValidators: true,
    });

    revalidatePath("/");

    return {
      success: true,
      message: "Cloth updated successfully",
      cloth: updatedCloth,
      previousImageUrl: existingCloth.image,
    };
  } catch (err) {
    throw new Error(`Failed to edit cloth: ${err}`);
  }
}

export async function getClothById(clothId: string) {
  try {
    const cloth = await Clothe.findById(clothId);
    if (!cloth) {
      return {
        success: false,
        error: "Cloth not found",
      };
    }
    return {
      success: true,
      cloth: cloth,
    };
  } catch (err) {
    throw new Error(`Failed to get cloth: ${err}`);
  }
}