# Portfolio
A web-based recreation of the KDE Plasma desktop environment, built to showcase advanced component architecture and reactive UI patterns.

> [!IMPORTANT]
> This is not affiliated or endorsed with KDE or KDE e.V. in any way.

# Technical Highlights
* **Custom Window Manager**: Engineered a reactive window management system that handles window state, positioning, and lifecycle directly within the browser.
* **Modular Component Architecture**: Built a scalable UI system in Svelte, separating logic from presentation for complex elements like the Desktop, Panel, and App Launcher.
* **State-Driven Application Ecosystem**:
  * **State Management**: Utilized custom TypeScript stores to synchronize complex UI state across the desktop, panel, and active applications.
  * **Application Framework**: Developed a reusable foundation for desktop applications, including:
    * *About*: Portfolio information and project documentation.
    * *Dolphin*: File-based project navigation.
    * *Konsole*: Terminal-style interface.
    * *System Settings*: Persistent configuration and theme management.

# Getting started
> [!NOTE]
> [pnpm](https://pnpm.io) is used in this example.  
1. Clone the repository
   ```bash
   git clone https://github.com/imthe_tommylong/portfolio
   ```
2. Install dependencies
   ```bash
   pnpm install
   ```
3. Start the development server
```bash
pnpm dev
```

Or alternatively, build the project
```bash
pnpm build
```

# Why?
This project is an engineering exercise in recreating a complex, state-heavy desktop environment within the browser. By porting the look, feel, and logic of KDE Plasma into Svelte, I’ve demonstrated the ability to:

* Manage complex reactive state in large-scale frontend applications.
* Implement custom window management logic using modular component design.
* Build a cohesive, OS-like experience that maintains performance and usability.

# Licensing
This project is licensed under the MIT License.

KDE® and the K Desktop Environment® logo are registered trademarks of KDE e.V.  
Icons located in `/public/icons` are sourced from the KDE Breeze icon set, licensed under LGPLv3.0-only.