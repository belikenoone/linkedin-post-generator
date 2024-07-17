import { create } from "zustand";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { nanoid } from "nanoid";
interface HistoryItem {
  id: string;
  prompt: string;
  generatedPost: string;
}

interface PostStore {
  currentPost: string;
  prompt: string;
  tone: string;
  history: HistoryItem[];
  isLoading: boolean;
  error: string | null;
  setPrompt: (prompt: string) => void;
  generatePost: (tone: string) => Promise<void>;
  setTone: (tone: string) => void;
}

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!);

const usePostStore = create<PostStore>((set) => ({
  currentPost: "",
  prompt: "",
  tone: "neutral",
  history: [],
  isLoading: false,
  error: null,
  setPrompt: (prompt) => set({ prompt }),
  setTone: (tone) => set({ tone }),
  generatePost: async (tone: string) => {
    set({ isLoading: true, error: null });
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const prompt = usePostStore.getState().prompt.trim();

      // Input validation
      if (prompt.length === 0) {
        return set({ error: "Prompt cannot be empty", isLoading: false });
      }

      if (prompt.length > 500) {
        return set({
          error: "Prompt is too long (max 500 characters)",
          isLoading: false,
        });
      }

      // Basic profanity check (expand this list as needed)
      const profanityList = [
        "vulgar1",
        "vulgar2",
        "badword",
        "fuck",
        "bitch",
        "sex",
        "pussy",
        "vagina",
        "penis",
        "ass",
        "arse",
        "porn",
      ];
      if (profanityList.some((word) => prompt.toLowerCase().includes(word))) {
        set({
          error: "Prompt contains inappropriate language",
          isLoading: false,
        });
      }

      // Check for code-like content
      if (
        prompt.includes("{") ||
        prompt.includes("}") ||
        prompt.includes("function") ||
        prompt.includes("const ")
      ) {
        return set({
          error:
            "Prompt appears to contain code. Please provide a description instead.",
          isLoading: false,
        });
      }

      const result = await model.generateContent(
        `Generate a professional LinkedIn post about: ${prompt} with a ${tone} tone. Ensure the content is appropriate for a professional network.`
      );
      const generatedPost = result.response.text();
      set((state) => ({
        currentPost: generatedPost,
        history: [...state.history, { id: nanoid(), prompt, generatedPost }],
        isLoading: false,
      }));
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : "Failed to generate post",
        isLoading: false,
      });
      console.error("Error generating post:", error);
    }
  },
}));

export default usePostStore;
