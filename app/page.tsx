"use client";

import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { Languages } from "lucide-react";
import Confetti from "react-confetti";
import { AuthButtons } from "@/components/auth/auth-buttons";
import { CharacterDisplay } from "@/components/character-display";
import { OptionButton } from "@/components/option-button";
import { SettingsDialog } from "@/components/settings-dialog";
import { hiragana, katakana, type Character } from "@/lib/characters";
import { useLanguage } from "@/contexts/language-context";
import { useProgress } from "@/contexts/progress-context";
import { useSettings } from "@/contexts/settings-context";
import { useAuth } from "@/contexts/auth-context";
import { Progress } from "@/components/ui/progress";

export default function Home() {
  const [currentChar, setCurrentChar] = useState<Character | null>(null);
  const [options, setOptions] = useState<string[]>([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [characterSet, setCharacterSet] = useState<Character[]>(hiragana);
  const [currentRow, setCurrentRow] = useState<string>("a");
  const [correctCount, setCorrectCount] = useState(0);
  const [currentMode, setCurrentMode] = useState<"hiragana" | "katakana">(
    "hiragana"
  );
  const { toast } = useToast();
  const { t } = useLanguage();
  const { progress, setProgress } = useProgress();
  const { charactersPerRow } = useSettings();
  const { user } = useAuth();

  const availableRows = Array.from(
    new Set(characterSet.map((char) => char.row))
  ).sort();
  const currentRowCharacters = characterSet.filter(
    (char) => char.row === currentRow
  );
  const progressValue = (correctCount / charactersPerRow) * 100;

  const generateOptions = (correct: string) => {
    const allRomaji = characterSet.map((c) => c.romaji);
    const wrongOptions = allRomaji
      .filter((r) => r !== correct)
      .sort(() => Math.random() - 0.5)
      .slice(0, 5);
    return [...wrongOptions, correct].sort(() => Math.random() - 0.5);
  };

  const selectNewCharacter = () => {
    const rowCharacters = characterSet.filter(
      (char) => char.row === currentRow
    );
    if (rowCharacters.length === 0) return;

    const newChar =
      rowCharacters[Math.floor(Math.random() * rowCharacters.length)];
    setCurrentChar(newChar);
    setOptions(generateOptions(newChar.romaji));
  };

  useEffect(() => {
    if (progress && progress[currentMode]) {
      const currentProgress = progress[currentMode];
      setCurrentRow(currentProgress.currentRow);
      setCorrectCount(currentProgress.correctCount);
    }
  }, [progress, currentMode]);

  useEffect(() => {
    selectNewCharacter();
  }, [characterSet, currentRow]);

  const handleRowCompletion = () => {
    const currentIndex = availableRows.indexOf(currentRow);
    if (currentIndex < availableRows.length - 1) {
      setShowConfetti(true);
      toast({
        title: t("rowCompleted"),
        description: t("movingToNextRow"),
      });

      setTimeout(() => {
        setShowConfetti(false);
        const nextRow = availableRows[currentIndex + 1];
        setCurrentRow(nextRow);
        setCorrectCount(0);

        setProgress(currentMode, {
          currentRow: nextRow,
          correctCount: 0,
          characterSet: currentMode,
        });
      }, 2000);
    }
  };

  const handleCorrectAnswer = (currentChar: Character) => {
    const newCount = correctCount + 1;
    setCorrectCount(newCount);

    setProgress(currentMode, {
      currentRow,
      correctCount: newCount,
      characterSet: currentMode,
    });

    if (newCount >= charactersPerRow) {
      handleRowCompletion();
    } else {
      toast({
        title: `${t("correct")} 正解!`,
        description: `${currentChar.char} ${t("is")} "${currentChar.romaji}"`,
        duration: 1000,
      });
      setTimeout(selectNewCharacter, 1000);
    }
  };

  const handleAnswer = (selected: string) => {
    if (!currentChar) return;

    if (selected === currentChar.romaji) {
      handleCorrectAnswer(currentChar);
    } else {
      toast({
        title: `${t("tryAgain")} もう一度!`,
        description: t("notQuiteRight"),
        variant: "destructive",
        duration: 1000,
      });
    }
  };

  const handleTabChange = (value: "hiragana" | "katakana") => {
    setCurrentMode(value);
    setCharacterSet(value === "hiragana" ? hiragana : katakana);

    if (progress && progress[value]) {
      const selectedProgress = progress[value];
      setCurrentRow(selectedProgress.currentRow);
      setCorrectCount(selectedProgress.correctCount);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
      {showConfetti && <Confetti />}
      <div className="container mx-auto px-4 py-8">
        <header className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-2">
            <Languages className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Hirabolta
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <AuthButtons />
            <SettingsDialog />
          </div>
        </header>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">
            Current Row: {currentRow.toUpperCase()}
          </h2>
          <Progress value={progressValue} className="h-2" />
        </div>

        <Tabs
          defaultValue="hiragana"
          className="w-full"
          onValueChange={handleTabChange}
        >
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="hiragana">Hiragana</TabsTrigger>
            <TabsTrigger value="katakana">Katakana</TabsTrigger>
          </TabsList>

          <TabsContent value="hiragana" className="space-y-8">
            <Card className="p-6">
              {currentChar && <CharacterDisplay character={currentChar.char} />}
              <div className="grid grid-cols-2 gap-4">
                <AnimatePresence mode="wait">
                  {options.map((option, index) => (
                    <OptionButton
                      key={`${option}-${index}`}
                      option={option}
                      index={index}
                      onClick={() => handleAnswer(option)}
                    />
                  ))}
                </AnimatePresence>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="katakana" className="space-y-8">
            <Card className="p-6">
              {currentChar && <CharacterDisplay character={currentChar.char} />}
              <div className="grid grid-cols-2 gap-4">
                <AnimatePresence mode="wait">
                  {options.map((option, index) => (
                    <OptionButton
                      key={`${option}-${index}`}
                      option={option}
                      index={index}
                      onClick={() => handleAnswer(option)}
                    />
                  ))}
                </AnimatePresence>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
