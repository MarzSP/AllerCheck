import {describe, it, expect, beforeEach, vi} from 'vitest';
import {MenuService} from '../../services/menuService';
import {NotFoundError} from '../../utils/errors';

// What service expects from repo
type Repo = {
    getMenusByUserId: ReturnType<typeof vi.fn>;
    getMenuById: ReturnType<typeof vi.fn>;
    create: ReturnType<typeof vi.fn>;
    update: ReturnType<typeof vi.fn>;
    delete: ReturnType<typeof vi.fn>;
};

let repo: Repo;
let service: MenuService;

beforeEach(() => {
    repo = {
        getMenusByUserId: vi.fn(),
        getMenuById: vi.fn(),
        create: vi.fn(),
        update: vi.fn(),
        delete: vi.fn(),
    };
    // inject fake repo
    service = new MenuService(repo as any);
});

describe('MenuService unittest', () => {
    it('getMenusForUser: validates ID and returns rows', async () => {
        const rows = [
            {
                menuId: 1,
                userId: 42,
                name: 'Weekly',
                description: 'Notes',
                isActive: true,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ];
        repo.getMenusByUserId.mockResolvedValueOnce(rows);

        const res = await service.getMenusForUser(42);

        expect(repo.getMenusByUserId).toHaveBeenCalledWith(42);
        expect(res).toEqual(rows);
    });

    it('getMenusForUser: throws on invalid userId (via ensureId)', async () => {
        await expect(service.getMenusForUser(0)).rejects.toThrow(); // your ensureId should throw for non-positive ids
        expect(repo.getMenusByUserId).not.toHaveBeenCalled();
    });

    it('getMenuById: returns row if found', async () => {
        const row = {
            menuId: 7,
            userId: 1,
            name: 'Dinners',
            description: null,
            isActive: true,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        repo.getMenuById.mockResolvedValueOnce(row);

        const res = await service.getMenuById(7);

        expect(repo.getMenuById).toHaveBeenCalledWith(7);
        expect(res).toEqual(row);
    });

    it('getMenuById: throws NotFoundError if its missing', async () => {
        repo.getMenuById.mockResolvedValueOnce(null);
        await expect(service.getMenuById(999)).rejects.toBeInstanceOf(NotFoundError);
    });

    it('create: validates + normalizes input and calls repo.create', async () => {
        const created = {
            menuId: 10,
            userId: 1,
            name: 'Lunch',
            description: null,
            isActive: true,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        repo.create.mockResolvedValueOnce(created);

        const res = await service.create({
            userId: 1,
            name: '  Lunch  ',          // trimmed by validateName
            description: null,          // validateDescription keep null
            // isActive default is true so we can skip this one
        });

        expect(repo.create).toHaveBeenCalledWith({
            userId: 1,
            name: 'Lunch',
            description: null,
            isActive: true,
        });
        expect(res).toEqual(created);
    });

    it('update: applies validation and forwards to repo.update', async () => {
        const updated = {
            menuId: 5,
            userId: 1,
            name: 'NewName',
            description: 'changed',
            isActive: false,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        repo.update.mockResolvedValueOnce(updated);

        const res = await service.update(5, {
            name: '  NewName  ',       // validateName trims
            description: 'changed',    // validateDescription passes string
            isActive: false,
        });

        expect(repo.update).toHaveBeenCalledWith(5, {
            name: 'NewName',
            description: 'changed',
            isActive: false,
        });
        expect(res).toEqual(updated);
    });

    it('update: throws NotFoundError when repo returns null', async () => {
        repo.update.mockResolvedValueOnce(null);
        await expect(service.update(123, {name: 'X'})).rejects.toBeInstanceOf(NotFoundError);
    });

    it('delete: checks existence then deletes', async () => {
        const existing = {
            menuId: 20,
            userId: 1,
            name: 'ToDelete',
            description: null,
            isActive: true,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        repo.getMenuById.mockResolvedValueOnce(existing);
        repo.delete.mockResolvedValueOnce(undefined);

        await service.delete(20);

        expect(repo.getMenuById).toHaveBeenCalledWith(20);
        expect(repo.delete).toHaveBeenCalledWith(20);
    });

    it('delete: throws NotFoundError if not exists', async () => {
        repo.getMenuById.mockResolvedValueOnce(null);
        await expect(service.delete(999)).rejects.toBeInstanceOf(NotFoundError);
        expect(repo.delete).not.toHaveBeenCalled();
    });
});
