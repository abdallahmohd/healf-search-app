import { Product } from "@/types/product.type";

// Tokenizes and normalizes a search string
export const prepareTerms = (text: string): string[] => {
  return Array.from(new Set(text.toLowerCase().split(/\W+/).filter(Boolean)));
};

export const parseSEO = (
  raw: string | undefined
): { title: string; description: string } => {
  try {
    const seo = JSON.parse(raw ?? "{}");
    return {
      title: seo.title ?? "",
      description: seo.description ?? "",
    };
  } catch {
    return { title: "", description: "" };
  }
};

export const extractTags = (raw: string | undefined): string[] => {
  if (!raw) return [];
  return raw.split(",").flatMap((tag) => {
    const trimmed = tag.trim();
    if (!trimmed) return [];
    const lower = trimmed.toLowerCase();
    if (lower === "oos" || lower === "new") return [];

    const execMatch = /^(filter|goal):(.+)$/i.exec(trimmed);
    if (execMatch) {
      return [execMatch[2].trim()];
    }

    if (/^[A-Za-z\s]+$/.test(trimmed)) {
      return [trimmed];
    }

    return [];
  });
};

export const getProductFields = (product: Product) => {
  const { title: seoTitle, description: seoDesc } = parseSEO(product.SEO);
  return {
    title: (product.TITLE ?? "").toLowerCase(),
    vendor: (product.VENDOR ?? "").toLowerCase(),
    tags: extractTags(product.TAGS).join(" ").toLowerCase(),
    seoTitle: (seoTitle ?? "").toLowerCase(),
    seoDesc: (seoDesc ?? "").toLowerCase(),
  };
};

export type Index = Record<string, Set<string>>;
export let invertedIndex: Index = {};

export const buildIndex = (products: Product[]) => {
  invertedIndex = {};
  products.forEach((product) => {
    const { title, vendor, tags, seoTitle, seoDesc } =
      getProductFields(product);
    const sourceText = [title, vendor, seoTitle, seoDesc, tags].join(" ");
    const terms = prepareTerms(sourceText);
    terms.forEach((term) => {
      if (!invertedIndex[term]) invertedIndex[term] = new Set();
      invertedIndex[term].add(product.ID);
    });
  });
};

export const getProductSearchText = (product: Product) => {
  const { title, vendor, tags, seoTitle, seoDesc } = getProductFields(product);
  return [
    title,
    vendor,
    seoTitle,
    seoDesc,
    tags,
    (product.DESCRIPTION ?? "").slice(0, 500).toLowerCase(),
  ].join(" ");
};

export const getPriority = (product: Product, queryTerms: string[]) => {
  const { title, vendor, tags, seoTitle, seoDesc } = getProductFields(product);
  if (queryTerms.every((term) => title.includes(term))) return 1;
  if (queryTerms.every((term) => vendor.includes(term))) return 2;
  if (queryTerms.every((term) => tags.includes(term))) return 3;
  if (
    queryTerms.every(
      (term) => seoTitle.includes(term) || seoDesc.includes(term)
    )
  )
    return 4;
  return 5;
};

export const getTopNItems = (items: string[], n: number) => {
  const freq: Record<string, number> = {};
  items.forEach((item) => {
    freq[item] = (freq[item] ?? 0) + 1;
  });
  return Object.entries(freq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, n)
    .map(([item]) => item);
};

export const getTagsByPrefix = (
  tagsString: string | undefined,
  prefix: string
): string[] => {
  return tagsString
    ? (tagsString
        .split(",")
        .map((tag) => tag.trim())
        .map((t) => {
          const match = new RegExp(`^${prefix}:(.+)$`, "i").exec(t);
          return match ? match[1].trim() : null;
        })
        .filter(Boolean) as string[])
    : [];
};
