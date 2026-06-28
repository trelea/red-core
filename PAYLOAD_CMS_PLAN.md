# Payload CMS Integration Plan — red-core

## Context

The landing page (home + 4 service pages) has **all content hardcoded** in component
files — projects, hero text, services, advantages, about, offers, feedbacks. There is
**no database** today (only Resend email + Cal.com). The goal is to install Payload CMS
**into this same Next.js app** (Payload 3 is Next-native: admin at `/admin`, auto APIs, a
typed Local API for server components) and start driving content from the CMS — beginning
with **Projects**, the highest-value content (12 records across the 4 service pages).

Database: **Turso (libSQL)** — `libsql://red-core-db-trelea.aws-eu-west-1.turso.io` — via
`@payloadcms/db-sqlite`, which uses Drizzle's libSQL client and supports Turso with a
`url` + `authToken`.

**Scope:** the CMS manages **only the project lists on the 4 service pages** — Core
Drilling, Slab Cutting, Small Demolition, Wall Saw Cutting. Everything else stays hardcoded
in components: the entire home page (hero, services, advantages, about, offers, feedbacks)
and the static hero text on the service pages themselves.

**Data model decision:** one `Users` collection (admin auth) + a `Media` upload collection
(R2-backed, for project images) + **4 separate project collections**, one per service page,
all sharing the **same field shape**
(`core-drilling-projects`, `slab-cutting-projects`, `small-demolition-projects`,
`wall-saw-cutting-projects`). Each page reads only its own collection — no shared
`service` filter field needed. Identical fields are defined once via a shared factory to
stay DRY.

## Prerequisites / decisions baked in

- **Next.js bump required.** `@payloadcms/next` supports `next >=16.2.6 <17`. Project is on
  **16.1.6** (unsupported gap). Bump to **16.2.9** (latest 16.x) + matching
  `eslint-config-next`.
- **Node** 22.14 ✓ (Payload needs ≥20.9).
- **API route collision (important).** Payload's default API base is `/api`, which would
  shadow the existing `/api/get-a-quote` and `/api/contact-us`. Fix: set Payload
  `routes.api` to `/payload-api` so the existing email endpoints stay untouched.
- **Images via Cloudflare R2.** Images are real Payload `Media` uploads stored in
  **Cloudflare R2** (S3-compatible) using the `@payloadcms/storage-s3` adapter with your
  `S3_*` credentials. `project_images` references uploaded `media` docs (not path strings).
  Files are served **through Payload's media route** (the server proxies bytes from the
  bucket), so no public bucket URL is required.

---

## Step 1 — Bump Next.js

```bash
npm i next@16.2.9 eslint-config-next@16.2.9
npm run build   # sanity check the bump alone before adding Payload
```

## Step 2 — Install Payload

```bash
npm i payload @payloadcms/next @payloadcms/db-sqlite @payloadcms/richtext-lexical \
  @payloadcms/storage-s3 sharp graphql
```

## Step 3 — Turso credentials → `.env`

Create a Turso auth token (Turso CLI): `turso db tokens create red-core-db`. Then add:

```
PAYLOAD_SECRET=<run: openssl rand -base64 32>
DATABASE_URI=libsql://red-core-db-trelea.aws-eu-west-1.turso.io
DATABASE_AUTH_TOKEN=<turso token>

# Bucket storage (Cloudflare R2, S3-compatible) — image storage
S3_BUCKET=red-core-bucket
S3_ACCESS_KEY_ID=<S3 access key id>
S3_SECRET_ACCESS_KEY=<S3 secret access key>
S3_ENDPOINT=https://<accountId>.r2.cloudflarestorage.com   # S3 API endpoint
S3_REGION=auto                                             # 'auto' for R2
```

