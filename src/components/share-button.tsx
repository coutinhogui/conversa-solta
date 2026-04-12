'use client';

import { Share2 } from 'lucide-react';
import { Button } from './ui/button';
import { useToast } from '@/hooks/use-toast';
import { siteConfig } from '@/lib/site';

interface ShareButtonProps {
  shareData: {
    title: string;
    text: string;
    url: string;
  };
}

export default function ShareButton({ shareData }: ShareButtonProps) {
  const { toast } = useToast();
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      try {
        await navigator.clipboard.writeText(shareData.url);
        toast({
          title: siteConfig.share.copiedTitle,
          description: siteConfig.share.copiedDescription,
        });
      } catch (error) {
        console.error('Error copying to clipboard:', error);
        toast({
          variant: 'destructive',
          title: siteConfig.share.errorTitle,
          description: siteConfig.share.errorDescription,
        });
      }
    }
  };

  return (
    <Button variant="outline" onClick={handleShare}>
      <Share2 className="mr-2 h-4 w-4" />
      {siteConfig.share.button}
    </Button>
  );
}
