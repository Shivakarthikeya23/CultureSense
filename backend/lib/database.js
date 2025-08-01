const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = "https://xavsprnmcrfxapryyxxz.supabase.co";
const supabaseServiceKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Database operations
const dbService = {
  // Cultural Persona operations
  async createPersona(personaData) {
    try {
      const { data, error } = await supabase
        .from("cultural_personas")
        .insert([personaData])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Error creating persona:", error);
      throw error;
    }
  },

  async getPersonasByUserId(userId) {
    try {
      const { data, error } = await supabase
        .from("cultural_personas")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Error getting personas:", error);
      throw error;
    }
  },

  async getPersonaById(id) {
    try {
      const { data, error } = await supabase
        .from("cultural_personas")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Error getting persona:", error);
      throw error;
    }
  },

  async updatePersona(id, updates) {
    try {
      const { data, error } = await supabase
        .from("cultural_personas")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Error updating persona:", error);
      throw error;
    }
  },

  async deletePersona(id) {
    try {
      const { error } = await supabase
        .from("cultural_personas")
        .delete()
        .eq("id", id);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error("Error deleting persona:", error);
      throw error;
    }
  },

  // Cultural Analysis operations
  async createAnalysis(analysisData) {
    try {
      const { data, error } = await supabase
        .from("cultural_analyses")
        .insert([analysisData])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Error creating analysis:", error);
      throw error;
    }
  },

  async getAnalysesByUserId(userId) {
    try {
      const { data, error } = await supabase
        .from("cultural_analyses")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Error getting analyses:", error);
      throw error;
    }
  },

  async getAnalysesByType(userId, analysisType) {
    try {
      const { data, error } = await supabase
        .from("cultural_analyses")
        .select("*")
        .eq("user_id", userId)
        .eq("analysis_type", analysisType)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Error getting analyses by type:", error);
      throw error;
    }
  },

  async getAnalysisById(id) {
    try {
      const { data, error } = await supabase
        .from("cultural_analyses")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Error getting analysis:", error);
      throw error;
    }
  },

  async deleteAnalysis(id) {
    try {
      const { error } = await supabase
        .from("cultural_analyses")
        .delete()
        .eq("id", id);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error("Error deleting analysis:", error);
      throw error;
    }
  },

  // User operations
  async getUserById(userId) {
    try {
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Error getting user:", error);
      throw error;
    }
  },

  async updateUser(userId, updates) {
    try {
      const { data, error } = await supabase
        .from("users")
        .update(updates)
        .eq("id", userId)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  },

  // Session tracking
  async createUserSession(userId, sessionData) {
    try {
      const { data, error } = await supabase
        .from("user_sessions")
        .insert([
          {
            user_id: userId,
            session_data: sessionData,
          },
        ])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Error creating user session:", error);
      throw error;
    }
  },
};

module.exports = dbService;
