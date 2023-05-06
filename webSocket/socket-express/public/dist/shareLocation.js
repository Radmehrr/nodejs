function shareLocation() {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords;
      const latLong = new google.maps.latlng(latitude, longitude);
      const li = document.createElement("li");
      li.setAttribute("location-me");

      const myOptions = {
        center: latLong,
        zoom: 15,
        mapTypeId: google.maps.mapTypeId.ROADMAP,
        mapTypeControl: false,
        navigationControlOptions: {
          style: google.maps.NavigationControlStyle.SMALL,
        },
      };

      const map = new google.maps.Map(li, myOptions);
      document.querySelector(".messages ul").appendChild(li);

      new google.maps.Marker({
        position: latLong,
        map,
        title: "Your Location",
      });
    },
    (error) => {
      console.log(error);
    }
  );
}
