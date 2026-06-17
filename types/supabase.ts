export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      user_onboarding: {
        Row: {
          id: string;
          user_id: string;
          q1_background: string | null;
          q2_linux: string | null;
          q3_networking: string | null;
          q4_path_known: string | null;
          entry_point: string | null;
          chosen_path: string | null;
          completed_at: string | null;
        };
        Insert: {
          id?: string;
          user_id: string;
          q1_background?: string | null;
          q2_linux?: string | null;
          q3_networking?: string | null;
          q4_path_known?: string | null;
          entry_point?: string | null;
          chosen_path?: string | null;
          completed_at?: string | null;
        };
        Update: {
          id?: string;
          user_id?: string;
          q1_background?: string | null;
          q2_linux?: string | null;
          q3_networking?: string | null;
          q4_path_known?: string | null;
          entry_point?: string | null;
          chosen_path?: string | null;
          completed_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "user_onboarding_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      user_profiles: {
        Row: {
          user_id: string;
          cabinet_username: string;
          display_name: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          user_id: string;
          cabinet_username: string;
          display_name?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          user_id?: string;
          cabinet_username?: string;
          display_name?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "user_profiles_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      module_completions: {
        Row: {
          id: string;
          user_id: string;
          content_area: string;
          module_slug: string;
          completed_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          content_area: string;
          module_slug: string;
          completed_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          content_area?: string;
          module_slug?: string;
          completed_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "module_completions_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      cabinet_artifacts: {
        Row: {
          id: string;
          user_id: string;
          content_area: string;
          module_slug: string;
          artifact_name: string;
          summary: string | null;
          link_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          content_area: string;
          module_slug: string;
          artifact_name: string;
          summary?: string | null;
          link_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          content_area?: string;
          module_slug?: string;
          artifact_name?: string;
          summary?: string | null;
          link_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "cabinet_artifacts_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: {
      public_cabinet_artifacts: {
        Row: {
          cabinet_username: string;
          display_name: string | null;
          content_area: string;
          module_slug: string;
          artifact_name: string;
          summary: string | null;
          link_url: string | null;
          created_at: string;
        };
        Relationships: [];
      };
    };
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}
