import sharp from "sharp";
import { extname } from "node:path";
import { randomUUID } from "node:crypto";
import { rename, unlink } from "node:fs/promises";
import { createWriteStream } from "node:fs";

const allowedExtensions = [".jpg", ".jpeg", ".png", ".webp"];

export async function moveFile(oldPath, NewPath, fileName){
    const fullPath = NewPath + fileName;
    await rename(oldPath, fullPath);

    return {
        image: fileName,
        path: fullPath
    }
};

export async function deleteFile(filePath){
    unlink(filePath, (error) => {
        if (error) throw new Error("Não foi possível deletar o arquivo: ", filePath);
        console.log("Arquivo deletado.")
    });
};

export async function uploadTemp(file, fileName){
    const ext = extname(fileName);
    const tempName = randomUUID();
    const fullPath = `${process.env.TEMP_FOLDER}`;
    const imageName = {
        large: `${tempName}-large${ext}`,
        medium: `${tempName}-medium${ext}`,
        thumb: `${tempName}-thumb${ext}`
    };
    const imagePath = {
        large: `${fullPath}${tempName}-large${ext}`,
        medium: `${fullPath}${tempName}-medium${ext}`,
        thumb: `${fullPath}${tempName}-thumb${ext}`
    };

    if (!allowedExtensions.includes(ext)) throw new ValidationError("Formato de imagem inválido!");

    const parts = [];
    for await (const part of file){
        parts.push(part);
    };

    const buffer = Buffer.concat(parts);

    await sharp(buffer)
        .resize(800, 800, { fit: "inside" })
        .toFile(imagePath.large);

    await sharp(buffer)
        .resize(400, 400, { fit: "inside" })
        .toFile(imagePath.medium);

    await sharp(buffer)
        .resize(100, 100, { fit: "inside" })
        .toFile(imagePath.thumb);

    return {
        imageName,
        imagePath
    };
};
