<script lang="ts">
    export let data: { menus: Array<{ menuId: number; name: string; description?: string; isActive: boolean }> };
</script>

<h1 class="text-2xl font-bold mb-4">Menus</h1>

{#if data.menus.length === 0}
    <p>No menus yet.</p>
{:else}
    <ul class="space-y-2">
        {#each data.menus as m}
            <li class="p-3 rounded border">
                <div class="font-semibold">{m.name}</div>
                {#if m.description}
                    <div class="text-sm opacity-80">{m.description}</div>
                {/if}
                <div class="text-xs mt-1">{m.isActive ? 'Active' : 'Inactive'}</div>
            </li>
        {/each}
    </ul>
{/if}
