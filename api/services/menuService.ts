// src/services/MenuService.ts
import type {IMenuService} from "./iMenuService";
import type {IMenuRepository} from "../repositories/iMenuRepository";
import type {Menu} from "../model/Menu";

/**
 * Handles menu-related operations.
 */
export class MenuService implements IMenuService {
    constructor(private repo: IMenuRepository) {
    }

    async getMenus(): Promise<Menu[]> {
        console.log("Service: getMenus called");
        return this.repo.getMenu();
    }

    async getMenusById(menuId: number): Promise<Menu> {
        if (isNaN(menuId)) {
            throw new Error("Invalid menu ID");
        }

        const menu = await this.repo.getMenuById(menuId);
        if (!menu) {
            throw new Error("Menu not found");
        }
        return menu;
    }
}
