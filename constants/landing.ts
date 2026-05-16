import { Shield, Globe, Zap } from 'lucide-react';

export const FEATURES_DATA = [
  { 
    icon: Shield, 
    title: "Encrypted Vaults", 
    desc: "Save snapshots locally or sync them to our zero-knowledge cloud. Your browsing architecture is protected by industry-standard encryption."
  },
  { 
    icon: Globe, 
    title: "Broadcast Mode", 
    desc: "Convert any stack into a beautiful, shareable directory. Perfect for resource sharing, project handoffs, and content curation."
  },
  { 
    icon: Zap, 
    title: "Atomic Sync", 
    desc: "Our custom sync engine handles thousands of tabs with near-zero latency. Work across unlimited profiles with total state parity."
  }
];

export const STATS_DATA = [
  { label: 'Cloud Sync', value: 'Instant' },
  { label: 'Encryption', value: 'Zero-Knowledge' },
  { label: 'Latency', value: '<50ms' },
  { label: 'Privacy', value: 'Uncompromising' },
];
