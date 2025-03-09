# 📱 NewsFeed Mobile · React Native

![React Native](https://img.shields.io/badge/react_native-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)  
_Aplicación de noticias multiplataforma con gestión de favoritos y filtros_

## 🌟 Destacados

- 🗞 **Feed dinámico** con noticias en tiempo real
- ❤️ **Favoritos persistentes** (AsyncStorage)
- 🔧 Estado global con **Redux Toolkit**
- 📱 **UI profesional** mediante React Native Paper
- 🧪 **Cobertura de tests** con Jest + Testing Library

---

## 🛠 Arquitectura Técnica

### 📂 Estructura de Carpetas

```bash
src/
├── 📡 services/       # Comunicación con APIs externas
│   └── newsService.ts  # Configuración Axios y endpoints
├── 🧩 components/     # Componentes UI reutilizables
│   ├── NewsList.tsx    # Listado principal de artículos
│   ├── SkeletonLoading.tsx  # Componente para estados de carga
│   ├── StatusHandler.tsx    # Manejador de estados de la aplicación
│   └── WebViewportConstraint.tsx  # Restricciones de viewport para web
├── 🗺 navigation/     # Gestión de rutas y navegación
│   └── AppNavigator.tsx # Stack Navigator principal
├── 🧠 redux/         # Gestión de estado global
│   ├── store.ts       # Configuración Redux Toolkit
│   ├── newsSlice.ts   # Lógica de noticias y favoritos
│   └── hooks.ts       # Custom hooks para Redux
├── 🖥 screens/       # Pantallas principales de la app
│   ├── DetailScreen.tsx # Vista completa de artículo
│   ├── CategoriesScreen.tsx # Pantalla de categorías de noticias
│   └── SavedNewScreen.tsx  # Pantalla de noticias guardadas
├── 📐 interfaces/    # Tipos específicos de dominio
│   └── news.ts        # Interface News y tipos relacionados
└── 🌐 types/         # Definiciones globales TypeScript
    └── env.d.ts       # Declaración variables de entorno
```

### 🔧 Stack Tecnológico

| Categoría | Tecnologías                           |
| --------- | ------------------------------------- |
| Core      | React Native · TypeScript · Expo      |
| Estado    | Redux Toolkit · RTK Query             |
| UI        | React Native Paper · Vector Icons     |
| Calidad   | ESLint · Prettier · Jest              |
| DevOps    | GitHub Actions · PNPM · Env Variables |

---

## ⚡️ Primeros Pasos

1. **Clonar repositorio**

```bash
git clone https://github.com/lexzer42/NewsApp-Expo.git && cd NewsApp-Expo
```

2. **Instalar dependencias**

```bash
pnpm install
```

3. **Configurar entorno**

```bash
cp .env.example .env
# Agregar tus API keys
```

4. **Ejecutar app**

```bash
pnpm start
```

---

## 🔄 Flujo de Desarrollo

| Etapa          | Comando         | Acción                     |
| -------------- | --------------- | -------------------------- |
| Lint & Formato | `pnpm lint:fix` | Corregir estilo código     |
| Tests          | `pnpm test`     | Ejecutar suite de pruebas  |
| Build          | `pnpm build`    | Compilar bundle producción |

---

## 📋 Prueba Técnica - Checklist

Esta aplicación fue desarrollada como parte de una prueba técnica con los siguientes requisitos:

### ✅ Manejo de Estados con Redux
- ✓ Implementación de Redux para el estado global de la aplicación
- ✓ Actions y reducers para gestión de noticias desde API
- ✓ Manejo de estado para artículos guardados

### ✅ Componentización
- ✓ Componentes reutilizables (NewsList, SkeletonLoading, StatusHandler)
- ✓ Separación clara de responsabilidades
- ✓ Props tipados con TypeScript

### ✅ Peticiones HTTP con Axios
- ✓ Cliente Axios configurado para NewsAPI
- ✓ Endpoints para listados de noticias
- ✓ Manejo de paginación y filtrado por categorías

### ✅ Diseño Responsivo
- ✓ Interfaz adaptable a diferentes tamaños de pantalla
- ✓ Distribución adecuada de elementos
- ✓ Soporte para orientación portrait y landscape

### ✅ React Native Paper
- ✓ UI construida con componentes de Material Design
- ✓ Cards, Buttons, Chips y otros elementos visuales

### ✅ Funcionalidades
- ✓ Pantalla de inicio con lista de noticias
- ✓ Detalle completo de cada noticia
- ✓ Sistema de guardado de favoritos
- ✓ Filtrado por categorías
- ✓ Pull-to-refresh y carga infinita
