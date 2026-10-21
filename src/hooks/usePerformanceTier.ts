import { useState, useEffect } from 'react';

export type PerformanceTier = 'low' | 'medium' | 'high';

export interface QualityConfig {
  tier: PerformanceTier;
  particleCount: number;
  dpr: number;
  shadows: boolean;
  bloom: boolean;
  rigidBodyCount: number;
}

const TIER_CONFIGS: Record<PerformanceTier, QualityConfig> = {
  low: {
    tier: 'low',
    particleCount: 2000,
    dpr: 1,
    shadows: false,
    bloom: false,
    rigidBodyCount: 6,
  },
  medium: {
    tier: 'medium',
    particleCount: 6000,
    dpr: 1.5,
    shadows: true,
    bloom: true,
    rigidBodyCount: 15,
  },
  high: {
    tier: 'high',
    particleCount: 15000,
    dpr: 2,
    shadows: true,
    bloom: true,
    rigidBodyCount: 30,
  },
};

export function usePerformanceTier() {
  const [tier, setTier] = useState<PerformanceTier>(() => {
    if (typeof window === 'undefined') return 'medium';
    // Auto-detect mobile or low-spec hardware
    const isMobile = /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(navigator.userAgent);
    const cores = navigator.hardwareConcurrency || 4;
    if (isMobile || cores <= 4 || window.innerWidth < 768) {
      return 'low';
    }
    return 'high';
  });

  return {
    tier,
    setTier,
    config: TIER_CONFIGS[tier],
  };
}