(Existing `RESEND_API_KEY`, `NEXT_PUBLIC_CAL_LINK` stay.)
Serving: with no public-URL var, images are served **through Payload's own media route**
(it proxies bytes from the bucket) — no public bucket needed, and image URLs are
same-origin. If you later want to serve directly from a public R2 domain instead, add an
`S3_PUBLIC_URL` var + a `generateFileURL` + `disablePayloadAccessControl: true` (and enable
the r2.dev subdomain / custom domain on the bucket).

## Step 4 — `tsconfig.json` path alias

Add alongside the existing `@/*` alias so `@payload-config` resolves:

```jsonc
"paths": {
  "@/*": ["./src/*"],
  "@payload-config": ["./src/payload.config.ts"]
}
```

## Step 5 — `src/payload.config.ts`

```ts
import path from 'path'
import { fileURLToPath } from 'url'
import { buildConfig } from 'payload'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { s3Storage } from '@payloadcms/storage-s3'
import { Users } from './collections/Users'
import { Media } from './collections/Media'
import {
  CoreDrillingProjects,
  SlabCuttingProjects,
  SmallDemolitionProjects,
  WallSawCuttingProjects,
} from './collections/projects'

const dirname = path.dirname(fileURLToPath(import.meta.url))

export default buildConfig({
  admin: { user: 'users' },
  routes: { api: '/payload-api' }, // avoid clash with existing /api/* email endpoints
  collections: [
    Users,
    Media,
    CoreDrillingProjects,
    SlabCuttingProjects,
    SmallDemolitionProjects,
    WallSawCuttingProjects,
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET!,
  typescript: { outputFile: path.resolve(dirname, 'payload-types.ts') },
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URI!,
      authToken: process.env.DATABASE_AUTH_TOKEN,
    },
  }),
  storage: [
    s3Storage({
      enabled: Boolean(process.env.S3_BUCKET),
      collections: {
        media: true, // served through Payload's media route (no public bucket URL needed)
      },
      bucket: process.env.S3_BUCKET!,
      config: {
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID!,
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
        },
        region: process.env.S3_REGION, // 'auto' for R2
        endpoint: process.env.S3_ENDPOINT!,
        forcePathStyle: true,          // required for R2
      },
    }),
  ],
})
```

## Step 6 — Collections

**`src/collections/Users.ts`** — auth collection for admin login:

```ts
import type { CollectionConfig } from 'payload'
export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  fields: [],
}
```

**`src/collections/Media.ts`** — upload collection backed by R2 (via the storage plugin):

```ts
import type { CollectionConfig } from 'payload'
export const Media: CollectionConfig = {
  slug: 'media',
  upload: true, // file storage handled by the s3Storage plugin (R2)
  fields: [
    { name: 'alt', type: 'text' }, // optional accessibility alt text
  ],
}
```

**`src/collections/projects.ts`** — one shared field factory mirroring the current
`Project` shape, reused to build 4 identical-looking collections (one per service page).
No `service` field — the collection itself denotes the service.

```ts
import type { CollectionConfig, Field } from 'payload'

// Defined once so all 4 collections look the same.
const projectFields: Field[] = [
  { name: 'project_name', type: 'text', required: true },
  { name: 'project_service', type: 'text' }, // optional, defaults to name in UI
  { name: 'project_location', type: 'text', required: true },
  { name: 'project_price', type: 'number', required: true },
  { name: 'project_description', type: 'textarea', required: true },
  { name: 'cols_reversed', type: 'checkbox', defaultValue: false },
  {
    name: 'project_images', type: 'array', required: true, minRows: 1, maxRows: 2,
    fields: [
      // each row references one uploaded image in the Media collection (R2)
      { name: 'image', type: 'upload', relationTo: 'media', required: true },
    ],
  },
]

const makeProjectsCollection = (slug: string, label: string): CollectionConfig => ({
  slug,
  labels: { singular: `${label} Project`, plural: `${label} Projects` },
  admin: { useAsTitle: 'project_name', group: 'Projects' },
  fields: projectFields,
})

export const CoreDrillingProjects = makeProjectsCollection('core-drilling-projects', 'Core Drilling')
export const SlabCuttingProjects = makeProjectsCollection('slab-cutting-projects', 'Slab Cutting')
export const SmallDemolitionProjects = makeProjectsCollection('small-demolition-projects', 'Small Demolition')
export const WallSawCuttingProjects = makeProjectsCollection('wall-saw-cutting-projects', 'Wall Saw Cutting')
```

