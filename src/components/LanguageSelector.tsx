import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Language {
  id: string;
  name: string;
  icon: string;
}

const languages: Language[] = [
  { id: "python", name: "Python", icon: "🐍" },
  { id: "javascript", name: "JavaScript", icon: "🟨" },
  { id: "typescript", name: "TypeScript", icon: "🔷" },
  { id: "java", name: "Java", icon: "☕" },
  { id: "cpp", name: "C++", icon: "⚡" },
  { id: "c", name: "C", icon: "🔧" },
  { id: "csharp", name: "C#", icon: "💜" },
  { id: "go", name: "Go", icon: "🐹" },
  { id: "rust", name: "Rust", icon: "🦀" },
  { id: "ruby", name: "Ruby", icon: "💎" },
  { id: "php", name: "PHP", icon: "🐘" },
  { id: "swift", name: "Swift", icon: "🍎" },
  { id: "kotlin", name: "Kotlin", icon: "🎯" },
];

interface LanguageSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const LanguageSelector = ({ value, onChange }: LanguageSelectorProps) => {
  const selectedLang = languages.find((l) => l.id === value);

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[180px] bg-secondary border-border text-foreground">
        <SelectValue>
          <span className="flex items-center gap-2">
            <span>{selectedLang?.icon}</span>
            <span>{selectedLang?.name}</span>
          </span>
        </SelectValue>
      </SelectTrigger>
      <SelectContent className="bg-card border-border">
        {languages.map((lang) => (
          <SelectItem
            key={lang.id}
            value={lang.id}
            className="text-foreground hover:bg-secondary focus:bg-secondary"
          >
            <span className="flex items-center gap-2">
              <span>{lang.icon}</span>
              <span>{lang.name}</span>
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default LanguageSelector;
