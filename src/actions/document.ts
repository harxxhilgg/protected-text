"use server";

import prisma from "@/lib/prisma";

export async function findDocument(slug: string) {
  return await prisma.document.findUnique({
    where: {
      slug,
    },
  });
}

export async function saveDocument(slug: string, encryptedContent: string) {
  return await prisma.document.upsert({
    where: {
      slug,
    },
    update: {
      content: encryptedContent,
    },
    create: {
      slug,
      content: encryptedContent,
    },
  });
}

export async function deleteDocument(slug: string) {
  return await prisma.document.delete({
    where: {
      slug,
    },
  });
}

// Optional to show last edited dateTime
export async function getDocumentInfo(slug: string) {
  return prisma.document.findUnique({
    where: {
      slug,
    },
    select: {
      id: true,
      slug: true,
      createdAt: true,
      updatedAt: true,
    },
  });
}

// Instead of returning boolean, it returns the entire row
export async function documentExists(slug: string) {
  return prisma.document.findUnique({
    where: {
      slug,
    },
  });
}
