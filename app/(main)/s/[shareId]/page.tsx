'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useParams } from 'next/navigation';
import { Workspace } from '@/types';
import { Container } from '@/components/ui';
import { 
  LoadingState, 
  NotFoundState, 
  BroadcastHeader, 
  TabItem, 
  BroadcastFooter 
} from './_components';

export default function SharedWorkspacePage() {

  /////////////////////////////////////////////// VARIABLES /////////////////////////////////////////////// 
  const { shareId } = useParams();
  
  /////////////////////////////////////////////// STATES /////////////////////////////////////////////// 
  const [workspace, setWorkspace] = useState<Workspace | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  
  /////////////////////////////////////////////// EFFECTS /////////////////////////////////////////////// 
  useEffect(() => {
    const fetchWorkspace = async () => {
      const { data } = await supabase
      .from('workspaces')
      .select('*')
      .eq('share_id', shareId)
      .eq('is_public', true)
      .single();
      
      if (data) setWorkspace(data);
      setLoading(false);
    };

    if (shareId) fetchWorkspace();
  }, [shareId]);
  
  /////////////////////////////////////////////// FUNCTIONS /////////////////////////////////////////////// 
  const copyUrl = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const openAll = () => {
    workspace?.data?.forEach((tab) => {
      window.open(tab.url, '_blank');
    });
  };

  /////////////////////////////////////////////// RENDER /////////////////////////////////////////////// 
  if (loading) {
    return <LoadingState />;
  }

  if (!workspace) {
    return <NotFoundState />;
  }

  return (
    <>
      <BroadcastHeader 
        workspace={workspace} 
        shareId={shareId as string} 
        copied={copied} 
        onCopy={copyUrl} 
        onOpenAll={openAll} 
      />

      <main className="relative z-20">
        <Container className="max-w-5xl! -mt-32! md:-mt-48!">
          <div className="grid gap-8!">
            {workspace.data?.map((tab, i) => (
              <TabItem key={i} tab={tab} index={i} />
            ))}
          </div>

          <BroadcastFooter />
        </Container>
      </main>
    </>
  );
}