The `admin.group: 'Projects'` nests all four under one "Projects" heading in the admin
sidebar so they're visually grouped while staying separate collections.

## Step 7 — `(payload)` route group (admin + API)

Add the standard Payload server files. Easiest source: scaffold a throwaway blank app with
`npx create-payload-app@latest` (or copy from the official `blank` template /
payloadcms repo `templates/blank/src/app/(payload)`), then copy its `src/app/(payload)/`
directory in. Files needed:

```
src/app/(payload)/layout.tsx
src/app/(payload)/admin/[[...segments]]/page.tsx
src/app/(payload)/admin/[[...segments]]/not-found.tsx
src/app/(payload)/admin/importMap.js          # generated, see step 9
src/app/(payload)/payload-api/[...slug]/route.ts            # NOTE folder name = routes.api
src/app/(payload)/payload-api/graphql/route.ts
src/app/(payload)/payload-api/graphql-playground/route.ts
```

Because `routes.api` is `/payload-api`, the api folder is named `payload-api` (not `api`).
Set `admin.importMap.baseDir`/`importMapFile` in the config only if you nest deeper; the
default `(payload)` location needs no extra importMap config.

## Step 8 — Wrap `next.config.ts`

```ts
import { withPayload } from '@payloadcms/next/withPayload'
// ...existing nextConfig...
export default withPayload(nextConfig)
```

## Step 9 — Move the site into a `(frontend)` route group

Prevents the Payload admin layout from clashing with the site layout. Route groups don't
change URLs, so all paths stay identical.

```
src/app/layout.tsx                  → src/app/(frontend)/layout.tsx
src/app/page.tsx                    → src/app/(frontend)/page.tsx
src/app/core-drilling/page.tsx      → src/app/(frontend)/core-drilling/page.tsx
src/app/slab-cutting/page.tsx       → src/app/(frontend)/slab-cutting/page.tsx
src/app/small-demolition/page.tsx   → src/app/(frontend)/small-demolition/page.tsx
src/app/wall-saw-cutting/page.tsx   → src/app/(frontend)/wall-saw-cutting/page.tsx
globals.css / favicon / sitemap etc → move with the frontend layout as needed
```

**Leave `src/app/api/get-a-quote` and `src/app/api/contact-us` where they are** — they keep
working at `/api/*` (Payload now lives at `/payload-api/*`).

## Step 10 — Generate types & first run

```bash
npx payload generate:importmap   # writes src/app/(payload)/admin/importMap.js
npx payload generate:types       # writes src/payload-types.ts
npm run dev
```

Visit `http://192.168.1.7:3000/admin`, create the first admin user, add a couple of test
Projects. Add npm scripts:

```jsonc
"scripts": {
  "generate:types": "payload generate:types",
  "generate:importmap": "payload generate:importmap"
}
```

## Step 11 — Seed the 12 existing projects

Write `src/seed.ts` (run with `payload run src/seed.ts`). For each existing image, first
upload it to Media (`payload.create({ collection: 'media', filePath, data: { alt } })` using
the current `/public` asset), then create the project with `project_images: [{ image:
media.id }]` into **its own collection** (`payload.create({ collection:
'core-drilling-projects', data })`, etc.). Source records (to migrate verbatim):

- `src/app/(frontend)/core-drilling/page.tsx` (was lines ~57–112) → `core-drilling-projects`
- `src/app/(frontend)/slab-cutting/page.tsx` (~71–126) → `slab-cutting-projects`
- `src/app/(frontend)/small-demolition/page.tsx` → `small-demolition-projects`
- `src/app/(frontend)/wall-saw-cutting/page.tsx` → `wall-saw-cutting-projects`

