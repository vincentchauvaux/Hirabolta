"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useTheme } from "next-themes";
import { useLanguage } from "@/contexts/language-context";
import { useSettings } from "@/contexts/settings-context";
import { useProgress } from "@/contexts/progress-context";

export function SettingsDialog() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const { theme, setTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const { charactersPerRow, setCharactersPerRow } = useSettings();
  const { setProgress } = useProgress();

  const badges = [
    { name: "初心者 (Beginner)", description: language === 'fr' ? "Début de votre voyage en japonais" : "Started your Japanese journey", achieved: true },
    { name: "ストリーク (Streak)", description: language === 'fr' ? "7 jours d'apprentissage consécutifs" : "7 days learning streak", achieved: true },
    { name: "マスター (Master)", description: language === 'fr' ? "100% de précision pendant une semaine" : "100% accuracy for a week", achieved: false },
  ];
  
  const culturalNotes = {
    en: [
      {
        title: "Origins of Hiragana",
        content: "Hiragana evolved from the cursive script style of Chinese characters (kanji) in the 9th century. It was initially considered 'women's writing' and was used primarily by court ladies during the Heian period.",
      },
      {
        title: "Modern Usage",
        content: "Today, hiragana is the first writing system taught to Japanese children and is used for native Japanese words, grammatical elements, and words without kanji representations.",
      },
      {
        title: "Katakana History",
        content: "Katakana was developed by Buddhist monks as a shorthand for reading Chinese texts. Now it's mainly used for foreign loanwords, emphasis, and technical/scientific terms.",
      },
    ],
    fr: [
      {
        title: "Origines des Hiragana",
        content: "Les hiragana ont évolué à partir du style d'écriture cursive des caractères chinois (kanji) au 9ème siècle. Initialement considérée comme une 'écriture de femmes', elle était principalement utilisée par les dames de la cour pendant la période Heian.",
      },
      {
        title: "Usage Moderne",
        content: "Aujourd'hui, l'hiragana est le premier système d'écriture enseigné aux enfants japonais. Il est utilisé pour les mots japonais natifs, les éléments grammaticaux et les mots sans représentation en kanji.",
      },
      {
        title: "Histoire des Katakana",
        content: "Le katakana a été développé par les moines bouddhistes comme sténographie pour la lecture des textes chinois. Il est maintenant principalement utilisé pour les mots d'emprunt étrangers, l'emphase et les termes techniques/scientifiques.",
      },
    ],
  };

  const practiceData = [
    { date: "2024-03-20", charactersLearned: 15 },
    { date: "2024-03-18", charactersLearned: 10 },
    { date: "2024-03-15", charactersLearned: 8 },
  ];

  const isDayWithPractice = (day: Date) => {
    return practiceData.some(data => data.date === day.toISOString().split('T')[0]);
  };

  const resetProgress = () => {
    setProgress({
      currentRow: "a",
      correctCount: 0,
      characterSet: 'hiragana'
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="hover:bg-blue-100 dark:hover:bg-gray-800">
          <Settings2 className="w-6 h-6" />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[95vw] max-w-4xl h-[90vh] sm:h-[80vh] p-4 sm:p-6">
        <DialogHeader>
          <DialogTitle className="text-xl sm:text-2xl font-bold mb-4">
            {language === 'fr' ? 'Profil & Paramètres' : 'Profile & Settings'}
          </DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="progress" className="w-full h-[calc(100%-4rem)]">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 gap-1 mb-4">
            <TabsTrigger 
              value="progress" 
              className="text-sm sm:text-base px-2 py-1.5 whitespace-nowrap data-[state=active]:bg-blue-100 dark:data-[state=active]:bg-gray-800"
            >
              {t('progress')}
            </TabsTrigger>
            <TabsTrigger 
              value="calendar" 
              className="text-sm sm:text-base px-2 py-1.5 whitespace-nowrap data-[state=active]:bg-blue-100 dark:data-[state=active]:bg-gray-800"
            >
              {t('calendar')}
            </TabsTrigger>
            <TabsTrigger 
              value="culture" 
              className="text-sm sm:text-base px-2 py-1.5 whitespace-nowrap data-[state=active]:bg-blue-100 dark:data-[state=active]:bg-gray-800"
            >
              {t('culturalNotes')}
            </TabsTrigger>
            <TabsTrigger 
              value="settings" 
              className="text-sm sm:text-base px-2 py-1.5 whitespace-nowrap data-[state=active]:bg-blue-100 dark:data-[state=active]:bg-gray-800"
            >
              {t('settings')}
            </TabsTrigger>
          </TabsList>

          <ScrollArea className="h-[calc(100%-3rem)] pr-4">
            <TabsContent value="progress" className="space-y-4 h-full">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <Card className="p-4">
                  <h3 className="font-semibold mb-2">{t('weeklyProgress')}</h3>
                  <Progress value={78} className="mb-2" />
                  <p className="text-sm text-muted-foreground">78% {t('accuracy')}</p>
                </Card>
                <Card className="p-4">
                  <h3 className="font-semibold mb-2">{t('charactersLearned')}</h3>
                  <p className="text-2xl font-bold">46</p>
                  <p className="text-sm text-muted-foreground">{t('outOf')} 92 {t('total')}</p>
                </Card>
                <Card className="p-4">
                  <h3 className="font-semibold mb-2">{t('currentStreak')}</h3>
                  <p className="text-2xl font-bold">7 {t('days')}</p>
                  <p className="text-sm text-muted-foreground">{t('keepItUp')}</p>
                </Card>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold">{t('achievements')}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {badges.map((badge) => (
                    <Card key={badge.name} className={`p-4 ${badge.achieved ? 'bg-blue-50 dark:bg-gray-800' : 'opacity-50'}`}>
                      <h4 className="font-semibold">{badge.name}</h4>
                      <p className="text-sm text-muted-foreground">{badge.description}</p>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="calendar" className="h-full">
              <div className="grid grid-cols-1 sm:grid-cols-[2fr,1fr] gap-4">
                <Card className="p-4">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border w-full"
                    modifiers={{
                      practiced: (date) => isDayWithPractice(date),
                    }}
                    modifiersStyles={{
                      practiced: {
                        backgroundColor: "rgb(34 197 94)",
                        color: "white",
                        borderRadius: "9999px",
                      },
                    }}
                  />
                </Card>
                <Card className="p-4">
                  <h3 className="font-semibold mb-4">{t('practiceHistory')}</h3>
                  <ScrollArea className="h-[200px] sm:h-[300px]">
                    <div className="space-y-3">
                      {practiceData.map((data) => (
                        <div key={data.date} className="p-2 border rounded">
                          <p className="font-medium">{new Date(data.date).toLocaleDateString(language)}</p>
                          <p className="text-sm text-muted-foreground">
                            {t('charactersLearnedOn')}: {data.charactersLearned}
                          </p>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="culture" className="h-full">
              <ScrollArea className="h-full">
                <div className="space-y-4">
                  {culturalNotes[language === 'fr' ? 'fr' : 'en'].map((note) => (
                    <Card key={note.title} className="p-4">
                      <h3 className="font-semibold mb-2">{note.title}</h3>
                      <p className="text-sm text-muted-foreground">{note.content}</p>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="settings" className="h-full">
              <Card className="p-4 sm:p-6">
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="space-y-1">
                      <Label htmlFor="language">{t('language')}</Label>
                      <p className="text-sm text-muted-foreground">
                        {t('selectLanguage')}
                      </p>
                    </div>
                    <Select value={language} onValueChange={setLanguage}>
                      <SelectTrigger className="w-full sm:w-[180px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="fr">Français</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="space-y-1">
                      <Label htmlFor="theme">{t('darkMode')}</Label>
                      <p className="text-sm text-muted-foreground">
                        {t('toggleDarkMode')}
                      </p>
                    </div>
                    <Switch
                      checked={theme === "dark"}
                      onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="space-y-1">
                      <Label htmlFor="charactersPerRow">{t('charactersPerRow')}</Label>
                      <p className="text-sm text-muted-foreground">
                        {t('selectCharactersPerRow')}
                      </p>
                    </div>
                    <Select 
                      value={charactersPerRow.toString()} 
                      onValueChange={(value) => setCharactersPerRow(parseInt(value))}
                    >
                      <SelectTrigger className="w-full sm:w-[180px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="5">5</SelectItem>
                        <SelectItem value="15">15</SelectItem>
                        <SelectItem value="25">25</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="space-y-1">
                      <Label>{t('resetProgress')}</Label>
                      <p className="text-sm text-muted-foreground">
                        {t('resetProgressDescription')}
                      </p>
                    </div>
                    <Button
                      variant="destructive"
                      onClick={resetProgress}
                      className="w-full sm:w-auto"
                    >
                      {t('resetProgress')}
                    </Button>
                  </div>
                </div>
              </Card>
            </TabsContent>
          </ScrollArea>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}