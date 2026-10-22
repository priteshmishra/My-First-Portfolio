# BIOVERSE — 3D Biotechnology & Computational Biology Portfolio

> **"Exploring Life Through Science and Computation."**

**BIOVERSE** is a production-quality, responsive 3D biotechnology portfolio website owned by **Pritesh Kumar Mishra**, a first-year undergraduate student pursuing a **Bachelor of Technology (B.Tech) in Biotechnology** at **Lovely Professional University (LPU)**, India.

The platform serves two primary purposes:
1. An assessment-ready digital portfolio fulfilling the university's professional portfolio requirements.
2. A distinctive personal academic brand that communicates a genuine curiosity and disciplined dedication to bioinformatics, computational biology, genetics, and scientific data visualization.

---

## 1. Design Vision & Aesthetic Direction

BIOVERSE is designed with a **premium, minimal, clinical-scientific aesthetic**, harmonizing:
- A peer-reviewed modern scientific research publication.
- A sophisticated molecular visualization environment.
- A clean, interactive digital laboratory.
- An accessible, high-performance web portfolio.

### The Color System (Dual Light & Dark Modes)
All UI surfaces and typography strictly adhere to the defined scientific design tokens:
- **Light Mode Background:** `#F7F9FC` (Ultra-clean clinical slate)
- **Dark Mode Background:** `#0A0F17` (Deep celestial bioluminescent dark space)
- **Primary Surfaces:** `#FFFFFF` (Light) / `#101722` (Dark) with Apple frosted glassmorphism (`backdrop-filter: blur(24px) saturate(190%)`)
- **Main Text:** `#202938` (Light) / `#F1F5F9` (Dark, high contrast)
- **Secondary Text:** `#64748B` (Light) / `#94A3B8` (Dark)
- **Primary Accent:** `#00BCD4` / `#00E5FF` (Clinical cyan accent)
- **Supporting Accent:** `#7966D8` / `#8B77EB` (Restrained violet accent)
- **Dark Scientific Lab Viewport:** `#101722` (High-contrast dark viewport for 3D macromolecular structures)

### Typography
- **Primary Interface:** Inter / Manrope (Clean modern sans-serif with readable paragraph widths)
- **Technical & Scientific Annotations:** IBM Plex Mono (Monospace font for coordinates, FASTA sequences, and metadata tags)

---

## 2. Profile Identity & Academic Transparency

