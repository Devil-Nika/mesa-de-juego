**Bienvenido a Mesa de Juego, un asistente de dirección de partidas de rol diseñado para ser potente, modular y offline‑first.**

Este proyecto nace como una Progressive Web Application (PWA) para facilitar la gestión de campañas, personajes y encuentros, permitiendo a los Game Masters centrarse en la narrativa y no en la administración.

---

## ✨ Resumen y Objetivo del Proyecto

El objetivo es desarrollar una herramienta de ayuda para la dirección de partidas de rol que funcione mediante **perfiles de sistema independientes**. Cada perfil (D&D 5e, Pathfinder, etc.) carga únicamente las herramientas y reglas adaptadas a las mecánicas específicas de ese juego, ofreciendo una experiencia limpia y enfocada.

La aplicación está construida con una arquitectura local y offline‑first, donde el Game Master actúa como anfitrión de la sesión en una red local, y los jugadores pueden conectarse y descargar temporalmente la información de sus personajes para un funcionamiento fluido durante el combate.

### Estrategia Legal y de Contenido

Para garantizar la viabilidad de una futura comercialización y una distribución libre, el proyecto se adhiere estrictamente al uso de contenido **SRD (System Reference Document)** bajo la licencia **OGL (Open Game License)**. Todo el contenido no‑SRD podrá ser añadido por los usuarios mediante herramientas de importación y creación personalizadas.

---

## ️ Arquitectura y Tecnologías

Este proyecto se construye sobre un stack de tecnologías web modernas, enfocado en el rendimiento y la experiencia de desarrollo.

*   **Framework Frontend:** **React** ‑ Para construir una interfaz de usuario dinámica y reactiva.
*   **Lenguaje:** **TypeScript** ‑ Para añadir seguridad de tipos y mejorar la escalabilidad del código.
*   **Herramienta de Construcción:** **Vite** ‑ Proporciona un entorno de desarrollo ultrarrápido con HMR.
*   **Almacenamiento Local:** **IndexedDB** ‑ Para un almacenamiento de datos robusto en el lado del cliente.
*   **Networking Local:** **WebSockets** ‑ Para la comunicación en tiempo real entre el GM y los jugadores.
*   **Análisis de Código:** **ESLint** ‑ Para mantener un código limpio, consistente y libre de errores.

---

# Mesa de Juego 🎲

Una aplicación web para gestión de partidas de rol que soporta múltiples sistemas (D&D 5e, Pathfinder, Starfinder, etc.) con catálogos completos de reglas y contenido SRD.

## 🚀 Características

- **Sistemas Múltiples**: Cambia entre diferentes sistemas de juego (D&D 5e, Pathfinder 2e, etc.)
- **Grimorio Completo**: Acceso a todo el contenido SRD organizado por categorías
- **Base de Datos Local**: Almacenamiento offline con IndexedDB usando Dexie
- **Internacionalización**: Soporte para múltiples idiomas (español/inglés)
- **Interfaz Responsiva**: Diseño adaptable para diferentes dispositivos

## 📁 Estructura del Proyecto


/Mesa-de-Juego
│
├── /public # Archivos estáticos públicos
├── /src
│ ├── /assets # Imágenes, logos y recursos
│ ├── /components # Componentes React reutilizables
│ │ ├── Layout.tsx # Estructura base de la aplicación
│ │ └── SystemSwitcher.tsx # Selector de sistema de juego
│ ├── /contexts # Estado global con React Context
│ │ ├── SystemContext.ts # Contexto del sistema activo
│ │ ├── SystemProvider.tsx # Provider del sistema
│ │ └── useSystem.ts # Hook personalizado para sistema
│ ├── /domain # Modelos de datos y tipado
│ │ └── /dnd5e # Dominio específico de D&D 5e
│ │ ├── Primitives.ts # Tipos base (habilidades, tamaños, etc.)
│ │ ├── Actions.ts
│ │ ├── Classes.ts
│ │ ├── Spells.ts
│ │ └── ... # Más entidades del SRD
│ ├── /hooks # Hooks personalizados para acceso a datos
│ │ └── /dnd5e # Hooks específicos por sistema
│ ├── /i18n # Internacionalización
│ │ ├── en.json
│ │ ├── es.json
│ │ └── index.ts
│ ├── /pages # Páginas/vistas de la aplicación
│ │ └── /grimorio # Catálogo completo del SRD
│ ├── /routes # Configuración de rutas
│ │ └── SystemGuard.tsx # Guardia de rutas por sistema
│ ├── /services # Infraestructura de datos
│ │ ├── db.ts # Configuración de base de datos
│ │ └── seed.ts # Carga inicial de datos
│ └── /systems # Datos y configuración por sistema
│ ├── /dnd5e
│ │ ├── /data # Archivos JSON del SRD 5.2.1
│ │ └── index.ts
│ └── registry.ts # Registro de sistemas disponibles
├── App.tsx # Configuración principal
└── main.tsx # Punto de entrada


