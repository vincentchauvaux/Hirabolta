"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/contexts/auth-context";
import { useLanguage } from "@/contexts/language-context";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

const signUpSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  photo: z.instanceof(FileList).optional(),
});

type SignUpForm = z.infer<typeof signUpSchema>;

interface SignUpDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SignUpDialog({ open, onOpenChange }: SignUpDialogProps) {
  const { signUp, updateUserProfile } = useAuth();
  const { t } = useLanguage();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const form = useForm<SignUpForm>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: SignUpForm) => {
    try {
      setLoading(true);
      await signUp(data.email, data.password, data.name);
      if (data.photo?.[0]) {
        await updateUserProfile(data.name, data.photo[0]);
      }
      onOpenChange(false);
      toast({
        title: t('welcome'),
        description: t('signUpSuccess'),
      });
    } catch (error) {
      toast({
        title: t('error'),
        description: t('signUpError'),
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t('signUp')}</DialogTitle>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">{t('name')}</Label>
            <Input
              id="name"
              {...form.register("name")}
              className="w-full"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">{t('email')}</Label>
            <Input
              id="email"
              type="email"
              {...form.register("email")}
              className="w-full"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">{t('password')}</Label>
            <Input
              id="password"
              type="password"
              {...form.register("password")}
              className="w-full"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="photo">{t('profilePhoto')}</Label>
            <Input
              id="photo"
              type="file"
              accept="image/*"
              {...form.register("photo")}
              className="w-full"
            />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? t('signingUp') : t('signUp')}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}