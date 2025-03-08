# 📰 News Feed Mobile App - React Native  

Aplicación móvil multiplataforma para consumo de noticias en tiempo real, construida con arquitectura moderna y mejores prácticas de desarrollo.

## 🌟 Características Clave  

- 🔄 **Integración con APIs REST** mediante Axios  
- 🧠 **Gestión de estado global** con Redux Toolkit  
- 🎨 **Interfaz consistente** usando React Native Paper  
- 🧹 **Código limpio** garantizado por ESLint + Prettier  
- 📦 **Gestión eficiente de dependencias** con pnpm  
- 📱 **Compatibilidad multiplataforma** (iOS/Android)  

## 🏗 Estructura del Proyecto  

```bash
src/
├── api/           # Configuración de servicios API
├── assets/        # Recursos multimedia y fuentes
├── components/    # Componentes UI reutilizables
├── navigation/    # Gestión de rutas (React Navigation)
├── redux/         # Store, slices y acciones globales
├── screens/       # Vistas principales
├── styles/        # Temas y estilos globales
└── utils/         # Helpers y utilities
```

## ⚙️ Configuración Técnica  

### 📦 Gestión de Paquetes  
| Herramienta | Justificación |  
|-------------|---------------|  
| `pnpm` | Rendimiento superior y espacio eficiente |  
| `TypeScript` | Tipado estático para calidad de código |  
| `React Native Paper` | Componentes UI profesionales y accesibles |  

### 🛠️ Control de Calidad  
| Herramienta | Función |  
|-------------|---------|  
| ESLint | Análisis estático de código |  
| Prettier | Formateo automático consistente |  
| GitHub Actions | Pipeline CI/CD integrado |  

## 🚀 Instalación Local  

1. Clonar repositorio:  
```bash
git clone 
```

2. Instalar dependencias:  
```bash
pnpm install
```

3. Iniciar servidor de desarrollo:  
```bash
pnpm start
```

## 🔄 Flujo CI/CD  

| Etapa | Trigger | Acciones |  
|-------|---------|----------|  
| **Validación** | Push a `develop`/`main` | Linting + Formateo |  
| **Despliegue** | Merge a `main` | Publicación en Expo (simulado) |  

## 🔒 Políticas de Rama  

- 🛑 Push directo a `main` bloqueado  
- ✅ **Merge Requisitos**:  
  - 1+ aprobaciones de código  
  - Todos los tests CI pasados  
  - Conflictos resueltos  
- ⚠️ **Restricciones**:  
  - Force push prohibido  
  - Eliminación de rama protegida  

---

