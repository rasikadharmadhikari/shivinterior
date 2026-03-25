import { useMutation } from "@tanstack/react-query";
import { api } from "@shared/routes";
import { z } from "zod";
import { insertContactMessageSchema } from "@shared/schema";

type ContactInput = z.infer<typeof insertContactMessageSchema>;

export function useSubmitContact() {
  return useMutation({
    mutationFn: async (data: ContactInput) => {
      const validated = insertContactMessageSchema.parse(data);
      
      // Construct the full API URL
      const apiUrl = `${window.location.origin}${api.contact.create.path}`;
      
      console.log("Submitting contact form to:", apiUrl);
      
      try {
        const res = await fetch(apiUrl, {
          method: api.contact.create.method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(validated),
          credentials: "include",
        });
        
        console.log("Response status:", res.status);
        
        if (!res.ok) {
          let errorData;
          try {
            errorData = await res.json();
          } catch {
            errorData = { message: `HTTP ${res.status}: ${res.statusText}` };
          }
          throw new Error(errorData.message || "Failed to submit message");
        }
        
        return api.contact.create.responses[201].parse(await res.json());
      } catch (error) {
        console.error("Contact form error:", error);
        if (error instanceof Error) {
          throw error;
        }
        throw new Error("Failed to fetch - please check your connection");
      }
    },
  });
}
