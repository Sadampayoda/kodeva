import React, { useState, useEffect } from "react";
import Query from "@/lib/sanity/query";
import useLoading from "@/hooks/useLoading";
import { LandingHeroData, SanityHeroResponse } from "@/types/landing.type";
import { ProductItem, SanityProductResponse } from "@/types/product.type";
import { TestimonialItem, SanityTestimonialResponse } from "@/types/testimonial.type";
import { FaqItem, SanityFaqResponse } from "@/types/faq.type";
import { LeadFormData, LeadFormErrors } from "@/types/lead.type";
import { captureUtmFromUrl, getStoredUtm } from "@/lib/tracking/utm";
import { trackCtaClick } from "@/lib/tracking/dataLayer";

const defaultHero: LandingHeroData = {
  badgeText: "Solusi Digital Modern",
  title: "Bangun Bisnis Digital Lebih Cepat & Terukur",
  subtitle:
    "Dapatkan website profesional, source code aplikasi siap pakai, dan template premium untuk mengakselerasi pertumbuhan bisnis Anda tanpa ribet.",
  backgroundImage:
    "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=75",
  ctaText: "Jelajahi Produk Unggulan",
  ctaLink: "#featured-products",
};

const defaultProducts: ProductItem[] = [
  {
    id: "prod-1",
    title: "Kodeva POS & Kasir Multi-Outlet",
    slug: "website-kasir",
    price: 450000,
    originalPrice: 750000,
    excerpt:
      "Aplikasi kasir cloud modern lengkap dengan manajemen stok, laporan penjualan real-time, dan struk digital.",
    coverImage:
      "https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=800&q=80",
    badge: "Best Seller",
    isFeatured: true,
    rating: 5,
    category: "Aplikasi Bisnis",
    demoUrl: "https://demo.kodeva.id/pos",
  },
  {
    id: "prod-2",
    title: "Kodeva SaaS Starter Kit Next.js",
    slug: "website-saas",
    price: 650000,
    originalPrice: 990000,
    excerpt:
      "Starter template SaaS lengkap dengan autentikasi, langganan multi-tier, dashboard admin, dan integrasi payment.",
    coverImage:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    badge: "Featured",
    isFeatured: true,
    rating: 5,
    category: "Starter Kit",
    demoUrl: "https://demo.kodeva.id/saas",
  },
  {
    id: "prod-3",
    title: "Kodeva HR & Absensi GPS Online",
    slug: "kodeva-hr",
    price: 550000,
    originalPrice: 850000,
    excerpt:
      "Sistem absensi karyawan dengan validasi GPS & selfie, pengajuan cuti otomatis, dan slip gaji terintegrasi.",
    coverImage:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80",
    badge: "Popular",
    isFeatured: true,
    rating: 5,
    category: "Manajemen SDM",
    demoUrl: "https://demo.kodeva.id/hr",
  },
];

const defaultTestimonials: TestimonialItem[] = [
  {
    id: "testi-1",
    name: "Hendra Wijaya",
    role: "Chief Technology Officer",
    company: "StartupHub Indonesia",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    content:
      "Source code dari Kodeva sangat bersih dan terstruktur. Kami memotong waktu pengembangan produk dari 3 bulan menjadi hanya 2 minggu saja!",
    rating: 5,
  },
  {
    id: "testi-2",
    name: "Rina Marlina",
    role: "Lead Product Manager",
    company: "TechSolusi Nusantara",
    avatar:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80",
    content:
      "Dukungan dokumentasi dan integrasi Sanity CMS-nya sangat mudah dimengerti bahkan oleh tim non-teknis pemasaran kami.",
    rating: 5,
  },
  {
    id: "testi-3",
    name: "Kevin Pratama",
    role: "Founder & CEO",
    company: "TokoKini Digital",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    content:
      "Fitur kasirnya sangat stabil saat menangani ribuan transaksi harian. ROI investasi bisnis kami meningkat lebih dari 300%.",
    rating: 5,
  },
];

