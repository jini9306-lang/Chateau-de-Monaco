(function () {
  const languageRoutes = {
    "/Chateau-de-Monaco/index.html": {
        KO: "/Chateau-de-Monaco/index.html",
        EN: "/Chateau-de-Monaco/index.html",
        FR: "/Chateau-de-Monaco/index.html"
    },
    "/Chateau-de-Monaco/experiences/experiences.html": {
      KO: "/Chateau-de-Monaco/experiences/experiences.html",
      EN: "/Chateau-de-Monaco/experiences/experiences-en.html",
      FR: "/Chateau-de-Monaco/experiences/experiences-fr.html"
    },
    "/Chateau-de-Monaco/experiences/experiences-en.html": {
      KO: "/Chateau-de-Monaco/experiences/experiences.html",
      EN: "/Chateau-de-Monaco/experiences/experiences-en.html",
      FR: "/Chateau-de-Monaco/experiences/experiences-fr.html"
    },
    "/Chateau-de-Monaco/experiences/experiences-fr.html": {
      KO: "/Chateau-de-Monaco/experiences/experiences.html",
      EN: "/Chateau-de-Monaco/experiences/experiences-en.html",
      FR: "/Chateau-de-Monaco/experiences/experiences-fr.html"
    },
    "/Chateau-de-Monaco/location/location.html": {
      KO: "/Chateau-de-Monaco/location/location.html",
      EN: "/Chateau-de-Monaco/location/location-en.html",
      FR: "/Chateau-de-Monaco/location/location-fr.html"
    },
    "/Chateau-de-Monaco/location/location-en.html": {
      KO: "/Chateau-de-Monaco/location/location.html",
      EN: "/Chateau-de-Monaco/location/location-en.html",
      FR: "/Chateau-de-Monaco/location/location-fr.html"
    },
    "/Chateau-de-Monaco/location/location-fr.html": {
      KO: "/Chateau-de-Monaco/location/location.html",
      EN: "/Chateau-de-Monaco/location/location-en.html",
      FR: "/Chateau-de-Monaco/location/location-fr.html"
    },
    "/Chateau-de-Monaco/reservation/reservation.html": {
      KO: "/Chateau-de-Monaco/reservation/reservation.html",
      EN: "/Chateau-de-Monaco/reservation/reservation-en.html",
      FR: "/Chateau-de-Monaco/reservation/reservation-fr.html"
    },
    "/Chateau-de-Monaco/reservation/reservation-en.html": {
      KO: "/Chateau-de-Monaco/reservation/reservation.html",
      EN: "/Chateau-de-Monaco/reservation/reservation-en.html",
      FR: "/Chateau-de-Monaco/reservation/reservation-fr.html"
    },
    "/Chateau-de-Monaco/reservation/reservation-fr.html": {
      KO: "/Chateau-de-Monaco/reservation/reservation.html",
      EN: "/Chateau-de-Monaco/reservation/reservation-en.html",
      FR: "/Chateau-de-Monaco/reservation/reservation-fr.html"
    }
  };

  $(document)
    .off("change.language", "select.nation")
    .on("change.language", "select.nation", function () {
      const currentPath = window.location.pathname;
      let selectedLanguage = this.value;

      localStorage.setItem("language", selectedLanguage);

      let pageRoutes = languageRoutes[currentPath];

      if (!pageRoutes || !pageRoutes[selectedLanguage]) {
        alert("이 페이지의 선택 언어는 아직 준비 중입니다.");
        return;
      }

      window.location.href = pageRoutes[selectedLanguage];
    });
})();