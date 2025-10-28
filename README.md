# Dark List

Aplicación móvil hecha con React Native (Expo) para gestionar jefes y logros del universo Dark Souls. Incluye navegación con pestañas, modo claro/oscuro dinámico y estado global con Redux Toolkit.

## Requisitos
- Node.js 18+
- Expo CLI (recomendado): `npm i -g expo`
- Android Studio / Xcode (para emuladores) o Expo Go en tu dispositivo

## Instalación
```bash
# Instalar dependencias
npm install
```

## Scripts
- `npm run start` Inicia el servidor de desarrollo (Expo)
- `npm run android` Abre en Android (Expo)
- `npm run ios` Abre en iOS (Expo)
- `npm run web` Abre en web (Expo)

## Ejecución rápida
```bash
npm run start
# Luego escanea el QR con Expo Go o abre el simulador desde la UI de Expo
```

## Estructura del proyecto
```
root/
├─ App.js                 # Envoltura de ProveedorTema y Redux Provider
├─ index.js               # Registro de la app con Expo
├─ assets/                # Iconos y recursos
└─ src/
   ├─ navigation/
   │  └─ NavegadorApp.js # Bottom Tabs + Stack (Jefes, Logros)
   ├─ context/
   │  └─ ContextoTema.js # Tema claro/oscuro (auto y conmutador)
   ├─ hooks/
   │  └─ useGestorJefes.js # Alta/edición/borrado con notificaciones
   ├─ components/
   │  ├─ Header.js
   │  ├─ InterruptorTema.js
   │  ├─ TarjetaJefe.js
   │  └─ TarjetaLogro.js
   ├─ screens/
   │  ├─ PantallaInicio.js
   │  ├─ PantallaFormularioJefe.js
   │  └─ PantallaLogros.js
   └─ store/
      └─ index.js        # Redux Toolkit slice/store (agregar/actualizar/eliminar)
```

## Funcionalidades
- Gestión de jefes:
  - Crear, editar y eliminar jefes
  - Seguimiento de intentos y estado de completado
- Listado de logros de Dark Souls
- Modo claro/oscuro:
  - Detecta esquema del sistema y permite alternar con `InterruptorTema`
  - Paleta de colores centralizada en `ContextoTema`
- Navegación:
  - Pestañas inferiores (Jefes, Logros) con `@react-navigation/bottom-tabs`
  - Flujo de Jefes con `createStackNavigator`
- Estado global con Redux Toolkit (`src/store`)

## Tecnologías principales
- Expo 54, React Native 0.81, React 19
- React Navigation (stack + tabs)
- Redux Toolkit + React Redux
- React Hook Form (para formularios)
- @expo/vector-icons (Ionicons)

## Configuración de tema
- `ContextoTema` expone:
  - `tema`: colores y tokens para UI
  - `modoOscuro`: bool del estado actual
  - `alternarTema()`: invierte manualmente el tema
- Colores de header, tabBar y textos aplicados desde navegación y componentes

## Desarrollo y buenas prácticas
- Mantén colores y estilos en `ContextoTema` para consistencia
- Usa `useGestorJefes` para operaciones sobre jefes y notificaciones
- Evita lógica de negocio en componentes de presentación (Tarjetas)

## Solución de problemas
- Puertos ocupados de Metro/Expo: cierra procesos previos e intenta `npm run start` de nuevo
- Android: inicia el emulador primero desde Android Studio o usa Expo Go
- iOS: requiere macOS con Xcode instalado

## Licencia
Este proyecto usa la licencia 0BSD (ver `package.json`).
