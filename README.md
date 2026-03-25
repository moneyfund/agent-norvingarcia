# Norvin Garcia Real Estate Web

Proyecto web profesional para agente inmobiliario construido con **Next.js App Router**, **Tailwind CSS**, **Framer Motion** y **Leaflet**.

## Características

- Diseño premium y responsive con estilo lujo.
- Secciones independientes: Home, Propiedades, Mapa, Perfil, Contacto.
- Detalle individual por propiedad con galería + mapa.
- Panel privado admin con login y CRUD local (mock) para propiedades y perfil.
- Datos mock listos para migrar a Supabase o Firebase.
- Base lista para deploy en Vercel.

## Rutas

- `/`
- `/propiedades`
- `/propiedades/[id]`
- `/mapa`
- `/perfil`
- `/contacto`
- `/admin/login`
- `/admin/dashboard`

## Credenciales demo admin

- Email: `admin@norvingarcia.com`
- Password: `Admin123*`

## Desarrollo

```bash
npm install
npm run dev
```

## Producción

```bash
npm run build
npm run start
```

## Estructura

- `app/` rutas y páginas
- `components/` componentes UI
- `lib/` datos mock, auth local y helpers
- `public/` assets estáticos
- `styles/` reservado para estilos adicionales
