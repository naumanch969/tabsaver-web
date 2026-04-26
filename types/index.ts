export interface TabInfo {
  title: string;
  url: string;
  favIconUrl?: string;
}

export interface Workspace {
  id: string;
  name: string;
  data: TabInfo[];
  is_public: boolean;
  share_id: string;
  updated_at: string;
}
