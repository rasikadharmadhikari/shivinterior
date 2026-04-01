import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import { sendConsultationEmail } from "./mailer";
import { v2 as cloudinary } from "cloudinary";

function getPublicId(url: string): string {
  const parts = url.split('/');
  const uploadIndex = parts.indexOf('upload');
  const withVersion = parts.slice(uploadIndex + 1).join('/');
  const withoutVersion = withVersion.replace(/^v\d+\//, '');
  return withoutVersion.replace(/\.[^/.]+$/, '');
}

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
  const { default: upload } = await import("../config/cloudinary.js");
  const { default: Project } = await import("./models/Project.js");

  app.post(
    "/api/projects",
    upload.fields([
      { name: "thumbnail", maxCount: 1 },
      { name: "beforeImages", maxCount: 20 },
      { name: "afterImages", maxCount: 20 },
    ]),
    async (req, res) => {
      console.log('=== POST /api/projects called ===');
      console.log('req.body:', req.body);
      console.log('req.files:', (req as any).files);
      
      try {
        const files = (((req as any).files as Record<string, Array<{ path: string }>>) || {});

        const thumbnail = files.thumbnail?.[0]?.path || "";
        const beforeImages = (files.beforeImages || []).map((f) => f.path);
        const afterImages = (files.afterImages || []).map((f) => f.path);

        console.log('Extracted files - thumbnail:', thumbnail, 'beforeImages:', beforeImages.length, 'afterImages:', afterImages.length);

        const project = new Project({
          title: req.body.title,
          projectType: req.body.projectType,
          location: req.body.location,
          year: req.body.year,
          description: req.body.description,
          thumbnail,
          beforeImages,
          afterImages,
        });

        console.log('Project object created:', project);

        const savedProject = await project.save();
        console.log('Project saved successfully:', savedProject._id);
        res.status(201).json(savedProject);
      } catch (err) {
        console.error('Route error:', err instanceof Error ? err.message : String(err));
        console.error('Stack:', err instanceof Error ? err.stack : 'No stack trace');
        return res.status(500).json({ 
          error: err instanceof Error ? err.message : String(err),
          stack: err instanceof Error ? err.stack : undefined 
        });
      }
    },
  );

  app.get(api.projects.list.path, async (req, res) => {
    try {
      const allProjects = await Project.find().sort({ createdAt: -1 });
      res.status(200).json(allProjects);
    } catch (err) {
      res.status(500).json({ message: "Failed to fetch projects" });
    }
  });

  app.get("/api/projects/:id", async (req, res) => {
    try {
      const project = await Project.findById(req.params.id);
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }
      return res.status(200).json(project);
    } catch (err) {
      return res.status(500).json({ message: "Failed to fetch project" });
    }
  });

  app.delete("/api/projects/:id", async (req, res) => {
    try {
      // Find the project first
      const project = await Project.findById(req.params.id);
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }

      // Collect all image URLs
      const allImageUrls = [
        project.thumbnail,
        ...(project.beforeImages || []),
        ...(project.afterImages || []),
      ].filter((url) => url && url.trim() !== '');

      // Extract public IDs and delete from Cloudinary
      if (allImageUrls.length > 0) {
        const deletePromises = allImageUrls.map((url) => {
          const publicId = getPublicId(url);
          console.log(`Deleting image from Cloudinary: ${publicId}`);
          return cloudinary.uploader.destroy(publicId).catch((err) => {
            console.warn(`Failed to delete image ${publicId}:`, err.message);
            return null; // Don't fail the whole deletion if one image fails
          });
        });

        await Promise.all(deletePromises);
      }

      // Delete the project from MongoDB
      await Project.findByIdAndDelete(req.params.id);
      console.log(`Project deleted: ${req.params.id}`);

      return res.status(200).json({ message: "Project deleted successfully" });
    } catch (err) {
      console.error("Failed to delete project:", err);
      return res.status(500).json({ 
        message: "Failed to delete project",
        error: err instanceof Error ? err.message : String(err)
      });
    }
  });

  app.put(
    "/api/projects/:id",
    upload.fields([
      { name: "thumbnail", maxCount: 1 },
      { name: "beforeImages", maxCount: 20 },
      { name: "afterImages", maxCount: 20 },
    ]),
    async (req, res) => {
      try {
        // Find existing project
        const project = await Project.findById(req.params.id);
        if (!project) {
          return res.status(404).json({ message: "Project not found" });
        }

        // Parse removal tracking fields from req.body
        const removedBeforeImages = JSON.parse(req.body.removedBeforeImages || '[]');
        const removedAfterImages = JSON.parse(req.body.removedAfterImages || '[]');
        const keepBeforeImages = JSON.parse(req.body.keepBeforeImages || '[]');
        const keepAfterImages = JSON.parse(req.body.keepAfterImages || '[]');
        const removedThumbnail = req.body.removedThumbnail === 'true';

        console.log('=== PUT /api/projects/:id called ===');
        console.log('Removed beforeImages:', removedBeforeImages);
        console.log('Removed afterImages:', removedAfterImages);
        console.log('Keep beforeImages:', keepBeforeImages);
        console.log('Keep afterImages:', keepAfterImages);
        console.log('Removed thumbnail:', removedThumbnail);

        // Delete removed beforeImages from Cloudinary
        if (removedBeforeImages.length > 0) {
          const deletePromises = removedBeforeImages.map((url: string) => {
            const publicId = getPublicId(url);
            console.log(`Deleting removed beforeImage from Cloudinary: ${publicId}`);
            return cloudinary.uploader.destroy(publicId).catch((err: any) => {
              console.warn(`Failed to delete removed beforeImage ${publicId}:`, err.message);
              return null;
            });
          });
          await Promise.all(deletePromises);
        }

        // Delete removed afterImages from Cloudinary
        if (removedAfterImages.length > 0) {
          const deletePromises = removedAfterImages.map((url: string) => {
            const publicId = getPublicId(url);
            console.log(`Deleting removed afterImage from Cloudinary: ${publicId}`);
            return cloudinary.uploader.destroy(publicId).catch((err: any) => {
              console.warn(`Failed to delete removed afterImage ${publicId}:`, err.message);
              return null;
            });
          });
          await Promise.all(deletePromises);
        }

        const files = (((req as any).files as Record<string, Array<{ path: string }>>) || {});

        // Build final beforeImages array
        let finalBeforeImages = [...keepBeforeImages];
        if (files.beforeImages && files.beforeImages.length > 0) {
          finalBeforeImages = [...finalBeforeImages, ...files.beforeImages.map((f) => f.path)];
          console.log(`Added ${files.beforeImages.length} new beforeImages, total: ${finalBeforeImages.length}`);
        }

        // Build final afterImages array
        let finalAfterImages = [...keepAfterImages];
        if (files.afterImages && files.afterImages.length > 0) {
          finalAfterImages = [...finalAfterImages, ...files.afterImages.map((f) => f.path)];
          console.log(`Added ${files.afterImages.length} new afterImages, total: ${finalAfterImages.length}`);
        }

        // Handle thumbnail: keep existing by default
        let finalThumbnail = project.thumbnail;
        if (removedThumbnail && files.thumbnail) {
          // Removed old thumbnail and uploading new one
          await cloudinary.uploader.destroy(getPublicId(project.thumbnail)).catch((err: any) => {
            console.warn(`Failed to delete old thumbnail:`, err.message);
          });
          finalThumbnail = files.thumbnail[0].path;
          console.log(`Removed old thumbnail and set new one: ${finalThumbnail}`);
        } else if (files.thumbnail && !removedThumbnail) {
          // Replacing thumbnail without explicit removal
          await cloudinary.uploader.destroy(getPublicId(project.thumbnail)).catch((err: any) => {
            console.warn(`Failed to delete old thumbnail:`, err.message);
          });
          finalThumbnail = files.thumbnail[0].path;
          console.log(`Replaced thumbnail: ${finalThumbnail}`);
        } else if (removedThumbnail && !files.thumbnail) {
          // Removed thumbnail but no new one uploaded
          await cloudinary.uploader.destroy(getPublicId(project.thumbnail)).catch((err: any) => {
            console.warn(`Failed to delete old thumbnail:`, err.message);
          });
          finalThumbnail = null;
          console.log(`Removed thumbnail, set to null`);
        }

        // Update the project document
        const updatedProject = await Project.findByIdAndUpdate(
          req.params.id,
          {
            title: req.body.title || project.title,
            projectType: req.body.projectType || project.projectType,
            location: req.body.location || project.location,
            year: req.body.year || project.year,
            description: req.body.description || project.description,
            thumbnail: finalThumbnail,
            beforeImages: finalBeforeImages,
            afterImages: finalAfterImages,
          },
          { new: true }
        );

        console.log(`Project updated successfully: ${req.params.id}`);
        return res.status(200).json(updatedProject);
      } catch (err) {
        console.error("Failed to update project:", err);
        return res.status(500).json({
          message: "Failed to update project",
          error: err instanceof Error ? err.message : String(err),
        });
      }
    },
  );

  app.post(api.contact.create.path, async (req, res) => {
    try {
      const input = api.contact.create.input.parse(req.body);
      const message = await storage.createContactMessage(input);
      
      // Attempt to send email, but don't fail if it's not configured
      try {
        await sendConsultationEmail(input);
      } catch (emailErr) {
        console.warn("Email notification not sent:", emailErr instanceof Error ? emailErr.message : String(emailErr));
      }
      
      res.status(201).json(message);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      res.status(500).json({ message: "Failed to submit contact message" });
    }
  });

  // Seed the database asynchronously
  seedDatabase();

  return httpServer;
}
