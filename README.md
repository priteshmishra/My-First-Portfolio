<<<<<<< HEAD
# BIOVERSE: QUANTUM ORGANISM
### Immersive 3D Computational Biology Portfolio & Scientific Visualization Platform

**Project Owner:** Pritesh Mishra  
**Academic Program:** BTech Biotechnology, Lovely Professional University (LPU)  
**Academic Course:** BTY100M — Professional Portfolio Development  
**Career Direction:** Bioinformatics / Computational Biology  
**Visual Identity:** Deep Charcoal / Space Black (`#030712`) + Luminous Cyan (`#00f0ff`) + Ultraviolet (`#8b5cf6`)  
**Design Concept:** Quantum Organism

---

## 1. Overview

**BIOVERSE: QUANTUM ORGANISM** is a production-quality, responsive 3D web experience that unites an immersive biological exploration environment with a rigorous academic portfolio and browser-based bioinformatics workstations.

### Key Features
- **Cinematic Cell-to-Genome Biological Journey**: Smooth interactive progression from a translucent cellular membrane -> cytoplasm and organelles -> nucleus -> chromatin -> procedural DNA double helix -> 2D nucleotide stream -> computational lab.
- **GPU Instanced Particle Physics & Force Field**: Thousands of particles reacting in real-time to pointer movement (attraction/repulsion), click-triggered radial shockwave impulses, and spring damping.
- **Biomolecular Rigid-Body Collision Sandbox**: Interactive 3D playground featuring biological vesicles, viral capsids, and protein globules with adjustable gravity, elasticity, damping, object spawning, and wireframe views.
- **Interactive DNA Sequence Lab**: Client-side sequence validator, nucleotide frequency counter, GC/AT% skew calculator, reverse-complement generator, and regex/restriction site motif finder with pre-loaded biological sequences (Human Insulin, GFP chromophore, cloning vectors, SARS-CoV-2 RBD).
- **3D Macromolecular Structure Explorer (PDB)**: Real-time crystallographic coordinate parser rendering experimental structures (1BNA B-DNA, 1CRN Crambin, Caffeine, and live RCSB PDB fetching) in Ball-and-Stick, Space-filling (VDW), and Ribbon/Backbone modes.
- **Transcriptomic Expression Heatmap Explorer**: Interactive gene expression matrix across 10 genes and 8 biological stress/drug conditions with log2 fold-change color mapping, Z-scores, tooltips, and search filtering.
- **Bioinformatics Terminal**: Interactive simulated CLI terminal executing local analysis commands (`sequence`, `gc-content`, `reverse-complement`, `count-bases`, `motif`, `about`, `skills`, `projects`, `stats`, `date`, `clear`) with command history.
- **Career Skill Constellation**: Interactive 3D graph connecting biological principles, programming languages, and genomic algorithms, with an accessible 2D card/list toggle.
- **Academic Integrity**: Honest presentation of coursework, research notes with real scientific literature citations (Watson & Crick 1953, Altschul BLAST 1990, Berman PDB 2000), transparent project statuses, and clean empty states for verified credentials.
- **Zero Paid Dependencies & Pure Offline Operation**: Built with WebGL, Web Audio API procedural sound synthesis (0KB audio downloads, muted by default), and bundled offline PDB coordinates.

---

## 2. System Requirements

- **Node.js**: `v18.0.0` or higher (tested on Node.js `v25.8.0`)
- **Package Manager**: `npm` (v9.0.0 or higher) or `pnpm` / `yarn`
- **Modern Web Browser**: Chrome, Edge, Firefox, Safari (WebGL 2.0 supported). A full vector 2D fallback is automatically provided if WebGL is disabled.

---

## 3. Installation & Setup

1. **Clone or navigate to the repository:**
   ```bash
   cd d:/pritesh
   ```

2. **Install all required dependencies:**
   ```bash
   npm install
   ```

---

## 4. Running the Project