# 🎯 Sistemas Soportados
## ✅ Actualmente Implementado
Dungeons & Dragons 5e (SRD 5.2.1 completo)

## 🚧 En Desarrollo
Pathfinder 2e

Starfinder 2e

## 📋 Planificado
Daggerheart

Vampiro: La Mascarada

## Sistemas personalizados

### 📚 Contenido Disponible (D&D 5e SRD 5.2.1)
#### ✨ **Conjuros** : 322 hechizos oficiales con todos los detalles

#### 🎭 **Clases y Subclases:** Clases base y arquetipos

#### 🧬 Especies: Razas jugables y rasgos raciales

#### 🛡️ Objetos: Equipamiento mundano y mágico

#### 🐉 Monstruos: Bestiario completo con statblocks

#### 🌟 Dotes: Habilidades especiales

#### 📖 Trasfondos: Personalización de personajes

#### 📜 Reglas: Reglas del juego organizadas

#### 🎁 Dones: Bendiciones y dones sobrenaturales

## 🎮 Funcionalidades Clave
### Grimorio - Consulta de Reglas

#### Búsqueda y filtrado avanzado

#### Contenido oficial SRD 5.2.1

#### Navegación por categorías

#### Vista responsiva para todos los dispositivos

### Constructor Homebrew
#### Creación de contenido personalizado

#### Clonado de elementos existentes

#### Sistema de etiquetas y fuentes

#### Exportación/importación JSON

### Gestor de Encuentros
#### Tracker de iniciativa automatizado

#### Control de puntos de vida y condiciones

#### Sincronización en tiempo real vía WebSockets

#### Statblocks integrados con acciones compartidas

### Hojas de Personaje
#### Cálculos automáticos de estadísticas

#### Soporte para multiclase

#### Conjuros por raza y dotes

#### Campos narrativos e imágenes

#### Sistema de niveles y progresión

## 📚 Contenido Disponible (D&D 5e)

- **Acciones**: Acciones básicas y de combate
- **Razas**: Especies y subrazas del SRD
- **Clases**: Clases base y subclases
- **Dotes**: Habilidades especiales
- **Objetos**: Equipamiento y objetos mágicos
- **Monstruos**: Bestiario completo
- **Hechizos**: Grimorio de conjuros
- **Trasfondos**: Personalización de personajes
- **Reglas**: Reglas del juego organizadas

## 🛠️ Tecnologías

- **Frontend**: React 18 + TypeScript + Vite
- **Estado**: React Context API + Hooks personalizados
- **Base de Datos**: Dexie.js (IndexedDB)
- **Enrutamiento**: React Router
- **Internacionalización**: i18next
- **Estilos**: CSS Modules / Tailwind (opcional)
- **Build Tool**: Vite

## 📖 Uso
Selecciona un Sistema: Usa el selector en la cabecera para cambiar entre sistemas

Navega el Grimorio: Explora el contenido SRD organizado por categorías

Busca Contenido: Utiliza la función de búsqueda para encontrar rápidamente reglas, hechizos, monstruos, etc.

Gestiona Partidas: Crea y gestiona tus partidas de rol (funcionalidad en desarrollo)

## 🔧 Configuración
Agregar Nuevos Sistemas
Crea una carpeta en /systems con el nombre del sistema

Define los tipos en /domain/[sistema]

Implementa hooks en /hooks/[sistema]

Registra el sistema en registry.ts

Agrega datos SRD en formato JSON en /data

## Internacionalización
Los textos se encuentran en /i18n. Para agregar un nuevo idioma:

Crea [codigo].json en /i18n

Registra el idioma en index.ts

Traduce todas las cadenas

## 🚀 Instalación y Uso

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Construir para producción
npm run build

# Servir construcción de producción
npm run preview