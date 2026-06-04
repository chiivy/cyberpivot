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
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}
