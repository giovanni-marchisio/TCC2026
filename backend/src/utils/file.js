import { extname } from "node:path";
import { randomUUID } from "node:crypto";
import { rename, unlink } from "node:fs/promises";
import { createWriteStream } from "node:fs";
import { pipeline } from "node:stream/promises";

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
// Talvez eu tire essa função aqui... 
// fiz ela antes de pensar em como tudo iria funcionar (ainda estou pensando como resolver tudo)
export async function uploadFile(file, fileName, filePath){
    const ext = extname(fileName);
    const upload = randomUUID() + ext;
    const fullPath = filePath + upload;

    if (!allowedExtensions.includes(ext)) throw new ValidationError("Formato de imagem inválido!");

    await pipeline(file, createWriteStream(fullPath));

    return {
        image: upload
    };
};

export async function uploadTemp(file, fileName){
    const ext = extname(fileName);
    const tempName = randomUUID() + ext;
    const fullPath = `${process.env.TEMP_FOLDER}${tempName}`;

    if (!allowedExtensions.includes(ext)) throw new ValidationError("Formato de imagem inválido!");

    await pipeline(file, createWriteStream(fullPath));

    return {
        tempName,
        filePath: fullPath
    };
};