import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { DesktopNav, MobileNav } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

const galleryImages = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop",
    title: "Tech Summit 2024",
    category: "Events",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop",
    title: "Team Collaboration",
    category: "Behind the Scenes",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=600&fit=crop",
    title: "Hackathon Winners",
    category: "Competitions",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&h=600&fit=crop",
    title: "Workshop Session",
    category: "Workshops",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop",
    title: "Planning Meeting",
    category: "Behind the Scenes",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=600&fit=crop",
    title: "Robotics Demo",
    category: "Projects",
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&h=600&fit=crop",
    title: "Industry Talk",
    category: "Events",
  },
  {
    id: 8,
    src: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=600&fit=crop",
    title: "Award Ceremony",
    category: "Events",
  },
  {
    id: 9,
    src: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&h=600&fit=crop",
    title: "Coding Workshop",
    category: "Workshops",
  },
];

const categories = ["All", "Events", "Workshops", "Competitions", "Projects", "Behind the Scenes"];

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const filteredImages =
    selectedCategory === "All"
      ? galleryImages
      : galleryImages.filter((img) => img.category === selectedCategory);

  const handlePrev = () => {
    if (selectedImage === null) return;
    const currentIndex = filteredImages.findIndex((img) => img.id === selectedImage);
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : filteredImages.length - 1;
    setSelectedImage(filteredImages[prevIndex].id);
  };

  const handleNext = () => {
    if (selectedImage === null) return;
    const currentIndex = filteredImages.findIndex((img) => img.id === selectedImage);
    const nextIndex = currentIndex < filteredImages.length - 1 ? currentIndex + 1 : 0;
    setSelectedImage(filteredImages[nextIndex].id);
  };

  const selectedImageData = galleryImages.find((img) => img.id === selectedImage);

  return (
    <>
      <Helmet>
        <title>Gallery | IEEE Curtin Colombo Student Branch</title>
        <meta
          name="description"
          content="Browse photos and videos from IEEE Curtin Colombo events, workshops, and behind-the-scenes moments."
        />
      </Helmet>

      <div className="min-h-screen w-full bg-background">
        <DesktopNav />
        <MobileNav />

        {/* Hero Section */}
        <section className="relative pt-32 pb-20 overflow-hidden grid-pattern">
          <div className="absolute inset-0">
            <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-3xl mx-auto"
            >
              <span className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm font-medium tracking-wide mb-6">
                Gallery
              </span>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Our <span className="gradient-text">Gallery</span>
              </h1>
              <p className="text-muted-foreground text-lg md:text-xl">
                Relive the moments from our events, workshops, and community activities.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Category Filter */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                    selectedCategory === category
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary/50 text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery Grid */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <motion.div
              layout
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              <AnimatePresence>
                {filteredImages.map((image, index) => (
                  <motion.div
                    key={image.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    onClick={() => setSelectedImage(image.id)}
                    className="group aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer relative"
                  >
                    <img
                      src={image.src}
                      alt={image.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <div>
                        <h3 className="font-display font-semibold text-lg">
                          {image.title}
                        </h3>
                        <p className="text-muted-foreground text-sm">
                          {image.category}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </section>

        {/* Lightbox */}
        <AnimatePresence>
          {selectedImage !== null && selectedImageData && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-background/95 backdrop-blur-lg flex items-center justify-center p-4"
              onClick={() => setSelectedImage(null)}
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-foreground hover:text-primary transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
                className="absolute left-4 w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-foreground hover:text-primary transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                className="absolute right-4 w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-foreground hover:text-primary transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                onClick={(e) => e.stopPropagation()}
                className="max-w-4xl w-full"
              >
                <img
                  src={selectedImageData.src}
                  alt={selectedImageData.title}
                  className="w-full rounded-2xl"
                />
                <div className="mt-4 text-center">
                  <h3 className="font-display font-semibold text-xl">
                    {selectedImageData.title}
                  </h3>
                  <p className="text-muted-foreground">{selectedImageData.category}</p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <Footer />
      </div>
    </>
  );
};

export default Gallery;
