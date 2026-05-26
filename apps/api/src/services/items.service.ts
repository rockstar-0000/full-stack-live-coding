import { prisma } from '../lib/prisma';
import type { CreateItemInput, UpdateItemInput } from '@repo/shared';

export const findAll = () => prisma.item.findMany({ orderBy: { createdAt: 'desc' } });

export const findById = (id: number) => prisma.item.findUnique({ where: { id } });

export const create = (data: CreateItemInput) => prisma.item.create({ data });

export const update = async (id: number, data: UpdateItemInput) => {
  try {
    return await prisma.item.update({ where: { id }, data });
  } catch {
    // Record not found returns null instead of throwing
    return null;
  }
};

export const remove = (id: number) => prisma.item.delete({ where: { id } });
