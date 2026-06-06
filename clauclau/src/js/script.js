(() => {
  const mailBtn = document.getElementById("mail-btn");
  const messageModal = document.getElementById("message-modal");
  const messageModalText = document.getElementById("message-modal-title");
  const messageModalClose = document.getElementById("message-modal-close");
  const messageModalBackdrop = messageModal?.querySelector("[data-modal-close]");
  let messagesPromise = null;

  const init = () => {
    const imageNum = Math.floor(Math.random() * 13 + 1);
    document.body.style.backgroundImage = `url('assets/images/${imageNum}.jpeg')`;
    document.body.style.backgroundSize = "cover";

    loadMessages();

    if (isInCooldown()) {
      mailBtn.style.display = "none";
      return;
    }
    moveButtonToRandomPosition();
  };

  const getNextMessageIndex = () => {
    const lastMessageIndex = localStorage.getItem("lastMessageIndex");
    if (!lastMessageIndex) {
      localStorage.setItem("lastMessageIndex", "0");
      return 0;
    }

    const nextIndex = parseInt(lastMessageIndex, 10) + 1;
    localStorage.setItem("lastMessageIndex", `${nextIndex}`);
    return nextIndex;
  };

  const loadMessages = () => {
    if (!messagesPromise) {
      messagesPromise = fetch("messages.txt")
        .then((response) => {
          if (!response.ok) {
            throw new Error("Unable to load messages");
          }

          return response.text();
        })
        .then((text) => text.split(/\r?\n/).filter((line) => line.trim().length > 0));
    }

    return messagesPromise;
  };

  const renderMessageContent = (message) => {
    if (!messageModalText) return;

    messageModalText.replaceChildren();
    messageModalText.insertAdjacentHTML("beforeend", message);
  };

  const openModal = (message) => {
    if (!messageModal || !messageModalText) return;

    renderMessageContent(message);
    messageModal.hidden = false;
    messageModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    messageModalClose?.focus();
  };

  const closeModal = () => {
    if (!messageModal) return;

    messageModal.hidden = true;
    messageModal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    mailBtn?.focus();
  };

  const showNextMessage = async () => {
    try {
      const messages = await loadMessages();

      if (!messages.length) {
        openModal("C'est dla marde ste site là. Faut tu contacte mr. Lauzon pour le déboguer.");
        return;
      }

      const nextIndex = getNextMessageIndex();
      const message = messages[nextIndex % messages.length];
      openModal(message);
    } catch (error) {
      openModal("C'est dla marde ste site là. Faut tu contacte mr. Lauzon pour le déboguer.");
    }
  };

  const isInCooldown = () => {
    const lastMessageTime = localStorage.getItem("lastMessageTime");
    if (!lastMessageTime) return false;
    
    const cooldownDuration = 10 * 1000;
    // const cooldownDuration = 18000000; // 5 hours in milliseconds
    const timeSinceLastMessage = Date.now() - parseInt(lastMessageTime, 10);
    return timeSinceLastMessage < cooldownDuration;
  };

  const mailClicked = async () => {
    if (Math.random() < 0.8) {
      moveButtonToRandomPosition();
      return;
    }

    localStorage.setItem("lastMessageTime", `${Date.now()}`);
    mailBtn.style.display = "none";
    await showNextMessage();
  };

  const moveButtonToRandomPosition = () => {
    if (!mailBtn) return;

    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    const btnWidth = mailBtn.offsetWidth;
    const btnHeight = mailBtn.offsetHeight;

    const maxLeft = windowWidth - btnWidth;
    const maxTop = windowHeight - btnHeight;

    const randomLeft = Math.max(0, Math.floor(Math.random() * maxLeft));
    const randomTop = Math.max(0, Math.floor(Math.random() * maxTop));

    mailBtn.style.left = `${randomLeft}px`;
    mailBtn.style.top = `${randomTop}px`;
  };

  document.addEventListener("DOMContentLoaded", init);

  mailBtn?.addEventListener("click", mailClicked);
  messageModalClose?.addEventListener("click", closeModal);
  messageModalBackdrop?.addEventListener("click", closeModal);
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && messageModal && !messageModal.hidden) {
      closeModal();
    }
  });
})();