- **Full Name:** Pritesh Kumar Mishra
- **Brand:** BIOVERSE
- **Degree Program:** B.Tech Biotechnology
- **Institution:** Lovely Professional University (LPU), Punjab, India
- **Academic Standing:** First Year Undergraduate
- **Career Direction:** Bioinformatics / Computational Biology
- **GitHub:** [https://github.com/priteshmishra](https://github.com/priteshmishra)
- **LinkedIn:** [https://in.linkedin.com/in/pritesh-mishra-4b109a373](https://in.linkedin.com/in/pritesh-mishra-4b109a373)

### Content Integrity Standard
In strict accordance with academic ethics:
- **No fabricated achievements:** Zero invented publications, GPAs, degrees, awards, or fake certificates.
- **Honest status indicators:**
  - `Learning`: Coursework or biological topics currently being studied in first year.
  - `Planned`: Rigorously structured project concepts formulated for future implementation.
  - `In progress`: Work that has actively begun and has ongoing code changes.
  - `Completed`: Work that has been verified and fully demonstrated.
- **Privacy preservation:** A direct personal email is not exposed to web scrapers; professional correspondence is routed transparently through LinkedIn.

---

## 3. Website Architecture & Required Sections

The single-page portfolio features seamless anchor navigation and an accessible mobile menu:

1. **Hero Section (`#hero`):**
   - Two-column responsive desktop layout (60% content, 40% interactive 3D canvas).
   - Eyebrow: `BIOTECHNOLOGY STUDENT / BIOINFORMATICS INTERESTS`.
   - Headline: *“Exploring Life Through Science and Computation.”*
   - Supporting statement and primary calls to action (*“Explore My Journey”* and *“Enter the Interactive Lab”*).
   - Academic identity line: `B.Tech Biotechnology • Lovely Professional University (LPU)`.
   - Subtle scroll indicator.

2. **About Section (`#about`):**
   - Title: *“Curious About the Complexity of Life.”*
   - Designed profile placeholder with initials **PM** (no synthetic or AI-generated photos).
   - Detailed biography grounded in honest undergraduate curiosity.
   - Academic details panel and clear learning roadmap goals.

3. **Education Section (`#education`):**
   - Formal editorial timeline presenting Lovely Professional University, B.Tech Biotechnology, First Year.
   - Four-year degree progression roadmap ready to incorporate semester grades and achievements as they are completed.

4. **Skills and Learning Roadmap (`#skills`):**
   - Organized into 6 distinct categories:
     1. Biotechnology Foundations
     2. Molecular and Cell Biology
     3. Genetics and Genomics
     4. Programming & Computational Thinking
     5. Bioinformatics Tools & Biological Data Analysis
     6. Scientific Communication & Research Literacy
   - Interactive status filter (`All`, `Learning`, `In progress`, `Planned`).
   - Clearly documented as an honest personal learning tracker without fake proficiency percentages.

5. **Projects Section (`#projects`):**
   - 4 initial planned inquiry concepts with full scientific rigor:
     1. **DNA Sequence Explorer** — Planned
     2. **Protein Structure Explorer** — Planned
     3. **Biological Data Visualization** — Planned
     4. **Disease Research Literature Map** — Planned
   - Interactive deep-dive modal detailing Objective, Scientific Question, Proposed Methods, and Expected Learning Outcomes for each project.

6. **Interactive Science Lab (`#lab`):**
   - **Workstation 1 (3D Macromolecular Visualizer):** Rotatable 3D procedural B-DNA double helix in a `#101722` dark laboratory viewport with OrbitControls, zoom buttons, reset view, display mode toggles (*Standard*, *Base-Pair Focus*, *Ribbons*), and clickable annotations (*Sugar-Phosphate Backbone*, *Watson-Crick Base Pairs*, *Major Groove*, *Minor Groove*).
   - **Workstation 2 (Sequence Analysis Tool):** Client-side DNA sequence calculation computing sequence length, GC %, AT %, nucleotide counts, estimated molecular weight, and reverse complementation in real-time.

7. **Research Interests (`#research`):**
   - 6 prospective inquiry areas with concise, plain-language explanations for non-specialists and core scientific questions:
     1. Bioinformatics
     2. Computational Biology
     3. Genomics & Biological Sequence Analysis
     4. Molecular Biology
     5. Computational Approaches to Disease Research
     6. Scientific Data Visualization

8. **Contact Section (`#contact`):**
   - Verified links to GitHub and LinkedIn.
   - Transparent academic inquiry simulator for testing message interfaces.
   - Footer with university attribution and smooth back-to-top control.

---

## 4. 3D Implementation & Motion System

### Procedural 3D DNA Helix
- **Engine:** Three.js + React Three Fiber (`@react-three/fiber`) + Drei (`@react-three/drei`).
- **Geometry:** Procedural CatmullRom dual spline tubes for antiparallel sugar-phosphate backbones (Strand 1 in Cyan, Strand 2 in Violet).
- **Base Pairs:** Individual purine-pyrimidine cylinders connecting complementary rungs with central hydrogen bond markers.
- **Lighting:** Three-point studio lighting (Key light, Cyan fill, Violet rim).
- **Interactivity:** Gentle axis rotation (`speed = 0.2`), pointer tilt reaction with smooth damping lerp, and touch-drag rotation.
- **Graceful WebGL Fallback:** When WebGL is unavailable or initialization fails, a vector SVG diagram of the double helix renders automatically with identical annotations and navigation.
- **Performance:** Device pixel ratio capped at 1.5; rendering is automatically paused when scrolled outside the viewport using `useIntersectionVisibility`.

### Motion & Effects
- **Cursor Glow:** Soft desktop ambient highlight following pointer with requestAnimationFrame (disabled on touch and when reduced motion is preferred).
- **Card Tilt:** Subtle 3D perspective tilt (< 5 degrees) on desktop cards with fine pointers.
- **Click Ripples:** Micro-ripples on buttons with automatic DOM cleanup.
- **Scroll Reveals:** Restrained fade-and-translate animations triggered via `IntersectionObserver`.
- **Accessibility:** Full `prefers-reduced-motion` support; users can toggle motion directly from the navigation bar.

---

## 5. Technology Stack

- **Framework:** React 19 + TypeScript (Strict Type Checking)
- **Bundler:** Vite 6
- **Styling:** Tailwind CSS + Custom Design Tokens
- **3D Graphics:** Three.js, React Three Fiber, React Three Drei
- **Icons:** Lucide React + Accessible Inline SVGs
- **Unit Testing:** Vitest

---

## 6. Local Development & Testing

### Prerequisites
- **Node.js:** v18.0.0 or higher
- **npm:** v9.0.0 or higher

### Commands

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run local development server:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your web browser.

3. **Execute unit tests:**
   ```bash
   npm run test
   ```
   Runs the Vitest test suite validating DNA sequence parsing, nucleotide counts, reverse complementation, and motif searches.

4. **Build for production:**
   ```bash
   npm run build
   ```
   Compiles TypeScript and generates optimized static production assets in the `dist/` directory.

5. **Preview production build locally:**
   ```bash
   npm run preview
   ```

---

## 7. How to Update and Customize

All content is cleanly separated into modular local TypeScript data files in `src/data/`:

### 1. Replacing the Profile Photo
- Place your real headshot photograph at `public/profile.jpg`.
- Open `src/sections/AboutSection.tsx` and replace the initials avatar with an `<img>` tag:
  ```tsx
  <img
    src="/profile.jpg"
    alt="Pritesh Kumar Mishra"
    className="w-28 h-28 rounded-2xl object-cover border-2 border-bio-cyan/40 shadow-card"
  />
  ```

### 2. Updating Profile Details & Bio
- Open `src/data/profile.ts`.
- Update your bio paragraphs, academic year, degree title, or institution.

### 3. Updating Skills and Roadmap
- Open `src/data/skills.ts`.
- Edit any skill entry:
  - Change status from `'Learning'` to `'In progress'` or `'Completed'`.
  - Add newly studied concepts to `coreConcepts`.

### 4. Adding a Real Completed Project
- Open `src/data/projects.ts`.
- Add a new project object or update an existing one:
  ```ts
  {
    id: 'my-genomic-tool',
    title: 'Genomic Variant Visualizer',
    category: 'Bioinformatics & Sequence Analysis',
    status: 'Completed', // Change status to Completed
    summary: 'A verified tool analyzing VCF files.',
    objective: '...',
    scientificQuestion: '...',
    proposedMethods: ['...'],
    expectedLearningOutcomes: ['...'],
    toolsPlanned: ['Python', 'BioPython', 'React'],
    repositoryUrl: 'https://github.com/priteshmishra/my-genomic-tool', // Add real GitHub link
    liveDemoUrl: 'https://priteshmishra.github.io/my-genomic-tool'       // Add live URL
  }
  ```

### 5. Updating Social & Research Links
- Social links: Update `github` and `linkedin` fields in `src/data/profile.ts`.
- Research areas: Add or modify topics in `src/data/research.ts`.

---

## 8. Free Static Hosting Deployment

The website produces pure static HTML, CSS, JavaScript, and assets in the `dist/` folder, requiring **zero server-side code or databases**.

### Option A: Cloudflare Pages (Recommended)
1. Push your code to your GitHub repository:
   ```bash
   git add .
   git commit -m "Build BIOVERSE 3D portfolio"
   git push origin main
   ```
2. Log in to [Cloudflare Dashboard](https://dash.cloudflare.com/) and navigate to **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**.
3. Select your repository `pritesh` (or your chosen repository name).
4. Configure Build settings:
   - **Framework preset:** `Vite`
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
5. Click **Save and Deploy**. Cloudflare automatically serves the portfolio globally with free SSL, HTTP/3, and edge caching.

### Option B: GitHub Pages
1. The repository is pre-configured with `base: './'` in `vite.config.ts`, ensuring all script and asset URLs resolve properly under repository subpaths (e.g. `https://priteshmishra.github.io/bioverse/`).
2. In your repository on GitHub, go to **Settings** > **Pages**.
3. Under **Build and deployment** > **Source**, choose **GitHub Actions**.
4. Create a file `.github/workflows/deploy.yml`:
   ```yaml
   name: Deploy BIOVERSE to GitHub Pages

   on:
     push:
       branches: ['main']
     workflow_dispatch:

   permissions:
     contents: read
     pages: write
     id-token: write

   concurrency:
     group: 'pages'
     cancel-in-progress: true

   jobs:
     build-and-deploy:
       environment:
         name: github-pages
         url: ${{ steps.deployment.outputs.page_url }}
       runs-on: ubuntu-latest
       steps:
         - name: Checkout repository
           uses: actions/checkout@v4

         - name: Set up Node.js
           uses: actions/setup-node@v4
           with:
             node-version: 20
             cache: 'npm'

         - name: Install dependencies
           run: npm ci

         - name: Build static site
           run: npm run build

         - name: Setup Pages
           uses: actions/configure-pages@v4

         - name: Upload artifact
           uses: actions/upload-pages-artifact@v3
           with:
             path: 'dist'

         - name: Deploy to GitHub Pages
           id: deployment
           uses: actions/deploy-pages@v4
   ```
5. Commit and push this file. GitHub Actions will build and deploy the site automatically.

---

## 9. Academic Attribution & Scientific Citations

All molecular representations and algorithmic formulas are based on established scientific literature:
- **Watson, J. D., & Crick, F. H. (1953).** *Molecular structure of nucleic acids: a structure for deoxyribose nucleic acid.* Nature, 171(4356), 737–738.
- **Drew, H. R., & Dickerson, R. E. (1981).** *Structure of a B-DNA dodecamer: conformation and dynamics (1BNA).* PNAS, 78(4), 2179–2183.
- **Needleman, S. B., & Wunsch, C. D. (1970).** *A general method applicable to the search for similarities in the amino acid sequence of two proteins.* J. Mol. Biol., 48(3), 443–453.

---

## 10. License

This project is created for academic and personal portfolio demonstration. Code is available under the MIT License.
