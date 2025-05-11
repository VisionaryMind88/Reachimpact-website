import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type LanguageSelectorProps = {
  mobile?: boolean;
}

const LanguageSelector = ({ mobile = false }: LanguageSelectorProps) => {
  const { language, setLanguage, languages } = useLanguage();

  if (mobile) {
    return (
      <Select value={language} onValueChange={(value) => setLanguage(value)}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder={languages[language].nativeName} />
        </SelectTrigger>
        <SelectContent>
          {Object.entries(languages).map(([code, details]) => (
            <SelectItem key={code} value={code}>
              {details.nativeName}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          className="flex items-center text-neutral-600 hover:text-primary-600 font-medium"
        >
          <span>{language.toUpperCase()}</span>
          <ChevronDown className="ml-1 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        {Object.entries(languages).map(([code, details]) => (
          <DropdownMenuItem 
            key={code} 
            className="cursor-pointer"
            onClick={() => setLanguage(code)}
          >
            {details.nativeName}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSelector;
