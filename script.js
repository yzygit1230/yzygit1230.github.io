const filters = document.querySelectorAll(".filter");
const publications = document.querySelectorAll(".publication");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

filters.forEach((button) => {
  button.addEventListener("click", () => {
    if (button.classList.contains("is-active")) return;
    const filter = button.dataset.filter;

    filters.forEach((item) => {
      item.classList.toggle("is-active", item === button);
      item.setAttribute("aria-pressed", String(item === button));
    });
    let visibleIndex = 0;
    publications.forEach((publication) => {
      const tags = publication.dataset.tags.split(" ");
      const visible = tags.includes(filter);
      publication.getAnimations?.().forEach((animation) => animation.cancel());
      publication.classList.toggle("is-hidden", !visible);
      if (visible && !reducedMotion.matches && publication.animate) {
        publication.animate(
          [{ opacity: 0, transform: "translateY(8px)" }, { opacity: 1, transform: "translateY(0)" }],
          { duration: 240, delay: Math.min(visibleIndex, 5) * 25, easing: "ease-out", fill: "backwards" }
        );
      }
      if (visible) visibleIndex += 1;
    });
  });
});

const sectionLinks = document.querySelectorAll(".nav-menu a");
const sectionTargets = Array.from(sectionLinks, (link) => document.querySelector(link.getAttribute("href")));
const siteNav = document.querySelector(".site-nav");
let navigationFrame = null;

function updateActiveSection() {
  const boundary = (siteNav?.getBoundingClientRect().bottom || 0) + 90;
  let currentId = null;
  sectionTargets.forEach((section) => {
    if (section && section.getBoundingClientRect().top <= boundary) currentId = section.id;
  });
  sectionLinks.forEach((link) => {
    if (link.getAttribute("href") === `#${currentId}`) {
      link.setAttribute("aria-current", "location");
    } else {
      link.removeAttribute("aria-current");
    }
  });
  navigationFrame = null;
}

function scheduleNavigationUpdate() {
  if (navigationFrame === null) navigationFrame = window.requestAnimationFrame(updateActiveSection);
}

window.addEventListener("scroll", scheduleNavigationUpdate, { passive: true });
window.addEventListener("resize", scheduleNavigationUpdate);
updateActiveSection();

const bibtexEntries = {
  celldiffuser: `@article{ye2026celldiffuser,
  title={CellDiffuser: Multimodal Optical Time-Stretch Imaging Flow Cytometry and Diffusion Models for Lung Cancer Immunotherapy Diagnosis},
  author={Ye, Zhaoyi and Song, Congkuan and Weng, Yueyun and Liu, Sheng and Wang, Du and Mei, Liye and Lei, Cheng},
  journal={ACS Photonics},
  volume={13},
  number={19},
  pages={5787--5796},
  year={2026},
  publisher={ACS Publications}
}`,
  freqvim: `@article{ye2026freqvim,
  title={FreqViM: Frequency-enhanced vision Mamba for ultrasound image breast cancer segmentation},
  author={Ye, Zhaoyi and Li, Jionghong and Zhang, Yimin and Huang, Jin and Deng, Jingwen and Wang, Du and Mei, Liye and Lei, Cheng},
  journal={Journal of Visual Communication and Image Representation},
  volume={121},
  pages={104961},
  year={2026},
  publisher={Elsevier}
}`,
  rethinking: `@article{ye2026rethinking,
  title={Rethinking multi-center semi-supervised breast cancer ultrasound image segmentation: An intermediate-domain perspective},
  author={Ye, Zhaoyi and Zhang, Yimin and Huang, Jin and Wang, Du and Liu, Sheng and Mei, Liye and Lei, Cheng},
  journal={IEEE Journal of Biomedical and Health Informatics},
  volume={30},
  number={6},
  pages={5156--5166},
  year={2026},
  publisher={IEEE}
}`,
  cmamil: `@article{ye2026cmamil,
  title={CMAMIL: Cross-modality aligned multi-instance learning for label-free lung cancer immunotherapy response prediction},
  author={Ye, Zhaoyi and Song, Congkuan and Weng, Yueyun and Shen, Hui and Wang, Du and Mei, Liye and Lei, Cheng},
  journal={Optics and Lasers in Engineering},
  volume={203},
  pages={109785},
  year={2026},
  publisher={Elsevier}
}`,
  frequency: `@article{ye2025frequency,
  title={Frequency-guided wavelet network for label-free cell death pathway prediction in lung cancer chemotherapy},
  author={Ye, Zhaoyi and Li, Jionghong and Luo, Guoqing and Weng, Yueyun and Shen, Hui and Wang, Du and Mei, Liye and Lei, Cheng},
  journal={Displays},
  pages={103272},
  year={2025},
  publisher={Elsevier}
}`,
  dflnet: `@article{ye2025dflnet,
  title={DFLNet: Disentangled feature learning network for breast cancer ultrasound image segmentation},
  author={Ye, Zhaoyi and Huang, Jin and Zhang, Yimin and Deng, Jingwen and Zhang, Jingwen and Liu, Sheng and Wang, Du and Mei, Liye and Lei, Cheng},
  journal={Digital Signal Processing},
  volume={165},
  pages={105331},
  year={2025},
  publisher={Academic Press}
}`,
  hamil: `@article{ye2026hamil,
  title={HAMIL: Hierarchical Attention Multi-Instance Learning for Label-Free Colorectal Cancer Typing},
  author={Ye, Zhaoyi and Mei, Sisi and Tao, Liang and Wang, Du and Mei, Liye and Lei, Cheng},
  journal={Microscopy Research and Technique},
  volume={89},
  number={2},
  pages={292--301},
  year={2026},
  publisher={John Wiley \\& Sons, Inc. Hoboken, USA}
}`,
  fvim: `@inproceedings{ye2025fvim,
  title={FViM: Frequency Vision Mamba for Label-Free Cell Death Pathway Prediction in Lung Cancer Chemotherapy},
  author={Ye, Zhaoyi and Wei, Shubin and Mei, Liye and Weng, Yueyun and Geng, Qing and Wang, Du and Lei, Cheng},
  booktitle={International Conference on Medical Image Computing and Computer-Assisted Intervention},
  pages={230--239},
  year={2025},
  organization={Springer Nature Switzerland Cham}
}`,
  sfdino: `@inproceedings{ye2026sfdino,
  title={SF-DINO: Spatial-Frequency Adapted Foundation Model for Multiple Myeloma Diagnosis},
  author={Ye, Zhaoyi and Shen, Hui and Zhou, Fuling and Hu, Xinglong and Wang, Du and Mei, Liye and Lei, Cheng},
  booktitle={International Conference on Medical Image Computing and Computer-Assisted Intervention},
  pages={623--633},
  year={2026},
  organization={Springer Nature Switzerland Cham}
}`,
  freqmil: `@inproceedings{ye2026freqmil,
  title={FreqMIL: Frequency-Aware Mamba Multi-Instance Learning for Acute Leukemia Typing},
  author={Ye, Zhaoyi and Mei, Liye and Li, Jionghong and Weng, Yueyun and Shen, Hui and Zhou, Fuling and Lei, Cheng},
  booktitle={ICASSP 2026-2026 IEEE International Conference on Acoustics, Speech and Signal Processing (ICASSP)},
  pages={7246--7250},
  year={2026},
  organization={IEEE}
}`
};

