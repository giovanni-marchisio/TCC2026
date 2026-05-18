import { CategoryRepository } from "../modules/category/category.repository";

export async function categoryExist({id, name} = {}){
    if (id){
        const category = await CategoryRepository.findById(id);

        return !!category;
    };

    if (name){
        const category = await CategoryRepository.findByName(name);

        return !!category;
    };

    return false;
};