### Development Server
Start the local Vite development server with Hot Module Replacement (HMR):
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:3000`.

### Running Unit Tests
Execute the automated Vitest test suite covering sequence algorithms, terminal commands, and gene expression normalization:
```bash
npm run test
```

To run tests in interactive watch mode:
```bash
npm run test:watch
```

### Type Checking & Linting
Verify TypeScript types across the entire codebase without emitting build artifacts:
```bash
npm run lint
```

### Production Build
Generate optimized static production bundles in the `dist/` directory:
```bash
npm run build
```

### Preview Production Build
Serve the production bundle locally to test final asset paths and loading performance:
```bash
npm run preview
```

---

## 5. Editing Portfolio Content

All student profile data, educational records, projects, and research notes are strictly separated from presentation logic in editable configuration files:

- **Personal & Academic Profile**: Edit `src/data/portfolioData.ts` to update degree name, course code, bio paragraphs, and contact email.
- **Skills & Competencies**: Edit `src/data/skillsData.ts` to update competencies, learning statuses (`Exploring`, `Learning`, `Practiced`, `Demonstrated`), or 3D graph coordinates.
- **Projects**: Edit `src/data/projectsData.ts` to add new academic projects, update methodologies, limitations, or repository links.
- **Research Notebook**: Edit `src/data/researchData.ts` to add literature review entries, study notes, and scientific citations.
- **Sample Sequences**: Edit `src/data/sampleSequences.ts` to add FASTA records.
- **Expression Matrix**: Edit `src/data/sampleExpressionData.ts` to configure gene expression values and experimental conditions.

---

## 6. Configuring Visual Themes & Performance

- **Themes**: Click the Sun/Moon icon in the navigation bar to toggle between the **Dark Cinematic Laboratory** (`#030712`) and the **Light Scientific Workspace** (`#f8fafc`).
- **Sound**: Procedural audio is strictly **muted by default**. Click the speaker icon to enable real-time Web Audio API harmonic sound feedback.
- **Quality Tiers**: Click the quality button in the navigation bar to switch between `LOW` (2,500 particles, DPR 1), `MEDIUM` (6,000 particles, DPR 1.5), and `HIGH` (14,000 particles, DPR 2).
- **Reduced Motion**: Respects the user's operating system `prefers-reduced-motion` setting and can be toggled manually in the controls menu.

---

## 7. Easter Eggs & Discovery

1. **Konami Code**: Type `↑ ↑ ↓ ↓ ← → ← → B A` anywhere on the page (outside input fields) to trigger a quantum resonance ultraviolet excitation with celebratory confetti!
2. **Hidden Molecule**: In the 3D cell opening view, locate the small golden octahedron floating near the mitochondria to uncover an educational fact on quantum coherence in biology.
3. **Particle Signature**: In the Hero section, click "Assemble Particle Signature" to watch particles gather into a stylized Bioverse mathematical glyph before returning to equilibrium.

---

## 8. Free Static Hosting Deployment

The application is structured with relative asset paths (`base: './'`) and requires zero backend servers or commercial API keys.

### Recommended Path: Cloudflare Pages
1. Push your repository to GitHub.
2. In the Cloudflare Dashboard, navigate to **Workers & Pages** &rarr; **Create application** &rarr; **Pages** &rarr; **Connect to Git**.
3. Configure the build settings:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Build Output Directory**: `dist`
4. Click **Save and Deploy**. Your site will be live on a fast, global CDN with automatic HTTPS.

### Alternative Path: GitHub Pages
1. In `package.json`, ensure the repository name matches your GitHub repository.
2. Run `npm run build`.
3. Deploy the contents of the `dist/` directory to your `gh-pages` branch using the `gh-pages` CLI or a standard GitHub Actions workflow (`.github/workflows/deploy.yml`).

---

## 9. Academic Integrity Disclosure

- **Authentic Credentials**: No fictitious degrees, fabricated CGPAs, invented research papers, or unearned certificates are displayed.
- **Scientific Labeling**: Procedural 3D models (such as the artistic cell and procedural DNA double helix) are transparently demarcated from experimentally measured crystallographic coordinates (PDB files).
- **Educational Scope**: Sequence analysis tools and transcriptomic heatmaps are designed for academic exploration and educational demonstration, not for clinical medical diagnosis.
=======
# My-First-Portfolio
About my  bachelor's Journey
>>>>>>> e6cfcfa1b1b2d9c23c686a2c3383d46ea58af047
