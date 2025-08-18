import type {Menu} from "../model/Menu";
import {menuRepository, MenuRepository} from "../repositories/menuRepository";

/**
 * Service that handles menu-related operations.
 * This service interacts with the MenuRepository
 */
export class MenuService {
    constructor(private readonly repo: MenuRepository = menuRepository) {
    }

    async getMenus() {
        return this.repo.getMenu();
    }

    async getMenusById(menuId: number) {
        if (!Number.isInteger(menuId) || menuId <= 0) throw new Error("Invalid menu ID");
        const menu = await this.repo.getMenuById(menuId);
        if (!menu) throw new Error("Menu not found");
        return menu;
    }

    /*
    async create(data: CreateMenuDTO): Promise<Menu> {
        this.ensureId(data.userId, "userId");
        this.validateName(data.name);
        this.validateDescription(data.description);
        return this.repo.create({
            userId: data.userId,
            name: data.name,
            description: data.description ?? null,
            isActive: data.isActive ?? true,
        });
    }

    async update(menuId: number, patch: UpdateMenuDTO): Promise<Menu> {
        this.ensureId(menuId, "menuId");
        if (patch.name !== undefined) this.validateName(patch.name);
        if (patch.description !== undefined) this.validateDescription(patch.description);

        const updated = await this.repo.update(menuId, patch);
        if (!updated) throw new Error("Menu not found");
        return updated;
    }

    async delete(menuId: number): Promise<void> {
        this.ensureId(menuId, "menuId");
        await this.repo.delete(menuId);
    }

    async setActive(menuId: number, isActive: boolean): Promise<Menu> {
        this.ensureId(menuId, "menuId");
        const updated = await this.repo.update(menuId, { isActive });
        if (!updated) throw new Error("Menu not found");
        return updated;
    }

    // ---- helpers ----
    private ensureId(n: number, label: string) {
        if (!Number.isInteger(n) || n <= 0) throw new Error(`Invalid ${label}`);
    }
    private validateName(name?: string) {
        if (name === undefined) return;
        const trimmed = name.trim();
        if (!trimmed) throw new Error("Name is required");
        if (trimmed.length > 100) throw new Error("Name must be ≤ 100 chars");
    }
    private validateDescription(desc?: string | null) {
        if (desc == null) return;
        if (desc.length > 255) throw new Error("Description must be ≤ 255 chars");
    }*/
}

export const menuService = new MenuService();
