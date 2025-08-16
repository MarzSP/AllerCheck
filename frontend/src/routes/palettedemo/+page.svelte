<script lang="ts">
    import {onMount} from "svelte";
    import {browser} from "\$app/environment";

    type Palette = {
        primary: string;
        accent: string;
        surface: string;
        bg: string;
        text: string;
        border: string;
    };

    const palettes = {
        "Safe & Fresh": {
            primary: "#2d774a",
            accent: "#73C677",
            surface: "rgba(255,255,255,0.63)",
            bg: "#f6f8fb",
            text: "#0f172a",
            border: "rgba(15,23,42,0.08)"
        },
        "Natural & Earthy": {
            primary: "#402e22",
            accent: "#d0a960",
            surface: "rgba(251,251,190,0.7)",
            bg: "#f3dfab",
            text: "#1b120f",
            border: "rgba(43,33,23,0.12)"
        },
        "Minimal & Professional": {
            primary: "#1e2d71",
            accent: "#520ea5",
            surface: "rgba(255,255,255,0.7)",
            bg: "#f8fafc",
            text: "#0b1220",
            border: "rgba(11,18,32,0.08)"
        }
    } as const;

    type Theme = keyof typeof palettes;
    //let theme: Theme = "Natural & Earthy";
    //let theme: Theme = "Safe & Fresh";
    let theme: Theme = "Minimal & Professional";

    function applyTheme(name: Theme) {
        if (!browser) return;
        const p: Palette = palettes[name];
        const root = document.documentElement;
        root.style.setProperty("--c-primary", p.primary);
        root.style.setProperty("--c-accent", p.accent);
        root.style.setProperty("--c-surface", p.surface);
        root.style.setProperty("--c-bg", p.bg);
        root.style.setProperty("--c-text", p.text);
        root.style.setProperty("--c-border", p.border);
    }

    function handleThemeChange(e: Event) {
        theme = (e.target as HTMLSelectElement).value as Theme;
        applyTheme(theme);
    }

    onMount(() => {
        applyTheme(theme);
    });

    const ssrStyle = (() => {
        const p = palettes[theme];
        return `--c-primary:${p.primary};--c-accent:${p.accent};--c-surface:${p.surface};--c-bg:${p.bg};--c-text:${p.text};--c-border:${p.border};`;
    })();


    const menu = [
        {
            title: "Margherita Pizza", desc: "San Marzano tomato, burrata, basil, love.", price: "€10,50",
            tags: [{label: "Vegetarian", kind: "ok"}, {label: "Contains Gluten", kind: "warn"}, {
                label: "Dairy",
                kind: "warn"
            }]
        },
        {
            title: "Spicy Chickpea Bowl", desc: "Harissa chickpeas, quinoa, roasted veg, tahini.", price: "€12,90",
            tags: [{label: "Vegan", kind: "ok"}, {label: "Spicy", kind: "hot"}, {label: "Gluten-Free", kind: "ok"}]
        },
        {
            title: "Peanut Soba Salad", desc: "Buckwheat noodles, peanut-lime dressing, herbs.", price: "€11,90",
            tags: [{label: "Peanuts", kind: "alert"}, {label: "Vegetarian", kind: "ok"}]
        }
    ] as const;
</script>

