import { ref, onMounted, onUnmounted } from "vue";

export function useDevice() {
    return window.matchMedia("(max-width: 768px)").matches;
}


/*
const isMobile = ref(false);

    const checkDevice = () => {
        isMobile.value = window.matchMedia("(max-width: 768px)").matches;
    };

    onMounted(() => {
        checkDevice(); // Controllo iniziale
        window.addEventListener("resize", checkDevice);
    });

    onUnmounted(() => {
        window.removeEventListener("resize", checkDevice);
    });

    return { isMobile };
    
*/