## Step 12 — Wire `our-projects.tsx` to the CMS

Each service page currently defines a `projects` array and passes it to `<OurProjects />`
(rendered via the `ProjectRow` in `src/components/our-projects.tsx`). Convert each service
page to a server component that fetches from Payload and passes results down:

Each page reads **its own collection** (no `where` filter needed):

```ts
import { getPayload } from 'payload'
import config from '@payload-config'

export default async function CoreDrillingPage() {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'core-drilling-projects',
    limit: 50,
    depth: 2, // populate the media upload relationship so image.url/.alt are present
  })

  const projects = docs.map((d) => ({
    project_name: d.project_name,
    project_service: d.project_service ?? undefined,
    project_location: d.project_location,
    project_price: d.project_price,
    project_description: d.project_description,
    cols_reversed: d.cols_reversed ?? false,
    // media docs are populated objects at depth ≥1
    project_images: d.project_images.map(({ image }) => ({
      src: typeof image === 'object' ? image.url! : '',
      alt: typeof image === 'object' ? (image.alt ?? '') : '',
    })),
  }))
  // <OurProjects projects={projects} />
}
```

Text fields already match the component (`project_name`, `project_location`,
`project_price`, `project_description`, `cols_reversed`). The only transform is
`project_images`: each row's `image` upload (a populated Media doc) maps to the component's
`{ src: image.url, alt: image.alt }`. Use the generated per-collection types from
`src/payload-types.ts` (e.g. `CoreDrillingProject`, `Media`).

**1–2 images:** `project_images` allows 1 or 2 entries (`minRows: 1, maxRows: 2`).
`ProjectRow` in `our-projects.tsx` already renders each image conditionally
(`{first && …}` / `{second && …}`), so it won't break with a single image — but the image
container is a fixed `grid-cols-2`, so one image fills only half the row. Add a small tweak
so a single image spans full width, e.g. make the image grid columns conditional on
`project_images.length` (`grid-cols-1` when 1 image, `grid-cols-2` when 2).
Keep `priceFormatter` + the green-`$` rendering in `our-projects.tsx` unchanged.

Delete the now-unused hardcoded arrays from the service pages.

## Out of scope

The CMS is used **only** for the project lists on the 4 service pages. The following stay
hardcoded in their components (no collections/globals):

- The entire **home page** — hero, `OurServices`, `WhyChooseUs`, `AboutUs`, `Offers`,
  `Feedbacks`.
- The **hero title/description/image** on the 4 service pages.

(If any of these need CMS control later, they'd follow the same collection/global pattern —
but they are explicitly excluded from this plan.)

---

## Production notes (Turso + deploy)

- **Migrations**: dev uses Drizzle `push` (auto-syncs schema). For production, generate and
  commit migrations: `npx payload migrate:create`, deploy, run `npx payload migrate`.
- **Image storage (R2)**: handled by the `s3Storage` plugin → no local disk dependency, so
  it works on serverless. Ensure all five `S3_*` env vars are set in the deploy environment.
  Images serve same-origin through Payload's media route (`image.url` is a relative path),
  so no `next/image` `remotePatterns` entry is needed. (Only if you switch to direct public
  R2 serving via `S3_PUBLIC_URL` would you add that host to `images.remotePatterns`.)
- **Secrets**: `PAYLOAD_SECRET`, `DATABASE_URI`, `DATABASE_AUTH_TOKEN` must be set in the
  deploy environment.

## Verification

- `npm run build` after Step 1 (Next bump alone), and again after Step 10.
- `npx tsc --noEmit` clean after Step 12 (using generated types).
- `/admin` loads, login works, a Project added in admin appears on its service page.
- `/api/get-a-quote` and `/api/contact-us` still respond (not shadowed by Payload).
- Quote dialog + contact form still send email (Resend) end to end.
```
