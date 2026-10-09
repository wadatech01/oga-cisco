
"use strict";

document.addEventListener("DOMContentLoaded", function () {

    // ==========================================
    // 1. UPDATE COPYRIGHT YEAR
    // ==========================================

    const yearElement = document.getElementById("year");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }


    // ==========================================
    // 2. HIGHLIGHT CURRENT NAVIGATION LINK
    // ==========================================

    const currentPage =
        window.location.pathname.split("/").pop() || "index.html";

    document.querySelectorAll(".navbar-nav .nav-link").forEach(function (link) {
        const href = link.getAttribute("href") || "";
        const linkPage = href.split("#")[0].split("/").pop();

        if (linkPage === currentPage) {
            link.classList.add("active");
            link.setAttribute("aria-current", "page");
        } else {
            link.classList.remove("active");
            link.removeAttribute("aria-current");
        }
    });


    // ==========================================
    // 3. READY-MADE PRODUCT FILTERS
    // ==========================================

    const productFilters = document.querySelectorAll("[data-product-filter]");
    const productItems = document.querySelectorAll("[data-product-category]");

    productFilters.forEach(function (button) {
        button.addEventListener("click", function () {
            const selectedCategory =
                button.getAttribute("data-product-filter");

            productFilters.forEach(function (filterButton) {
                const isActive = filterButton === button;

                filterButton.classList.toggle("active", isActive);
                filterButton.setAttribute("aria-pressed", String(isActive));
            });

            productItems.forEach(function (item) {
                const itemCategory =
                    item.getAttribute("data-product-category");

                const shouldShow =
                    selectedCategory === "all" ||
                    selectedCategory === itemCategory;

                item.classList.toggle("is-hidden", !shouldShow);
                item.hidden = !shouldShow;
            });
        });
    });


    // ==========================================
    // 4. GALLERY FILTERS
    // ==========================================

    const galleryFilters =
        document.querySelectorAll("[data-gallery-filter]");

    const galleryItems = document.querySelectorAll(".gallery-item");

    galleryFilters.forEach(function (button) {
        button.addEventListener("click", function () {
            const selectedCategory =
                button.getAttribute("data-gallery-filter");

            galleryFilters.forEach(function (filterButton) {
                const isActive = filterButton === button;

                filterButton.classList.toggle("active", isActive);
                filterButton.setAttribute("aria-pressed", String(isActive));
            });

            galleryItems.forEach(function (item) {
                const itemCategory =
                    item.getAttribute("data-gallery-category") ||
                    item.getAttribute("data-category") ||
                    "all";

                const shouldShow =
                    selectedCategory === "all" ||
                    selectedCategory === itemCategory;

                item.classList.toggle("is-hidden", !shouldShow);
                item.hidden = !shouldShow;
            });
        });
    });


    // ==========================================
    // 5. GALLERY LIGHTBOX
    // Use the existing lightbox in gallery.html
    // ==========================================

    const galleryCards = Array.from(
        document.querySelectorAll(".gallery-card")
    );

    const lightbox = document.getElementById("lightbox");

    if (galleryCards.length > 0 && lightbox) {

        const lightboxImage =
            document.getElementById("lightboxImage");

        const lightboxCaption =
            document.getElementById("lightboxCaption");

        const closeButton =
            document.getElementById("lightboxClose");

        const previousButton =
            document.getElementById("lightboxPrev");

        const nextButton =
            document.getElementById("lightboxNext");

        if (
            lightboxImage &&
            lightboxCaption &&
            closeButton &&
            previousButton &&
            nextButton
        ) {

            let currentImageIndex = 0;
            let previousFocus = null;
            let previousBodyOverflow = "";

            function showImage(index) {
                currentImageIndex =
                    (index + galleryCards.length) % galleryCards.length;

                const card = galleryCards[currentImageIndex];
                const image = card.querySelector("img");

                if (!image) {
                    return;
                }

                const imageUrl =
                    card.getAttribute("data-image") ||
                    image.currentSrc ||
                    image.src;

                const caption =
                    card.getAttribute("data-caption") ||
                    image.alt ||
                    "Fashion gallery image";

                lightboxImage.src = imageUrl;
                lightboxImage.alt = image.alt || caption;
                lightboxCaption.textContent = caption;

                const multipleImages = galleryCards.length > 1;

                previousButton.hidden = !multipleImages;
                nextButton.hidden = !multipleImages;
            }

            function openLightbox(index) {
                previousFocus = document.activeElement;
                previousBodyOverflow = document.body.style.overflow;

                showImage(index);

                lightbox.classList.add("is-open");
                lightbox.setAttribute("aria-hidden", "false");

                document.body.style.overflow = "hidden";

                closeButton.focus();
            }

            function closeLightbox() {
                lightbox.classList.remove("is-open");
                lightbox.setAttribute("aria-hidden", "true");

                document.body.style.overflow = previousBodyOverflow;

                if (previousFocus && previousFocus.focus) {
                    previousFocus.focus();
                }
            }

            galleryCards.forEach(function (card, index) {
                card.addEventListener("click", function (event) {
                    event.preventDefault();
                    openLightbox(index);
                });
            });

            closeButton.addEventListener("click", closeLightbox);

            previousButton.addEventListener("click", function () {
                showImage(currentImageIndex - 1);
            });

            nextButton.addEventListener("click", function () {
                showImage(currentImageIndex + 1);
            });

            lightbox.addEventListener("click", function (event) {
                if (event.target === lightbox) {
                    closeLightbox();
                }
            });

            document.addEventListener("keydown", function (event) {
                if (!lightbox.classList.contains("is-open")) {
                    return;
                }

                if (event.key === "Escape") {
                    closeLightbox();
                } else if (event.key === "ArrowRight") {
                    showImage(currentImageIndex + 1);
                } else if (event.key === "ArrowLeft") {
                    showImage(currentImageIndex - 1);
                }
            });
        }
    }


    // ==========================================
    // 6. CONTACT FORM
    // This is a demonstration only.
    // It does not send customer inquiries.
    // ==========================================

    const contactForm = document.querySelector("[data-demo-form]");

    if (contactForm) {
        contactForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const formStatus = document.getElementById("formStatus");

            if (formStatus) {
                formStatus.textContent =
                    "Your inquiry has not been sent because this form " +
                    "is not connected yet. Please contact the business " +
                    "directly until a delivery method is configured.";

                formStatus.classList.remove("text-success");
                formStatus.classList.add("text-warning");
            }
        });
    }

});