<!-- Wrap everything so SSR gets inline CSS var fallback -->
<div style={ssrStyle}>
    <header class="topbar">
        <div class="brand">
            <div class="logo">AC</div>
            <div class="meta">
                <h1>AllerCheck</h1>
                <p>Menu preview</p>
            </div>
        </div>

        <div class="controls">
            <label>
                <span>Theme</span>
                <select on:change={handleThemeChange} bind:value={theme}>
                    {#each Object.keys(palettes) as name}
                        <option value={name}>{name}</option>
                    {/each}
                </select>
            </label>
        </div>
    </header>

    <section class="palette-sampler">
        <div class="swatch" style="--swatch: var(--c-primary)">
            <span>Primary</span><code>var(--c-primary)</code>
        </div>
        <div class="swatch" style="--swatch: var(--c-accent)">
            <span>Accent</span><code>var(--c-accent)</code>
        </div>
        <div class="swatch bordered" style="--swatch: var(--c-surface)">
            <span>Surface</span><code>var(--c-surface)</code>
        </div>
        <div class="swatch bordered" style="--swatch: var(--c-bg)">
            <span>Background</span><code>var(--c-bg)</code>
        </div>
        <div class="swatch textchip">
            <span>Text</span><code>var(--c-text)</code>
        </div>
    </section>


    <main class="wrap">
        <section class="section-head">
            <h2>Summer Menu</h2>
            <p>Fast allergen visibility. Clean, trustworthy, modern vibes.</p>
        </section>

        <section class="grid">
            {#each menu as item}
                <article class="card">
                    <div class="card-head">
                        <h3>{item.title}</h3>
                        <div class="price">{item.price}</div>
                    </div>
                    <p class="muted">{item.desc}</p>

                    <div class="tags">
                        {#each item.tags as t}
              <span class={`chip ${t.kind}`}>
                {#if t.kind === "ok"}✅{/if}
                  {#if t.kind === "warn"}⚠️{/if}
                  {#if t.kind === "alert"}🚫{/if}
                  {#if t.kind === "hot"}🌶️{/if}
                  {t.label}
              </span>
                        {/each}
                    </div>

                    <div class="actions">
                        <button class="btn ghost">Details</button>
                        <button class="btn primary">Add</button>
                    </div>
                </article>
            {/each}
        </section>
    </main>
</div>

<style>
    :root {
        --c-primary: #14b85a;
        --c-accent: #ff9800;
        --c-surface: rgba(255, 255, 255, .7);
        --c-bg: #f6f8fb;
        --c-text: #0f172a;
        --c-border: rgba(15, 23, 42, .08);

        --radius-xl: 18px;
        --shadow-sm: 0 1px 2px rgba(0, 0, 0, .05);
        --shadow-md: 0 8px 24px rgba(0, 0, 0, .08);
        --blur: 10px;
    }

    .topbar {
        position: sticky;
        top: 0;
        z-index: 10;
        backdrop-filter: saturate(1.2) blur(var(--blur));
        background: linear-gradient(180deg, rgba(255, 255, 255, .7), rgba(255, 255, 255, .4));
        border-bottom: 1px solid var(--c-border);
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 12px 20px
    }

    .brand {
        display: flex;
        gap: 12px;
        align-items: center
    }

    .logo {
        width: 36px;
        height: 36px;
        border-radius: 10px;
        display: grid;
        place-items: center;
        background: var(--c-primary);
        color: #fff;
        font-weight: 800;
        box-shadow: var(--shadow-sm);
        letter-spacing: .5px
    }

    .meta h1 {
        font-size: 16px;
        margin: 0;
        line-height: 1.1
    }

    .meta p {
        font-size: 12px;
        margin: 2px 0 0;
        opacity: .7
    }

    .controls label {
        display: flex;
        align-items: center;
        gap: 10px;
        font-size: 14px
    }

    select {
        appearance: none;
        padding: 10px 12px;
        border-radius: 10px;
        border: 1px solid var(--c-border);
        background: #fff;
        color: var(--c-text);
        box-shadow: var(--shadow-sm);
        outline: none
    }

    select:focus {
        border-color: var(--c-primary)
    }

    .wrap {
        max-width: 1100px;
        margin: 0 auto;
        padding: 24px 16px 80px
    }

    .section-head {
        margin: 12px 0 18px
    }

    .section-head h2 {
        margin: 0 0 6px;
        font-size: 28px;
        letter-spacing: .2px
    }

    .section-head p {
        margin: 0;
        opacity: .7
    }

    .grid {
        display: grid;
        grid-template-columns:repeat(auto-fit, minmax(260px, 1fr));
        gap: 16px
    }

    .card {
        border: 1px solid var(--c-border);
        border-radius: 18px;
        background: var(--c-surface);
        backdrop-filter: blur(var(--blur));
        box-shadow: var(--shadow-md);
        padding: 18px;
        transition: transform .18s ease, box-shadow .18s ease
    }

    .card:hover {
        transform: translateY(-2px);
        box-shadow: 0 12px 30px rgba(0, 0, 0, .1)
    }

    .card-head {
        display: flex;
        align-items: baseline;
        justify-content: space-between;
        gap: 12px;
        margin-bottom: 6px
    }

    .card h3 {
        margin: 0;
        font-size: 18px;
        letter-spacing: .2px
    }

    .price {
        font-weight: 700;
        color: var(--c-primary)
    }

    .muted {
        margin: 8px 0 14px;
        opacity: .8
    }

    .tags {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        margin-bottom: 14px
    }

    .chip {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 6px 10px;
        border-radius: 999px;
        font-size: 12px;
        border: 1px solid var(--c-border);
        background: rgba(255, 255, 255, .55);
        user-select: none
    }

    .chip.ok {
        border-color: color-mix(in srgb, var(--c-primary) 40%, transparent)
    }

    .chip.warn {
        border-color: color-mix(in srgb, var(--c-accent) 40%, transparent)
    }

    .chip.alert {
        border-color: rgba(220, 38, 38, .35)
    }

    .chip.hot {
        border-color: rgba(234, 88, 12, .35)
    }

    .actions {
        display: flex;
        gap: 10px
    }

    .btn {
        appearance: none;
        border: 0;
        cursor: pointer;
        padding: 10px 14px;
        border-radius: 12px;
        font-weight: 600;
        background: #fff;
        color: var(--c-text);
        box-shadow: var(--shadow-sm);
        border: 1px solid var(--c-border);
        transition: transform .12s ease, filter .12s ease, background .12s ease
    }

    .btn:hover {
        filter: brightness(.98)
    }

    .btn:active {
        transform: translateY(1px)
    }

    .btn.primary {
        color: #fff;
        background: linear-gradient(180deg, color-mix(in srgb, var(--c-primary) 92%, white), var(--c-primary));
        border: 1px solid color-mix(in srgb, var(--c-primary) 60%, black 0%)
    }

    .btn.ghost {
        background: transparent
    }

    @media (prefers-color-scheme: dark) {
        :root {
            --c-surface: rgba(17, 25, 40, .6);
            --c-bg: radial-gradient(1200px 800px at 20% -10%, rgba(255, 255, 255, .03), transparent 60%), #0b1020;
            --c-text: #e6eaf2;
            --c-border: rgba(230, 234, 242, .12)
        }

        select {
            background: rgba(255, 255, 255, .08);
            color: var(--c-text)
        }

        .btn {
            background: rgba(255, 255, 255, .06);
            color: var(--c-text)
        }

        .chip {
            background: rgba(255, 255, 255, .06)
        }
    }


    /* --- Palette sampler --- */
    .palette-sampler {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
        gap: 10px;
        padding: 12px 16px;
        margin: 16px 0 8px;
        border: 1px dashed var(--c-border);
        border-radius: 12px;
        background: linear-gradient(0deg, rgba(0, 0, 0, 0.015), rgba(0, 0, 0, 0.015)),
        var(--c-surface);
    }

    .swatch {
        display: grid;
        gap: 6px;
        padding: 12px;
        border-radius: 10px;
        background: var(--swatch);
        color: var(--c-text);
        box-shadow: var(--shadow-sm);
    }

    .swatch.bordered {
        border: 1px solid var(--c-border);
    }

    .swatch code {
        font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
        font-size: 12px;
        opacity: .8;
        background: rgba(0, 0, 0, .05);
        padding: 2px 6px;
        border-radius: 6px;
        width: max-content;
    }

    .textchip {
        background: transparent;
        border: 1px dashed var(--c-border);
        color: var(--c-text);
    }

    /* --- Accent button --- */
    .btn.accent {
        background: var(--c-accent);
        color: var(--c-text); /* dark text for contrast */
        border: 1px solid var(--c-border);
    }

    .btn.accent:hover {
        filter: brightness(.98);
    }

    /* Optional focus ring */
    .btn:focus-visible, select:focus-visible {
        outline: none;
        box-shadow: 0 0 0 3px color-mix(in srgb, var(--c-primary) 25%, transparent);
        border-color: var(--c-primary);
    }
</style>