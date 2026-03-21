import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import { sendConsultationEmail } from "./mailer";

async function seedDatabase() {
  try {
    const existingProjects = await storage.getProjects();
    if (existingProjects.length === 0) {
      await storage.createProject({
        title: "Minimalist City Apartment",
        description: "A sleek, modern apartment design focusing on natural light, clean lines, and neutral tones. Incorporates custom built-ins to maximize space.",
        category: "Residential",
        imageUrl: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=800",
      });
      await storage.createProject({
        title: "Boutique Tech Office",
        description: "An open-plan office space designed to foster collaboration. Features ergonomic workstations, acoustic treatments, and vibrant breakout zones.",
        category: "Commercial",
        imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800",
      });
      await storage.createProject({
        title: "Coastal Villa Retreat",
        description: "A luxurious seaside villa utilizing local materials, expansive glazing, and seamless indoor-outdoor living to capture ocean views.",
        category: "Residential",
        imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800",
      });
      await storage.createProject({
        title: "Artisan Coffee Shop",
        description: "A warm and inviting cafe interior featuring raw wood textures, industrial lighting, and cozy seating arrangements.",
        category: "Commercial",
        imageUrl: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=800",
      });
      await storage.createProject({
        title: "Urban Loft Renovation",
        description: "Complete overhaul of a historic loft, preserving original brickwork while introducing modern fixtures and a monochromatic palette.",
        category: "Residential",
        imageUrl: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&q=80&w=800",
      });
    }
  } catch (error) {
    console.error("Error seeding database:", error);
  }
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  app.get(api.projects.list.path, async (req, res) => {
    try {
      const allProjects = await storage.getProjects();
      res.status(200).json(allProjects);
    } catch (err) {
      res.status(500).json({ message: "Failed to fetch projects" });
    }
  });

  app.post(api.contact.create.path, async (req, res) => {
    try {
      const input = api.contact.create.input.parse(req.body);
      const message = await storage.createContactMessage(input);
      await sendConsultationEmail(input);
      res.status(201).json(message);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      if (err instanceof Error && err.message.toLowerCase().includes("email")) {
        return res.status(500).json({ message: err.message });
      }
      res.status(500).json({ message: "Failed to submit contact message" });
    }
  });

  // Seed the database asynchronously
  seedDatabase();

  return httpServer;
}
