import { ProductRepository } from "../modules/product/product.repository";
import { categoryExist } from "./category";
import { 
    ValidationError,
    ConflictError,
    NotFoundError
} from "./errors";

export async function validateProduct(data){

    if (!data) throw new NotFoundError;

    const {
        name,
        price,
        stock,
        category,
    } = data;

    if (!name || name.trim() === "") throw new ValidationError("Nome do produto é obrigatório!");
    if (!price || price <= 0) throw new ValidationError("Preço inválido!");
    if (stock < 0) throw new ValidationError("Quantidade inválida no estoque");
    if (!category) throw new ValidationError("Categoria é obrigatória!");
    
    if (await productExist({ name: name })) throw new ConflictError("Produto já registrado!");
    if (!await categoryExist({ id: category })) throw new NotFoundError("Categoria não existe!");
    
    return true;
};

export async function productExist({id, name} = {}){
    if (id){
        const product = await ProductRepository.findById(id);

        return !!product;
    };

    if (name){
        const product = await ProductRepository.findByName(name);

        return !!product;
    };

    return false;
};