const defaultFaqs: FaqItem[] = [
  {
    id: "faq-1",
    question: "Apakah source code yang dibeli mendapatkan lisensi komersial penuh?",
    answer:
      "Ya, Anda mendapatkan hak lisensi komersial penuh tanpa batas waktu untuk digunakan pada proyek pribadi maupun proyek klien Anda tanpa perlu membayar biaya royalti tambahan.",
    order: 1,
  },
  {
    id: "faq-2",
    question: "Bagaimana cara melakukan kustomisasi tampilan dan integrasi database?",
    answer:
      "Setiap produk telah dilengkapi panduan dokumentasi langkah-demi-langkah, arsitektur clean code berbasis Next.js 16 & TypeScript, serta file environment yang sangat mudah disesuaikan.",
    order: 2,
  },
  {
    id: "faq-3",
    question: "Apakah tersedia bantuan teknis jika tim kami mengalami kendala instalasi?",
    answer:
      "Tim dukungan teknis kami siap memberikan konsultasi dan pendampingan teknis melalui WhatsApp maupun email untuk memastikan kode dapat berjalan sempurna di server Anda.",
    order: 3,
  },
  {
    id: "faq-4",
    question: "Apakah konten pada halaman dapat diubah langsung oleh tim non-teknis?",
    answer:
      "Tentu saja. Seluruh bagian Hero, produk unggulan, testimoni, dan FAQ terhubung langsung ke Sanity Studio sehingga pembaruan teks dan gambar langsung tayang secara otomatis tanpa perlu redeploy.",
    order: 4,
  },
];

