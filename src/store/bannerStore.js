import { defineStore } from "pinia";
import defaultBanner from "@/assets/background_img.jpg"; // Immagine predefinita

export const useBannerStore = defineStore("banner", {
    state: () => ({
        bannerImage: defaultBanner,
    }),
    actions: {
        setBannerImage(imageUrl) {
            this.bannerImage = imageUrl || defaultBanner;
        },
    },
});