const bibtexModal = document.querySelector("#bibtex-modal");
const bibtexTitle = document.querySelector("#bibtex-title");
const bibtexContent = document.querySelector("#bibtex-content");
const closeBibtex = document.querySelector("#close-bibtex");
const copyBibtex = document.querySelector("#copy-bibtex");
let lastFocusedElement = null;

function openBibtexModal(button) {
  const key = button.dataset.bibtex;
  const entry = bibtexEntries[key] || "BibTeX coming soon.";
  const title = button.closest(".publication")?.querySelector("h3")?.textContent.trim();

  lastFocusedElement = document.activeElement;
  bibtexTitle.textContent = title ? `BibTeX: ${title}` : "BibTeX";
  bibtexContent.textContent = entry;
  bibtexModal.hidden = false;
  document.body.classList.add("modal-open");
  closeBibtex.focus();
}

function closeBibtexModal() {
  bibtexModal.hidden = true;
  document.body.classList.remove("modal-open");
  bibtexTitle.textContent = "BibTeX";
  bibtexContent.textContent = "";
  copyBibtex.textContent = "Copy";
  lastFocusedElement?.focus();
}

document.querySelectorAll(".bibtex-button").forEach((button) => {
  button.addEventListener("click", () => openBibtexModal(button));
});

closeBibtex?.addEventListener("click", closeBibtexModal);

bibtexModal?.addEventListener("click", (event) => {
  if (event.target === bibtexModal) {
    closeBibtexModal();
  }
});

document.addEventListener("keydown", (event) => {
  if (!bibtexModal || bibtexModal.hidden) return;

  if (event.key === "Escape" && bibtexModal && !bibtexModal.hidden) {
    closeBibtexModal();
  }

  if (event.key === "Tab") {
    const first = closeBibtex;
    const last = copyBibtex;
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }
});

copyBibtex?.addEventListener("click", async () => {
  const text = bibtexContent.textContent;
  if (!text) return;

  try {
    await navigator.clipboard.writeText(text);
    copyBibtex.textContent = "Copied!";
    setTimeout(() => {
      copyBibtex.textContent = "Copy";
    }, 1400);
  } catch {
    copyBibtex.textContent = "Select and copy";
  }
});

const figureModal = document.querySelector("#figure-modal");
const figureImage = document.querySelector("#figure-image");
const figureTitle = document.querySelector("#figure-title");
const closeFigure = document.querySelector("#close-figure");

if (figureModal?.showModal) {
  publications.forEach((publication) => {
    const image = publication.querySelector("img");
    if (!image) return;
    const title = publication.querySelector("h3").textContent.trim();
    const trigger = document.createElement("button");
    trigger.className = "paper-figure";
    trigger.type = "button";
    trigger.title = "Enlarge figure";
    trigger.setAttribute("aria-label", `Enlarge figure: ${title}`);
    trigger.setAttribute("aria-haspopup", "dialog");
    image.replaceWith(trigger);
    trigger.append(image);

    trigger.addEventListener("click", () => {
      figureTitle.textContent = title;
      figureImage.src = image.currentSrc || image.src;
      figureImage.alt = `Figure from ${title}`;
      figureModal.showModal();
      document.body.classList.add("modal-open");
    });
  });

  closeFigure.addEventListener("click", () => figureModal.close());
  figureModal.addEventListener("close", () => {
    document.body.classList.toggle("modal-open", !bibtexModal.hidden);
    figureImage.removeAttribute("src");
    figureImage.alt = "";
  });
  figureModal.addEventListener("click", (event) => {
    if (event.target !== figureModal) return;
    const bounds = figureModal.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right ||
        event.clientY < bounds.top || event.clientY > bounds.bottom) {
      figureModal.close();
    }
  });
}