export default function useLandingPage() {
  const [hero, setHero] = useState<LandingHeroData>(defaultHero);
  const [featuredProducts, setFeaturedProducts] = useState<ProductItem[]>(defaultProducts);
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>(defaultTestimonials);
  const [faqs, setFaqs] = useState<FaqItem[]>(defaultFaqs);
  const [activeFaqId, setActiveFaqId] = useState<string | null>("faq-1");

  const [leadForm, setLeadForm] = useState<LeadFormData>({
    name: "",
    contact: "",
    message: "",
    hp: "",
  });
  const [leadErrors, setLeadErrors] = useState<LeadFormErrors>({});
  const [leadSuccess, setLeadSuccess] = useState<boolean>(false);
  const [leadSubmitting, setLeadSubmitting] = useState<boolean>(false);
  const [refreshIndex, setRefreshIndex] = useState<number>(0);

  const { loading, setLoading, handleResetLoading } = useLoading({
    show: true,
    message: "Memuat beranda...",
    type: "loading",
  });

  useEffect(() => {
    captureUtmFromUrl();
    let isMounted = true;

    async function loadLandingData() {
      try {
        const heroQuery = new Query({ table: "landingHero", limit: 1 }).select([
          "_id",
          "badgeText",
          "title",
          "subtitle",
          '"backgroundImage": backgroundImage.asset->url',
          "ctaText",
          "ctaLink",
        ]);

        const productsQuery = new Query({ table: "product", limit: 6 })
          .where({ column: "isFeatured", value: true })
          .select([
            "_id",
            "title",
            "slug",
            "price",
            "originalPrice",
            "excerpt",
            '"coverImage": coverImage.asset->url',
            "badge",
            "isFeatured",
            "rating",
            '"category": category->title',
            "demoUrl",
          ]);

        const testimonialsQuery = new Query({ table: "testimonial", limit: 6 }).select([
          "_id",
          "name",
          "role",
          "company",
          '"avatar": avatar.asset->url',
          "content",
          "rating",
        ]);

        const faqsQuery = new Query({ table: "faq", limit: 10 })
          .orderBy({ field: "order", direction: "asc" })
          .select(["_id", "question", "answer", "order"]);

        const [heroData, productsData, testimonialsData, faqsData] = await Promise.all([
          heroQuery.execute<SanityHeroResponse[]>().catch(() => []),
          productsQuery.execute<SanityProductResponse[]>().catch(() => []),
          testimonialsQuery.execute<SanityTestimonialResponse[]>().catch(() => []),
          faqsQuery.execute<SanityFaqResponse[]>().catch(() => []),
        ]);

        if (!isMounted) return;

        if (Array.isArray(heroData) && heroData.length > 0) {
          const rawHero = heroData[0];
          setHero({
            badgeText: rawHero.badgeText || defaultHero.badgeText,
            title: rawHero.title || defaultHero.title,
            subtitle: rawHero.subtitle || defaultHero.subtitle,
            backgroundImage: rawHero.backgroundImage || defaultHero.backgroundImage,
            ctaText: rawHero.ctaText || defaultHero.ctaText,
            ctaLink: rawHero.ctaLink || defaultHero.ctaLink,
          });
        }

        if (Array.isArray(productsData) && productsData.length > 0) {
          const mappedProducts: ProductItem[] = productsData.map((p) => ({
            id: p._id || p.title,
            title: p.title,
            slug: p.slug?.current || p._id || "produk",
            price: p.price,
            originalPrice: p.originalPrice,
            excerpt: p.excerpt || "",
            coverImage:
              p.coverImage ||
              "https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&w=800&q=80",
            badge: p.badge || "Featured",
            isFeatured: Boolean(p.isFeatured),
            rating: p.rating || 5,
            category: p.category || "Produk",
            demoUrl: p.demoUrl,
          }));
          setFeaturedProducts(mappedProducts);
        }

        if (Array.isArray(testimonialsData) && testimonialsData.length > 0) {
          const mappedTestimonials: TestimonialItem[] = testimonialsData.map((t) => ({
            id: t._id || t.name,
            name: t.name,
            role: t.role || "",
            company: t.company || "",
            avatar:
              t.avatar ||
              "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
            content: t.content,
            rating: t.rating || 5,
          }));
          setTestimonials(mappedTestimonials);
        }

        if (Array.isArray(faqsData) && faqsData.length > 0) {
          const mappedFaqs: FaqItem[] = faqsData.map((f, idx) => ({
            id: f._id || `faq-${idx}`,
            question: f.question,
            answer: f.answer,
            order: f.order,
          }));
          setFaqs(mappedFaqs);
          setActiveFaqId(mappedFaqs[0]?.id || null);
        }

        handleResetLoading();
      } catch (err: unknown) {
        if (!isMounted) return;
        const errMsg = err instanceof Error ? err.message : "Gagal memuat data";
        setLoading({ show: true, message: errMsg, type: "error" });
      }
    }

    loadLandingData();

    return () => {
      isMounted = false;
    };
  }, [refreshIndex, handleResetLoading, setLoading]);

  const handleToggleFaq = (id: string) => {
    setActiveFaqId((prev) => (prev === id ? null : id));
  };

  const handleInputChange = (field: keyof LeadFormData, value: string) => {
    setLeadForm((prev) => ({ ...prev, [field]: value }));
    if (leadErrors[field as keyof LeadFormErrors]) {
      setLeadErrors((prev) => ({ ...prev, [field]: undefined, general: undefined }));
    }
  };

  const handleSubmitLead = async (e: React.FormEvent) => {
    e.preventDefault();

    const errors: LeadFormErrors = {};
    if (!leadForm.name || leadForm.name.trim().length < 3) {
      errors.name = "Nama wajib diisi minimal 3 karakter.";
    }

    const trimmedContact = leadForm.contact.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^(\+?[0-9]{9,16})$/;

    if (!trimmedContact) {
      errors.contact = "Email atau nomor WhatsApp wajib diisi.";
    } else if (
      !emailRegex.test(trimmedContact) &&
      !phoneRegex.test(trimmedContact.replace(/[\s-]/g, ""))
    ) {
      errors.contact = "Format email atau nomor WhatsApp tidak valid.";
    }

    if (Object.keys(errors).length > 0) {
      setLeadErrors(errors);
      return;
    }

    setLeadSubmitting(true);
    setLeadErrors({});

    try {
      const currentUtm = getStoredUtm();
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...leadForm, utm: currentUtm || undefined }),
      });

      const result = await res.json();

      if (!res.ok) {
        setLeadErrors({ general: result.error || "Gagal mengirimkan pesan." });
        setLeadSubmitting(false);
        return;
      }

      setLeadSuccess(true);
      setLeadForm({ name: "", contact: "", message: "", hp: "" });
      setLeadSubmitting(false);
    } catch {
      setLeadErrors({
        general: "Terjadi gangguan jaringan. Silakan coba kembali beberapa saat lagi.",
      });
      setLeadSubmitting(false);
    }
  };

  const handleResetLeadForm = () => {
    setLeadSuccess(false);
    setLeadErrors({});
    setLeadForm({ name: "", contact: "", message: "", hp: "" });
  };

  const handleRefetch = () => {
    setLoading({ show: true, message: "Memuat ulang beranda...", type: "loading" });
    setRefreshIndex((prev) => prev + 1);
  };

  const handleCtaClick = (ctaName: string, ctaLocation: string, ctaTarget: string) => {
    trackCtaClick(ctaName, ctaLocation, ctaTarget);
  };

  const isLoading = Boolean(loading?.show && loading?.type === "loading");
  const isError = Boolean(loading?.show && loading?.type === "error");
  const loadingMessage = loading?.message || "";

  return {
    hero,
    featuredProducts,
    testimonials,
    faqs,
    activeFaqId,
    leadForm,
    leadErrors,
    leadSuccess,
    leadSubmitting,
    isLoading,
    isError,
    loadingMessage,
    handleToggleFaq,
    handleInputChange,
    handleSubmitLead,
    handleResetLeadForm,
    handleRefetch,
    handleCtaClick,
  };
}

export type UseLandingPageReturn = ReturnType<typeof useLandingPage>;

