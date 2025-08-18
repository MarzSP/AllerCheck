import type {Menu} from "../model/Menu";

/**
 * Contract for menu-related business logic.
 */
export interface IMenuService {
    /**
     * Fetch all menus.
     * @returns Array of Menu entities
     */
    getMenus(): Promise<Menu[]>;

    /**
     * Fetch a menu by its ID.
     * @param menuId - The unique identifier of the menu
     * @returns A Menu entity or throws if not found
     */
    getMenusById(menuId: number): Promise<Menu>;
}
