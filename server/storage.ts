import { db } from "./db";
import {
  projects,
  contactMessages,
  type Project,
  type InsertProject,
  type ContactMessage,
  type InsertContactMessage
} from "@shared/schema";

export interface IStorage {
  getProjects(): Promise<Project[]>;
  createProject(project: InsertProject): Promise<Project>;
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
}

export class DatabaseStorage implements IStorage {
  async getProjects(): Promise<Project[]> {
    return await db!.select().from(projects);
  }

  async createProject(project: InsertProject): Promise<Project> {
    const [newProject] = await db!.insert(projects).values(project).returning();
    return newProject;
  }

  async createContactMessage(message: InsertContactMessage): Promise<ContactMessage> {
    const [newMessage] = await db!.insert(contactMessages).values(message).returning();
    return newMessage;
  }
}

export class MemStorage implements IStorage {
  private projects: Project[] = [
    { id: 1, title: "KKP Dombivali Residence", description: "Full turnkey residential interior — living, dining, bedrooms and kitchen with bespoke furniture and a cohesive material palette.", category: "Residential", imageUrl: "/site-photos/kkp-dombivali.jpg" },
    { id: 2, title: "City Corporation Office", description: "Contemporary corporate interior with open workstations, false ceiling with integrated lighting, and premium flooring throughout.", category: "Commercial", imageUrl: "/site-photos/city-corporation.jpg" },
    { id: 3, title: "Hiremath Commercial Office", description: "Modern office fit-out featuring a welcoming reception, partitioned workstations, and a clean professional aesthetic.", category: "Commercial", imageUrl: "/site-photos/hiremath-3.jpg" },
    { id: 4, title: "Con Air Equipment", description: "Purpose-built industrial interior balancing practical workspace needs with clean finishes and organised utility zones.", category: "Industrial", imageUrl: "/site-photos/con-air-equip.jpg" },
    { id: 5, title: "IAIDC Institutional Project", description: "Large-scale institutional interior fit-out with durable materials, optimised layouts, and purpose-built solutions.", category: "Institutional", imageUrl: "/site-photos/cc-28.jpg" },
    { id: 6, title: "Kharadi Bidap Residence", description: "Premium residential interior with modern styling, custom joinery and carefully curated finishes throughout.", category: "Residential", imageUrl: "/site-photos/kkp-room5.jpg" },
  ];
  private messages: ContactMessage[] = [];
  private nextProjectId = 6;
  private nextMessageId = 1;

  async getProjects(): Promise<Project[]> {
    return this.projects;
  }

  async createProject(project: InsertProject): Promise<Project> {
    const newProject = { ...project, id: this.nextProjectId++ } as Project;
    this.projects.push(newProject);
    return newProject;
  }

  async createContactMessage(message: InsertContactMessage): Promise<ContactMessage> {
    const newMessage = { ...message, id: this.nextMessageId++ } as ContactMessage;
    this.messages.push(newMessage);
    return newMessage;
  }
}

export const storage: IStorage = process.env.DATABASE_URL
  ? new DatabaseStorage()
  : new MemStorage();
