import type {Menu} from "../model/Menu";

/**
 * Interface for Menu.ts Repository
 * Provides database operations for retrieving and storing menus.
 */
export interface IMenuRepository {
    /**
     * Fetch all menus from the database.
     * @returns A promise that resolves to an array of menu objects.
     */
    getMenu(): Promise<Menu[]>;

    /**
     * Fetch a menu by its ID.
     * Returns null if no menu is found with the given ID.
     * @param menuId
     */
    getMenuById(menuId: number): Promise<Menu | null>;
}
