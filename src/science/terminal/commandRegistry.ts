import {
  validateSequence,
  calculateNucleotideCounts,
  calculateGCPercentage,
  calculateReverseComplement,
  searchMotif,
} from '../sequence/sequenceUtils';

export interface CommandOutput {
  type: 'success' | 'error' | 'info' | 'system';
  lines: string[];
}

export type CommandHandler = (args: string[]) => CommandOutput;

const COMMANDS: Record<string, { description: string; usage: string; handler: CommandHandler }> = {
  help: {
    description: 'Display available bioinformatics and portfolio commands',
    usage: 'help [command]',
    handler: (args) => {
      if (args.length > 0) {
        const cmd = args[0].toLowerCase();
        const entry = COMMANDS[cmd];
        if (entry) {
          return {
            type: 'info',
            lines: [
              `Command: ${cmd}`,
              `Usage:   ${entry.usage}`,
              `Details: ${entry.description}`,
            ],
          };
        }
        return {
          type: 'error',
          lines: [`Unknown command "${cmd}". Type "help" to view all supported commands.`],
        };
      }

      const lines = [
        'BIOVERSE BIOINFORMATICS TERMINAL [v1.0.0-PROD]',
        'Type any command below followed by arguments:',
        '',
        '--- GENOMIC ANALYSIS COMMANDS ---',
        '  sequence <seq>          - Perform comprehensive nucleotide analysis',
        '  gc-content <seq>        - Calculate GC percentage of sequence',
        '  reverse-complement <seq>- Compute 5\'->3\' reverse-complement strand',
        '  count-bases <seq>       - Display individual A, T, G, C frequencies',
        '  motif <pattern> <seq>   - Search for motif/restriction site occurrences',
        '',
        '--- ACADEMIC & SYSTEM COMMANDS ---',
        '  about                   - Information on Pritesh Mishra & academic background',
        '  skills                  - Overview of core computational biology competencies',
        '  projects                - List portfolio research projects & completion status',
        '  stats                   - Display simulated runtime environment metrics',
        '  date                    - Output current system timestamp',
        '  clear                   - Clear the terminal screen',
        '',
        'Tip: You can use the Up/Down arrow keys to cycle through command history.',
      ];
      return { type: 'info', lines };
    },
  },

  about: {
    description: 'Display academic profile, university, and career focus',
    usage: 'about',
    handler: () => ({
      type: 'success',
      lines: [
        'NAME:             Pritesh Mishra',
        'ACADEMIC PROGRAM: BTech Biotechnology',
        'INSTITUTION:      Lovely Professional University (LPU), Punjab, India',
        'COURSE MODULE:    BTY100M — Professional Portfolio Development',
        'CAREER FOCUS:     Bioinformatics & Computational Biology',
        'FOCUS AREAS:      Macromolecular Modeling, Algorithmic Genomics, Scientific Viz',
        '',
        'MOTIVATION:       Connecting molecular biological principles with computational',
        '                  algorithms, open data formats (PDB/FASTA), and real-time WebGL graphics.',
      ],
    }),
  },

  skills: {
    description: 'List bioinformatics and biotechnology competencies',
    usage: 'skills',
    handler: () => ({
      type: 'info',
      lines: [
        'CORE COMPETENCY CONSTELLATION:',
        '  [Demonstrated] Python for Science (NumPy, BioPython, automation)',
        '  [Demonstrated] Sequence Analysis (GC/AT skew, reverse complement, motifs)',
        '  [Demonstrated] 3D Scientific Graphics (Three.js, WebGL, procedural DNA)',
        '  [Practiced]    Molecular Biology (Replication, transcription, central dogma)',
        '  [Practiced]    Biochemistry & Enzymology (Protein hierarchy, kinetics)',
        '  [Practiced]    Structural Bioinformatics (PDB coordinate parsing, CPK)',
        '  [Practiced]    Transcriptomics (Log2 fold-change heatmaps, z-scores)',
        '  [Learning]     Algorithms & Data Structures (Dynamic programming, KMP)',
        '  [Exploring]    NGS Pipelines (Nextflow, FastQC, variant workflows)',
      ],
    }),
  },

  projects: {
    description: 'List academic portfolio projects and their current status',
    usage: 'projects',
    handler: () => ({
      type: 'info',
      lines: [
        'PORTFOLIO RESEARCH PROJECTS:',
        '  1. DNA Sequence Analysis Toolkit        [STATUS: Completed]',
        '     - Algorithmic nucleotide stats, reverse-complement, motif regex',
        '  2. 3D Macromolecular Structure Explorer [STATUS: Completed]',
        '     - PDB parsing: Ball & Stick, Spacefill, Ribbon backbone',
        '  3. Transcriptomic Expression Heatmap    [STATUS: Completed]',
        '     - Interactive stress response matrix with log2 fold-changes',
        '  4. High-Throughput RNA-Seq Pipeline     [STATUS: Planned]',
        '     - Containerized Nextflow workflow for FASTQ alignment',
        '  5. Molecular Docking Simulation         [STATUS: Planned]',
        '     - AutoDock Vina active-site binding pocket screening',
      ],
    }),
  },

  sequence: {
    description: 'Comprehensive analysis of a DNA sequence',
    usage: 'sequence <ATGC...>',
    handler: (args) => {
      const raw = args.join('');
      const val = validateSequence(raw);
      if (!val.isValid) {
        return { type: 'error', lines: [val.error || 'Invalid sequence input.'] };
      }
      const seq = val.normalized;
      const counts = calculateNucleotideCounts(seq);
      const gc = calculateGCPercentage(counts);
      const rc = calculateReverseComplement(seq);

      return {
        type: 'success',
        lines: [
          `SEQUENCE LENGTH:    ${seq.length} bp`,
          `NUCLEOTIDE COUNTS:  A: ${counts.A} | T: ${counts.T} | G: ${counts.G} | C: ${counts.C}${counts.other > 0 ? ` | Other: ${counts.other}` : ''}`,
          `GC CONTENT:         ${gc}%`,
          `AT CONTENT:         ${(100 - gc).toFixed(2)}%`,
          `5'->3' COMPLEMENT:  ${rc.split('').reverse().join('')}`,
          `3'->5' REV-COMP:    ${rc}`,
          `SAMPLE STRAND:      ${seq.length > 40 ? seq.substring(0, 40) + '...' : seq}`,
        ],
      };
    },
  },

  'gc-content': {
    description: 'Compute GC percentage of a DNA sequence',
    usage: 'gc-content <ATGC...>',
    handler: (args) => {
      const raw = args.join('');
      const val = validateSequence(raw);
      if (!val.isValid) {
        return { type: 'error', lines: [val.error || 'Invalid sequence input.'] };
      }
      const counts = calculateNucleotideCounts(val.normalized);
      const gc = calculateGCPercentage(counts);
      return {
        type: 'success',
        lines: [
          `Sequence Length: ${val.normalized.length} bp`,
          `Guanine (G): ${counts.G} | Cytosine (C): ${counts.C}`,
          `GC Content: ${gc}%`,
        ],
      };
    },
  },

  'reverse-complement': {
    description: 'Generate reverse complement strand of DNA',
    usage: 'reverse-complement <ATGC...>',
    handler: (args) => {
      const raw = args.join('');
      const val = validateSequence(raw);
      if (!val.isValid) {
        return { type: 'error', lines: [val.error || 'Invalid sequence input.'] };
      }
      const rc = calculateReverseComplement(val.normalized);
      return {
        type: 'success',
        lines: [
          `Input (5'->3'):   ${val.normalized}`,
          `Rev-Comp (5'->3'):${rc}`,
        ],
      };
    },
  },

  'count-bases': {
    description: 'Count nucleotide frequencies in sequence',
    usage: 'count-bases <ATGC...>',
    handler: (args) => {
      const raw = args.join('');
      const val = validateSequence(raw);
      if (!val.isValid) {
        return { type: 'error', lines: [val.error || 'Invalid sequence input.'] };
      }
      const counts = calculateNucleotideCounts(val.normalized);
      return {
        type: 'success',
        lines: [
          `Total Bases: ${counts.total}`,
          `Adenine (A):  ${counts.A} (${((counts.A / counts.total) * 100).toFixed(1)}%)`,
          `Thymine (T):  ${counts.T} (${((counts.T / counts.total) * 100).toFixed(1)}%)`,
          `Guanine (G):  ${counts.G} (${((counts.G / counts.total) * 100).toFixed(1)}%)`,
          `Cytosine (C): ${counts.C} (${((counts.C / counts.total) * 100).toFixed(1)}%)`,
        ],
      };
    },
  },

  motif: {
    description: 'Search for motif occurrences in sequence',
    usage: 'motif <pattern> <sequence>',
    handler: (args) => {
      if (args.length < 2) {
        return {
          type: 'error',
          lines: ['Usage error. Syntax: motif <pattern> <sequence>', 'Example: motif GAATTC GAATTCGCGGATCCTCT'],
        };
      }
      const pattern = args[0];
      const seqRaw = args.slice(1).join('');
      const val = validateSequence(seqRaw);
      if (!val.isValid) {
        return { type: 'error', lines: [val.error || 'Invalid target sequence.'] };
      }
      const { matches, error } = searchMotif(val.normalized, pattern);
      if (error) {
        return { type: 'error', lines: [error] };
      }
      if (matches.length === 0) {
        return {
          type: 'info',
          lines: [`No occurrences of pattern "${pattern}" found in sequence (${val.normalized.length} bp).`],
        };
      }
      const matchLines = matches.map(
        (m, i) => `  [${i + 1}] Position ${m.position} (index ${m.index}): "${m.match}" (length ${m.length})`
      );
      return {
        type: 'success',
        lines: [
          `Found ${matches.length} occurrence(s) of pattern "${pattern}":`,
          ...matchLines,
        ],
      };
    },
  },

  stats: {
    description: 'Display client-side simulation and browser metrics',
    usage: 'stats',
    handler: () => {
      const memory = (performance as unknown as { memory?: { usedJSHeapSize: number } }).memory;
      const memMb = memory ? (memory.usedJSHeapSize / (1024 * 1024)).toFixed(1) + ' MB' : 'Browser Protected';
      return {
        type: 'info',
        lines: [
          'BIOVERSE QUANTUM RUNTIME TELEMETRY:',
          `  WebGL Context:        Active (Three.js / React Three Fiber)`,
          `  Physics Layer:        Rapier 3D + Instanced Particle Buffer`,
          `  JS Heap Estimate:     ${memMb}`,
          `  Screen Resolution:    ${window.innerWidth} x ${window.innerHeight} px`,
          `  Hardware Concurrency: ${navigator.hardwareConcurrency || 4} threads`,
          `  Platform:             ${navigator.platform}`,
          `  Status:               All systems nominal`,
        ],
      };
    },
  },

  date: {
    description: 'Print current date and time',
    usage: 'date',
    handler: () => ({
      type: 'info',
      lines: [new Date().toUTCString()],
    }),
  },

  clear: {
    description: 'Clear the terminal output',
    usage: 'clear',
    handler: () => ({ type: 'info', lines: ['__CLEAR__'] }),
  },
};

export function executeCommand(inputLine: string): CommandOutput {
  const trimmed = inputLine.trim();
  if (!trimmed) {
    return { type: 'info', lines: [] };
  }

  const tokens = trimmed.split(/\s+/);
  const commandName = tokens[0].toLowerCase();
  const args = tokens.slice(1);

  const command = COMMANDS[commandName];
  if (!command) {
    return {
      type: 'error',
      lines: [
        `Command not recognized: "${commandName}".`,
        'Type "help" to view all available bioinformatics and portfolio commands.',
      ],
    };
  }

  return command.handler(args);
}
