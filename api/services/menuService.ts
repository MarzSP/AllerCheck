import {ensureId, validateName, validateDescription} from "../utils/validation";
import type {CreateMenuDTO, UpdateMenuDTO} from "../types/DTO/MenuDTO";
import type {Menu} from "../types/Menu";
import {MenuRepository, menuRepository} from "../repositories/menuRepository";
import {NotFoundError} from "../utils/errors";

/**
 * Service that handles menu-related operations.
 * This service interacts with the MenuRepository
 */
export class MenuService {
    constructor(private readonly repo: MenuRepository = menuRepository) {
    }

    async getMenusForUser(userId: number): Promise<Menu[]> {
        ensureId(userId, "userId");
        return this.repo.getMenusByUserId(userId);
    }

    async getMenuById(menuId: number): Promise<Menu> {
        ensureId(menuId, "menuId");
        const menu = await this.repo.getMenuById(menuId);
        if (!menu) throw new NotFoundError("Menu not found");
        return menu;
    }

    async create(data: CreateMenuDTO): Promise<Menu> {
        ensureId(data.userId, "userId");
        const name = validateName(data.name);
        const description = validateDescription(data.description);

        return this.repo.create({
            userId: data.userId,
            name,
            description,
            isActive: data.isActive ?? true,
        });
    }

    async update(menuId: number, patch: UpdateMenuDTO): Promise<Menu> {
        ensureId(menuId, "menuId");

        const name =
            patch.name !== undefined ? validateName(patch.name) : undefined;
        const description =
            patch.description !== undefined ? validateDescription(patch.description) : undefined;

        const updated = await this.repo.update(menuId, {
            name,
            description,
            isActive: patch.isActive,
        });

        if (!updated) throw new NotFoundError("Menu not found");
        return updated;
    }

    async delete(menuId: number): Promise<void> {
        ensureId(menuId, "menuId");
        const existing = await this.repo.getMenuById(menuId);
        if (!existing) throw new NotFoundError("Menu not found");
        await this.repo.delete(menuId);
    }
}

export const menuService = new MenuService();