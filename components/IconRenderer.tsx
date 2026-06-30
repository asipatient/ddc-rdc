import {
  Baby,
  BookOpen,
  BriefcaseBusiness,
  CalendarDays,
  ChartNoAxesColumnIncreasing,
  ClipboardCheck,
  CircleDollarSign,
  FileText,
  GraduationCap,
  Globe2,
  Handshake,
  HeartHandshake,
  Landmark,
  Layers,
  Leaf,
  Mail,
  Map,
  Megaphone,
  Network,
  Newspaper,
  Palette,
  Radar,
  Scale,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  Users
} from "lucide-react";
import type { IconKey } from "@/lib/site-data";

const iconMap = {
  book: BookOpen,
  users: Users,
  briefcase: BriefcaseBusiness,
  shield: ShieldCheck,
  leaf: Leaf,
  radar: Radar,
  heart: HeartHandshake,
  sparkles: Sparkles,
  search: Search,
  palette: Palette,
  handshake: Handshake,
  scale: Scale,
  target: Target,
  globe: Globe2,
  landmark: Landmark,
  graduation: GraduationCap,
  megaphone: Megaphone,
  network: Network,
  child: Baby,
  layers: Layers,
  mail: Mail,
  calendar: CalendarDays,
  donate: CircleDollarSign,
  file: FileText,
  newspaper: Newspaper,
  map: Map,
  clipboard: ClipboardCheck,
  chart: ChartNoAxesColumnIncreasing,
  hands: Handshake
};

export function IconRenderer({ icon, className }: { icon: IconKey; className?: string }) {
  const Icon = iconMap[icon];
  return <Icon aria-hidden="true" className={className} strokeWidth={1.8} />;
}
